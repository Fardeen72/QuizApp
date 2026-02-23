import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, increment, collection, addDoc } from "firebase/firestore";
import AuthModal from "@/components/AuthModel";

/* ===================== QUESTIONS ===================== */
export const allQuestions = [
  // ===================== BASIC (15) =====================
  {
    difficulty: "basic",
    question: "What does JavaScript primarily add to websites?",
    options: [
      "Interactivity and dynamic behavior",
      "Visual styling and colors",
      "Page structure and content",
      "Database connections",
    ],
    answer: "Interactivity and dynamic behavior",
    explanation: "JavaScript adds interactivity, animations, and dynamic functionality to websites.",
  },
  {
    difficulty: "basic",
    question: "Which keyword is used to declare a constant variable?",
    options: ["const", "let", "var", "constant"],
    answer: "const",
    explanation: "const declares a constant variable that cannot be reassigned.",
  },
  {
    difficulty: "basic",
    question: "Which keyword is used to declare a variable that can be reassigned?",
    options: ["let", "const", "var", "variable"],
    answer: "let",
    explanation: "let declares a variable that can be reassigned later in the code.",
  },
  {
    difficulty: "basic",
    question: "Which data type represents true or false values?",
    options: ["Boolean", "String", "Number", "Binary"],
    answer: "Boolean",
    explanation: "Boolean data type has only two values: true or false.",
  },
  {
    difficulty: "basic",
    question: "How do you write a single-line comment in JavaScript?",
    options: ["// comment", "/* comment */", "<!-- comment -->", "# comment"],
    answer: "// comment",
    explanation: "Single-line comments in JavaScript start with //",
  },
  {
    difficulty: "basic",
    question: "Which symbol is used for strict equality comparison?",
    options: ["===", "==", "=", "!="],
    answer: "===",
    explanation: "=== checks both value and type for equality (strict equality).",
  },
  {
    difficulty: "basic",
    question: "What is the correct way to declare a function?",
    options: [
      "function myFunction() {}",
      "func myFunction() {}",
      "def myFunction() {}",
      "function: myFunction() {}",
    ],
    answer: "function myFunction() {}",
    explanation: "Functions are declared using the function keyword followed by the name and parentheses.",
  },
  {
    difficulty: "basic",
    question: "Which method is used to display output in the console?",
    options: ["console.log()", "print()", "alert()", "display()"],
    answer: "console.log()",
    explanation: "console.log() prints output to the browser's console for debugging.",
  },
  {
    difficulty: "basic",
    question: "How do you create an array in JavaScript?",
    options: ["let arr = []", "let arr = ()", "let arr = {}", "let arr = <>"],
    answer: "let arr = []",
    explanation: "Arrays are created using square brackets [].",
  },
  {
    difficulty: "basic",
    question: "What is the index of the first element in an array?",
    options: ["0", "1", "-1", "first"],
    answer: "0",
    explanation: "Arrays in JavaScript are zero-indexed, so the first element is at index 0.",
  },
  {
    difficulty: "basic",
    question: "Which operator is used for addition in JavaScript?",
    options: ["+", "add", "plus", "&"],
    answer: "+",
    explanation: "The + operator is used for both addition and string concatenation.",
  },
  {
    difficulty: "basic",
    question: "What does the typeof operator return for a number?",
    options: ["number", "Number", "int", "integer"],
    answer: "number",
    explanation: "typeof returns the string 'number' for numeric values.",
  },
  {
    difficulty: "basic",
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "add()", "append()", "insert()"],
    answer: "push()",
    explanation: "push() adds one or more elements to the end of an array.",
  },
  {
    difficulty: "basic",
    question: "How do you write an if statement in JavaScript?",
    options: ["if (condition) {}", "if condition {}", "if (condition)", "if condition then"],
    answer: "if (condition) {}",
    explanation: "if statements require condition in parentheses followed by curly braces.",
  },
  {
    difficulty: "basic",
    question: "What is the correct way to create an object?",
    options: ["let obj = {}", "let obj = []", "let obj = ()", "let obj = <>"],
    answer: "let obj = {}",
    explanation: "Objects are created using curly braces {} with key-value pairs.",
  },

  // ===================== MEDIUM (15) =====================
  {
    difficulty: "medium",
    question: "What is the difference between let and var?",
    options: [
      "let is block-scoped, var is function-scoped",
      "let is function-scoped, var is block-scoped",
      "let is global, var is local",
      "There is no difference",
    ],
    answer: "let is block-scoped, var is function-scoped",
    explanation: "let has block scope (within {}), while var has function scope and can cause scope issues.",
  },
  {
    difficulty: "medium",
    question: "Which array method creates a new array by transforming each element?",
    options: ["map()", "filter()", "forEach()", "reduce()"],
    answer: "map()",
    explanation: "map() transforms each element and returns a new array with the results.",
  },
  {
    difficulty: "medium",
    question: "Which array method returns a new array with elements that pass a test?",
    options: ["filter()", "map()", "find()", "reduce()"],
    answer: "filter()",
    explanation: "filter() creates a new array with elements that satisfy the condition.",
  },
  {
    difficulty: "medium",
    question: "What does the spread operator (...) do?",
    options: [
      "Expands arrays or objects",
      "Creates comments",
      "Defines functions",
      "Declares variables",
    ],
    answer: "Expands arrays or objects",
    explanation: "The spread operator (...) expands arrays/objects into individual elements.",
  },
  {
    difficulty: "medium",
    question: "Which method is used to select an element by ID?",
    options: [
      "document.getElementById()",
      "document.querySelector()",
      "document.getElement()",
      "document.selectId()",
    ],
    answer: "document.getElementById()",
    explanation: "getElementById() selects an element by its id attribute.",
  },
  {
    difficulty: "medium",
    question: "What is the purpose of the addEventListener method?",
    options: [
      "Attach event handlers to elements",
      "Create new elements",
      "Remove elements",
      "Change element styles",
    ],
    answer: "Attach event handlers to elements",
    explanation: "addEventListener() attaches event handlers to respond to user actions.",
  },
  {
    difficulty: "medium",
    question: "Which loop is best for iterating over array elements?",
    options: ["for...of", "for...in", "while", "do...while"],
    answer: "for...of",
    explanation: "for...of loop is designed to iterate over array elements directly.",
  },
  {
    difficulty: "medium",
    question: "What does JSON.parse() do?",
    options: [
      "Converts JSON string to JavaScript object",
      "Converts JavaScript object to JSON string",
      "Validates JSON",
      "Creates JSON files",
    ],
    answer: "Converts JSON string to JavaScript object",
    explanation: "JSON.parse() parses a JSON string and returns a JavaScript object.",
  },
  {
    difficulty: "medium",
    question: "What does JSON.stringify() do?",
    options: [
      "Converts JavaScript object to JSON string",
      "Converts JSON string to JavaScript object",
      "Validates JSON",
      "Creates JSON files",
    ],
    answer: "Converts JavaScript object to JSON string",
    explanation: "JSON.stringify() converts a JavaScript object into a JSON string.",
  },
  {
    difficulty: "medium",
    question: "Which method removes the last element from an array?",
    options: ["pop()", "shift()", "splice()", "delete()"],
    answer: "pop()",
    explanation: "pop() removes and returns the last element from an array.",
  },
  {
    difficulty: "medium",
    question: "What is the correct syntax for a template literal?",
    options: ["`Hello ${name}`", '"Hello ${name}"', "'Hello ${name}'", "<Hello ${name}>"],
    answer: "`Hello ${name}`",
    explanation: "Template literals use backticks (`) and ${} for variable interpolation.",
  },
  {
    difficulty: "medium",
    question: "Which statement is used to exit a loop?",
    options: ["break", "continue", "return", "exit"],
    answer: "break",
    explanation: "break statement exits the current loop completely.",
  },
  {
    difficulty: "medium",
    question: "What does the ternary operator look like?",
    options: [
      "condition ? true : false",
      "condition ? true",
      "if condition then true else false",
      "condition : true ? false",
    ],
    answer: "condition ? true : false",
    explanation: "Ternary operator: condition ? valueIfTrue : valueIfFalse",
  },
  {
    difficulty: "medium",
    question: "Which method combines all array elements into a string?",
    options: ["join()", "concat()", "merge()", "combine()"],
    answer: "join()",
    explanation: "join() joins all array elements into a single string with a separator.",
  },
  {
    difficulty: "medium",
    question: "What is the purpose of the this keyword?",
    options: [
      "Refers to the current object",
      "Creates new objects",
      "Declares variables",
      "Imports modules",
    ],
    answer: "Refers to the current object",
    explanation: "this refers to the object that is executing the current function.",
  },

  // ===================== HARD (15) =====================
  {
    difficulty: "hard",
    question: "What is a closure in JavaScript?",
    options: [
      "A function that has access to its outer function's scope",
      "A method to close the browser",
      "A way to end loops",
      "A type of data structure",
    ],
    answer: "A function that has access to its outer function's scope",
    explanation: "A closure is a function that remembers variables from its outer scope even after the outer function has finished.",
  },
  {
    difficulty: "hard",
    question: "What does the async keyword do?",
    options: [
      "Makes a function return a Promise",
      "Makes code run faster",
      "Stops code execution",
      "Creates parallel threads",
    ],
    answer: "Makes a function return a Promise",
    explanation: "async functions always return a Promise and allow use of await inside them.",
  },
  {
    difficulty: "hard",
    question: "What does the await keyword do?",
    options: [
      "Pauses async function until Promise resolves",
      "Creates a delay",
      "Stops all code execution",
      "Makes code synchronous",
    ],
    answer: "Pauses async function until Promise resolves",
    explanation: "await pauses the async function execution until the Promise is resolved.",
  },
  {
    difficulty: "hard",
    question: "What is event bubbling?",
    options: [
      "Events propagate from child to parent elements",
      "Events disappear after firing",
      "Events fire multiple times",
      "Events are created dynamically",
    ],
    answer: "Events propagate from child to parent elements",
    explanation: "Event bubbling means events propagate up from child to parent elements in the DOM.",
  },
  {
    difficulty: "hard",
    question: "What does the reduce() method do?",
    options: [
      "Reduces array to a single value",
      "Removes elements from array",
      "Makes array smaller",
      "Filters array elements",
    ],
    answer: "Reduces array to a single value",
    explanation: "reduce() executes a reducer function on each element, resulting in a single output value.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of Object.keys()?",
    options: [
      "Returns an array of object's property names",
      "Creates object keys",
      "Locks object properties",
      "Validates object structure",
    ],
    answer: "Returns an array of object's property names",
    explanation: "Object.keys() returns an array containing all property names of an object.",
  },
  {
    difficulty: "hard",
    question: "What is the difference between == and ===?",
    options: [
      "=== checks type and value, == only value",
      "== checks type and value, === only value",
      "They are the same",
      "=== is for numbers only",
    ],
    answer: "=== checks type and value, == only value",
    explanation: "=== (strict equality) checks both type and value, == (loose equality) only checks value after type coercion.",
  },
  {
    difficulty: "hard",
    question: "What does the bind() method do?",
    options: [
      "Creates a new function with fixed this value",
      "Combines two functions",
      "Stops function execution",
      "Validates function parameters",
    ],
    answer: "Creates a new function with fixed this value",
    explanation: "bind() creates a new function with a permanently bound this context.",
  },
  {
    difficulty: "hard",
    question: "What is destructuring in JavaScript?",
    options: [
      "Extracting values from arrays or objects",
      "Destroying variables",
      "Breaking code structure",
      "Removing properties",
    ],
    answer: "Extracting values from arrays or objects",
    explanation: "Destructuring allows unpacking values from arrays or properties from objects into distinct variables.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of Promise.all()?",
    options: [
      "Waits for all Promises to resolve",
      "Creates multiple Promises",
      "Rejects all Promises",
      "Cancels all Promises",
    ],
    answer: "Waits for all Promises to resolve",
    explanation: "Promise.all() waits for all Promises in an array to resolve before continuing.",
  },
  {
    difficulty: "hard",
    question: "What does the nullish coalescing operator (??) do?",
    options: [
      "Returns right operand if left is null or undefined",
      "Checks for null values",
      "Creates null values",
      "Removes null from arrays",
    ],
    answer: "Returns right operand if left is null or undefined",
    explanation: "?? returns the right operand when the left operand is null or undefined.",
  },
  {
    difficulty: "hard",
    question: "What is optional chaining (?.) used for?",
    options: [
      "Safely access nested object properties",
      "Create optional parameters",
      "Make properties optional",
      "Chain multiple functions",
    ],
    answer: "Safely access nested object properties",
    explanation: "?. safely accesses nested properties without throwing errors if a property doesn't exist.",
  },
  {
    difficulty: "hard",
    question: "What is the event loop in JavaScript?",
    options: [
      "Mechanism that handles asynchronous operations",
      "A type of for loop",
      "Error handling system",
      "Animation system",
    ],
    answer: "Mechanism that handles asynchronous operations",
    explanation: "The event loop handles the execution of asynchronous code, callbacks, and Promises.",
  },
  {
    difficulty: "hard",
    question: "What does Object.freeze() do?",
    options: [
      "Makes an object immutable",
      "Stops object creation",
      "Deletes object properties",
      "Copies an object",
    ],
    answer: "Makes an object immutable",
    explanation: "Object.freeze() prevents modifications to an object's properties.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of the call() method?",
    options: [
      "Invokes a function with a specific this value",
      "Creates function calls",
      "Calls multiple functions",
      "Validates function calls",
    ],
    answer: "Invokes a function with a specific this value",
    explanation: "call() invokes a function with a specified this value and arguments.",
  },
];


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

