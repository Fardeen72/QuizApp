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
  // ===================== 🟢 BASIC =====================
  {
    difficulty: "basic",
    question: "What type of database is MongoDB?",
    options: ["Relational", "Document-based NoSQL", "Graph", "Key-Value only"],
    answer: "Document-based NoSQL",
    explanation: "MongoDB stores data as flexible JSON-like documents.",
  },
  {
    difficulty: "basic",
    question: "What is a database in MongoDB?",
    options: [
      "A single document",
      "A collection of collections",
      "A table",
      "An index",
    ],
    answer: "A collection of collections",
    explanation: "A MongoDB database contains multiple collections.",
  },
  {
    difficulty: "basic",
    question: "What is a collection in MongoDB?",
    options: ["A row", "A group of documents", "A column", "A schema"],
    answer: "A group of documents",
    explanation: "Collections are like tables but store documents.",
  },
  {
    difficulty: "basic",
    question: "What format are MongoDB documents stored in?",
    options: ["XML", "CSV", "BSON", "Plain text"],
    answer: "BSON",
    explanation: "MongoDB stores documents in BSON, a binary form of JSON.",
  },
  {
    difficulty: "basic",
    question: "Which command inserts one document?",
    options: ["insert()", "addOne()", "insertOne()", "createOne()"],
    answer: "insertOne()",
    explanation: "insertOne() adds a single document to a collection.",
  },
  {
    difficulty: "basic",
    question: "Which command finds all documents?",
    options: ["findAll()", "find()", "get()", "select()"],
    answer: "find()",
    explanation: "find() returns documents that match a query.",
  },
  {
    difficulty: "basic",
    question: "Which field is automatically added to every document?",
    options: ["id", "_id", "primary", "uuid"],
    answer: "_id",
    explanation: "Each MongoDB document has a unique _id field.",
  },
  {
    difficulty: "basic",
    question: "Which command deletes one document?",
    options: ["removeOne()", "deleteOne()", "delete()", "remove()"],
    answer: "deleteOne()",
    explanation: "deleteOne() removes a single matching document.",
  },
  {
    difficulty: "basic",
    question: "Which command updates one document?",
    options: ["updateOne()", "editOne()", "changeOne()", "modifyOne()"],
    answer: "updateOne()",
    explanation: "updateOne() updates the first document that matches.",
  },
  {
    difficulty: "basic",
    question: "Which operator is used to set a field value?",
    options: ["$set", "$update", "$change", "$modify"],
    answer: "$set",
    explanation: "$set updates specific fields in a document.",
  },
  {
    difficulty: "basic",
    question: "Which shell command shows all databases?",
    options: ["show dbs", "list dbs", "db.show()", "show databases"],
    answer: "show dbs",
    explanation: "show dbs lists all databases in MongoDB shell.",
  },
  {
    difficulty: "basic",
    question: "Which shell command switches database?",
    options: ["use database", "switch db", "use <dbname>", "change db"],
    answer: "use <dbname>",
    explanation: "use <dbname> selects a database to work with.",
  },
  {
    difficulty: "basic",
    question: "Which data type stores true or false?",
    options: ["bool", "boolean", "binary", "flag"],
    answer: "boolean",
    explanation: "MongoDB supports boolean true/false values.",
  },
  {
    difficulty: "basic",
    question: "Which method counts documents?",
    options: ["count()", "total()", "length()", "size()"],
    answer: "count()",
    explanation: "count() returns number of matching documents.",
  },
  {
    difficulty: "basic",
    question: "Which command creates a collection?",
    options: ["createCollection()", "newCollection()", "makeCollection()", "addCollection()"],
    answer: "createCollection()",
    explanation: "createCollection() explicitly creates a collection.",
  },

  // ===================== 🟡 MEDIUM =====================
  {
    difficulty: "medium",
    question: "Which operator is used for greater than comparison?",
    options: ["$gt", "$greater", "$more", "$above"],
    answer: "$gt",
    explanation: "$gt filters values greater than a given number.",
  },
  {
    difficulty: "medium",
    question: "Which operator matches values in an array?",
    options: ["$in", "$arr", "$match", "$has"],
    answer: "$in",
    explanation: "$in matches any value from a given list.",
  },
  {
    difficulty: "medium",
    question: "Which operator removes a field?",
    options: ["$remove", "$delete", "$unset", "$clear"],
    answer: "$unset",
    explanation: "$unset deletes a field from a document.",
  },
  {
    difficulty: "medium",
    question: "Which method sorts results?",
    options: ["sort()", "order()", "arrange()", "filter()"],
    answer: "sort()",
    explanation: "sort() orders query results.",
  },
  {
    difficulty: "medium",
    question: "Which method limits number of documents returned?",
    options: ["limit()", "max()", "top()", "slice()"],
    answer: "limit()",
    explanation: "limit() restricts number of returned documents.",
  },
  {
    difficulty: "medium",
    question: "Which method skips documents?",
    options: ["skip()", "omit()", "ignore()", "next()"],
    answer: "skip()",
    explanation: "skip() skips a number of documents.",
  },
  {
    difficulty: "medium",
    question: "Which stage is used in aggregation pipeline to filter?",
    options: ["$match", "$filter", "$where", "$select"],
    answer: "$match",
    explanation: "$match filters documents in aggregation.",
  },
  {
    difficulty: "medium",
    question: "Which stage groups documents?",
    options: ["$group", "$collect", "$bundle", "$cluster"],
    answer: "$group",
    explanation: "$group groups documents by a field.",
  },
  {
    difficulty: "medium",
    question: "Which stage reshapes documents?",
    options: ["$project", "$shape", "$format", "$modify"],
    answer: "$project",
    explanation: "$project selects and formats fields.",
  },
  {
    difficulty: "medium",
    question: "Which index improves query performance?",
    options: ["search index", "query index", "collection index", "field index"],
    answer: "field index",
    explanation: "Indexes on fields speed up search operations.",
  },
  {
    difficulty: "medium",
    question: "Which command creates an index?",
    options: ["createIndex()", "addIndex()", "makeIndex()", "index()"],
    answer: "createIndex()",
    explanation: "createIndex() builds an index on a field.",
  },
  {
    difficulty: "medium",
    question: "Which feature allows flexible document structure?",
    options: ["Schema-free design", "Strict schema", "Fixed tables", "Joins"],
    answer: "Schema-free design",
    explanation: "MongoDB allows documents with different fields.",
  },
  {
    difficulty: "medium",
    question: "Which operator adds value to an array?",
    options: ["$push", "$add", "$insert", "$append"],
    answer: "$push",
    explanation: "$push adds an element to an array field.",
  },
  {
    difficulty: "medium",
    question: "Which operator prevents duplicate array values?",
    options: ["$unique", "$noDup", "$addToSet", "$distinct"],
    answer: "$addToSet",
    explanation: "$addToSet adds value only if it does not exist.",
  },
  {
    difficulty: "medium",
    question: "Which method returns distinct field values?",
    options: ["distinct()", "unique()", "separate()", "groupBy()"],
    answer: "distinct()",
    explanation: "distinct() returns unique values of a field.",
  },

  // ===================== 🔴 HARD =====================
  {
    difficulty: "hard",
    question: "Which replication type does MongoDB use?",
    options: ["Master-Slave", "Replica Set", "Cluster Pair", "Mirror"],
    answer: "Replica Set",
    explanation: "MongoDB uses replica sets for high availability.",
  },
  {
    difficulty: "hard",
    question: "Which feature distributes data across servers?",
    options: ["Replication", "Sharding", "Indexing", "Aggregation"],
    answer: "Sharding",
    explanation: "Sharding splits data across multiple machines.",
  },
  {
    difficulty: "hard",
    question: "Which write concern ensures majority acknowledgment?",
    options: ["w:1", "w:0", "w:majority", "w:all"],
    answer: "w:majority",
    explanation: "w:majority waits for majority of nodes to confirm write.",
  },
  {
    difficulty: "hard",
    question: "Which read concern ensures majority committed data?",
    options: ["local", "available", "majority", "linearizable"],
    answer: "majority",
    explanation: "majority ensures data is replicated to most nodes.",
  },
  {
    difficulty: "hard",
    question: "Which stage joins collections in aggregation?",
    options: ["$lookup", "$join", "$merge", "$combine"],
    answer: "$lookup",
    explanation: "$lookup performs left outer join between collections.",
  },
  {
    difficulty: "hard",
    question: "Which stage writes aggregation results to a collection?",
    options: ["$out", "$save", "$store", "$write"],
    answer: "$out",
    explanation: "$out saves aggregation results to a collection.",
  },
  {
    difficulty: "hard",
    question: "Which method creates a text index?",
    options: ["createTextIndex()", "textIndex()", "createIndex({ field: 'text' })", "addTextIndex()"],
    answer: "createIndex({ field: 'text' })",
    explanation: "Text indexes enable text search queries.",
  },
  {
    difficulty: "hard",
    question: "Which operator searches text index?",
    options: ["$text", "$search", "$findText", "$matchText"],
    answer: "$text",
    explanation: "$text performs text search on indexed fields.",
  },
  {
    difficulty: "hard",
    question: "Which tool provides MongoDB GUI?",
    options: ["MongoStudio", "Mongo Compass", "Mongo Manager", "Mongo UI"],
    answer: "Mongo Compass",
    explanation: "MongoDB Compass is official GUI tool.",
  },
  {
    difficulty: "hard",
    question: "Which storage engine is default in modern MongoDB?",
    options: ["MMAPv1", "WiredTiger", "InnoDB", "RocksDB"],
    answer: "WiredTiger",
    explanation: "WiredTiger is the default storage engine.",
  },
  {
    difficulty: "hard",
    question: "Which aggregation stage sorts documents?",
    options: ["$sort", "$order", "$arrange", "$rank"],
    answer: "$sort",
    explanation: "$sort orders documents in pipeline.",
  },
  {
    difficulty: "hard",
    question: "Which operator performs regex search?",
    options: ["$regex", "$pattern", "$match", "$search"],
    answer: "$regex",
    explanation: "$regex matches string patterns.",
  },
  {
    difficulty: "hard",
    question: "Which command shows collection indexes?",
    options: ["getIndexes()", "showIndexes()", "listIndexes()", "indexes()"],
    answer: "getIndexes()",
    explanation: "getIndexes() lists indexes of a collection.",
  },
  {
    difficulty: "hard",
    question: "Which feature allows schema validation?",
    options: ["Schema Rules", "Validator", "Structure Mode", "JSON Rules"],
    answer: "Validator",
    explanation: "Validators enforce document structure rules.",
  },
  {
    difficulty: "hard",
    question: "Which stage merges results into existing collection?",
    options: ["$merge", "$out", "$combine", "$insert"],
    answer: "$merge",
    explanation: "$merge writes results into a collection with control options.",
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

export default function MongodbQuiz() {
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
  MongoDB Database Quiz
</h1>
<p className="text-xl text-blue-100 leading-relaxed">
  Test your knowledge of MongoDB and NoSQL database concepts.
  Choose your level and strengthen your database skills.
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
  Learn the basics of MongoDB including documents, collections,
  CRUD operations, and how data is stored in NoSQL databases.
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
  Go deeper into MongoDB concepts like queries, indexes,
  aggregation, and improving database performance.
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
  Challenge yourself with advanced MongoDB topics like replication,
  sharding, schema validation, and building scalable database systems.
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
  Solve practical MongoDB questions based on real database and backend scenarios
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
