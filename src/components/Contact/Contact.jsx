import React, { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../Firebase";

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
    max-width: 400px;
    line-height: 1.72;
  }
  .qc-hero-availability {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-top: 32px;
    padding: 8px 16px;
    border-radius: 99px;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(255,255,255,0.05);
  }
  .qc-avail-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #34D399;
    box-shadow: 0 0 6px #34D399;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
  .qc-avail-text {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.55);
  }

  /* ── MAIN LAYOUT ── */
  .qc-section {
    max-width: 1100px;
    margin: 0 auto;
    padding: 56px 24px 80px;
    display: grid;
    grid-template-columns: 1fr 1.4fr;
    gap: 24px;
    align-items: start;
  }

  /* ── INFO CARD ── */
  .qc-info-card {
    background: #fff;
    border: 1px solid #E8E4DC;
    border-radius: 14px;
    overflow: hidden;
    position: sticky;
    top: 32px;
  }
  .qc-info-card-top {
    padding: 28px 24px 24px;
    border-bottom: 1px solid #F0EDE6;
  }
  .qc-info-label {
    font-family: 'Syne', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #A8A29E;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .qc-info-label::before {
    content: '';
    display: block;
    width: 20px; height: 1px;
    background: #E8E4DC;
  }
  .qc-info-name {
    font-family: 'Lora', Georgia, serif;
    font-size: 26px;
    font-weight: 700;
    color: #1C1917;
    margin-bottom: 6px;
    line-height: 1.2;
  }
  .qc-info-role {
    font-size: 13px;
    font-weight: 300;
    color: #78716C;
    line-height: 1.5;
  }

  .qc-info-rows {
    padding: 8px 0;
  }
  .qc-info-row {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
    border-bottom: 1px solid #F0EDE6;
    transition: background 0.15s;
  }
  .qc-info-row:last-child { border-bottom: none; }
  .qc-info-row:hover { background: #FAFAF7; }
  .qc-info-icon {
    width: 38px; height: 38px;
    border-radius: 9px;
    background: #FAFAF7;
    border: 1px solid #E8E4DC;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
  }
  .qc-info-content {}
  .qc-info-content-key {
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #A8A29E;
    margin-bottom: 2px;
  }
  .qc-info-content-val {
    font-size: 13.5px;
    font-weight: 500;
    color: #1C1917;
  }
  .qc-info-content-val a {
    color: #3730A3;
    text-decoration: none;
    transition: color 0.15s;
  }
  .qc-info-content-val a:hover { color: #1C1917; text-decoration: underline; }

  .qc-portfolio-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin: 16px 24px 24px;
    padding: 11px 16px;
    border-radius: 8px;
    border: 1px solid #E8E4DC;
    background: transparent;
    color: #78716C;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.05em;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.18s;
  }
  .qc-portfolio-btn:hover {
    border-color: #1C1917;
    color: #1C1917;
    background: #F5F3EE;
  }

  /* ── FORM CARD ── */
  .qc-form-card {
    background: #fff;
    border: 1px solid #E8E4DC;
    border-radius: 14px;
    overflow: hidden;
  }
  .qc-form-header {
    padding: 28px 28px 24px;
    border-bottom: 1px solid #F0EDE6;
  }
  .qc-form-title {
    font-family: 'Lora', Georgia, serif;
    font-size: 22px;
    font-weight: 700;
    font-style: italic;
    color: #1C1917;
    margin-bottom: 6px;
  }
  .qc-form-sub {
    font-size: 13px;
    font-weight: 300;
    color: #78716C;
    line-height: 1.6;
  }

  .qc-form-body {
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .qc-field {
    display: flex;
    flex-direction: column;
    gap: 7px;
  }
  .qc-field-label {
    font-size: 10.5px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #78716C;
  }
  .qc-field-wrap {
    position: relative;
  }
  .qc-field-icon {
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: #A8A29E;
    font-size: 15px;
    pointer-events: none;
    line-height: 1;
  }
  .qc-field-icon-textarea {
    top: 14px;
    transform: none;
  }
  .qc-input {
    width: 100%;
    padding: 12px 14px 12px 40px;
    border: 1px solid #E8E4DC;
    border-radius: 8px;
    background: #FAFAF7;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #1C1917;
    outline: none;
    transition: border-color 0.18s, background 0.18s, box-shadow 0.18s;
    box-sizing: border-box;
  }
  .qc-input::placeholder { color: #C4BFB8; }
  .qc-input:focus {
    border-color: #A8A29E;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(168,162,158,0.12);
  }
  .qc-textarea {
    resize: none;
    min-height: 140px;
    padding-top: 12px;
    line-height: 1.65;
  }

  /* character counter */
  .qc-field-footer {
    display: flex;
    justify-content: flex-end;
  }
  .qc-char-count {
    font-size: 10px;
    color: #C4BFB8;
    font-weight: 400;
  }

  /* submit */
  .qc-submit-btn {
    width: 100%;
    padding: 13px 20px;
    border-radius: 8px;
    border: none;
    background: #1C1917;
    color: #FAFAF7;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.03em;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.18s, transform 0.12s;
    margin-top: 4px;
  }
  .qc-submit-btn:hover:not(:disabled) { background: #2C2A27; }
  .qc-submit-btn:active:not(:disabled) { transform: scale(0.98); }
  .qc-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .qc-submit-btn.success { background: #15803D; }
  .qc-submit-btn svg { flex-shrink: 0; }

  /* spin */
  @keyframes spin { to { transform: rotate(360deg); } }
  .spin { animation: spin 0.8s linear infinite; }

  /* ── TOAST ── */
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
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .qc-toast.success { background: #15803D; }
  .qc-toast.error   { background: #DC2626; }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── SKELETON SHIMMER ── */
  .skel-block {
    border-radius: 5px;
    background: linear-gradient(90deg, #F0EDE6 25%, #E8E4DB 50%, #F0EDE6 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
  }
  @keyframes shimmer {
    0%   { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @media (max-width: 768px) {
    .qc-section {
      grid-template-columns: 1fr;
      padding: 32px 16px 60px;
    }
    .qc-info-card { position: static; }
    .qc-hero-inner { padding: 52px 20px 44px; }
  }
`;

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("error", "Please fill in all fields.");
      return;
    }
    if (!validateEmail(formData.email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      });
      setFormData({ name: "", email: "", message: "" });
      setSuccess(true);
      showToast("success", "Message sent — I'll be in touch soon.");
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const INFO_ROWS = [
    { icon: "👤", key: "Name",     val: "Mohd Fardeen Ansari" },
    { icon: "✉️", key: "Email",    val: <a href="mailto:im.feedi4u@gmail.com">im.feedi4u@gmail.com</a> },
    { icon: "📍", key: "Location", val: "Mumbai, Maharashtra, India" },
  ];

  return (
    <div className="qc-page">
      <style>{style}</style>

      {/* TOAST */}
      {toast && (
        <div className={`qc-toast ${toast.type}`}>
          <span>{toast.type === "success" ? "✓" : "✕"}</span>
          {toast.text}
        </div>
      )}

      {/* HERO */}
      <header className="qc-hero">
        <div className="qc-hero-glow" />
        <div className="qc-hero-inner">
          <div className="qc-hero-eyebrow">Contact</div>
          <h1>
            Let's<br />
            <em>work together.</em>
          </h1>
          <p className="qc-hero-sub">
            Have a project in mind or just want to say hello? Fill in the form and I'll get back to you.
          </p>
          <div className="qc-hero-availability">
            <div className="qc-avail-dot" />
            <span className="qc-avail-text">Available for new projects</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="qc-section">

        {/* LEFT — INFO */}
        <div className="qc-info-card">
          <div className="qc-info-card-top">
            <div className="qc-info-label">Who I am</div>
            <div className="qc-info-name">Mohd Fardeen Ansari</div>
            <div className="qc-info-role">Web Developer · Mumbai, India</div>
          </div>

          <div className="qc-info-rows">
            {INFO_ROWS.map(({ icon, key, val }) => (
              <div key={key} className="qc-info-row">
                <div className="qc-info-icon">{icon}</div>
                <div className="qc-info-content">
                  <div className="qc-info-content-key">{key}</div>
                  <div className="qc-info-content-val">{val}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://fardeensportfolilo.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="qc-portfolio-btn"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Visit portfolio
          </a>
        </div>

        {/* RIGHT — FORM */}
        <div className="qc-form-card">
          <div className="qc-form-header">
            <div className="qc-form-title">Send a message</div>
            <div className="qc-form-sub">I typically respond within 24 hours.</div>
          </div>

          <form onSubmit={handleSubmit} className="qc-form-body">

            {/* Name */}
            <div className="qc-field">
              <label className="qc-field-label">Full Name</label>
              <div className="qc-field-wrap">
                <span className="qc-field-icon">👤</span>
                <input
                  className="qc-input"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>
            </div>

            {/* Email */}
            <div className="qc-field">
              <label className="qc-field-label">Email Address</label>
              <div className="qc-field-wrap">
                <span className="qc-field-icon">✉️</span>
                <input
                  className="qc-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Message */}
            <div className="qc-field">
              <label className="qc-field-label">Message</label>
              <div className="qc-field-wrap">
                <span className="qc-field-icon qc-field-icon-textarea">💬</span>
                <textarea
                  className="qc-input qc-textarea"
                  name="message"
                  placeholder="Tell me about your project or just say hello…"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>
              <div className="qc-field-footer">
                <span className="qc-char-count">{formData.message.length} chars</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`qc-submit-btn${success ? " success" : ""}`}
            >
              {loading ? (
                <>
                  <svg className="spin" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  </svg>
                  Sending…
                </>
              ) : success ? (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Sent!
                </>
              ) : (
                <>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  Send message
                </>
              )}
            </button>

          </form>
        </div>

      </div>
    </div>
  );
}