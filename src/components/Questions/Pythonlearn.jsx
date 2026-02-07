import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight } from "lucide-react";

function PythonLearn() {
  const navigate = useNavigate();

  // ✅ Auto scroll top when page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is Python?" },
      { id: "install", title: "Install Python" },
      { id: "syntax", title: "Python Syntax Basics" },
      { id: "variables", title: "Variables" },
      { id: "datatypes", title: "Data Types" },
      { id: "operators", title: "Operators" },
      { id: "conditions", title: "If / Else Conditions" },
      { id: "loops", title: "Loops (for / while)" },
      { id: "functions", title: "Functions" },
      { id: "lists", title: "Lists" },
      { id: "tuples", title: "Tuples" },
      { id: "sets", title: "Sets" },
      { id: "dict", title: "Dictionary" },
      { id: "strings", title: "String Methods" },
      { id: "oops", title: "OOP (Class & Object)" },
      { id: "file", title: "File Handling" },
      { id: "errors", title: "Try / Except" },
      { id: "modules", title: "Modules & pip" },
      { id: "best", title: "Best Practices" },
    ],
    []
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const CodeBlock = ({ children }) => (
    <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl text-sm overflow-x-auto border border-slate-800">
      <code>{children}</code>
    </pre>
  );

  const Section = ({ id, title, children }) => (
    <section
      id={id}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm scroll-mt-24"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center">
          <Code2 className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* ✅ HEADER */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Learning
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Python Tutorial (Full Basics)
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            Python is one of the easiest and most powerful programming languages.
            It is used in Web Development, Data Science, AI, Automation, and more.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/python")}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              Start Python Quiz <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo("variables")}
              className="px-5 py-3 rounded-xl border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
            >
              Jump to Variables
            </button>
          </div>
        </div>

        {/* ✅ MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* ✅ LEFT TOC */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-700" />
                Table of Contents
              </h3>

              <div className="max-h-[75vh] overflow-auto pr-2 space-y-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition text-sm"
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate("/python")}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-95 transition"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </aside>

          {/* ✅ RIGHT CONTENT */}
          <main className="space-y-6">
            <Section id="intro" title="What is Python?">
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Python is a high-level programming language</li>
                <li>Easy syntax, beginner friendly</li>
                <li>Used in AI, ML, web apps, automation and scripting</li>
                <li>Runs on Windows, Linux, Mac (cross-platform)</li>
              </ul>
            </Section>

            <Section id="install" title="Install Python">
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Download from official website: python.org</li>
                <li>✅ Tick “Add Python to PATH” during install</li>
                <li>Check install using terminal/command prompt</li>
              </ul>
              <CodeBlock>{`python --version
pip --version`}</CodeBlock>
            </Section>

            <Section id="syntax" title="Python Syntax Basics">
              <p className="text-slate-700 mb-4">
                Python uses indentation (spaces) instead of curly braces.
              </p>
              <CodeBlock>{`if 5 > 2:
    print("5 is greater than 2")`}</CodeBlock>
            </Section>

            <Section id="variables" title="Variables">
              <p className="text-slate-700 mb-4">
                Variables store values. No need to define datatype manually.
              </p>
              <CodeBlock>{`name = "Feedi"
age = 20
isStudent = True

print(name, age, isStudent)`}</CodeBlock>
            </Section>

            <Section id="datatypes" title="Data Types">
              <CodeBlock>{`x = 10          # int
y = 3.5         # float
name = "hello"  # str
ok = True       # bool
print(type(x), type(y), type(name), type(ok))`}</CodeBlock>
            </Section>

            <Section id="operators" title="Operators">
              <CodeBlock>{`a = 10
b = 3
print(a + b)  # add
print(a - b)  # subtract
print(a * b)  # multiply
print(a / b)  # divide
print(a % b)  # remainder`}</CodeBlock>
            </Section>

            <Section id="conditions" title="If / Else Conditions">
              <CodeBlock>{`marks = 75

if marks >= 90:
    print("A Grade")
elif marks >= 60:
    print("B Grade")
else:
    print("Fail")`}</CodeBlock>
            </Section>

            <Section id="loops" title="Loops (for / while)">
              <CodeBlock>{`# for loop
for i in range(1, 6):
    print(i)

# while loop
x = 1
while x <= 5:
    print(x)
    x += 1`}</CodeBlock>
            </Section>

            <Section id="functions" title="Functions">
              <CodeBlock>{`def add(a, b):
    return a + b

print(add(5, 10))`}</CodeBlock>
            </Section>

            <Section id="lists" title="Lists">
              <CodeBlock>{`nums = [10, 20, 30]
nums.append(40)

print(nums)
print(nums[0])`}</CodeBlock>
            </Section>

            <Section id="tuples" title="Tuples">
              <p className="text-slate-700 mb-4">
                Tuples are like lists but immutable (cannot change).
              </p>
              <CodeBlock>{`t = (1, 2, 3)
print(t[1])`}</CodeBlock>
            </Section>

            <Section id="sets" title="Sets">
              <p className="text-slate-700 mb-4">
                Sets store unique values (no duplicates).
              </p>
              <CodeBlock>{`s = {1, 2, 2, 3}
print(s)`}</CodeBlock>
            </Section>

            <Section id="dict" title="Dictionary">
              <CodeBlock>{`student = {
    "name": "Feedi",
    "age": 20,
    "course": "CS"
}

print(student["name"])`}</CodeBlock>
            </Section>

            <Section id="strings" title="String Methods">
              <CodeBlock>{`text = "hello world"
print(text.upper())
print(text.lower())
print(text.replace("world", "python"))`}</CodeBlock>
            </Section>

            <Section id="oops" title="OOP (Class & Object)">
              <CodeBlock>{`class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def show(self):
        print(self.name, self.age)

s1 = Student("Feedi", 20)
s1.show()`}</CodeBlock>
            </Section>

            <Section id="file" title="File Handling">
              <CodeBlock>{`# writing file
with open("data.txt", "w") as f:
    f.write("Hello Python")

# reading file
with open("data.txt", "r") as f:
    print(f.read())`}</CodeBlock>
            </Section>

            <Section id="errors" title="Try / Except">
              <CodeBlock>{`try:
    x = 10 / 0
except Exception as e:
    print("Error:", e)`}</CodeBlock>
            </Section>

            <Section id="modules" title="Modules & pip">
              <p className="text-slate-700 mb-4">
                pip is used to install external packages.
              </p>
              <CodeBlock>{`pip install requests

import requests
print("requests installed")`}</CodeBlock>
            </Section>

            <Section id="best" title="Best Practices">
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Use meaningful variable names</li>
                <li>Write clean indentation (4 spaces)</li>
                <li>Use functions instead of repeated code</li>
                <li>Use try/except for risky code</li>
                <li>Keep code organized in files/modules</li>
              </ul>
            </Section>

            {/* FINAL CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to test yourself?
              </h3>
              <p className="text-slate-600 mb-6">
                Start the Python quiz and update your dashboard progress.
              </p>

              <button
                onClick={() => navigate("/python")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Start Python Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default PythonLearn;
