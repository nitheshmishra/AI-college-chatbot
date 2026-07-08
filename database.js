// ============================================================
//  RIBS College Database  +  Search History  (IndexedDB)
// ============================================================

const RIBS_DB = (() => {

  // ── 1. COLLEGE KNOWLEDGE BASE ────────────────────────────

  const collegeData = {
    college: {
      name: "RIBS College",
      fullName: "Ramaiah institute of business studies",
      established: "2005",
      location: "Bangalore, Karnataka, India",
      affiliation: "Bangalore University",
      approved: "UGC Approved",
      phone: "+91-XXXXXXXXXX",
      email: "info@ribscollege.edu.in",
      website: "www.ribscollege.edu.in",
      description:
        "RIBS College is a premier institution in Bangalore offering undergraduate programs in Commerce and Computer Applications. The college is affiliated to Kuvempu University and focuses on holistic development of students.",
      facilities: [
        "Computer Lab with 60+ systems",
        "Well-stocked Library",
        "Seminar Hall",
        "Sports Ground",
        "Canteen",
        "Wi-Fi Campus",
        "Girls Common Room",
        "NCC / NSS units",
      ],
    },

    courses: {
      BCA: {
        fullName: "Bachelor of Computer Applications",
        duration: "3 Years (6 Semesters)",
        type: "Undergraduate",
        affiliation: "Bangalore University",
        seats: 60,
        eligibility:
          "10+2 (PUC) in any stream with Mathematics as one of the subjects. Minimum 45% aggregate marks (40% for SC/ST).",
        description:
          "BCA is a three-year undergraduate program focusing on computer science fundamentals, software development, and IT applications. It prepares students for careers in software engineering, web development, database management, and IT industry.",
        feesStructure: {
          tuitionFee: "₹100,000 per year",
          examFee: "₹3,500 per year",
          libraryFee: "₹500 per year",
          sportsFee: "₹1300 per year",
          labFee: "₹3,000 per year",
          otherCharges: "₹1700 per year",
          totalPerYear: "₹1,10,000 per year",
          totalCourse: "₹3,30,000 for 3 years",
          admissionFee: "₹1,000 (one-time, non-refundable)",
          scholarships: "SC/ST/OBC scholarships available through government schemes",
        },
        syllabus: {
          year1: [
            "Fundamentals of Computers",
            "C Programming",
            "Mathematics – I",
            "Communication Skills",
            "Digital Electronics",
            "Practical: C Programming Lab",
          ],
          year2: [
            "Data Structures",
            "Object Oriented Programming with C++",
            "Database Management Systems",
            "Operating Systems",
            "Web Technologies (HTML, CSS, JS)",
            "Practical: DBMS Lab, Web Tech Lab",
          ],
          year3: [
            "Java Programming",
            "Software Engineering",
            "Computer Networks",
            "PHP and MySQL",
            "Project Work",
            "Practical: Java Lab, Project Lab",
          ],
        },
        careerProspects: [
          "Software Developer",
          "Web Developer",
          "Database Administrator",
          "System Analyst",
          "IT Support Engineer",
          "Higher studies: MCA, MBA(IT), MSc CS",
        ],
        highlights: [
          "Industry-oriented curriculum",
          "Dedicated computer lab with 60+ systems",
          "Internship guidance",
          "Project-based learning in final year",
          "Campus placement support",
        ],
      },

      BCom: {
        fullName: "Bachelor of Commerce",
        duration: "3 Years (6 Semesters)",
        type: "Undergraduate",
        affiliation: "Bangalore University",
        seats: 120,
        eligibility:
          "10+2 (PUC) in Commerce or any stream. Minimum 35% aggregate marks (relaxation for SC/ST as per university norms).",
        description:
          "BCom is a three-year undergraduate program covering accounting, finance, business law, economics, and taxation. It lays a strong foundation for careers in banking, finance, accounting, and business management.",
        feesStructure: {
          tuitionFee: "₹75,000 per year",
          examFee: "₹2,000 per year",
          libraryFee: "₹500 per year",
          sportsFee: "₹300 per year",
          labFee: "₹500 per year",
          otherCharges: "₹700 per year",
          totalPerYear: "₹80,000 per year",
          totalCourse: "₹2,40,000 for 3 years",
          admissionFee: "₹1,000 (one-time, non-refundable)",
          scholarships: "SC/ST/OBC scholarships available through government schemes",
        },
        syllabus: {
          year1: [
            "Financial Accounting",
            "Business Economics",
            "Business Communication",
            "Business Mathematics & Statistics",
            "Environmental Studies",
            "Kannada / Hindi / English (Language)",
          ],
          year2: [
            "Advanced Accounting",
            "Corporate Accounting",
            "Business Law",
            "Income Tax Law & Practice",
            "Cost Accounting",
            "Computer Applications in Business",
          ],
          year3: [
            "Auditing",
            "Financial Management",
            "Indirect Taxes (GST)",
            "Banking & Insurance",
            "Entrepreneurship Development",
            "Project Work",
          ],
        },
        careerProspects: [
          "Accountant / Senior Accountant",
          "Banking Professional",
          "Tax Consultant",
          "Financial Analyst",
          "GST Practitioner",
          "Higher studies: MCom, MBA, CA, CS, CMA",
        ],
        highlights: [
          "Strong accounting and finance focus",
          "Practical tax and GST training",
          "Tally ERP practical sessions",
          "Guest lectures from industry professionals",
          "CA/CS exam coaching support",
        ],
      },

      BBA: {
        fullName: "Bachelor of Business Administration",
        duration: "3 Years (6 Semesters)",
        type: "Undergraduate",
        affiliation: "Bangalore University",
        seats: 120,
        eligibility: "10+2 (PUC) in any stream. Minimum 35% aggregate marks.",
        description:
          "BA program offers specializations in Kannada, English, History, Political Science, Economics, and Sociology.",
        feesStructure: {
          tuitionFee: "₹15,000 per year",
          examFee: "₹1,500 per year",
          totalPerYear: "₹16,500 per year",
          totalCourse: "₹48,500 for 3 years",
          admissionFee: "₹1,000 (one-time)",
          scholarships: "SC/ST/OBC scholarships available",
        },
        careerProspects: [
          "Civil Services",
          "Teaching / Education",
          "Journalism",
          "Social Work",
          "Higher studies: MA, MEd, LLB",
        ],
      },

      BSc: {
        fullName: "Bachelor of Science",
        duration: "3 Years (6 Semesters)",
        type: "Undergraduate",
        affiliation: "BAngalore University",
        seats: 60,
        eligibility:
          "10+2 (PUC) Science stream with Physics, Chemistry, and Mathematics/Biology. Minimum 45% aggregate.",
        description:
          "BSc program with combinations such as PCM (Physics, Chemistry, Mathematics) and PCB (Physics, Chemistry, Biology).",
        feesStructure: {
          tuitionFee: "₹25,000 per year",
          examFee: "₹2,500 per year",
          labFee: "₹3,000 per year",
          totalPerYear: "₹30,500 per year",
          totalCourse: "₹91,500 for 3 years",
          admissionFee: "₹1,000 (one-time)",
          scholarships: "SC/ST/OBC scholarships available",
        },
        careerProspects: [
          "Research Scientist",
          "Lab Technician",
          "Higher studies: MSc, BE/BTech lateral entry",
          "Civil Services",
        ],
      },
    },

    admissions: {
      process:
        "Admissions are open every year in June–July. Students can apply online or visit the college office.",
      documents: [
        "10th and 12th Mark sheets (Original + 2 copies)",
        "Transfer Certificate (TC)",
        "Migration Certificate (if applicable)",
        "Caste Certificate (SC/ST/OBC)",
        "Income Certificate (for scholarship)",
        "Passport-size photographs (6 copies)",
        "Aadhaar Card copy",
      ],
      importantDates: {
        applicationStart: "June 1st every year",
        lastDate: "July 31st every year",
        classesBegin: "August 1st every year",
      },
      contact: "Visit the college office or call the admission helpline during office hours (9AM–4PM).",
    },

    scholarships: {
      available: [
        "SC/ST Post-Matric Scholarship (Government of Karnataka)",
        "OBC Scholarship (Government of Karnataka)",
        "Minority Scholarship",
        "Merit Scholarship for toppers",
        "Sports Quota concession",
        "Management discretionary scholarship",
      ],
      note: "Students must submit relevant documents at the time of admission to avail scholarships.",
    },
  };

  // ── 2. KEYWORD MATCHING ──────────────────────────────────

  const keywords = {
    BCA: ["bca", "bachelor of computer applications", "computer applications", "bca course", "bca fees", "bca syllabus", "bca seats", "bca eligibility", "bca subjects", "bca admission"],
    BCom: ["bcom", "b.com", "bachelor of commerce", "commerce course", "bcom fees", "bcom syllabus", "bcom seats", "bcom eligibility", "bcom subjects", "commerce admission", "accounts course"],
    BA: ["ba", "b.a", "bachelor of arts", "arts course", "ba fees", "ba admission"],
    BSc: ["bsc", "b.sc", "bachelor of science", "science course", "bsc fees", "bsc admission"],
    college: ["ribs", "college", "about college", "ribs college", "facilities", "infrastructure", "affiliation", "university"],
    admissions: ["admission", "admissions", "apply", "application", "how to join", "enrollment", "enroll", "documents required", "joining", "when admission"],
    fees: ["fees", "fee", "fee structure", "fees structure", "how much fees", "total fees", "annual fees", "cost", "charges", "payment"],
    scholarships: ["scholarship", "scholarships", "financial aid", "fee waiver", "concession", "sc st scholarship", "obc scholarship"],
    courses: ["courses", "course", "programs", "programme", "what courses", "available courses", "list of courses", "all courses"],
  };

  function detectTopic(message) {
    const lower = message.toLowerCase();
    const matched = new Set();

    for (const [topic, words] of Object.entries(keywords)) {
      if (words.some((w) => lower.includes(w))) matched.add(topic);
    }
    return matched;
  }

  function buildContextFromDB(topics) {
    let parts = [];

    if (topics.has("college")) {
      const c = collegeData.college;
      parts.push(`RIBS College Info:\nFull Name: ${c.fullName}\nEstablished: ${c.established}\nLocation: ${c.location}\nAffiliation: ${c.affiliation}\nApproval: ${c.approved}\nFacilities: ${c.facilities.join(", ")}\nDescription: ${c.description}`);
    }

    if (topics.has("courses")) {
      parts.push(`Available Courses at RIBS College:\n- BCA (Bachelor of Computer Applications) – 3 years, 60 seats\n- BCom (Bachelor of Commerce) – 3 years, 120 seats\n- BA (Bachelor of Arts) – 3 years, 120 seats\n- BSc (Bachelor of Science) – 3 years, 60 seats`);
    }

    for (const code of ["BCA", "BCom", "BA", "BSc"]) {
      if (topics.has(code)) {
        const c = collegeData.courses[code];
        let section = `${c.fullName} (${code})<br> Details:\nDuration: ${c.duration}\nSeats: ${c.seats}\nEligibility: ${c.eligibility}\nDescription: ${c.description}\nFees Per Year: ${c.feesStructure.totalPerYear}\nTotal Course Fee: ${c.feesStructure.totalCourse}\nAdmission Fee: ${c.feesStructure.admissionFee}`;
        if (c.feesStructure.tuitionFee) section += `\nTuition Fee: ${c.feesStructure.tuitionFee}`;
        if (c.feesStructure.labFee) section += `\nLab Fee: ${c.feesStructure.labFee}`;
        if (c.feesStructure.scholarships) section += `\nScholarships: ${c.feesStructure.scholarships}`;
        if (c.syllabus) {
          section += `\nSyllabus Overview:\n  Year 1: ${c.syllabus.year1.join(", ")}\n  Year 2: ${c.syllabus.year2.join(", ")}\n  Year 3: ${c.syllabus.year3.join(", ")}`;
        }
        section += `\nCareer Prospects: ${c.careerProspects.join(", ")}`;
        if (c.highlights) section += `\nHighlights: ${c.highlights.join(", ")}`;
        parts.push(section);
      }
    }

    if (topics.has("fees") && parts.length === 0) {
      // Generic fees overview if no specific course matched
      parts.push(
        `Fee Structure Overview at RIBS College:\n- BCA: ₹24,000/year | ₹72,000 total (3 years)\n- BCom: ₹16,000/year | ₹48,000 total (3 years)\n- BA: ₹10,500/year | ₹31,500 total (3 years)\n- BSc: ₹19,500/year | ₹58,500 total (3 years)\nAll figures are approximate. Contact college office for latest fee details.`
      );
    }

    if (topics.has("admissions")) {
      const a = collegeData.admissions;
      parts.push(`Admission Process at RIBS College:\n${a.process}\nRequired Documents: ${a.documents.join(", ")}\nApplication Starts: ${a.importantDates.applicationStart}\nLast Date: ${a.importantDates.lastDate}\nClasses Begin: ${a.importantDates.classesBegin}\nContact: ${a.contact}`);
    }

    if (topics.has("scholarships")) {
      const s = collegeData.scholarships;
      parts.push(`Scholarships at RIBS College:\nAvailable Scholarships: ${s.available.join(", ")}\nNote: ${s.note}`);
    }

    return parts.join("\n\n");
  }

  // ── 3. INDEXEDDB FOR SEARCH HISTORY ──────────────────────

  let db = null;
  const DB_NAME = "RIBS_ChatDB";
  const DB_VERSION = 1;
  const STORE_NAME = "searchHistory";

  function initDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const database = e.target.result;
        if (!database.objectStoreNames.contains(STORE_NAME)) {
          const store = database.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("username", "username", { unique: false });
          store.createIndex("timestamp", "timestamp", { unique: false });
        }
      };
      req.onsuccess = (e) => {
        db = e.target.result;
        resolve(db);
      };
      req.onerror = () => reject(req.error);
    });
  }

  function saveSearch(username, userMessage, botResponse) {
    if (!db) return;
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).add({
      username: username || "Guest",
      userMessage,
      botResponse: botResponse.substring(0, 300), // store first 300 chars
      timestamp: new Date().toISOString(),
    });
  }

  function getHistory(username) {
    return new Promise((resolve) => {
      if (!db) return resolve([]);
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("username");
      const req = index.getAll(username || "Guest");
      req.onsuccess = () => resolve(req.result.reverse()); // newest first
      req.onerror = () => resolve([]);
    });
  }

  function clearHistory(username) {
    return new Promise((resolve) => {
      if (!db) return resolve();
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const index = store.index("username");
      const req = index.openCursor(IDBKeyRange.only(username || "Guest"));
      req.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) { cursor.delete(); cursor.continue(); }
        else resolve();
      };
      req.onerror = () => resolve();
    });
  }

  // ── 4. PUBLIC API ─────────────────────────────────────────
  return { initDB, detectTopic, buildContextFromDB, saveSearch, getHistory, clearHistory, collegeData };
})();
