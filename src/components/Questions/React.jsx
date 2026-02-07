import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";
import AuthModal from "@/components/AuthModel";

/* ===================== QUESTIONS ===================== */
export const allQuestions = [
  // ===================== BASIC (15) =====================
  {
    difficulty: "basic",
    question: "What is React?",
    options: [
      "A JavaScript library for building user interfaces",
      "A programming language",
      "A database system",
      "A CSS framework",
    ],
    answer: "A JavaScript library for building user interfaces",
    explanation: "React is a JavaScript library developed by Facebook for building interactive user interfaces.",
  },
  {
    difficulty: "basic",
    question: "What is JSX?",
    options: [
      "JavaScript XML - syntax extension for JavaScript",
      "A new programming language",
      "A CSS preprocessor",
      "A testing framework",
    ],
    answer: "JavaScript XML - syntax extension for JavaScript",
    explanation: "JSX is a syntax extension that allows you to write HTML-like code in JavaScript.",
  },
  {
    difficulty: "basic",
    question: "How do you create a React component?",
    options: [
      "function ComponentName() {}",
      "class ComponentName() {}",
      "component ComponentName() {}",
      "react ComponentName() {}",
    ],
    answer: "function ComponentName() {}",
    explanation: "React components can be created as functions. Modern React primarily uses functional components.",
  },
  {
    difficulty: "basic",
    question: "What is the virtual DOM?",
    options: [
      "A lightweight copy of the actual DOM",
      "A real DOM element",
      "A CSS property",
      "A JavaScript object",
    ],
    answer: "A lightweight copy of the actual DOM",
    explanation: "Virtual DOM is a lightweight representation of the real DOM that React uses for efficient updates.",
  },
  {
    difficulty: "basic",
    question: "Which hook is used to manage state in functional components?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    answer: "useState",
    explanation: "useState is the primary hook for adding state to functional components.",
  },
  {
    difficulty: "basic",
    question: "What is the purpose of props?",
    options: [
      "Pass data from parent to child components",
      "Manage component state",
      "Handle events",
      "Style components",
    ],
    answer: "Pass data from parent to child components",
    explanation: "Props (properties) are used to pass data from parent components to child components.",
  },
  {
    difficulty: "basic",
    question: "How do you handle events in React?",
    options: [
      "onClick={() => handleClick()}",
      "onclick='handleClick()'",
      "on-click={handleClick}",
      "@click='handleClick'",
    ],
    answer: "onClick={() => handleClick()}",
    explanation: "React uses camelCase event handlers like onClick, onChange, etc.",
  },
  {
    difficulty: "basic",
    question: "What does useState return?",
    options: [
      "An array with state value and setter function",
      "Just the state value",
      "Just the setter function",
      "An object with state properties",
    ],
    answer: "An array with state value and setter function",
    explanation: "useState returns an array: [currentState, setStateFunction].",
  },
  {
    difficulty: "basic",
    question: "Which method is used to render a React app?",
    options: [
      "ReactDOM.render()",
      "React.render()",
      "render()",
      "mount()",
    ],
    answer: "ReactDOM.render()",
    explanation: "ReactDOM.render() is used to render React components to the DOM (React 17 and earlier).",
  },
  {
    difficulty: "basic",
    question: "What is the correct way to update state?",
    options: [
      "setState(newValue)",
      "state = newValue",
      "updateState(newValue)",
      "changeState(newValue)",
    ],
    answer: "setState(newValue)",
    explanation: "State should be updated using the setter function returned by useState.",
  },
  {
    difficulty: "basic",
    question: "What are React fragments used for?",
    options: [
      "Group multiple elements without adding extra DOM nodes",
      "Create animations",
      "Handle errors",
      "Manage routing",
    ],
    answer: "Group multiple elements without adding extra DOM nodes",
    explanation: "Fragments (<></> or <Fragment>) let you group children without adding extra DOM nodes.",
  },
  {
    difficulty: "basic",
    question: "How do you pass a prop to a component?",
    options: [
      "<Component name='value' />",
      "<Component {name='value'} />",
      "<Component prop:name='value' />",
      "<Component [name]='value' />",
    ],
    answer: "<Component name='value' />",
    explanation: "Props are passed as attributes in JSX: <Component propName={value} />.",
  },
  {
    difficulty: "basic",
    question: "What is the purpose of keys in React lists?",
    options: [
      "Help React identify which items have changed",
      "Style list items",
      "Filter list items",
      "Sort list items",
    ],
    answer: "Help React identify which items have changed",
    explanation: "Keys help React identify which items in a list have changed, been added, or removed.",
  },
  {
    difficulty: "basic",
    question: "Which hook is used for side effects?",
    options: ["useEffect", "useState", "useContext", "useMemo"],
    answer: "useEffect",
    explanation: "useEffect is used for side effects like data fetching, subscriptions, and DOM manipulation.",
  },
  {
    difficulty: "basic",
    question: "What does className do in JSX?",
    options: [
      "Adds CSS classes to elements",
      "Creates new components",
      "Defines component names",
      "Handles events",
    ],
    answer: "Adds CSS classes to elements",
    explanation: "className is used to add CSS classes in JSX (instead of 'class' in HTML).",
  },

  // ===================== MEDIUM (15) =====================
  {
    difficulty: "medium",
    question: "What is the purpose of useEffect dependencies array?",
    options: [
      "Controls when the effect runs",
      "Passes props to the effect",
      "Stores effect results",
      "Handles errors in effects",
    ],
    answer: "Controls when the effect runs",
    explanation: "The dependencies array tells React when to re-run the effect based on value changes.",
  },
  {
    difficulty: "medium",
    question: "What happens when you call setState?",
    options: [
      "Schedules a component re-render",
      "Immediately updates the component",
      "Deletes the component",
      "Creates a new component",
    ],
    answer: "Schedules a component re-render",
    explanation: "setState schedules a re-render. State updates may be batched for performance.",
  },
  {
    difficulty: "medium",
    question: "What is prop drilling?",
    options: [
      "Passing props through multiple component levels",
      "Updating props dynamically",
      "Validating props",
      "Creating new props",
    ],
    answer: "Passing props through multiple component levels",
    explanation: "Prop drilling is passing data through multiple nested components to reach a deeply nested component.",
  },
  {
    difficulty: "medium",
    question: "What does useContext do?",
    options: [
      "Accesses data from Context without prop drilling",
      "Creates new contexts",
      "Manages component state",
      "Handles side effects",
    ],
    answer: "Accesses data from Context without prop drilling",
    explanation: "useContext allows components to consume context values without prop drilling.",
  },
  {
    difficulty: "medium",
    question: "What is the purpose of useRef?",
    options: [
      "Access DOM elements and persist values between renders",
      "Manage component state",
      "Handle side effects",
      "Create context",
    ],
    answer: "Access DOM elements and persist values between renders",
    explanation: "useRef creates a mutable reference that persists across renders without causing re-renders.",
  },
  {
    difficulty: "medium",
    question: "What does React.memo do?",
    options: [
      "Prevents unnecessary re-renders of components",
      "Stores component in memory",
      "Creates memoized state",
      "Handles component mounting",
    ],
    answer: "Prevents unnecessary re-renders of components",
    explanation: "React.memo is a higher-order component that memoizes components to prevent unnecessary re-renders.",
  },
  {
    difficulty: "medium",
    question: "What is the difference between controlled and uncontrolled components?",
    options: [
      "Controlled components have React-managed state, uncontrolled use DOM",
      "Controlled are faster than uncontrolled",
      "Uncontrolled are more secure",
      "There is no difference",
    ],
    answer: "Controlled components have React-managed state, uncontrolled use DOM",
    explanation: "Controlled components have form data handled by React state, uncontrolled by DOM itself.",
  },
  {
    difficulty: "medium",
    question: "What does the cleanup function in useEffect do?",
    options: [
      "Runs before the effect runs again or component unmounts",
      "Clears component state",
      "Removes the component",
      "Resets props",
    ],
    answer: "Runs before the effect runs again or component unmounts",
    explanation: "The cleanup function in useEffect runs before the next effect or when component unmounts.",
  },
  {
    difficulty: "medium",
    question: "What is lifting state up?",
    options: [
      "Moving state to a common parent component",
      "Increasing state value",
      "Moving state to child components",
      "Deleting state",
    ],
    answer: "Moving state to a common parent component",
    explanation: "Lifting state up means moving state to the closest common ancestor to share data between components.",
  },
  {
    difficulty: "medium",
    question: "What does useMemo do?",
    options: [
      "Memoizes expensive calculations",
      "Creates memoized state",
      "Handles side effects",
      "Creates context",
    ],
    answer: "Memoizes expensive calculations",
    explanation: "useMemo memoizes the result of expensive calculations and only recalculates when dependencies change.",
  },
  {
    difficulty: "medium",
    question: "What is the purpose of useCallback?",
    options: [
      "Memoizes callback functions",
      "Creates new callbacks",
      "Handles async operations",
      "Manages component state",
    ],
    answer: "Memoizes callback functions",
    explanation: "useCallback returns a memoized callback function to prevent unnecessary re-renders.",
  },
  {
    difficulty: "medium",
    question: "What are error boundaries used for?",
    options: [
      "Catch JavaScript errors in component tree",
      "Validate props",
      "Handle API errors",
      "Prevent component mounting",
    ],
    answer: "Catch JavaScript errors in component tree",
    explanation: "Error boundaries catch JavaScript errors anywhere in the child component tree and display a fallback UI.",
  },
  {
    difficulty: "medium",
    question: "What is React Router used for?",
    options: [
      "Handle navigation in single-page applications",
      "Make API requests",
      "Manage component state",
      "Style components",
    ],
    answer: "Handle navigation in single-page applications",
    explanation: "React Router enables navigation and routing in React single-page applications.",
  },
  {
    difficulty: "medium",
    question: "What does the key prop in lists prevent?",
    options: [
      "Unnecessary re-renders and state bugs",
      "Component mounting",
      "Event handling",
      "Prop passing",
    ],
    answer: "Unnecessary re-renders and state bugs",
    explanation: "Keys help React identify which items changed, preventing state bugs and improving performance.",
  },
  {
    difficulty: "medium",
    question: "What is lazy loading in React?",
    options: [
      "Loading components only when needed",
      "Slow component rendering",
      "Delayed state updates",
      "Background data fetching",
    ],
    answer: "Loading components only when needed",
    explanation: "Lazy loading with React.lazy() loads components only when they're needed, improving initial load time.",
  },

  // ===================== HARD (15) =====================
  {
    difficulty: "hard",
    question: "What is the reconciliation process?",
    options: [
      "Algorithm React uses to diff and update the DOM",
      "Component mounting process",
      "State management system",
      "Error handling mechanism",
    ],
    answer: "Algorithm React uses to diff and update the DOM",
    explanation: "Reconciliation is React's diffing algorithm that determines what needs to be updated in the DOM.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of useReducer?",
    options: [
      "Manage complex state logic with actions",
      "Reduce component size",
      "Minimize re-renders",
      "Handle side effects",
    ],
    answer: "Manage complex state logic with actions",
    explanation: "useReducer is used for complex state logic with multiple sub-values or when next state depends on previous.",
  },
  {
    difficulty: "hard",
    question: "What is the difference between useEffect and useLayoutEffect?",
    options: [
      "useLayoutEffect fires synchronously after DOM mutations",
      "useEffect is faster",
      "useLayoutEffect is deprecated",
      "They are the same",
    ],
    answer: "useLayoutEffect fires synchronously after DOM mutations",
    explanation: "useLayoutEffect fires synchronously after all DOM mutations but before browser paint.",
  },
  {
    difficulty: "hard",
    question: "What is React Fiber?",
    options: [
      "React's reconciliation engine for incremental rendering",
      "A routing library",
      "A state management tool",
      "A testing framework",
    ],
    answer: "React's reconciliation engine for incremental rendering",
    explanation: "Fiber is React's new reconciliation algorithm that enables incremental rendering and better performance.",
  },
  {
    difficulty: "hard",
    question: "What are custom hooks?",
    options: [
      "Reusable functions that use React hooks",
      "Built-in React hooks",
      "Component lifecycle methods",
      "Event handlers",
    ],
    answer: "Reusable functions that use React hooks",
    explanation: "Custom hooks are JavaScript functions that use other hooks to encapsulate reusable stateful logic.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of React.StrictMode?",
    options: [
      "Highlights potential problems in development",
      "Improves production performance",
      "Adds type checking",
      "Enables strict prop validation",
    ],
    answer: "Highlights potential problems in development",
    explanation: "StrictMode activates additional checks and warnings for its descendants in development mode.",
  },
  {
    difficulty: "hard",
    question: "What is the difference between state and refs?",
    options: [
      "State triggers re-renders, refs don't",
      "Refs are faster than state",
      "State is synchronous, refs are async",
      "There is no difference",
    ],
    answer: "State triggers re-renders, refs don't",
    explanation: "Updating state causes re-renders, while updating refs doesn't trigger component re-renders.",
  },
  {
    difficulty: "hard",
    question: "What is code splitting?",
    options: [
      "Breaking code into smaller bundles loaded on demand",
      "Splitting components into files",
      "Dividing state management",
      "Separating CSS from JS",
    ],
    answer: "Breaking code into smaller bundles loaded on demand",
    explanation: "Code splitting breaks your bundle into smaller chunks that can be loaded on demand.",
  },
  {
    difficulty: "hard",
    question: "What does React.forwardRef do?",
    options: [
      "Forwards refs to child components",
      "Creates component references",
      "Manages component state",
      "Handles prop validation",
    ],
    answer: "Forwards refs to child components",
    explanation: "forwardRef allows components to forward refs to their children, useful for HOCs and component libraries.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of useImperativeHandle?",
    options: [
      "Customizes the instance value exposed to parent components",
      "Handles imperative operations",
      "Manages component lifecycle",
      "Creates custom hooks",
    ],
    answer: "Customizes the instance value exposed to parent components",
    explanation: "useImperativeHandle customizes the instance value exposed when using forwardRef.",
  },
  {
    difficulty: "hard",
    question: "What is batching in React?",
    options: [
      "Grouping multiple state updates into single re-render",
      "Batch API requests",
      "Group components together",
      "Combine props",
    ],
    answer: "Grouping multiple state updates into single re-render",
    explanation: "React batches multiple state updates into a single re-render for better performance.",
  },
  {
    difficulty: "hard",
    question: "What is the purpose of Suspense?",
    options: [
      "Handle loading states for lazy components",
      "Suspend component rendering",
      "Handle errors",
      "Manage animations",
    ],
    answer: "Handle loading states for lazy components",
    explanation: "Suspense lets components wait for something before rendering, displaying a fallback meanwhile.",
  },
  {
    difficulty: "hard",
    question: "What is the Context API?",
    options: [
      "Built-in state management for sharing data globally",
      "External state library",
      "API for HTTP requests",
      "Component lifecycle API",
    ],
    answer: "Built-in state management for sharing data globally",
    explanation: "Context API provides a way to share values between components without passing props through every level.",
  },
  {
    difficulty: "hard",
    question: "What are portals used for?",
    options: [
      "Render children into a DOM node outside parent hierarchy",
      "Create component shortcuts",
      "Handle routing",
      "Manage state",
    ],
    answer: "Render children into a DOM node outside parent hierarchy",
    explanation: "Portals provide a way to render children into a DOM node that exists outside the parent component.",
  },
  {
    difficulty: "hard",
    question: "What is concurrent rendering?",
    options: [
      "React's ability to interrupt and resume rendering",
      "Rendering multiple components simultaneously",
      "Parallel API calls",
      "Async state updates",
    ],
    answer: "React's ability to interrupt and resume rendering",
    explanation: "Concurrent rendering allows React to interrupt rendering work to handle high-priority updates.",
  },
];

