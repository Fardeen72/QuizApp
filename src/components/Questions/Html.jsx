import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  addDoc,
} from "firebase/firestore";
import AuthModal from "@/components/AuthModel";

/* ===================== QUESTIONS ===================== */
export const allQuestions = [
  // ===================== 🟢 BASIC (15) =====================
  {
    difficulty: "basic",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Mark Language",
      "Hyper Tool Markup Language",
      "Home Text Markup Language",
    ],
    answer: "Hyper Text Markup Language",
    explanation:
      "HTML means Hyper Text Markup Language. It builds the structure of web pages.",
  },
  {
    difficulty: "basic",
    question: "Which tag is used to create a paragraph in HTML?",
    options: ["<p>", "<h1>", "<div>", "<span>"],
    answer: "<p>",
    explanation: "<p> is used to write paragraphs (normal text blocks).",
  },
  {
    difficulty: "basic",
    question: "Which tag is used for the biggest heading?",
    options: ["<h6>", "<h1>", "<head>", "<title>"],
    answer: "<h1>",
    explanation: "<h1> is the largest heading tag in HTML.",
  },
  {
    difficulty: "basic",
    question: "Which tag is used to insert an image?",
    options: ["<image>", "<img>", "<pic>", "<src>"],
    answer: "<img>",
    explanation:
      "<img> is used to show images and uses src attribute for file path.",
  },
  {
    difficulty: "basic",
    question: "Which attribute is used to add image path?",
    options: ["href", "src", "link", "path"],
    answer: "src",
    explanation: "src contains the image URL/path inside the <img> tag.",
  },
  {
    difficulty: "basic",
    question: "Which tag creates a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>",
    explanation: "<a> is used for links. It uses href attribute.",
  },
  {
    difficulty: "basic",
    question: "Which attribute defines link destination?",
    options: ["src", "href", "target", "url"],
    answer: "href",
    explanation: "href contains the link address (URL).",
  },
  {
    difficulty: "basic",
    question: "Which tag is used to break a line?",
    options: ["<break>", "<br>", "<lb>", "<newline>"],
    answer: "<br>",
    explanation: "<br> adds a line break and does not need a closing tag.",
  },
  {
    difficulty: "basic",
    question: "Which tag is used for unordered list?",
    options: ["<ol>", "<ul>", "<li>", "<list>"],
    answer: "<ul>",
    explanation: "<ul> creates bullet list. Items use <li>.",
  },
  {
    difficulty: "basic",
    question: "Which tag is used for ordered list?",
    options: ["<ol>", "<ul>", "<li>", "<order>"],
    answer: "<ol>",
    explanation: "<ol> creates numbered list. Items use <li>.",
  },
  {
    difficulty: "basic",
    question: "Which tag creates a list item?",
    options: ["<item>", "<li>", "<ul>", "<ol>"],
    answer: "<li>",
    explanation: "<li> is a list item used inside <ul> or <ol>.",
  },
  {
    difficulty: "basic",
    question: "Which tag is used to create a button?",
    options: ["<btn>", "<button>", "<input>", "<click>"],
    answer: "<button>",
    explanation: "<button> creates a clickable button in HTML.",
  },
  {
    difficulty: "basic",
    question: "Which tag is used to take input from user?",
    options: ["<text>", "<form>", "<input>", "<write>"],
    answer: "<input>",
    explanation:
      "<input> is used to take user input like text, email, password etc.",
  },
  {
    difficulty: "basic",
    question: "Which tag is used to create a form?",
    options: ["<form>", "<input>", "<fieldset>", "<submit>"],
    answer: "<form>",
    explanation: "<form> wraps inputs and sends data when submitted.",
  },
  {
    difficulty: "basic",
    question: "Which attribute provides extra info when image fails to load?",
    options: ["src", "title", "alt", "name"],
    answer: "alt",
    explanation: "alt gives alternative text and helps accessibility + SEO.",
  },

  // ===================== 🟡 MEDIUM (15) =====================
  {
    difficulty: "medium",
    question: "Which tag is used to create a table?",
    options: ["<table>", "<tr>", "<td>", "<th>"],
    answer: "<table>",
    explanation: "<table> creates a table structure in HTML.",
  },
  {
    difficulty: "medium",
    question: "Which tag creates a table row?",
    options: ["<row>", "<tr>", "<td>", "<th>"],
    answer: "<tr>",
    explanation: "<tr> represents one row inside a table.",
  },
  {
    difficulty: "medium",
    question: "Which tag creates a normal table cell?",
    options: ["<tr>", "<td>", "<th>", "<cell>"],
    answer: "<td>",
    explanation: "<td> is a standard table data cell.",
  },
  {
    difficulty: "medium",
    question: "Which tag creates a table header cell?",
    options: ["<td>", "<thead>", "<th>", "<header>"],
    answer: "<th>",
    explanation: "<th> is table header cell and is bold by default.",
  },
  {
    difficulty: "medium",
    question: "Which attribute opens a link in new tab?",
    options: ["href", "target", "open", "rel"],
    answer: "target",
    explanation: "Use target='_blank' to open link in new tab.",
  },
  {
    difficulty: "medium",
    question: "Which input type hides typed characters?",
    options: ["hidden", "password", "secure", "private"],
    answer: "password",
    explanation: "type='password' hides characters while typing.",
  },
  {
    difficulty: "medium",
    question: "Which tag is used to create dropdown?",
    options: ["<dropdown>", "<select>", "<option>", "<list>"],
    answer: "<select>",
    explanation: "<select> makes dropdown menu; <option> makes items.",
  },
  {
    difficulty: "medium",
    question: "Which tag is used to create dropdown options?",
    options: ["<select>", "<option>", "<li>", "<drop>"],
    answer: "<option>",
    explanation: "<option> defines each item inside a dropdown.",
  },
  {
    difficulty: "medium",
    question: "Which tag is used to display a checkbox?",
    options: ["<checkbox>", "<input type='checkbox'>", "<check>", "<box>"],
    answer: "<input type='checkbox'>",
    explanation: "Checkbox is created using input type='checkbox'.",
  },
  {
    difficulty: "medium",
    question: "Which tag is used to create a multiline input?",
    options: ["<input>", "<textarea>", "<text>", "<area>"],
    answer: "<textarea>",
    explanation: "<textarea> is used for multi-line user text.",
  },
  {
    difficulty: "medium",
    question: "Which tag is used to embed audio?",
    options: ["<sound>", "<mp3>", "<audio>", "<media>"],
    answer: "<audio>",
    explanation: "<audio controls> embeds audio with player controls.",
  },
  {
    difficulty: "medium",
    question: "Which tag is used to embed video?",
    options: ["<movie>", "<video>", "<media>", "<player>"],
    answer: "<video>",
    explanation: "<video controls> embeds a video with controls.",
  },
  {
    difficulty: "medium",
    question: "Which tag defines the main part of a page?",
    options: ["<main>", "<body>", "<section>", "<article>"],
    answer: "<main>",
    explanation: "<main> contains the main content of the page (semantic tag).",
  },
  {
    difficulty: "medium",
    question: "Which tag is best for navigation links?",
    options: ["<menu>", "<nav>", "<links>", "<header>"],
    answer: "<nav>",
    explanation: "<nav> is semantic tag for navigation links.",
  },
  {
    difficulty: "medium",
    question: "Which tag is used to group inputs in a form?",
    options: ["<group>", "<fieldset>", "<section>", "<formgroup>"],
    answer: "<fieldset>",
    explanation: "<fieldset> groups related form controls together.",
  },

  // ===================== 🔴 HARD (15) =====================
  {
    difficulty: "hard",
    question: "Where does the <title> tag belong?",
    options: [
      "Inside <body>",
      "Inside <header>",
      "Inside <head>",
      "Inside <footer>",
    ],
    answer: "Inside <head>",
    explanation:
      "<title> must be inside <head>. It controls browser tab title.",
  },
  {
    difficulty: "hard",
    question: "Which meta tag makes website responsive?",
    options: [
      "<meta charset='UTF-8'>",
      "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
      "<meta name='responsive' content='true'>",
      "<meta http-equiv='responsive'>",
    ],
    answer:
      "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
    explanation: "Viewport meta tag controls layout scaling on mobile devices.",
  },
  {
    difficulty: "hard",
    question: "Which tag is semantic (gives meaning)?",
    options: ["<div>", "<span>", "<section>", "<font>"],
    answer: "<section>",
    explanation:
      "<section> is semantic tag; <div> and <span> are not semantic.",
  },
  {
    difficulty: "hard",
    question: "What is correct HTML comment syntax?",
    options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
    answer: "<!-- comment -->",
    explanation: "HTML comments use <!-- --> and are ignored by browser.",
  },
  {
    difficulty: "hard",
    question: "Which attribute improves security for target=_blank links?",
    options: ["safe", "rel='noopener noreferrer'", "href-safe", "secure"],
    answer: "rel='noopener noreferrer'",
    explanation:
      "rel='noopener noreferrer' prevents security risks when opening new tabs.",
  },
  {
    difficulty: "hard",
    question: "Which is correct semantic structure for page header?",
    options: ["<top>", "<header>", "<head>", "<navhead>"],
    answer: "<header>",
    explanation: "<header> is used for page header content like logo/title.",
  },
  {
    difficulty: "hard",
    question:
      "Which tag is used to define content that can stand alone (blog post/news)?",
    options: ["<section>", "<article>", "<div>", "<main>"],
    answer: "<article>",
    explanation: "<article> is used for self-contained content like a post.",
  },
  {
    difficulty: "hard",
    question: "What is the correct way to make an input required?",
    options: ["required='true'", "required", "must", "validate"],
    answer: "required",
    explanation:
      "required attribute makes input mandatory (boolean attribute).",
  },
  {
    difficulty: "hard",
    question: "Which HTML tag groups related options inside <select>?",
    options: ["<group>", "<optgroup>", "<fieldset>", "<options>"],
    answer: "<optgroup>",
    explanation: "<optgroup> groups dropdown options with a label.",
  },
  {
    difficulty: "hard",
    question: "Which tag is used to define a caption for a table?",
    options: ["<caption>", "<title>", "<label>", "<thead>"],
    answer: "<caption>",
    explanation: "<caption> adds title/caption to a table.",
  },
  {
    difficulty: "hard",
    question: "Which attribute is used to merge table columns?",
    options: ["rowspan", "colspan", "merge", "join"],
    answer: "colspan",
    explanation: "colspan merges columns in table cells.",
  },
  {
    difficulty: "hard",
    question: "Which attribute is used to merge table rows?",
    options: ["rowspan", "colspan", "merge", "join"],
    answer: "rowspan",
    explanation: "rowspan merges rows in table cells.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of aria-label?",
    options: [
      "Adds color to element",
      "Helps screen readers",
      "Loads CSS",
      "Adds SEO keywords",
    ],
    answer: "Helps screen readers",
    explanation:
      "aria-label helps accessibility and improves screen reader support.",
  },
  {
    difficulty: "hard",
    question: "Which tag is used to show small print text (like copyright)?",
    options: ["<small>", "<mini>", "<tiny>", "<span-small>"],
    answer: "<small>",
    explanation: "<small> is used for small text like disclaimers/copyright.",
  },
  {
    difficulty: "hard",
    question: "Which tag is used to mark emphasized text?",
    options: ["<b>", "<strong>", "<em>", "<mark>"],
    answer: "<em>",
    explanation: "<em> means emphasis (semantic). <b> is only style.",
  },
];

