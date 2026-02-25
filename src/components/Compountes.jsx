import { useState, useRef, useEffect } from "react";

/* ────────────────────────────────────────────────────────────
   GLOBAL STYLES
──────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Geist+Mono:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #0a0a0b;
  --bg2: #111114;
  --bg3: #18181c;
  --border: #27272f;
  --border2: #323240;
  --text: #e8e8f0;
  --text2: #8888a0;
  --text3: #55556a;
  --accent: #7c6fff;
  --accent2: #a78bfa;
  --green: #22d3a0;
  --red: #ff6b6b;
  --yellow: #fbbf24;
  --blue: #60a5fa;
  --pink: #f472b6;
}

html { scroll-behavior: smooth; }

body {
  font-family: 'Syne', sans-serif;
  background: var(--bg);
  color: var(--text);
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

#root { min-height: 100vh; display: flex; flex-direction: column; }

/* Scrollbar */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: var(--bg2); }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }

/* Layout */
.layout { display: flex; flex: 1; }
.sidebar {
  width: 240px; flex-shrink: 0; border-right: 1px solid var(--border);
  background: var(--bg2); position: sticky; top: 0; height: 100vh;
  overflow-y: auto; display: flex; flex-direction: column;
}
.main { flex: 1; overflow: hidden; }

/* Nav */
.topnav {
  height: 56px; border-bottom: 1px solid var(--border);
  display: flex; align-items: center; padding: 0 24px; gap: 16px;
  background: var(--bg); position: sticky; top: 0; z-index: 50;
  backdrop-filter: blur(12px);
}
.logo { font-size: 18px; font-weight: 800; color: var(--text); display: flex; align-items: center; gap: 8px; text-decoration: none; }
.logo-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
.nav-links { display: flex; gap: 4px; margin-left: auto; }
.nav-link { padding: 6px 14px; border-radius: 8px; font-size: 13px; font-weight: 500; color: var(--text2); background: none; border: none; cursor: pointer; font-family: 'Syne', sans-serif; transition: all .15s; }
.nav-link:hover { color: var(--text); background: var(--bg3); }
.nav-link.active { color: var(--text); background: var(--bg3); }
.github-btn {
  display: flex; align-items: center; gap: 6px; padding: 6px 14px;
  border-radius: 8px; font-size: 12px; font-weight: 600; color: var(--text);
  background: var(--bg3); border: 1px solid var(--border2); cursor: pointer;
  font-family: 'Syne', sans-serif; transition: all .15s; text-decoration: none;
}
.github-btn:hover { border-color: var(--accent); color: var(--accent2); }

/* Sidebar */
.sidebar-header { padding: 20px 16px 12px; border-bottom: 1px solid var(--border); }
.sidebar-search {
  display: flex; align-items: center; gap: 8px; background: var(--bg3);
  border: 1px solid var(--border); border-radius: 10px; padding: 8px 12px;
  font-size: 12px; color: var(--text2);
}
.sidebar-search input { background: none; border: none; outline: none; font-family: 'Syne', sans-serif; font-size: 12.5px; color: var(--text); flex: 1; }
.sidebar-search input::placeholder { color: var(--text3); }
.sidebar-nav { padding: 12px 8px; flex: 1; }
.sidebar-section { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--text3); padding: 8px 8px 4px; }
.nav-item {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; padding: 7px 10px; border-radius: 8px; border: none;
  background: none; cursor: pointer; font-family: 'Syne', sans-serif;
  font-size: 13px; font-weight: 500; color: var(--text2); transition: all .13s;
  text-align: left;
}
.nav-item:hover { color: var(--text); background: var(--bg3); }
.nav-item.active { color: var(--accent2); background: rgba(124,111,255,.1); }
.nav-badge { font-size: 10px; font-weight: 700; padding: 1px 7px; border-radius: 100px; background: var(--bg3); color: var(--text3); border: 1px solid var(--border); }
.nav-item.active .nav-badge { background: rgba(124,111,255,.15); color: var(--accent2); border-color: rgba(124,111,255,.3); }

/* Content */
.content { padding: 40px 48px 60px; max-width: 1100px; }
.page-header { margin-bottom: 36px; }
.page-title { font-size: 32px; font-weight: 800; color: var(--text); letter-spacing: -.5px; margin-bottom: 8px; }
.page-sub { font-size: 14.5px; color: var(--text2); line-height: 1.6; }

/* Component Grid */
.comp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 48px; }
@media (max-width: 900px) { .comp-grid { grid-template-columns: 1fr; } .content { padding: 24px 20px 40px; } .sidebar { display: none; } }

.comp-card {
  border: 1px solid var(--border); border-radius: 14px; overflow: hidden;
  background: var(--bg2); cursor: pointer; transition: all .2s;
  display: flex; flex-direction: column;
}
.comp-card:hover { border-color: var(--border2); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,.4); }
.comp-card.active { border-color: var(--accent); box-shadow: 0 0 0 1px rgba(124,111,255,.3); }

.comp-preview {
  background: var(--bg3); border-bottom: 1px solid var(--border);
  padding: 28px 24px; min-height: 160px; display: flex; align-items: center;
  justify-content: center; position: relative; overflow: hidden;
}
.comp-preview::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, rgba(124,111,255,.06) 0%, transparent 70%);
  pointer-events: none;
}
.comp-footer { padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
.comp-name { font-size: 13.5px; font-weight: 700; color: var(--text); }
.comp-count { font-size: 11px; color: var(--text3); font-weight: 500; }

/* Demo section */
.demo-header { margin-bottom: 24px; }
.demo-title { font-size: 22px; font-weight: 800; color: var(--text); margin-bottom:6px; }
.demo-desc { font-size: 13.5px; color: var(--text2); }

.demo-tabs { display: flex; gap: 0; border-bottom: 1px solid var(--border); margin-bottom: 24px; }
.demo-tab { padding: 9px 18px; background: none; border: none; border-bottom: 2px solid transparent; margin-bottom: -1px; font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 600; color: var(--text3); cursor: pointer; transition: all .13s; }
.demo-tab:hover { color: var(--text2); }
.demo-tab.active { color: var(--accent2); border-bottom-color: var(--accent); }

.demo-preview {
  border: 1px solid var(--border); border-radius: 12px; background: var(--bg3);
  padding: 32px 28px; margin-bottom: 16px; min-height: 120px;
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap; gap: 12px;
  position: relative; overflow: hidden;
}
.demo-preview::after {
  content: ''; position: absolute; inset: 0; pointer-events: none;
  background: radial-gradient(ellipse 60% 40% at 50% 0%, rgba(124,111,255,.05) 0%, transparent 100%);
}

.demo-code-box {
  border: 1px solid var(--border); border-radius: 12px; background: #0d0d10;
  overflow: hidden; font-family: 'Geist Mono', monospace; font-size: 12.5px;
}
.code-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid var(--border); background: var(--bg2); }
.code-lang { font-size: 11px; font-weight: 600; color: var(--text3); text-transform: uppercase; letter-spacing: .8px; }
.copy-btn { padding: 4px 12px; border-radius: 6px; border: 1px solid var(--border); background: var(--bg3); font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 600; color: var(--text2); cursor: pointer; transition: all .13s; }
.copy-btn:hover { color: var(--text); border-color: var(--accent); }
.copy-btn.copied { color: var(--green); border-color: var(--green); }
.code-body { padding: 18px 20px; overflow-x: auto; line-height: 1.7; color: #abb2bf; }
pre { margin: 0; white-space: pre; }

/* Variants strip */
.variants { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
.variant-btn { padding: 5px 14px; border-radius: 7px; border: 1px solid var(--border); background: var(--bg3); font-family: 'Syne', sans-serif; font-size: 12px; font-weight: 500; color: var(--text2); cursor: pointer; transition: all .13s; }
.variant-btn:hover { color: var(--text); border-color: var(--border2); }
.variant-btn.active { background: rgba(124,111,255,.12); color: var(--accent2); border-color: rgba(124,111,255,.4); }

/* Footer */
.site-footer {
  border-top: 1px solid var(--border); background: var(--bg2);
  padding: 40px 48px 28px; margin-top: auto;
}
.footer-inner { max-width: 1100px; margin: 0 auto; }
.footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 36px; }
@media (max-width: 768px) { .footer-top { grid-template-columns: 1fr 1fr; gap: 24px; } .site-footer { padding: 28px 20px; } }
.footer-brand { }
.footer-brand .logo { margin-bottom: 10px; display: inline-flex; }
.footer-tagline { font-size: 13px; color: var(--text2); line-height: 1.6; max-width: 220px; }
.footer-col-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .8px; color: var(--text3); margin-bottom: 14px; }
.footer-links { display: flex; flex-direction: column; gap: 8px; }
.footer-link { font-size: 13px; color: var(--text2); text-decoration: none; transition: color .13s; cursor: pointer; background: none; border: none; font-family: 'Syne', sans-serif; text-align: left; }
.footer-link:hover { color: var(--accent2); }
.footer-bottom { display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border); padding-top: 20px; flex-wrap: wrap; gap: 12px; }
.footer-copy { font-size: 12px; color: var(--text3); }
.footer-socials { display: flex; gap: 8px; }
.social-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); background: var(--bg3); display: flex; align-items: center; justify-content: center; font-size: 14px; cursor: pointer; transition: all .13s; color: var(--text2); }
.social-btn:hover { border-color: var(--accent); color: var(--accent2); }

