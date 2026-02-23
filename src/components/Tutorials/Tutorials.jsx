import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: "html",
    title: "HTML",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    quizPath: "/html",
    learnPath: "/htmllearn",
    level: "Beginner",
    description: "Structure web content with semantic markup",
    topics: ["Tags & Elements", "Forms", "Semantic HTML"],
    duration: "2-3 hours",
    lessons: 15,
    accent: "#E34F26",
  },
  {
    id: "css",
    title: "CSS",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    quizPath: "/css",
    learnPath: "/csslearn",
    level: "Beginner",
    description: "Style and layout beautiful web pages",
    topics: ["Selectors", "Flexbox", "Grid", "Animations"],
    duration: "3-4 hours",
    lessons: 18,
    accent: "#264DE4",
  },
  {
    id: "javascript",
    title: "JavaScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    quizPath: "/js",
    learnPath: "/jslearn",
    level: "Intermediate",
    description: "Add interactivity and dynamic behavior",
    topics: ["ES6+", "DOM", "Async/Await", "APIs"],
    duration: "5-6 hours",
    lessons: 25,
    accent: "#D4A017",
  },
  {
    id: "python",
    title: "Python",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    quizPath: "/python",
    learnPath: "/pythonlearn",
    level: "Beginner",
    description: "Versatile programming for all purposes",
    topics: ["Syntax", "Data Types", "Functions", "OOP"],
    duration: "4-5 hours",
    lessons: 20,
    accent: "#3776AB",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    quizPath: "/tailwind",
    learnPath: "/tailwindlearn",
    level: "Beginner",
    description: "Utility-first CSS framework for rapid UI design",
    topics: ["Utility Classes", "Flexbox & Grid", "Responsive Design", "Customization"],
    duration: "4-6 hours",
    lessons: 22,
    accent: "#0EA5E9",
  },
  {
    id: "react",
    title: "React",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    quizPath: "/react",
    learnPath: "/reactlearn",
    level: "Advanced",
    description: "Build modern component-based UIs",
    topics: ["Hooks", "Components", "State", "Props"],
    duration: "6-8 hours",
    lessons: 30,
    accent: "#38BDF8",
  },
  {
    id: "gitgithub",
    title: "Git & GitHub",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    quizPath: "/gitgithub",
    learnPath: "/gitgithublearn",
    level: "Beginner",
    description: "Version control and team collaboration",
    topics: ["Git Basics", "Branching", "Merging", "Pull Requests"],
    duration: "3-5 hours",
    lessons: 18,
    accent: "#F05032",
  },
  {
    id: "nodejs",
    title: "Node.js",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    quizPath: "/nodequiz",
    learnPath: "/nodelearn",
    level: "Advanced",
    description: "Server-side JavaScript runtime for scalable apps",
    topics: ["Express", "REST APIs", "Middleware", "Authentication"],
    duration: "8-10 hours",
    lessons: 40,
    accent: "#339933",
  },
  {
    id: "restapi",
    title: "REST API",
    img: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
    quizPath: "/restapi",
    learnPath: "/restapilearn",
    level: "Intermediate",
    description: "Design and build APIs connecting frontend and backend",
    topics: ["HTTP Methods", "Routing", "Status Codes", "API Authentication"],
    duration: "4-6 hours",
    lessons: 20,
    accent: "#8B5CF6",
  },
  {
    id: "firebase",
    title: "Firebase",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    quizPath: "/firebase",
    learnPath: "/firebaselearn",
    level: "Intermediate",
    description: "Backend-as-a-service for auth, database, and hosting",
    topics: ["Authentication", "Firestore Database", "Hosting", "Security Rules"],
    duration: "5-7 hours",
    lessons: 26,
    accent: "#F59E0B",
  },
  {
    id: "sql",
    title: "SQL",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    quizPath: "/sql",
    learnPath: "/sqllearn",
    level: "Intermediate",
    description: "Manage and query relational databases",
    topics: ["SELECT Queries", "Joins", "Indexes", "Normalization"],
    duration: "5-7 hours",
    lessons: 28,
    accent: "#00758F",
  },
  {
    id: "mongodb",
    title: "MongoDB",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    quizPath: "/mongodbquiz",
    learnPath: "/mongodblearn",
    level: "Intermediate",
    description: "NoSQL document database for modern web applications",
    topics: ["Documents & Collections", "CRUD Operations", "Indexes", "Mongoose"],
    duration: "5-7 hours",
    lessons: 25,
    accent: "#47A248",
  },
  {
    id: "dsa",
    title: "DSA",
    img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    quizPath: "/dsa",
    learnPath: "/dsalearn",
    level: "Advanced",
    description: "Core problem-solving with data structures & algorithms",
    topics: ["Arrays & Strings", "Linked List", "Stack & Queue", "Sorting"],
    duration: "10-15 hours",
    lessons: 50,
    accent: "#EF4444",
  },
  {
    id: "typescript",
    title: "TypeScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    quizPath: "/typescript",
    learnPath: "/typescriptlearn",
    level: "Intermediate",
    description: "Strongly typed JavaScript for scalable applications",
    topics: ["Types", "Interfaces", "Functions", "React & Node"],
    duration: "6-8 hours",
    lessons: 30,
    accent: "#3178C6",
  },
  {
    id: "java",
    title: "Java",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    quizPath: "/java",
    learnPath: "/javalearn",
    level: "Advanced",
    description: "Enterprise-level object-oriented programming",
    topics: ["Classes", "Inheritance", "Collections", "Threads"],
    duration: "7-9 hours",
    lessons: 35,
    accent: "#ED8B00",
  },
];

