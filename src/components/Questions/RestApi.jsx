import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase";
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
{
  difficulty: "basic",
  question: "What does API stand for?",
  options: [
    "Application Programming Interface",
    "Application Process Integration",
    "Advanced Program Interaction",
    "Automated Programming Interface"
  ],
  answer: "Application Programming Interface",
  explanation: "API allows different software systems to communicate with each other."
},
{
  difficulty: "basic",
  question: "What does REST stand for?",
  options: [
    "Remote Execution System Technology",
    "Representational State Transfer",
    "Rapid Endpoint Service Transfer",
    "Resource Execution Standard Technique"
  ],
  answer: "Representational State Transfer",
  explanation: "REST is an architectural style used to design networked applications."
},
{
  difficulty: "basic",
  question: "Which HTTP method is used to get data?",
  options: ["GET", "POST", "PUT", "DELETE"],
  answer: "GET",
  explanation: "GET is used to request data from a server."
},
{
  difficulty: "basic",
  question: "Which HTTP method is used to send new data to server?",
  options: ["GET", "POST", "PATCH", "HEAD"],
  answer: "POST",
  explanation: "POST is used to create new resources on the server."
},
{
  difficulty: "basic",
  question: "Which format is most commonly used in REST APIs?",
  options: ["XML", "HTML", "JSON", "TXT"],
  answer: "JSON",
  explanation: "JSON is lightweight and easy for both humans and machines to read."
},
{
  difficulty: "basic",
  question: "Which HTTP method is used to delete data?",
  options: ["GET", "POST", "DELETE", "FETCH"],
  answer: "DELETE",
  explanation: "DELETE removes a resource from the server."
},
{
  difficulty: "basic",
  question: "Which HTTP method is safe and does not change server data?",
  options: ["POST", "DELETE", "GET", "PUT"],
  answer: "GET",
  explanation: "GET only retrieves data and should not modify anything."
},
{
  difficulty: "basic",
  question: "Which part of a URL identifies a specific resource?",
  options: ["Protocol", "Domain", "Endpoint path", "Port"],
  answer: "Endpoint path",
  explanation: "The path like /users/5 points to a specific resource."
},
{
  difficulty: "basic",
  question: "Which status code means resource created successfully?",
  options: ["200", "201", "404", "500"],
  answer: "201",
  explanation: "201 Created means a new resource was successfully created."
},
{
  difficulty: "basic",
  question: "Which status code means server error?",
  options: ["200", "301", "400", "500"],
  answer: "500",
  explanation: "500 indicates an internal server error."
},
{
  difficulty: "basic",
  question: "Which tool is commonly used to test REST APIs?",
  options: ["Photoshop", "Postman", "Figma", "Excel"],
  answer: "Postman",
  explanation: "Postman is used to send API requests and inspect responses."
},
{
  difficulty: "basic",
  question: "Which method is used to update data partially?",
  options: ["PUT", "PATCH", "POST", "GET"],
  answer: "PATCH",
  explanation: "PATCH updates only selected fields."
},
{
  difficulty: "basic",
  question: "Where are query parameters placed?",
  options: ["In headers", "In body", "After ? in URL", "Inside JSON"],
  answer: "After ? in URL",
  explanation: "Example: /users?age=20"
},
{
  difficulty: "basic",
  question: "Which format uses key-value pairs like {name: 'John'}?",
  options: ["XML", "HTML", "JSON", "CSV"],
  answer: "JSON",
  explanation: "JSON is the most common data format in REST APIs."
},
{
  difficulty: "basic",
  question: "Which protocol is mainly used for REST APIs?",
  options: ["FTP", "SMTP", "HTTP", "SSH"],
  answer: "HTTP",
  explanation: "REST APIs work over HTTP protocol."
},

