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
  },
  {
    id: "gitgithub",
    title: "Git & GitHub",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    quizPath: "/gitgithub",
    learnPath: "/gitgithublearn",
    level: "Beginner",
    description: "Version control and team collaboration using Git and GitHub",
    topics: ["Git Basics", "Branching", "Merging", "Pull Requests"],
    duration: "3-5 hours",
    lessons: 18,
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
  },
  {
    id: "restapi",
    title: "REST API",
    img: "https://cdn-icons-png.flaticon.com/512/1006/1006771.png",
    quizPath: "/restapi",
    learnPath: "/restapilearn",
    level: "Intermediate",
    description: "Design and build APIs to connect frontend and backend systems",
    topics: ["HTTP Methods", "Routing", "Status Codes", "API Authentication"],
    duration: "4-6 hours",
    lessons: 20,
  },
  {
    id: "firebase",
    title: "Firebase",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
    quizPath: "/firebase",
    learnPath: "/firebaselearn",
    level: "Intermediate",
    description: "Backend-as-a-service for authentication, database, and hosting",
    topics: ["Authentication", "Firestore Database", "Hosting", "Security Rules"],
    duration: "5-7 hours",
    lessons: 26,
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
  },
  {
    id: "mongodb",
    title: "MongoDB",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    quizPath: "/mongodbquiz",
    learnPath: "/mongodblearn",
    level: "Intermediate",
    description: "NoSQL document database for modern web applications",
    topics: ["Documents & Collections", "CRUD Operations", "Indexes", "Mongoose with Node"],
    duration: "5-7 hours",
    lessons: 25,
  },
  {
    id: "dsa",
    title: "DSA",
    img: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
    quizPath: "/dsa",
    learnPath: "/dsalearn",
    level: "Advanced",
    description: "Core problem-solving skills using data structures and algorithms",
    topics: ["Arrays & Strings", "Linked List", "Stack & Queue", "Sorting & Searching"],
    duration: "10-15 hours",
    lessons: 50,
  },
  {
    id: "typescript",
    title: "TypeScript",
    img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    quizPath: "/typescript",
    learnPath: "/typescriptlearn",
    level: "Intermediate",
    description: "Strongly typed JavaScript for scalable and maintainable applications",
    topics: ["Types", "Interfaces", "Functions", "Using with React & Node"],
    duration: "6-8 hours",
    lessons: 30,
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
  }
];

export default function QuizCard() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  const handleTakeQuiz = (path) => {
    // if (!user) {
    //   setShowLogin(true);
    //   return;
    // }
    navigate(path);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "Beginner":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Intermediate":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Advanced":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        <div className="bg-gradient-to-br from-indigo-700 to-blue-700 text-white py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Courses</h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Start practicing with quizzes designed for every level
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <div key={course.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center p-2">
                    <img src={course.img} alt={course.title} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-5 leading-relaxed">{course.description}</p>

                <div className="flex justify-between text-xs text-gray-500 border-t border-gray-100 pt-4 mb-5">
                  <span>{course.duration}</span>
                  <span>{course.lessons} lessons</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {course.topics.map((topic, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-gray-700 px-2 py-1 rounded-md">
                      {topic}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleTakeQuiz(course.quizPath)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition"
                >
                  Take Quiz
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showLogin && <AuthModal close={() => setShowLogin(false)} />}
    </>
  );
}
