import React, { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/AuthModel";

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
    accent: "#F7DF1E",
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
    accent: "#38BDF8",
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
    accent: "#61DAFB",
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
    accent: "#6366F1",
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
    accent: "#FFCA28",
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
  Beginner: { color: "#10B981", bg: "#ECFDF5", label: "Beginner" },
  Intermediate: { color: "#F59E0B", bg: "#FFFBEB", label: "Intermediate" },
  Advanced: { color: "#EF4444", bg: "#FEF2F2", label: "Advanced" },
};

const FILTERS = ["All", "Beginner", "Intermediate", "Advanced"];

export default function QuizzCard() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [hoveredId, setHoveredId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleTakeQuiz = (path) => {
    navigate(path);
  };

  const filtered = courses.filter((c) => {
    const matchLevel = activeFilter === "All" || c.level === activeFilter;
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    return matchLevel && matchSearch;
  });

  const totalLessons = courses.reduce((s, c) => s + c.lessons, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .qc-root {
          font-family: 'DM Sans', sans-serif;
          background: #F8F7F4;
          min-height: 100vh;
          color: #1A1A1A;
        }

        .qc-hero {
          background: #0F0F0F;
          color: #fff;
          padding: 80px 24px 72px;
          position: relative;
          overflow: hidden;
        }

        .qc-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(99,102,241,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 20%, rgba(16,185,129,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .qc-hero-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .qc-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .qc-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: rgba(255,255,255,0.3);
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

        .qc-hero h1 span {
          background: linear-gradient(135deg, #6366F1, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .qc-hero-sub {
          font-size: 17px;
          color: rgba(255,255,255,0.55);
          max-width: 460px;
          line-height: 1.65;
          font-weight: 300;
          margin-bottom: 48px;
        }

        .qc-stats {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .qc-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .qc-stat-num {
          font-family: 'Syne', sans-serif;
          font-size: 28px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.02em;
        }

        .qc-stat-label {
          font-size: 12px;
          color: rgba(255,255,255,0.4);
          font-weight: 400;
          letter-spacing: 0.04em;
        }

        .qc-controls {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 24px 0;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .qc-search {
          flex: 1;
          min-width: 200px;
          max-width: 320px;
          position: relative;
        }

        .qc-search input {
          width: 100%;
          padding: 10px 14px 10px 38px;
          border: 1.5px solid #E5E3DE;
          border-radius: 10px;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #1A1A1A;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }

        .qc-search input:focus {
          border-color: #6366F1;
        }

        .qc-search input::placeholder {
          color: #9E9B95;
        }

        .qc-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #9E9B95;
          pointer-events: none;
        }

        .qc-filters {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }

        .qc-filter-btn {
          padding: 8px 16px;
          border-radius: 8px;
          border: 1.5px solid #E5E3DE;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #6B6863;
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }

        .qc-filter-btn:hover {
          border-color: #6366F1;
          color: #6366F1;
        }

        .qc-filter-btn.active {
          background: #0F0F0F;
          border-color: #0F0F0F;
          color: #fff;
        }

        .qc-results-label {
          margin-left: auto;
          font-size: 13px;
          color: #9E9B95;
          white-space: nowrap;
        }

        .qc-grid-wrap {
          max-width: 1100px;
          margin: 0 auto;
          padding: 32px 24px 80px;
        }

        .qc-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .qc-card {
          background: #fff;
          border: 1.5px solid #E9E7E3;
          border-radius: 18px;
          padding: 0;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease, border-color 0.22s ease;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .qc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.04);
          border-color: transparent;
        }

        .qc-card-accent-bar {
          height: 3px;
          width: 100%;
          transition: height 0.2s ease;
        }

        .qc-card:hover .qc-card-accent-bar {
          height: 4px;
        }

        .qc-card-body {
          padding: 22px 24px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .qc-card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 14px;
        }

        .qc-card-icon-wrap {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          background: #F5F4F1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .qc-card:hover .qc-card-icon-wrap {
          background: #EEEDF0;
        }

        .qc-card-icon-wrap img {
          width: 32px;
          height: 32px;
          object-fit: contain;
        }

        .qc-level-badge {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.05em;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .qc-card-title {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #0F0F0F;
          margin: 0 0 8px;
          letter-spacing: -0.02em;
        }

        .qc-card-desc {
          font-size: 13.5px;
          color: #6B6863;
          line-height: 1.6;
          margin-bottom: 18px;
          font-weight: 300;
          flex: 1;
        }

        .qc-card-meta {
          display: flex;
          gap: 0;
          margin-bottom: 16px;
          border-top: 1px solid #F0EEE9;
          border-bottom: 1px solid #F0EEE9;
          padding: 12px 0;
        }

        .qc-card-meta-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .qc-card-meta-item + .qc-card-meta-item {
          border-left: 1px solid #F0EEE9;
          padding-left: 16px;
        }

        .qc-meta-value {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #0F0F0F;
          letter-spacing: -0.01em;
        }

        .qc-meta-label {
          font-size: 11px;
          color: #A09D98;
          font-weight: 400;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .qc-topics {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 20px;
        }

        .qc-topic-tag {
          font-size: 11.5px;
          padding: 4px 10px;
          border-radius: 6px;
          background: #F5F4F1;
          color: #5C5954;
          font-weight: 400;
          letter-spacing: 0.01em;
          border: 1px solid #ECEAE6;
        }

        .qc-card-actions {
          display: flex;
          gap: 8px;
        }

        .qc-btn-quiz {
          flex: 1;
          padding: 11px 16px;
          border-radius: 10px;
          border: none;
          background: #0F0F0F;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.18s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          letter-spacing: 0.01em;
        }

        .qc-btn-quiz:hover {
          background: #2D2D2D;
          transform: none;
        }

        .qc-btn-learn {
          padding: 11px 14px;
          border-radius: 10px;
          border: 1.5px solid #E5E3DE;
          background: transparent;
          color: #6B6863;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s;
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .qc-btn-learn:hover {
          border-color: #6366F1;
          color: #6366F1;
          background: #F5F4FF;
        }

        .qc-empty {
          text-align: center;
          padding: 80px 24px;
          color: #9E9B95;
          grid-column: 1 / -1;
        }

        .qc-empty-icon {
          font-size: 40px;
          margin-bottom: 16px;
        }

        .qc-empty h3 {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          color: #3D3B37;
          margin-bottom: 8px;
        }

        @media (max-width: 600px) {
          .qc-hero { padding: 56px 20px 48px; }
          .qc-stats { gap: 28px; }
          .qc-controls { flex-direction: column; align-items: stretch; }
          .qc-search { max-width: 100%; }
          .qc-results-label { margin-left: 0; }
          .qc-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="qc-root">
        {/* Hero */}
        <div className="qc-hero">
          <div className="qc-hero-inner">
            <div className="qc-eyebrow">Learn & Practice</div>
            <h1>
              Master the skills<br />
              that <span>matter most</span>
            </h1>
            <p className="qc-hero-sub">
              Sharpen your knowledge with focused quizzes across {courses.length} technologies — from foundations to advanced concepts.
            </p>
            <div className="qc-stats">
              <div className="qc-stat">
                <span className="qc-stat-num">{courses.length}</span>
                <span className="qc-stat-label">Courses</span>
              </div>
              <div className="qc-stat">
                <span className="qc-stat-num">{totalLessons}+</span>
                <span className="qc-stat-label">Lessons</span>
              </div>
              <div className="qc-stat">
                <span className="qc-stat-num">3</span>
                <span className="qc-stat-label">Skill levels</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="qc-controls">
          <div className="qc-search">
            <svg className="qc-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="qc-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`qc-filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <span className="qc-results-label">
            {filtered.length} {filtered.length === 1 ? "course" : "courses"}
          </span>
        </div>

        {/* Grid */}
        <div className="qc-grid-wrap">
          <div className="qc-grid">
            {filtered.length === 0 ? (
              <div className="qc-empty">
                <div className="qc-empty-icon">🔍</div>
                <h3>No courses found</h3>
                <p>Try adjusting your search or filter.</p>
              </div>
            ) : (
              filtered.map((course) => {
                const lvl = LEVEL_META[course.level];
                return (
                  <div
                    key={course.id}
                    className="qc-card"
                    onMouseEnter={() => setHoveredId(course.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div
                      className="qc-card-accent-bar"
                      style={{ background: course.accent }}
                    />
                    <div className="qc-card-body">
                      <div className="qc-card-header">
                        <div className="qc-card-icon-wrap">
                          <img src={course.img} alt={course.title} />
                        </div>
                        <span
                          className="qc-level-badge"
                          style={{ background: lvl.bg, color: lvl.color }}
                        >
                          {course.level}
                        </span>
                      </div>

                      <h3 className="qc-card-title">{course.title}</h3>
                      <p className="qc-card-desc">{course.description}</p>

                      <div className="qc-card-meta">
                        <div className="qc-card-meta-item">
                          <span className="qc-meta-value">{course.lessons}</span>
                          <span className="qc-meta-label">Lessons</span>
                        </div>
                        <div className="qc-card-meta-item">
                          <span className="qc-meta-value">{course.duration.split("-")[0]}h+</span>
                          <span className="qc-meta-label">Duration</span>
                        </div>
                      </div>

                      <div className="qc-topics">
                        {course.topics.map((topic, i) => (
                          <span key={i} className="qc-topic-tag">{topic}</span>
                        ))}
                      </div>

                      <div className="qc-card-actions">
                        <button
                          className="qc-btn-quiz"
                          onClick={() => handleTakeQuiz(course.quizPath)}
                        >
                          Take Quiz
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </button>
                        <button
                          className="qc-btn-learn"
                          onClick={() => navigate(course.learnPath)}
                        >
                          Learn
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {showLogin && <AuthModal close={() => setShowLogin(false)} />}
    </>
  );
}