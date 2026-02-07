import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, increment, collection, addDoc } from "firebase/firestore";
import AuthModal from "@/components/AuthModel";

/* ===================== QUESTIONS ===================== */
export const allQuestions = [
  // ===================== 🟢 BASIC (15) =====================
  {
    difficulty: "basic",
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
    ],
    answer: "Cascading Style Sheets",
    explanation: "CSS means Cascading Style Sheets. It's used to style HTML elements.",
  },
  {
    difficulty: "basic",
    question: "Which property is used to change text color?",
    options: ["font-color", "text-color", "color", "fg-color"],
    answer: "color",
    explanation: "color property sets the text color of an element.",
  },
  {
    difficulty: "basic",
    question: "Which property is used to change background color?",
    options: ["bg-color", "background-color", "color-background", "bgcolor"],
    answer: "background-color",
    explanation: "background-color sets the background color of an element.",
  },
  {
    difficulty: "basic",
    question: "Which property is used to change font size?",
    options: ["text-size", "font-size", "size", "text-style"],
    answer: "font-size",
    explanation: "font-size controls the size of text.",
  },
  {
    difficulty: "basic",
    question: "Which property is used to make text bold?",
    options: ["text-weight", "font-weight", "bold", "text-bold"],
    answer: "font-weight",
    explanation: "font-weight is used to make text bold. Use font-weight: bold;",
  },
  {
    difficulty: "basic",
    question: "Which property is used to align text?",
    options: ["align", "text-align", "text-position", "alignment"],
    answer: "text-align",
    explanation: "text-align aligns text (left, right, center, justify).",
  },
  {
    difficulty: "basic",
    question: "Which property adds space inside an element?",
    options: ["margin", "padding", "spacing", "inner-space"],
    answer: "padding",
    explanation: "padding adds space inside an element, between content and border.",
  },
  {
    difficulty: "basic",
    question: "Which property adds space outside an element?",
    options: ["margin", "padding", "spacing", "outer-space"],
    answer: "margin",
    explanation: "margin adds space outside an element, between elements.",
  },
  {
    difficulty: "basic",
    question: "Which property is used to add a border?",
    options: ["border", "outline", "edge", "frame"],
    answer: "border",
    explanation: "border adds a border around an element. Example: border: 1px solid black;",
  },
  {
    difficulty: "basic",
    question: "Which property changes the width of an element?",
    options: ["width", "size", "w", "element-width"],
    answer: "width",
    explanation: "width sets the width of an element.",
  },
  {
    difficulty: "basic",
    question: "Which property changes the height of an element?",
    options: ["height", "size", "h", "element-height"],
    answer: "height",
    explanation: "height sets the height of an element.",
  },
  {
    difficulty: "basic",
    question: "Which symbol is used for class selector?",
    options: ["#", ".", "@", "*"],
    answer: ".",
    explanation: "Dot (.) is used for class selector. Example: .myClass",
  },
  {
    difficulty: "basic",
    question: "Which symbol is used for ID selector?",
    options: ["#", ".", "@", "*"],
    answer: "#",
    explanation: "Hash (#) is used for ID selector. Example: #myId",
  },
  {
    difficulty: "basic",
    question: "How do you write a comment in CSS?",
    options: ["// comment", "<!-- comment -->", "/* comment */", "# comment"],
    answer: "/* comment */",
    explanation: "CSS comments use /* */ syntax.",
  },
  {
    difficulty: "basic",
    question: "Which property is used to hide an element?",
    options: ["visibility: hidden", "display: none", "hide: true", "show: false"],
    answer: "display: none",
    explanation: "display: none completely removes element from layout.",
  },

  // ===================== 🟡 MEDIUM (15) =====================
  {
    difficulty: "medium",
    question: "Which property is used to change the font family?",
    options: ["font-family", "font-style", "font-type", "typeface"],
    answer: "font-family",
    explanation: "font-family changes the font. Example: font-family: Arial, sans-serif;",
  },
  {
    difficulty: "medium",
    question: "Which property controls the transparency of an element?",
    options: ["transparency", "opacity", "visibility", "alpha"],
    answer: "opacity",
    explanation: "opacity controls transparency. Values: 0 (invisible) to 1 (opaque).",
  },
  {
    difficulty: "medium",
    question: "Which property adds shadow to text?",
    options: ["text-shadow", "shadow", "font-shadow", "text-glow"],
    answer: "text-shadow",
    explanation: "text-shadow adds shadow effect to text.",
  },
  {
    difficulty: "medium",
    question: "Which property adds shadow to box/element?",
    options: ["box-shadow", "shadow", "element-shadow", "border-shadow"],
    answer: "box-shadow",
    explanation: "box-shadow adds shadow around elements.",
  },
  {
    difficulty: "medium",
    question: "Which property rounds the corners of an element?",
    options: ["corner-radius", "border-radius", "round-corner", "edge-radius"],
    answer: "border-radius",
    explanation: "border-radius creates rounded corners.",
  },
  {
    difficulty: "medium",
    question: "Which display value makes elements appear side by side?",
    options: ["display: block", "display: inline", "display: flex", "display: inline-block"],
    answer: "display: inline-block",
    explanation: "inline-block allows elements side by side while respecting width/height.",
  },
  {
    difficulty: "medium",
    question: "Which property controls the order of stacked elements?",
    options: ["z-index", "stack", "layer", "order"],
    answer: "z-index",
    explanation: "z-index controls stacking order. Higher values appear on top.",
  },
  {
    difficulty: "medium",
    question: "Which position value removes element from normal flow?",
    options: ["position: static", "position: relative", "position: absolute", "position: fixed"],
    answer: "position: absolute",
    explanation: "position: absolute removes element from flow and positions relative to parent.",
  },
  {
    difficulty: "medium",
    question: "Which property is used to create flexible layouts?",
    options: ["display: block", "display: flex", "display: grid", "display: inline"],
    answer: "display: flex",
    explanation: "display: flex creates flexible box layouts (Flexbox).",
  },
  {
    difficulty: "medium",
    question: "Which property changes cursor appearance on hover?",
    options: ["cursor", "pointer", "mouse", "hover"],
    answer: "cursor",
    explanation: "cursor property changes cursor style. Example: cursor: pointer;",
  },
  {
    difficulty: "medium",
    question: "Which property controls spacing between lines of text?",
    options: ["line-height", "line-spacing", "text-spacing", "row-height"],
    answer: "line-height",
    explanation: "line-height sets the space between lines of text.",
  },
  {
    difficulty: "medium",
    question: "Which property controls spacing between letters?",
    options: ["letter-spacing", "char-spacing", "text-spacing", "spacing"],
    answer: "letter-spacing",
    explanation: "letter-spacing adjusts space between characters.",
  },
  {
    difficulty: "medium",
    question: "Which property makes text uppercase?",
    options: ["text-style", "text-transform", "font-case", "text-case"],
    answer: "text-transform",
    explanation: "text-transform changes case. Values: uppercase, lowercase, capitalize.",
  },
  {
    difficulty: "medium",
    question: "Which property adds underline to text?",
    options: ["text-decoration", "text-style", "underline", "text-line"],
    answer: "text-decoration",
    explanation: "text-decoration adds underline, overline, or line-through.",
  },
  {
    difficulty: "medium",
    question: "Which property controls overflow content?",
    options: ["overflow", "scroll", "hide", "clip"],
    answer: "overflow",
    explanation: "overflow controls what happens when content is too big (visible, hidden, scroll).",
  },

  // ===================== 🔴 HARD (15) =====================
  {
    difficulty: "hard",
    question: "Which is the correct CSS syntax?",
    options: [
      "body {color: black}",
      "body:color=black",
      "{body: color=black}",
      "body = color: black",
    ],
    answer: "body {color: black}",
    explanation: "CSS syntax: selector { property: value; }",
  },
  {
    difficulty: "hard",
    question: "What is the default position value?",
    options: ["relative", "absolute", "static", "fixed"],
    answer: "static",
    explanation: "position: static is the default. Elements follow normal flow.",
  },
  {
    difficulty: "hard",
    question: "Which position value stays fixed when scrolling?",
    options: ["position: static", "position: relative", "position: absolute", "position: fixed"],
    answer: "position: fixed",
    explanation: "position: fixed keeps element fixed relative to viewport when scrolling.",
  },
  {
    difficulty: "hard",
    question: "What does !important do?",
    options: [
      "Makes CSS faster",
      "Overrides all other styles",
      "Adds priority class",
      "Validates CSS",
    ],
    answer: "Overrides all other styles",
    explanation: "!important gives a style highest priority, overriding other rules.",
  },
  {
    difficulty: "hard",
    question: "Which pseudo-class selects the first child?",
    options: [":first", ":first-child", ":child(1)", ":nth-child(1)"],
    answer: ":first-child",
    explanation: ":first-child selects the first child element of a parent.",
  },
  {
    difficulty: "hard",
    question: "Which property creates a grid layout?",
    options: ["display: flex", "display: grid", "display: table", "display: inline-grid"],
    answer: "display: grid",
    explanation: "display: grid creates a grid-based layout system.",
  },
  {
    difficulty: "hard",
    question: "What does box-sizing: border-box do?",
    options: [
      "Adds border to box",
      "Includes padding and border in total width",
      "Creates border around box",
      "Removes box model",
    ],
    answer: "Includes padding and border in total width",
    explanation: "border-box includes padding and border in element's total width/height.",
  },
  {
    difficulty: "hard",
    question: "Which unit is relative to the viewport width?",
    options: ["em", "rem", "vw", "px"],
    answer: "vw",
    explanation: "vw (viewport width) is relative to 1% of viewport width.",
  },
  {
    difficulty: "hard",
    question: "Which unit is relative to root font size?",
    options: ["em", "rem", "px", "%"],
    answer: "rem",
    explanation: "rem (root em) is relative to root element's font-size.",
  },
  {
    difficulty: "hard",
    question: "What is the correct way to link external CSS?",
    options: [
      "<style src='style.css'>",
      "<link rel='stylesheet' href='style.css'>",
      "<css href='style.css'>",
      "<stylesheet src='style.css'>",
    ],
    answer: "<link rel='stylesheet' href='style.css'>",
    explanation: "<link> tag in <head> links external CSS files.",
  },
  {
    difficulty: "hard",
    question: "Which property controls flexbox direction?",
    options: ["flex-direction", "flex-flow", "direction", "flex-wrap"],
    answer: "flex-direction",
    explanation: "flex-direction sets main axis (row, column, row-reverse, column-reverse).",
  },
  {
    difficulty: "hard",
    question: "Which property aligns flex items on main axis?",
    options: ["align-items", "justify-content", "align-content", "flex-align"],
    answer: "justify-content",
    explanation: "justify-content aligns items along the main axis in flexbox.",
  },
  {
    difficulty: "hard",
    question: "Which property aligns flex items on cross axis?",
    options: ["align-items", "justify-content", "align-content", "flex-align"],
    answer: "align-items",
    explanation: "align-items aligns items along the cross axis in flexbox.",
  },
  {
    difficulty: "hard",
    question: "What does the calc() function do?",
    options: [
      "Calculates color values",
      "Performs mathematical calculations in CSS",
      "Counts elements",
      "Validates CSS",
    ],
    answer: "Performs mathematical calculations in CSS",
    explanation: "calc() performs calculations. Example: width: calc(100% - 50px);",
  },
  {
    difficulty: "hard",
    question: "Which pseudo-class selects on hover?",
    options: [":hover", ":active", ":focus", ":mouseover"],
    answer: ":hover",
    explanation: ":hover applies styles when user hovers over an element.",
  },
];