/* ===================== HELPER FUNCTION ===================== */
const getQuestionsByLevel = (level) => {
  return allQuestions.filter((q) => q.difficulty === level);
};

/* ===================== LOCAL STORAGE HELPERS ===================== */
const STORAGE_KEY = "quiz4coder_progress";

const saveProgressToLocalStorage = (quizData) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push({
      ...quizData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    console.log("Progress saved to localStorage");
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

const getLocalStorageProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch (error) {
    console.error("Error reading localStorage:", error);
    return [];
  }
};

const clearLocalStorageProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log("localStorage progress cleared");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

const syncLocalStorageToFirebase = async (user) => {
  try {
    const localProgress = getLocalStorageProgress();
    if (localProgress.length === 0) return;

    console.log(
      `Syncing ${localProgress.length} quizzes from localStorage to Firebase`,
    );

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    let totalCompleted = localProgress.length;
    let totalScore = localProgress.reduce(
      (sum, quiz) => sum + quiz.percentage,
      0,
    );
    let avgScore = Math.round(totalScore / totalCompleted);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const currentCompleted = data.quizzesCompleted || 0;
      const currentAvgScore = data.averageScore || 0;

      totalCompleted += currentCompleted;
      avgScore = Math.round(
        (currentAvgScore * currentCompleted + totalScore) / totalCompleted,
      );

      await updateDoc(userRef, {
        quizzesAttempted: increment(localProgress.length),
        quizzesCompleted: increment(localProgress.length),
        averageScore: avgScore,
        lastQuizDate: new Date().toISOString(),
      });
    } else {
      await setDoc(userRef, {
        quizzesAttempted: totalCompleted,
        quizzesCompleted: totalCompleted,
        averageScore: avgScore,
        lastQuizDate: new Date().toISOString(),
      });
    }

    clearLocalStorageProgress();
    console.log("Successfully synced localStorage data to Firebase");
  } catch (error) {
    console.error("Error syncing localStorage to Firebase:", error);
  }
};

