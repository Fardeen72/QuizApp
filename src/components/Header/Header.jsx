import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo.png";
import NavbarProfile from "@/components/Contact/Loginwithgoogle";

const NAV_LINKS = [
  // Core
  { to: "/", label: "Home" },

  // Learn
  { to: "/tutorials", label: "Docs" },
  { to: "/cheatsheet", label: "Cheatsheets" },
  { to: "/components", label: "Components" },

  // Practice
  { to: "/cards", label: "Quizzes" },
  { to: "/challenge", label: "Challenges" },

  // Progress
  { to: "/leaderboard", label: "Leaderboard" },

  // Content
  { to: "/blog", label: "Blog" },

  // Support
  { to: "/contact", label: "Contact" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

        .hdr-root {
          position: sticky;
          top: 0;
          z-index: 90;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .hdr-root.scrolled {
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid #E9E7E3;
          box-shadow: 0 2px 16px rgba(0,0,0,0.06);
        }
        .hdr-root.top {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid #F0EEE9;
        }

        .hdr-nav {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        /* Logo */
        .hdr-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .hdr-logo img {
          height: 32px;
          transition: transform 0.2s;
        }
        .hdr-logo:hover img { transform: scale(1.05); }
        .hdr-logo-name {
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 800;
          letter-spacing: -0.03em;
          color: #0F0F0F;
        }
        .hdr-logo-name span {
          background: linear-gradient(135deg, #6366F1, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Desktop links */
        .hdr-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .hdr-link {
          position: relative;
          display: block;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          color: #5C5954;
          text-decoration: none;
          transition: color 0.18s, background 0.18s;
          white-space: nowrap;
        }
        .hdr-link:hover {
          color: #0F0F0F;
          background: #F5F4F1;
        }
        .hdr-link.active {
          color: #0F0F0F;
          font-weight: 600;
          background: #F0F0FF;
          color: #6366F1;
        }

        /* Desktop actions */
        .hdr-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .hdr-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 9px;
          background: #0F0F0F;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.18s, transform 0.18s;
          white-space: nowrap;
          letter-spacing: 0.01em;
        }
        .hdr-cta:hover {
          background: #2D2D2D;
        }

        /* Hamburger */
        .hdr-burger {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          color: #3D3B37;
          transition: background 0.15s;
        }
        .hdr-burger:hover { background: #F5F4F1; }

        /* Mobile drawer */
        .hdr-drawer {
          position: fixed;
          inset: 0;
          top: 60px;
          z-index: 80;
          display: flex;
          flex-direction: column;
        }
        .hdr-drawer-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(15,15,15,0.4);
          backdrop-filter: blur(4px);
        }
        .hdr-drawer-panel {
          position: relative;
          z-index: 1;
          background: #fff;
          border-bottom: 1px solid #E9E7E3;
          padding: 16px 20px 24px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.1);
        }
        .hdr-drawer-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 16px;
          margin-bottom: 12px;
          border-bottom: 1px solid #F0EEE9;
        }
        .hdr-drawer-cta {
          flex: 1;
          text-align: center;
          padding: 10px 16px;
          border-radius: 10px;
          background: #0F0F0F;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.18s;
        }
        .hdr-drawer-cta:hover { background: #2D2D2D; }

        .hdr-drawer-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .hdr-drawer-link {
          display: block;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 500;
          color: #3D3B37;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }
        .hdr-drawer-link:hover { background: #F5F4F1; color: #0F0F0F; }
        .hdr-drawer-link.active {
          background: #F0F0FF;
          color: #6366F1;
          font-weight: 600;
        }

        @media (max-width: 1023px) {
          .hdr-links, .hdr-actions { display: none; }
          .hdr-burger { display: flex; }
        }
      `}</style>

      <header className={`hdr-root ${scrolled ? "scrolled" : "top"}`}>
        <nav className="hdr-nav">
          {/* Logo */}
          <Link to="/" className="hdr-logo">
            {/* <img src={logo} alt="Quiz4Coder" /> */}
            <span className="hdr-logo-name">
              Dev<span>Atlas</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hdr-links">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `hdr-link${isActive ? " active" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hdr-actions">
            <div style={{ position: "relative", zIndex: 100 }}>
              <NavbarProfile />
            </div>
            <Link to="/quizzes" className="hdr-cta">
              Start Quiz
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="hdr-burger"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></>
              }
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="hdr-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="hdr-drawer-backdrop"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="hdr-drawer-panel"
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              {/* Actions row */}
              <div className="hdr-drawer-actions">
                <div style={{ position: "relative", zIndex: 100 }}>
                  <NavbarProfile />
                </div>
                <Link
                  to="/quizzes"
                  className="hdr-drawer-cta"
                  onClick={() => setOpen(false)}
                >
                  Start Quiz →
                </Link>
              </div>

              {/* Links */}
              <ul className="hdr-drawer-links">
                {NAV_LINKS.map(({ to, label }, i) => (
                  <motion.li
                    key={to}
                    initial={{ x: -14, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.04 + 0.05 }}
                  >
                    <NavLink
                      to={to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `hdr-drawer-link${isActive ? " active" : ""}`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}