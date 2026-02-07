import React, { useEffect } from "react";
import { BookOpen, ClipboardCheck, Trophy } from "lucide-react";

export default function About() {
  const steps = [
    {
      icon: BookOpen,
      title: "Learn Concepts",
      desc: "Start with simple lessons that explain core web development topics in an easy way.",
    },
    {
      icon: ClipboardCheck,
      title: "Take Quizzes",
      desc: "After each topic, test your understanding with interactive quizzes and instant feedback.",
    },
    {
      icon: Trophy,
      title: "Improve Skills",
      desc: "Track your progress, fix mistakes, and build real knowledge step by step.",
    },
  ];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learn. Practice. Master Web Development.
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This platform helps you learn web development through short lessons
            and quizzes. Understand concepts, test your knowledge, and grow your
            skills with practice.
          </p>
        </div>

        {/* Learn + Quiz Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="text-center p-6 rounded-xl border border-gray-100 hover:shadow-md transition"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>

        {/* Platform Stats */}
        <div className="flex flex-wrap justify-center items-center gap-10 py-8 border-y border-gray-200">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">15+</p>
            <p className="text-sm text-gray-600">Learning Topics</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">1000+</p>
            <p className="text-sm text-gray-600">Practice Questions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">Step-by-Step</p>
            <p className="text-sm text-gray-600">Explanations</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Difficulty Levels</p>
          </div>
        </div>
      </div>
    </section>
  );
}
