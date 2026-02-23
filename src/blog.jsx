import React, { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600&family=Syne:wght@600;700;800&display=swap');

  .qc-page {
    min-height: 100vh;
    background: #FAFAF7;
    font-family: 'Inter', system-ui, sans-serif;
    color: #1C1917;
    -webkit-font-smoothing: antialiased;
  }

  /* ── HERO ── */
  .qc-hero {
    position: relative;
    background: #0F0F0F;
    color: white;
    overflow: hidden;
  }
  .qc-hero-glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 80% 50%, rgba(99,102,241,0.18), transparent 70%),
      radial-gradient(ellipse 40% 60% at 20% 20%, rgba(16,185,129,0.12), transparent 60%);
  }
  .qc-hero-inner {
    position: relative;
    max-width: 1100px;
    margin: 0 auto;
    padding: 76px 24px 68px;
  }
  .qc-hero-eyebrow {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
    margin-bottom: 22px;
  }
  .qc-hero-eyebrow::before {
    content: '';
    display: block;
    width: 26px; height: 1px;
    background: rgba(255,255,255,0.28);
  }
  .qc-hero h1 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(42px, 7vw, 72px);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.03em;
    margin: 0 0 20px;
    color: #fff;
  }
  .qc-hero h1 em {
    font-style: normal;
    background: linear-gradient(125deg, #93C5FD, #C4B5FD);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .qc-hero-sub {
    font-size: 15.5px;
    font-weight: 300;
    color: rgba(255,255,255,0.5);
    max-width: 420px;
    line-height: 1.72;
  }
  .qc-hero-stats {
    display: flex;
    gap: 40px;
    margin-top: 44px;
    flex-wrap: wrap;
  }
  .qc-stat-n {
    font-family: 'Lora', Georgia, serif;
    font-size: 26px;
    font-weight: 600;
    color: #FAFAF7;
    display: block;
    line-height: 1;
    margin-bottom: 4px;
  }
  .qc-stat-l {
    font-size: 10.5px;
    font-weight: 400;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }

  /* ── FILTERS ── */
  .qc-filters {
    background: #fff;
    border-bottom: 1px solid #E8E4DC;
    position: sticky;
    top: 0;
    z-index: 10;
  }
  .qc-filters-inner {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    align-items: center;
    gap: 0;
  }
  .qc-search-wrap {
    position: relative;
    flex: 1;
    border-right: 1px solid #E8E4DC;
  }
  .qc-search-icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #A8A29E;
    width: 15px;
    height: 15px;
    pointer-events: none;
  }
  .qc-search-input {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    padding: 18px 12px 18px 24px;
    font-family: 'Inter', sans-serif;
    font-size: 13.5px;
    font-weight: 400;
    color: #1C1917;
  }
  .qc-search-input::placeholder { color: #A8A29E; }
  .qc-cats {
    display: flex;
    align-items: center;
    gap: 0;
    padding-left: 20px;
    overflow-x: auto;
  }
  .qc-cat-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 18px 14px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #A8A29E;
    transition: color 0.18s;
    white-space: nowrap;
    position: relative;
  }
  .qc-cat-btn:hover { color: #1C1917; }
  .qc-cat-btn.active { color: #1C1917; }
  .qc-cat-btn.active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: #1C1917;
    border-radius: 2px 2px 0 0;
  }

  /* ── GRID SECTION ── */
  .qc-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 48px 24px 80px;
  }
  .qc-section-head {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 28px;
  }
  .qc-section-title {
    font-family: 'Lora', Georgia, serif;
    font-size: 22px;
    font-weight: 600;
    font-style: italic;
    color: #1C1917;
  }
  .qc-section-count {
    font-size: 12px;
    color: #A8A29E;
    font-weight: 400;
  }
  .qc-grid {
    display: grid;
    gap: 16px;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }

  /* ── CARD ── */
  .qc-card {
    position: relative;
    background: #FFFFFF;
    border: 1px solid #E8E4DC;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition:
      transform 0.24s cubic-bezier(0.34, 1.46, 0.64, 1),
      box-shadow 0.22s ease,
      border-color 0.2s ease;
  }
  .qc-card:hover {
    transform: translateY(-5px);
    border-color: #D6D0C4;
    box-shadow:
      0 2px 4px rgba(0,0,0,0.04),
      0 10px 28px rgba(0,0,0,0.08),
      0 24px 48px rgba(0,0,0,0.04);
  }
  .qc-card-rule {
    position: absolute;
    left: 0; top: 18px; bottom: 18px;
    width: 3px;
    border-radius: 0 3px 3px 0;
    opacity: 0;
    transition: opacity 0.22s ease;
  }
  .qc-card:hover .qc-card-rule { opacity: 1; }
  .qc-card-body {
    padding: 20px 20px 20px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  /* header row */
  .qc-card-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .qc-icon {
    width: 44px; height: 44px;
    border-radius: 10px;
    background: #FAFAF7;
    border: 1px solid #E8E4DC;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
    transition: background 0.18s, border-color 0.18s;
  }
  .qc-card:hover .qc-icon {
    background: #F5F3EE;
    border-color: #D6D0C4;
  }
  .qc-badge {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 99px;
    border: 1px solid;
    margin-top: 2px;
    flex-shrink: 0;
  }

  /* title */
  .qc-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #1C1917;
    margin: 0 0 7px;
    letter-spacing: -0.01em;
    line-height: 1.25;
    transition: color 0.18s;
  }
  .qc-card:hover h3 { color: #3730A3; }

  /* description */
  .qc-card p {
    font-size: 13px;
    font-weight: 300;
    color: #57534E;
    line-height: 1.65;
    margin: 0 0 16px;
    flex: 1;
  }

  /* meta strip */
  .qc-meta {
    display: flex;
    border-top: 1px solid #F0EDE6;
    border-bottom: 1px solid #F0EDE6;
    padding: 9px 0;
    margin-bottom: 14px;
  }
  .qc-meta-cell {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .qc-meta-cell + .qc-meta-cell {
    border-left: 1px solid #F0EDE6;
    padding-left: 14px;
  }
  .qc-meta-val {
    font-family: 'Syne', sans-serif;
    font-size: 13.5px;
    font-weight: 600;
    color: #1C1917;
    letter-spacing: -0.01em;
  }
  .qc-meta-key {
    font-size: 10px;
    font-weight: 500;
    color: #A8A29E;
    text-transform: uppercase;
    letter-spacing: 0.09em;
  }

  /* topic tags */
  .qc-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 16px;
  }
  .qc-topic {
    font-size: 11px;
    font-weight: 400;
    padding: 3px 8px;
    border-radius: 5px;
    background: #F5F3EE;
    color: #78716C;
    border: 1px solid #EAE6DC;
  }

  /* CTA button */
  .qc-btn {
    width: 100%;
    padding: 11px 16px;
    border-radius: 8px;
    border: none;
    background: #1C1917;
    color: #FAFAF7;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.01em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background 0.18s, transform 0.12s;
  }
  .qc-btn:hover { background: #2C2A27; }
  .qc-btn:active { transform: scale(0.98); }
  .qc-btn svg { transition: transform 0.18s; flex-shrink: 0; }
  .qc-btn:hover svg { transform: translateX(3px); }

  /* ── ARTICLE ── */
  .qc-article-wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }
  .qc-article-back {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 20px 0;
    border-bottom: 1px solid #E8E4DC;
    width: 100%;
    margin-bottom: 48px;
    background: none;
    border-left: none;
    border-right: none;
    border-top: none;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #A8A29E;
    transition: color 0.18s;
    text-align: left;
  }
  .qc-article-back:hover { color: #1C1917; }
  .qc-article-back-icon {
    width: 26px; height: 26px;
    border: 1px solid #E8E4DC;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.18s;
  }
  .qc-article-back:hover .qc-article-back-icon { border-color: #A8A29E; }

  .qc-article-layout {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 64px;
    align-items: start;
  }
  .qc-article-main {}
  .qc-article-sidebar {}

  .qc-article-cat {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .qc-article-cat::before {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: currentColor;
    opacity: 0.5;
  }
  .qc-article-title {
    font-family: 'Lora', Georgia, serif;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: #1C1917;
    margin: 0 0 20px;
  }
  .qc-article-byline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    margin-bottom: 36px;
    padding-bottom: 28px;
    border-bottom: 1px solid #E8E4DC;
  }
  .qc-article-byline-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12.5px;
    color: #78716C;
  }
  .qc-article-byline-item strong { color: #1C1917; font-weight: 500; }

  .qc-article-body {
    font-size: 16.5px;
    line-height: 1.82;
    color: #44403C;
    font-weight: 300;
  }
  .qc-article-body p {
    margin-bottom: 22px;
  }
  .qc-article-body p:first-child::first-letter {
    font-family: 'Lora', Georgia, serif;
    font-size: 64px;
    font-weight: 700;
    float: left;
    line-height: 0.82;
    margin: 6px 10px 0 0;
    color: #1C1917;
  }
  .qc-article-body ul {
    list-style: none;
    margin: 0 0 24px;
    padding: 0 0 0 0;
    border-left: 2px solid #E8E4DC;
    padding-left: 20px;
  }
  .qc-article-body ul li {
    font-size: 14.5px;
    color: #57534E;
    padding: 4px 0;
    display: flex;
    gap: 8px;
  }
  .qc-article-body ul li::before {
    content: '—';
    color: #A8A29E;
    flex-shrink: 0;
    font-family: 'Inter', sans-serif;
  }

  /* sidebar */
  .qc-sidebar-card {
    background: #fff;
    border: 1px solid #E8E4DC;
    border-radius: 14px;
    padding: 20px;
    margin-bottom: 16px;
  }
  .qc-sidebar-title {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #A8A29E;
    margin-bottom: 16px;
  }
  .qc-sidebar-meta {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .qc-sidebar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
  .qc-sidebar-row span:first-child { color: #78716C; font-weight: 300; }
  .qc-sidebar-row span:last-child { color: #1C1917; font-weight: 500; }

  .qc-sidebar-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .qc-article-footer {
    margin-top: 56px;
    padding-top: 32px;
    border-top: 1px solid #E8E4DC;
  }

  /* empty state */
  .qc-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 80px 24px;
    background: #fff;
    border: 1px solid #E8E4DC;
    border-radius: 14px;
  }
  .qc-empty-title {
    font-family: 'Lora', Georgia, serif;
    font-size: 24px;
    font-style: italic;
    color: #78716C;
    margin-bottom: 8px;
  }
  .qc-empty p { font-size: 13px; color: #A8A29E; font-weight: 300; }

  @media (max-width: 768px) {
    .qc-article-layout { grid-template-columns: 1fr; }
    .qc-article-sidebar { display: none; }
    .qc-cats { display: none; }
  }
  @media (max-width: 600px) {
    .qc-hero-inner { padding: 52px 20px 44px; }
    .qc-hero-stats { gap: 26px; }
    .qc-section { padding: 32px 16px 60px; }
    .qc-article-wrap { padding: 0 16px 60px; }
    .qc-grid { grid-template-columns: 1fr; }
  }
`;

const CATEGORIES = ["All", "HTML/CSS", "JavaScript", "React", "Tools"];

const CAT_META = {
  "HTML/CSS":    { color: "#2563EB", bg: "#EFF6FF", border: "#BFDBFE", emoji: "🎨", accent: "#2563EB" },
  "JavaScript":  { color: "#B45309", bg: "#FFFBEB", border: "#FDE68A", emoji: "⚡", accent: "#D97706" },
  "React":       { color: "#0891B2", bg: "#ECFEFF", border: "#A5F3FC", emoji: "⚛️", accent: "#0891B2" },
  "Tools":       { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE", emoji: "🔧", accent: "#7C3AED" },
};

const TAGS = {
  "HTML/CSS":    ["Beginner", "Web Design", "Layout"],
  "JavaScript":  ["Scripting", "Frontend", "ES6"],
  "React":       ["Library", "SPA", "UI"],
  "Tools":       ["DevOps", "Workflow", "CLI"],
};

const RULE_COLORS = {
  "HTML/CSS":   "#2563EB",
  "JavaScript": "#D97706",
  "React":      "#0891B2",
  "Tools":      "#7C3AED",
};

function parseContent(raw) {
  const lines = raw.split("\n");
  const blocks = [];
  let listItems = [];
  let paraLines = [];
  const flushList = () => { if (listItems.length) { blocks.push({ type: "ul", items: [...listItems] }); listItems = []; } };
  const flushPara = () => { const t = paraLines.join(" ").trim(); if (t) blocks.push({ type: "p", text: t }); paraLines = []; };
  for (const line of lines) {
    if (line.startsWith("- ")) { flushPara(); listItems.push(line.slice(2)); }
    else if (line.trim() === "") { flushList(); flushPara(); }
    else { flushList(); paraLines.push(line); }
  }
  flushList(); flushPara();
  return blocks;
}

const POSTS = [
  { id: 1,  title: "How to Start with HTML and CSS",            date: "Jan 10, 2026", category: "HTML/CSS",    author: "Sarah Chen",     readTime: "5 min", level: "Beginner",     summary: "A beginner-friendly guide to building your first web page using HTML and CSS.", content: `HTML is the structure of a webpage. CSS is used to style it.\n\nStart by learning basic tags like div, h1, p, and img. These are the building blocks of any web page. Understanding semantic HTML will help you write cleaner, more accessible code.\n\nThen move to CSS properties like color, margin, padding, and flexbox. Modern CSS includes powerful layout tools like Grid and Flexbox that make responsive design much easier.\n\nPractice by building small layouts like cards and landing pages. Don't try to build complex websites right away. Start simple and gradually increase complexity.\n\nKey tips for beginners:\n- Use online resources like MDN and CSS-Tricks\n- Build at least 3–5 small projects before moving to frameworks\n- Learn responsive design principles early\n- Practice debugging with browser developer tools\n\nRemember, consistency is more important than speed. Code a little bit every day and you will see rapid improvement.` },
  { id: 2,  title: "Understanding JavaScript Basics",           date: "Jan 15, 2026", category: "JavaScript",   author: "Michael Torres", readTime: "7 min", level: "Beginner",     summary: "Learn the core concepts of JavaScript that every developer must know.", content: `JavaScript makes websites interactive and dynamic.\n\nYou should understand variables, functions, loops, and events. These fundamentals form the foundation of all JavaScript programming. Variables store data, functions organize code, loops repeat actions, and events respond to user interactions.\n\nStart with simple programs like a counter or form validation. These projects teach you how to manipulate the DOM and handle user input.\n\nCommon JavaScript concepts to master:\n- Data types: strings, numbers, booleans, objects, arrays\n- Functions: declarations, expressions, arrow functions\n- DOM manipulation: querySelector, addEventListener\n- Async programming: callbacks, promises, async/await\n- ES6+ features: destructuring, spread operator, template literals\n\nPractice daily and build small projects. Consistency is key to becoming proficient.` },
  { id: 3,  title: "Why React is So Popular",                   date: "Jan 20, 2026", category: "React",        author: "Emma Wilson",    readTime: "6 min", level: "Intermediate", summary: "A simple explanation of why React is widely used in modern web development.", content: `React helps you build reusable UI components that can be used throughout your application.\n\nIt uses state and props to manage data. State is data that changes over time, while props are data passed from parent to child components. This separation makes it easy to understand data flow.\n\nReact is fast because of the virtual DOM. Instead of updating the entire page, React only updates the parts that changed.\n\nKey React concepts:\n- Components: functional and class components\n- JSX: JavaScript XML syntax\n- Hooks: useState, useEffect, useContext, useReducer\n- Props and state management\n- Component lifecycle\n- Conditional rendering\n\nStart learning React after you are comfortable with JavaScript fundamentals.` },
  { id: 4,  title: "CSS Grid vs Flexbox",                       date: "Jan 22, 2026", category: "HTML/CSS",    author: "David Kim",      readTime: "8 min", level: "Intermediate", summary: "Understanding the differences between CSS Grid and Flexbox and when to use each.", content: `CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes.\n\nFlexbox is designed for one-dimensional layouts. Use Flexbox when you need to arrange items in a single row or column. It excels at distributing space and aligning items.\n\nCSS Grid is designed for two-dimensional layouts. Use Grid when you need to control both rows and columns simultaneously.\n\nWhen to use Flexbox:\n- Navigation bars\n- Card layouts in a row\n- Centering content\n- Equal height columns\n\nWhen to use Grid:\n- Full page layouts\n- Photo galleries\n- Dashboard layouts\n- Magazine-style designs\n\nYou can combine both in the same project for best results.` },
  { id: 5,  title: "Building Your First REST API",              date: "Jan 25, 2026", category: "JavaScript",   author: "Alex Rodriguez", readTime: "10 min", level: "Intermediate", summary: "A step-by-step guide to creating a REST API using Node.js and Express.", content: `REST APIs are the backbone of modern web applications. They allow your frontend to communicate with your backend.\n\nStart by learning Node.js and Express. Node.js lets you run JavaScript on the server, while Express is a minimal web framework that makes building APIs simple.\n\nA REST API typically has these HTTP methods:\n- GET: retrieve data\n- POST: create new data\n- PUT: update existing data\n- DELETE: remove data\n\nYour first API should be simple. Try building a todo API or a simple blog API. Gradually add more features over time.\n\nUse tools like Postman or Thunder Client to test your API endpoints.` },
  { id: 6,  title: "Introduction to Git and GitHub",            date: "Jan 28, 2026", category: "Tools",        author: "Sarah Chen",     readTime: "7 min", level: "Beginner",     summary: "Learn version control basics and how to use Git and GitHub for your projects.", content: `Git is a version control system that tracks changes in your code. GitHub is a platform for hosting Git repositories.\n\nEvery developer needs to know Git. It lets you save different versions of your code, collaborate with others, and deploy your projects.\n\nBasic Git commands to learn first:\n- git init: start a new repository\n- git add: stage changes\n- git commit: save changes\n- git push: upload to GitHub\n- git pull: download from GitHub\n\nCreate a GitHub account and push your projects there. This builds your portfolio and shows employers what you can do.\n\nGitHub also has great features:\n- Issues: track bugs and feature requests\n- Pull requests: review code before merging\n- GitHub Pages: host static websites for free` },
  { id: 7,  title: "Understanding Async JavaScript",            date: "Feb 1, 2026",  category: "JavaScript",   author: "Michael Torres", readTime: "9 min", level: "Intermediate", summary: "Master asynchronous programming with callbacks, promises, and async/await.", content: `Asynchronous code is code that does not run immediately. It runs later, after something else finishes.\n\nJavaScript is single-threaded, but it can handle async operations using callbacks, promises, and async/await.\n\nCallbacks were the original way to handle async code. A callback is a function passed to another function to be called later. However, callbacks can lead to callback hell when nested too deeply.\n\nPromises are a better way. A promise represents a value that will be available in the future. Promises have three states: pending, fulfilled, and rejected.\n\nCommon async operations:\n- API calls with fetch\n- File reading and writing\n- Database queries\n- Timers: setTimeout, setInterval` },
  { id: 8,  title: "React Hooks Deep Dive",                     date: "Feb 5, 2026",  category: "React",        author: "Emma Wilson",    readTime: "11 min", level: "Advanced",    summary: "A comprehensive guide to React Hooks including useState, useEffect, and custom hooks.", content: `React Hooks changed how we write React components. They let you use state and other React features in functional components.\n\nuseState is the most basic hook. It lets you add state to functional components. Call useState with an initial value and it returns the current state and a function to update it.\n\nuseEffect runs side effects in your components. Use it for fetching data, subscribing to events, or manually changing the DOM.\n\nOther built-in hooks:\n- useContext: consume context values\n- useReducer: manage complex state logic\n- useRef: access DOM elements\n- useMemo: memoize expensive calculations\n- useCallback: memoize functions\n\nRules of Hooks:\n- Only call hooks at the top level\n- Only call hooks from React functions` },
  { id: 9,  title: "Responsive Design Best Practices",          date: "Feb 8, 2026",  category: "HTML/CSS",    author: "David Kim",      readTime: "8 min", level: "Beginner",     summary: "Learn how to build websites that look great on all devices using responsive design techniques.", content: `Responsive design means your website works well on all screen sizes from mobile phones to large desktop monitors.\n\nStart with a mobile-first approach. Design for small screens first, then add complexity for larger screens. This ensures your site works on the most constrained devices.\n\nUse relative units instead of fixed pixels:\n- Percentages for widths\n- rem and em for font sizes\n- vw and vh for viewport-relative sizing\n\nMedia queries let you apply different styles at different screen sizes.\n\nKey principles:\n- Flexible grids\n- Flexible images\n- Media queries\n- Mobile-first design\n- Touch-friendly interactive elements\n\nResponsive design is not optional anymore. Mobile devices account for more than half of all web traffic.` },
  { id: 10, title: "Debugging Tips for JavaScript Developers",  date: "Feb 12, 2026", category: "JavaScript",   author: "Alex Rodriguez", readTime: "6 min", level: "Beginner",     summary: "Essential debugging techniques to find and fix bugs faster in your JavaScript code.", content: `Every developer spends time debugging. Learning to debug efficiently makes you much more productive.\n\nConsole.log is your first debugging tool. Log variables at different points to see how they change. Use console.table for objects and arrays.\n\nBrowser developer tools are incredibly powerful. Learn to use the debugger. Set breakpoints to pause code execution and inspect variables.\n\nCommon debugging techniques:\n- Read error messages carefully\n- Check the stack trace\n- Use breakpoints instead of console.log\n- Verify your assumptions\n- Reproduce the bug consistently\n\nThe rubber duck method works. Explain your code out loud to a rubber duck or a colleague.` },
  { id: 11, title: "Getting Started with TypeScript",           date: "Feb 15, 2026", category: "Tools",        author: "Sarah Chen",     readTime: "9 min", level: "Intermediate", summary: "Learn why TypeScript is becoming essential and how to add type safety to your JavaScript projects.", content: `TypeScript is JavaScript with syntax for types. It helps you catch errors early and makes your code more maintainable.\n\nTypes describe what kind of data a variable can hold. String, number, boolean, and array are basic types. You can also create custom types for objects.\n\nTypeScript catches type errors at compile time, before your code runs. This prevents many runtime errors and makes refactoring safer.\n\nBasic TypeScript syntax:\n- let name: string = "John"\n- function greet(name: string): string\n- interface User { name: string; age: number }\n- type Status = "pending" | "complete"\n\nBenefits of TypeScript:\n- Catch errors early\n- Better IDE support\n- Self-documenting code` },
  { id: 12, title: "State Management in React Applications",    date: "Feb 18, 2026", category: "React",        author: "Emma Wilson",    readTime: "10 min", level: "Advanced",    summary: "Compare different state management solutions and learn when to use each one.", content: `State management is how you handle data in your React application. Choosing the right solution depends on your needs.\n\nFor small apps, React's built-in useState and useContext are often enough. They are simple and require no additional libraries.\n\nContext API is great for sharing state across many components without prop drilling. Create a context, provide it at the top level, and consume it anywhere.\n\nOther state management options:\n- Zustand: minimal and flexible\n- Jotai: atomic state management\n- Recoil: similar to Zustand but more features\n- MobX: observable state\n\nCommon patterns:\n- Lift state up to common ancestors\n- Keep state as local as possible\n- Use derived state instead of duplicating` },
];

const LEVEL_COLORS = {
  Beginner:     { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
  Intermediate: { color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
  Advanced:     { color: "#7C3AED", bg: "#F5F3FF", border: "#DDD6FE" },
};

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  useEffect(() => { scrollToTop(); }, []);

  const filteredPosts = POSTS.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.author.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const openPost  = (post) => { setSelectedPost(post); scrollToTop(); };
  const closePost = () => { setSelectedPost(null); scrollToTop(); };

  return (
    <div className="qc-page">
      <style>{style}</style>

      {/* HERO */}
      <header className="qc-hero">
        <div className="qc-hero-glow" />
        <div className="qc-hero-inner">
          <div className="qc-hero-eyebrow">Developer Blog</div>
          <h1>
            Learn<br />
            <em>modern web</em><br />
            development.
          </h1>
          <p className="qc-hero-sub">
            Practical tutorials and deep dives written by developers, for developers.
          </p>
          <div className="qc-hero-stats">
            {[
              { n: `${POSTS.length}`, l: "Articles" },
              { n: "4", l: "Categories" },
              { n: "5", l: "Authors" },
              { n: "Free", l: "Always" },
            ].map(({ n, l }) => (
              <div key={l}>
                <span className="qc-stat-n">{n}</span>
                <span className="qc-stat-l">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* STICKY FILTERS */}
      {!selectedPost && (
        <div className="qc-filters">
          <div className="qc-filters-inner">
            <div className="qc-search-wrap">
              <svg className="qc-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="qc-search-input"
                type="text"
                placeholder="Search articles, topics, authors…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="qc-cats">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`qc-cat-btn${selectedCategory === cat ? " active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CARD GRID */}
      {!selectedPost && (
        <div className="qc-section">
          <div className="qc-section-head">
            <span className="qc-section-title">
              {selectedCategory === "All" ? "All articles" : selectedCategory}
            </span>
            <span className="qc-section-count">{filteredPosts.length} found</span>
          </div>
          <div className="qc-grid">
            {filteredPosts.length === 0 ? (
              <div className="qc-empty">
                <p className="qc-empty-title">Nothing found.</p>
                <p>Try different search terms or select another category.</p>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const cm = CAT_META[post.category] || {};
                const lm = LEVEL_COLORS[post.level] || {};
                return (
                  <div key={post.id} className="qc-card" onClick={() => openPost(post)}>
                    <div
                      className="qc-card-rule"
                      style={{ background: RULE_COLORS[post.category] || "#ccc" }}
                    />
                    <div className="qc-card-body">
                      <div className="qc-card-head">
                        <div className="qc-icon">{cm.emoji}</div>
                        <span
                          className="qc-badge"
                          style={{ color: lm.color, background: lm.bg, borderColor: lm.border }}
                        >
                          {post.level}
                        </span>
                      </div>
                      <h3>{post.title}</h3>
                      <p>{post.summary}</p>

                      <div className="qc-meta">
                        <div className="qc-meta-cell">
                          <span className="qc-meta-val">{post.author.split(" ")[0]}</span>
                          <span className="qc-meta-key">Author</span>
                        </div>
                        <div className="qc-meta-cell">
                          <span className="qc-meta-val">{post.readTime}</span>
                          <span className="qc-meta-key">Read time</span>
                        </div>
                        <div className="qc-meta-cell">
                          <span className="qc-meta-val">{post.date.split(" ")[0]}</span>
                          <span className="qc-meta-key">Month</span>
                        </div>
                      </div>

                      <div className="qc-topics">
                        {(TAGS[post.category] || []).map((t) => (
                          <span key={t} className="qc-topic">{t}</span>
                        ))}
                        <span className="qc-topic">{post.category}</span>
                      </div>

                      <button className="qc-btn">
                        Read article
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* ARTICLE VIEW */}
      {selectedPost && (() => {
        const cm = CAT_META[selectedPost.category] || {};
        const lm = LEVEL_COLORS[selectedPost.level] || {};
        const blocks = parseContent(selectedPost.content);
        return (
          <div className="qc-article-wrap">
            <button className="qc-article-back" onClick={closePost}>
              <span className="qc-article-back-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </span>
              All articles
            </button>

            <div className="qc-article-layout">
              <div className="qc-article-main">
                <div
                  className="qc-article-cat"
                  style={{ color: cm.accent || "#1C1917" }}
                >
                  {selectedPost.category}
                </div>
                <h1 className="qc-article-title">{selectedPost.title}</h1>
                <div className="qc-article-byline">
                  {[
                    { icon: "👤", label: selectedPost.author },
                    { icon: "📅", label: selectedPost.date },
                    { icon: "⏱", label: `${selectedPost.readTime} read` },
                  ].map(({ icon, label }) => (
                    <div key={label} className="qc-article-byline-item">
                      <span>{icon}</span>
                      <strong>{label}</strong>
                    </div>
                  ))}
                  <span
                    className="qc-badge"
                    style={{ color: lm.color, background: lm.bg, borderColor: lm.border }}
                  >
                    {selectedPost.level}
                  </span>
                </div>

                <div className="qc-article-body">
                  {blocks.map((block, i) =>
                    block.type === "p" ? (
                      <p key={i}>{block.text}</p>
                    ) : (
                      <ul key={i}>
                        {block.items.map((item, j) => <li key={j}>{item}</li>)}
                      </ul>
                    )
                  )}
                </div>

                <div className="qc-article-footer">
                  <button className="qc-btn" style={{ width: "auto", display: "inline-flex" }} onClick={closePost}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to all articles
                  </button>
                </div>
              </div>

              <div className="qc-article-sidebar">
                <div className="qc-sidebar-card">
                  <div className="qc-sidebar-title">Article Info</div>
                  <div className="qc-sidebar-meta">
                    {[
                      ["Author",    selectedPost.author],
                      ["Published", selectedPost.date],
                      ["Read time", `${selectedPost.readTime} read`],
                      ["Level",     selectedPost.level],
                      ["Category",  selectedPost.category],
                    ].map(([k, v]) => (
                      <div key={k} className="qc-sidebar-row">
                        <span>{k}</span><span>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="qc-sidebar-card">
                  <div className="qc-sidebar-title">Topics</div>
                  <div className="qc-sidebar-tags">
                    {(TAGS[selectedPost.category] || []).concat(selectedPost.category).map((t) => (
                      <span key={t} className="qc-topic">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="qc-sidebar-card">
                  <div className="qc-sidebar-title">More from {selectedPost.author.split(" ")[0]}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {POSTS.filter(p => p.author === selectedPost.author && p.id !== selectedPost.id).slice(0, 3).map(p => (
                      <div
                        key={p.id}
                        onClick={() => openPost(p)}
                        style={{ cursor: "pointer" }}
                      >
                        <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1917", marginBottom: 2, lineHeight: 1.3 }}>{p.title}</div>
                        <div style={{ fontSize: 11, color: "#A8A29E" }}>{p.readTime} · {p.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}