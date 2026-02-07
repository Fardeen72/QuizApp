import React, { useState , useEffect} from "react";
import { useNavigate } from "react-router-dom";

function JavaQuestion() {
  const navigate = useNavigate();

const questions = [
  // 🟢 EASY
  {
    question: "What is Java?",
    options: [
      "A database",
      "An operating system",
      "A programming language",
      "A web browser",
    ],
    answer: "A programming language",
    explanation:
      "Java is a programming language used to build applications like Android apps, web apps, desktop software, and enterprise systems.",
  },
  {
    question: "Who originally developed Java?",
    options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
    answer: "Sun Microsystems",
    explanation:
      "Java was developed by Sun Microsystems (later acquired by Oracle).",
  },
  {
    question: "Which file extension is used for Java source code files?",
    options: [".js", ".java", ".class", ".html"],
    answer: ".java",
    explanation:
      "Java source code is written in `.java` files. After compilation, it becomes `.class` bytecode.",
  },
  {
    question: "Which keyword is used to create a class in Java?",
    options: ["function", "class", "define", "struct"],
    answer: "class",
    explanation:
      "Java uses the `class` keyword to define a class, which is a blueprint for creating objects.",
  },
  {
    question: "Which method is the entry point of a Java program?",
    options: ["start()", "run()", "main()", "init()"],
    answer: "main()",
    explanation:
      "The `main()` method is the starting point of execution in Java programs: `public static void main(String[] args)`.",
  },
  {
    question: "Which keyword is used to create an object in Java?",
    options: ["create", "new", "object", "instance"],
    answer: "new",
    explanation:
      "The `new` keyword is used to create an object from a class, e.g., `Student s = new Student();`.",
  },
  {
    question: "Which data type is used to store whole numbers?",
    options: ["float", "double", "int", "char"],
    answer: "int",
    explanation:
      "`int` is used to store integer (whole number) values like 10, -5, 0.",
  },

  // 🟡 MEDIUM
  {
    question: "What is JVM in Java?",
    options: [
      "Java Variable Machine",
      "Java Virtual Machine",
      "Java Visual Machine",
      "Java Verified Machine",
    ],
    answer: "Java Virtual Machine",
    explanation:
      "JVM (Java Virtual Machine) runs Java bytecode and makes Java platform-independent (Write Once, Run Anywhere).",
  },
  {
    question: "Which concept allows using the same method name with different parameters?",
    options: ["Inheritance", "Overloading", "Overriding", "Encapsulation"],
    answer: "Overloading",
    explanation:
      "Method overloading means multiple methods can have the same name but different parameters in the same class.",
  },
  {
    question: "Which keyword is used to inherit a class?",
    options: ["this", "super", "extends", "implements"],
    answer: "extends",
    explanation:
      "`extends` is used for inheritance in Java. Example: `class B extends A { }`.",
  },
  {
    question: "Which access modifier makes members visible everywhere?",
    options: ["private", "protected", "default", "public"],
    answer: "public",
    explanation:
      "`public` members can be accessed from anywhere in the program (any class, any package).",
  },
  {
    question: "What is an interface in Java?",
    options: [
      "A class with methods",
      "A blueprint of methods (rules)",
      "An object",
      "A package",
    ],
    answer: "A blueprint of methods (rules)",
    explanation:
      "An interface provides a set of method declarations. Classes implement interfaces to follow those rules.",
  },
  {
    question: "Which loop is guaranteed to execute at least once?",
    options: ["for", "while", "do-while", "foreach"],
    answer: "do-while",
    explanation:
      "`do-while` runs the code block first and checks the condition later, so it always executes at least once.",
  },
  {
    question: "How do you handle exceptions in Java?",
    options: ["error", "throw", "try-catch", "handle"],
    answer: "try-catch",
    explanation:
      "Java uses `try { } catch { }` blocks to catch runtime errors and prevent program crashes.",
  },

  // 🔴 HARD
  {
    question: "What is method overriding?",
    options: [
      "Same method name in same class",
      "Same method in child class with new implementation",
      "Calling parent method",
      "Deleting methods",
    ],
    answer: "Same method in child class with new implementation",
    explanation:
      "Overriding happens when a child class provides its own version of a parent class method with the same name and parameters.",
  },
  {
    question: "What is encapsulation in Java?",
    options: [
      "Wrapping data and methods together",
      "Inheriting classes",
      "Multiple inheritance",
      "Code duplication",
    ],
    answer: "Wrapping data and methods together",
    explanation:
      "Encapsulation means binding data (variables) and methods into one unit (class), and controlling access using private + getters/setters.",
  },
  {
    question: "Which keyword prevents inheritance in Java?",
    options: ["static", "final", "private", "abstract"],
    answer: "final",
    explanation:
      "If a class is declared `final`, it cannot be inherited. Example: `final class A { }`.",
  },
  {
    question: "What is polymorphism in Java?",
    options: [
      "Many forms of a method/object",
      "Single method only",
      "Single class only",
      "Many variables",
    ],
    answer: "Many forms of a method/object",
    explanation:
      "Polymorphism means one name but many behaviors. Example: method overriding lets different objects behave differently.",
  },
  {
    question: "What is the difference between == and equals() in Java?",
    options: [
      "Both compare values",
      "== compares references, equals() compares values",
      "Both compare references",
      "No difference",
    ],
    answer: "== compares references, equals() compares values",
    explanation:
      "`==` checks if two references point to the same object. `equals()` checks actual content/value (for Strings and objects).",
  },
  {
    question: "What is garbage collection in Java?",
    options: [
      "Deleting variables manually",
      "Automatic memory management",
      "Removing classes",
      "Stopping program",
    ],
    answer: "Automatic memory management",
    explanation:
      "Garbage collection automatically frees memory by removing objects that are no longer used in the program.",
  },
];


   const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [userAnswers, setUserAnswers] = useState([]);
    const [isFinished, setIsFinished] = useState(false);
  
    const currentQuestion = questions[currentIndex];
    const progress = ((currentIndex + 1) / questions.length) * 100;
  
    // ✅ save progress to localStorage (Dashboard will read this)
    const saveProgress = (topicId, value) => {
  const saved = JSON.parse(localStorage.getItem("userProgress") || "{}");
  const prev = saved[topicId] || 0;

  saved[topicId] = Math.max(prev, value);

  localStorage.setItem("userProgress", JSON.stringify(saved));
};

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentIndex]);
  
    const handleNext = () => {
      if (!selectedOption) return;
  
      const newAnswer = {
        question: currentQuestion.question,
        selectedAnswer: selectedOption,
        correctAnswer: currentQuestion.answer,
        isCorrect: selectedOption === currentQuestion.answer,
        explanation: currentQuestion.explanation,
      };
  
      const updatedAnswers = [...userAnswers, newAnswer];
      setUserAnswers(updatedAnswers);
  
      if (currentIndex + 1 === questions.length) {
        const score = updatedAnswers.filter((a) => a.isCorrect).length;
        const percentage = Math.round((score / questions.length) * 100);
  
        // ✅ update dashboard progress
        saveProgress("html", percentage);
  
        setIsFinished(true);
      } else {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      }
    };
  
    const resetQuiz = () => {
      setCurrentIndex(0);
      setSelectedOption(null);
      setUserAnswers([]);
      setIsFinished(false);
    };
  
    const score = userAnswers.filter((a) => a.isCorrect).length;
    const correctAnswers = userAnswers.filter((a) => a.isCorrect);
    const wrongAnswers = userAnswers.filter((a) => !a.isCorrect);
  
    /* ================= RESULT SCREEN ================= */
    if (isFinished) {
      const percentage = Math.round((score / questions.length) * 100);
  
      return (
        <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-4 py-10">
          <div className="max-w-4xl mx-auto">
            {/* Score Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 mb-6 text-center shadow-md">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Quiz Completed! 🎉
              </h2>
  
              <div className="flex justify-center items-center gap-8 mb-6">
                <div>
                  <p className="text-5xl font-bold text-blue-700 mb-2">
                    {score}/{questions.length}
                  </p>
                  <p className="text-slate-600">Score</p>
                </div>
  
                <div className="h-16 w-px bg-gray-200"></div>
  
                <div>
                  <p className="text-5xl font-bold text-indigo-700 mb-2">
                    {percentage}%
                  </p>
                  <p className="text-slate-600">Percentage</p>
                </div>
              </div>
  
              <div className="flex gap-4 justify-center mb-6 flex-wrap">
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <span className="text-emerald-600 text-xl">✓</span>
                  <span className="text-slate-900 font-medium">
                    {correctAnswers.length} Correct
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-lg border border-rose-200">
                  <span className="text-rose-600 text-xl">✗</span>
                  <span className="text-slate-900 font-medium">
                    {wrongAnswers.length} Wrong
                  </span>
                </div>
              </div>
  
              <button
                onClick={resetQuiz}
                className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-95 transition shadow-md"
              >
                <span className="text-xl">↻</span>
                Restart Quiz
              </button>
            </div>
  
            {/* Correct Answers */}
            {correctAnswers.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 shadow-md">
                <h3 className="text-2xl font-bold text-emerald-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✓</span>
                  Correct Answers ({correctAnswers.length})
                </h3>
  
                <div className="space-y-4">
                  {correctAnswers.map((answer, index) => (
                    <div
                      key={index}
                      className="bg-emerald-50 border border-emerald-200 rounded-xl p-4"
                    >
                      <p className="text-slate-900 font-semibold mb-2">
                        {answer.question}
                      </p>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-emerald-700 font-semibold">
                          Your answer:
                        </span>
                        <span className="text-slate-900">{answer.selectedAnswer}</span>
                        <span className="text-emerald-600">✓</span>
                      </div>
                      <p className="text-slate-600 text-sm italic">
                        {answer.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            {/* Wrong Answers */}
            {wrongAnswers.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                <h3 className="text-2xl font-bold text-rose-700 mb-4 flex items-center gap-2">
                  <span className="text-2xl">✗</span>
                  Wrong Answers ({wrongAnswers.length})
                </h3>
  
                <div className="space-y-4">
                  {wrongAnswers.map((answer, index) => (
                    <div
                      key={index}
                      className="bg-rose-50 border border-rose-200 rounded-xl p-4"
                    >
                      <p className="text-slate-900 font-semibold mb-3">
                        {answer.question}
                      </p>
  
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-rose-600">✗</span>
                          <span className="text-rose-700 font-semibold">
                            Your answer:
                          </span>
                          <span className="text-slate-700 line-through">
                            {answer.selectedAnswer}
                          </span>
                        </div>
  
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-emerald-600">✓</span>
                          <span className="text-emerald-700 font-semibold">
                            Correct answer:
                          </span>
                          <span className="text-slate-900">{answer.correctAnswer}</span>
                        </div>
                      </div>
  
                      <div className="bg-white rounded-lg p-3 border border-gray-200">
                        <p className="text-blue-700 font-semibold text-sm mb-1">
                          💡 Explanation:
                        </p>
                        <p className="text-slate-600 text-sm">{answer.explanation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }
  
    /* ================= QUIZ SCREEN ================= */
    return (
  <div className="bg-gradient-to-b from-white to-slate-50 px-4 pt-6 pb-10 lg:min-h-screen lg:flex lg:items-center lg:justify-center">
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-md">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-slate-600 mb-2">
          <span className="font-semibold text-slate-900">Java Quiz</span>
          <span>
            Question {currentIndex + 1} of {questions.length}
          </span>
        </div>
  
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
          />
        </div>
      </div>
  
      {/* Question */}
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">
        {currentIndex + 1}. {currentQuestion.question}
      </h2>
  
      {/* Options */}
      <div className="space-y-3">
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`
              w-full text-left px-4 py-3 rounded-xl
              border transition font-medium
              ${
                selectedOption === option
                  ? "bg-blue-50 border-blue-300 text-blue-900"
                  : "bg-white border-gray-200 text-slate-700 hover:bg-slate-50"
              }
            `}
          >
            {option}
          </button>
        ))}
      </div>
  
      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!selectedOption}
        className={`
          mt-8 w-full py-3 rounded-xl
          font-semibold transition shadow-md
          ${
            selectedOption
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-95"
              : "bg-gray-200 text-gray-500 cursor-not-allowed shadow-none"
          }
        `}
      >
        {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next"}
      </button>
    </div>
  </div>
  
  
    );
}

export default JavaQuestion;