/* ── COMPONENT PREVIEWS ── */

/* Buttons */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; font-family: 'Syne', sans-serif; font-weight: 600; cursor: pointer; border-radius: 10px; transition: all .18s; border: none; font-size: 13.5px; }
.btn-primary { background: var(--accent); color: #fff; padding: 9px 20px; }
.btn-primary:hover { background: #6b5ef7; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(124,111,255,.35); }
.btn-secondary { background: var(--bg3); color: var(--text); padding: 9px 20px; border: 1px solid var(--border2); }
.btn-secondary:hover { border-color: var(--accent); color: var(--accent2); }
.btn-outline { background: transparent; color: var(--accent2); padding: 9px 20px; border: 1.5px solid var(--accent); }
.btn-outline:hover { background: rgba(124,111,255,.1); }
.btn-ghost { background: transparent; color: var(--text2); padding: 9px 20px; }
.btn-ghost:hover { background: var(--bg3); color: var(--text); }
.btn-danger { background: var(--red); color: #fff; padding: 9px 20px; }
.btn-danger:hover { background: #e85555; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(255,107,107,.3); }
.btn-sm { padding: 6px 14px; font-size: 12px; border-radius: 7px; }
.btn-lg { padding: 12px 28px; font-size: 15px; border-radius: 12px; }
.btn-icon { padding: 9px; border-radius: 10px; }
.btn-loading { opacity: .7; cursor: not-allowed; pointer-events: none; }
.spinner { width: 14px; height: 14px; border: 2px solid rgba(255,255,255,.25); border-top-color: #fff; border-radius: 50%; animation: spin .6s linear infinite; flex-shrink: 0; }
.btn-success { background: var(--green); color: #0a2e24; padding: 9px 20px; }
.btn-success:hover { background: #1fc090; }

/* Avatar */
.avatar { border-radius: 50%; background: var(--bg3); border: 2px solid var(--border2); display: flex; align-items: center; justify-content: center; font-weight: 700; font-family: 'Syne', sans-serif; color: var(--text); overflow: hidden; flex-shrink: 0; position: relative; }
.avatar-xs { width: 24px; height: 24px; font-size: 9px; }
.avatar-sm { width: 32px; height: 32px; font-size: 11px; }
.avatar-md { width: 40px; height: 40px; font-size: 14px; }
.avatar-lg { width: 52px; height: 52px; font-size: 18px; }
.avatar-xl { width: 68px; height: 68px; font-size: 24px; }
.avatar-group { display: flex; }
.avatar-group .avatar { margin-left: -10px; border: 2px solid var(--bg3); }
.avatar-group .avatar:first-child { margin-left: 0; }
.status-dot { position: absolute; bottom: 1px; right: 1px; width: 9px; height: 9px; border-radius: 50%; border: 2px solid var(--bg3); }
.status-online { background: var(--green); }
.status-away { background: var(--yellow); }
.status-offline { background: var(--text3); }

/* Cards */
.card { background: var(--bg2); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; transition: all .2s; }
.card:hover { border-color: var(--border2); box-shadow: 0 12px 40px rgba(0,0,0,.3); transform: translateY(-2px); }
.card-img { width: 100%; height: 120px; background: linear-gradient(135deg, var(--accent) 0%, #1a1a3e 100%); display: flex; align-items: center; justify-content: center; font-size: 32px; }
.card-body { padding: 16px; }
.card-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 5px; }
.card-text { font-size: 12.5px; color: var(--text2); line-height: 1.6; }
.card-footer { padding: 12px 16px; border-top: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
.card-stat { font-size: 11.5px; color: var(--text3); }
.card-stat span { color: var(--accent2); font-weight: 600; }

/* Badges */
.badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 100px; font-family: 'Syne', sans-serif; }
.badge-default { background: var(--bg3); color: var(--text2); border: 1px solid var(--border2); }
.badge-success { background: rgba(34,211,160,.12); color: var(--green); border: 1px solid rgba(34,211,160,.25); }
.badge-warning { background: rgba(251,191,36,.1); color: var(--yellow); border: 1px solid rgba(251,191,36,.25); }
.badge-error { background: rgba(255,107,107,.1); color: var(--red); border: 1px solid rgba(255,107,107,.25); }
.badge-info { background: rgba(96,165,250,.1); color: var(--blue); border: 1px solid rgba(96,165,250,.25); }
.badge-purple { background: rgba(124,111,255,.12); color: var(--accent2); border: 1px solid rgba(124,111,255,.3); }
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

/* Modal */
.modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,.75); backdrop-filter: blur(6px); z-index: 100; display: flex; align-items: center; justify-content: center; padding: 20px; animation: fadeIn .15s ease; }
.modal-box { background: var(--bg2); border: 1px solid var(--border2); border-radius: 16px; width: 420px; max-width: 100%; box-shadow: 0 32px 80px rgba(0,0,0,.6); animation: slideUp .2s ease; overflow: hidden; }
.modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 20px 22px 16px; }
.modal-title { font-size: 16px; font-weight: 800; color: var(--text); }
.modal-sub { font-size: 12.5px; color: var(--text2); margin-top: 3px; }
.modal-close { width: 28px; height: 28px; border-radius: 7px; border: 1px solid var(--border); background: var(--bg3); color: var(--text2); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all .13s; line-height: 1; font-family: 'Syne', sans-serif; }
.modal-close:hover { color: var(--text); border-color: var(--border2); }
.modal-body { padding: 0 22px 18px; font-size: 13.5px; color: var(--text2); line-height: 1.6; }
.modal-footer { padding: 14px 22px; border-top: 1px solid var(--border); display: flex; gap: 8px; justify-content: flex-end; }

/* Tabs */
.tabs-box { background: var(--bg3); border: 1px solid var(--border); border-radius: 12px; overflow: hidden; width: 100%; }
.tabs-list { display: flex; border-bottom: 1px solid var(--border); background: var(--bg2); padding: 0 4px; }
.tab-btn { flex: 1; padding: 10px 14px; background: none; border: none; border-bottom: 2px solid transparent; margin-bottom: -1px; font-family: 'Syne', sans-serif; font-size: 12.5px; font-weight: 600; color: var(--text3); cursor: pointer; transition: all .13s; }
.tab-btn:hover { color: var(--text2); }
.tab-btn.active { color: var(--accent2); border-bottom-color: var(--accent); }
.tab-content { padding: 18px 16px; font-size: 13px; color: var(--text2); line-height: 1.6; }
.tabs-pill { display: flex; gap: 4px; background: var(--bg2); padding: 4px; border-radius: 12px; border: 1px solid var(--border); display: inline-flex; }
.tab-pill-btn { padding: 6px 16px; border-radius: 8px; border: none; font-family: 'Syne', sans-serif; font-size: 12.5px; font-weight: 600; color: var(--text3); cursor: pointer; transition: all .15s; background: none; }
.tab-pill-btn:hover { color: var(--text2); background: var(--bg3); }
.tab-pill-btn.active { background: var(--accent); color: #fff; }

/* Nav variants */
.nav-demo { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; display: flex; align-items: center; padding: 0 16px; height: 52px; gap: 4px; width: 100%; }
.nav-logo { font-size: 15px; font-weight: 800; color: var(--text); margin-right: 16px; }
.nav-demo-link { padding: 6px 12px; border-radius: 7px; font-size: 12.5px; font-weight: 500; color: var(--text2); background: none; border: none; cursor: pointer; font-family: 'Syne', sans-serif; transition: all .13s; }
.nav-demo-link:hover { color: var(--text); background: var(--bg3); }
.nav-demo-link.active { color: var(--text); background: var(--bg3); }
.nav-spacer { flex: 1; }

/* Loading */
.spinner-lg { width: 36px; height: 36px; border: 3px solid rgba(124,111,255,.2); border-top-color: var(--accent); border-radius: 50%; animation: spin .8s linear infinite; }
.spinner-dots { display: flex; gap: 5px; }
.spinner-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); animation: bounce .7s ease-in-out infinite; }
.spinner-dot:nth-child(2) { animation-delay: .15s; }
.spinner-dot:nth-child(3) { animation-delay: .3s; }
.progress-bar { height: 5px; background: var(--bg3); border-radius: 100px; overflow: hidden; width: 160px; }
.progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); border-radius: 100px; animation: progress 2s ease-in-out infinite; }
.skeleton-line { height: 12px; background: linear-gradient(90deg, var(--bg3) 25%, var(--border2) 50%, var(--bg3) 75%); background-size: 200% 100%; border-radius: 6px; animation: shimmer 1.5s infinite; }
.skeleton-circle { border-radius: 50%; background: linear-gradient(90deg, var(--bg3) 25%, var(--border2) 50%, var(--bg3) 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }

/* Hero */
.hero-demo { text-align: center; width: 100%; padding: 16px 0; }
.hero-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--accent2); background: rgba(124,111,255,.1); border: 1px solid rgba(124,111,255,.25); padding: 4px 12px; border-radius: 100px; margin-bottom: 14px; }
.hero-h { font-size: 28px; font-weight: 800; color: var(--text); letter-spacing: -.5px; line-height: 1.2; margin-bottom: 10px; }
.hero-p { font-size: 13.5px; color: var(--text2); max-width: 380px; margin: 0 auto 18px; line-height: 1.6; }
.hero-btns { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }

/* Features */
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; width: 100%; }
@media (max-width: 700px) { .features-grid { grid-template-columns: 1fr; } }
.feature-item { background: var(--bg2); border: 1px solid var(--border); border-radius: 12px; padding: 16px; transition: all .2s; }
.feature-item:hover { border-color: var(--border2); transform: translateY(-2px); }
.feature-icon { width: 36px; height: 36px; border-radius: 9px; background: rgba(124,111,255,.12); border: 1px solid rgba(124,111,255,.2); display: flex; align-items: center; justify-content: center; font-size: 17px; margin-bottom: 10px; }
.feature-title { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 5px; }
.feature-desc { font-size: 11.5px; color: var(--text3); line-height: 1.5; }

