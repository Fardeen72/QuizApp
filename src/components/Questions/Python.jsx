import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, increment, collection, addDoc } from "firebase/firestore";
import AuthModal from "@/components/AuthModel";
/* ===================== QUESTIONS ===================== */
// This file is imported by PythonQuiz.jsx
export const allQuestions = [
  // ===================== BASIC (15) =====================
  {
    difficulty: "basic",
    question: "What is Python?",
    options: [
      "A high-level, interpreted programming language",
      "A low-level compiled language",
      "A database management system",
      "A web framework",
    ],
    answer: "A high-level, interpreted programming language",
    explanation: "Python is a high-level, interpreted programming language known for its simplicity and readability.",
  },
  {
    difficulty: "basic",
    question: "How do you write a comment in Python?",
    options: ["# comment", "// comment", "/* comment */", "<!-- comment -->"],
    answer: "# comment",
    explanation: "Comments in Python start with the # symbol.",
  },
  {
    difficulty: "basic",
    question: "Which keyword is used to define a function?",
    options: ["def", "function", "func", "define"],
    answer: "def",
    explanation: "The def keyword is used to define functions in Python.",
  },
  {
    difficulty: "basic",
    question: "What is the correct way to print output in Python?",
    options: ["print()", "console.log()", "echo", "printf()"],
    answer: "print()",
    explanation: "print() is the built-in function to output data in Python.",
  },
  {
    difficulty: "basic",
    question: "Which data type is used to store text?",
    options: ["str", "string", "text", "char"],
    answer: "str",
    explanation: "str (string) is the data type used to store text in Python.",
  },
  {
    difficulty: "basic",
    question: "How do you create a list in Python?",
    options: ["[]", "{}", "()", "<>"],
    answer: "[]",
    explanation: "Lists in Python are created using square brackets [].",
  },
  {
    difficulty: "basic",
    question: "What is the index of the first element in a list?",
    options: ["0", "1", "-1", "first"],
    answer: "0",
    explanation: "Python lists are zero-indexed, so the first element is at index 0.",
  },
  {
    difficulty: "basic",
    question: "Which keyword is used to create a loop?",
    options: ["for", "loop", "repeat", "iterate"],
    answer: "for",
    explanation: "The for keyword is used to create loops in Python.",
  },
  {
    difficulty: "basic",
    question: "How do you check if a condition is true?",
    options: ["if", "when", "check", "condition"],
    answer: "if",
    explanation: "The if keyword is used for conditional statements in Python.",
  },
  {
    difficulty: "basic",
    question: "Which operator is used for equality comparison?",
    options: ["==", "=", "===", "equals"],
    answer: "==",
    explanation: "The == operator checks if two values are equal in Python.",
  },
  {
    difficulty: "basic",
    question: "How do you create a dictionary in Python?",
    options: ["{}", "[]", "()", "dict()"],
    answer: "{}",
    explanation: "Dictionaries are created using curly braces {} with key-value pairs.",
  },
  {
    difficulty: "basic",
    question: "What does the len() function do?",
    options: [
      "Returns the length of an object",
      "Creates a list",
      "Converts to string",
      "Sorts items",
    ],
    answer: "Returns the length of an object",
    explanation: "len() returns the number of items in an object like a list, string, or dictionary.",
  },
  {
    difficulty: "basic",
    question: "Which keyword is used to import modules?",
    options: ["import", "include", "require", "using"],
    answer: "import",
    explanation: "The import keyword is used to import modules and libraries in Python.",
  },
  {
    difficulty: "basic",
    question: "What is the correct way to define a variable?",
    options: ["x = 5", "var x = 5", "int x = 5", "let x = 5"],
    answer: "x = 5",
    explanation: "Variables in Python are defined using direct assignment without type declarations.",
  },
  {
    difficulty: "basic",
    question: "Which method adds an element to the end of a list?",
    options: ["append()", "add()", "push()", "insert()"],
    answer: "append()",
    explanation: "append() adds an element to the end of a list in Python.",
  },

  // ===================== MEDIUM (15) =====================
  {
    difficulty: "medium",
    question: "What is the difference between a list and a tuple?",
    options: [
      "Lists are mutable, tuples are immutable",
      "Lists are immutable, tuples are mutable",
      "Lists are faster than tuples",
      "There is no difference",
    ],
    answer: "Lists are mutable, tuples are immutable",
    explanation: "Lists can be modified after creation (mutable), while tuples cannot be changed (immutable).",
  },
  {
    difficulty: "medium",
    question: "What does the range() function return?",
    options: [
      "A sequence of numbers",
      "A random number",
      "The maximum value",
      "A list of strings",
    ],
    answer: "A sequence of numbers",
    explanation: "range() generates a sequence of numbers, commonly used in for loops.",
  },
  {
    difficulty: "medium",
    question: "Which method removes duplicates from a list?",
    options: [
      "Convert to set then back to list",
      "remove()",
      "unique()",
      "filter()",
    ],
    answer: "Convert to set then back to list",
    explanation: "Converting a list to a set removes duplicates, then convert back to list: list(set(my_list)).",
  },
  {
    difficulty: "medium",
    question: "What is list comprehension?",
    options: [
      "A concise way to create lists",
      "A method to sort lists",
      "A way to merge lists",
      "A list validation technique",
    ],
    answer: "A concise way to create lists",
    explanation: "List comprehension provides a concise syntax to create lists: [x for x in range(10)].",
  },
  {
    difficulty: "medium",
    question: "What does the split() method do?",
    options: [
      "Splits a string into a list",
      "Divides numbers",
      "Separates dictionary keys",
      "Breaks loops",
    ],
    answer: "Splits a string into a list",
    explanation: "split() divides a string into a list of substrings based on a delimiter.",
  },
  {
    difficulty: "medium",
    question: "Which keyword is used to handle exceptions?",
    options: ["try", "catch", "error", "handle"],
    answer: "try",
    explanation: "The try keyword is used with except to handle exceptions in Python.",
  },
  {
    difficulty: "medium",
    question: "What is the purpose of the __init__ method?",
    options: [
      "Initialize object attributes",
      "Delete objects",
      "Import modules",
      "Define static methods",
    ],
    answer: "Initialize object attributes",
    explanation: "__init__ is the constructor method that initializes object attributes when creating instances.",
  },
  {
    difficulty: "medium",
    question: "What does the join() method do?",
    options: [
      "Joins list elements into a string",
      "Merges two lists",
      "Combines dictionaries",
      "Connects to database",
    ],
    answer: "Joins list elements into a string",
    explanation: "join() concatenates list elements into a single string with a separator.",
  },
  {
    difficulty: "medium",
    question: "Which function reads user input?",
    options: ["input()", "read()", "get()", "scan()"],
    answer: "input()",
    explanation: "input() reads a line of text from user input and returns it as a string.",
  },
  {
    difficulty: "medium",
    question: "What is a lambda function?",
    options: [
      "Anonymous one-line function",
      "Named function",
      "Class method",
      "Built-in function",
    ],
    answer: "Anonymous one-line function",
    explanation: "Lambda functions are small anonymous functions defined with the lambda keyword.",
  },
  {
    difficulty: "medium",
    question: "Which method converts a string to lowercase?",
    options: ["lower()", "lowercase()", "toLower()", "downcase()"],
    answer: "lower()",
    explanation: "lower() converts all characters in a string to lowercase.",
  },
  {
    difficulty: "medium",
    question: "What does the enumerate() function do?",
    options: [
      "Returns index and value pairs",
      "Counts elements",
      "Sorts items",
      "Filters data",
    ],
    answer: "Returns index and value pairs",
    explanation: "enumerate() adds a counter to an iterable, returning index-value pairs.",
  },
  {
    difficulty: "medium",
    question: "Which operator is used for floor division?",
    options: ["//", "/", "%", "div"],
    answer: "//",
    explanation: "The // operator performs floor division, returning the quotient without remainder.",
  },
  {
    difficulty: "medium",
    question: "What is the purpose of the pass statement?",
    options: [
      "Placeholder for empty code blocks",
      "Skip loop iteration",
      "Exit function",
      "Raise exception",
    ],
    answer: "Placeholder for empty code blocks",
    explanation: "pass is a null operation used as a placeholder where code is syntactically required.",
  },
  {
    difficulty: "medium",
    question: "Which method removes an item from a list by index?",
    options: ["pop()", "remove()", "delete()", "discard()"],
    answer: "pop()",
    explanation: "pop() removes and returns an item at a given index (or last item if no index specified).",
  },

  // ===================== HARD (15) =====================
  {
    difficulty: "hard",
    question: "What is a decorator in Python?",
    options: [
      "A function that modifies another function",
      "A design pattern",
      "A data type",
      "A loop structure",
    ],
    answer: "A function that modifies another function",
    explanation: "Decorators are functions that take another function and extend its behavior without modifying it.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of *args in function parameters?",
    options: [
      "Accept variable number of arguments",
      "Multiply arguments",
      "Create pointers",
      "Define required arguments",
    ],
    answer: "Accept variable number of arguments",
    explanation: "*args allows a function to accept any number of positional arguments as a tuple.",
  },
  {
    difficulty: "hard",
    question: "What does **kwargs do in function parameters?",
    options: [
      "Accept variable number of keyword arguments",
      "Power operation",
      "Dictionary unpacking only",
      "Create default parameters",
    ],
    answer: "Accept variable number of keyword arguments",
    explanation: "**kwargs allows a function to accept any number of keyword arguments as a dictionary.",
  },
  {
    difficulty: "hard",
    question: "What is a generator in Python?",
    options: [
      "Function that yields values lazily",
      "Random number creator",
      "Class constructor",
      "Module importer",
    ],
    answer: "Function that yields values lazily",
    explanation: "Generators use yield to produce values one at a time, saving memory for large datasets.",
  },
  {
    difficulty: "hard",
    question: "What is the difference between is and ==?",
    options: [
      "is checks identity, == checks equality",
      "is checks equality, == checks identity",
      "They are the same",
      "is is for numbers only",
    ],
    answer: "is checks identity, == checks equality",
    explanation: "is checks if two variables point to the same object, == checks if values are equal.",
  },
  {
    difficulty: "hard",
    question: "What is a metaclass?",
    options: [
      "A class of a class",
      "An abstract class",
      "A parent class",
      "A static class",
    ],
    answer: "A class of a class",
    explanation: "Metaclasses are classes whose instances are classes. They define how classes behave.",
  },
  {
    difficulty: "hard",
    question: "What does the @staticmethod decorator do?",
    options: [
      "Defines a method that doesn't access instance or class",
      "Makes method private",
      "Creates class variables",
      "Prevents method override",
    ],
    answer: "Defines a method that doesn't access instance or class",
    explanation: "@staticmethod defines a method that doesn't receive self or cls, behaving like a regular function.",
  },
  {
    difficulty: "hard",
    question: "What is the Global Interpreter Lock (GIL)?",
    options: [
      "Mechanism that allows only one thread to execute Python bytecode",
      "Security feature",
      "Import system",
      "Memory management tool",
    ],
    answer: "Mechanism that allows only one thread to execute Python bytecode",
    explanation: "GIL is a mutex that protects access to Python objects, preventing multiple threads from executing Python bytecode simultaneously.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of __str__ vs __repr__?",
    options: [
      "__str__ for readable output, __repr__ for unambiguous representation",
      "__str__ for debugging, __repr__ for users",
      "They are identical",
      "__str__ is deprecated",
    ],
    answer: "__str__ for readable output, __repr__ for unambiguous representation",
    explanation: "__str__ returns human-readable string, __repr__ returns unambiguous representation for developers.",
  },
  {
    difficulty: "hard",
    question: "What is context manager in Python?",
    options: [
      "Objects used with with statement for resource management",
      "Global variable manager",
      "Import system",
      "Thread manager",
    ],
    answer: "Objects used with with statement for resource management",
    explanation: "Context managers handle setup and cleanup of resources, implementing __enter__ and __exit__ methods.",
  },
  {
    difficulty: "hard",
    question: "What does the yield keyword do?",
    options: [
      "Pauses function and returns a value",
      "Stops function execution",
      "Creates a variable",
      "Imports modules",
    ],
    answer: "Pauses function and returns a value",
    explanation: "yield pauses function execution and returns a value, resuming from that point on next call.",
  },
  {
    difficulty: "hard",
    question: "What is monkey patching?",
    options: [
      "Modifying code at runtime",
      "Error fixing",
      "Code optimization",
      "Unit testing technique",
    ],
    answer: "Modifying code at runtime",
    explanation: "Monkey patching is dynamically modifying a class or module at runtime.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of __slots__?",
    options: [
      "Restrict instance attributes and save memory",
      "Define class methods",
      "Create private variables",
      "Enable inheritance",
    ],
    answer: "Restrict instance attributes and save memory",
    explanation: "__slots__ restricts instance attributes to a defined set, reducing memory overhead.",
  },
  {
    difficulty: "hard",
    question: "What is the difference between deepcopy and copy?",
    options: [
      "deepcopy copies nested objects, copy creates shallow copy",
      "deepcopy is slower only",
      "copy is for lists only",
      "They are the same",
    ],
    answer: "deepcopy copies nested objects, copy creates shallow copy",
    explanation: "deepcopy recursively copies all nested objects, while copy creates a shallow copy of the top level.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of the with statement?",
    options: [
      "Ensures proper resource cleanup",
      "Creates loops",
      "Defines functions",
      "Imports modules",
    ],
    answer: "Ensures proper resource cleanup",
    explanation: "with statement ensures resources are properly cleaned up after use, even if exceptions occur.",
  },
];