{
  difficulty: "medium",
  question: "Which HTTP method is used to update existing data completely?",
  options: ["PATCH", "PUT", "POST", "UPDATE"],
  answer: "PUT",
  explanation: "PUT replaces the entire resource with new data."
},
{
  difficulty: "medium",
  question: "Which HTTP method is used to partially update data?",
  options: ["PUT", "POST", "PATCH", "MODIFY"],
  answer: "PATCH",
  explanation: "PATCH updates only specific fields of a resource."
},
{
  difficulty: "medium",
  question: "Which status code means 'Success'?",
  options: ["404", "200", "500", "301"],
  answer: "200",
  explanation: "200 OK means the request was successful."
},
{
  difficulty: "medium",
  question: "Which status code means 'Not Found'?",
  options: ["200", "403", "404", "302"],
  answer: "404",
  explanation: "404 means the requested resource does not exist."
},
{
  difficulty: "medium",
  question: "What is an endpoint in REST API?",
  options: [
    "The server hardware",
    "A URL where API can be accessed",
    "A database table",
    "Frontend route"
  ],
  answer: "A URL where API can be accessed",
  explanation: "Endpoints are specific URLs that perform API actions."
},
{
  difficulty: "medium",
  question: "Which status code means 'Bad Request'?",
  options: ["200", "400", "401", "500"],
  answer: "400",
  explanation: "400 means the client sent invalid data."
},
{
  difficulty: "medium",
  question: "Which status code means 'Unauthorized'?",
  options: ["401", "403", "404", "302"],
  answer: "401",
  explanation: "401 means authentication is required or failed."
},
{
  difficulty: "medium",
  question: "Which status code means 'Forbidden'?",
  options: ["401", "403", "200", "500"],
  answer: "403",
  explanation: "403 means access is denied even if logged in."
},
{
  difficulty: "medium",
  question: "What does CRUD stand for?",
  options: [
    "Create Read Update Delete",
    "Copy Remove Update Delete",
    "Create Replace Use Delete",
    "Control Read Update Deploy"
  ],
  answer: "Create Read Update Delete",
  explanation: "CRUD represents basic database operations."
},
{
  difficulty: "medium",
  question: "Which HTTP method is idempotent?",
  options: ["POST", "PATCH", "PUT", "CONNECT"],
  answer: "PUT",
  explanation: "Multiple PUT requests give the same result."
},
{
  difficulty: "medium",
  question: "Where is request data usually sent in a POST request?",
  options: ["URL path", "Headers", "Request body", "Status code"],
  answer: "Request body",
  explanation: "POST sends data in the request body."
},
{
  difficulty: "medium",
  question: "Which header tells the server the data format being sent?",
  options: ["Accept", "Authorization", "Content-Type", "Cache-Control"],
  answer: "Content-Type",
  explanation: "Example: Content-Type: application/json"
},
{
  difficulty: "medium",
  question: "Which header tells what format client expects back?",
  options: ["Content-Type", "Accept", "Host", "Referer"],
  answer: "Accept",
  explanation: "Accept: application/json tells server expected response format."
},
{
  difficulty: "medium",
  question: "Which is a RESTful URL?",
  options: [
    "/getUsers",
    "/users",
    "/create-user",
    "/deleteUserById"
  ],
  answer: "/users",
  explanation: "REST uses nouns (resources), not verbs."
},
{
  difficulty: "medium",
  question: "Which method should be used to replace an entire resource?",
  options: ["PATCH", "PUT", "POST", "GET"],
  answer: "PUT",
  explanation: "PUT replaces full resource data."
}
,
{
  difficulty: "hard",
  question: "Which HTTP method is NOT idempotent?",
  options: ["GET", "PUT", "DELETE", "POST"],
  answer: "POST",
  explanation: "POST can create multiple resources if repeated."
},
{
  difficulty: "hard",
  question: "What does stateless mean in REST?",
  options: [
    "Server saves user sessions",
    "Each request is independent",
    "Client stores nothing",
    "Database has no state"
  ],
  answer: "Each request is independent",
  explanation: "Server does not remember previous requests."
},
{
  difficulty: "hard",
  question: "What is the purpose of JWT in APIs?",
  options: [
    "Data storage",
    "Authentication and authorization",
    "Database connection",
    "Speed optimization"
  ],
  answer: "Authentication and authorization",
  explanation: "JWT securely verifies user identity."
},
{
  difficulty: "hard",
  question: "Which header usually carries JWT token?",
  options: ["Token", "Authentication", "Authorization", "Secure"],
  answer: "Authorization",
  explanation: "Authorization: Bearer <token>"
},
{
  difficulty: "hard",
  question: "What is rate limiting used for?",
  options: [
    "Faster database queries",
    "Limiting client requests",
    "Reducing JSON size",
    "Compressing responses"
  ],
  answer: "Limiting client requests",
  explanation: "Prevents abuse and protects API."
},
{
  difficulty: "hard",
  question: "What does HATEOAS stand for?",
  options: [
    "Hypermedia As The Engine Of Application State",
    "High Application Transfer Engine",
    "Hyper Transfer Encoding System",
    "Host Application Transfer Engine"
  ],
  answer: "Hypermedia As The Engine Of Application State",
  explanation: "HATEOAS is a REST constraint using links in responses."
},
{
  difficulty: "hard",
  question: "Which status code means 'Conflict'?",
  options: ["400", "401", "409", "500"],
  answer: "409",
  explanation: "409 occurs when request conflicts with current server state."
},
{
  difficulty: "hard",
  question: "Which caching header helps reduce server load?",
  options: ["Expires", "Authorization", "Cookie", "Origin"],
  answer: "Expires",
  explanation: "Caching headers reduce repeated server calls."
},
{
  difficulty: "hard",
  question: "What is the main benefit of stateless APIs?",
  options: [
    "Less memory usage on server",
    "Better graphics rendering",
    "Faster HTML loading",
    "More CSS control"
  ],
  answer: "Less memory usage on server",
  explanation: "Server doesn’t store sessions, so it scales better."
},
{
  difficulty: "hard",
  question: "Which method is best for retrieving large filtered data sets?",
  options: ["POST", "GET with query params", "DELETE", "PUT"],
  answer: "GET with query params",
  explanation: "Filters are usually passed via query parameters."
},