/* Input */
.input-group { display: flex; flex-direction: column; gap: 4px; width: 100%; }
.input-label { font-size: 12px; font-weight: 600; color: var(--text2); }
.input-field {
  background: var(--bg3); border: 1px solid var(--border); border-radius: 9px;
  padding: 9px 13px; font-family: 'Syne', sans-serif; font-size: 13px;
  color: var(--text); outline: none; transition: all .15s; width: 100%;
}
.input-field::placeholder { color: var(--text3); }
.input-field:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(124,111,255,.12); }
.input-field.error { border-color: var(--red); }
.input-error { font-size: 11.5px; color: var(--red); }
.input-hint { font-size: 11.5px; color: var(--text3); }
.input-wrap { position: relative; }
.input-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: var(--text3); font-size: 14px; pointer-events: none; }
.input-with-icon { padding-left: 34px; }

@keyframes spin { to { transform: rotate(360deg); } }
@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
@keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
@keyframes progress { 0%{width:0%} 60%{width:85%} 100%{width:100%} }
@keyframes fadeIn { from{opacity:0} to{opacity:1} }
@keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.5} }
`;

/* ────────────────────────────────────────────────────────────
   NAV STRUCTURE
──────────────────────────────────────────────────────────── */
const NAV = [
  { id: "overview", label: "Overview", count: null, section: "Start" },
  { id: "hero", label: "Hero", count: 5, section: "Components" },
  { id: "avatar", label: "Avatar", count: 4, section: "Components" },
  { id: "button", label: "Button", count: 8, section: "Components" },
  { id: "card", label: "Card", count: 6, section: "Components" },
  { id: "features", label: "Features", count: 4, section: "Components" },
  { id: "loading", label: "Loading", count: 4, section: "Components" },
  { id: "modal", label: "Modal", count: 4, section: "Components" },
  { id: "nav", label: "Nav", count: 5, section: "Components" },
  { id: "tab", label: "Tab", count: 5, section: "Components" },
  { id: "footer", label: "Footer", count: 3, section: "Components" },
  { id: "badge", label: "Badge", count: 6, section: "Components" },
  { id: "input", label: "Input", count: 5, section: "Components" },
];

/* ────────────────────────────────────────────────────────────
   SYNTAX HIGHLIGHTER
──────────────────────────────────────────────────────────── */
function Highlight({ code }) {
  const escaped = code.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const html = escaped
    .replace(/\b(import|export|from|default|const|let|var|function|return|if|else|async|await|true|false|null|undefined|class|new|for|of)\b/g, '<span style="color:#c678dd">$1</span>')
    .replace(/(\/\/[^\n]*)/g, '<span style="color:#5c6370;font-style:italic">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g, '<span style="color:#98c379">$1</span>')
    .replace(/\b(\d+)\b/g, '<span style="color:#d19a66">$1</span>');
  return <code dangerouslySetInnerHTML={{ __html: html }} style={{ fontFamily:"'Geist Mono',monospace", fontSize:12.5, lineHeight:1.75 }}/>;
}

/* ────────────────────────────────────────────────────────────
   CODE BLOCK COMPONENT
──────────────────────────────────────────────────────────── */
function CodeBlock({ code, lang = "jsx" }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try { navigator.clipboard.writeText(code); } catch(e){}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="demo-code-box">
      <div className="code-header">
        <span className="code-lang">{lang}</span>
        <button className={`copy-btn${copied?" copied":""}`} onClick={copy}>{copied ? "✓ Copied" : "Copy"}</button>
      </div>
      <div className="code-body">
        <pre><Highlight code={code}/></pre>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   COMPONENT DEFINITIONS
──────────────────────────────────────────────────────────── */

// ── HERO ──────────────────────────────────────────
function HeroDemo({ variant = 1 }) {
  if (variant === 2) return (
    <div style={{ width:"100%", display:"flex", alignItems:"center", gap:24, padding:"8px 0" }}>
      <div style={{ flex:1 }}>
        <div className="badge badge-purple" style={{ marginBottom:10 }}>🎉 New components</div>
        <h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", marginBottom:8, letterSpacing:"-.3px" }}>Build UIs faster<br/>than ever before</h2>
        <p style={{ fontSize:13, color:"var(--text2)", lineHeight:1.6, marginBottom:14 }}>Production-ready components with dark-mode support out of the box.</p>
        <div className="hero-btns" style={{ justifyContent:"flex-start" }}>
          <button className="btn btn-primary">Get started</button>
          <button className="btn btn-secondary">View docs</button>
        </div>
      </div>
      <div style={{ width:100, height:100, borderRadius:16, background:"linear-gradient(135deg,rgba(124,111,255,.3),rgba(167,139,250,.1))", border:"1px solid rgba(124,111,255,.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:36, flexShrink:0 }}>⬡</div>
    </div>
  );
  if (variant === 3) return (
    <div className="hero-demo" style={{ padding:"8px 0" }}>
      <div style={{ display:"flex", gap:6, justifyContent:"center", marginBottom:12, flexWrap:"wrap" }}>
        {["React","Vue","TypeScript"].map(t => <span key={t} className="badge badge-default">{t}</span>)}
      </div>
      <h2 className="hero-h" style={{ fontSize:22 }}>The component library<br/>you've been waiting for</h2>
      <p className="hero-p" style={{ fontSize:13 }}>Copy, paste, ship. No dependencies, no configuration.</p>
      <div className="hero-btns">
        <button className="btn btn-primary btn-sm">Browse components</button>
        <button className="btn btn-ghost btn-sm">View on GitHub ↗</button>
      </div>
    </div>
  );
  return (
    <div className="hero-demo">
      <div className="hero-eyebrow"><span className="badge-dot" style={{ width:6,height:6 }}/>v3.0 is here</div>
      <h2 className="hero-h">Design. Build. Ship.</h2>
      <p className="hero-p">Copy-paste components for your next project. Dark mode by default.</p>
      <div className="hero-btns">
        <button className="btn btn-primary">Get started →</button>
        <button className="btn btn-secondary">See examples</button>
      </div>
    </div>
  );
}

const HERO_CODE = `// Hero — Centered variant
export function Hero() {
  return (
    <section className="hero">
      <div className="eyebrow">v3.0 is here</div>
      <h1>Design. Build. Ship.</h1>
      <p>Copy-paste components for your next project.</p>
      <div className="hero-actions">
        <Button variant="primary">Get started →</Button>
        <Button variant="secondary">See examples</Button>
      </div>
    </section>
  );
}`;

// ── AVATAR ──────────────────────────────────────────
const AVATARS = [
  { initials:"AK", color:"#7c6fff" },
  { initials:"JS", color:"#22d3a0" },
  { initials:"MR", color:"#f472b6" },
  { initials:"TL", color:"#fbbf24" },
  { initials:"DK", color:"#60a5fa" },
];
function AvatarDemo({ variant = 1 }) {
  if (variant === 2) return (
    <div style={{ display:"flex", gap:14, alignItems:"center" }}>
      {["xs","sm","md","lg","xl"].map((s,i) => (
        <div key={s} className={`avatar avatar-${s}`} style={{ background: AVATARS[i].color + "22", borderColor: AVATARS[i].color + "55", color: AVATARS[i].color }}>
          {AVATARS[i].initials}
        </div>
      ))}
    </div>
  );
  if (variant === 3) return (
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      {AVATARS.slice(0,4).map((a,i) => (
        <div key={i} className="avatar avatar-md" style={{ background: a.color+"22", borderColor: a.color+"55", color: a.color, position:"relative" }}>
          {a.initials}
          <div className={`status-dot ${["status-online","status-away","status-online","status-offline"][i]}`}/>
        </div>
      ))}
      <div style={{ marginLeft:4, fontSize:12, color:"var(--text2)" }}>4 members</div>
    </div>
  );
  return (
    <div style={{ display:"flex", alignItems:"center" }}>
      <div className="avatar-group">
        {AVATARS.slice(0,5).map((a,i) => (
          <div key={i} className="avatar avatar-md" style={{ background: a.color+"22", borderColor: a.color+"55", color: a.color }}>
            {a.initials}
          </div>
        ))}
        <div className="avatar avatar-md" style={{ background:"var(--bg3)", color:"var(--text2)" }}>+9</div>
      </div>
    </div>
  );
}

const AVATAR_CODE = `import { Avatar, AvatarGroup } from "@devui/react";

