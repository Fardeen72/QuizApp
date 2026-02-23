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
  // ===================== 🟢 BASIC =====================
  {
    difficulty: "basic",
    question: "What is Tailwind CSS?",
    options: [
      "A JavaScript framework",
      "A utility-first CSS framework",
      "A database",
      "A browser",
    ],
    answer: "A utility-first CSS framework",
    explanation: "Tailwind CSS is a utility-first framework for building custom designs.",
  },
  {
    difficulty: "basic",
    question: "Which class adds padding in Tailwind?",
    options: ["mg-4", "pd-4", "p-4", "space-4"],
    answer: "p-4",
    explanation: "p-4 adds padding on all sides.",
  },
  {
    difficulty: "basic",
    question: "Which class sets text color to blue?",
    options: ["text-blue", "font-blue", "color-blue", "text-blue-500"],
    answer: "text-blue-500",
    explanation: "text-blue-500 applies a medium blue text color.",
  },
  {
    difficulty: "basic",
    question: "Which class makes text bold?",
    options: ["font-bold", "text-bold", "bold", "fw-bold"],
    answer: "font-bold",
    explanation: "font-bold makes the text bold.",
  },
  {
    difficulty: "basic",
    question: "Which class centers text?",
    options: ["align-center", "text-center", "center-text", "justify-text"],
    answer: "text-center",
    explanation: "text-center aligns text to the center.",
  },
  {
    difficulty: "basic",
    question: "Which class applies margin on all sides?",
    options: ["m-4", "p-4", "space-4", "mg-4"],
    answer: "m-4",
    explanation: "m-4 adds margin on all sides.",
  },
  {
    difficulty: "basic",
    question: "Which class sets background color to red?",
    options: ["bg-red", "background-red", "bg-red-500", "color-red"],
    answer: "bg-red-500",
    explanation: "bg-red-500 applies a medium red background.",
  },
  {
    difficulty: "basic",
    question: "Which class makes an element rounded?",
    options: ["rounded", "radius", "round", "border-round"],
    answer: "rounded",
    explanation: "rounded adds border-radius.",
  },
  {
    difficulty: "basic",
    question: "Which class applies a shadow?",
    options: ["shadow", "box-shadow", "shadow-md", "drop-shadow"],
    answer: "shadow-md",
    explanation: "shadow-md adds a medium shadow.",
  },
  {
    difficulty: "basic",
    question: "Which class sets display to flex?",
    options: ["flexbox", "d-flex", "flex", "display-flex"],
    answer: "flex",
    explanation: "flex enables flexbox layout.",
  },
  {
    difficulty: "basic",
    question: "Which class makes text large?",
    options: ["text-big", "font-lg", "text-lg", "text-large"],
    answer: "text-lg",
    explanation: "text-lg increases font size.",
  },
  {
    difficulty: "basic",
    question: "Which class adds vertical padding?",
    options: ["px-4", "py-4", "p-4", "pv-4"],
    answer: "py-4",
    explanation: "py-4 adds padding top and bottom.",
  },
  {
    difficulty: "basic",
    question: "Which class hides an element?",
    options: ["invisible", "hidden", "d-none", "display-none"],
    answer: "hidden",
    explanation: "hidden sets display to none.",
  },
  {
    difficulty: "basic",
    question: "Which class sets width to full?",
    options: ["w-100", "w-full", "width-full", "full-width"],
    answer: "w-full",
    explanation: "w-full sets width to 100%.",
  },
  {
    difficulty: "basic",
    question: "Which class sets height to screen height?",
    options: ["h-100", "h-screen", "height-full", "screen-h"],
    answer: "h-screen",
    explanation: "h-screen sets height equal to viewport height.",
  },

  // ===================== 🟡 MEDIUM =====================
  {
    difficulty: "medium",
    question: "Which class centers items horizontally in flex?",
    options: ["items-center", "justify-center", "content-center", "align-center"],
    answer: "justify-center",
    explanation: "justify-center centers items horizontally.",
  },
  {
    difficulty: "medium",
    question: "Which class centers items vertically in flex?",
    options: ["items-center", "justify-center", "content-center", "align-middle"],
    answer: "items-center",
    explanation: "items-center aligns items vertically.",
  },
  {
    difficulty: "medium",
    question: "Which class creates a grid layout?",
    options: ["flex", "grid", "grid-layout", "display-grid"],
    answer: "grid",
    explanation: "grid enables CSS grid layout.",
  },
  {
    difficulty: "medium",
    question: "Which class makes 2 grid columns?",
    options: ["grid-2", "grid-cols-2", "cols-2", "col-2"],
    answer: "grid-cols-2",
    explanation: "grid-cols-2 creates two equal columns.",
  },
  {
    difficulty: "medium",
    question: "Which prefix is used for responsive design on medium screens?",
    options: ["sm:", "md:", "lg:", "xl:"],
    answer: "md:",
    explanation: "md: applies styles on medium screens and up.",
  },
  {
    difficulty: "medium",
    question: "Which class adds space between flex children?",
    options: ["gap-4", "space-4", "spacing-4", "between-4"],
    answer: "gap-4",
    explanation: "gap-4 adds spacing between grid or flex items.",
  },
  {
    difficulty: "medium",
    question: "Which class applies hover background color?",
    options: ["hover:bg-blue-500", "bg-hover-blue", "hover-blue", "hover-color"],
    answer: "hover:bg-blue-500",
    explanation: "hover:bg-blue-500 changes background on hover.",
  },
  {
    difficulty: "medium",
    question: "Which class controls overflow?",
    options: ["overflow-hidden", "hide-overflow", "overflow-none", "no-overflow"],
    answer: "overflow-hidden",
    explanation: "overflow-hidden hides overflowing content.",
  },
  {
    difficulty: "medium",
    question: "Which class makes position relative?",
    options: ["relative", "pos-relative", "position-relative", "rel"],
    answer: "relative",
    explanation: "relative sets position to relative.",
  },
  {
    difficulty: "medium",
    question: "Which class makes position absolute?",
    options: ["absolute", "pos-absolute", "position-absolute", "abs"],
    answer: "absolute",
    explanation: "absolute sets position to absolute.",
  },
  {
    difficulty: "medium",
    question: "Which class controls z-index?",
    options: ["z-10", "index-10", "zindex-10", "layer-10"],
    answer: "z-10",
    explanation: "z-10 sets z-index value.",
  },
  {
    difficulty: "medium",
    question: "Which class applies border?",
    options: ["border", "border-1", "b-1", "line"],
    answer: "border",
    explanation: "border adds a default border.",
  },
  {
    difficulty: "medium",
    question: "Which class rounds element fully?",
    options: ["rounded-full", "round-full", "radius-full", "circle"],
    answer: "rounded-full",
    explanation: "rounded-full makes element circular.",
  },
  {
    difficulty: "medium",
    question: "Which class sets max width for container?",
    options: ["container", "max-w-screen", "w-container", "max-container"],
    answer: "container",
    explanation: "container centers content with max width.",
  },
  {
    difficulty: "medium",
    question: "Which class makes cursor pointer?",
    options: ["cursor-pointer", "pointer", "clickable", "hand"],
    answer: "cursor-pointer",
    explanation: "cursor-pointer changes cursor to pointer.",
  },

  // ===================== 🔴 HARD =====================
  {
    difficulty: "hard",
    question: "Where do you customize Tailwind default theme?",
    options: ["tailwind.config.js", "theme.css", "config.css", "tailwind.theme"],
    answer: "tailwind.config.js",
    explanation: "You extend or customize theme inside tailwind.config.js.",
  },
  {
    difficulty: "hard",
    question: "Which directive imports Tailwind styles?",
    options: ["@tailwind base;", "@import tailwind;", "@use tailwind;", "@tailwindcss;"],
    answer: "@tailwind base;",
    explanation: "@tailwind base, components, utilities are used in CSS file.",
  },
  {
    difficulty: "hard",
    question: "Which class enables dark mode styling?",
    options: ["dark:", "mode-dark:", "dark-mode:", "theme-dark:"],
    answer: "dark:",
    explanation: "dark: prefix applies styles in dark mode.",
  },
  {
    difficulty: "hard",
    question: "Which class adds transition animation?",
    options: ["transition", "animate", "motion", "effect"],
    answer: "transition",
    explanation: "transition enables smooth property changes.",
  },
  {
    difficulty: "hard",
    question: "Which class controls animation duration?",
    options: ["duration-300", "time-300", "animate-300", "speed-300"],
    answer: "duration-300",
    explanation: "duration-300 sets transition duration.",
  },
  {
    difficulty: "hard",
    question: "Which class applies transform?",
    options: ["transform", "scale", "move", "translate"],
    answer: "transform",
    explanation: "transform enables transform utilities.",
  },
  {
    difficulty: "hard",
    question: "Which class scales element on hover?",
    options: ["hover:scale-110", "scale-hover-110", "hover:zoom-110", "grow-110"],
    answer: "hover:scale-110",
    explanation: "hover:scale-110 enlarges element slightly on hover.",
  },
  {
    difficulty: "hard",
    question: "Which class rotates element?",
    options: ["rotate-45", "turn-45", "spin-45", "angle-45"],
    answer: "rotate-45",
    explanation: "rotate-45 rotates element 45 degrees.",
  },
  {
    difficulty: "hard",
    question: "Which class makes element sticky?",
    options: ["sticky", "position-sticky", "fixed", "stick"],
    answer: "sticky",
    explanation: "sticky makes element stick within its container.",
  },
  {
    difficulty: "hard",
    question: "Which class controls object fit for images?",
    options: ["object-cover", "img-cover", "fit-cover", "cover"],
    answer: "object-cover",
    explanation: "object-cover ensures image covers container.",
  },
  {
    difficulty: "hard",
    question: "Which class controls backdrop blur?",
    options: ["backdrop-blur", "blur-bg", "background-blur", "blur-back"],
    answer: "backdrop-blur",
    explanation: "backdrop-blur applies blur behind element.",
  },
  {
    difficulty: "hard",
    question: "Which class sets aspect ratio?",
    options: ["aspect-square", "ratio-square", "square", "aspect-1"],
    answer: "aspect-square",
    explanation: "aspect-square sets equal width and height ratio.",
  },
  {
    difficulty: "hard",
    question: "Which class hides scrollbar in Tailwind plugin?",
    options: ["scrollbar-hide", "hide-scroll", "no-scrollbar", "overflow-hidden"],
    answer: "scrollbar-hide",
    explanation: "scrollbar-hide requires plugin to remove scrollbars.",
  },
  {
    difficulty: "hard",
    question: "Which class applies ring outline?",
    options: ["ring-2", "outline-ring", "border-ring", "ring-outline"],
    answer: "ring-2",
    explanation: "ring-2 adds focus ring effect.",
  },
  {
    difficulty: "hard",
    question: "Which class disables pointer events?",
    options: ["pointer-none", "no-pointer", "pointer-events-none", "disable-pointer"],
    answer: "pointer-events-none",
    explanation: "pointer-events-none prevents mouse interactions.",
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

export default function TailwindQuiz() {
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
  Tailwind CSS Quiz
</h1>
<p className="text-xl text-blue-100 leading-relaxed">
  Test your knowledge of Tailwind CSS and modern UI styling.
  Choose your level and improve your frontend design skills.
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
  Learn the basics of Tailwind CSS including utility classes,
  spacing, colors, typography, and layout fundamentals.
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
  Go deeper into Tailwind concepts like flexbox, grid, responsive
  design, hover states, and component styling.
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
  Challenge yourself with advanced Tailwind topics like custom
  configuration, dark mode, animations, and performance optimization.
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
  Solve practical Tailwind CSS questions based on real UI design scenarios
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