{
  difficulty: "hard",
  question: "What does it mean that REST APIs are stateless?",
  options: [
    "Server stores all user sessions",
    "Each request contains all required information",
    "Server remembers previous requests",
    "Client stores data permanently"
  ],
  answer: "Each request contains all required information",
  explanation: "Server does not store client session. Every request must include authentication and data."
},
{
  difficulty: "hard",
  question: "Which HTTP methods are idempotent?",
  options: [
    "GET, PUT, DELETE",
    "POST, PATCH",
    "POST only",
    "PATCH only"
  ],
  answer: "GET, PUT, DELETE",
  explanation: "Calling these multiple times results in the same server state."
},
{
  difficulty: "hard",
  question: "What is typically used to secure REST APIs?",
  options: ["CSS", "JWT Tokens", "HTML Forms", "Cookies only"],
  answer: "JWT Tokens",
  explanation: "JWT (JSON Web Token) is widely used for authentication."
},
{
  difficulty: "hard",
  question: "Which header is used to send authentication token?",
  options: ["Auth", "Authorization", "Token", "Access"],
  answer: "Authorization",
  explanation: "Authorization header carries tokens like 'Bearer <token>'."
},
{
  difficulty: "hard",
  question: "What is rate limiting in APIs?",
  options: [
    "Limiting number of database tables",
    "Limiting number of requests a client can make",
    "Reducing API speed",
    "Limiting response size"
  ],
  answer: "Limiting number of requests a client can make",
  explanation: "Rate limiting prevents abuse and protects the server."
}



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

export default function RestApiQuiz() {
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
               Getting Started with REST APIs Quiz
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Strengthen your REST API knowledge used in real world development.
Choose your level and start leveling up your backend skills.
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
                    Understand REST API basics from the ground up. A great starting point for new backend learners.
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
                   Explore REST APIs in more detail. Check your knowledge of requests, responses, and data handling.
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
                   Tackle advanced REST API design and architecture. Great for those serious about mastering APIs
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
