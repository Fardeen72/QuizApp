import React, { useMemo  , useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight } from "lucide-react";

function JsLearn() {
  const navigate = useNavigate();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is JavaScript?" },
      { id: "where", title: "Where to Write JavaScript" },
      { id: "variables", title: "Variables (var, let, const)" },
      { id: "datatypes", title: "Data Types" },
      { id: "operators", title: "Operators" },
      { id: "conditions", title: "Conditions (if/else)" },
      { id: "loops", title: "Loops (for, while)" },
      { id: "functions", title: "Functions" },
      { id: "arrays", title: "Arrays" },
      { id: "objects", title: "Objects" },
      { id: "dom", title: "DOM Basics" },
      { id: "events", title: "Events" },
      { id: "json", title: "JSON" },
      { id: "async", title: "Async JavaScript" },
      { id: "fetch", title: "Fetch API" },
      { id: "storage", title: "LocalStorage" },
      { id: "es6", title: "ES6+ Features" },
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
            JavaScript Tutorial (Full Basics)
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            JavaScript makes your website interactive. It controls logic,
            buttons, events, APIs, data and dynamic UI.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/js")}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              Start JS Quiz <ArrowRight className="w-4 h-4" />
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
                  onClick={() => navigate("/js")}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-95 transition"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </aside>

          {/* ✅ RIGHT CONTENT */}
          <main className="space-y-6">
            <Section id="intro" title="What is JavaScript?">
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>JavaScript is the programming language of the web</li>
                <li>It adds interactivity: buttons, forms, dynamic UI</li>
                <li>It can also work with APIs, backend, and data</li>
              </ul>
            </Section>

            <Section id="where" title="Where to Write JavaScript">
              <CodeBlock>{`<!-- Internal JS -->
<script>
  console.log("Hello JS");
</script>

<!-- External JS -->
<script src="script.js"></script>`}</CodeBlock>
            </Section>

            <Section id="variables" title="Variables (var, let, const)">
              <CodeBlock>{`var x = 10;      // old
let y = 20;      // changeable
const z = 30;    // cannot change

y = 50;
console.log(x, y, z);`}</CodeBlock>

              <p className="text-slate-600 text-sm mt-3">
                ✅ Best: use <b>let</b> and <b>const</b>, avoid <b>var</b>.
              </p>
            </Section>

            <Section id="datatypes" title="Data Types">
              <CodeBlock>{`let name = "Feedi";       // string
let age = 20;             // number
let isStudent = true;     // boolean
let data = null;          // null
let value;                // undefined

console.log(typeof name);`}</CodeBlock>
            </Section>

            <Section id="operators" title="Operators">
              <CodeBlock>{`let a = 10;
let b = 3;

console.log(a + b); // 13
console.log(a - b); // 7
console.log(a * b); // 30
console.log(a / b); // 3.333
console.log(a % b); // 1`}</CodeBlock>
            </Section>

            <Section id="conditions" title="Conditions (if/else)">
              <CodeBlock>{`let score = 85;

if (score >= 90) {
  console.log("A Grade");
} else if (score >= 60) {
  console.log("B Grade");
} else {
  console.log("Fail");
}`}</CodeBlock>
            </Section>

            <Section id="loops" title="Loops (for, while)">
              <CodeBlock>{`for (let i = 1; i <= 5; i++) {
  console.log(i);
}

let x = 1;
while (x <= 3) {
  console.log("Hello");
  x++;
}`}</CodeBlock>
            </Section>

            <Section id="functions" title="Functions">
              <CodeBlock>{`function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5

// arrow function
const multiply = (a, b) => a * b;
console.log(multiply(4, 5)); // 20`}</CodeBlock>
            </Section>

            <Section id="arrays" title="Arrays">
              <CodeBlock>{`let fruits = ["apple", "banana", "mango"];

console.log(fruits[0]); // apple
fruits.push("grape");
console.log(fruits.length); // 4

fruits.map((item) => console.log(item));`}</CodeBlock>
            </Section>

            <Section id="objects" title="Objects">
              <CodeBlock>{`let user = {
  name: "Feedi",
  age: 20,
  city: "Mumbai"
};

console.log(user.name);
user.age = 21;`}</CodeBlock>
            </Section>

            <Section id="dom" title="DOM Basics">
              <CodeBlock>{`// get element
const title = document.querySelector("h1");

// change text
title.innerText = "Updated Heading";

// change style
title.style.color = "blue";`}</CodeBlock>
            </Section>

            <Section id="events" title="Events">
              <CodeBlock>{`const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  alert("Button clicked!");
});`}</CodeBlock>
            </Section>

            <Section id="json" title="JSON">
              <CodeBlock>{`const user = { name: "Feedi", age: 20 };

const jsonData = JSON.stringify(user);
console.log(jsonData); // convert to JSON string

const objData = JSON.parse(jsonData);
console.log(objData.name); // convert back to object`}</CodeBlock>
            </Section>

            <Section id="async" title="Async JavaScript">
              <CodeBlock>{`console.log("Start");

setTimeout(() => {
  console.log("After 2 seconds");
}, 2000);

console.log("End");`}</CodeBlock>
            </Section>

            <Section id="fetch" title="Fetch API">
              <CodeBlock>{`async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  console.log(data);
}

getUsers();`}</CodeBlock>
            </Section>

            <Section id="storage" title="LocalStorage">
              <CodeBlock>{`// save
localStorage.setItem("name", "Feedi");

// get
const name = localStorage.getItem("name");
console.log(name);

// remove
localStorage.removeItem("name");`}</CodeBlock>
            </Section>

            <Section id="es6" title="ES6+ Features">
              <CodeBlock>{`// template literal
let name = "Feedi";
console.log(\`Hello \${name}\`);

// spread operator
let arr1 = [1, 2];
let arr2 = [...arr1, 3, 4];

// destructuring
let user = { age: 20, city: "Mumbai" };
let { age, city } = user;`}</CodeBlock>
            </Section>

            <Section id="best" title="Best Practices">
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Always use <b>const</b> and <b>let</b></li>
                <li>Write clean function names</li>
                <li>Use async/await for APIs</li>
                <li>Avoid repeating code (use reusable functions)</li>
                <li>Learn DOM + fetch properly for frontend</li>
              </ul>
            </Section>

            {/* FINAL CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to test yourself?
              </h3>
              <p className="text-slate-600 mb-6">
                Start the JavaScript quiz and update your dashboard progress.
              </p>

              <button
                onClick={() => navigate("/js")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Start JS Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default JsLearn;
