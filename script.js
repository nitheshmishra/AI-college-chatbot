// ── Init DB on page load ──────────────────────────────────
RIBS_DB.initDB().then(() => {
  loadHistorySidebar();
});

const currentUser = localStorage.getItem('currentUser') || 'Student';
document.getElementById('username').innerText = currentUser;

let prompt        = document.querySelector("#prompt");
let submitbtn     = document.querySelector("#submit");
let chatContainer = document.querySelector(".chat-container");
let imagebtn      = document.querySelector("#image");
let image         = document.querySelector("#image img");
let imageinput    = document.querySelector("#image input");

// ── API KEY: paste your Gemini key between the quotes ─────
const GEMINI_API_KEY = localStorage.getItem('ribsApiKey') || "Add your api key here";
const Api_Url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`;

// Show API key prompt if key is missing / placeholder
(function checkApiKey() {
 if (!GEMINI_API_KEY || GEMINI_API_KEY === "Your-Api-Key") {
    const banner = document.createElement('div');
    banner.id = 'api-key-banner';
    banner.innerHTML = `
      <span>⚠️ Gemini API key not set.</span>
      <input id="apiKeyInput" type="text" placeholder="Paste your Gemini API key here..." />
      <button onclick="saveApiKey()">Save & Use</button>`;
    document.body.appendChild(banner);
  }
})();

function saveApiKey() {
  const key = document.getElementById('apiKeyInput').value.trim();
  if (!key) return alert('Please enter a valid API key.');
  localStorage.setItem('ribsApiKey', key);
  document.getElementById('api-key-banner').remove();
  location.reload();
}

let user = {
  message: null,
  file: { mime_type: null, data: null }
};

// ── Gemini call with DB context injected ─────────────────
async function generateResponse(aiChatBox) {
  let text = aiChatBox.querySelector(".ai-chat-area");

  const topics    = RIBS_DB.detectTopic(user.message);
  const dbContext = RIBS_DB.buildContextFromDB(topics);

  const fullPrompt = dbContext
    ? `You are RIBS College AI Assistant. Use ONLY the following college data to answer the question accurately. Do not guess or add information not present below.\n\n${dbContext}\n\nStudent question: ${user.message}`
    : user.message;

  let RequestOption = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "contents": [{
        "parts": [
          { text: fullPrompt },
          ...(user.file.data ? [{ inline_data: user.file }] : [])
        ]
      }]
    })
  };

  try {
    let response = await fetch(Api_Url, RequestOption);
    let data     = await response.json();

    // Catch API-level errors (bad key, quota, etc.)
    if (data.error) {
      text.innerHTML = `❌ API Error: ${data.error.message}`;
      console.error('Gemini API error:', data.error);
      return;
    }

    let apiResponse = data.candidates[0].content.parts[0].text
                        .replace(/\*\*(.*?)\*\*/g, "$1").trim();
    text.innerHTML = apiResponse;
    speak(apiResponse);

    RIBS_DB.saveSearch(currentUser, user.message, apiResponse);
    loadHistorySidebar();

  } catch (error) {
    text.innerHTML = `❌ Network error: ${error.message}. Check your API key and internet connection.`;
    console.error('Fetch error:', error);
  } finally {
    chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });
    image.src = `img.svg`;
    image.classList.remove("choose");
    user.file = {};
  }
}

// ── Chat box helpers ──────────────────────────────────────
function createChatBox(html, classes) {
  let div = document.createElement("div");
  div.innerHTML = html;
  div.classList.add(classes);
  return div;
}

function handlechatResponse(userMessage) {
  if (!userMessage.trim()) return;
  speechSynthesis.cancel();
  user.message = userMessage;

  let html = `<img src="user.png" alt="" id="userImage" width="8%">
<div class="user-chat-area">
${user.message}
${user.file.data ? `<img src="data:${user.file.mime_type};base64,${user.file.data}" class="chooseimg" />` : ""}
</div>`;
  prompt.value = "";
  let userChatBox = createChatBox(html, "user-chat-box");
  chatContainer.appendChild(userChatBox);
  chatContainer.scrollTo({ top: chatContainer.scrollHeight, behavior: "smooth" });

  setTimeout(() => {
    let html = `<img src="ai.png" alt="" id="aiImage" width="10%">
    <div class="ai-chat-area">
    <img src="loading.webp" alt="" class="load" width="50px">
    </div>`;
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    generateResponse(aiChatBox);
  }, 600);
}

// ── History sidebar ───────────────────────────────────────
async function loadHistorySidebar() {
  const panel = document.getElementById('history-panel');
  if (!panel) return;
  const items = await RIBS_DB.getHistory(currentUser);
  if (items.length === 0) {
    panel.innerHTML = '<p class="no-history">No search history yet.</p>';
    return;
  }
  panel.innerHTML = items.slice(0, 30).map(item => {
    const date = new Date(item.timestamp).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
    });
    return `<div class="history-item" onclick="replaySearch('${escapeAttr(item.userMessage)}')">
      <span class="history-q">${escapeHtml(item.userMessage)}</span>
      <span class="history-time">${date}</span>
    </div>`;
  }).join('');
}

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
function escapeAttr(str) {
  return str.replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function replaySearch(msg) {
  prompt.value = msg;
  handlechatResponse(msg);
  toggleHistory(false);
  document.getElementById('sidebar-overlay').classList.remove('visible');
}

function toggleHistory(forceState) {
  const sidebar = document.getElementById('history-sidebar');
  if (!sidebar) return;
  const isOpen = sidebar.classList.contains('open');
  const shouldOpen = forceState !== undefined ? forceState : !isOpen;
  sidebar.classList.toggle('open', shouldOpen);
}

async function clearAllHistory() {
  if (!confirm('Clear all your search history?')) return;
  await RIBS_DB.clearHistory(currentUser);
  loadHistorySidebar();
}

// ── Event listeners ───────────────────────────────────────
prompt.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handlechatResponse(prompt.value);
});
submitbtn.addEventListener("click", () => handlechatResponse(prompt.value));

imageinput.addEventListener("change", () => {
  const file = imageinput.files[0];
  if (!file) return;
  let reader = new FileReader();
  reader.onload = (e) => {
    let base64string = e.target.result.split(",")[1];
    user.file = { mime_type: file.type, data: base64string };
    image.src = `data:${user.file.mime_type};base64,${user.file.data}`;
    image.classList.add("choose");
  };
  reader.readAsDataURL(file);
});

imagebtn.addEventListener("click", () => imagebtn.querySelector("input").click());

const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SR) {
  const r = new SR();
  voice.onclick = () => r.start();
  r.onresult = e => { prompt.value = e.results[0][0].transcript; handlechatResponse(prompt.value); };
}

function speak(t) { 
  speechSynthesis.cancel();
  speechSynthesis.speak(new SpeechSynthesisUtterance(t)); 
}