/* ===================== HELPER FUNCTION ===================== */
const getQuestionsByLevel = (level) => {
  return allQuestions.filter((q) => q.difficulty === level);
};

/* ===================== LOCAL STORAGE HELPERS ===================== */
const STORAGE_KEY = "quiz4coder_js_progress";

const saveProgressToLocalStorage = (quizData) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push({
      ...quizData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    console.log("JavaScript Progress saved to localStorage");
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
    console.log("localStorage JavaScript progress cleared");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

const syncLocalStorageToFirebase = async (user) => {
  try {
    const localProgress = getLocalStorageProgress();
    if (localProgress.length === 0) return;

    console.log(`Syncing ${localProgress.length} JavaScript quizzes from localStorage to Firebase`);

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
    console.log("Successfully synced localStorage JavaScript data to Firebase");
  } catch (error) {
    console.error("Error syncing localStorage to Firebase:", error);
  }
};

export default function JavaScriptQuiz() {
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
    const requiresLogin = selectedLevel === "medium" || selectedLevel === "hard";
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

            console.log("JavaScript Stats updated in Firebase");
          } else {
            // Create initial user document
            await setDoc(userRef, {
              quizzesAttempted: 1,
              quizzesCompleted: 1,
              averageScore: percentage,
              lastQuizDate: new Date().toISOString(),
            });

            console.log("Initial JavaScript stats created in Firebase");
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
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-16 px-4">
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
                JavaScript Programming Quiz
              </h1>
              <p className="text-xl text-yellow-50 leading-relaxed">
                Test your JavaScript knowledge. Master programming fundamentals and become a proficient developer.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* User Status Banner */}
          {!user && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
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
            {/* Basic Level */}
            <button
              onClick={() => startLevel("basic")}
              className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 hover:border-yellow-500 hover:shadow-lg transition-all duration-200 text-left group"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
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
                    Learn JavaScript fundamentals. Perfect for beginners starting with variables, functions, and basic concepts.
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
                <div className="flex-shrink-0 text-yellow-500 group-hover:translate-x-1 transition-transform self-start sm:self-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Medium Level */}
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
                  ? "bg-white border-gray-200 hover:border-yellow-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center ${
                    user ? "bg-yellow-100" : "bg-gray-200"
                  }`}>
                    {user ? (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <span className="px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Explore intermediate concepts. Master arrays, objects, DOM manipulation, and event handling.
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
                  user ? "text-yellow-500 group-hover:translate-x-1" : "text-gray-400"
                }`}>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Hard Level */}
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
                  ? "bg-white border-gray-200 hover:border-yellow-500 hover:shadow-lg cursor-pointer"
                  : "bg-gray-50 border-gray-200 cursor-pointer"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                <div className="flex-shrink-0">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center ${
                    user ? "bg-red-100" : "bg-gray-200"
                  }`}>
                    {user ? (
                      <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <span className="px-2 sm:px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Master advanced JavaScript. Challenge yourself with closures, async/await, Promises, and ES6+ features.
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
                  user ? "text-yellow-500 group-hover:translate-x-1" : "text-gray-400"
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
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold">
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
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold">
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
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center text-yellow-600 font-bold">
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
      if (percentage >= 90) return { text: "Excellent!", color: "text-green-600" };
      if (percentage >= 75) return { text: "Great Work!", color: "text-yellow-600" };
      if (percentage >= 60) return { text: "Good Effort", color: "text-blue-600" };
      return { text: "Keep Learning", color: "text-orange-600" };
    };
    const scoreMessage = getScoreMessage();
    const passed = percentage >= 75;

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">Quiz Results</h1>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Score Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
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
              className="h-full bg-yellow-500 rounded-full transition-all duration-300"
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
                          ? "bg-yellow-50 border-yellow-500"
                          : "bg-white border-gray-200 hover:border-yellow-300"
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
                              ? "bg-yellow-500 text-white"
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
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-yellow-900 text-sm mb-1">Explanation</h3>
                    <p className="text-sm text-yellow-800">{currentQuestion.explanation}</p>
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
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg text-sm"
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
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center gap-2"
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