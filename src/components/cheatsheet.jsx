import React, { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Inter:wght@300;400;500;600&family=Syne:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  .qc-page { min-height:100vh; background:#FAFAF7; font-family:'Inter',system-ui,sans-serif; color:#1C1917; -webkit-font-smoothing:antialiased; }

  .qc-hero { position:relative; background:#0F0F0F; color:white; overflow:hidden; }
  .qc-hero-glow { position:absolute; inset:0; background: radial-gradient(ellipse 60% 80% at 80% 50%,rgba(99,102,241,.18),transparent 70%), radial-gradient(ellipse 40% 60% at 20% 20%,rgba(16,185,129,.12),transparent 60%); }
  .qc-hero-inner { position:relative; max-width:1100px; margin:0 auto; padding:76px 24px 68px; }
  .qc-hero-eyebrow { display:flex; align-items:center; gap:10px; font-size:11px; letter-spacing:.18em; text-transform:uppercase; color:rgba(255,255,255,.45); margin-bottom:22px; }
  .qc-hero-eyebrow::before { content:''; display:block; width:26px; height:1px; background:rgba(255,255,255,.28); }
  .qc-hero h1 { font-family:'Syne',sans-serif; font-size:clamp(42px,7vw,72px); font-weight:800; line-height:1; letter-spacing:-.03em; margin:0 0 20px; color:#fff; }
  .qc-hero h1 em { font-style:normal; background:linear-gradient(125deg,#93C5FD,#C4B5FD); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
  .qc-hero-sub { font-size:15.5px; font-weight:300; color:rgba(255,255,255,.5); max-width:420px; line-height:1.72; }
  .qc-hero-stats { display:flex; gap:40px; margin-top:44px; flex-wrap:wrap; }
  .qc-stat-n { font-family:'Lora',Georgia,serif; font-size:26px; font-weight:600; color:#FAFAF7; display:block; line-height:1; margin-bottom:4px; }
  .qc-stat-l { font-size:10.5px; font-weight:400; letter-spacing:.09em; text-transform:uppercase; color:rgba(255,255,255,.35); }

  .qc-filters { background:#fff; border-bottom:1px solid #E8E4DC; position:sticky; top:0; z-index:10; }
  .qc-filters-inner { max-width:1100px; margin:0 auto; padding:0 24px; display:flex; align-items:center; }
  .qc-search-wrap { position:relative; flex:1; border-right:1px solid #E8E4DC; }
  .qc-search-icon { position:absolute; left:0; top:50%; transform:translateY(-50%); color:#A8A29E; width:15px; height:15px; pointer-events:none; }
  .qc-search-input { width:100%; background:transparent; border:none; outline:none; padding:18px 12px 18px 24px; font-family:'Inter',sans-serif; font-size:13.5px; color:#1C1917; }
  .qc-search-input::placeholder { color:#A8A29E; }
  .qc-cats { display:flex; align-items:center; padding-left:20px; overflow-x:auto; gap:0; }
  .qc-cat-btn { background:none; border:none; cursor:pointer; padding:18px 13px; font-family:'Inter',sans-serif; font-size:11px; font-weight:500; letter-spacing:.1em; text-transform:uppercase; color:#A8A29E; transition:color .18s; white-space:nowrap; position:relative; }
  .qc-cat-btn:hover { color:#1C1917; }
  .qc-cat-btn.active { color:#1C1917; }
  .qc-cat-btn.active::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:#1C1917; border-radius:2px 2px 0 0; }

  .qc-section { max-width:1100px; margin:0 auto; padding:48px 24px 80px; }
  .qc-section-head { display:flex; align-items:baseline; gap:12px; margin-bottom:28px; }
  .qc-section-title { font-family:'Lora',Georgia,serif; font-size:22px; font-weight:600; font-style:italic; color:#1C1917; }
  .qc-section-count { font-size:12px; color:#A8A29E; }
  .qc-grid { display:grid; gap:16px; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); }

  .qc-card { position:relative; background:#fff; border:1px solid #E8E4DC; border-radius:14px; overflow:hidden; display:flex; flex-direction:column; cursor:pointer; transition:transform .24s cubic-bezier(.34,1.46,.64,1),box-shadow .22s ease,border-color .2s ease; }
  .qc-card:hover { transform:translateY(-5px); border-color:#D6D0C4; box-shadow:0 2px 4px rgba(0,0,0,.04),0 10px 28px rgba(0,0,0,.08),0 24px 48px rgba(0,0,0,.04); }
  .qc-card-rule { position:absolute; left:0; top:18px; bottom:18px; width:3px; border-radius:0 3px 3px 0; opacity:0; transition:opacity .22s ease; }
  .qc-card:hover .qc-card-rule { opacity:1; }
  .qc-card-body { padding:20px 20px 20px 24px; display:flex; flex-direction:column; flex:1; }
  .qc-card-head { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:14px; }
  .qc-icon { width:44px; height:44px; border-radius:10px; background:#FAFAF7; border:1px solid #E8E4DC; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:background .18s,border-color .18s; overflow:hidden; }
  .qc-card:hover .qc-icon { background:#F5F3EE; border-color:#D6D0C4; }
  .qc-badge { font-size:10px; font-weight:600; letter-spacing:.09em; text-transform:uppercase; padding:3px 9px; border-radius:99px; border:1px solid; flex-shrink:0; }
  .qc-card h3 { font-family:'Syne',sans-serif; font-size:17px; font-weight:700; color:#1C1917; margin:0 0 7px; letter-spacing:-.01em; line-height:1.25; transition:color .18s; }
  .qc-card:hover h3 { color:#3730A3; }
  .qc-card p { font-size:13px; font-weight:300; color:#57534E; line-height:1.65; margin:0 0 16px; flex:1; }
  .qc-meta { display:flex; border-top:1px solid #F0EDE6; border-bottom:1px solid #F0EDE6; padding:9px 0; margin-bottom:14px; }
  .qc-meta-cell { flex:1; display:flex; flex-direction:column; gap:1px; }
  .qc-meta-cell+.qc-meta-cell { border-left:1px solid #F0EDE6; padding-left:14px; }
  .qc-meta-val { font-family:'Syne',sans-serif; font-size:13.5px; font-weight:600; color:#1C1917; letter-spacing:-.01em; }
  .qc-meta-key { font-size:10px; font-weight:500; color:#A8A29E; text-transform:uppercase; letter-spacing:.09em; }
  .qc-topics { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:16px; }
  .qc-topic { font-size:11px; padding:3px 8px; border-radius:5px; background:#F5F3EE; color:#78716C; border:1px solid #EAE6DC; }
  .qc-btn { width:100%; padding:11px 16px; border-radius:8px; border:none; background:#1C1917; color:#FAFAF7; font-family:'Inter',sans-serif; font-size:13px; font-weight:500; letter-spacing:.01em; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:6px; transition:background .18s,transform .12s; }
  .qc-btn:hover { background:#2C2A27; }
  .qc-btn:active { transform:scale(.98); }
  .qc-btn svg { transition:transform .18s; flex-shrink:0; }
  .qc-btn:hover svg { transform:translateX(3px); }

  .qc-detail-wrap { max-width:1100px; margin:0 auto; padding:0 24px 80px; }
  .qc-detail-back { display:inline-flex; align-items:center; gap:10px; padding:20px 0; border-bottom:1px solid #E8E4DC; width:100%; margin-bottom:48px; background:none; border-left:none; border-right:none; border-top:none; cursor:pointer; font-family:'Inter',sans-serif; font-size:11px; font-weight:500; letter-spacing:.12em; text-transform:uppercase; color:#A8A29E; transition:color .18s; text-align:left; }
  .qc-detail-back:hover { color:#1C1917; }
  .qc-detail-back-icon { width:26px; height:26px; border:1px solid #E8E4DC; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; transition:border-color .18s; }
  .qc-detail-back:hover .qc-detail-back-icon { border-color:#A8A29E; }
  .qc-detail-header { margin-bottom:48px; }
  .qc-detail-cat { display:inline-flex; align-items:center; gap:8px; font-size:10.5px; font-weight:600; letter-spacing:.15em; text-transform:uppercase; margin-bottom:14px; }
  .qc-detail-cat::before { content:''; display:block; width:20px; height:1px; background:currentColor; opacity:.5; }
  .qc-detail-title { font-family:'Lora',Georgia,serif; font-size:clamp(28px,4vw,46px); font-weight:700; line-height:1.1; letter-spacing:-.01em; color:#1C1917; margin:0 0 16px; }
  .qc-detail-desc { font-size:15px; font-weight:300; color:#78716C; line-height:1.7; max-width:580px; margin-bottom:20px; }
  .qc-detail-byline { display:flex; align-items:center; gap:12px; flex-wrap:wrap; padding-top:20px; border-top:1px solid #E8E4DC; }

  .qc-sheet-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:20px; }
  .qc-sheet-block { background:#fff; border:1px solid #E8E4DC; border-radius:12px; overflow:hidden; }
  .qc-sheet-block-header { display:flex; align-items:center; gap:10px; padding:14px 18px; border-bottom:1px solid #F0EDE6; background:#FAFAF7; }
  .qc-sheet-block-icon { width:18px; height:18px; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:#78716C; }
  .qc-sheet-block-title { font-family:'Syne',sans-serif; font-size:12px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:#1C1917; flex:1; }
  .qc-sheet-block-count { font-family:'JetBrains Mono',monospace; font-size:10px; color:#A8A29E; }
  .qc-snippet-row { border-bottom:1px solid #F0EDE6; }
  .qc-snippet-row:last-child { border-bottom:none; }
  .qc-snippet-label { padding:10px 18px 4px; font-size:11px; font-weight:500; color:#78716C; letter-spacing:.05em; }
  .qc-code-block { position:relative; background:#0F0F0F; margin:0 12px 10px; border-radius:7px; overflow:hidden; }
  .qc-code-bar { display:flex; align-items:center; justify-content:space-between; padding:7px 12px; border-bottom:1px solid #222; }
  .qc-code-dots { display:flex; gap:5px; }
  .qc-code-dot { width:8px; height:8px; border-radius:50%; }
  .qc-copy-btn { background:none; border:none; cursor:pointer; font-family:'JetBrains Mono',monospace; font-size:9px; letter-spacing:.1em; text-transform:uppercase; color:rgba(255,255,255,.25); transition:color .15s; padding:2px 6px; }
  .qc-copy-btn:hover { color:rgba(255,255,255,.6); }
  .qc-copy-btn.copied { color:#34D399; }
  pre.qc-code { margin:0; padding:12px 14px; font-family:'JetBrains Mono',monospace; font-size:12px; line-height:1.75; color:#E8E4DC; overflow-x:auto; white-space:pre; }

  .qc-empty { grid-column:1/-1; text-align:center; padding:80px 24px; background:#fff; border:1px solid #E8E4DC; border-radius:14px; }
  .qc-empty-title { font-family:'Lora',Georgia,serif; font-size:24px; font-style:italic; color:#78716C; margin-bottom:8px; }
  .qc-empty p { font-size:13px; color:#A8A29E; font-weight:300; }

  @media(max-width:768px) { .qc-cats{display:none;} .qc-sheet-grid{grid-template-columns:1fr;} }
  @media(max-width:600px) { .qc-hero-inner{padding:52px 20px 44px;} .qc-hero-stats{gap:26px;} .qc-section{padding:32px 16px 60px;} .qc-detail-wrap{padding:0 16px 60px;} .qc-grid{grid-template-columns:1fr;} }
`;

/* ─── SVG TECH LOGOS ─── */
const TechIcon = ({ id }) => {
  const icons = {
    html: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <path d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3H5z" fill="#E44D26" />
        <path d="M16 27.4V5.6H24.8l-1.8 20.6L16 27.4z" fill="#F16529" />
        <path
          d="M16 13.6h-4.3l-.3-3.2H16V7.2H8.1l.8 8.8H16v-2.4zm0 7.3-.1.1-3.4-.9-.2-2.4H9.1l.4 4.7 6.5 1.8V20.9z"
          fill="#EBEBEB"
        />
        <path
          d="M16 13.6v2.4h3.8l-.4 4.3-3.4.9v3.3l6.5-1.8.9-10.7H16v1.6zm0-6.4v3.2h7.5l.3-3.2H16z"
          fill="#fff"
        />
      </svg>
    ),
    css: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <path d="M5 3l2.1 23.4L16 29l8.9-2.6L27 3H5z" fill="#1572B6" />
        <path d="M16 27.4V5.6H24.8l-1.8 20.6L16 27.4z" fill="#33A9DC" />
        <path
          d="M16 13.8H11.8l.3 3.3H16v-3.3zm0-6.6H8.2l.3 3.3H16V7.2zm0 12.2-.1.1-2.8-.8-.2-2H9.8l.4 4.4 5.8 1.6V19.4z"
          fill="#EBEBEB"
        />
        <path
          d="M16 13.8v3.3h3.6l-.3 3.4-3.3.9v3.3l5.9-1.6 1-11.3H16zm0-6.6v3.3h7.1l.3-3.3H16z"
          fill="#fff"
        />
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <rect width="32" height="32" rx="3" fill="#F7DF1E" />
        <path
          d="M9.5 25.8l2.4-1.4c.5.8.9 1.5 1.9 1.5 1 0 1.6-.4 1.6-1.9V15h2.9v9c0 3.1-1.8 4.5-4.5 4.5-2.4 0-3.8-1.2-4.3-2.7zm10.2-.4l2.4-1.4c.6 1 1.4 1.8 2.8 1.8 1.2 0 1.9-.6 1.9-1.4 0-1-.7-1.3-2-1.9l-.7-.3c-2-.8-3.3-1.9-3.3-4 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.1l-2.3 1.5c-.5-.8-1-1.1-1.8-1.1-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.7 1.6l.7.3c2.3 1 3.6 2.1 3.6 4.4 0 2.5-2 3.8-4.6 3.8-2.6 0-4.2-1.2-5.1-2.8v-.2z"
          fill="#000"
        />
      </svg>
    ),
    react: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
        <ellipse
          cx="16"
          cy="16"
          rx="12"
          ry="4.8"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.5"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="12"
          ry="4.8"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(60 16 16)"
        />
        <ellipse
          cx="16"
          cy="16"
          rx="12"
          ry="4.8"
          fill="none"
          stroke="#61DAFB"
          strokeWidth="1.5"
          transform="rotate(120 16 16)"
        />
      </svg>
    ),
    python: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <defs>
          <linearGradient id="pb" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#387EB8" />
            <stop offset="100%" stopColor="#366994" />
          </linearGradient>
          <linearGradient id="py" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE052" />
            <stop offset="100%" stopColor="#FFC331" />
          </linearGradient>
        </defs>
        <path
          d="M15.9 3C11.6 3 12 4.9 12 4.9V7h4v1H8.5S6 7.7 6 12.1c0 4.4 2.4 4.2 2.4 4.2H10v-2s-.1-2.4 2.4-2.4h4.1s2.3.1 2.3-2.2V5.2S19.2 3 15.9 3zm-.2 1.3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          fill="url(#pb)"
        />
        <path
          d="M16.1 29c4.3 0 3.9-1.9 3.9-1.9V25h-4v-1h7.5s2.5.3 2.5-4.1c0-4.4-2.4-4.2-2.4-4.2H22v2s.1 2.4-2.4 2.4h-4.1s-2.3-.1-2.3 2.2v3.7s-.3 2 3 2zm.2-1.3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
          fill="url(#py)"
        />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <rect width="32" height="32" rx="3" fill="#3178C6" />
        <path
          d="M18.6 19.6v2.5c.4.2.9.4 1.4.5.5.1 1.1.2 1.7.2.6 0 1.1-.1 1.6-.2.5-.1.9-.3 1.2-.6.3-.3.6-.6.8-1 .2-.4.3-.9.3-1.4 0-.4-.1-.7-.2-1-.1-.3-.3-.5-.5-.7-.2-.2-.5-.4-.8-.5l-1-.4-.7-.3c-.2-.1-.4-.2-.5-.3-.1-.1-.2-.2-.3-.3l-.1-.4c0-.2.1-.3.2-.5.1-.1.2-.2.4-.3.2-.1.4-.1.6-.1.2 0 .4 0 .6.1.2 0 .4.1.5.2.2.1.3.2.5.3v-2.4c-.3-.1-.7-.2-1.1-.3-.4 0-.8-.1-1.2-.1-.6 0-1.1.1-1.6.2-.5.2-.9.4-1.2.7-.3.3-.6.6-.8 1-.2.4-.3.8-.3 1.4 0 .7.2 1.3.5 1.7.4.5.9.8 1.6 1.1l.7.3c.2.1.4.2.6.3.2.1.3.2.4.4.1.1.2.3.2.5 0 .2 0 .3-.1.5l-.4.3c-.2.1-.4.1-.6.1-.4 0-.8-.1-1.2-.3-.4-.2-.7-.4-.9-.7zm-5.1-5.9H17V11H9v2.7h3.5V25h3V13.7z"
          fill="#fff"
        />
      </svg>
    ),
    git: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <path
          d="M29.5 14.5L17.5 2.5a1.7 1.7 0 0 0-2.4 0l-2.4 2.4 3 3a2 2 0 0 1 2.6 2.5l2.9 2.9a2 2 0 1 1-1.2 1.2l-2.7-2.7V19a2 2 0 1 1-1.6 0v-7.4a2 2 0 0 1-1.1-2.6l-3-2.9-7.9 7.9a1.7 1.7 0 0 0 0 2.4l12 12a1.7 1.7 0 0 0 2.4 0l10.9-10.9a1.7 1.7 0 0 0 0-2.4z"
          fill="#F05032"
        />
      </svg>
    ),
    nodejs: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <path
          d="M16 3L4 9.8v12.4L16 29l12-6.8V9.8L16 3zm0 2.3l9.7 5.5v5.4L16 22.2l-9.7-5.9V10.8L16 5.3zm0 4.4c-3.4 0-6.2 2.8-6.2 6.2S12.6 22.2 16 22.2s6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 2.2c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z"
          fill="#539E43"
        />
      </svg>
    ),
    sql: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <ellipse cx="16" cy="9" rx="10" ry="4" fill="#EDE9FE" />
        <ellipse
          cx="16"
          cy="9"
          rx="10"
          ry="4"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1.5"
        />
        <path d="M6 9v5c0 2.2 4.5 4 10 4s10-1.8 10-4V9" fill="#DDD6FE" />
        <path
          d="M6 9v5c0 2.2 4.5 4 10 4s10-1.8 10-4V9"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1.5"
        />
        <path d="M6 14v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5" fill="#C4B5FD" />
        <path
          d="M6 14v5c0 2.2 4.5 4 10 4s10-1.8 10-4v-5"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="1.5"
        />
      </svg>
    ),
    tailwind: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <path
          d="M16 6c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.285 1.955 1.112 2.857 2.027C18.084 13.345 19.672 15 23 15c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.285-1.955-1.112-2.857-2.027C20.916 7.655 19.328 6 16 6zm-7.5 9c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.285 1.955 1.112 2.857 2.027C10.584 22.345 12.172 24 15.5 24c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.285-1.955-1.112-2.857-2.027C13.416 16.655 11.828 15 8.5 15z"
          fill="#38BDF8"
        />
      </svg>
    ),
    mongodb: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <path
          d="M16 3s-7 9.5-7 15.2C9 23.4 12.1 27 16 27s7-3.6 7-8.8C23 12.5 16 3 16 3z"
          fill="#47A248"
        />
        <path d="M16 3s7 9.5 7 15.2C23 23.4 19.9 27 16 27V3z" fill="#3D8E3D" />
        <rect x="15.2" y="22" width="1.6" height="7" rx=".8" fill="#47A248" />
      </svg>
    ),
    linux: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <path
          d="M16 3C9.4 3 4 8.4 4 15c0 4.3 2.2 8.1 5.5 10.4.3 1 1.3 1.6 2.5 1.6h8c1.2 0 2.2-.6 2.5-1.6C25.8 23.1 28 19.3 28 15 28 8.4 22.6 3 16 3z"
          fill="#374151"
        />
        <ellipse cx="12" cy="14" rx="2" ry="2.5" fill="#FAFAF7" />
        <ellipse cx="20" cy="14" rx="2" ry="2.5" fill="#FAFAF7" />
        <circle cx="12" cy="14.5" r="1" fill="#374151" />
        <circle cx="20" cy="14.5" r="1" fill="#374151" />
        <path
          d="M13 19c0 0 1.5 2 3 0"
          stroke="#FAFAF7"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M8 25c-1 1-2 3-1 4"
          stroke="#78716C"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M24 25c1 1 2 3 1 4"
          stroke="#78716C"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    ),
    docker: (
      <svg viewBox="0 0 32 32" width="26" height="26">
        <path
          d="M30 14.3c-.4-.3-1.4-.4-2.1-.3-.1-.8-.6-1.5-1.3-2l-.5-.3-.3.5c-.4.6-.5 1.6-.4 2.3-.3-.1-.9-.3-1.3-.2H4.2c-.3 1-.3 6.3 3.3 8.8 1.8 1.2 4 1.8 6.6 1.8 6.3 0 10.9-2.9 13.1-8.2 1.5.1 3-.4 3.7-1.6l.2-.4-.4-.2-.7-.2zm-17-4.9H11v2h2v-2zm0 2.7H11v2h2v-2zm2.7-2.7h-2v2h2v-2zm0 2.7h-2v2h2v-2zm2.7-5.4H16v2h2V6.7zm0 2.7H16v2h2V9.4zm0 2.7H16v2h2v-2zm2.6-2.7h-2v2h2V9.4zm0 2.7h-2v2h2v-2zm2.7 0h-2v2h2v-2z"
          fill="#2496ED"
        />
      </svg>
    ),
  };
  return icons[id] || null;
};

/* ─── SECTION ICONS ─── */
const SI = ({ k }) => {
  const m = {
    doc: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    tag: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </svg>
    ),
    type: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    link: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    list: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    form: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="7" y1="8" x2="17" y2="8" />
        <line x1="7" y1="12" x2="17" y2="12" />
        <line x1="7" y1="16" x2="11" y2="16" />
      </svg>
    ),
    box: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </svg>
    ),
    flex: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="8" width="5" height="13" rx="1" />
        <rect x="10" y="3" width="5" height="18" rx="1" />
        <rect x="17" y="6" width="5" height="12" rx="1" />
      </svg>
    ),
    grid: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    pin: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    spark: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    phone: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="7" y="2" width="10" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    fn: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    arr: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="12" y1="4" x2="12" y2="20" />
        <polyline points="4 20 4 17 20 17 20 20" />
      </svg>
    ),
    obj: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <ellipse cx="12" cy="12" rx="9" ry="5" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <path d="M12 3a9 5 0 0 1 0 18" />
      </svg>
    ),
    clock: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    cursor: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M5 3l14 9-7 1-4 7z" />
      </svg>
    ),
    bolt: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    comp: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2l3.5 6h7L16 13l2.5 7L12 16l-6.5 4L8 13 1.5 8h7z" />
      </svg>
    ),
    ref: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
    wave: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2 12s3-7 6-7 6 7 6 7 3-7 6-7" />
      </svg>
    ),
    hook: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M17 12h-5c-2.2 0-4-1.8-4-4V4" />
        <polyline points="13 8 17 12 13 16" />
      </svg>
    ),
    cust: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      </svg>
    ),
    globe: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    perf: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    gear: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    file: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    cmd: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
    trash: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </svg>
    ),
    db: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    folder: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    edit: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    lock: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    cpu: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
    net: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    commit: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="4" />
        <line x1="1.05" y1="12" x2="7" y2="12" />
        <line x1="17.01" y1="12" x2="22.96" y2="12" />
      </svg>
    ),
    branch: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
    cloud: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    undo: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 .49-3.96" />
      </svg>
    ),
    search: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    graph: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="9" cy="5" r="2" />
        <circle cx="9" cy="19" r="2" />
        <circle cx="20" cy="12" r="2" />
        <line x1="9" y1="7" x2="9" y2="17" />
        <line x1="11" y1="5" x2="18" y2="11" />
        <line x1="11" y1="19" x2="18" y2="13" />
      </svg>
    ),
    bars: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    shield: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    route: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 12h18M3 6l9-3 9 3M3 18l9 3 9-3" />
      </svg>
    ),
    arrow: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="17 1 21 5 17 9" />
        <path d="M3 11V9a4 4 0 0 1 4-4h14" />
        <polyline points="7 23 3 19 7 15" />
        <path d="M21 13v2a4 4 0 0 1-4 4H3" />
      </svg>
    ),
    send: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="22" y1="2" x2="11" y2="13" />
        <polygon points="22 2 15 22 11 13 2 9 22 2" />
      </svg>
    ),
    table: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="21" x2="9" y2="9" />
      </svg>
    ),
    index: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    schema: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="19" r="2" />
        <circle cx="19" cy="19" r="2" />
        <line x1="12" y1="7" x2="5" y2="17" />
        <line x1="12" y1="7" x2="19" y2="17" />
      </svg>
    ),
    join: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="9" cy="12" r="6" />
        <circle cx="15" cy="12" r="6" />
      </svg>
    ),
    layer: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    text_: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="4 7 4 4 20 4 20 7" />
        <line x1="9" y1="20" x2="15" y2="20" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    ),
    color: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </svg>
    ),
    inter_: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    prim: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="8" y1="6" x2="21" y2="6" />
        <line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" />
        <line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    gen: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    util: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  };
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 18,
        height: 18,
        color: "#78716C",
      }}
    >
      {m[k] || m.file}
    </span>
  );
};

/* ─── CHEATSHEETS DATA ─── */
const CHEATSHEETS = [
  {
    id: 1,
    title: "HTML Essentials",
    category: "Frontend",
    icon: "html",
    level: "Beginner",
    desc: "The building blocks of every web page — tags, attributes, semantic structure, and forms.",
    topics: ["Structure", "Semantics", "Forms", "Media"],
    sections: 10,
    rule: "#E44D26",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
   data: [
  {
    title: "Document Structure",
    si: "doc",
    snips: [
      {
        label: "Boilerplate",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Title</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>Hello World</h1>
  <script src="app.js"></script>
</body>
</html>`
      }
    ]
  },

  {
    title: "Semantic Tags",
    si: "tag",
    snips: [
      {
        label: "Layout elements",
        code: `<header>
<nav>
<main>
<section>
<article>
<aside>
<footer>`
      }
    ]
  },

  {
    title: "Text & Headings",
    si: "type",
    snips: [
      {
        label: "Common tags",
        code: `<h1> to <h6>
<p>
<strong>bold</strong>
<em>italic</em>
<span>inline</span>
<br />
<blockquote>`
      }
    ]
  },

  {
    title: "Links & Images",
    si: "link",
    snips: [
      {
        label: "Anchor & img",
        code: `<a href="https://example.com" target="_blank" rel="noopener">
Visit
</a>

<img
  src="photo.jpg"
  alt="Description"
  width="400"
  height="300"
  loading="lazy"
/>`
      }
    ]
  },

  {
    title: "Lists",
    si: "list",
    snips: [
      {
        label: "ul / ol / dl",
        code: `<ul>
  <li>Item</li>
</ul>

<ol>
  <li>Item</li>
</ol>

<dl>
  <dt>Term</dt>
  <dd>Definition</dd>
</dl>`
      }
    ]
  },

  {
    title: "Forms",
    si: "form",
    snips: [
      {
        label: "Input types",
        code: `<form method="POST" action="/submit">
  <input type="text" placeholder="Name" />
  <input type="email" placeholder="Email" />
  <input type="password" />
  <input type="number" min="0" max="100" />
  <input type="checkbox" /> Remember me
  <input type="radio" name="role" />
  <select>
    <option>One</option>
  </select>
  <textarea rows="4"></textarea>
  <button type="submit">Submit</button>
</form>`
      }
    ]
  },

  {
    title: "Media Elements",
    si: "media",
    snips: [
      {
        label: "Audio & Video",
        code: `<audio controls>
  <source src="sound.mp3" type="audio/mpeg" />
</audio>

<video controls width="400">
  <source src="video.mp4" type="video/mp4" />
</video>`
      }
    ]
  },

  {
    title: "Tables",
    si: "table",
    snips: [
      {
        label: "Basic table",
        code: `<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>25</td>
    </tr>
  </tbody>
</table>`
      }
    ]
  },

  {
    title: "Meta & SEO",
    si: "meta",
    snips: [
      {
        label: "SEO essentials",
        code: `<meta name="description" content="Page description" />
<meta name="keywords" content="html, css, js" />
<meta name="author" content="Your Name" />`
      }
    ]
  },

  {
    title: "Accessibility",
    si: "a11y",
    snips: [
      {
        label: "ARIA & accessibility",
        code: `<img src="img.png" alt="Meaningful description" />

<button aria-label="Close modal">X</button>

<label for="email">Email</label>
<input id="email" type="email" />`
      }
    ]
  },

  {
    title: "Scripts & Styles",
    si: "assets",
    snips: [
      {
        label: "Loading assets",
        code: `<link rel="stylesheet" href="style.css" />

<script src="app.js" defer></script>
<script src="legacy.js" async></script>`
      }
    ]
  }
]
  },
  {
    id: 2,
    title: "CSS Mastery",
    category: "Frontend",
    icon: "css",
    level: "Beginner",
    desc: "Selectors, the box model, Flexbox, Grid, animations, and responsive design patterns.",
    topics: ["Selectors", "Flexbox", "Grid", "Animations"],
    sections: 10,
    rule: "#1572B6",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
   data: [
  {
    title: "Selectors",
    si: "search",
    snips: [
      {
        label: "Common selectors",
        code: `* { }                 /* all */
div { }               /* element */
.class { }             /* class */
#id { }                /* id */
a:hover { }            /* pseudo-class */
p::first-line { }      /* pseudo-element */
div > p { }            /* direct child */
div p { }              /* descendant */
[hf] { }               /* attribute */`
      }
    ]
  },

  {
    title: "Box Model",
    si: "box",
    snips: [
      {
        label: "Spacing",
        code: `.box {
  width: 200px;
  padding: 16px;
  border: 2px solid #ccc;
  margin: 24px auto;
  box-sizing: border-box;
}`
      }
    ]
  },

  {
    title: "Flexbox",
    si: "flex",
    snips: [
      {
        label: "Container & items",
        code: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.item {
  flex: 1 1 200px;
}`
      }
    ]
  },

  {
    title: "CSS Grid",
    si: "grid",
    snips: [
      {
        label: "Grid layout",
        code: `.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.item {
  grid-column: span 2;
}`
      }
    ]
  },

  {
    title: "Positioning",
    si: "pin",
    snips: [
      {
        label: "Position types",
        code: `.relative { position: relative; }
.absolute { position: absolute; top: 0; right: 0; }
.fixed    { position: fixed; bottom: 0; }
.sticky   { position: sticky; top: 0; }`
      }
    ]
  },

  {
    title: "Typography",
    si: "text",
    snips: [
      {
        label: "Fonts & text",
        code: `body {
  font-family: system-ui, sans-serif;
  font-size: 16px;
  line-height: 1.6;
}
h1 { font-size: 2rem; }
p  { color: #444; }`
      }
    ]
  },

  {
    title: "Colors & Backgrounds",
    si: "color",
    snips: [
      {
        label: "Color usage",
        code: `.card {
  color: #111;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
}
.overlay {
  background: rgba(0,0,0,0.5);
}`
      }
    ]
  },

  {
    title: "Animations",
    si: "spark",
    snips: [
      {
        label: "Keyframes & transitions",
        code: `@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

.box {
  animation: fadeIn 0.5s ease forwards;
  transition: transform 0.3s ease;
}

.box:hover {
  transform: scale(1.05);
}`
      }
    ]
  },

  {
    title: "Media Queries",
    si: "phone",
    snips: [
      {
        label: "Responsive design",
        code: `/* Mobile first */
.container { width: 100%; }

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}`
      }
    ]
  },

  {
    title: "Utilities & Helpers",
    si: "tools",
    snips: [
      {
        label: "Common helpers",
        code: `.hidden { display: none; }
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.rounded { border-radius: 8px; }
.shadow  { box-shadow: 0 4px 12px rgba(0,0,0,0.1); }`
      }
    ]
  }
]
  },
  {
    id: 3,
    title: "JavaScript Core",
    category: "Language",
    icon: "javascript",
    level: "Beginner",
    desc: "Variables, functions, arrays, objects, async patterns, and DOM manipulation.",
    topics: ["ES6+", "Arrays", "Async", "DOM"],
    sections: 7,
    rule: "#F7DF1E",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
    data: [
      {
        title: "Variables & Types",
        si: "box",
        snips: [
          {
            label: "Declarations",
            code: `const name  = "Alice";   let count = 0;\n\n// Types\nconst str  = "hello";   const num  = 42;\nconst bool = true;      const arr  = [1,2,3];\nconst obj  = { a: 1 };  const fn   = () => {};`,
          },
        ],
      },
      {
        title: "Functions",
        si: "fn",
        snips: [
          {
            label: "Declarations & arrow",
            code: `function greet(name) { return "Hello, " + name; }\n\nconst greet = (name) => "Hello, " + name;\nconst add   = (a, b = 0) => a + b;\nconst sum   = (...nums) => nums.reduce((a,b) => a+b, 0);`,
          },
        ],
      },
      {
        title: "Array Methods",
        si: "arr",
        snips: [
          {
            label: "Essential methods",
            code: `const nums = [1,2,3,4,5];\nnums.map(n => n * 2)          // [2,4,6,8,10]\nnums.filter(n => n > 2)       // [3,4,5]\nnums.reduce((a,b) => a + b)   // 15\nnums.find(n => n > 3)         // 4\nnums.includes(3)              // true`,
          },
        ],
      },
      {
        title: "Objects & Destructuring",
        si: "obj",
        snips: [
          {
            label: "ES6 patterns",
            code: `const { name, age } = user;\nconst { name: n }   = user;  // rename\n\nconst updated = { ...user, age: 26 };\nconst city    = user?.address?.city;\nconst val     = user.score ?? 0;`,
          },
        ],
      },
      {
        title: "Async / Promises",
        si: "clock",
        snips: [
          {
            label: "fetch + async/await",
            code: `async function getData() {\n  try {\n    const res  = await fetch("/api/data");\n    const data = await res.json();\n    return data;\n  } catch (err) { console.error(err); }\n}\n\nconst [a,b] = await Promise.all([fetchA(), fetchB()]);`,
          },
        ],
      },
      {
        title: "DOM Manipulation",
        si: "cursor",
        snips: [
          {
            label: "Select & modify",
            code: `const el = document.querySelector(".box");\nel.textContent = "New text";\nel.classList.toggle("hidden");\nel.setAttribute("data-id", "42");\n\nel.addEventListener("click", (e) => { e.preventDefault(); });\n\nconst div = document.createElement("div");\ndocument.body.appendChild(div);`,
          },
        ],
      },
      {
        title: "ES6+ Features",
        si: "bolt",
        snips: [
          {
            label: "Modern syntax",
            code: `const msg = \`Hello, \${name}!\`;\nconst obj = { name, age };    // shorthand\nconst m   = { ...obj1, ...obj2 };\n\nexport default function App() {}\nimport App from "./app.js";\n\nuser.score ??= 0;\nuser.role  ||= "guest";`,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "React Handbook",
    category: "Frontend",
    icon: "react",
    level: "Intermediate",
    desc: "Components, hooks, state management, routing, and performance patterns.",
    topics: ["Hooks", "State", "Effects", "Patterns"],
    sections: 7,
    rule: "#61DAFB",
    lc: { color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
    data: [
      {
        title: "Components",
        si: "comp",
        snips: [
          {
            label: "Functional component",
            code: `function Button({ label, onClick, disabled = false }) {\n  return (\n    <button onClick={onClick} disabled={disabled}>\n      {label}\n    </button>\n  );\n}\nexport default Button;`,
          },
        ],
      },
      {
        title: "useState",
        si: "ref",
        snips: [
          {
            label: "State patterns",
            code: `const [count, setCount] = useState(0);\nsetCount(prev => prev + 1);\n\nconst [form, setForm] = useState({ name:"", email:"" });\nsetForm(prev => ({ ...prev, name: "Alice" }));`,
          },
        ],
      },
      {
        title: "useEffect",
        si: "wave",
        snips: [
          {
            label: "Effect patterns",
            code: `useEffect(() => { fetchData(); }, []);\n\nuseEffect(() => { document.title = count; }, [count]);\n\nuseEffect(() => {\n  const timer = setInterval(tick, 1000);\n  return () => clearInterval(timer);\n}, []);`,
          },
        ],
      },
      {
        title: "Common Hooks",
        si: "hook",
        snips: [
          {
            label: "useRef, useMemo, useCallback",
            code: `const ref = useRef(null);  ref.current.focus();\n\nconst theme = useContext(ThemeContext);\n\nconst sorted = useMemo(() => items.sort(), [items]);\n\nconst onClick = useCallback(() => doSomething(id), [id]);`,
          },
        ],
      },
      {
        title: "Custom Hooks",
        si: "cust",
        snips: [
          {
            label: "useFetch example",
            code: `function useFetch(url) {\n  const [data, setData]       = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError]     = useState(null);\n\n  useEffect(() => {\n    fetch(url).then(r=>r.json())\n      .then(d=>{ setData(d); setLoading(false); })\n      .catch(e=>{ setError(e); setLoading(false); });\n  }, [url]);\n\n  return { data, loading, error };\n}`,
          },
        ],
      },
      {
        title: "Context API",
        si: "globe",
        snips: [
          {
            label: "Create & consume",
            code: `const ThemeCtx = createContext("light");\n\nfunction App() {\n  const [theme, setTheme] = useState("light");\n  return (\n    <ThemeCtx.Provider value={{ theme, setTheme }}>\n      <Children />\n    </ThemeCtx.Provider>\n  );\n}\n\nconst { theme } = useContext(ThemeCtx);`,
          },
        ],
      },
      {
        title: "Performance",
        si: "perf",
        snips: [
          {
            label: "Optimization patterns",
            code: `const Card = React.memo(({ title }) => <div>{title}</div>);\n\nconst Heavy = React.lazy(() => import("./Heavy"));\n<Suspense fallback={<Spinner />}><Heavy /></Suspense>\n\n{items.map(item => <Item key={item.id} {...item} />)}`,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Python Basics",
    category: "Language",
    icon: "python",
    level: "Beginner",
    desc: "Variables, data structures, loops, functions, file I/O, and OOP fundamentals.",
    topics: ["Syntax", "Lists", "Dicts", "Classes"],
    sections: 6,
    rule: "#3776AB",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
    data: [
      {
        title: "Variables & Types",
        si: "box",
        snips: [
          {
            label: "Built-in types",
            code: `name    = "Alice"\nage     = 25\nheight  = 5.9\nis_dev  = True\nnothing = None\n\nprint(f"Hello, {name}! Age: {age}")`,
          },
        ],
      },
      {
        title: "Lists & Tuples",
        si: "list",
        snips: [
          {
            label: "List operations",
            code: `nums = [1, 2, 3, 4, 5]\nnums.append(6)\nnums.sort()\n\nnums[1:4]   # [2,3,4]\nnums[::-1]  # reverse\n\nsquares = [x**2 for x in range(10)]`,
          },
        ],
      },
      {
        title: "Dictionaries",
        si: "obj",
        snips: [
          {
            label: "Dict operations",
            code: `user = {"name": "Alice", "age": 25}\nuser["email"] = "a@b.com"\nuser.get("phone", "N/A")\ndel user["age"]\n\nfor key, val in user.items():\n    print(f"{key}: {val}")`,
          },
        ],
      },
      {
        title: "Functions",
        si: "fn",
        snips: [
          {
            label: "def, args, lambda",
            code: `def greet(name, greeting="Hello"):\n    return f"{greeting}, {name}!"\n\ndef total(*nums): return sum(nums)\n\ndouble = lambda x: x * 2`,
          },
        ],
      },
      {
        title: "Classes & OOP",
        si: "comp",
        snips: [
          {
            label: "Class definition",
            code: `class Animal:\n    def __init__(self, name, sound):\n        self.name  = name\n        self.sound = sound\n    def speak(self):\n        return f"{self.name} says {self.sound}"\n\nclass Dog(Animal):\n    def fetch(self): return f"{self.name} fetches!"\n\ndog = Dog("Rex", "Woof")`,
          },
        ],
      },
      {
        title: "File I/O & Errors",
        si: "file",
        snips: [
          {
            label: "Read, write, try/except",
            code: `with open("file.txt", "r") as f:\n    content = f.read()\n\nwith open("file.txt", "w") as f:\n    f.write("Hello!\\n")\n\ntry:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f"Error: {e}")\nfinally:\n    print("Always runs")`,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "TypeScript Quick Ref",
    category: "Language",
    icon: "typescript",
    level: "Intermediate",
    desc: "Types, interfaces, generics, utility types, and React + TypeScript patterns.",
    topics: ["Types", "Interfaces", "Generics", "Utility"],
    sections: 5,
    rule: "#3178C6",
    lc: { color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
    data: [
      {
        title: "Primitive Types",
        si: "prim",
        snips: [
          {
            label: "Basic annotations",
            code: `let name:   string  = "Alice";\nlet age:    number  = 25;\nlet active: boolean = true;\n\nlet nums: number[]       = [1,2,3];\nlet pair: [string,number] = ["Alice",25];\nlet id:   string | number;\nlet dir:  "left"|"right"|"up";`,
          },
        ],
      },
      {
        title: "Interfaces & Types",
        si: "inter_",
        snips: [
          {
            label: "Defining shapes",
            code: `interface User {\n  id:       number;\n  name:     string;\n  email?:   string;         // optional\n  readonly createdAt: Date;\n}\n\ninterface Admin extends User { role:"admin"|"editor"; }\n\ntype Status    = "pending"|"done"|"failed";\ntype AdminUser = User & { role: string };`,
          },
        ],
      },
      {
        title: "Functions",
        si: "fn",
        snips: [
          {
            label: "Typed functions",
            code: `function add(a: number, b: number): number { return a+b; }\n\nfunction greet(name: string, msg?: string): string {\n  return \`\${msg ?? "Hello"}, \${name}\`;\n}\n\ntype Transformer<T> = (input: T) => T;\nfunction log(msg: string): void { console.log(msg); }`,
          },
        ],
      },
      {
        title: "Generics",
        si: "gen",
        snips: [
          {
            label: "Generic functions & types",
            code: `function first<T>(arr: T[]): T { return arr[0]; }\n\ninterface ApiResponse<T> {\n  data:    T;\n  status:  number;\n  message: string;\n}\n\nfunction getKey<T extends object>(obj: T, key: keyof T) {\n  return obj[key];\n}`,
          },
        ],
      },
      {
        title: "Utility Types",
        si: "util",
        snips: [
          {
            label: "Built-in utilities",
            code: `Partial<User>           // all optional\nRequired<User>          // all required\nReadonly<User>          // immutable\nPick<User,"id"|"name">  // subset keys\nOmit<User,"password">   // exclude keys\nRecord<string,number>   // key-val map\nReturnType<typeof fn>   // fn return type\nAwaited<Promise<User>>  // unwrap promise`,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Git & GitHub",
    category: "Tools",
    icon: "git",
    level: "Beginner",
    desc: "Essential Git commands for branching, merging, rebasing, and remote workflows.",
    topics: ["Commits", "Branches", "Remote", "Reset"],
    sections: 10,
    rule: "#F05032",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
   data: [
  {
    title: "Setup & Init",
    si: "gear",
    snips: [
      {
        label: "Config & init",
        code: `git config --global user.name  "Your Name"
git config --global user.email "you@email.com"

git init
git clone <url>`
      }
    ]
  },

  {
    title: "Stage & Commit",
    si: "commit",
    snips: [
      {
        label: "Saving changes",
        code: `git status
git diff
git add .
git add -p

git commit -m "feat: add login"
git commit --amend
git log --oneline --graph`
      }
    ]
  },

  {
    title: "Branches",
    si: "branch",
    snips: [
      {
        label: "Branch workflow",
        code: `git branch
git switch -c feature/auth
git switch main

git merge feature/auth
git rebase main
git branch -D feature/auth`
      }
    ]
  },

  {
    title: "Remote",
    si: "cloud",
    snips: [
      {
        label: "Push & pull",
        code: `git remote -v
git remote add origin <url>

git push -u origin main
git pull --rebase
git fetch origin`
      }
    ]
  },

  {
    title: "Undo & Reset",
    si: "undo",
    snips: [
      {
        label: "Fixing mistakes",
        code: `git restore file.txt
git restore --staged file

git revert <hash>

git reset --soft  HEAD~1
git reset --mixed HEAD~1
git reset --hard  HEAD~1`
      }
    ]
  },

  {
    title: "Stash",
    si: "stash",
    snips: [
      {
        label: "Save work temporarily",
        code: `git stash
git stash list
git stash pop
git stash apply
git stash drop`
      }
    ]
  },

  {
    title: "Logs & History",
    si: "history",
    snips: [
      {
        label: "Inspect history",
        code: `git log
git log --oneline
git log --stat
git show <hash>`
      }
    ]
  },

  {
    title: "Diff & Compare",
    si: "diff",
    snips: [
      {
        label: "Compare changes",
        code: `git diff
git diff --staged
git diff main..feature
git diff <hash1> <hash2>`
      }
    ]
  },

  {
    title: "Cherry Pick",
    si: "pick",
    snips: [
      {
        label: "Apply specific commit",
        code: `git cherry-pick <hash>
git cherry-pick --abort`
      }
    ]
  },

  {
    title: "Bisect",
    si: "search",
    snips: [
      {
        label: "Find breaking commit",
        code: `git bisect start
git bisect bad
git bisect good <hash>
git bisect reset`
      }
    ]
  }
]
  },
  {
    id: 8,
    title: "Node.js & Express",
    category: "Backend",
    icon: "nodejs",
    level: "Intermediate",
    desc: "Server setup, routing, middleware, REST patterns, and async error handling.",
    topics: ["Routes", "Middleware", "REST", "Auth"],
    sections: 10,
    rule: "#539E43",
    lc: { color: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
   data: [
  {
    title: "Express Setup",
    si: "gear",
    snips: [
      {
        label: "Basic server",
        code: `const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.listen(5000, () => console.log("Server on 5000"));`
      }
    ]
  },

  {
    title: "Routing",
    si: "route",
    snips: [
      {
        label: "Route methods",
        code: `app.get("/users", getUsers);
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

const router = express.Router();
app.use("/api", router);`
      }
    ]
  },

  {
    title: "Middleware",
    si: "arrow",
    snips: [
      {
        label: "Custom middleware",
        code: `function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  next();
}`
      }
    ]
  },

  {
    title: "Request & Response",
    si: "send",
    snips: [
      {
        label: "req & res patterns",
        code: `req.params
req.query
req.body
req.headers

res.json({ data });
res.status(404).json({ error: "Not found" });
res.redirect("/login");
res.sendFile(path);`
      }
    ]
  },

  {
    title: "Async Error Handling",
    si: "shield",
    snips: [
      {
        label: "Global handler",
        code: `const asyncHandler = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});`
      }
    ]
  },

  {
    title: "Controllers",
    si: "box",
    snips: [
      {
        label: "Controller pattern",
        code: `exports.getUsers = (req, res) => {
  res.json([]);
};

exports.createUser = (req, res) => {
  res.status(201).json(req.body);
};`
      }
    ]
  },

  {
    title: "Services",
    si: "layers",
    snips: [
      {
        label: "Business logic",
        code: `async function findUsers() {
  return User.find();
}

async function saveUser(data) {
  return User.create(data);
}`
      }
    ]
  },

  {
    title: "Validation",
    si: "check",
    snips: [
      {
        label: "Basic validation",
        code: `if (!req.body.email) {
  return res.status(400).json({ error: "Email required" });
}`
      }
    ]
  },

  {
    title: "JWT Authentication",
    si: "lock",
    snips: [
      {
        label: "Verify token",
        code: `const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
}`
      }
    ]
  },

  {
    title: "Cookies",
    si: "cookie",
    snips: [
      {
        label: "Cookie handling",
        code: `const cookieParser = require("cookie-parser");
app.use(cookieParser());

res.cookie("token", value, { httpOnly: true });
res.clearCookie("token");`
      }
    ]
  },

  {
    title: "File Upload",
    si: "upload",
    snips: [
      {
        label: "Multer setup",
        code: `const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), handler);`
      }
    ]
  },

  {
    title: "Pagination",
    si: "pages",
    snips: [
      {
        label: "Limit & offset",
        code: `const page = Number(req.query.page) || 1;
const limit = 10;
const skip = (page - 1) * limit;`
      }
    ]
  },

  {
    title: "Rate Limiting",
    si: "speed",
    snips: [
      {
        label: "Limit requests",
        code: `const rateLimit = require("express-rate-limit");

app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));`
      }
    ]
  },

  {
    title: "Environment Config",
    si: "env",
    snips: [
      {
        label: "dotenv",
        code: `require("dotenv").config();

const PORT = process.env.PORT || 5000;`
      }
    ]
  },

  {
    title: "Production Setup",
    si: "rocket",
    snips: [
      {
        label: "Prod tweaks",
        code: `app.set("trust proxy", 1);
app.disable("x-powered-by");

process.on("unhandledRejection", console.error);`
      }
    ]
  }
]
  },
  {
    id: 9,
    title: "SQL Essentials",
    category: "Database",
    icon: "sql",
    level: "Beginner",
    desc: "Core SQL — SELECT, JOIN, GROUP BY, subqueries, and schema design.",
    topics: ["SELECT", "JOINs", "Aggregation", "Schema"],
    sections: 5,
    rule: "#7C3AED",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
    data: [
      {
        title: "SELECT Basics",
        si: "search",
        snips: [
          {
            label: "Querying data",
            code: `SELECT name, email FROM users;\n\nSELECT * FROM users\nWHERE age > 18 AND active = true\nORDER BY created_at DESC\nLIMIT 10;`,
          },
        ],
      },
      {
        title: "JOINs",
        si: "join",
        snips: [
          {
            label: "Join types",
            code: `-- INNER JOIN\nSELECT u.name, o.total\nFROM users u\nINNER JOIN orders o ON u.id = o.user_id;\n\n-- LEFT JOIN\nSELECT u.name, o.total\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id;`,
          },
        ],
      },
      {
        title: "Aggregation",
        si: "bars",
        snips: [
          {
            label: "GROUP BY",
            code: `SELECT country, COUNT(*) AS total, AVG(age) AS avg_age\nFROM users\nGROUP BY country\nHAVING COUNT(*) > 5\nORDER BY total DESC;`,
          },
        ],
      },
      {
        title: "INSERT / UPDATE / DELETE",
        si: "edit",
        snips: [
          {
            label: "Write operations",
            code: `INSERT INTO users (name,email) VALUES ("Alice","a@b.com");\n\nUPDATE users SET email="new@email.com" WHERE id=42;\n\nDELETE FROM users WHERE id=42;\n\n-- UPSERT\nINSERT INTO users (id,name) VALUES (1,"Alice")\nON CONFLICT (id) DO UPDATE SET name=EXCLUDED.name;`,
          },
        ],
      },
      {
        title: "Schema Design",
        si: "table",
        snips: [
          {
            label: "CREATE TABLE",
            code: `CREATE TABLE users (\n  id         SERIAL PRIMARY KEY,\n  name       VARCHAR(100) NOT NULL,\n  email      VARCHAR(255) UNIQUE NOT NULL,\n  active     BOOLEAN DEFAULT true,\n  created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE INDEX idx_users_email ON users(email);`,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Tailwind CSS",
    category: "Frontend",
    icon: "tailwind",
    level: "Beginner",
    desc: "Utility-first classes for layout, spacing, typography, colors, and responsive design.",
    topics: ["Layout", "Spacing", "Typography", "Responsive"],
    sections: 5,
    rule: "#38BDF8",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
    data: [
      {
        title: "Layout & Flexbox",
        si: "flex",
        snips: [
          {
            label: "Common layout",
            code: `<div class="container mx-auto px-4">\n<div class="flex items-center justify-between gap-4">\n<div class="flex-1">\n\n<div class="grid grid-cols-3 gap-6">\n<div class="grid grid-cols-1 md:grid-cols-3">\n<div class="col-span-2">`,
          },
        ],
      },
      {
        title: "Spacing",
        si: "layer",
        snips: [
          {
            label: "Padding & margin",
            code: `p-4   = 16px all     px-4  = 16px L+R\npy-2  =  8px T+B     pt-8  = 32px top\nm-4   = 16px all     mx-auto = center\nmt-6  = 24px top    -mt-4  = negative\ngap-4 = 16px        gap-x-6 = horizontal`,
          },
        ],
      },
      {
        title: "Typography",
        si: "text_",
        snips: [
          {
            label: "Text utilities",
            code: `text-xs text-sm text-base text-lg text-xl\ntext-2xl text-4xl text-6xl\n\nfont-light  font-medium  font-bold  font-black\n\nleading-tight  leading-relaxed  leading-loose\ntracking-wide  uppercase  truncate`,
          },
        ],
      },
      {
        title: "Colors & Backgrounds",
        si: "color",
        snips: [
          {
            label: "Color classes",
            code: `text-blue-600    dark:text-blue-400\nbg-slate-50      dark:bg-slate-900\n\nborder border-gray-200 rounded-xl\nbg-gradient-to-r from-indigo-500 to-purple-600\nbg-black/50      text-gray-900/70`,
          },
        ],
      },
      {
        title: "Responsive & States",
        si: "phone",
        snips: [
          {
            label: "Breakpoints & pseudo",
            code: `sm:640px+  md:768px+  lg:1024px+  xl:1280px+\n\n<div class="w-full md:w-1/2 lg:w-1/3">\n<div class="hidden md:block">\n\n<button class="bg-blue-600 hover:bg-blue-700\n  focus:ring-2 active:scale-95 transition-all">`,
          },
        ],
      },
    ],
  },
  {
    id: 11,
    title: "MongoDB Essentials",
    category: "Database",
    icon: "mongodb",
    level: "Beginner",
    desc: "Document-based database basics including CRUD, queries, indexing, and schema design.",
    topics: ["CRUD", "Queries", "Indexes", "Schema"],
    sections: 5,
    rule: "#47A248",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
    data: [
      {
        title: "Collections & Documents",
        si: "db",
        snips: [
          {
            label: "Basics",
            code: `use mydb\nshow collections\n\n// Document structure\n{\n  _id: ObjectId(),\n  name: "Alice",\n  age: 25,\n  active: true\n}`,
          },
        ],
      },
      {
        title: "CRUD Operations",
        si: "edit",
        snips: [
          {
            label: "Insert / Find / Update / Delete",
            code: `db.users.insertOne({ name:"Bob", age:30 })\n\ndb.users.find({ age: { $gt: 18 } })\n\ndb.users.updateOne(\n  { name:"Bob" }, { $set: { age:31 } }\n)\n\ndb.users.deleteOne({ name:"Bob" })`,
          },
        ],
      },
      {
        title: "Query Operators",
        si: "search",
        snips: [
          {
            label: "Filters",
            code: `db.users.find({ age: { $in: [20,25] } })\ndb.users.find({ age: { $gte:18, $lte:30 } })\ndb.users.find({ name: /ali/i })\ndb.users.find({ tags: { $all:["js","react"] } })`,
          },
        ],
      },
      {
        title: "Indexes",
        si: "index",
        snips: [
          {
            label: "Performance",
            code: `db.users.createIndex({ email: 1 })\ndb.users.createIndex({ email: 1 }, { unique: true })\ndb.users.getIndexes()\ndb.users.explain().find({ email:"a@b.com" })`,
          },
        ],
      },
      {
        title: "Schema Design",
        si: "schema",
        snips: [
          {
            label: "Embed vs Reference",
            code: `// Embed — tightly related, accessed together\n{\n  user: "Alice",\n  address: { city:"Mumbai", zip:"400001" }\n}\n\n// Reference — grows independently\n{\n  user_id:    ObjectId("abc..."),\n  product_id: ObjectId("xyz...")\n}`,
          },
        ],
      },
    ],
  },
  {
    id: 12,
    title: "Linux Command Line",
    category: "Tools",
    icon: "linux",
    level: "Beginner",
    desc: "Essential Linux commands for navigation, files, permissions, and processes.",
    topics: ["Files", "Permissions", "Processes", "Networking"],
    sections: 5,
    rule: "#374151",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
    data: [
      {
        title: "File System",
        si: "folder",
        snips: [
          {
            label: "Navigation",
            code: `pwd              # print working dir\nls -la           # list all + details\ncd /home/user    # change directory\ncd ..            # go up\nmkdir app        # create folder\nrm -rf temp      # remove recursively`,
          },
        ],
      },
      {
        title: "File Operations",
        si: "edit",
        snips: [
          {
            label: "Read / Write",
            code: `cat file.txt          # print contents\nless file.txt         # page through\nnano file.txt         # edit in terminal\ncp source.txt dest.txt\nmv old.txt new.txt\nfind . -name "*.js"\ngrep -r "TODO" ./src`,
          },
        ],
      },
      {
        title: "Permissions",
        si: "lock",
        snips: [
          {
            label: "chmod & chown",
            code: `ls -l              # see permissions\nchmod 755 script.sh\nchmod +x script.sh # make executable\nchown user:group file\nsudo command       # run as root`,
          },
        ],
      },
      {
        title: "Processes",
        si: "cpu",
        snips: [
          {
            label: "Monitoring & control",
            code: `ps aux             # list all processes\ntop / htop         # interactive monitor\nkill -9 PID        # force kill\nkillall node       # kill by name\nnohup cmd &        # run in background`,
          },
        ],
      },
      {
        title: "Networking",
        si: "net",
        snips: [
          {
            label: "Ports & connections",
            code: `curl http://localhost:3000\ncurl -X POST -d '{}' http://api/endpoint\nwget https://example.com/file.zip\n\nnetstat -tulpn     # list open ports\nlsof -i :3000      # who uses port?\nssh user@host\nscp file.txt user@host:/path`,
          },
        ],
      },
    ],
  },
  {
    id: 13,
    title: "Docker Basics",
    category: "DevOps",
    icon: "docker",
    level: "Beginner",
    desc: "Container basics including images, containers, volumes, and Dockerfiles.",
    topics: ["Images", "Containers", "Volumes", "Dockerfile"],
    sections: 20,
    rule: "#2496ED",
    lc: { color: "#15803D", bg: "#F0FDF4", border: "#BBF7D0" },
   data: [
  {
    title: "Core Commands",
    si: "cmd",
    snips: [
      {
        label: "Run & manage",
        code: `docker build -t myapp .
docker run -p 3000:3000 myapp
docker run -d --name api myapp

docker ps
docker ps -a
docker stop container_id
docker rm container_id
docker exec -it container_id sh`
      }
    ]
  },

  {
    title: "Dockerfile",
    si: "file",
    snips: [
      {
        label: "Node.js example",
        code: `FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node","server.js"]`
      }
    ]
  },

  {
    title: "Images & Registry",
    si: "trash",
    snips: [
      {
        label: "Image management",
        code: `docker images
docker pull node:18
docker push user/myapp
docker tag myapp user/myapp:v1
docker rmi image_id
docker system prune`
      }
    ]
  },

  {
    title: "Volumes",
    si: "db",
    snips: [
      {
        label: "Persist data",
        code: `docker volume create mydata
docker run -v mydata:/app/data myapp
docker volume ls
docker volume inspect mydata
docker volume rm mydata`
      }
    ]
  },

  {
    title: "Bind Mounts",
    si: "mount",
    snips: [
      {
        label: "Local sync",
        code: `docker run -v $(pwd):/app myapp
docker run -v /host/path:/container/path myapp`
      }
    ]
  },

  {
    title: "Docker Compose",
    si: "layer",
    snips: [
      {
        label: "Compose file",
        code: `version: "3.8"
services:
  api:
    build: .
    ports:
      - "3000:3000"
    depends_on: [db]
  db:
    image: mongo:6
volumes:
  dbdata:`
      }
    ]
  },

  {
    title: "Compose Commands",
    si: "stack",
    snips: [
      {
        label: "Lifecycle",
        code: `docker compose up
docker compose up -d
docker compose down
docker compose build
docker compose logs`
      }
    ]
  },

  {
    title: "Networks",
    si: "net",
    snips: [
      {
        label: "Networking",
        code: `docker network ls
docker network create mynet
docker run --network mynet myapp
docker network inspect mynet`
      }
    ]
  },

  {
    title: "Ports",
    si: "port",
    snips: [
      {
        label: "Expose & map",
        code: `EXPOSE 3000
docker run -p 3000:3000 myapp
docker run -p 127.0.0.1:3000:3000 myapp`
      }
    ]
  },

  {
    title: "Environment Variables",
    si: "env",
    snips: [
      {
        label: "Env config",
        code: `docker run -e NODE_ENV=production myapp
docker run --env-file .env myapp`
      }
    ]
  },

  {
    title: "Logs",
    si: "log",
    snips: [
      {
        label: "Inspect logs",
        code: `docker logs container_id
docker logs -f container_id
docker logs --tail 50 container_id`
      }
    ]
  },

  {
    title: "Inspect & Stats",
    si: "info",
    snips: [
      {
        label: "Debug",
        code: `docker inspect container_id
docker stats
docker top container_id`
      }
    ]
  },

  {
    title: "Healthcheck",
    si: "heart",
    snips: [
      {
        label: "Health check",
        code: `HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1`
      }
    ]
  },

  {
    title: "Multi-stage Builds",
    si: "layers",
    snips: [
      {
        label: "Smaller images",
        code: `FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html`
      }
    ]
  },

  {
    title: "Caching",
    si: "cache",
    snips: [
      {
        label: "Layer cache",
        code: `COPY package*.json ./
RUN npm install
COPY . .`
      }
    ]
  },

  {
    title: "Restart Policies",
    si: "reload",
    snips: [
      {
        label: "Auto restart",
        code: `docker run --restart unless-stopped myapp`
      }
    ]
  },

  {
    title: "Resource Limits",
    si: "cpu",
    snips: [
      {
        label: "Limit usage",
        code: `docker run --memory=512m --cpus=1 myapp`
      }
    ]
  },

  {
    title: "Security",
    si: "lock",
    snips: [
      {
        label: "Hardening",
        code: `docker run --user node myapp
docker scan myapp`
      }
    ]
  },

  {
    title: "Cleanup",
    si: "clean",
    snips: [
      {
        label: "Remove unused",
        code: `docker container prune
docker image prune
docker volume prune
docker system prune -a`
      }
    ]
  },

  {
    title: "Troubleshooting",
    si: "bug",
    snips: [
      {
        label: "Fix issues",
        code: `docker run -it myapp sh
docker exec -it container_id bash
docker logs container_id`
      }
    ]
  }
]
  },
];

const CATS = [
  "All",
  "Frontend",
  "Language",
  "Backend",
  "Database",
  "DevOps",
  "Tools",
];

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="qc-code-block">
      <div className="qc-code-bar">
        <div className="qc-code-dots">
          <div className="qc-code-dot" style={{ background: "#FF5F57" }} />
          <div className="qc-code-dot" style={{ background: "#FEBC2E" }} />
          <div className="qc-code-dot" style={{ background: "#28C840" }} />
        </div>
        <button
          className={`qc-copy-btn${copied ? " copied" : ""}`}
          onClick={copy}
        >
          {copied ? "✓ copied" : "copy"}
        </button>
      </div>
      <pre className="qc-code">{code}</pre>
    </div>
  );
}

export default function CheatsheetsPage() {
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filtered = CHEATSHEETS.filter((s) => {
    const matchCat = category === "All" || s.category === category;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q) ||
      s.topics.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  const open = (s) => {
    setSelected(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const close = () => {
    setSelected(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="qc-page">
      <style>{style}</style>

      {/* HERO */}
      <header className="qc-hero">
        <div className="qc-hero-glow" />
        <div className="qc-hero-inner">
          <div className="qc-hero-eyebrow">Cheatsheets</div>
          <h1>
            Quick ref.
            <br />
            <em>No fluff.</em>
          </h1>
          <p className="qc-hero-sub">
            Copy-paste ready snippets for HTML, CSS, JavaScript, React, Python,
            Docker and more.
          </p>
          <div className="qc-hero-stats">
            {[
              { n: `${CHEATSHEETS.length}`, l: "Cheatsheets" },
              {
                n: CHEATSHEETS.reduce((a, s) => a + s.sections, 0).toString(),
                l: "Sections",
              },
              { n: "7", l: "Categories" },
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

      {/* FILTERS */}
      {!selected && (
        <div className="qc-filters">
          <div className="qc-filters-inner">
            <div className="qc-search-wrap">
              <svg
                className="qc-search-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="qc-search-input"
                type="text"
                placeholder="Search cheatsheets, topics…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="qc-cats">
              {CATS.map((c) => (
                <button
                  key={c}
                  className={`qc-cat-btn${category === c ? " active" : ""}`}
                  onClick={() => setCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GRID */}
      {!selected && (
        <div className="qc-section">
          <div className="qc-section-head">
            <span className="qc-section-title">
              {category === "All" ? "All cheatsheets" : category}
            </span>
            <span className="qc-section-count">{filtered.length} found</span>
          </div>
          <div className="qc-grid">
            {filtered.length === 0 ? (
              <div className="qc-empty">
                <p className="qc-empty-title">Nothing found.</p>
                <p>Try a different search or category.</p>
              </div>
            ) : (
              filtered.map((sheet) => (
                <div
                  key={sheet.id}
                  className="qc-card"
                  onClick={() => open(sheet)}
                >
                  <div
                    className="qc-card-rule"
                    style={{ background: sheet.rule }}
                  />
                  <div className="qc-card-body">
                    <div className="qc-card-head">
                      <div className="qc-icon">
                        <TechIcon id={sheet.icon} />
                      </div>
                      <span className="qc-badge" style={sheet.lc}>
                        {sheet.level}
                      </span>
                    </div>
                    <h3>{sheet.title}</h3>
                    <p>{sheet.desc}</p>
                    <div className="qc-meta">
                      <div className="qc-meta-cell">
                        <span className="qc-meta-val">{sheet.sections}</span>
                        <span className="qc-meta-key">Sections</span>
                      </div>
                      <div className="qc-meta-cell">
                        <span className="qc-meta-val">{sheet.category}</span>
                        <span className="qc-meta-key">Category</span>
                      </div>
                    </div>
                    <div className="qc-topics">
                      {sheet.topics.map((t) => (
                        <span key={t} className="qc-topic">
                          {t}
                        </span>
                      ))}
                    </div>
                    <button className="qc-btn">
                      Open cheatsheet
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* DETAIL */}
      {selected && (
        <div className="qc-detail-wrap">
          <button className="qc-detail-back" onClick={close}>
            <span className="qc-detail-back-icon">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </span>
            All cheatsheets
          </button>

          <div className="qc-detail-header">
            <div className="qc-detail-cat" style={{ color: selected.rule }}>
              {selected.category}
            </div>
            <h1 className="qc-detail-title">{selected.title}</h1>
            <p className="qc-detail-desc">{selected.desc}</p>
            <div className="qc-detail-byline">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "#F5F3EE",
                  border: "1px solid #E8E4DC",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TechIcon id={selected.icon} />
              </div>
              <span className="qc-badge" style={selected.lc}>
                {selected.level}
              </span>
              {selected.topics.map((t) => (
                <span key={t} className="qc-topic">
                  {t}
                </span>
              ))}
              <span
                style={{ fontSize: 12, color: "#A8A29E", marginLeft: "auto" }}
              >
                {selected.sections} sections
              </span>
            </div>
          </div>

          <div className="qc-sheet-grid">
            {selected.data.map((sec) => (
              <div key={sec.title} className="qc-sheet-block">
                <div className="qc-sheet-block-header">
                  <span className="qc-sheet-block-icon">
                    <SI k={sec.si} />
                  </span>
                  <span className="qc-sheet-block-title">{sec.title}</span>
                  <span className="qc-sheet-block-count">
                    {sec.snips.length}
                  </span>
                </div>
                {sec.snips.map((snip) => (
                  <div key={snip.label} className="qc-snippet-row">
                    <div className="qc-snippet-label">{snip.label}</div>
                    <CodeBlock code={snip.code} />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid #E8E4DC",
            }}
          >
            <button
              onClick={close}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "none",
                border: "1px solid #E8E4DC",
                borderRadius: 8,
                padding: "12px 20px",
                cursor: "pointer",
                fontFamily: "'Inter',sans-serif",
                fontSize: 12,
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#78716C",
                transition: "all .18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#1C1917";
                e.currentTarget.style.color = "#1C1917";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#E8E4DC";
                e.currentTarget.style.color = "#78716C";
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to all cheatsheets
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