/* ===================== HELPER FUNCTION ===================== */
const getQuestionsByLevel = (level) => {
  return allQuestions.filter((q) => q.difficulty === level);
};

/* ===================== LOCAL STORAGE HELPERS ===================== */
const STORAGE_KEY = "quiz4coder_python_progress";

const saveProgressToLocalStorage = (quizData) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push({
      ...quizData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    console.log("Python Progress saved to localStorage");
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
    console.log("localStorage Python progress cleared");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

const syncLocalStorageToFirebase = async (user) => {
  try {
    const localProgress = getLocalStorageProgress();
    if (localProgress.length === 0) return;

    console.log(`Syncing ${localProgress.length} Python quizzes from localStorage to Firebase`);

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    let totalCompleted = localProgress.length;
    let totalScore = localProgress.reduce((sum, quiz) => sum + quiz.percentage, 0);
    let avgScore = Math.round(totalScore / totalCompleted);

    if (userSnap.exists()) {
      const data = userSnap.data();
      const currentCompleted = data.quizzesCompleted || 0;
      const currentAvgScore = data.averageScore || 0;

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

    clearLocalStorageProgress();
    console.log("Successfully synced localStorage Python data to Firebase");
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
export default function PythonQuiz() {
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
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);

  /* ================= AUTH ================= */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      
      if (u) {
        syncLocalStorageToFirebase(u);
      }
      
      if (u && attemptedLevel) {
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
    // ALL LEVELS REQUIRE LOGIN
    if (!user) {
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

    window.scrollTo({ top: 0, behavior: "smooth" });
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

  /* ================= UPDATE STATS ================= */
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
              (currentAvgScore * currentCompleted + percentage) / totalQuizzes
            );

            await updateDoc(userRef, {
              quizzesAttempted: increment(1),
              quizzesCompleted: increment(1),
              averageScore: newAvgScore,
              lastQuizDate: new Date().toISOString(),
            });

            console.log("Python Stats updated in Firebase");
          } else {
            await setDoc(userRef, {
              quizzesAttempted: 1,
              quizzesCompleted: 1,
              averageScore: percentage,
              lastQuizDate: new Date().toISOString(),
            });

            console.log("Initial Python stats created in Firebase");
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
        {/* Header Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-16 px-4">
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
                Python Programming Quiz
              </h1>
              <p className="text-xl text-green-50 leading-relaxed">
                Master Python fundamentals and become a proficient Python developer. All levels require login to access.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* User Status Banner - ALWAYS SHOW LOGIN REQUIRED */}
          {!user && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 mb-1">Login Required for All Levels</h3>
                <p className="text-sm text-green-800">
                  Python quiz requires authentication. Please sign in to access all quiz levels and track your progress.
                </p>
              </div>
            </div>
          )}

          {/* Level Cards - ALL LOCKED WITHOUT LOGIN */}
          <div className="space-y-6 mb-12">
            {/* Basic Level */}
            <button
              onClick={() => startLevel("basic")}
              className={`w-full border-2 rounded-xl p-4 sm:p-6 transition-all duration-200 text-left group ${
                user
                  ? "bg-white border-gray-200 hover:border-green-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center ${
                    user ? "bg-green-100" : "bg-gray-200"
                  }`}>
                    {user ? (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Basic Level</h2>
                    {!user && (
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Learn Python fundamentals. Master syntax, variables, data types, loops, and basic functions.
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
                <div className={`flex-shrink-0 transition-transform self-start sm:self-center ${
                  user ? "text-green-500 group-hover:translate-x-1" : "text-gray-400"
                }`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Medium Level */}
            <button
              onClick={() => startLevel("medium")}
              className={`w-full border-2 rounded-xl p-6 transition-all duration-200 text-left group ${
                user
                  ? "bg-white border-gray-200 hover:border-green-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center ${
                    user ? "bg-blue-100" : "bg-gray-200"
                  }`}>
                    {user ? (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Medium Level</h2>
                    {!user && (
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Explore intermediate concepts. Master list comprehensions, OOP basics, exceptions, and lambda functions.
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
                  user ? "text-green-500 group-hover:translate-x-1" : "text-gray-400"
                }`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Hard Level */}
            <button
              onClick={() => startLevel("hard")}
              className={`w-full border-2 rounded-xl p-6 transition-all duration-200 text-left group ${
                user
                  ? "bg-white border-gray-200 hover:border-green-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center ${
                    user ? "bg-purple-100" : "bg-gray-200"
                  }`}>
                    {user ? (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Hard Level</h2>
                    {!user && (
                      <span className="px-2 sm:px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Master advanced Python. Challenge yourself with decorators, generators, GIL, metaclasses, and expert patterns.
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
                  user ? "text-green-500 group-hover:translate-x-1" : "text-gray-400"
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
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sign In</h4>
                  <p className="text-sm text-gray-600">
                    Login to access all Python quiz levels and track your progress
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Choose Level</h4>
                  <p className="text-sm text-gray-600">
                    Select difficulty that matches your Python knowledge
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Learn & Master</h4>
                  <p className="text-sm text-gray-600">
                    Get instant feedback and detailed explanations
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
      if (percentage >= 90) return { text: "Excellent!", color: "text-green-600" };
      if (percentage >= 75) return { text: "Great Work!", color: "text-emerald-600" };
      if (percentage >= 60) return { text: "Good Effort", color: "text-blue-600" };
      return { text: "Keep Learning", color: "text-orange-600" };
    };
    const scoreMessage = getScoreMessage();
    const passed = percentage >= 75;

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">Quiz Results</h1>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Score Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
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
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">Congratulations!</h3>
                  <p className="text-sm text-green-800">
                    You've successfully passed this level. Keep up the great work and continue learning!
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
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
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
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
              className="h-full bg-green-500 rounded-full transition-all duration-300"
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
                          ? "bg-green-50 border-green-500"
                          : "bg-white border-gray-200 hover:border-green-300"
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
                              ? "bg-green-500 text-white"
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
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-green-900 text-sm mb-1">Explanation</h3>
                    <p className="text-sm text-green-800">{currentQuestion.explanation}</p>
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
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg text-sm"
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
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center gap-2"
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