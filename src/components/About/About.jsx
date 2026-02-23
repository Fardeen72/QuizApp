import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const stepLinks = [
  { label: "Read the Blogs", num: "01", to: "/roadmap" },
  { label: "Learn with Tutorials", num: "02", to: "/tutorials" },
  { label: "Use Cheatsheets", num: "03", to: "/cheatsheet" },
  { label: "Explore Components", num: "04", to: "/components" },
  { label: "Practice with Quizzes", num: "05", to: "/cards" },
  { label: "Build & Level Up", num: "06", to: "/challenge" },
];

const stats = [
  { value: "15+", label: "Topics" },
  { value: "1K+", label: "Questions" },
  { value: "3", label: "Levels" },
  { value: "∞", label: "Retries" },
];

export default function About() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ab-root {
          font-family: 'DM Sans', sans-serif;
          background: #FFFFFF;
          min-height: 100vh;
          color: #111110;
          overflow-x: hidden;
        }

        /* ── FADE IN ── */
        .ab-page {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .ab-page.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── HERO ── */
        .ab-hero {
          position: relative;
          padding: 96px 52px 80px;
          border-bottom: 1px solid #EBEBEB;
          overflow: hidden;
          background: #FAFAF9;
        }

        .ab-hero::before {
          content: '';
          position: absolute;
          top: 0; left: 52px;
          width: 48px; height: 3px;
          background: #111110;
        }

        .ab-hero-bg-text {
          position: absolute;
          bottom: -24px;
          right: -8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(110px, 18vw, 200px);
          color: transparent;
          -webkit-text-stroke: 1px rgba(17,17,16,.07);
          pointer-events: none;
          user-select: none;
          line-height: 1;
          letter-spacing: -2px;
        }

        .ab-hero-inner {
          max-width: 960px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .ab-eyebrow {
          font-size: 10px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 22px;
          font-weight: 500;
        }

        .ab-hero-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(52px, 9vw, 108px);
          line-height: .93;
          letter-spacing: -1px;
          color: #111110;
        }

        .ab-hero-title em {
          font-family: 'Instrument Serif', serif;
          font-style: italic;
          color: #777;
        }

        .ab-hero-sub {
          font-size: 15px;
          color: #888;
          max-width: 420px;
          line-height: 1.75;
          margin-top: 28px;
          font-weight: 300;
        }

        /* ── SHARED SECTION ── */
        .ab-section {
          max-width: 960px;
          margin: 0 auto;
          padding: 68px 52px;
          border-bottom: 1px solid #EBEBEB;
        }

        .ab-label {
          font-size: 10px;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: #C0C0C0;
          margin-bottom: 32px;
          font-weight: 500;
        }

        /* ── STEPS ── */
        .ab-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
        }
        @media (max-width: 680px) { .ab-steps-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 420px) { .ab-steps-grid { grid-template-columns: 1fr; } }

        .ab-step-card {
          background: none;
          border: none;
          cursor: pointer;
          padding: 22px 24px;
          text-align: left;
          border-radius: 4px;
          transition: background .18s;
        }
        .ab-step-card:hover { background: #F2F2F0; }
        .ab-step-card:hover .ab-step-num { color: #111110; }
        .ab-step-card:hover .ab-step-label { color: #111110; }

        .ab-step-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 11px;
          letter-spacing: .18em;
          color: #D0D0D0;
          margin-bottom: 7px;
          transition: color .18s;
        }

        .ab-step-label {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(16px, 1.8vw, 19px);
          color: #555;
          line-height: 1.3;
          transition: color .18s;
        }

        /* ── STATS ── */
        .ab-stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 560px) { .ab-stats-grid { grid-template-columns: 1fr 1fr; gap: 40px 0; } }

        .ab-stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(44px, 6.5vw, 76px);
          color: #111110;
          line-height: 1;
          letter-spacing: -1px;
        }

        .ab-stat-label {
          font-size: 10px;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #C0C0C0;
          margin-top: 6px;
          font-weight: 500;
        }

        /* ── MISSION ── */
        .ab-mission-wrap {
          max-width: 960px;
          margin: 0 auto;
          padding: 68px 52px 96px;
        }

        .ab-mission-card {
          background: #111110;
          border-radius: 6px;
          padding: 56px;
          position: relative;
          overflow: hidden;
        }

        .ab-mission-card::after {
          content: 'ATLAS';
          position: absolute;
          bottom: -28px;
          right: -8px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 130px;
          color: rgba(255,255,255,.04);
          pointer-events: none;
          line-height: 1;
          letter-spacing: -2px;
        }

        .ab-mission-tag {
          display: inline-block;
          border: 1px solid rgba(255,255,255,.12);
          color: rgba(255,255,255,.35);
          font-size: 9px;
          letter-spacing: .2em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          margin-bottom: 28px;
          font-weight: 500;
        }

        .ab-mission-card h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(36px, 5.5vw, 62px);
          color: #F5F5F3;
          line-height: .95;
          letter-spacing: -0.5px;
          margin-bottom: 20px;
          max-width: 440px;
        }

        .ab-mission-card p {
          font-size: 15px;
          color: rgba(255,255,255,.42);
          line-height: 1.78;
          max-width: 400px;
          font-weight: 300;
          position: relative;
          z-index: 1;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 600px) {
          .ab-hero { padding: 76px 28px 60px; }
          .ab-hero::before { left: 28px; }
          .ab-section { padding: 52px 28px; }
          .ab-mission-wrap { padding: 52px 28px 80px; }
          .ab-mission-card { padding: 40px 32px; }
        }
      `}</style>

      <div className="ab-root">
        <div className={`ab-page ${visible ? "visible" : ""}`}>

          {/* HERO */}
          <div className="ab-hero">
            <div className="ab-hero-bg-text">DEV</div>
            <div className="ab-hero-inner">
              <div className="ab-eyebrow">About the platform</div>
              <h1 className="ab-hero-title">
                Dev<em>Atlas.</em><br />
                Built different.
              </h1>
              <p className="ab-hero-sub">
                A focused platform for developers at every stage — from your
                first HTML tag to production‑ready systems.
              </p>
            </div>
          </div>

          {/* STEPS */}
          <div className="ab-section">
            <div className="ab-label">How it works</div>
            <div className="ab-steps-grid">
              {stepLinks.map(step => (
                <button
                  key={step.to}
                  className="ab-step-card"
                  onClick={() => navigate(step.to)}
                >
                  <div className="ab-step-num">{step.num}</div>
                  <div className="ab-step-label">{step.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* STATS */}
          <div className="ab-section">
            <div className="ab-label">By the numbers</div>
            <div className="ab-stats-grid">
              {stats.map(s => (
                <div key={s.label}>
                  <div className="ab-stat-value">{s.value}</div>
                  <div className="ab-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* MISSION */}
          <div className="ab-mission-wrap">
            <div className="ab-mission-card">
              <div className="ab-mission-tag">Our mission</div>
              <h2>Built for real learning</h2>
              <p>
                We reward understanding, not completion. Every feature is
                designed to support skills that actually hold up in real
                projects — no fluff, no filler.
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}