// Single avatar with status
<Avatar size="md" initials="AK" color="purple" status="online" />

// Avatar group
<AvatarGroup max={5}>
  <Avatar initials="AK" />
  <Avatar initials="JS" />
  <Avatar initials="MR" />
</AvatarGroup>`;

// ── BUTTONS ──────────────────────────────────────────
function ButtonDemo({ variant = 1 }) {
  const [loading, setLoading] = useState(false);
  if (variant === 2) return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
      {["sm","md","lg"].map(s => (
        <button key={s} className={`btn btn-primary btn-${s}`}>{s.toUpperCase()}</button>
      ))}
      <button className="btn btn-primary btn-icon">⬡</button>
    </div>
  );
  if (variant === 3) return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <button className="btn btn-primary" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}>
        {loading ? <><div className="spinner"/><span>Loading…</span></> : "Click me"}
      </button>
      <button className="btn btn-success">✓ Done</button>
      <button className="btn btn-danger">Delete</button>
      <button className="btn btn-outline" style={{ opacity:.5, cursor:"not-allowed" }} disabled>Disabled</button>
    </div>
  );
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
      {[["btn-primary","Primary"],["btn-secondary","Secondary"],["btn-outline","Outline"],["btn-ghost","Ghost"],["btn-danger","Danger"]].map(([c,l]) => (
        <button key={c} className={`btn ${c}`}>{l}</button>
      ))}
    </div>
  );
}

const BUTTON_CODE = `import { Button } from "@devui/react";

// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// With loading state
<Button variant="primary" loading={saving} onClick={save}>
  Save Changes