const LEVEL_META = {
  Beginner:     { color: "#059669", bg: "#F0FDF9", border: "#A7F3D0" },
  Intermediate: { color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
  Advanced:     { color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
};

export default function TutorialsCard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500&family=Inter:wght@300;400;500&display=swap');

        .qc-page {
          min-height: 100vh;
          background: #FAFAF7;
          font-family: 'Inter', system-ui, sans-serif;
          color: #1C1917;
          -webkit-font-smoothing: antialiased;
        }

        /* ── HERO (unchanged structure) ── */
        .qc-hero {
          position: relative;
          background: #0F0F0F;
          color: white;
          overflow: hidden;
        }
        .qc-hero-glow {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(99,102,241,0.18), transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 20%, rgba(16,185,129,0.12), transparent 60%);
        }
        .qc-hero-inner {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
          padding: 76px 24px 68px;
        }
        .qc-hero-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 22px;
        }
        .qc-hero-eyebrow::before {
          content: '';
          display: block;
          width: 26px; height: 1px;
          background: rgba(255,255,255,0.28);
        }
        .qc-hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(42px, 7vw, 72px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin: 0 0 20px;
          color: #fff;
        }
        .qc-hero h1 em {
          font-style: normal;
          background: linear-gradient(125deg, #93C5FD, #C4B5FD);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .qc-hero-sub {
          font-size: 15.5px;
          font-weight: 300;
          color: rgba(255,255,255,0.5);
          max-width: 420px;
          line-height: 1.72;
        }
        .qc-hero-stats {
          display: flex;
          gap: 40px;
          margin-top: 44px;
          flex-wrap: wrap;
        }
        .qc-stat-n {
          font-family: 'Lora', Georgia, serif;
          font-size: 26px;
          font-weight: 600;
          color: #FAFAF7;
          display: block;
          line-height: 1;
          margin-bottom: 4px;
        }
        .qc-stat-l {
          font-size: 10.5px;
          font-weight: 400;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
        }

        /* ── GRID SECTION ── */
        .qc-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 56px 24px 80px;
        }
        .qc-grid {
          display: grid;
          gap: 16px;
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
        }

        /* ── SKELETON ── */
        .qc-skel {
          border-radius: 14px;
          border: 1px solid #E8E4DC;
          background: #fff;
          padding: 22px;
        }
        .skel-block {
          border-radius: 5px;
          background: linear-gradient(90deg, #F0EDE6 25%, #E8E4DB 50%, #F0EDE6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── CARD ── */
        .qc-card {
          position: relative;
          background: #FFFFFF;
          border: 1px solid #E8E4DC;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition:
            transform 0.24s cubic-bezier(0.34, 1.46, 0.64, 1),
            box-shadow 0.22s ease,
            border-color 0.2s ease;
        }
        .qc-card:hover {
          transform: translateY(-5px);
          border-color: #D6D0C4;
          box-shadow:
            0 2px 4px rgba(0,0,0,0.04),
            0 10px 28px rgba(0,0,0,0.08),
            0 24px 48px rgba(0,0,0,0.04);
        }

        /* coloured left accent rule — reveals on hover */
        .qc-card-rule {
          position: absolute;
          left: 0; top: 18px; bottom: 18px;
          width: 3px;
          border-radius: 0 3px 3px 0;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .qc-card:hover .qc-card-rule { opacity: 1; }

        .qc-card-body {
          padding: 20px 20px 20px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        /* header row: icon + badge */
        .qc-card-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 16px;
        }
        .qc-icon {
          width: 46px; height: 46px;
          border-radius: 10px;
          background: #FAFAF7;
          border: 1px solid #E8E4DC;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          flex-shrink: 0;
          transition: background 0.18s, border-color 0.18s;
        }
        .qc-card:hover .qc-icon {
          background: #F5F3EE;
          border-color: #D6D0C4;
        }
        .qc-icon img { width: 28px; height: 28px; object-fit: contain; }

        .qc-badge {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          padding: 3px 9px;
          border-radius: 99px;
          border: 1px solid;
          margin-top: 2px;
          flex-shrink: 0;
        }

        /* title — Lora for that educational serif feel */
        .qc-card h3 {
        font-family: 'Syne', sans-serif;
          font-size: 19px;
          font-weight: 600;
          color: #1C1917;
          margin: 0 0 7px;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }

        /* description */
        .qc-card p {
          font-size: 13px;
          font-weight: 300;
          color: #57534E;
          line-height: 1.65;
          margin: 0 0 16px;
          flex: 1;
        }

        /* meta strip */
        .qc-meta {
          display: flex;
          border-top: 1px solid #F0EDE6;
          border-bottom: 1px solid #F0EDE6;
          padding: 9px 0;
          margin-bottom: 14px;
        }
        .qc-meta-cell {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1px;
        }
        .qc-meta-cell + .qc-meta-cell {
          border-left: 1px solid #F0EDE6;
          padding-left: 14px;
        }
        .qc-meta-val {
         font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1C1917;
          letter-spacing: -0.01em;
        }
        .qc-meta-key {
          font-size: 10px;
          font-weight: 500;
          color: #A8A29E;
          text-transform: uppercase;
          letter-spacing: 0.09em;
        }

        /* topic tags */
        .qc-topics {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-bottom: 16px;
        }
        .qc-topic {
          font-size: 11px;
          font-weight: 400;
          padding: 3px 8px;
          border-radius: 5px;
          background: #F5F3EE;
          color: #78716C;
          border: 1px solid #EAE6DC;
        }

        /* CTA button */
        .qc-btn {
          width: 100%;
          padding: 11px 16px;
          border-radius: 8px;
          border: none;
          background: #1C1917;
          color: #FAFAF7;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: background 0.18s, transform 0.12s;
        }
        .qc-btn:hover { background: #2C2A27; }
        .qc-btn:active { transform: scale(0.98); }
        .qc-btn svg { transition: transform 0.18s; flex-shrink: 0; }
        .qc-btn:hover svg { transform: translateX(3px); }

        @media (max-width: 600px) {
          .qc-hero-inner { padding: 52px 20px 44px; }
          .qc-hero-stats { gap: 26px; }
          .qc-section { padding: 40px 20px 60px; }
          .qc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="qc-page">

        {/* HERO */}
        <section className="qc-hero">
          <div className="qc-hero-glow" />
          <div className="qc-hero-inner">
            <div className="qc-hero-eyebrow">Learn &amp; Practice</div>
            <h1>
              Master the skills<br />
              that <em>matter most</em>
            </h1>
            <p className="qc-hero-sub">
              Structured learning paths built for real skill growth — from first tag to full-stack.
            </p>
            <div className="qc-hero-stats">
              {[
                { n: courses.length, l: "Courses" },
                { n: `${courses.reduce((s, c) => s + c.lessons, 0)}+`, l: "Lessons" },
                { n: "3", l: "Levels" },
              ].map(({ n, l }) => (
                <div key={l}>
                  <span className="qc-stat-n">{n}</span>
                  <span className="qc-stat-l">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GRID */}
        <section className="qc-section">
          {loading ? (
            <div className="qc-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="qc-skel">
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
                    <div className="skel-block" style={{ width:46, height:46, borderRadius:10 }} />
                    <div className="skel-block" style={{ width:76, height:20, borderRadius:99 }} />
                  </div>
                  <div className="skel-block" style={{ height:18, width:"52%", marginBottom:9 }} />
                  <div className="skel-block" style={{ height:12, width:"90%", marginBottom:5 }} />
                  <div className="skel-block" style={{ height:12, width:"75%", marginBottom:18 }} />
                  <div style={{ display:"flex", gap:5, marginBottom:16 }}>
                    {[52,64,44].map((w,j) => (
                      <div key={j} className="skel-block" style={{ height:22, width:w, borderRadius:5 }} />
                    ))}
                  </div>
                  <div className="skel-block" style={{ height:40, borderRadius:8 }} />
                </div>
              ))}
            </div>
          ) : (
            <div className="qc-grid">
              {courses.map((course) => {
                const lvl = LEVEL_META[course.level];
                return (
                  <div key={course.id} className="qc-card">
                    {/* left colour rule */}
                    <div
                      className="qc-card-rule"
                      style={{ background: course.accent }}
                    />

                    <div className="qc-card-body">
                      {/* header */}
                      <div className="qc-card-head">
                        <div className="qc-icon">
                          <img src={course.img} alt={course.title} />
                        </div>
                        <span
                          className="qc-badge"
                          style={{
                            color: lvl.color,
                            background: lvl.bg,
                            borderColor: lvl.border,
                          }}
                        >
                          {course.level}
                        </span>
                      </div>

                      <h3>{course.title}</h3>
                      <p>{course.description}</p>

                      {/* meta strip */}
                      <div className="qc-meta">
                        <div className="qc-meta-cell">
                          <span className="qc-meta-val">{course.lessons}</span>
                          <span className="qc-meta-key">Lessons</span>
                        </div>
                        <div className="qc-meta-cell">
                          <span className="qc-meta-val">{course.duration.split("-")[0]}h+</span>
                          <span className="qc-meta-key">Duration</span>
                        </div>
                      </div>

                      {/* topics */}
                      <div className="qc-topics">
                        {course.topics.map((t, i) => (
                          <span key={i} className="qc-topic">{t}</span>
                        ))}
                      </div>

                      {/* CTA */}
                      <button
                        className="qc-btn"
                        onClick={() => navigate(course.learnPath)}
                      >
                        Start Learning
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}