/* ===================== HELPER FUNCTION ===================== */
const getQuestionsByLevel = (level) => {
  return allQuestions.filter((q) => q.difficulty === level);
};

/* ===================== LOCAL STORAGE HELPERS ===================== */
const STORAGE_KEY = "quiz4coder_react_progress";

const saveProgressToLocalStorage = (quizData) => {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    existing.push({
      ...quizData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    console.log("React Progress saved to localStorage");
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
    console.log("localStorage React progress cleared");
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
};

const syncLocalStorageToFirebase = async (user) => {
  try {
    const localProgress = getLocalStorageProgress();
    if (localProgress.length === 0) return;

    console.log(`Syncing ${localProgress.length} React quizzes from localStorage to Firebase`);

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
    console.log("Successfully synced localStorage React data to Firebase");
  } catch (error) {
    console.error("Error syncing localStorage to Firebase:", error);
  }
};

export default function ReactQuiz() {
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

            console.log("React Stats updated in Firebase");
          } else {
            await setDoc(userRef, {
              quizzesAttempted: 1,
              quizzesCompleted: 1,
              averageScore: percentage,
              lastQuizDate: new Date().toISOString(),
            });

            console.log("Initial React stats created in Firebase");
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
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-16 px-4">
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
                React.js Framework Quiz
              </h1>
              <p className="text-xl text-cyan-50 leading-relaxed">
                Master React concepts and become a proficient React developer. All levels require login to access.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-4 py-12">
          {/* User Status Banner - ALWAYS SHOW LOGIN REQUIRED */}
          {!user && (
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <div className="flex-1">
                <h3 className="font-semibold text-cyan-900 mb-1">Login Required for All Levels</h3>
                <p className="text-sm text-cyan-800">
                  React.js quiz requires authentication. Please sign in to access all quiz levels and track your progress.
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
                  ? "bg-white border-gray-200 hover:border-cyan-500 hover:shadow-lg cursor-pointer"
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
                      <span className="px-2 sm:px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Learn React fundamentals. Master components, JSX, props, state, and hooks basics.
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
                  user ? "text-cyan-500 group-hover:translate-x-1" : "text-gray-400"
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
                  ? "bg-white border-gray-200 hover:border-cyan-500 hover:shadow-lg cursor-pointer"
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
                      <span className="px-2 sm:px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Explore advanced hooks. Master useEffect, useContext, useRef, React.memo, and performance optimization.
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
                  user ? "text-cyan-500 group-hover:translate-x-1" : "text-gray-400"
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
                  ? "bg-white border-gray-200 hover:border-cyan-500 hover:shadow-lg cursor-pointer"
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
                      <span className="px-2 sm:px-3 py-1 bg-cyan-100 text-cyan-700 text-xs font-semibold rounded-full whitespace-nowrap">
                        LOGIN REQUIRED
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
                    Master expert concepts. Challenge yourself with Fiber, reconciliation, custom hooks, and advanced patterns.
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
                  user ? "text-cyan-500 group-hover:translate-x-1" : "text-gray-400"
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
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Sign In</h4>
                  <p className="text-sm text-gray-600">
                    Login to access all React quiz levels and track your progress
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Choose Level</h4>
                  <p className="text-sm text-gray-600">
                    Select difficulty that matches your React knowledge
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center text-cyan-600 font-bold">
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
      if (percentage >= 75) return { text: "Great Work!", color: "text-cyan-600" };
      if (percentage >= 60) return { text: "Good Effort", color: "text-blue-600" };
      return { text: "Keep Learning", color: "text-orange-600" };
    };
    const scoreMessage = getScoreMessage();
    const passed = percentage >= 75;

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold">Quiz Results</h1>
          </div>
        </div>

        {/* Results Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Score Card */}
          <div className="bg-white border-2 border-gray-200 rounded-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              onClick={restartQuiz}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
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
              className="h-full bg-cyan-500 rounded-full transition-all duration-300"
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
                          ? "bg-cyan-50 border-cyan-500"
                          : "bg-white border-gray-200 hover:border-cyan-300"
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
                              ? "bg-cyan-500 text-white"
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
              <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
                <div className="flex gap-3">
                  <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-semibold text-cyan-900 text-sm mb-1">Explanation</h3>
                    <p className="text-sm text-cyan-800">{currentQuestion.explanation}</p>
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
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-300 text-white font-medium py-3 rounded-lg text-sm"
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
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 rounded-lg text-sm flex items-center justify-center gap-2"
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