</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`;

// ── CARD ──────────────────────────────────────────
function CardDemo({ variant = 1 }) {
  if (variant === 2) return (
    <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
      {[["📊","Analytics","48,291 events this month","#7c6fff"],["💰","Revenue","$12,840 earned","#22d3a0"],["🐛","Issues","3 open bugs","#ff6b6b"]].map(([icon,title,desc,color]) => (
        <div key={title} className="card" style={{ width:150 }}>
          <div style={{ padding:"14px 14px 0" }}>
            <div style={{ width:32,height:32,borderRadius:8,background:color+"22",border:`1px solid ${color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,marginBottom:10 }}>{icon}</div>
            <div className="card-title" style={{ fontSize:12 }}>{title}</div>
            <div className="card-text" style={{ fontSize:11 }}>{desc}</div>
          </div>
          <div className="card-footer">
            <span className="card-stat" style={{ color }}>{icon}</span>
            <span className="card-stat">→</span>
          </div>
        </div>
      ))}
    </div>
  );
  if (variant === 3) return (
    <div className="card" style={{ width:220 }}>
      <div className="card-img">🎨</div>
      <div className="card-body">
        <div className="card-title">Design System</div>
        <div className="card-text">A complete component library for modern apps.</div>
      </div>
      <div className="card-footer">
        <span className="card-stat"><span>48</span> components</span>
        <span className="badge badge-success">v3.0</span>
      </div>
    </div>
  );
  return (
    <div style={{ display:"flex", gap:12 }}>
      {[
        { img:"🚀", title:"Launch Kit", text:"Everything you need to ship fast.", color:"#7c6fff" },
        { img:"⚡", title:"Pro Plan", text:"Unlock all components.", color:"#fbbf24" },
      ].map(c => (
        <div key={c.title} className="card" style={{ width:180 }}>
          <div className="card-img" style={{ background:`linear-gradient(135deg,${c.color}44 0%, var(--bg) 100%)`, height:80, fontSize:24 }}>{c.img}</div>
          <div className="card-body">
            <div className="card-title" style={{ fontSize:13 }}>{c.title}</div>
            <div className="card-text" style={{ fontSize:11.5 }}>{c.text}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

const CARD_CODE = `import { Card } from "@devui/react";

<Card>
  <Card.Image src="/thumb.png" alt="Design System" />
  <Card.Body>
    <Card.Title>Design System</Card.Title>
    <Card.Text>A complete component library for modern apps.</Card.Text>
  </Card.Body>
  <Card.Footer>
    <span>48 components</span>
    <Badge variant="success">v3.0</Badge>
  </Card.Footer>
</Card>`;

// ── FEATURES ──────────────────────────────────────────
function FeaturesDemo({ variant = 1 }) {
  const items = [
    { icon:"⚡", t:"Fast", d:"Optimized for performance" },
    { icon:"🔒", t:"Secure", d:"Built with security in mind" },
    { icon:"♿", t:"Accessible", d:"WCAG 2.1 AA compliant" },
    { icon:"🌙", t:"Dark Mode", d:"Dark by default" },
    { icon:"📦", t:"Modular", d:"Import only what you need" },
    { icon:"🎨", t:"Themeable", d:"CSS variables throughout" },
  ];
  if (variant === 2) return (
    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
      {items.slice(0,3).map(f => (
        <div key={f.t} className="feature-item" style={{ flex:"1 1 120px" }}>
          <div className="feature-icon">{f.icon}</div>
          <div className="feature-title">{f.t}</div>
          <div className="feature-desc">{f.d}</div>
        </div>
      ))}
    </div>
  );
  return (
    <div className="features-grid" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
      {items.slice(0,3).map(f => (
        <div key={f.t} className="feature-item">
          <div className="feature-icon">{f.icon}</div>
          <div className="feature-title">{f.t}</div>
          <div className="feature-desc">{f.d}</div>
        </div>
      ))}
    </div>
  );
}

const FEATURES_CODE = `import { Features } from "@devui/react";

const items = [
  { icon: "⚡", title: "Fast", desc: "Optimized for performance" },
  { icon: "🔒", title: "Secure", desc: "Built with security in mind" },
  { icon: "♿", title: "Accessible", desc: "WCAG 2.1 AA compliant" },
];

<Features items={items} columns={3} />`;

// ── LOADING ──────────────────────────────────────────
function LoadingDemo({ variant = 1 }) {
  const [prog, setProg] = useState(42);
  useEffect(() => {
    const t = setInterval(() => setProg(p => p >= 100 ? 8 : p + 1), 60);
    return () => clearInterval(t);
  }, []);
  if (variant === 2) return (
    <div style={{ display:"flex", gap:24, alignItems:"center", flexWrap:"wrap" }}>
      <div className="spinner-dots">
        {[0,1,2].map(i => <div key={i} className="spinner-dot" style={{ animationDelay:`${i*.15}s` }}/>)}
      </div>
      <div style={{ width:160 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
          <span style={{ fontSize:11, color:"var(--text2)" }}>Uploading…</span>
          <span style={{ fontSize:11, color:"var(--accent2)", fontWeight:700 }}>{prog}%</span>
        </div>
        <div className="progress-bar">
          <div style={{ height:"100%", width:`${prog}%`, background:"linear-gradient(90deg,var(--accent),var(--accent2))", borderRadius:100, transition:"width .08s" }}/>
        </div>
      </div>
    </div>
  );
  if (variant === 3) return (
    <div style={{ display:"flex", gap:16, alignItems:"center" }}>
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        {["var(--accent)","var(--green)","var(--red)"].map((c,i) => (
          <div key={i} style={{ width:20,height:20,borderRadius:"50%",border:`2.5px solid`,borderColor:`${c} transparent transparent transparent`,animation:`spin .7s linear infinite`,animationDelay:`${i*.15}s`,color:c }}/>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
        {[100,72,48].map((w,i) => (
          <div key={i} className="skeleton-line" style={{ width:w }}/>
        ))}
      </div>
    </div>
  );
  return (
    <div style={{ display:"flex", gap:28, alignItems:"center", flexWrap:"wrap" }}>
      <div className="spinner-lg"/>
      <div style={{ display:"flex", gap:7, alignItems:"center" }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width:9,height:9,borderRadius:"50%",background:"var(--accent)",animation:`pulse 1.2s ease infinite`,animationDelay:`${i*.2}s`}}/>
        ))}
      </div>
      <div style={{ display:"flex", gap:7, alignItems:"flex-end", height:28 }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{ width:5,background:`var(--accent)`,borderRadius:3,animation:`bounce .8s ease infinite`,animationDelay:`${i*.12}s`, height:14+i*4 }}/>
        ))}
      </div>
    </div>
  );
}

const LOADING_CODE = `import { Spinner, Progress, Skeleton } from "@devui/react";

// Spinner
<Spinner size="lg" color="purple" />

// Progress bar
<Progress value={72} color="purple" size="sm" />

// Skeleton loader
<Skeleton.Line width={200} />
<Skeleton.Circle size={40} />`;

// ── MODAL ──────────────────────────────────────────
function ModalDemo({ variant = 1 }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("default");
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <button className="btn btn-primary" onClick={() => { setType("default"); setOpen(true); }}>Open Modal</button>
      <button className="btn btn-secondary" onClick={() => { setType("confirm"); setOpen(true); }}>Confirm Dialog</button>
      <button className="btn btn-danger" onClick={() => { setType("danger"); setOpen(true); }}>Delete Dialog</button>
      {open && (
        <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <div className="modal-title">
                  {type==="danger" ? "⚠️ Delete Project" : type==="confirm" ? "✅ Confirm Action" : "📋 Modal Title"}
                </div>
                <div className="modal-sub">
                  {type==="danger" ? "This cannot be undone" : type==="confirm" ? "Please review before continuing" : "Subtitle or description"}
                </div>
              </div>
              <button className="modal-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              {type==="danger"
                ? "Deleting this project will permanently remove all files, data, and associated resources. This action is irreversible."
                : type==="confirm"
                ? "You're about to perform an important action. Make sure you've reviewed all the details before proceeding."
                : "This is a modal component. It supports multiple sizes, custom content, and accessible focus trapping."}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Cancel</button>
              <button className={`btn btn-sm ${type==="danger"?"btn-danger":"btn-primary"}`} onClick={() => setOpen(false)}>
                {type==="danger" ? "Yes, delete" : type==="confirm" ? "Confirm" : "Got it"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const MODAL_CODE = `import { Modal, useModal } from "@devui/react";

function Example() {
  const { open, onOpen, onClose } = useModal();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal open={open} onClose={onClose} title="Modal Title">
        <Modal.Body>
          Your modal content goes here.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={onClose}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}`;

// ── NAV ──────────────────────────────────────────
function NavDemo({ variant = 1 }) {
  const [active, setActive] = useState("Home");
  const links = ["Home","Products","Docs","Blog"];
  if (variant === 2) return (
    <div className="nav-demo" style={{ borderRadius:100 }}>
      <span className="nav-logo">⬡ Kit</span>
      {links.map(l => (
        <button key={l} onClick={() => setActive(l)} className={`nav-demo-link${active===l?" active":""}`}>{l}</button>
      ))}
      <div className="nav-spacer"/>
      <button className="btn btn-primary btn-sm">Sign up</button>
    </div>
  );
  if (variant === 3) return (
    <div style={{ display:"flex", flexDirection:"column", gap:0, background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:12, overflow:"hidden", width:"100%" }}>
      <div style={{ padding:"12px 16px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:8 }}>
        <span className="nav-logo" style={{ fontSize:14 }}>⬡ Dev</span>
        <div className="nav-spacer"/>
        <button className="btn btn-ghost btn-sm">Sign in</button>
        <button className="btn btn-primary btn-sm">Get started</button>
      </div>
      <div style={{ display:"flex", gap:2, padding:"4px 8px" }}>
        {links.map(l => (
          <button key={l} onClick={() => setActive(l)} className={`nav-demo-link${active===l?" active":""}`} style={{ fontSize:12 }}>{l}</button>
        ))}
      </div>
    </div>
  );
  return (
    <div className="nav-demo" style={{ width:"100%" }}>
      <span className="nav-logo">⬡ DevUI</span>
      {links.map(l => (
        <button key={l} onClick={() => setActive(l)} className={`nav-demo-link${active===l?" active":""}`}>{l}</button>
      ))}
      <div className="nav-spacer"/>
      <button className="github-btn" style={{ fontSize:11 }}>⭐ GitHub</button>
      <button className="btn btn-primary btn-sm">Get started</button>
    </div>
  );
}

const NAV_CODE = `import { Navbar } from "@devui/react";

<Navbar>
  <Navbar.Brand>⬡ DevUI</Navbar.Brand>
  <Navbar.Links>
    <Navbar.Link href="/">Home</Navbar.Link>
    <Navbar.Link href="/products">Products</Navbar.Link>
    <Navbar.Link href="/docs">Docs</Navbar.Link>
  </Navbar.Links>
  <Navbar.Actions>
    <Button variant="ghost">Sign in</Button>
    <Button variant="primary">Get started</Button>
  </Navbar.Actions>
</Navbar>`;

// ── TAB ──────────────────────────────────────────
function TabDemo({ variant = 1 }) {
  const [active, setActive] = useState(0);
  const [pill, setPill] = useState(0);
  const tabs = [
    { label:"Overview", content:"Get started with DevUI components. Zero configuration, full TypeScript support, and WCAG 2.1 AA accessibility built-in." },
    { label:"Components", content:"Browse 48+ production-ready components across 11 categories. From buttons to complex data tables." },
    { label:"Theming", content:"Customize every token using CSS variables. Switch between dark and light mode with a single line." },
    { label:"API", content:"Full TypeScript API with intelligent autocomplete. Every prop documented with examples." },
  ];
  if (variant === 2) return (
    <div style={{ width:"100%" }}>
      <div style={{ marginBottom:16, display:"flex", justifyContent:"center" }}>
        <div className="tabs-pill">
          {tabs.slice(0,3).map((t,i) => (
            <button key={i} onClick={() => setPill(i)} className={`tab-pill-btn${pill===i?" active":""}`}>{t.label}</button>
          ))}
        </div>
      </div>
      <div style={{ background:"var(--bg3)", border:"1px solid var(--border)", borderRadius:10, padding:"14px 16px", fontSize:13, color:"var(--text2)", lineHeight:1.6 }}>
        {tabs[pill].content}
      </div>
    </div>
  );
  if (variant === 3) return (
    <div className="tabs-box" style={{ width:"100%" }}>
      <div className="tabs-list" style={{ flexDirection:"column", border:"none", borderRight:"1px solid var(--border)", padding:"8px 4px", width:110, position:"absolute", height:"100%", background:"var(--bg2)" }}>
        {tabs.slice(0,3).map((t,i) => (
          <button key={i} onClick={() => setActive(i)} className={`tab-btn${active===i?" active":""}`} style={{ textAlign:"left", width:"100%", borderBottom:"none", borderRight:`2px solid ${active===i?"var(--accent)":"transparent"}` }}>{t.label}</button>
        ))}
      </div>
    </div>
  );
  return (
    <div className="tabs-box" style={{ width:"100%" }}>
      <div className="tabs-list">
        {tabs.slice(0,3).map((t,i) => (
          <button key={i} onClick={() => setActive(i)} className={`tab-btn${active===i?" active":""}`}>{t.label}</button>
        ))}
      </div>
      <div className="tab-content">{tabs[active].content}</div>
    </div>
  );
}

const TAB_CODE = `import { Tabs } from "@devui/react";

// Underline variant (default)
<Tabs defaultIndex={0} variant="underline">
  <Tabs.List>
    <Tabs.Tab>Overview</Tabs.Tab>
    <Tabs.Tab>Components</Tabs.Tab>
    <Tabs.Tab>Theming</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel>Overview content...</Tabs.Panel>
  <Tabs.Panel>Components content...</Tabs.Panel>
  <Tabs.Panel>Theming content...</Tabs.Panel>
</Tabs>

// Pill variant
<Tabs variant="pill">...</Tabs>`;

// ── FOOTER ──────────────────────────────────────────
function FooterDemo({ variant = 1 }) {
  if (variant === 2) return (
    <div style={{ background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:12, padding:"16px 20px", width:"100%" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div className="logo-dot"/>
          <span style={{ fontSize:14, fontWeight:700, color:"var(--text)" }}>DevUI</span>
        </div>
        <div style={{ display:"flex", gap:16 }}>
          {["Twitter","GitHub","Discord"].map(l => (
            <span key={l} style={{ fontSize:12.5, color:"var(--text2)", cursor:"pointer" }}>{l}</span>
          ))}
        </div>
        <span style={{ fontSize:11.5, color:"var(--text3)" }}>© 2025 DevUI</span>
      </div>
    </div>
  );
  return (
    <div style={{ background:"var(--bg2)", border:"1px solid var(--border)", borderRadius:12, padding:"20px", width:"100%" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:20, marginBottom:16 }}>
        <div>
          <div style={{ fontSize:14, fontWeight:800, color:"var(--text)", marginBottom:6, display:"flex", alignItems:"center", gap:6 }}>
            <div className="logo-dot"/>DevUI
          </div>
          <div style={{ fontSize:11.5, color:"var(--text2)", lineHeight:1.5 }}>Production-ready components for modern apps.</div>
        </div>
        {[["Resources",["Docs","Components","Templates"]],["Company",["About","Blog","GitHub"]]].map(([title,links]) => (
          <div key={title}>
            <div style={{ fontSize:10, fontWeight:700, textTransform:"uppercase", letterSpacing:.8, color:"var(--text3)", marginBottom:8 }}>{title}</div>
            {links.map(l => <div key={l} style={{ fontSize:12, color:"var(--text2)", marginBottom:5, cursor:"pointer" }}>{l}</div>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop:"1px solid var(--border)", paddingTop:12, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
        <span style={{ fontSize:11, color:"var(--text3)" }}>© 2025 DevUI. MIT License.</span>
        <div style={{ display:"flex", gap:6 }}>
          {["𝕏","⭐","💬"].map(i => (
            <div key={i} className="social-btn" style={{ width:26,height:26 }}>{i}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

const FOOTER_CODE = `import { Footer } from "@devui/react";

<Footer>
  <Footer.Brand>
    <Footer.Logo>DevUI</Footer.Logo>
    <Footer.Tagline>Production-ready components.</Footer.Tagline>
  </Footer.Brand>
  <Footer.Links title="Resources">
    <Footer.Link href="/docs">Docs</Footer.Link>
    <Footer.Link href="/components">Components</Footer.Link>
  </Footer.Links>
  <Footer.Bottom>
    <span>© 2025 DevUI. MIT License.</span>
  </Footer.Bottom>
</Footer>`;

// ── BADGE ──────────────────────────────────────────
function BadgeDemo({ variant = 1 }) {
  if (variant === 2) return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
      {[["badge-default","Default"],["badge-success","✓ Active"],["badge-warning","⚠ Pending"],["badge-error","✕ Error"],["badge-info","ℹ Info"],["badge-purple","✦ Beta"]].map(([c,l]) => (
        <span key={l} className={`badge ${c}`}>{l}</span>
      ))}
    </div>
  );
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
      {[["badge-success","<span class='badge-dot'></span>Online"],["badge-warning","<span class='badge-dot'></span>Away"],["badge-error","<span class='badge-dot'></span>Offline"]].map(([c,l],i) => (
        <span key={i} className={`badge ${c}`} dangerouslySetInnerHTML={{ __html: l }}/>
      ))}
      <span className="badge badge-purple" style={{ borderRadius:6 }}>v3.1</span>
      <span className="badge badge-info">New</span>
    </div>
  );
}

const BADGE_CODE = `import { Badge } from "@devui/react";

<Badge variant="default">Default</Badge>
<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Away</Badge>
<Badge variant="error" dot>Offline</Badge>
<Badge variant="info">New</Badge>
<Badge variant="purple">Beta</Badge>`;

// ── INPUT ──────────────────────────────────────────
function InputDemo({ variant = 1 }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const emailErr = email.length > 0 && !email.includes("@");
  if (variant === 2) return (
    <div style={{ display:"flex", flexDirection:"column", gap:12, width:"100%", maxWidth:320 }}>
      <div className="input-group">
        <label className="input-label">Search</label>
        <div className="input-wrap">
          <span className="input-icon">🔍</span>
          <input className="input-field input-with-icon" placeholder="Search components…"/>
        </div>
      </div>
      <div className="input-group">
        <label className="input-label">Password</label>
        <input type="password" className="input-field" placeholder="••••••••" value={pass} onChange={e=>setPass(e.target.value)}/>
        {pass.length > 0 && pass.length < 8 && <span className="input-error">Min 8 characters required</span>}
      </div>
    </div>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12, width:"100%", maxWidth:320 }}>
      <div className="input-group">
        <label className="input-label">Email address</label>
        <div className="input-wrap">
          <span className="input-icon">✉</span>
          <input type="email" className={`input-field input-with-icon${emailErr?" error":""}`} placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
        </div>
        {emailErr ? <span className="input-error">Enter a valid email address</span> : <span className="input-hint">We'll never share your email.</span>}
      </div>
      <div className="input-group">
        <label className="input-label">Username</label>
        <input className="input-field" placeholder="your_username" style={{ opacity:.5, cursor:"not-allowed" }} disabled/>
        <span className="input-hint">Disabled state</span>
      </div>
    </div>
  );
}

const INPUT_CODE = `import { Input } from "@devui/react";

// With icon and validation
<Input
  label="Email address"
  type="email"
  leftIcon={<MailIcon />}
  value={email}
  onChange={setEmail}
  error={!isValid && "Enter a valid email"}
  hint="We'll never share your email."
/>

// Disabled
<Input label="Username" disabled />`;

/* ────────────────────────────────────────────────────────────
   COMPONENT REGISTRY
──────────────────────────────────────────────────────────── */
const COMPONENTS = {
  hero:     { label:"Hero",     count:5, Demo:HeroDemo,     code:HERO_CODE,     emoji:"🦸", variants:["Centered","Split","Minimal"], desc:"Eye-catching hero sections for landing pages." },
  avatar:   { label:"Avatar",   count:4, Demo:AvatarDemo,   code:AVATAR_CODE,   emoji:"👤", variants:["Group","Sizes","Status"],    desc:"User avatars with group stacking and presence indicators." },
  button:   { label:"Button",   count:8, Demo:ButtonDemo,   code:BUTTON_CODE,   emoji:"🔘", variants:["All variants","Sizes","States"], desc:"Fully-featured button component with all variants, sizes, and states." },
  card:     { label:"Card",     count:6, Demo:CardDemo,     code:CARD_CODE,     emoji:"🃏", variants:["Blog","Stats","Media"],       desc:"Versatile card components for content and data display." },
  features: { label:"Features", count:4, Demo:FeaturesDemo, code:FEATURES_CODE, emoji:"⭐", variants:["Grid","Icons"],               desc:"Feature grids to showcase your product's strengths." },
  loading:  { label:"Loading",  count:4, Demo:LoadingDemo,  code:LOADING_CODE,  emoji:"⏳", variants:["Spinners","Progress","Bars"],  desc:"Loading states that keep users informed and engaged." },
  modal:    { label:"Modal",    count:4, Demo:ModalDemo,    code:MODAL_CODE,    emoji:"🪟", variants:["Default","Confirm","Delete"],  desc:"Accessible modal dialogs with focus trapping and backdrop." },
  nav:      { label:"Nav",      count:5, Demo:NavDemo,      code:NAV_CODE,      emoji:"🧭", variants:["Default","Rounded","Multi"],   desc:"Navigation bar components for every layout." },
  tab:      { label:"Tab",      count:5, Demo:TabDemo,      code:TAB_CODE,      emoji:"📑", variants:["Underline","Pill","Vertical"], desc:"Tab components for organizing content into switchable panels." },
  footer:   { label:"Footer",   count:3, Demo:FooterDemo,   code:FOOTER_CODE,   emoji:"📄", variants:["Full","Minimal"],             desc:"Footer components for landing pages and apps." },
  badge:    { label:"Badge",    count:6, Demo:BadgeDemo,    code:BADGE_CODE,    emoji:"🏷",  variants:["Status","Variants"],          desc:"Status badges, tags, and labels." },
  input:    { label:"Input",    count:5, Demo:InputDemo,    code:INPUT_CODE,    emoji:"📝", variants:["Default","Icon","Disabled"],   desc:"Input fields with validation, icons, and accessible labels." },
};

/* ────────────────────────────────────────────────────────────
   OVERVIEW PAGE
──────────────────────────────────────────────────────────── */
function OverviewPage({ onSelect }) {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Components</h1>
        <p className="page-sub">48+ production-ready components. Copy-paste into your project. Dark mode. Full TypeScript. WCAG 2.1 AA.</p>
      </div>
      <div className="comp-grid">
        {Object.entries(COMPONENTS).map(([id, c]) => (
          <div key={id} className="comp-card" onClick={() => onSelect(id)}>
            <div className="comp-preview">
              <div style={{ position:"relative", zIndex:1, transform:"scale(0.85)", transformOrigin:"center" }}>
                <c.Demo variant={1}/>
              </div>
            </div>
            <div className="comp-footer">
              <span className="comp-name">{c.emoji} {c.label}</span>
              <span className="comp-count">{c.count} variants</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   COMPONENT DETAIL PAGE
──────────────────────────────────────────────────────────── */
function ComponentPage({ id }) {
  const comp = COMPONENTS[id];
  const [variantIdx, setVariantIdx] = useState(0);
  const [tab, setTab] = useState("preview");

  if (!comp) return null;

  return (
    <div>
      <div className="demo-header">
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
          <span style={{ fontSize:28 }}>{comp.emoji}</span>
          <h2 className="demo-title">{comp.label}</h2>
          <span className="badge badge-purple">{comp.count} variants</span>
        </div>
        <p className="demo-desc">{comp.desc}</p>
      </div>

      {/* Variant selector */}
      <div className="variants">
        {comp.variants.map((v, i) => (
          <button key={i} onClick={() => { setVariantIdx(i); setTab("preview"); }} className={`variant-btn${variantIdx===i?" active":""}`}>{v}</button>
        ))}
      </div>

      {/* Preview / Code tabs */}
      <div className="demo-tabs">
        {["preview","code"].map(t => (
          <button key={t} onClick={() => setTab(t)} className={`demo-tab${tab===t?" active":""}`}>
            {t === "preview" ? "👁 Preview" : "⟨⟩ Code"}
          </button>
        ))}
      </div>

      {tab === "preview" ? (
        <div className="demo-preview">
          <comp.Demo variant={variantIdx + 1}/>
        </div>
      ) : (
        <CodeBlock code={comp.code}/>
      )}

      {/* Props table for select components */}
      {(id === "button" || id === "modal" || id === "input") && (
        <div style={{ marginTop:28 }}>
          <div style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, color:"var(--text3)", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
            Props
            <div style={{ flex:1, height:1, background:"var(--border)" }}/>
          </div>
          <div style={{ border:"1px solid var(--border)", borderRadius:12, overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5 }}>
              <thead>
                <tr style={{ background:"var(--bg3)" }}>
                  {["Prop","Type","Default","Description"].map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"9px 14px", fontSize:10.5, fontWeight:700, letterSpacing:.6, textTransform:"uppercase", color:"var(--text3)", borderBottom:"1px solid var(--border)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(id==="button" ? [
                  ["variant","string",'"primary"','"primary" | "secondary" | "outline" | "ghost" | "danger"'],
                  ["size","string",'"md"','"sm" | "md" | "lg"'],
                  ["loading","boolean","false","Show spinner and disable interaction"],
                  ["disabled","boolean","false","Disable the button"],
                ] : id==="modal" ? [
                  ["open","boolean","false","Controls modal visibility"],
                  ["onClose","() => void","—","Called on backdrop click or ×"],
                  ["title","string","—","Modal header title"],
                  ["size","string",'"md"','"sm" | "md" | "lg" | "full"'],
                ] : [
                  ["label","string","—","Label text above the field"],
                  ["error","string","—","Error message (also triggers red style)"],
                  ["hint","string","—","Helper text below field"],
                  ["disabled","boolean","false","Disable the field"],
                  ["leftIcon","ReactNode","—","Icon on the left side"],
                ]).map((row, i) => (
                  <tr key={i} style={{ borderBottom:"1px solid var(--border)" }}>
                    <td style={{ padding:"8px 14px" }}><code style={{ fontFamily:"'Geist Mono',monospace", fontSize:11.5, color:"var(--accent2)" }}>{row[0]}</code></td>
                    <td style={{ padding:"8px 14px" }}><code style={{ fontFamily:"'Geist Mono',monospace", fontSize:11.5, color:"var(--green)" }}>{row[1]}</code></td>
                    <td style={{ padding:"8px 14px" }}><code style={{ fontFamily:"'Geist Mono',monospace", fontSize:11.5, color:"var(--yellow)" }}>{row[2]}</code></td>
                    <td style={{ padding:"8px 14px", color:"var(--text2)", fontSize:12 }}>{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Related components */}
      <div style={{ marginTop:32 }}>
        <div style={{ fontSize:12, fontWeight:700, textTransform:"uppercase", letterSpacing:.7, color:"var(--text3)", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
          Related
          <div style={{ flex:1, height:1, background:"var(--border)" }}/>
        </div>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {Object.entries(COMPONENTS).filter(([k]) => k !== id).slice(0,5).map(([k,c]) => (
            <div key={k} className="comp-card" style={{ width:140, flexShrink:0 }}
              onClick={() => { window.scrollTo({ top:0, behavior:"smooth" }); }}>
              <div className="comp-preview" style={{ minHeight:80, padding:"14px 12px" }}>
                <div style={{ fontSize:22 }}>{c.emoji}</div>
              </div>
              <div className="comp-footer" style={{ padding:"10px 12px" }}>
                <span className="comp-name" style={{ fontSize:12 }}>{c.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────
   SITE FOOTER
──────────────────────────────────────────────────────────── */
// function SiteFooter() {
//   return (
//     <footer className="site-footer">
//       <div className="footer-inner">
//         <div className="footer-top">
//           <div className="footer-brand">
//             <a href="#" className="logo" style={{ textDecoration:"none" }}>
//               <div className="logo-dot"/>
//               dev.UI
//             </a>
//             <p className="footer-tagline" style={{ marginTop:8 }}>Production-ready components for building modern dark-mode UIs. Copy, paste, ship.</p>
//             <div className="footer-socials" style={{ marginTop:14 }}>
//               {["𝕏","⭐","💬","📧"].map(i => <div key={i} className="social-btn">{i}</div>)}
//             </div>
//           </div>
//           {[
//             { title:"Components", links:["Hero","Avatar","Button","Card","Features","Modal"] },
//             { title:"Resources", links:["Documentation","Templates","Changelog","Roadmap"] },
//             { title:"Company", links:["About","Blog","GitHub","Twitter"] },
//           ].map(col => (
//             <div key={col.title}>
//               <div className="footer-col-title">{col.title}</div>
//               <div className="footer-links">
//                 {col.links.map(l => <button key={l} className="footer-link">{l}</button>)}
//               </div>
//             </div>
//           ))}
//         </div>
//         <div className="footer-bottom">
//           <span className="footer-copy">© 2025 dev.UI. Released under the MIT License.</span>
//           <div style={{ display:"flex", gap:12, alignItems:"center" }}>
//             {["Privacy","Terms","License"].map(l => (
//               <span key={l} style={{ fontSize:12, color:"var(--text3)", cursor:"pointer" }}>{l}</span>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

/* ────────────────────────────────────────────────────────────
   ROOT APP
──────────────────────────────────────────────────────────── */
export default function DevUI() {
  const [selected, setSelected] = useState("overview");
  const [search, setSearch] = useState("");
  const mainRef = useRef(null);

  const select = (id) => {
    setSelected(id);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredNav = NAV.filter(n =>
    n.label.toLowerCase().includes(search.toLowerCase())
  );

  const sections = [...new Set(filteredNav.map(n => n.section))];

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* TOP NAVBAR */}
      <nav className="topnav">
        <a href="#" className="logo" onClick={e => { e.preventDefault(); select("overview"); }}>
          <div className="logo-dot"/>
          dev.UI
        </a>
        <div className="nav-links">
          <button className="nav-link active" onClick={() => select("overview")}>Components</button>
          <button className="nav-link">Templates</button>
          <button className="nav-link">Docs</button>
        </div>
        <div style={{ flex:1 }}/>
        <a href="#" className="github-btn">
          <span>⭐</span> Star on GitHub
        </a>
      </nav>

      {/* LAYOUT */}
      <div className="layout" style={{ flex:1 }}>
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="sidebar-search">
              <span style={{ fontSize:13 }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"/>
              {search && <span style={{ cursor:"pointer", color:"var(--text3)", fontSize:13 }} onClick={() => setSearch("")}>×</span>}
            </div>
          </div>
          <nav className="sidebar-nav">
            {sections.map(section => (
              <div key={section} className="nav-group">
                <div className="sidebar-section">{section}</div>
                {filteredNav.filter(n => n.section === section).map(n => (
                  <button key={n.id} onClick={() => select(n.id)} className={`nav-item${selected===n.id?" active":""}`}>
                    <span>{n.label}</span>
                    {n.count && <span className="nav-badge">{n.count}</span>}
                  </button>
                ))}
              </div>
            ))}
            {filteredNav.length === 0 && (
              <div style={{ padding:"20px 10px", textAlign:"center", color:"var(--text3)", fontSize:13 }}>No results</div>
            )}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div ref={mainRef} style={{ flex:1, overflowY:"auto" }}>
            <div className="content">
              {selected === "overview"
                ? <OverviewPage onSelect={select}/>
                : <ComponentPage id={selected}/>
              }
            </div>
            {/* <SiteFooter/> */}
          </div>
        </div>
      </div>
    </>
  );
}