/* ===================== SAVE TO LEADERBOARD MODAL ===================== */
function SaveToLeaderboardModal({ close, scoreData, userId }) {
  const [displayName, setDisplayName] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const leaderboardRef = collection(db, "leaderboard");

      await addDoc(leaderboardRef, {
        userId: userId || "anonymous",
        displayName: displayName.trim() || null,
        level: scoreData.level,
        percentage: scoreData.percentage,
        correct: scoreData.correct,
        incorrect: scoreData.incorrect,
        skipped: scoreData.skipped,
        totalQuestions: scoreData.totalQuestions,
        submittedAt: new Date().toISOString(),
      });

      setSaved(true);
      setTimeout(() => {
        close();
      }, 1500);
    } catch (error) {
      console.error("Error saving to leaderboard:", error);
      alert("Failed to save to leaderboard. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
        {saved ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <span className="text-4xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Saved!</h2>
            <p className="text-gray-600">
              Your score has been added to the leaderboard
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <span className="text-4xl">🏆</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Save to Leaderboard
              </h2>
              <p className="text-gray-600">
                Share your achievement with others!
              </p>
            </div>

            {/* Score Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Your Score:</span>
                <span className="text-2xl font-bold text-blue-600">
                  {scoreData.percentage}%
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">Level:</span>
                <span className="font-medium text-gray-900 capitalize">
                  {scoreData.level}
                </span>
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name (Optional)
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name or leave blank"
                maxLength={30}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="mt-2 text-xs text-gray-500">
                Leave blank to appear as "Anonymous" on the leaderboard
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
              >
                {saving
                  ? "Saving..."
                  : displayName.trim()
                    ? "Save with Name"
                    : "Save as Anonymous"}
              </button>

              <button
                onClick={close}
                disabled={saving}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg border-2 border-gray-300 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function HTMLQuiz() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [attemptedLevel, setAttemptedLevel] = useState(null);

  const [level, setLevel] = useState("");
  const [questions, setQuestions] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);

  // 🆕 NEW: State for leaderboard modal
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);

      if (u) {
        syncLocalStorageToFirebase(u);
      }

      if (u && attemptedLevel) {
        console.log(
          "User logged in, starting attempted level:",
          attemptedLevel,
        );
        const qs = getQuestionsByLevel(attemptedLevel);
        if (qs.length > 0) {
          setQuestions(qs);
          setLevel(attemptedLevel);
          setCurrentIndex(0);
          setSelectedOption("");
          setShowExplanation(false);
          setAnswers([]);
          setFinished(false);
        }
        setAttemptedLevel(null);
        setShowLogin(false);
      }
    });
    return () => unsub();
  }, [attemptedLevel]);

  /* ================= LEVEL SELECT ================= */
  const startLevel = (selectedLevel) => {
    const requiresLogin =
      selectedLevel === "medium" || selectedLevel === "hard";
    const isLoggedIn = !!user;

    if (requiresLogin && !isLoggedIn) {
      setAttemptedLevel(selectedLevel);
      setShowLogin(true);
      return;
    }

    const qs = getQuestionsByLevel(selectedLevel);

    if (qs.length === 0) {
      alert("No questions available for this level.");
      return;
    }

    setQuestions(qs);
    setLevel(selectedLevel);
    setCurrentIndex(0);
    setSelectedOption("");
    setShowExplanation(false);
    setAnswers([]);
    setFinished(false);
  };

  const exitQuiz = () => navigate("/");

  /* ================= QUIZ LOGIC ================= */
  const handleSubmitAnswer = () => {
    if (!selectedOption) return;
    setShowExplanation(true);
  };

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion?.answer;

    const newAnswers = [
      ...answers,
      {
        question: currentQuestion?.question,
        selected: selectedOption,
        correct: currentQuestion?.answer,
        isCorrect,
        explanation: currentQuestion?.explanation,
      },
    ];

    setAnswers(newAnswers);
    setSelectedOption("");
    setShowExplanation(false);

    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    const currentQuestion = questions[currentIndex];

    const newAnswers = [
      ...answers,
      {
        question: currentQuestion?.question,
        selected: null,
        correct: currentQuestion?.answer,
        isCorrect: false,
        explanation: currentQuestion?.explanation,
        skipped: true,
      },
    ];

    setAnswers(newAnswers);
    setSelectedOption("");
    setShowExplanation(false);

    if (currentIndex + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption("");
    setShowExplanation(false);
    setAnswers([]);
    setFinished(false);
  };

  /* ================= CALCULATE SCORE ================= */
  const getScore = () => {
    const correct = answers.filter((a) => a.isCorrect).length;
    const incorrect = answers.filter((a) => !a.isCorrect && !a.skipped).length;
    const skipped = answers.filter((a) => a.skipped).length;
    const percentage = Math.round((correct / answers.length) * 100);
    return { correct, incorrect, skipped, percentage };
  };

  /* ================= UPDATE STATS (FIREBASE OR LOCAL STORAGE) ================= */
  useEffect(() => {
    const updateStats = async () => {
      if (!finished) return;

      const { percentage, correct, incorrect, skipped } = getScore();

      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            const currentAttempted = data.quizzesAttempted || 0;
            const currentCompleted = data.quizzesCompleted || 0;
            const currentAvgScore = data.averageScore || 0;

            const totalQuizzes = currentCompleted + 1;
            const newAvgScore = Math.round(
              (currentAvgScore * currentCompleted + percentage) / totalQuizzes,
            );

            await updateDoc(userRef, {
              quizzesAttempted: increment(1),
              quizzesCompleted: increment(1),
              averageScore: newAvgScore,
              lastQuizDate: new Date().toISOString(),
            });

            console.log("Stats updated in Firebase");
          } else {
            await setDoc(userRef, {
              quizzesAttempted: 1,
              quizzesCompleted: 1,
              averageScore: percentage,
              lastQuizDate: new Date().toISOString(),
            });

            console.log("Initial stats created in Firebase");
          }
        } catch (error) {
          console.error("Error updating Firebase stats:", error);
        }
      } else {
        saveProgressToLocalStorage({
          level,
          percentage,
          correct,
          incorrect,
          skipped,
          totalQuestions: answers.length,
        });
      }
    };

    updateStats();
  }, [finished, user, answers, level]);

  /* ================= LEVEL SCREEN ================= */
  if (!level) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={exitQuiz}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Home
            </button>

            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                HTML Fundamentals Quiz
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Test your knowledge and master the building blocks of the web.
                Choose your skill level and start learning.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-12">
          {!user && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <div className="text-amber-600 text-xl">ℹ️</div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 mb-1">
                  Sign in to unlock all levels
                </h3>
                <p className="text-sm text-amber-800">
                  You can try the Basic level for free. Sign in to access Medium
                  and Hard challenges.
                </p>
              </div>
            </div>
          )}

          <div className="space-y-6 mb-12">
            <button
              onClick={() => startLevel("basic")}
              className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 hover:border-blue-500 hover:shadow-lg transition-all duration-200 text-left group"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-lg flex items-center justify-center text-2xl sm:text-3xl">
                    ✓
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Basic Level
                    </h2>
                    <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
                      FREE - No Login Required
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Master the fundamentals of HTML. Perfect for beginners
                    starting their web development journey.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      15 Questions
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      ~8 minutes
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Beginner
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-blue-500 group-hover:translate-x-1 transition-transform self-start sm:self-center">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                if (!user) {
                  setShowLogin(true);
                  setAttemptedLevel("medium");
                  return;
                }
                startLevel("medium");
              }}
              className={`w-full border-2 rounded-xl p-6 transition-all duration-200 text-left group ${
                user
                  ? "bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl relative ${
                      user ? "bg-yellow-100" : "bg-gray-200"
                    }`}
                  >
                    {user ? "⚡" : "🔒"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Medium Level
                    </h2>
                    {!user && (
                      <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        🔒 LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Dive deeper into HTML concepts. Test your understanding of
                    tables, forms, and semantic elements.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      15 Questions
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      ~12 minutes
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Intermediate
                    </span>
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 transition-transform self-start sm:self-center ${
                    user
                      ? "text-blue-500 group-hover:translate-x-1"
                      : "text-gray-400"
                  }`}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={() => {
                if (!user) {
                  setShowLogin(true);
                  setAttemptedLevel("hard");
                  return;
                }
                startLevel("hard");
              }}
              className={`w-full border-2 rounded-xl p-6 transition-all duration-200 text-left group ${
                user
                  ? "bg-white border-gray-200 hover:border-blue-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl relative ${
                      user ? "bg-red-100" : "bg-gray-200"
                    }`}
                  >
                    {user ? "🎯" : "🔒"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Hard Level
                    </h2>
                    {!user && (
                      <span className="px-2 sm:px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        🔒 LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Challenge yourself with advanced HTML topics. Perfect for
                    those aiming to master web standards.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      15 Questions
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      ~15 minutes
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Advanced
                    </span>
                  </div>
                </div>
                <div
                  className={`flex-shrink-0 transition-transform self-start sm:self-center ${
                    user
                      ? "text-blue-500 group-hover:translate-x-1"
                      : "text-gray-400"
                  }`}
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              How It Works
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Choose Your Level
                  </h4>
                  <p className="text-sm text-gray-600">
                    Select a difficulty that matches your current skill level
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Answer Questions
                  </h4>
                  <p className="text-sm text-gray-600">
                    Work through 15 carefully crafted questions
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    Learn & Improve
                  </h4>
                  <p className="text-sm text-gray-600">
                    Get instant feedback with detailed explanations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showLogin && <AuthModal close={() => setShowLogin(false)} />}
      </div>
    );
  }

  /* ================= RESULT SCREEN ================= */
  if (finished) {
    const { correct, incorrect, skipped, percentage } = getScore();
    const getScoreMessage = () => {
      if (percentage >= 90)
        return { text: "Excellent!", color: "text-green-600", icon: "🌟" };
      if (percentage >= 75)
        return { text: "Great Work!", color: "text-blue-600", icon: "🎉" };
      if (percentage >= 60)
        return { text: "Good Effort", color: "text-yellow-600", icon: "👍" };
      return { text: "Keep Learning", color: "text-orange-600", icon: "📚" };
    };
    const scoreMessage = getScoreMessage();
    const passed = percentage >= 75;

    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">Quiz Results</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                <span className="text-4xl">{scoreMessage.icon}</span>
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${scoreMessage.color}`}>
                {scoreMessage.text}
              </h2>
              <p className="text-gray-600">
                You completed the{" "}
                {level.charAt(0).toUpperCase() + level.slice(1)} Level Quiz
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 mb-6">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {percentage}%
                </div>
                <p className="text-gray-600 text-lg">
                  {passed ? "Passing Score" : "Score"}
                </p>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    passed ? "bg-green-500" : "bg-orange-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {correct}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Correct
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-red-600 mb-1">
                    {incorrect}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Incorrect
                  </div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-gray-600 mb-1">
                    {skipped}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Skipped
                  </div>
                </div>
              </div>
            </div>

            {passed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">
                    Congratulations!
                  </h3>
                  <p className="text-sm text-green-800">
                    You've successfully passed this level. Keep up the great
                    work and continue learning!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <span className="text-blue-600 text-xl">💡</span>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Keep Practicing
                  </h3>
                  <p className="text-sm text-blue-800">
                    Review the explanations and try again. You need 75% or
                    higher to pass this level.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 🆕 Action Buttons with Save to Leaderboard */}
          <div className="space-y-3">
            {/* 🏆 Save to Leaderboard Button */}
            <button
              onClick={() => setShowLeaderboardModal(true)}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <span className="text-xl">🏆</span>
              Save to Leaderboard
            </button>

            <button
              onClick={restartQuiz}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
            >
              Retry This Level
            </button>
            <button
              onClick={() => setLevel("")}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-lg border-2 border-gray-300 transition-colors duration-200"
            >
              Choose Another Level
            </button>
            <button
              onClick={exitQuiz}
              className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-lg border-2 border-gray-300 transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>

        {/* 🆕 Save to Leaderboard Modal */}
        {showLeaderboardModal && (
          <SaveToLeaderboardModal
            close={() => setShowLeaderboardModal(false)}
            scoreData={{
              level,
              percentage,
              correct,
              incorrect,
              skipped,
              totalQuestions: answers.length,
            }}
            userId={user?.uid}
          />
        )}
      </div>
    );
  }

  /* ================= QUIZ SCREEN ================= */
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="bg-gray-50">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={exitQuiz}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Exit
            </button>

            <span className="text-sm text-gray-600">
              {currentIndex + 1}/{questions.length}{" "}
              <span className="capitalize text-gray-400">• {level}</span>
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        {currentQuestion ? (
          <>
            <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {currentQuestion.question}
              </h2>

              <div className="space-y-2">
                {currentQuestion.options?.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === currentQuestion.answer;
                  const showCorrect = showExplanation && isCorrect;
                  const showIncorrect =
                    showExplanation && isSelected && !isCorrect;

                  return (
                    <button
                      key={i}
                      onClick={() => !showExplanation && setSelectedOption(opt)}
                      disabled={showExplanation}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border-2 transition-all text-sm ${
                        showCorrect
                          ? "bg-green-50 border-green-500"
                          : showIncorrect
                            ? "bg-red-50 border-red-500"
                            : isSelected
                              ? "bg-blue-50 border-blue-500"
                              : "bg-white border-gray-200 hover:border-blue-300"
                      } ${showExplanation ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                            showCorrect
                              ? "bg-green-500 text-white"
                              : showIncorrect
                                ? "bg-red-500 text-white"
                                : isSelected
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {showCorrect
                            ? "✓"
                            : showIncorrect
                              ? "✗"
                              : String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex gap-3">
                  <svg
                    className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-blue-900 text-sm mb-1">
                      Explanation
                    </h3>
                    <p className="text-sm text-blue-800">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              {!showExplanation ? (
                <>
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg text-sm"
                  >
                    Submit
                  </button>
                  <button
                    onClick={handleSkip}
                    className="px-6 bg-white hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg border border-gray-300 text-sm"
                  >
                    Skip
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  {currentIndex < questions.length - 1
                    ? "Next Question"
                    : "View Results"}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="mt-4 flex justify-center gap-4 text-xs text-gray-600">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                {answers.filter((a) => a.isCorrect).length} Correct
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                {answers.filter((a) => !a.isCorrect && !a.skipped).length} Wrong
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                {answers.filter((a) => a.skipped).length} Skipped
              </span>
            </div>
          </>
        ) : (
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center">
            <p className="text-gray-500 text-sm">No questions available.</p>
          </div>
        )}
      </div>
    </div>
  );
}