/* ===================== HELPER FUNCTION ===================== */
const getQuestionsByLevel = (level) => {
  return allQuestions.filter((q) => q.difficulty === level);
};

/* ===================== LOCAL STORAGE HELPERS ===================== */
const STORAGE_KEY = "quiz4coder_css_progress";

const saveProgressToLocalStorage = (quizData) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push({
      ...quizData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    console.log("CSS Progress saved to localStorage");
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
    console.log("localStorage CSS progress cleared");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

const syncLocalStorageToFirebase = async (user) => {
  try {
    const localProgress = getLocalStorageProgress();
    if (localProgress.length === 0) return;

    console.log(`Syncing ${localProgress.length} CSS quizzes from localStorage to Firebase`);

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    let totalCompleted = localProgress.length;
    let totalScore = localProgress.reduce((sum, quiz) => sum + quiz.percentage, 0);
    let avgScore = Math.round(totalScore / totalCompleted);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const currentCompleted = data.quizzesCompleted || 0;
      const currentAvgScore = data.averageScore || 0;

      // Merge local data with existing data
      totalCompleted += currentCompleted;
      avgScore = Math.round(
        (currentAvgScore * currentCompleted + totalScore) / totalCompleted
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

    // Clear localStorage after successful sync
    clearLocalStorageProgress();
    console.log("Successfully synced localStorage CSS data to Firebase");
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
            <p className="text-gray-600">Your score has been added to the leaderboard</p>
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
                {saving ? "Saving..." : displayName.trim() ? "Save with Name" : "Save as Anonymous"}
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

export default function CSSQuiz() {
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
      
      // Sync localStorage data when user logs in
      if (u) {
        syncLocalStorageToFirebase(u);
      }
      
      // If user just logged in and had attempted a level, start it now
      if (u && attemptedLevel) {
        console.log("User logged in, starting attempted level:", attemptedLevel);
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
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("🎯 startLevel called");
    console.log("📋 Selected Level:", selectedLevel);
    console.log("👤 User object:", user);
    console.log("🔐 User logged in:", !!user);
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    
    // ✅ FIRST CHECK: Block medium & hard if not logged in
    const requiresLogin = selectedLevel === "medium" || selectedLevel === "hard";
    const isLoggedIn = !!user;
    
    console.log("🔍 Requires login?", requiresLogin);
    console.log("🔍 Is user logged in?", isLoggedIn);
    
    if (requiresLogin && !isLoggedIn) {
      console.log("🚫 ACCESS DENIED!");
      console.log("🚫 User must login for", selectedLevel);
      console.log("🚫 Opening login modal...");
      
      setAttemptedLevel(selectedLevel); // Save which level they wanted
      setShowLogin(true);
      
      console.log("🛑 STOPPING - NOT loading questions");
      console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
      return; // 🛑 CRITICAL: EXIT FUNCTION HERE
    }

    // ✅ User is logged in OR it's basic level - Allow access
    console.log("✅ ACCESS GRANTED!");
    console.log("✅ Loading questions for:", selectedLevel);
    
    const qs = getQuestionsByLevel(selectedLevel);
    console.log("✅ Questions found:", qs.length);
    
    if (qs.length === 0) {
      console.error("❌ ERROR: No questions available for this level");
      alert("No questions available for this level.");
      return;
    }

    console.log("✅ Setting up quiz state...");
    setQuestions(qs);
    setLevel(selectedLevel);
    setCurrentIndex(0);
    setSelectedOption("");
    setShowExplanation(false);
    setAnswers([]);
    setFinished(false);
    
    console.log("✅ Quiz state set successfully");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");

    // Scroll to top to show quiz
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exitQuiz = () => navigate("/");


  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
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
      // Scroll to top smoothly
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
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
      // Scroll to top smoothly
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 0);
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
      
      // If user is logged in, save to Firebase
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            const currentAttempted = data.quizzesAttempted || 0;
            const currentCompleted = data.quizzesCompleted || 0;
            const currentAvgScore = data.averageScore || 0;

            // Calculate new average score
            const totalQuizzes = currentCompleted + 1;
            const newAvgScore = Math.round(
              (currentAvgScore * currentCompleted + percentage) / totalQuizzes
            );

            // Update stats
            await updateDoc(userRef, {
              quizzesAttempted: increment(1),
              quizzesCompleted: increment(1),
              averageScore: newAvgScore,
              lastQuizDate: new Date().toISOString(),
            });

            console.log("CSS Stats updated in Firebase");
          } else {
            // Create initial user document
            await setDoc(userRef, {
              quizzesAttempted: 1,
              quizzesCompleted: 1,
              averageScore: percentage,
              lastQuizDate: new Date().toISOString(),
            });

            console.log("Initial CSS stats created in Firebase");
          }
        } catch (error) {
          console.error("Error updating Firebase stats:", error);
        }
      } else {
        // If user is not logged in, save to localStorage
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
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <button
              onClick={exitQuiz}
              className="flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </button>
            
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                CSS Styling Quiz
              </h1>
              <p className="text-xl text-purple-100 leading-relaxed">
                Master the art of styling with CSS. Test your knowledge and become a styling expert.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* User Status Banner */}
          {!user && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <div className="text-amber-600 text-xl">ℹ️</div>
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 mb-1">Sign in to unlock all levels</h3>
                <p className="text-sm text-amber-800">
                  You can try the Basic level for free. Sign in to access Medium and Hard challenges.
                </p>
              </div>
            </div>
          )}

          {/* Level Cards */}
          <div className="space-y-6 mb-12">
            {/* Basic Level - ✅ FREE ACCESS */}
            <button
              onClick={() => startLevel("basic")}
              className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 hover:border-purple-500 hover:shadow-lg transition-all duration-200 text-left group"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-lg flex items-center justify-center text-2xl sm:text-3xl">
                    🎨
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Basic Level</h2>
                    <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
                      FREE - No Login Required
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Learn CSS fundamentals. Perfect for beginners exploring colors, fonts, and basic styling.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      15 Questions
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ~8 minutes
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Beginner
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-purple-500 group-hover:translate-x-1 transition-transform self-start sm:self-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Medium Level - 🔒 LOGIN REQUIRED */}
            <button
              onClick={() => {
                console.log("🔘 Medium button clicked");
                console.log("🔐 User state:", !!user);
                if (!user) {
                  console.log("🚫 Button click blocked - showing login modal");
                  setShowLogin(true);
                  setAttemptedLevel("medium");
                  return;
                }
                startLevel("medium");
              }}
              className={`w-full border-2 rounded-xl p-6 transition-all duration-200 text-left group ${
                user
                  ? "bg-white border-gray-200 hover:border-purple-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl relative ${
                    user ? "bg-yellow-100" : "bg-gray-200"
                  }`}>
                    {user ? "⚡" : "🔒"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Medium Level</h2>
                    {!user && (
                      <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        🔒 LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Explore advanced CSS. Master flexbox, positioning, shadows, and modern layout techniques.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      15 Questions
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ~12 minutes
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Intermediate
                    </span>
                  </div>
                </div>
                <div className={`flex-shrink-0 transition-transform self-start sm:self-center ${
                  user ? "text-purple-500 group-hover:translate-x-1" : "text-gray-400"
                }`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Hard Level - 🔒 LOGIN REQUIRED */}
            <button
              onClick={() => {
                console.log("🔘 Hard button clicked");
                console.log("🔐 User state:", !!user);
                if (!user) {
                  console.log("🚫 Button click blocked - showing login modal");
                  setShowLogin(true);
                  setAttemptedLevel("hard");
                  return;
                }
                startLevel("hard");
              }}
              className={`w-full border-2 rounded-xl p-6 transition-all duration-200 text-left group ${
                user
                  ? "bg-white border-gray-200 hover:border-purple-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-2xl sm:text-3xl relative ${
                    user ? "bg-red-100" : "bg-gray-200"
                  }`}>
                    {user ? "🚀" : "🔒"}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Hard Level</h2>
                    {!user && (
                      <span className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        🔒 LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Master expert-level CSS. Challenge yourself with grid, calc(), pseudo-classes, and advanced concepts.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      15 Questions
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      ~15 minutes
                    </span>
                    <span className="flex items-center gap-1 sm:gap-2">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Advanced
                    </span>
                  </div>
                </div>
                <div className={`flex-shrink-0 transition-transform self-start sm:self-center ${
                  user ? "text-purple-500 group-hover:translate-x-1" : "text-gray-400"
                }`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* Info Section */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Choose Your Level</h4>
                  <p className="text-sm text-gray-600">
                    Select a difficulty that matches your current skill level
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Answer Questions</h4>
                  <p className="text-sm text-gray-600">
                    Work through 15 carefully crafted questions
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Learn & Improve</h4>
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
      if (percentage >= 90) return { text: "Excellent!", color: "text-green-600", icon: "🌟" };
      if (percentage >= 75) return { text: "Great Work!", color: "text-purple-600", icon: "🎉" };
      if (percentage >= 60) return { text: "Good Effort", color: "text-yellow-600", icon: "👍" };
      return { text: "Keep Learning", color: "text-orange-600", icon: "📚" };
    };
    const scoreMessage = getScoreMessage();
    const passed = percentage >= 75;

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">Quiz Results</h1>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Score Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-100 rounded-full mb-4">
                <span className="text-4xl">{scoreMessage.icon}</span>
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${scoreMessage.color}`}>
                {scoreMessage.text}
              </h2>
              <p className="text-gray-600">
                You completed the {level.charAt(0).toUpperCase() + level.slice(1)} Level Quiz
              </p>
            </div>

            {/* Score Display */}
            <div className="bg-gray-50 rounded-xl p-8 mb-6">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-gray-900 mb-2">
                  {percentage}%
                </div>
                <p className="text-gray-600 text-lg">
                  {passed ? "Passing Score" : "Score"}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    passed ? "bg-green-500" : "bg-orange-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-green-600 mb-1">{correct}</div>
                  <div className="text-sm text-gray-600 font-medium">Correct</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-red-600 mb-1">{incorrect}</div>
                  <div className="text-sm text-gray-600 font-medium">Incorrect</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-3xl font-bold text-gray-600 mb-1">{skipped}</div>
                  <div className="text-sm text-gray-600 font-medium">Skipped</div>
                </div>
              </div>
            </div>

            {/* Pass/Fail Message */}
            {passed ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Congratulations!</h3>
                  <p className="text-sm text-green-800">
                    You've successfully passed this level. Keep up the great work and continue learning!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <span className="text-blue-600 text-xl">💡</span>
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">Keep Practicing</h3>
                  <p className="text-sm text-blue-800">
                    Review the explanations and try again. You need 75% or higher to pass this level.
                  </p>
                </div>
              </div>
            )}
          </div>

          
          {/* Action Buttons */}
          

          <div className="space-y-3">
                        <button
              onClick={() => setShowLeaderboardModal(true)}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg"
            >
              <span className="text-xl">🏆</span>
              Save to Leaderboard
            </button>
            <button
              onClick={restartQuiz}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
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
      {/* Minimal Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={exitQuiz}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Exit
            </button>
            
            <span className="text-sm text-gray-600">
              {currentIndex + 1}/{questions.length} <span className="capitalize text-gray-400">• {level}</span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Compact */}
      <div className="flex-1 max-w-3xl w-full mx-auto px-4 py-6">
        {currentQuestion ? (
          <>
            {/* Question */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                {currentQuestion.question}
              </h2>

              {/* Options - Compact */}
              <div className="space-y-2">
                {currentQuestion.options?.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === currentQuestion.answer;
                  const showCorrect = showExplanation && isCorrect;
                  const showIncorrect = showExplanation && isSelected && !isCorrect;

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
                          ? "bg-purple-50 border-purple-500"
                          : "bg-white border-gray-200 hover:border-purple-300"
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
                              ? "bg-purple-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {showCorrect ? "✓" : showIncorrect ? "✗" : String.fromCharCode(65 + i)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation - Compact */}
            {showExplanation && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-purple-900 text-sm mb-1">Explanation</h3>
                    <p className="text-sm text-purple-800">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons - Compact */}
            <div className="flex gap-2">
              {!showExplanation ? (
                <>
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedOption}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg text-sm"
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
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  {currentIndex < questions.length - 1 ? "Next Question" : "View Results"}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Mini Stats */}
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