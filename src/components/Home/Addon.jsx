import React, { useState } from "react";
import { db, auth } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const challenges = [
  // HTML/CSS Challenges
  {
    id: 1,
    title: "Build a Responsive Card",
    tech: "HTML/CSS",
    difficulty: "Easy",
    description:
      "Create a responsive profile card using HTML and CSS. It should include an image, name, and short bio.",
    requirements: [
      "Use flexbox or grid for layout",
      "Include hover effects",
      "Must be mobile responsive",
    ],
  },
  {
    id: 2,
    title: "Landing Page Layout",
    tech: "HTML/CSS",
    difficulty: "Hard",
    description:
      "Design a modern landing page with hero section, features section, testimonials, and footer using Flexbox or Grid.",
    requirements: [
      "Sticky navigation bar",
      "Responsive grid layout",
      "CSS animations on scroll",
      "Mobile-first approach",
    ],
  },
  {
    id: 3,
    title: "CSS Animation Challenge",
    tech: "HTML/CSS",
    difficulty: "Medium",
    description:
      "Create a loading spinner and button animations using pure CSS without JavaScript.",
    requirements: [
      "Smooth transitions",
      "Keyframe animations",
      "Transform properties",
    ],
  },
  {
    id: 4,
    title: "Responsive Navigation Menu",
    tech: "HTML/CSS",
    difficulty: "Medium",
    description:
      "Build a responsive navigation bar with dropdown menus that converts to a hamburger menu on mobile.",
    requirements: [
      "Hamburger menu for mobile",
      "Dropdown submenus",
      "Smooth transitions",
    ],
  },

  // JavaScript Challenges
  {
    id: 5,
    title: "Form Validation",
    tech: "JavaScript",
    difficulty: "Medium",
    description:
      "Create a signup form with email and password validation using JavaScript. Include real-time error messages.",
    requirements: [
      "Email format validation",
      "Password strength checker",
      "Real-time error display",
      "Prevent form submission on errors",
    ],
  },
  {
    id: 6,
    title: "Image Slider",
    tech: "JavaScript",
    difficulty: "Medium",
    description:
      "Build an image carousel with previous/next buttons and auto-play functionality.",
    requirements: [
      "Auto-play with pause on hover",
      "Navigation buttons",
      "Dot indicators",
      "Smooth transitions",
    ],
  },
  {
    id: 7,
    title: "Calculator App",
    tech: "JavaScript",
    difficulty: "Easy",
    description:
      "Create a basic calculator that can perform addition, subtraction, multiplication, and division.",
    requirements: [
      "Handle basic operations",
      "Clear and delete functions",
      "Decimal point support",
      "Display result properly",
    ],
  },
  {
    id: 8,
    title: "Weather App API Integration",
    tech: "JavaScript",
    difficulty: "Hard",
    description:
      "Build a weather application that fetches data from a weather API and displays current conditions and forecast.",
    requirements: [
      "API integration",
      "Search by city name",
      "Display current weather and forecast",
      "Error handling for invalid cities",
    ],
  },
  {
    id: 9,
    title: "Interactive Quiz App",
    tech: "JavaScript",
    difficulty: "Medium",
    description:
      "Create a multiple-choice quiz application with score tracking and timer functionality.",
    requirements: [
      "Multiple questions",
      "Timer countdown",
      "Score calculation",
      "Result display at end",
    ],
  },
  {
    id: 10,
    title: "Drag and Drop Interface",
    tech: "JavaScript",
    difficulty: "Hard",
    description:
      "Implement a drag and drop interface where items can be moved between different containers.",
    requirements: [
      "HTML5 drag and drop API",
      "Visual feedback during drag",
      "Drop zone highlighting",
      "State persistence",
    ],
  },

  // React Challenges
  {
    id: 11,
    title: "Todo App",
    tech: "React",
    difficulty: "Medium",
    description:
      "Build a todo app where users can add, delete, edit, and mark tasks as completed with local storage.",
    requirements: [
      "Add, edit, delete tasks",
      "Mark as complete/incomplete",
      "Filter by status",
      "Local storage persistence",
    ],
  },
  {
    id: 12,
    title: "Shopping Cart",
    tech: "React",
    difficulty: "Hard",
    description:
      "Create a shopping cart with product listing, add to cart, quantity management, and total calculation.",
    requirements: [
      "Product grid display",
      "Add/remove from cart",
      "Quantity increment/decrement",
      "Total price calculation",
      "Use Context API or Redux",
    ],
  },
  {
    id: 13,
    title: "User Authentication Form",
    tech: "React",
    difficulty: "Medium",
    description:
      "Build login and signup forms with form validation, error handling, and conditional rendering.",
    requirements: [
      "Form validation with error messages",
      "Toggle between login/signup",
      "Password visibility toggle",
      "Loading states",
    ],
  },
  {
    id: 14,
    title: "Movie Search App",
    tech: "React",
    difficulty: "Medium",
    description:
      "Create an app that searches movies using an API and displays results with poster, title, and ratings.",
    requirements: [
      "API integration (OMDB or TMDB)",
      "Search functionality",
      "Display movie cards",
      "Loading and error states",
    ],
  },
  {
    id: 15,
    title: "Dark Mode Toggle",
    tech: "React",
    difficulty: "Easy",
    description:
      "Implement a dark mode toggle that switches the entire app theme and persists the preference.",
    requirements: [
      "Theme context provider",
      "Toggle button",
      "CSS variables for theming",
      "Local storage persistence",
    ],
  },
  {
    id: 16,
    title: "Infinite Scroll Feed",
    tech: "React",
    difficulty: "Hard",
    description:
      "Build a social media-style feed with infinite scroll that loads more content as user scrolls down.",
    requirements: [
      "Intersection Observer API",
      "Lazy loading",
      "Pagination",
      "Loading spinner",
    ],
  },
  {
    id: 17,
    title: "Multi-Step Form",
    tech: "React",
    difficulty: "Medium",
    description:
      "Create a multi-step form wizard with progress indicator, validation, and ability to go back.",
    requirements: [
      "Step indicator",
      "Form validation per step",
      "Next/Previous navigation",
      "Final submission",
    ],
  },
  {
    id: 18,
    title: "Markdown Editor",
    tech: "React",
    difficulty: "Hard",
    description:
      "Build a live markdown editor that shows preview of formatted text as you type.",
    requirements: [
      "Split-pane view",
      "Real-time preview",
      "Markdown parsing",
      "Export to HTML",
    ],
  },
];

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export default function ChallengePage() {
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesTech = selectedTech === "All" || challenge.tech === selectedTech;
    const matchesDifficulty =
      selectedDifficulty === "All" || challenge.difficulty === selectedDifficulty;
    const matchesSearch =
      searchQuery === "" ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTech && matchesDifficulty && matchesSearch;
  });

  const handleSubmit = async () => {
    if (!userCode.trim() || !activeChallenge) return;
    setSubmitting(true);

    try {
      await addDoc(collection(db, "challengeSubmissions"), {
        uid: auth.currentUser?.uid || null,
        displayName: auth.currentUser?.displayName || "Anonymous",
        email: auth.currentUser?.email || null,
        challengeId: activeChallenge.id,
        challengeTitle: activeChallenge.title,
        tech: activeChallenge.tech,
        difficulty: activeChallenge.difficulty,
        code: userCode,
        createdAt: serverTimestamp(),
      });

      alert("Submission successful");
      setUserCode("");
      setActiveChallenge(null);
    } catch (err) {
      alert("Failed to submit");
    } finally {
      setSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Medium":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Hard":
        return "bg-rose-50 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getTechColor = (tech) => {
    switch (tech) {
      case "HTML/CSS":
        return "bg-blue-50 text-blue-700";
      case "JavaScript":
        return "bg-purple-50 text-purple-700";
      case "React":
        return "bg-cyan-50 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-700 to-blue-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Code Challenges</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            Practice by building real projects. Choose a challenge, solve it, and submit your solution.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Filters */}
        {!activeChallenge && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-10 space-y-6">
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            />

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Technology</p>
              <div className="flex gap-3 flex-wrap">
                {["All", "HTML/CSS", "JavaScript", "React"].map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedTech === tech
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-gray-700"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2 uppercase">Difficulty</p>
              <div className="flex gap-3 flex-wrap">
                {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      selectedDifficulty === difficulty
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 text-gray-700"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Challenge Grid */}
        {!activeChallenge && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold mb-3 text-gray-900">
                  {challenge.title}
                </h2>

                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${getTechColor(challenge.tech)}`}>
                    {challenge.tech}
                  </span>
                  <span className={`px-3 py-1 text-xs rounded-full border ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-6 line-clamp-3">
                  {challenge.description}
                </p>

                <button
                 onClick={() => {
    setActiveChallenge(challenge);
    scrollToTop();
  }}

                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-lg text-sm font-semibold"
                >
                  Start Challenge
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Active Challenge View */}
        {activeChallenge && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-indigo-600 text-white p-6">
              <button
                  onClick={() => {
    setActiveChallenge(null);
    setUserCode("");
    scrollToTop();
  }}
                className="text-sm mb-4 hover:underline"
              >
                ← Back to Challenges
              </button>
              <h2 className="text-3xl font-bold">{activeChallenge.title}</h2>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="text-gray-700">{activeChallenge.description}</p>
              </div>

              <div className="bg-slate-50 border border-gray-200 rounded-lg p-5">
                <h3 className="text-lg font-semibold mb-3">Requirements</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {activeChallenge.requirements.map((req, i) => (
                    <li key={i}>• {req}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Submit Your Solution</h3>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-80 border border-gray-300 rounded-lg p-4 text-sm font-mono focus:ring-2 focus:ring-indigo-500"
                  placeholder="Paste your code here..."
                />
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{userCode.length} characters</span>
                  <button
                    onClick={handleSubmit}
                    disabled={submitting || !userCode.trim()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Code"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
