import React, { useMemo ,useEffect } from "react";
import { useNavigate }  from "react-router-dom";
import { BookOpen, Code2, ArrowRight } from "lucide-react";

function ReactLearn() {
  const navigate = useNavigate();
 useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const sections = useMemo(
    () => [
      { id: "intro", title: "What is React?" },
      { id: "jsx", title: "JSX Basics" },
      { id: "components", title: "Components" },
      { id: "props", title: "Props" },
      { id: "state", title: "State (useState)" },
      { id: "events", title: "Event Handling" },
      { id: "conditional", title: "Conditional Rendering" },
      { id: "lists", title: "Lists & Keys" },
      { id: "forms", title: "Forms (Controlled Input)" },
      { id: "useeffect", title: "useEffect Hook" },
      { id: "lifting", title: "Lifting State Up" },
      { id: "propsdrill", title: "Props Drilling" },
      { id: "context", title: "Context API" },
      { id: "router", title: "React Router" },
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
            React Tutorial (Full Basics)
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            React is a JavaScript library used to build modern UI. It works with
            components, state, props, hooks, and routing.
          </p>

          {/* CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/react")}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              Start React Quiz <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo("components")}
              className="px-5 py-3 rounded-xl border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
            >
              Jump to Components
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
                  onClick={() => navigate("/react")}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-95 transition"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </aside>

          {/* ✅ RIGHT CONTENT */}
          <main className="space-y-6">
            <Section id="intro" title="What is React?">
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>React is a library for building UI</li>
                <li>It uses reusable components</li>
                <li>Fast UI updates using Virtual DOM</li>
                <li>Used in frontend apps like dashboards, ecommerce, social apps</li>
              </ul>
            </Section>

            <Section id="jsx" title="JSX Basics">
              <p className="text-slate-700 mb-4">
                JSX lets you write HTML-like code inside JavaScript.
              </p>
              <CodeBlock>{`const name = "Feedi";

return (
  <h1>Hello {name}</h1>
);`}</CodeBlock>
            </Section>

            <Section id="components" title="Components">
              <p className="text-slate-700 mb-4">
                Components are reusable UI blocks.
              </p>
              <CodeBlock>{`function Welcome() {
  return <h2>Welcome to React</h2>;
}

export default Welcome;`}</CodeBlock>
            </Section>

            <Section id="props" title="Props">
              <p className="text-slate-700 mb-4">
                Props are used to send data from parent to child.
              </p>
              <CodeBlock>{`function Card({ title }) {
  return <h2>{title}</h2>;
}

export default function App() {
  return <Card title="React Props" />;
}`}</CodeBlock>
            </Section>

            <Section id="state" title="State (useState)">
              <p className="text-slate-700 mb-4">
                State stores changing data inside a component.
              </p>
              <CodeBlock>{`import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`}</CodeBlock>
            </Section>

            <Section id="events" title="Event Handling">
              <CodeBlock>{`export default function App() {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return <button onClick={handleClick}>Click</button>;
}`}</CodeBlock>
            </Section>

            <Section id="conditional" title="Conditional Rendering">
              <CodeBlock>{`export default function App() {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? <h1>Welcome</h1> : <h1>Please Login</h1>}
    </div>
  );
}`}</CodeBlock>
            </Section>

            <Section id="lists" title="Lists & Keys">
              <CodeBlock>{`const users = ["A", "B", "C"];

export default function App() {
  return (
    <ul>
      {users.map((u, i) => (
        <li key={i}>{u}</li>
      ))}
    </ul>
  );
}`}</CodeBlock>

              <p className="text-slate-600 text-sm mt-3">
                ✅ Always use unique key, not index if possible.
              </p>
            </Section>

            <Section id="forms" title="Forms (Controlled Input)">
              <CodeBlock>{`import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter name"
      />
      <button>Submit</button>
    </form>
  );
}`}</CodeBlock>
            </Section>

            <Section id="useeffect" title="useEffect Hook">
              <p className="text-slate-700 mb-4">
                useEffect runs code after render (like fetching API).
              </p>
              <CodeBlock>{`import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return <p>Users: {data.length}</p>;
}`}</CodeBlock>
            </Section>

            <Section id="lifting" title="Lifting State Up">
              <p className="text-slate-700 mb-4">
                If two components need the same state, move it to parent.
              </p>
              <CodeBlock>{`function Child({ value, setValue }) {
  return <button onClick={() => setValue(value + 1)}>+</button>;
}

export default function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>{count}</h2>
      <Child value={count} setValue={setCount} />
    </>
  );
}`}</CodeBlock>
            </Section>

            <Section id="propsdrill" title="Props Drilling">
              <p className="text-slate-700">
                Props drilling means passing props many levels down. Use
                Context API to avoid it.
              </p>
            </Section>

            <Section id="context" title="Context API">
              <CodeBlock>{`import { createContext, useContext } from "react";

const UserContext = createContext();

function Child() {
  const user = useContext(UserContext);
  return <h2>{user}</h2>;
}

export default function App() {
  return (
    <UserContext.Provider value="Feedi">
      <Child />
    </UserContext.Provider>
  );
}`}</CodeBlock>
            </Section>

            <Section id="router" title="React Router">
              <CodeBlock>{`import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Home() { return <h1>Home</h1> }
function About() { return <h1>About</h1> }

export default function App() {
  return (
    <BrowserRouter>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}`}</CodeBlock>
            </Section>

            <Section id="best" title="Best Practices">
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Break UI into reusable components</li>
                <li>Keep state minimal and clean</li>
                <li>Use proper folder structure</li>
                <li>Use useEffect only when needed</li>
                <li>Do not overuse Context (use it for global state only)</li>
              </ul>
            </Section>

            {/* FINAL CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to test yourself?
              </h3>
              <p className="text-slate-600 mb-6">
                Start the React quiz and update your dashboard progress.
              </p>

              <button
                onClick={() => navigate("/react")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Start React Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default ReactLearn;
