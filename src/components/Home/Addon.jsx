import React, { useState } from "react";
import { db, auth } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

  /* ── STICKY FILTERS ── */
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
    flex-wrap: wrap;
  }
  .qc-search-wrap {
    position: relative;
    flex: 1;
    min-width: 200px;
    border-right: 1px solid #E8E4DC;
  }
  .qc-search-icon {
    position: absolute;
    left: 0; top: 50%;
    transform: translateY(-50%);
    color: #A8A29E;
    width: 15px; height: 15px;
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
    color: #1C1917;
  }
  .qc-search-input::placeholder { color: #A8A29E; }
  .qc-filter-groups {
    display: flex;
    align-items: center;
    gap: 0;
    padding-left: 20px;
    overflow-x: auto;
  }
  .qc-filter-divider {
    width: 1px; height: 20px;
    background: #E8E4DC;
    margin: 0 4px;
    flex-shrink: 0;
  }
  .qc-cat-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 18px 13px;
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

  /* ── SECTION ── */
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
  .qc-card:hover .qc-icon { background: #F5F3EE; border-color: #D6D0C4; }
  .qc-badge {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    padding: 3px 9px;
    border-radius: 99px;
    border: 1px solid;
    flex-shrink: 0;
  }
  .qc-card h3 {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #1C1917;
    margin: 0 0 7px;
    letter-spacing: -0.01em;
    line-height: 1.25;
    transition: color 0.18s;
  }
  .qc-card:hover h3 { color: #3730A3; }
  .qc-card p {
    font-size: 13px;
    font-weight: 300;
    color: #57534E;
    line-height: 1.65;
    margin: 0 0 16px;
    flex: 1;
  }
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
  .qc-topics {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-bottom: 16px;
  }
  .qc-topic {
    font-size: 11px;
    padding: 3px 8px;
    border-radius: 5px;
    background: #F5F3EE;
    color: #78716C;
    border: 1px solid #EAE6DC;
  }
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
  .qc-btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none; }
  .qc-btn svg { transition: transform 0.18s; flex-shrink: 0; }
  .qc-btn:hover:not(:disabled) svg { transform: translateX(3px); }
  .qc-btn-ghost {
    background: transparent;
    border: 1px solid #E8E4DC;
    color: #78716C;
  }
  .qc-btn-ghost:hover { background: #F5F3EE; color: #1C1917; }

  /* ── CHALLENGE DETAIL ── */
  .qc-detail-wrap {
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px 80px;
  }
  .qc-detail-back {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 20px 0;
    border-bottom: 1px solid #E8E4DC;
    width: 100%;
    margin-bottom: 48px;
    background: none;
    border-left: none; border-right: none; border-top: none;
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
  .qc-detail-back:hover { color: #1C1917; }
  .qc-detail-back-icon {
    width: 26px; height: 26px;
    border: 1px solid #E8E4DC;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: border-color 0.18s;
  }
  .qc-detail-back:hover .qc-detail-back-icon { border-color: #A8A29E; }

  .qc-detail-layout {
    display: grid;
    grid-template-columns: 1fr 280px;
    gap: 48px;
    align-items: start;
  }

  .qc-detail-cat {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .qc-detail-cat::before {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: currentColor;
    opacity: 0.5;
  }
  .qc-detail-title {
    font-family: 'Lora', Georgia, serif;
    font-size: clamp(26px, 3.5vw, 40px);
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: -0.01em;
    color: #1C1917;
    margin: 0 0 20px;
  }
  .qc-detail-byline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-bottom: 36px;
    padding-bottom: 28px;
    border-bottom: 1px solid #E8E4DC;
  }

  .qc-block {
    background: #fff;
    border: 1px solid #E8E4DC;
    border-radius: 12px;
    padding: 22px 24px;
    margin-bottom: 20px;
  }
  .qc-block-title {
    font-family: 'Syne', sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #A8A29E;
    margin-bottom: 14px;
  }
  .qc-block p {
    font-size: 15px;
    font-weight: 300;
    color: #44403C;
    line-height: 1.75;
  }
  .qc-req-list {
    list-style: none;
    padding: 0; margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .qc-req-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 14px;
    color: #44403C;
    font-weight: 300;
    line-height: 1.5;
  }
  .qc-req-dot {
    width: 20px; height: 20px;
    border-radius: 50%;
    background: #F5F3EE;
    border: 1px solid #E8E4DC;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    font-size: 9px;
    font-family: 'DM Mono', monospace;
    color: #A8A29E;
    font-weight: 600;
  }

  /* code editor area */
  .qc-editor-wrap {
    background: #0F0F0F;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .qc-editor-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 16px;
    border-bottom: 1px solid #2a2a2a;
  }
  .qc-editor-dots {
    display: flex;
    gap: 6px;
  }
  .qc-editor-dot {
    width: 10px; height: 10px;
    border-radius: 50%;
  }
  .qc-editor-label {
    font-family: 'Inter', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.25);
  }
  .qc-editor-chars {
    font-size: 10px;
    color: rgba(255,255,255,0.2);
    font-family: 'Inter', monospace;
  }
  .qc-editor-textarea {
    width: 100%;
    min-height: 320px;
    background: transparent;
    border: none;
    outline: none;
    padding: 20px;
    font-family: 'Courier New', Courier, monospace;
    font-size: 13px;
    line-height: 1.7;
    color: #E8E4DC;
    resize: vertical;
  }
  .qc-editor-textarea::placeholder { color: rgba(255,255,255,0.18); }

  .qc-submit-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
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
  .qc-sidebar-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    padding: 6px 0;
    border-bottom: 1px solid #F0EDE6;
  }
  .qc-sidebar-row:last-child { border-bottom: none; }
  .qc-sidebar-row span:first-child { color: #78716C; font-weight: 300; }
  .qc-sidebar-row span:last-child { color: #1C1917; font-weight: 500; }

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

  /* toast */
  .qc-toast {
    position: fixed;
    bottom: 32px; right: 32px;
    padding: 14px 20px;
    border-radius: 10px;
    font-size: 13.5px;
    font-weight: 500;
    color: #fff;
    z-index: 999;
    animation: slideUp 0.3s ease;
    box-shadow: 0 8px 24px rgba(0,0,0,0.18);
  }
  .qc-toast.success { background: #15803D; }
  .qc-toast.error   { background: #DC2626; }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .qc-detail-layout { grid-template-columns: 1fr; }
    .qc-detail-sidebar { display: none; }
    .qc-filter-groups { overflow-x: auto; flex-wrap: nowrap; }
  }
  @media (max-width: 600px) {
    .qc-hero-inner { padding: 52px 20px 44px; }
    .qc-hero-stats { gap: 26px; }
    .qc-section { padding: 32px 16px 60px; }
    .qc-detail-wrap { padding: 0 16px 60px; }
    .qc-grid { grid-template-columns: 1fr; }
  }
`;

const challenges = [
  { id: 1,  title: "Build a Responsive Card",       tech: "HTML/CSS",   difficulty: "Easy",   description: "Create a responsive profile card using HTML and CSS. It should include an image, name, and short bio.", requirements: ["Use flexbox or grid for layout", "Include hover effects", "Must be mobile responsive"] },
  { id: 2,  title: "Landing Page Layout",            tech: "HTML/CSS",   difficulty: "Hard",   description: "Design a modern landing page with hero section, features section, testimonials, and footer using Flexbox or Grid.", requirements: ["Sticky navigation bar", "Responsive grid layout", "CSS animations on scroll", "Mobile-first approach"] },
  { id: 3,  title: "CSS Animation Challenge",        tech: "HTML/CSS",   difficulty: "Medium", description: "Create a loading spinner and button animations using pure CSS without JavaScript.", requirements: ["Smooth transitions", "Keyframe animations", "Transform properties"] },
  { id: 4,  title: "Responsive Navigation Menu",     tech: "HTML/CSS",   difficulty: "Medium", description: "Build a responsive navigation bar with dropdown menus that converts to a hamburger menu on mobile.", requirements: ["Hamburger menu for mobile", "Dropdown submenus", "Smooth transitions"] },
  { id: 5,  title: "Form Validation",                tech: "JavaScript", difficulty: "Medium", description: "Create a signup form with email and password validation using JavaScript. Include real-time error messages.", requirements: ["Email format validation", "Password strength checker", "Real-time error display", "Prevent form submission on errors"] },
  { id: 6,  title: "Image Slider",                   tech: "JavaScript", difficulty: "Medium", description: "Build an image carousel with previous/next buttons and auto-play functionality.", requirements: ["Auto-play with pause on hover", "Navigation buttons", "Dot indicators", "Smooth transitions"] },
  { id: 7,  title: "Calculator App",                 tech: "JavaScript", difficulty: "Easy",   description: "Create a basic calculator that can perform addition, subtraction, multiplication, and division.", requirements: ["Handle basic operations", "Clear and delete functions", "Decimal point support", "Display result properly"] },
  { id: 8,  title: "Weather App API Integration",    tech: "JavaScript", difficulty: "Hard",   description: "Build a weather application that fetches data from a weather API and displays current conditions and forecast.", requirements: ["API integration", "Search by city name", "Display current weather and forecast", "Error handling for invalid cities"] },
  { id: 9,  title: "Interactive Quiz App",           tech: "JavaScript", difficulty: "Medium", description: "Create a multiple-choice quiz application with score tracking and timer functionality.", requirements: ["Multiple questions", "Timer countdown", "Score calculation", "Result display at end"] },
  { id: 10, title: "Drag and Drop Interface",        tech: "JavaScript", difficulty: "Hard",   description: "Implement a drag and drop interface where items can be moved between different containers.", requirements: ["HTML5 drag and drop API", "Visual feedback during drag", "Drop zone highlighting", "State persistence"] },
  { id: 11, title: "Todo App",                       tech: "React",      difficulty: "Medium", description: "Build a todo app where users can add, delete, edit, and mark tasks as completed with local storage.", requirements: ["Add, edit, delete tasks", "Mark as complete/incomplete", "Filter by status", "Local storage persistence"] },
  { id: 12, title: "Shopping Cart",                  tech: "React",      difficulty: "Hard",   description: "Create a shopping cart with product listing, add to cart, quantity management, and total calculation.", requirements: ["Product grid display", "Add/remove from cart", "Quantity increment/decrement", "Total price calculation", "Use Context API or Redux"] },
  { id: 13, title: "User Authentication Form",       tech: "React",      difficulty: "Medium", description: "Build login and signup forms with form validation, error handling, and conditional rendering.", requirements: ["Form validation with error messages", "Toggle between login/signup", "Password visibility toggle", "Loading states"] },
  { id: 14, title: "Movie Search App",               tech: "React",      difficulty: "Medium", description: "Create an app that searches movies using an API and displays results with poster, title, and ratings.", requirements: ["API integration (OMDB or TMDB)", "Search functionality", "Display movie cards", "Loading and error states"] },
  { id: 15, title: "Dark Mode Toggle",               tech: "React",      difficulty: "Easy",   description: "Implement a dark mode toggle that switches the entire app theme and persists the preference.", requirements: ["Theme context provider", "Toggle button", "CSS variables for theming", "Local storage persistence"] },
  { id: 16, title: "Infinite Scroll Feed",           tech: "React",      difficulty: "Hard",   description: "Build a social media-style feed with infinite scroll that loads more content as user scrolls down.", requirements: ["Intersection Observer API", "Lazy loading", "Pagination", "Loading spinner"] },
  { id: 17, title: "Multi-Step Form",                tech: "React",      difficulty: "Medium", description: "Create a multi-step form wizard with progress indicator, validation, and ability to go back.", requirements: ["Step indicator", "Form validation per step", "Next/Previous navigation", "Final submission"] },
  { id: 18, title: "Markdown Editor",                tech: "React",      difficulty: "Hard",   description: "Build a live markdown editor that shows preview of formatted text as you type.", requirements: ["Split-pane view", "Real-time preview", "Markdown parsing", "Export to HTML"] },
];

const TECH_META = {
  "HTML/CSS":   { emoji: "🎨", color: "#2563EB", rule: "#2563EB" },
  "JavaScript": { emoji: "⚡", color: "#B45309", rule: "#D97706" },
  "React":      { emoji: "⚛️", color: "#0891B2", rule: "#0891B2" },
};

const DIFF_META = {
  Easy:   { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
  Medium: { color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
  Hard:   { color: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
};

const TECHS = ["All", "HTML/CSS", "JavaScript", "React"];
const DIFFS = ["All", "Easy", "Medium", "Hard"];

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

export default function ChallengePage() {
  const [selectedTech, setSelectedTech] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState(null);

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filtered = challenges.filter((c) => {
    const matchTech = selectedTech === "All" || c.tech === selectedTech;
    const matchDiff = selectedDifficulty === "All" || c.difficulty === selectedDifficulty;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q);
    return matchTech && matchDiff && matchSearch;
  });

  const openChallenge = (c) => { setActiveChallenge(c); setUserCode(""); scrollToTop(); };
  const closeChallenge = () => { setActiveChallenge(null); setUserCode(""); scrollToTop(); };

  const handleSubmit = async () => {
    if (!userCode.trim() || !activeChallenge) return;
    setSubmitting(true);
    try {
      await addDoc(collection(db, "challengeSubmissions"), {
        uid: auth.currentUser?.uid || null,
        displayName: auth.currentUser?.displayName || "Anonymous",
        email: auth.currentUser?.email || null,
        challengeId: activeChallenge.id,
        challengeTitle: activeChallenge.title,
        tech: activeChallenge.tech,
        difficulty: activeChallenge.difficulty,
        code: userCode,
        createdAt: serverTimestamp(),
      });
      showToast("Solution submitted successfully!", "success");
      setUserCode("");
      setActiveChallenge(null);
    } catch {
      showToast("Submission failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="qc-page">
      <style>{style}</style>

      {/* TOAST */}
      {toast && (
        <div className={`qc-toast ${toast.type}`}>{toast.msg}</div>
      )}

      {/* HERO */}
      <header className="qc-hero">
        <div className="qc-hero-glow" />
        <div className="qc-hero-inner">
          <div className="qc-hero-eyebrow">Code Challenges</div>
          <h1>
            Practice by<br />
            <em>building real</em><br />
            projects.
          </h1>
          <p className="qc-hero-sub">
            Choose a challenge, write your solution, and submit for review. Earn your stripes one project at a time.
          </p>
          <div className="qc-hero-stats">
            {[
              { n: `${challenges.length}`, l: "Challenges" },
              { n: "3", l: "Technologies" },
              { n: "3", l: "Difficulty levels" },
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
      {!activeChallenge && (
        <div className="qc-filters">
          <div className="qc-filters-inner">
            <div className="qc-search-wrap">
              <svg className="qc-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="qc-search-input"
                type="text"
                placeholder="Search challenges…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="qc-filter-groups">
              {TECHS.map((t) => (
                <button key={t} className={`qc-cat-btn${selectedTech === t ? " active" : ""}`} onClick={() => setSelectedTech(t)}>{t}</button>
              ))}
              <div className="qc-filter-divider" />
              {DIFFS.map((d) => (
                <button key={d} className={`qc-cat-btn${selectedDifficulty === d ? " active" : ""}`} onClick={() => setSelectedDifficulty(d)}>{d}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CHALLENGE GRID */}
      {!activeChallenge && (
        <div className="qc-section">
          <div className="qc-section-head">
            <span className="qc-section-title">
              {selectedTech === "All" ? "All challenges" : selectedTech}
              {selectedDifficulty !== "All" ? ` · ${selectedDifficulty}` : ""}
            </span>
            <span className="qc-section-count">{filtered.length} found</span>
          </div>
          <div className="qc-grid">
            {filtered.length === 0 ? (
              <div className="qc-empty">
                <p className="qc-empty-title">Nothing found.</p>
                <p>Try adjusting your filters or search query.</p>
              </div>
            ) : (
              filtered.map((c) => {
                const tm = TECH_META[c.tech] || {};
                const dm = DIFF_META[c.difficulty] || {};
                return (
                  <div key={c.id} className="qc-card" onClick={() => openChallenge(c)}>
                    <div className="qc-card-rule" style={{ background: tm.rule }} />
                    <div className="qc-card-body">
                      <div className="qc-card-head">
                        <div className="qc-icon">{tm.emoji}</div>
                        <span className="qc-badge" style={{ color: dm.color, background: dm.bg, borderColor: dm.border }}>
                          {c.difficulty}
                        </span>
                      </div>
                      <h3>{c.title}</h3>
                      <p>{c.description}</p>

                      <div className="qc-meta">
                        <div className="qc-meta-cell">
                          <span className="qc-meta-val">{c.tech}</span>
                          <span className="qc-meta-key">Tech</span>
                        </div>
                        <div className="qc-meta-cell">
                          <span className="qc-meta-val">{c.requirements.length}</span>
                          <span className="qc-meta-key">Requirements</span>
                        </div>
                      </div>

                      <div className="qc-topics">
                        {c.requirements.slice(0, 2).map((r) => (
                          <span key={r} className="qc-topic">{r.split(":")[0]}</span>
                        ))}
                        {c.requirements.length > 2 && (
                          <span className="qc-topic">+{c.requirements.length - 2} more</span>
                        )}
                      </div>

                      <button className="qc-btn">
                        Start challenge
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

      {/* CHALLENGE DETAIL */}
      {activeChallenge && (() => {
        const tm = TECH_META[activeChallenge.tech] || {};
        const dm = DIFF_META[activeChallenge.difficulty] || {};
        return (
          <div className="qc-detail-wrap">
            <button className="qc-detail-back" onClick={closeChallenge}>
              <span className="qc-detail-back-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </span>
              All challenges
            </button>

            <div className="qc-detail-layout">
              {/* MAIN */}
              <div>
                <div className="qc-detail-cat" style={{ color: tm.color }}>{activeChallenge.tech}</div>
                <h1 className="qc-detail-title">{activeChallenge.title}</h1>
                <div className="qc-detail-byline">
                  <span className="qc-badge" style={{ color: dm.color, background: dm.bg, borderColor: dm.border }}>
                    {activeChallenge.difficulty}
                  </span>
                  <span style={{ fontSize: 12, color: "#A8A29E" }}>{activeChallenge.requirements.length} requirements</span>
                </div>

                {/* Description */}
                <div className="qc-block">
                  <div className="qc-block-title">Description</div>
                  <p>{activeChallenge.description}</p>
                </div>

                {/* Requirements */}
                <div className="qc-block">
                  <div className="qc-block-title">Requirements</div>
                  <ul className="qc-req-list">
                    {activeChallenge.requirements.map((req, i) => (
                      <li key={i} className="qc-req-item">
                        <span className="qc-req-dot">{String(i + 1).padStart(2, "0")}</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Code editor */}
                <div className="qc-block-title" style={{ marginBottom: 12 }}>Your Solution</div>
                <div className="qc-editor-wrap">
                  <div className="qc-editor-bar">
                    <div className="qc-editor-dots">
                      <div className="qc-editor-dot" style={{ background: "#FF5F57" }} />
                      <div className="qc-editor-dot" style={{ background: "#FEBC2E" }} />
                      <div className="qc-editor-dot" style={{ background: "#28C840" }} />
                    </div>
                    <span className="qc-editor-label">solution.{activeChallenge.tech === "React" ? "jsx" : activeChallenge.tech === "JavaScript" ? "js" : "html"}</span>
                    <span className="qc-editor-chars">{userCode.length} chars</span>
                  </div>
                  <textarea
                    className="qc-editor-textarea"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder={`// Paste your ${activeChallenge.tech} solution here…`}
                    spellCheck={false}
                  />
                </div>

                <div className="qc-submit-row">
                  <button className="qc-btn qc-btn-ghost" style={{ width: "auto" }} onClick={closeChallenge}>
                    Cancel
                  </button>
                  <button
                    className="qc-btn"
                    style={{ width: "auto", minWidth: 160, background: userCode.trim() ? "#15803D" : undefined }}
                    onClick={handleSubmit}
                    disabled={submitting || !userCode.trim()}
                  >
                    {submitting ? "Submitting…" : "Submit solution"}
                    {!submitting && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* SIDEBAR */}
              <div className="qc-detail-sidebar">
                <div className="qc-sidebar-card">
                  <div className="qc-sidebar-title">Challenge Info</div>
                  {[
                    ["Technology", activeChallenge.tech],
                    ["Difficulty", activeChallenge.difficulty],
                    ["Requirements", `${activeChallenge.requirements.length} items`],
                    ["Submission", "Code review"],
                  ].map(([k, v]) => (
                    <div key={k} className="qc-sidebar-row">
                      <span>{k}</span><span>{v}</span>
                    </div>
                  ))}
                </div>

                <div className="qc-sidebar-card">
                  <div className="qc-sidebar-title">Requirements</div>
                  <ul className="qc-req-list">
                    {activeChallenge.requirements.map((req, i) => (
                      <li key={i} className="qc-req-item" style={{ fontSize: 12 }}>
                        <span className="qc-req-dot">{i + 1}</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="qc-sidebar-card">
                  <div className="qc-sidebar-title">Similar Challenges</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {challenges
                      .filter((c) => c.tech === activeChallenge.tech && c.id !== activeChallenge.id)
                      .slice(0, 3)
                      .map((c) => {
                        const d = DIFF_META[c.difficulty] || {};
                        return (
                          <div key={c.id} onClick={() => openChallenge(c)} style={{ cursor: "pointer" }}>
                            <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1917", marginBottom: 4, lineHeight: 1.3 }}>{c.title}</div>
                            <span className="qc-badge" style={{ color: d.color, background: d.bg, borderColor: d.border, fontSize: 9 }}>
                              {c.difficulty}
                            </span>
                          </div>
                        );
                      })}
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