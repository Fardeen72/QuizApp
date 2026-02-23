import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, Earth, Check, AlertCircle } from "lucide-react";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const socialLinks = [
  { icon: Mail,     href: "mailto:im.feedi4u@gmail.com",               label: "Email" },
  { icon: Github,   href: "https://github.com/Fardeen72",               label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com",                       label: "LinkedIn" },
  { icon: Earth,    href: "https://fardeensportfolilo.netlify.app/",    label: "Website" },
];

const linkSections = [
  {
    title: "Platform",
    links: [
      { label: "Courses",       to: "/" },
      { label: "Quizzes",       to: "/" },
      { label: "Learning Path", to: "/tutorial" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/" },
      { label: "Help Center",   to: "/" },
      { label: "Community",     to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About",     to: "/about" },
      { label: "Contact",   to: "/contact" },
      { label: "Portfolio", to: "https://fardeensportfolilo.netlify.app/" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setIsLoading(true);
    setError("");
    try {
      await addDoc(collection(db, "newsletter"), {
        email: email.trim().toLowerCase(),
        subscribedAt: serverTimestamp(),
        source: "footer",
      });
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      setError("Failed to subscribe. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');

        .ft-root {
          font-family: 'Inter', system-ui, sans-serif;
          background: #111110;
          color: rgba(255,255,255,0.55);
          -webkit-font-smoothing: antialiased;
          position: relative;
          overflow: hidden;
        }
        .ft-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 50% 80% at 5% 10%, rgba(37,99,235,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 60% at 95% 90%, rgba(124,58,237,0.08) 0%, transparent 60%);
          pointer-events: none;
        }

        .ft-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* ── MAIN GRID ── */
        .ft-main {
          display: grid;
          grid-template-columns: 1.8fr 1fr 1fr 1fr;
          gap: 56px;
          padding: 64px 0 56px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }

        /* ── BRAND COL ── */
        .ft-brand-name {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 400;
          font-style: italic;
          color: #FAFAF7;
          margin: 0 0 12px;
          letter-spacing: -0.01em;
        }
        .ft-brand-name span {
          font-style: normal;
          background: linear-gradient(125deg, #60A5FA 0%, #A78BFA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ft-brand-desc {
          font-size: 13.5px;
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255,255,255,0.42);
          margin: 0 0 32px;
          max-width: 280px;
        }

        /* newsletter */
        .ft-nl-label {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 12px;
          display: block;
        }
        .ft-nl-form {
          display: flex;
          gap: 8px;
          margin-bottom: 10px;
        }
        .ft-nl-input-wrap { position: relative; flex: 1; }
        .ft-nl-input-wrap svg {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255,255,255,0.25);
          pointer-events: none;
        }
        .ft-nl-input {
          width: 100%;
          padding: 9px 12px 9px 34px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(255,255,255,0.05);
          color: #FAFAF7;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 300;
          outline: none;
          transition: border-color 0.18s, background 0.18s;
          box-sizing: border-box;
        }
        .ft-nl-input::placeholder { color: rgba(255,255,255,0.22); }
        .ft-nl-input:focus {
          border-color: rgba(96,165,250,0.45);
          background: rgba(255,255,255,0.08);
        }
        .ft-nl-btn {
          padding: 9px 14px;
          border-radius: 8px;
          border: none;
          background: #FAFAF7;
          color: #111110;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.18s, transform 0.12s;
          display: flex;
          align-items: center;
          gap: 5px;
          flex-shrink: 0;
        }
        .ft-nl-btn:hover { background: #E8E4DC; }
        .ft-nl-btn:active { transform: scale(0.97); }
        .ft-nl-btn:disabled { opacity: 0.55; cursor: default; }

        .ft-nl-msg {
          font-size: 12px;
          font-weight: 400;
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 6px;
        }
        .ft-nl-msg.success { color: #34D399; }
        .ft-nl-msg.err     { color: #F87171; }

        /* socials */
        .ft-socials {
          display: flex;
          gap: 8px;
          margin-top: 28px;
        }
        .ft-social-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.38);
          text-decoration: none;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
        }
        .ft-social-btn:hover {
          background: rgba(255,255,255,0.10);
          border-color: rgba(255,255,255,0.20);
          color: #FAFAF7;
        }

        /* ── LINK COLS ── */
        .ft-col-title {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          margin-bottom: 16px;
          display: block;
        }
        .ft-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ft-links a {
          font-size: 13.5px;
          font-weight: 300;
          color: rgba(255,255,255,0.48);
          text-decoration: none;
          transition: color 0.16s;
          letter-spacing: 0.005em;
        }
        .ft-links a:hover { color: #FAFAF7; }

        /* ── BOTTOM BAR ── */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          padding: 20px 0;
          flex-wrap: wrap;
        }
        .ft-copy {
          font-size: 12.5px;
          font-weight: 300;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.01em;
        }
        .ft-legal {
          display: flex;
          gap: 24px;
        }
        .ft-legal a {
          font-size: 12.5px;
          font-weight: 300;
          color: rgba(255,255,255,0.28);
          text-decoration: none;
          transition: color 0.16s;
          letter-spacing: 0.01em;
        }
        .ft-legal a:hover { color: rgba(255,255,255,0.65); }

        /* ── RESPONSIVE ── */
        @media (max-width: 900px) {
          .ft-main {
            grid-template-columns: 1fr 1fr;
            gap: 36px;
          }
          .ft-brand-col { grid-column: 1 / -1; }
          .ft-brand-desc { max-width: 100%; }
          .ft-nl-form { flex-direction: column; }
          .ft-nl-btn { width: 100%; justify-content: center; }
        }
        @media (max-width: 520px) {
          .ft-main { grid-template-columns: 1fr; padding: 48px 0 40px; }
          .ft-bottom { flex-direction: column; align-items: flex-start; gap: 12px; }
        }
      `}</style>

      <footer className="ft-root">
        <div className="ft-inner">
          <div className="ft-main">

            {/* Brand + Newsletter */}
            <div className="ft-brand-col">
              <p className="ft-brand-name">
                Dev<span>Atlas</span>
              </p>
              <p className="ft-brand-desc">
                Learn web development through structured lessons and interactive quizzes. Practice regularly and grow your skills step by step.
              </p>

              <span className="ft-nl-label">Newsletter</span>
              <form onSubmit={handleSubmit}>
                <div className="ft-nl-form">
                  <div className="ft-nl-input-wrap">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      disabled={isSubmitted || isLoading}
                      className="ft-nl-input"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitted || isLoading}
                    className="ft-nl-btn"
                  >
                    {isLoading ? "..." : isSubmitted ? (
                      <>
                        <Check size={13} />
                        Done
                      </>
                    ) : "Subscribe"}
                  </button>
                </div>

                {isSubmitted && (
                  <p className="ft-nl-msg success">
                    <Check size={12} /> You're subscribed!
                  </p>
                )}
                {error && (
                  <p className="ft-nl-msg err">
                    <AlertCircle size={12} /> {error}
                  </p>
                )}
              </form>

              <div className="ft-socials">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="ft-social-btn"
                  >
                    <Icon size={15} strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {linkSections.map((section) => (
              <div key={section.title}>
                <span className="ft-col-title">{section.title}</span>
                <ul className="ft-links">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="ft-bottom">
            <span className="ft-copy">© 2026 Quiz4Coder. All rights reserved.</span>
            <div className="ft-legal">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}