import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────
   STYLES
───────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'DM Sans',sans-serif;background:#F8F7F4;color:#1A1A1A;min-height:100vh;-webkit-font-smoothing:antialiased}
#root{min-height:100vh;display:flex;flex-direction:column}
::-webkit-scrollbar{width:4px;height:4px}
::-webkit-scrollbar-track{background:#F0EEE9}
::-webkit-scrollbar-thumb{background:#D5D2CC;border-radius:4px}
::-webkit-scrollbar-thumb:hover{background:#6366F1}

.topnav{height:56px;border-bottom:1.5px solid #E9E7E3;background:rgba(248,247,244,.92);backdrop-filter:blur(12px);position:sticky;top:0;z-index:50;display:flex;align-items:center;padding:0 24px;gap:12px}
.brand{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;color:#0F0F0F;display:flex;align-items:center;gap:7px;cursor:pointer;text-decoration:none}
.brand-dot{width:8px;height:8px;border-radius:50%;background:linear-gradient(135deg,#6366F1,#10B981)}
.topnav-links{display:flex;gap:2px;margin-left:20px}
.topnav-link{padding:6px 14px;border-radius:8px;border:none;background:none;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:500;color:#6B6863;cursor:pointer;transition:all .15s}
.topnav-link:hover{color:#0F0F0F;background:#F0EEE9}
.topnav-link.active{color:#0F0F0F;background:#ECEAE6}
.topnav-spacer{flex:1}
.gh-btn{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:9px;border:1.5px solid #E5E3DE;background:#fff;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:500;color:#3D3B37;cursor:pointer;transition:all .15s}
.gh-btn:hover{border-color:#6366F1;color:#6366F1}

.page-layout{display:flex;flex:1;min-height:0}

.sidebar{width:236px;flex-shrink:0;border-right:1.5px solid #E9E7E3;background:#fff;position:sticky;top:56px;height:calc(100vh - 56px);overflow-y:auto;display:flex;flex-direction:column}
.sidebar::-webkit-scrollbar{width:3px}
.sb-search-wrap{padding:14px 12px;border-bottom:1px solid #F0EEE9}
.sb-search{display:flex;align-items:center;gap:8px;background:#F8F7F4;border:1.5px solid #E9E7E3;border-radius:9px;padding:7px 11px}
.sb-search input{background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:13px;color:#1A1A1A;flex:1;width:100%}
.sb-search input::placeholder{color:#B0ACA6}
.sb-nav{padding:10px 8px 20px}
.sb-section{font-size:10px;font-weight:600;letter-spacing:.9px;text-transform:uppercase;color:#B0ACA6;padding:10px 8px 4px}
.sb-item{display:flex;align-items:center;justify-content:space-between;width:100%;padding:7px 10px;border-radius:8px;border:none;background:none;cursor:pointer;font-family:'DM Sans',sans-serif;font-size:13.5px;font-weight:400;color:#6B6863;transition:all .13s;text-align:left}
.sb-item:hover{color:#0F0F0F;background:#F5F4F1}
.sb-item.active{color:#0F0F0F;background:#F0EEE9;font-weight:600}
.sb-item.active .sb-count{background:#0F0F0F;color:#fff;border-color:#0F0F0F}
.sb-count{font-size:10.5px;font-weight:600;padding:2px 8px;border-radius:100px;background:#F5F4F1;color:#9E9B95;border:1px solid #E9E7E3;min-width:24px;text-align:center}

.main-scroll{flex:1;overflow-y:auto;display:flex;flex-direction:column}
.main-content{max-width:960px;padding:40px 40px 80px;width:100%}
@media(max-width:900px){.sidebar{display:none}.main-content{padding:24px 20px 60px}}

.page-hero{background:#0F0F0F;color:#fff;padding:72px 40px 64px;position:relative;overflow:hidden}
.page-hero::before{content:'';position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 60% 80% at 80% 50%,rgba(99,102,241,.18) 0%,transparent 70%),radial-gradient(ellipse 40% 60% at 20% 20%,rgba(16,185,129,.12) 0%,transparent 60%)}
.page-hero-inner{max-width:960px;margin:0 auto;position:relative;z-index:1}
.eyebrow{font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:20px;display:flex;align-items:center;gap:10px}
.eyebrow::before{content:'';display:block;width:28px;height:1px;background:rgba(255,255,255,.3)}
.hero-h1{font-family:'Syne',sans-serif;font-size:clamp(36px,6vw,62px);font-weight:800;line-height:1.0;letter-spacing:-.03em;margin:0 0 18px;color:#fff}
.hero-h1 span{background:linear-gradient(135deg,#6366F1,#10B981);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.hero-sub{font-size:16px;color:rgba(255,255,255,.5);max-width:440px;line-height:1.65;font-weight:300;margin-bottom:44px}
.hero-stats{display:flex;gap:40px;flex-wrap:wrap}
.stat{display:flex;flex-direction:column;gap:2px}
.stat-num{font-family:'Syne',sans-serif;font-size:26px;font-weight:700;color:#fff;letter-spacing:-.02em}
.stat-label{font-size:11.5px;color:rgba(255,255,255,.4);letter-spacing:.04em}

.toolbar{max-width:960px;margin:0 auto;padding:28px 40px 0;display:flex;align-items:center;gap:12px;flex-wrap:wrap}
@media(max-width:900px){.toolbar{padding:20px 20px 0}}
.search-box{position:relative;flex:1;min-width:180px;max-width:300px}
.search-box input{width:100%;padding:9px 12px 9px 36px;border:1.5px solid #E5E3DE;border-radius:10px;background:#fff;font-family:'DM Sans',sans-serif;font-size:13.5px;color:#1A1A1A;outline:none;transition:border-color .2s;box-sizing:border-box}
.search-box input:focus{border-color:#6366F1}
.search-box input::placeholder{color:#B0ACA6}
.search-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:#B0ACA6;font-size:14px;pointer-events:none}
.filter-row{display:flex;gap:6px;flex-wrap:wrap}
.filter-btn{padding:7px 15px;border-radius:8px;border:1.5px solid #E5E3DE;background:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#6B6863;cursor:pointer;transition:all .18s;white-space:nowrap}
.filter-btn:hover{border-color:#6366F1;color:#6366F1}
.filter-btn.active{background:#0F0F0F;border-color:#0F0F0F;color:#fff}
.results-label{margin-left:auto;font-size:12.5px;color:#B0ACA6;white-space:nowrap}

.comp-groups{max-width:960px;margin:0 auto;padding:32px 40px 80px}
@media(max-width:900px){.comp-groups{padding:24px 20px 60px}}
.comp-group{margin-bottom:48px}
.group-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;padding-bottom:14px;border-bottom:1.5px solid #E9E7E3}
.group-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#0F0F0F;letter-spacing:-.02em;display:flex;align-items:center;gap:10px}
.group-emoji{font-size:20px}
.group-badge{font-size:11px;font-weight:600;padding:3px 9px;border-radius:100px;background:#F5F4F1;color:#6B6863;border:1px solid #E9E7E3}
.group-desc{font-size:13px;color:#9E9B95}

.variant-row{background:#fff;border:1.5px solid #E9E7E3;border-radius:14px;overflow:hidden;margin-bottom:12px;transition:border-color .2s,box-shadow .2s}
.variant-row:hover{border-color:#D5D2CC;box-shadow:0 4px 16px rgba(0,0,0,.05)}
.vr-header{display:flex;align-items:center;justify-content:space-between;padding:14px 18px;cursor:pointer;user-select:none;border-bottom:1.5px solid transparent;transition:border-color .15s}
.vr-header.open{border-bottom-color:#F0EEE9}
.vr-left{display:flex;align-items:center;gap:12px}
.vr-num{font-size:11px;font-weight:700;color:#B0ACA6;font-family:'DM Mono',monospace;min-width:22px}
.vr-name{font-family:'Syne',sans-serif;font-size:14.5px;font-weight:700;color:#0F0F0F}
.vr-tag{font-size:11px;padding:2px 8px;border-radius:5px;background:#F5F4F1;color:#6B6863;font-weight:500;border:1px solid #ECEAE6}
.vr-right{display:flex;align-items:center;gap:8px}
.vr-chevron{color:#B0ACA6;font-size:13px;transition:transform .2s}
.vr-chevron.open{transform:rotate(180deg)}
.vr-body{background:#FAFAF8}
.vr-preview{padding:32px 28px;min-height:120px;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:12px;border-bottom:1.5px solid #F0EEE9;position:relative;background:radial-gradient(circle at 20% 50%,rgba(99,102,241,.04) 0%,transparent 50%),#FAFAF8}
.vr-code-tabs{display:flex;gap:0;padding:0 18px;background:#F5F4F1;border-bottom:1px solid #ECEAE6}
.vr-code-tab{padding:9px 14px;background:none;border:none;border-bottom:2px solid transparent;margin-bottom:-1px;font-family:'DM Sans',sans-serif;font-size:12.5px;font-weight:600;color:#9E9B95;cursor:pointer;transition:all .13s}
.vr-code-tab:hover{color:#6B6863}
.vr-code-tab.active{color:#0F0F0F;border-bottom-color:#6366F1}
.vr-code-copy{margin-left:auto;padding:7px 12px;background:none;border:none;font-family:'DM Sans',sans-serif;font-size:11.5px;font-weight:600;color:#9E9B95;cursor:pointer;transition:color .13s;display:flex;align-items:center;gap:5px}
.vr-code-copy:hover{color:#0F0F0F}
.vr-code-copy.done{color:#10B981}
.vr-code-body{padding:18px 20px;overflow-x:auto;background:#1A1A24;font-family:'DM Mono',monospace;font-size:12.5px;line-height:1.75;color:#ABB2BF;max-height:340px;overflow-y:auto}
.vr-code-body pre{margin:0;white-space:pre}
.vr-code-body::-webkit-scrollbar{width:3px;height:3px}
.vr-code-body::-webkit-scrollbar-thumb{background:#3D3D50;border-radius:4px}

.sk{color:#C678DD}.ss{color:#98C379}.sn{color:#D19A66}.sc{color:#5C6370;font-style:italic}.sa{color:#61AFEF}.sp{color:#E06C75}

.lvl-beginner{background:#ECFDF5;color:#059669;border:1px solid #A7F3D0}
.lvl-intermediate{background:#FFF7ED;color:#D97706;border:1px solid #FCD34D}
.lvl-advanced{background:#FEF2F2;color:#DC2626;border:1px solid #FCA5A5}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:7px;font-family:'DM Sans',sans-serif;font-weight:600;cursor:pointer;border-radius:9px;transition:all .18s;border:none;font-size:13.5px;padding:9px 20px}
.btn-primary{background:#0F0F0F;color:#fff}
.btn-primary:hover{background:#2D2D2D;transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,0,0,.2)}
.btn-indigo{background:#6366F1;color:#fff}
.btn-indigo:hover{background:#4F46E5;transform:translateY(-1px);box-shadow:0 8px 20px rgba(99,102,241,.35)}
.btn-outline{background:transparent;color:#0F0F0F;border:1.5px solid #D5D2CC}
.btn-outline:hover{border-color:#6366F1;color:#6366F1;background:#F5F4FF}
.btn-ghost{background:transparent;color:#6B6863;border:none}
.btn-ghost:hover{background:#F5F4F1;color:#0F0F0F}
.btn-danger{background:#EF4444;color:#fff}
.btn-danger:hover{background:#DC2626;transform:translateY(-1px);box-shadow:0 8px 20px rgba(239,68,68,.3)}
.btn-green{background:#10B981;color:#fff}
.btn-green:hover{background:#059669;transform:translateY(-1px);box-shadow:0 8px 20px rgba(16,185,129,.3)}
.btn-sm{padding:6px 14px;font-size:12px;border-radius:7px}
.btn-lg{padding:12px 28px;font-size:15px;border-radius:11px}
.btn-icon-only{padding:9px;border-radius:9px}
.spin{width:14px;height:14px;border:2px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .6s linear infinite;flex-shrink:0}

.badge{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:100px;font-family:'DM Sans',sans-serif;letter-spacing:.01em}
.badge-default{background:#F5F4F1;color:#6B6863;border:1.5px solid #E5E3DE}
.badge-success{background:#ECFDF5;color:#059669;border:1.5px solid #A7F3D0}
.badge-warning{background:#FFFBEB;color:#D97706;border:1.5px solid #FCD34D}
.badge-error{background:#FEF2F2;color:#DC2626;border:1.5px solid #FCA5A5}
.badge-info{background:#EFF6FF;color:#2563EB;border:1.5px solid #BFDBFE}
.badge-purple{background:#F5F3FF;color:#7C3AED;border:1.5px solid #DDD6FE}
.badge-dot{width:6px;height:6px;border-radius:50%;background:currentColor}
.badge-sm{font-size:10px;padding:2px 7px}
.badge-lg{font-size:13px;padding:4px 13px;border-radius:8px}

.inp-group{display:flex;flex-direction:column;gap:5px;width:100%;max-width:300px}
.inp-label{font-size:12.5px;font-weight:600;color:#3D3B37}
.inp-wrap{position:relative}
.inp{width:100%;padding:9px 13px;border:1.5px solid #E5E3DE;border-radius:9px;background:#fff;font-family:'DM Sans',sans-serif;font-size:13.5px;color:#1A1A1A;outline:none;transition:all .18s;box-sizing:border-box}
.inp::placeholder{color:#B0ACA6}
.inp:focus{border-color:#6366F1;box-shadow:0 0 0 3px rgba(99,102,241,.1)}
.inp.err{border-color:#EF4444;box-shadow:0 0 0 3px rgba(239,68,68,.08)}
.inp.success{border-color:#10B981;box-shadow:0 0 0 3px rgba(16,185,129,.08)}
.inp-icon-l{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:#B0ACA6;font-size:14px;pointer-events:none}
.inp-icon-r{position:absolute;right:11px;top:50%;transform:translateY(-50%);color:#B0ACA6;font-size:14px;cursor:pointer}
.inp-pl{padding-left:34px}
.inp-pr{padding-right:34px}
.inp-hint{font-size:11.5px;color:#9E9B95}
.inp-err-msg{font-size:11.5px;color:#EF4444}
.inp-ok-msg{font-size:11.5px;color:#10B981}

.av{border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-family:'DM Sans',sans-serif;overflow:hidden;flex-shrink:0;position:relative;border:2px solid #E9E7E3}
.av-xs{width:24px;height:24px;font-size:9px}
.av-sm{width:32px;height:32px;font-size:11px}
.av-md{width:40px;height:40px;font-size:14px}
.av-lg{width:52px;height:52px;font-size:18px}
.av-xl{width:68px;height:68px;font-size:22px}
.av-group{display:flex}
.av-group .av{margin-left:-10px;border:2.5px solid #fff}
.av-group .av:first-child{margin-left:0}
.av-status{position:absolute;bottom:1px;right:1px;width:9px;height:9px;border-radius:50%;border:2px solid #fff}
.av-online{background:#10B981}.av-away{background:#FBBF24}.av-offline{background:#D1D5DB}
.av-sq{border-radius:10px}

.c-card{background:#fff;border:1.5px solid #E9E7E3;border-radius:14px;overflow:hidden;transition:all .22s cubic-bezier(.34,1.56,.64,1)}
.c-card:hover{transform:translateY(-3px);box-shadow:0 16px 36px rgba(0,0,0,.08);border-color:transparent}
.c-card-img{width:100%;height:100px;display:flex;align-items:center;justify-content:center;font-size:28px}
.c-card-body{padding:14px 16px}
.c-card-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:#0F0F0F;margin-bottom:4px}
.c-card-text{font-size:12.5px;color:#6B6863;line-height:1.55;font-weight:300}
.c-card-footer{padding:10px 16px;border-top:1px solid #F0EEE9;display:flex;align-items:center;justify-content:space-between}
.c-card-meta{font-size:11.5px;color:#9E9B95}

.modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.4);backdrop-filter:blur(5px);z-index:200;display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .15s ease}
.modal-box{background:#fff;border:1.5px solid #E9E7E3;border-radius:16px;width:440px;max-width:100%;box-shadow:0 32px 80px rgba(0,0,0,.18);animation:slideUp .2s ease;overflow:hidden}
.modal-header{display:flex;align-items:flex-start;justify-content:space-between;padding:20px 22px 16px}
.modal-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:#0F0F0F;margin-bottom:3px}
.modal-sub{font-size:13px;color:#9E9B95}
.modal-close{width:28px;height:28px;border-radius:8px;border:1.5px solid #E5E3DE;background:#F8F7F4;color:#6B6863;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .13s;font-family:inherit}
.modal-close:hover{background:#ECEAE6;color:#0F0F0F}
.modal-body{padding:0 22px 18px;font-size:13.5px;color:#6B6863;line-height:1.65}
.modal-footer{padding:14px 22px;border-top:1.5px solid #F0EEE9;display:flex;gap:8px;justify-content:flex-end}

.tabs-wrap{background:#fff;border:1.5px solid #E9E7E3;border-radius:12px;overflow:hidden;width:100%;max-width:400px}
.tabs-list{display:flex;border-bottom:1.5px solid #F0EEE9;background:#FAFAF8}
.tab-btn{flex:1;padding:10px 12px;background:none;border:none;border-bottom:2.5px solid transparent;margin-bottom:-1.5px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#9E9B95;cursor:pointer;transition:all .15s;white-space:nowrap}
.tab-btn:hover{color:#6B6863}
.tab-btn.act{color:#0F0F0F;border-bottom-color:#6366F1}
.tab-panel{padding:16px;font-size:13px;color:#6B6863;line-height:1.6}
.tabs-pill-wrap{display:inline-flex;background:#F5F4F1;border:1.5px solid #E9E7E3;padding:3px;border-radius:10px}
.tab-pill{padding:6px 16px;border-radius:7px;border:none;background:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;color:#9E9B95;cursor:pointer;transition:all .15s}
.tab-pill:hover{color:#6B6863}
.tab-pill.act{background:#fff;color:#0F0F0F;box-shadow:0 2px 8px rgba(0,0,0,.08)}

.nav-bar{background:#fff;border:1.5px solid #E9E7E3;border-radius:12px;display:flex;align-items:center;padding:0 16px;height:52px;gap:4px;width:100%;max-width:480px}
.nav-logo{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:#0F0F0F;margin-right:8px;display:flex;align-items:center;gap:6px}
.nav-dot{width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,#6366F1,#10B981)}
.nav-link-item{padding:5px 11px;border-radius:7px;border:none;background:none;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#6B6863;cursor:pointer;transition:all .13s}
.nav-link-item:hover{color:#0F0F0F;background:#F5F4F1}
.nav-link-item.act{color:#0F0F0F;background:#F0EEE9;font-weight:600}
.nav-spacer{flex:1}

.sp{border-radius:50%;border:3px solid #F0EEE9;border-top-color:#6366F1;animation:spin .8s linear infinite}
.sp-sm{width:20px;height:20px;border-width:2px}
.sp-md{width:32px;height:32px}
.sp-lg{width:44px;height:44px;border-width:4px}
.dots-wrap{display:flex;gap:6px}
.dot{width:9px;height:9px;border-radius:50%;background:#6366F1;animation:dotBounce .7s ease-in-out infinite}
.dot:nth-child(2){animation-delay:.15s}.dot:nth-child(3){animation-delay:.3s}
.prog-track{height:6px;background:#F0EEE9;border-radius:100px;overflow:hidden;width:180px}
.sk-line{height:12px;border-radius:6px;background:linear-gradient(90deg,#F0EEE9 25%,#E5E3DE 50%,#F0EEE9 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}
.sk-circle{border-radius:50%;background:linear-gradient(90deg,#F0EEE9 25%,#E5E3DE 50%,#F0EEE9 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}

.fp-footer{background:#0F0F0F;color:#fff;border-radius:12px;padding:20px 22px;width:100%;max-width:480px}
.fp-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:#fff;display:flex;align-items:center;gap:6px;margin-bottom:6px}
.fp-dot{width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,#6366F1,#10B981)}
.fp-tagline{font-size:12px;color:rgba(255,255,255,.4);margin-bottom:16px}
.fp-links{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px}
.fp-link{font-size:12.5px;color:rgba(255,255,255,.5);cursor:pointer;transition:color .13s}
.fp-link:hover{color:#fff}
.fp-divider{height:1px;background:rgba(255,255,255,.08);margin:12px 0}
.fp-copy{font-size:11.5px;color:rgba(255,255,255,.3)}
.fp-social{display:flex;gap:8px}
.fp-social-btn{width:28px;height:28px;border-radius:7px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;font-size:12px;cursor:pointer;color:rgba(255,255,255,.5);transition:all .13s}
.fp-social-btn:hover{border-color:rgba(99,102,241,.6);color:#A5B4FC}

.empty-state{text-align:center;padding:60px 24px;color:#9E9B95}
.empty-state h3{font-family:'Syne',sans-serif;font-size:18px;color:#3D3B37;margin-bottom:8px}

@keyframes spin{to{transform:rotate(360deg)}}
@keyframes dotBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.45}}
`;

/* ─────────────────────────────────────────────────────────────────
   SYNTAX HIGHLIGHTER
───────────────────────────────────────────────────────────────── */
function hi(code) {
  return code
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/\b(import|export|from|default|const|let|var|function|return|if|else|async|await|true|false|null|undefined|class|new|for|of|in|type|interface|extends)\b/g,'<span class="sk">$1</span>')
    .replace(/(\/\/[^\n]*)/g,'<span class="sc">$1</span>')
    .replace(/(\/\*[\s\S]*?\*\/)/g,'<span class="sc">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,'<span class="ss">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g,'<span class="sn">$1</span>');
}

/* ─────────────────────────────────────────────────────────────────
   CODE PANEL
───────────────────────────────────────────────────────────────── */
function CodePanel({ react, html }) {
  const [lang, setLang] = useState("react");
  const [copied, setCopied] = useState(false);
  const code = lang === "react" ? react : html;
  const copy = () => {
    try { navigator.clipboard.writeText(code); } catch(e){}
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div>
      <div className="vr-code-tabs">
        {["react","html"].map(t => (
          <button key={t} onClick={() => setLang(t)} className={`vr-code-tab${lang===t?" active":""}`}>
            {t === "react" ? "React" : "HTML"}
          </button>
        ))}
        <button className={`vr-code-copy${copied?" done":""}`} onClick={copy}>
          {copied ? "✓ Copied" : "⧉ Copy"}
        </button>
      </div>
      <div className="vr-code-body">
        <pre dangerouslySetInnerHTML={{ __html: hi(code) }}/>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   VARIANT ROW
───────────────────────────────────────────────────────────────── */
function VariantRow({ num, name, tag, level, preview, react, html, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen || false);
  return (
    <div className="variant-row">
      <div className={`vr-header${open?" open":""}`} onClick={() => setOpen(!open)}>
        <div className="vr-left">
          <span className="vr-num">#{String(num).padStart(2,"0")}</span>
          <span className="vr-name">{name}</span>
          {tag && <span className="vr-tag">{tag}</span>}
          {level && <span className={`badge badge-sm lvl-${level.toLowerCase()}`}>{level}</span>}
        </div>
        <div className="vr-right">
          <span className={`vr-chevron${open?" open":""}`}>▼</span>
        </div>
      </div>
      {open && (
        <div className="vr-body">
          <div className="vr-preview">{preview}</div>
          <CodePanel react={react} html={html}/>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BUTTON PREVIEWS
───────────────────────────────────────────────────────────────── */
function ButtonLoadingPreview() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <button className="btn btn-primary" onClick={handleClick} disabled={loading} style={{ minWidth: 140 }}>
      {loading ? <><span className="spin"/> Saving…</> : "Save Changes"}
    </button>
  );
}

function ButtonGroupPreview() {
  const [active, setActive] = useState(0);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12, alignItems:"center" }}>
      <div style={{ display:"flex", background:"#F5F4F1", padding:3, borderRadius:9, border:"1.5px solid #E9E7E3" }}>
        {["Monthly","Annual","Lifetime"].map((l,i) => (
          <button key={i} onClick={() => setActive(i)} style={{
            padding:"7px 16px", borderRadius:7, border:"none",
            background: active===i ? "#fff" : "transparent",
            color: active===i ? "#0F0F0F" : "#6B6863",
            fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:600, cursor:"pointer",
            boxShadow: active===i ? "0 2px 8px rgba(0,0,0,.1)" : "none", transition:"all .15s"
          }}>{l}</button>
        ))}
      </div>
      <div style={{ display:"flex", overflow:"hidden", borderRadius:9, border:"1.5px solid #E9E7E3" }}>
        {["Left","Center","Right"].map((l,i) => (
          <button key={i} style={{
            padding:"8px 16px", border:"none", borderLeft: i>0 ? "1px solid #E9E7E3" : "none",
            background:"#fff", color:"#6B6863", fontFamily:"'DM Sans',sans-serif",
            fontSize:13, fontWeight:500, cursor:"pointer", transition:"all .13s"
          }}
            onMouseEnter={e => e.currentTarget.style.background="#F5F4F1"}
            onMouseLeave={e => e.currentTarget.style.background="#fff"}
          >{l}</button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   BADGE PREVIEWS
───────────────────────────────────────────────────────────────── */
function NotificationCountersPreview() {
  const [count, setCount] = useState(5);
  return (
    <div style={{ display:"flex", gap:20, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
      {[["Messages",count,"badge-error"],["Notifications",12,"badge-purple"],["Updates",3,"badge-warning"]].map(([label,n,cls]) => (
        <div key={label} style={{ position:"relative", display:"inline-block" }}>
          <button className="btn btn-outline btn-sm">{label}</button>
          <span className={`badge ${cls} badge-sm`} style={{
            position:"absolute", top:-8, right:-8, minWidth:18, height:18,
            padding:"0 5px", display:"flex", alignItems:"center", justifyContent:"center"
          }}>{n > 9 ? "9+" : n}</span>
        </div>
      ))}
      <div style={{ display:"flex", gap:8 }}>
        <button className="btn btn-sm btn-indigo" onClick={() => setCount(c => Math.min(c+1,15))}>+</button>
        <button className="btn btn-sm btn-outline" onClick={() => setCount(c => Math.max(c-1,0))}>−</button>
      </div>
    </div>
  );
}

function PillTagsPreview() {
  const allTags = ["React","TypeScript","Next.js","Tailwind","Node.js"];
  const [tags, setTags] = useState(allTags);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"center" }}>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center" }}>
        {tags.map(t => (
          <span key={t} className="badge badge-default" style={{ paddingRight:5, fontSize:12 }}>
            {t}
            <button onClick={() => setTags(tags.filter(x => x!==t))} style={{
              background:"none", border:"none", cursor:"pointer",
              color:"#9E9B95", fontSize:13, lineHeight:1, padding:"0 0 0 3px"
            }}>×</button>
          </span>
        ))}
        {tags.length === 0 && <span style={{ fontSize:12.5, color:"#B0ACA6", fontStyle:"italic" }}>All tags removed</span>}
      </div>
      {tags.length < allTags.length && (
        <button className="btn btn-ghost btn-sm" onClick={() => setTags(allTags)}>↺ Reset</button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   INPUT PREVIEWS
───────────────────────────────────────────────────────────────── */
function DefaultStatesPreview() {
  const [v, setV] = useState("");
  const err = v.length > 0 && v.length < 3;
  return (
    <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
      <div className="inp-group">
        <label className="inp-label">Email</label>
        <div className="inp-wrap">
          <span className="inp-icon-l">✉</span>
          <input className="inp inp-pl" placeholder="you@example.com" type="email"/>
        </div>
        <span className="inp-hint">We'll never share your email.</span>
      </div>
      <div className="inp-group">
        <label className="inp-label">Username</label>
        <input className={`inp${err?" err":""}`} value={v} onChange={e => setV(e.target.value)} placeholder="your_username"/>
        {err
          ? <span className="inp-err-msg">Min 3 characters</span>
          : <span className="inp-hint">Letters and numbers only</span>
        }
      </div>
    </div>
  );
}

function SearchInputPreview() {
  const [q, setQ] = useState("");
  return (
    <div className="inp-group" style={{ width:"100%", maxWidth:340 }}>
      <div className="inp-wrap">
        <span className="inp-icon-l">🔍</span>
        <input className="inp inp-pl inp-pr" value={q} onChange={e => setQ(e.target.value)} placeholder="Search components…"/>
        {q && (
          <button className="inp-icon-r" onClick={() => setQ("")}
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#B0ACA6", fontFamily:"inherit" }}>
            ×
          </button>
        )}
      </div>
    </div>
  );
}

function PasswordInputPreview() {
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3;
  const colors = ["#E9E7E3","#EF4444","#FBBF24","#10B981"];
  const labels = ["","Weak","Medium","Strong"];
  return (
    <div className="inp-group" style={{ width:"100%", maxWidth:300 }}>
      <label className="inp-label">Password</label>
      <div className="inp-wrap">
        <input className="inp inp-pr" type={show?"text":"password"} value={pw}
          onChange={e => setPw(e.target.value)} placeholder="Enter password"/>
        <button className="inp-icon-r" onClick={() => setShow(!show)}
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:16, color:"#B0ACA6", fontFamily:"inherit" }}>
          {show ? "🙈" : "👁"}
        </button>
      </div>
      <div style={{ display:"flex", gap:4, marginTop:2 }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ flex:1, height:3, borderRadius:3,
            background: strength>=i ? colors[strength] : "#E9E7E3", transition:"background .3s" }}/>
        ))}
      </div>
      {pw.length > 0 && <span className="inp-hint" style={{ color:colors[strength] }}>{labels[strength]} password</span>}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   MODAL PREVIEWS
───────────────────────────────────────────────────────────────── */
function BasicModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <div className="modal-backdrop" onClick={e => e.target===e.currentTarget && setOpen(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <div className="modal-title">Welcome back 👋</div>
                <div className="modal-sub">Sign in to your account to continue.</div>
              </div>
              <button className="modal-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="inp-group" style={{ marginBottom:10 }}>
                <label className="inp-label">Email</label>
                <input className="inp" type="email" placeholder="you@example.com"/>
              </div>
              <div className="inp-group">
                <label className="inp-label">Password</label>
                <input className="inp" type="password" placeholder="••••••••"/>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Sign in</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ConfirmModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-danger" onClick={() => setOpen(true)}>Delete Project</button>
      {open && (
        <div className="modal-backdrop" onClick={e => e.target===e.currentTarget && setOpen(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <div style={{ width:44, height:44, borderRadius:12, background:"#FEF2F2",
                  border:"1.5px solid #FCA5A5", display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:22, marginBottom:10 }}>🗑</div>
                <div className="modal-title">Delete project?</div>
                <div className="modal-sub">This action cannot be undone.</div>
              </div>
              <button className="modal-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              Permanently deleting <strong>my-project</strong> will remove all 48 files and associated data.
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn btn-danger btn-sm" onClick={() => setOpen(false)}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function AlertModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-indigo" onClick={() => setOpen(true)}>Show Alert</button>
      {open && (
        <div className="modal-backdrop" onClick={() => setOpen(false)}>
          <div className="modal-box" style={{ maxWidth:360 }}>
            <div style={{ padding:"28px 24px", textAlign:"center" }}>
              <div style={{ fontSize:44, marginBottom:14 }}>🎉</div>
              <div className="modal-title" style={{ textAlign:"center", marginBottom:8 }}>You're all set!</div>
              <p style={{ fontSize:13.5, color:"#6B6863", lineHeight:1.6, marginBottom:20 }}>
                Your project has been deployed successfully. You can view it at your custom domain.
              </p>
              <button className="btn btn-indigo" style={{ width:"100%" }} onClick={() => setOpen(false)}>
                View project →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FormModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-outline" onClick={() => setOpen(true)}>+ New Component</button>
      {open && (
        <div className="modal-backdrop" onClick={e => e.target===e.currentTarget && setOpen(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <div className="modal-title">Create component</div>
                <div className="modal-sub">Add a new component to your library.</div>
              </div>
              <button className="modal-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="modal-body" style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div className="inp-group">
                <label className="inp-label">Name</label>
                <input className="inp" placeholder="e.g. DatePicker"/>
              </div>
              <div className="inp-group">
                <label className="inp-label">Category</label>
                <select className="inp" style={{ appearance:"none" }}>
                  {["Inputs","Display","Navigation","Feedback"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="inp-group">
                <label className="inp-label">Description</label>
                <textarea className="inp" rows={2} placeholder="What does this component do?" style={{ resize:"vertical" }}/>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={() => setOpen(false)}>Create</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function BottomSheetPreview() {
  const [open, setOpen] = useState(false);
  const items = [["🔗","Copy link","Copy the direct URL"],["📧","Email","Send via email"],["🐦","Twitter","Share on X (Twitter)"]];
  return (
    <>
      <button className="btn btn-outline" onClick={() => setOpen(true)}>Open Bottom Sheet</button>
      {open && (
        <div className="modal-backdrop" style={{ alignItems:"flex-end", padding:0 }}
          onClick={e => e.target===e.currentTarget && setOpen(false)}>
          <div style={{
            background:"#fff", borderRadius:"16px 16px 0 0", padding:"12px 22px 32px",
            width:"100%", maxWidth:"100%", animation:"slideUp .25s ease", borderTop:"1.5px solid #E9E7E3"
          }}>
            <div style={{ width:40, height:4, borderRadius:2, background:"#E5E3DE", margin:"0 auto 16px" }}/>
            <div className="modal-title" style={{ marginBottom:4 }}>Share options</div>
            <div className="modal-sub" style={{ marginBottom:16 }}>Choose how to share this component</div>
            {items.map(([ico,l,d]) => (
              <div key={l} onClick={() => setOpen(false)}
                style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 4px",
                  borderBottom:"1px solid #F5F4F1", cursor:"pointer" }}
                onMouseOver={e => e.currentTarget.style.background="#FAFAF8"}
                onMouseOut={e => e.currentTarget.style.background="transparent"}>
                <div style={{ width:36, height:36, borderRadius:9, background:"#F5F4F1",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>{ico}</div>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#0F0F0F" }}>{l}</div>
                  <div style={{ fontSize:12, color:"#9E9B95" }}>{d}</div>
                </div>
              </div>
            ))}
            <button className="btn btn-ghost" style={{ width:"100%", marginTop:12 }} onClick={() => setOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────
   TAB PREVIEWS
───────────────────────────────────────────────────────────────── */
function UnderlineTabsPreview() {
  const [a, setA] = useState(0);
  const ts = [
    { l:"Overview", c:"Get started quickly with zero configuration. Full TypeScript and WCAG 2.1 AA support." },
    { l:"Components", c:"Browse 48+ production-ready components across 11 categories." },
    { l:"Theming", c:"Customize every design token using CSS variables. Light and dark mode." }
  ];
  return (
    <div className="tabs-wrap">
      <div className="tabs-list">
        {ts.map((t,i) => <button key={i} onClick={() => setA(i)} className={`tab-btn${a===i?" act":""}`}>{t.l}</button>)}
      </div>
      <div className="tab-panel">{ts[a].c}</div>
    </div>
  );
}

function PillTabsPreview() {
  const [a, setA] = useState(0);
  const ts = ["All","Active","Archived","Draft"];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14, alignItems:"center", width:"100%" }}>
      <div className="tabs-pill-wrap">
        {ts.map((t,i) => <button key={i} onClick={() => setA(i)} className={`tab-pill${a===i?" act":""}`}>{t}</button>)}
      </div>
      <div style={{ fontSize:13, color:"#6B6863", background:"#F8F7F4", borderRadius:9,
        padding:"10px 16px", width:"100%", textAlign:"center" }}>
        Showing <strong style={{ color:"#0F0F0F" }}>{ts[a]}</strong> components
      </div>
    </div>
  );
}

function IconTabsPreview() {
  const [a, setA] = useState(0);
  const ts = [{ l:"📊 Analytics" },{ l:"⚙ Settings" },{ l:"👥 Team" },{ l:"💳 Billing" }];
  return (
    <div className="tabs-wrap" style={{ maxWidth:420 }}>
      <div className="tabs-list">
        {ts.map((t,i) => (
          <button key={i} onClick={() => setA(i)} className={`tab-btn${a===i?" act":""}`} style={{ fontSize:12 }}>
            {t.l}
          </button>
        ))}
      </div>
      <div className="tab-panel" style={{ fontSize:12.5 }}>
        Showing <strong>{ts[a].l.replace(/[^\w\s]/g,"").trim()}</strong> panel content.
      </div>
    </div>
  );
}

function VerticalTabsPreview() {
  const [a, setA] = useState(0);
  const ts = [
    { l:"General", c:"Manage your account preferences and display settings." },
    { l:"Security", c:"Update your password and enable two-factor authentication." },
    { l:"Notifications", c:"Configure which events trigger email and push notifications." },
    { l:"Integrations", c:"Connect third-party apps and manage API keys." }
  ];
  return (
    <div style={{ display:"flex", background:"#fff", border:"1.5px solid #E9E7E3",
      borderRadius:12, overflow:"hidden", width:"100%", maxWidth:400 }}>
      <div style={{ width:130, flexShrink:0, background:"#FAFAF8",
        borderRight:"1.5px solid #F0EEE9", padding:"8px 4px" }}>
        {ts.map((t,i) => (
          <button key={i} onClick={() => setA(i)} style={{
            display:"block", width:"100%", textAlign:"left", padding:"8px 10px",
            borderRadius:7, border:"none",
            background: a===i ? "#fff" : "transparent",
            color: a===i ? "#0F0F0F" : "#6B6863",
            fontFamily:"'DM Sans',sans-serif", fontSize:12.5,
            fontWeight: a===i ? 600 : 400, cursor:"pointer",
            boxShadow: a===i ? "0 1px 4px rgba(0,0,0,.06)" : "none",
            marginBottom:2, transition:"all .13s"
          }}>{t.l}</button>
        ))}
      </div>
      <div style={{ padding:"14px 16px", flex:1, fontSize:12.5, color:"#6B6863", lineHeight:1.6 }}>
        {ts[a].c}
      </div>
    </div>
  );
}

function ScrollableTabsPreview() {
  const [a, setA] = useState(0);
  const ts = ["Overview","Getting Started","Installation","Configuration","Components","Theming","Accessibility","Examples","API Reference"];
  return (
    <div style={{ width:"100%", maxWidth:460 }}>
      <div style={{ display:"flex", alignItems:"center", background:"#FAFAF8",
        borderBottom:"1.5px solid #F0EEE9", borderRadius:"12px 12px 0 0",
        border:"1.5px solid #E9E7E3", borderBottomColor:"transparent" }}>
        <div style={{ display:"flex", overflowX:"auto", flex:1, scrollbarWidth:"none", WebkitOverflowScrolling:"touch" }}>
          {ts.map((t,i) => (
            <button key={i} onClick={() => setA(i)} style={{
              flexShrink:0, padding:"10px 14px", background:"none", border:"none",
              borderBottom: `2.5px solid ${a===i?"#6366F1":"transparent"}`,
              marginBottom:-1, fontFamily:"'DM Sans',sans-serif", fontSize:12.5, fontWeight:600,
              color: a===i ? "#0F0F0F" : "#9E9B95", cursor:"pointer",
              whiteSpace:"nowrap", transition:"all .15s"
            }}>{t}</button>
          ))}
        </div>
      </div>
      <div style={{ background:"#fff", border:"1.5px solid #E9E7E3", borderTop:"none",
        borderRadius:"0 0 12px 12px", padding:"14px 16px", fontSize:12.5, color:"#6B6863" }}>
        Viewing: <strong style={{ color:"#0F0F0F" }}>{ts[a]}</strong>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   NAV PREVIEWS
───────────────────────────────────────────────────────────────── */
function DefaultNavPreview() {
  const [a, setA] = useState("Home");
  return (
    <div className="nav-bar" style={{ maxWidth:480 }}>
      <div className="nav-logo"><span className="nav-dot"/>DevUI</div>
      {["Home","Components","Docs","Blog"].map(l => (
        <button key={l} onClick={() => setA(l)} className={`nav-link-item${a===l?" act":""}`}>{l}</button>
      ))}
      <div className="nav-spacer"/>
      <button className="btn btn-primary btn-sm">Get started</button>
    </div>
  );
}

function DarkNavPreview() {
  const [a, setA] = useState(0);
  const links = ["Home","Products","Docs","Blog"];
  return (
    <div style={{ background:"#0F0F0F", borderRadius:12, display:"flex", alignItems:"center",
      padding:"0 16px", height:52, gap:4, width:"100%", maxWidth:480, border:"1px solid #2D2D2D" }}>
      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:800, color:"#fff",
        marginRight:8, display:"flex", alignItems:"center", gap:6 }}>
        <div style={{ width:7, height:7, borderRadius:"50%",
          background:"linear-gradient(135deg,#6366F1,#10B981)" }}/>DevUI
      </div>
      {links.map((l,i) => (
        <button key={i} onClick={() => setA(i)} style={{
          padding:"5px 11px", borderRadius:7, border:"none",
          background: a===i ? "rgba(255,255,255,.1)" : "none",
          color: a===i ? "#fff" : "rgba(255,255,255,.5)",
          fontFamily:"'DM Sans',sans-serif", fontSize:13, fontWeight:500, cursor:"pointer", transition:"all .13s"
        }}>{l}</button>
      ))}
      <div style={{ flex:1 }}/>
      <button style={{ padding:"6px 14px", borderRadius:8, border:"1px solid rgba(255,255,255,.15)",
        background:"rgba(255,255,255,.06)", color:"#fff", fontFamily:"'DM Sans',sans-serif",
        fontSize:12.5, fontWeight:600, cursor:"pointer" }}>⭐ GitHub</button>
    </div>
  );
}

function DropdownNavPreview() {
  const [drop, setDrop] = useState(false);
  const items = [
    { icon:"🎨", l:"Components", d:"48+ ready-to-use" },
    { icon:"📄", l:"Templates", d:"Full page templates" },
    { icon:"📚", l:"Docs", d:"API documentation" }
  ];
  return (
    <div className="nav-bar" style={{ maxWidth:480, position:"relative" }}>
      <div className="nav-logo"><span className="nav-dot"/>DevUI</div>
      <button className="nav-link-item act" onClick={() => setDrop(!drop)}
        style={{ display:"flex", alignItems:"center", gap:4 }}>
        Products <span style={{ fontSize:10, transition:"transform .2s", transform:drop?"rotate(180deg)":"none" }}>▼</span>
      </button>
      {drop && (
        <div style={{ position:"absolute", top:"calc(100% + 8px)", left:70, background:"#fff",
          border:"1.5px solid #E9E7E3", borderRadius:12, padding:"6px",
          boxShadow:"0 16px 40px rgba(0,0,0,.1)", zIndex:10, minWidth:220 }}>
          {items.map(({ icon,l,d }) => (
            <div key={l} onClick={() => setDrop(false)}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 10px",
                borderRadius:8, cursor:"pointer", transition:"background .13s" }}
              onMouseOver={e => e.currentTarget.style.background="#F8F7F4"}
              onMouseOut={e => e.currentTarget.style.background="transparent"}>
              <div style={{ fontSize:18 }}>{icon}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"#0F0F0F" }}>{l}</div>
                <div style={{ fontSize:11.5, color:"#9E9B95" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="nav-spacer"/>
      <button className="btn btn-primary btn-sm">Sign up</button>
    </div>
  );
}

function SidebarNavPreview() {
  const [a, setA] = useState("Dashboard");
  const items = [
    { icon:"📊", l:"Dashboard" },{ icon:"📦", l:"Components" },{ icon:"🎨", l:"Themes" },
    { icon:"⚙", l:"Settings" },{ icon:"📧", l:"Notifications" }
  ];
  return (
    <div style={{ display:"flex", background:"#fff", border:"1.5px solid #E9E7E3",
      borderRadius:12, overflow:"hidden", height:200, maxWidth:300 }}>
      <div style={{ width:56, background:"#0F0F0F", display:"flex", flexDirection:"column",
        alignItems:"center", padding:"10px 0", gap:4 }}>
        <div style={{ width:32, height:32, borderRadius:8,
          background:"linear-gradient(135deg,#6366F1,#10B981)",
          display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, marginBottom:8 }}>⬡</div>
        {items.map(({ icon,l }) => (
          <button key={l} onClick={() => setA(l)} title={l} style={{
            width:36, height:36, borderRadius:8, border:"none",
            background: a===l ? "rgba(99,102,241,.25)" : "none",
            fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
            transition:"all .13s", color: a===l ? "#A5B4FC" : "rgba(255,255,255,.4)"
          }}>{icon}</button>
        ))}
      </div>
      <div style={{ flex:1, padding:"14px 12px" }}>
        <div style={{ fontSize:11, fontWeight:700, textTransform:"uppercase",
          letterSpacing:.8, color:"#B0ACA6", marginBottom:8 }}>Menu</div>
        {items.map(({ l }) => (
          <button key={l} onClick={() => setA(l)} style={{
            display:"block", width:"100%", textAlign:"left", padding:"7px 10px",
            borderRadius:7, border:"none",
            background: a===l ? "#F0EEE9" : "none",
            color: a===l ? "#0F0F0F" : "#6B6863",
            fontFamily:"'DM Sans',sans-serif", fontSize:12.5,
            fontWeight: a===l ? 600 : 400, cursor:"pointer", marginBottom:2, transition:"all .13s"
          }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

function MobileNavPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ width:"100%", maxWidth:480, position:"relative" }}>
      <div style={{ background:"#fff", border:"1.5px solid #E9E7E3",
        borderRadius: open ? "12px 12px 0 0" : 12,
        display:"flex", alignItems:"center", padding:"0 16px", height:48, transition:"border-radius .15s" }}>
        <div className="nav-logo" style={{ fontSize:13 }}><span className="nav-dot"/>DevUI</div>
        <div style={{ flex:1 }}/>
        <button onClick={() => setOpen(!open)} style={{
          width:34, height:34, borderRadius:8, border:"1.5px solid #E9E7E3",
          background:"#F8F7F4", cursor:"pointer", fontSize:16,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:4
        }}>
          {open
            ? <span style={{ fontSize:16, color:"#0F0F0F" }}>×</span>
            : <>
                <div style={{ width:16, height:1.5, background:"#0F0F0F", borderRadius:1 }}/>
                <div style={{ width:12, height:1.5, background:"#0F0F0F", borderRadius:1 }}/>
                <div style={{ width:16, height:1.5, background:"#0F0F0F", borderRadius:1 }}/>
              </>
          }
        </button>
      </div>
      {open && (
        <div style={{ background:"#fff", border:"1.5px solid #E9E7E3", borderTop:"none",
          borderRadius:"0 0 12px 12px", padding:"6px 8px 10px",
          boxShadow:"0 8px 24px rgba(0,0,0,.08)" }}>
          {["Home","Components","Docs","Blog","Contact"].map(l => (
            <button key={l} onClick={() => setOpen(false)} style={{
              display:"block", width:"100%", textAlign:"left", padding:"9px 12px",
              borderRadius:8, border:"none", background:"none",
              fontFamily:"'DM Sans',sans-serif", fontSize:13.5, fontWeight:500,
              color:"#3D3B37", cursor:"pointer", transition:"background .13s"
            }}
              onMouseOver={e => e.currentTarget.style.background="#F5F4F1"}
              onMouseOut={e => e.currentTarget.style.background="none"}
            >{l}</button>
          ))}
          <div style={{ padding:"8px 8px 0", borderTop:"1px solid #F0EEE9", marginTop:4 }}>
            <button className="btn btn-primary btn-sm" style={{ width:"100%" }}>Get started</button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   LOADING PREVIEWS
───────────────────────────────────────────────────────────────── */
function ProgressBarPreview() {
  const [v, setV] = useState(65);
  useEffect(() => {
    const t = setInterval(() => setV(p => p >= 100 ? 5 : p + 1), 80);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14, width:"100%", maxWidth:340 }}>
      {[["Uploading…",v,"#6366F1"],["Processing…",Math.min(v*0.7,100),"#10B981"],["Compiling…",Math.min(v*0.5,100),"#F59E0B"]].map(([l,p,c]) => (
        <div key={l}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:12, color:"#6B6863" }}>{l}</span>
            <span style={{ fontSize:12, fontWeight:700, color:c }}>{Math.round(p)}%</span>
          </div>
          <div className="prog-track" style={{ width:"100%" }}>
            <div style={{ height:"100%", width:`${p}%`, background:c, borderRadius:100, transition:"width .08s" }}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonLoaderPreview() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setShow(s => !s), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div style={{ width:"100%", maxWidth:320 }}>
      {show ? (
        <div style={{ background:"#fff", border:"1.5px solid #E9E7E3", borderRadius:12, overflow:"hidden" }}>
          <div className="sk-circle" style={{ width:"100%", height:100 }}/>
          <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div className="sk-circle" style={{ width:32, height:32, flexShrink:0 }}/>
              <div style={{ flex:1, display:"flex", flexDirection:"column", gap:5 }}>
                <div className="sk-line" style={{ width:"60%" }}/>
                <div className="sk-line" style={{ width:"40%", height:9 }}/>
              </div>
            </div>
            <div className="sk-line"/>
            <div className="sk-line" style={{ width:"85%" }}/>
            <div style={{ display:"flex", gap:8 }}>
              <div className="sk-line" style={{ flex:1, height:28, borderRadius:8 }}/>
              <div className="sk-line" style={{ width:60, height:28, borderRadius:8 }}/>
            </div>
          </div>
        </div>
      ) : (
        <div className="c-card" style={{ width:"100%" }}>
          <div className="c-card-img" style={{ background:"linear-gradient(135deg,#6366F1,#0F0F0F)", fontSize:32 }}>🎨</div>
          <div className="c-card-body">
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div className="av av-sm" style={{ background:"#6366F122", borderColor:"#6366F144", color:"#6366F1" }}>AK</div>
              <div>
                <div style={{ fontSize:12.5, fontWeight:700, color:"#0F0F0F" }}>Alex Kim</div>
                <div style={{ fontSize:11, color:"#9E9B95" }}>2 days ago</div>
              </div>
            </div>
            <div className="c-card-title">Design System v3</div>
            <div className="c-card-text">A comprehensive library with dark mode support.</div>
          </div>
          <div className="c-card-footer">
            <span className="c-card-meta">48 components</span>
            <span className="badge badge-success badge-sm">v3.0</span>
          </div>
        </div>
      )}
      <div style={{ textAlign:"center", marginTop:8, fontSize:11.5, color:"#B0ACA6" }}>Auto-toggles every 3s</div>
    </div>
  );
}

function LoadingOverlayPreview() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ position:"relative", width:"100%", maxWidth:340 }}>
      <div style={{ background:"#fff", border:"1.5px solid #E9E7E3", borderRadius:12, padding:"16px" }}>
        <div style={{ fontSize:14, fontWeight:700, color:"#0F0F0F", marginBottom:10 }}>Your Dashboard</div>
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {["Total users: 2,841","Revenue: $9,200","Conversion: 3.4%"].map(l => (
            <div key={l} style={{ fontSize:12.5, color:"#6B6863", padding:"6px 10px",
              background:"#F8F7F4", borderRadius:7 }}>{l}</div>
          ))}
        </div>
        <button className="btn btn-primary btn-sm" style={{ marginTop:12, width:"100%" }}
          onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2400); }}>
          Reload data
        </button>
      </div>
      {loading && (
        <div style={{ position:"absolute", inset:0, background:"rgba(248,247,244,.85)",
          backdropFilter:"blur(3px)", borderRadius:12, display:"flex",
          flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10 }}>
          <div className="sp sp-md"/>
          <div style={{ fontSize:12.5, color:"#6B6863", fontWeight:500 }}>Loading data…</div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   AVATAR DATA
───────────────────────────────────────────────────────────────── */
const AVATARDATA = [
  { color:"#6366F1", init:"AK" },{ color:"#10B981", init:"JS" },
  { color:"#F59E0B", init:"MR" },{ color:"#EF4444", init:"TL" },{ color:"#8B5CF6", init:"DK" }
];

/* ─────────────────────────────────────────────────────────────────
   COMPONENT DATA
───────────────────────────────────────────────────────────────── */
const BUTTONS = [
  {
    name:"Solid Variants", tag:"Most used", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-indigo">Indigo</button>
        <button className="btn btn-green">Success</button>
        <button className="btn btn-danger">Danger</button>
        <button className="btn btn-outline">Outline</button>
        <button className="btn btn-ghost">Ghost</button>
      </div>
    ),
    react:`<Button variant="primary">Primary</Button>
<Button variant="indigo">Indigo</Button>
<Button variant="success">Success</Button>
<Button variant="danger">Danger</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`,
    html:`<button class="btn btn-primary">Primary</button>
<button class="btn btn-indigo">Indigo</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>`
  },
  {
    name:"Sizes", tag:"Responsive", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
        <button className="btn btn-indigo btn-sm">Small</button>
        <button className="btn btn-indigo">Medium</button>
        <button className="btn btn-indigo btn-lg">Large</button>
        <button className="btn btn-outline btn-icon-only">⬡</button>
      </div>
    ),
    react:`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Grid">⬡</Button>`,
    html:`<button class="btn btn-indigo btn-sm">Small</button>
<button class="btn btn-indigo">Medium</button>
<button class="btn btn-indigo btn-lg">Large</button>
<button class="btn btn-outline btn-icon-only">⬡</button>`
  },
  {
    name:"With Icons", tag:"UX", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
        <button className="btn btn-primary">⬇ Download</button>
        <button className="btn btn-indigo">Upload ↑</button>
        <button className="btn btn-outline">⭐ Star on GitHub</button>
        <button className="btn btn-green">✓ Confirmed</button>
      </div>
    ),
    react:`<Button variant="primary" leftIcon={<DownloadIcon />}>Download</Button>
<Button variant="indigo" rightIcon={<UploadIcon />}>Upload</Button>
<Button variant="outline" leftIcon={<StarIcon />}>Star on GitHub</Button>
<Button variant="success" leftIcon={<CheckIcon />}>Confirmed</Button>`,
    html:`<button class="btn btn-primary">⬇ Download</button>
<button class="btn btn-indigo">Upload ↑</button>
<button class="btn btn-outline">⭐ Star on GitHub</button>
<button class="btn btn-success">✓ Confirmed</button>`
  },
  {
    name:"Loading State", tag:"Async", level:"Intermediate",
    preview: <ButtonLoadingPreview />,
    react:`function SaveButton() {
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    setLoading(true);
    await api.save();
    setLoading(false);
  };
  return (
    <button
      className="btn btn-primary"
      disabled={loading}
      onClick={handleSave}
      style={{ minWidth: 140 }}
    >
      {loading ? (
        <><span className="spin" /> Saving…</>
      ) : "Save Changes"}
    </button>
  );
}`,
    html:`<button class="btn btn-primary" id="saveBtn">Save Changes</button>
<script>
document.getElementById("saveBtn").addEventListener("click", async function () {
  this.disabled = true;
  this.innerHTML = '<span class="spin"></span> Saving…';
  await new Promise(r => setTimeout(r, 2000));
  this.disabled = false;
  this.innerHTML = "Save Changes";
});
</script>`
  },
  {
    name:"Button Group", tag:"Group", level:"Intermediate",
    preview: <ButtonGroupPreview />,
    react:`function SegmentedControl({ options, value, onChange }) {
  return (
    <div className="seg-wrap">
      {options.map((opt) => (
        <button
          key={opt}
          className={\`seg-item \${value === opt ? "active" : ""}\`}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}`,
    html:`<div class="btn-group">
  <button class="btn-group-item active">Monthly</button>
  <button class="btn-group-item">Annual</button>
  <button class="btn-group-item">Lifetime</button>
</div>
<style>
.btn-group { display:flex; background:#F5F4F1; padding:3px; border-radius:9px; }
.btn-group-item { padding:7px 16px; border-radius:7px; border:none; background:none;
  color:#6B6863; font-weight:600; cursor:pointer; transition:all .15s; }
.btn-group-item.active { background:#fff; color:#0F0F0F; box-shadow:0 2px 8px rgba(0,0,0,.1); }
</style>`
  }
];

const BADGES = [
  {
    name:"Status Badges", tag:"Status", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
        <span className="badge badge-success"><span className="badge-dot"/>Online</span>
        <span className="badge badge-warning"><span className="badge-dot"/>Away</span>
        <span className="badge badge-error"><span className="badge-dot"/>Offline</span>
        <span className="badge badge-info"><span className="badge-dot"/>Busy</span>
        <span className="badge badge-default">Unknown</span>
      </div>
    ),
    react:`<Badge variant="success" dot>Online</Badge>
<Badge variant="warning" dot>Away</Badge>
<Badge variant="error" dot>Offline</Badge>
<Badge variant="info" dot>Busy</Badge>
<Badge variant="default">Unknown</Badge>`,
    html:`<span class="badge badge-success"><span class="badge-dot"></span>Online</span>
<span class="badge badge-warning"><span class="badge-dot"></span>Away</span>
<span class="badge badge-error"><span class="badge-dot"></span>Offline</span>
<span class="badge badge-info"><span class="badge-dot"></span>Busy</span>
<span class="badge badge-default">Unknown</span>`
  },
  {
    name:"Contextual Variants", tag:"All colors", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
        {[["badge-default","Default"],["badge-success","Success"],["badge-warning","Warning"],
          ["badge-error","Error"],["badge-info","Info"],["badge-purple","Beta"]].map(([c,l]) => (
          <span key={l} className={`badge ${c}`}>{l}</span>
        ))}
      </div>
    ),
    react:`<Badge variant="default">Default</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="purple">Beta</Badge>`,
    html:`<span class="badge badge-default">Default</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-purple">Beta</span>`
  },
  {
    name:"Sizes", tag:"Sizes", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
        <span className="badge badge-purple badge-sm">Small</span>
        <span className="badge badge-purple">Medium</span>
        <span className="badge badge-purple badge-lg">Large</span>
        <span className="badge badge-success badge-lg">v3.0 ✓</span>
      </div>
    ),
    react:`<Badge size="sm" variant="purple">Small</Badge>
<Badge size="md" variant="purple">Medium</Badge>
<Badge size="lg" variant="purple">Large</Badge>
<Badge size="lg" variant="success">v3.0 ✓</Badge>`,
    html:`<span class="badge badge-purple badge-sm">Small</span>
<span class="badge badge-purple">Medium</span>
<span class="badge badge-purple badge-lg">Large</span>
<span class="badge badge-success badge-lg">v3.0 ✓</span>`
  },
  {
    name:"Notification Counters", tag:"Counter", level:"Intermediate",
    preview: <NotificationCountersPreview />,
    react:`function NotifButton({ label, count }) {
  return (
    <div style={{ position:"relative", display:"inline-block" }}>
      <Button variant="outline" size="sm">{label}</Button>
      {count > 0 && (
        <Badge variant="error" size="sm"
          style={{ position:"absolute", top:-8, right:-8 }}>
          {count > 9 ? "9+" : count}
        </Badge>
      )}
    </div>
  );
}`,
    html:`<div style="position:relative; display:inline-block;">
  <button class="btn btn-outline btn-sm">Messages</button>
  <span class="badge badge-error badge-sm"
    style="position:absolute; top:-8px; right:-8px;">5</span>
</div>`
  },
  {
    name:"Pill Tags (Dismissible)", tag:"Interactive", level:"Intermediate",
    preview: <PillTagsPreview />,
    react:`function TagList({ tags, onRemove }) {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <Badge key={tag} variant="default" dismissible onDismiss={() => onRemove(tag)}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}`,
    html:`<span class="badge badge-default" style="padding-right:5px;">
  React
  <button onclick="this.parentElement.remove()"
    style="background:none;border:none;cursor:pointer;color:#9E9B95;">×</button>
</span>`
  }
];

const INPUTS = [
  {
    name:"Default & States", tag:"Core", level:"Beginner",
    preview: <DefaultStatesPreview />,
    react:`function Form() {
  const [username, setUsername] = useState("");
  const error = username.length > 0 && username.length < 3;
  return (
    <>
      <Input label="Email" type="email" leftIcon={<MailIcon />}
        hint="We'll never share your email." />
      <Input
        label="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        error={error ? "Min 3 characters" : undefined}
        hint="Letters and numbers only"
      />
    </>
  );
}`,
    html:`<div class="field">
  <label>Email</label>
  <div class="inp-wrap">
    <span class="inp-icon-l">✉</span>
    <input class="inp inp-pl" type="email" placeholder="you@example.com" />
  </div>
  <span class="hint">We'll never share your email.</span>
</div>
<style>
.inp { width:100%; padding:9px 13px; border:1.5px solid #E5E3DE; border-radius:9px;
  background:#fff; font-size:13.5px; outline:none; transition:all .18s; }
.inp:focus { border-color:#6366F1; box-shadow:0 0 0 3px rgba(99,102,241,.1); }
.inp.err { border-color:#EF4444; }
</style>`
  },
  {
    name:"Search Input", tag:"Search", level:"Beginner",
    preview: <SearchInputPreview />,
    react:`function SearchInput({ onSearch }) {
  const [query, setQuery] = useState("");
  return (
    <div className="inp-wrap">
      <span className="inp-icon-l">🔍</span>
      <input
        className="inp inp-pl inp-pr"
        value={query}
        onChange={e => { setQuery(e.target.value); onSearch(e.target.value); }}
        placeholder="Search components…"
      />
      {query && (
        <button className="inp-icon-r" onClick={() => setQuery("")}>×</button>
      )}
    </div>
  );
}`,
    html:`<div class="inp-wrap">
  <span class="inp-icon-l">🔍</span>
  <input id="search" class="inp inp-pl inp-pr" placeholder="Search components…"
    oninput="document.getElementById('clear').style.display=this.value?'block':'none'" />
  <button id="clear" class="inp-icon-r" style="display:none"
    onclick="document.getElementById('search').value='';this.style.display='none'">×</button>
</div>`
  },
  {
    name:"Password Input", tag:"Auth", level:"Intermediate",
    preview: <PasswordInputPreview />,
    react:`function PasswordInput() {
  const [show, setShow] = useState(false);
  const [pw, setPw] = useState("");
  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : 3;
  const colors = ["#E9E7E3","#EF4444","#FBBF24","#10B981"];
  return (
    <div className="inp-group">
      <label className="inp-label">Password</label>
      <div className="inp-wrap">
        <input className="inp inp-pr" type={show?"text":"password"}
          value={pw} onChange={e => setPw(e.target.value)} />
        <button className="inp-icon-r" onClick={() => setShow(!show)}>
          {show ? "🙈" : "👁"}
        </button>
      </div>
      <div className="strength-bar">
        {[1,2,3].map(i => (
          <div key={i} style={{ flex:1, height:3, borderRadius:3,
            background: strength >= i ? colors[strength] : "#E9E7E3" }} />
        ))}
      </div>
    </div>
  );
}`,
    html:`<div class="field">
  <label>Password</label>
  <div class="inp-wrap">
    <input id="pw" class="inp inp-pr" type="password" placeholder="Enter password"
      oninput="checkStrength(this.value)" />
    <button class="inp-icon-r" onclick="togglePw()">👁</button>
  </div>
  <div class="strength-bar" id="sb">
    <div id="s1"></div><div id="s2"></div><div id="s3"></div>
  </div>
</div>
<script>
function togglePw(){const i=document.getElementById('pw');i.type=i.type==='password'?'text':'password';}
function checkStrength(v){const s=v.length<6?1:v.length<10?2:3;const c=['','#EF4444','#FBBF24','#10B981'];
for(let i=1;i<=3;i++)document.getElementById('s'+i).style.background=s>=i?c[s]:'#E9E7E3';}
</script>`
  },
  {
    name:"Input Group (Addons)", tag:"Addon", level:"Intermediate",
    preview:(
      <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:320 }}>
        <div style={{ display:"flex", borderRadius:9, overflow:"hidden",
          border:"1.5px solid #E5E3DE", background:"#fff" }}>
          <span style={{ padding:"9px 12px", background:"#F5F4F1",
            borderRight:"1.5px solid #E5E3DE", fontSize:13, color:"#6B6863", whiteSpace:"nowrap" }}>
            https://
          </span>
          <input className="inp" style={{ border:"none", borderRadius:0, outline:"none", flex:1, padding:"9px 12px" }}
            placeholder="your-domain.com"/>
        </div>
        <div style={{ display:"flex", borderRadius:9, overflow:"hidden",
          border:"1.5px solid #E5E3DE", background:"#fff" }}>
          <input className="inp" style={{ border:"none", borderRadius:0, outline:"none", flex:1, padding:"9px 12px" }}
            placeholder="Search…"/>
          <button className="btn btn-indigo" style={{ borderRadius:0, padding:"9px 18px", fontSize:13 }}>Search</button>
        </div>
      </div>
    ),
    react:`// URL input with prefix
<div className="input-group">
  <span className="addon">https://</span>
  <input className="inp" placeholder="your-domain.com" />
</div>

// Search with button suffix
<div className="input-group">
  <input className="inp" placeholder="Search…" />
  <button className="btn btn-indigo">Search</button>
</div>`,
    html:`<div class="input-group">
  <span class="addon">https://</span>
  <input class="inp" placeholder="your-domain.com" />
</div>
<style>
.input-group { display:flex; border-radius:9px; overflow:hidden; border:1.5px solid #E5E3DE; }
.input-group .inp { border:none; border-radius:0; flex:1; outline:none; padding:9px 12px; }
.addon { padding:9px 12px; background:#F5F4F1; border-right:1.5px solid #E5E3DE;
  font-size:13px; color:#6B6863; display:flex; align-items:center; }
</style>`
  },
  {
    name:"Textarea & Select", tag:"Form", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
        <div className="inp-group">
          <label className="inp-label">Message</label>
          <textarea className="inp" rows={3} placeholder="Type your message…" style={{ resize:"vertical" }}/>
        </div>
        <div className="inp-group">
          <label className="inp-label">Framework</label>
          <div className="inp-wrap">
            <select className="inp" style={{ appearance:"none", cursor:"pointer", paddingRight:32 }}>
              {["React","Vue","Angular","Svelte"].map(o => <option key={o}>{o}</option>)}
            </select>
            <span className="inp-icon-r" style={{ pointerEvents:"none", fontSize:11 }}>▼</span>
          </div>
        </div>
      </div>
    ),
    react:`<Textarea label="Message" placeholder="Type your message…" rows={3} />
<Select label="Framework" options={["React","Vue","Angular","Svelte"]} />`,
    html:`<textarea class="inp" rows="3" placeholder="Type your message…"></textarea>
<div class="inp-wrap">
  <select class="inp" style="appearance:none; padding-right:32px;">
    <option>React</option><option>Vue</option><option>Angular</option>
  </select>
  <span style="position:absolute;right:11px;top:50%;transform:translateY(-50%);pointer-events:none;">▼</span>
</div>`
  }
];

const AVATARS = [
  {
    name:"Sizes", tag:"All sizes", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:14, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
        {["xs","sm","md","lg","xl"].map((s,i) => (
          <div key={s} className={`av av-${s}`} style={{
            background: AVATARDATA[i].color+"22",
            borderColor: AVATARDATA[i].color+"66",
            color: AVATARDATA[i].color
          }}>{AVATARDATA[i].init}</div>
        ))}
      </div>
    ),
    react:`<Avatar size="xs" initials="AK" color="indigo" />
<Avatar size="sm" initials="JS" color="green" />
<Avatar size="md" initials="MR" color="amber" />
<Avatar size="lg" initials="TL" color="red" />
<Avatar size="xl" initials="DK" color="purple" />`,
    html:`<div class="av av-xs" style="color:#6366F1">AK</div>
<div class="av av-sm" style="color:#10B981">JS</div>
<div class="av av-md" style="color:#F59E0B">MR</div>
<div class="av av-lg" style="color:#EF4444">TL</div>
<div class="av av-xl" style="color:#8B5CF6">DK</div>`
  },
  {
    name:"With Status Indicator", tag:"Presence", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
        {[["Online","av-online"],["Away","av-away"],["Offline","av-offline"]].map(([label,cls],i) => (
          <div key={label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
            <div className="av av-lg" style={{ position:"relative",
              background: AVATARDATA[i].color+"22", borderColor: AVATARDATA[i].color+"66",
              color: AVATARDATA[i].color, border:`2px solid ${AVATARDATA[i].color}44` }}>
              {AVATARDATA[i].init}
              <div className={`av-status ${cls}`}/>
            </div>
            <span style={{ fontSize:11, color:"#9E9B95" }}>{label}</span>
          </div>
        ))}
      </div>
    ),
    react:`<Avatar size="lg" initials="AK" color="indigo" status="online" />
<Avatar size="lg" initials="JS" color="green"  status="away" />
<Avatar size="lg" initials="MR" color="amber"  status="offline" />`,
    html:`<div class="av av-lg" style="position:relative; color:#6366F1;">
  AK
  <div class="av-status av-online"></div>
</div>
<style>
.av-status { position:absolute; bottom:1px; right:1px; width:9px; height:9px;
  border-radius:50%; border:2px solid #fff; }
.av-online { background:#10B981; }
.av-away   { background:#FBBF24; }
.av-offline{ background:#D1D5DB; }
</style>`
  },
  {
    name:"Avatar Group (Stacked)", tag:"Group", level:"Intermediate",
    preview:(
      <div style={{ display:"flex", flexDirection:"column", gap:14, alignItems:"center" }}>
        <div className="av-group">
          {AVATARDATA.slice(0,5).map((a,i) => (
            <div key={i} className="av av-md" style={{
              background: a.color+"22", borderColor:"#fff", color: a.color,
              border:"2.5px solid #fff", boxShadow:`0 0 0 1px ${a.color}33`
            }}>{a.init}</div>
          ))}
          <div className="av av-md" style={{ background:"#F5F4F1", borderColor:"#fff", color:"#6B6863",
            border:"2.5px solid #fff", fontSize:11, fontWeight:700 }}>+9</div>
        </div>
        <span style={{ fontSize:12.5, color:"#6B6863" }}>15 team members</span>
      </div>
    ),
    react:`<AvatarGroup max={5}>
  <Avatar initials="AK" color="indigo" />
  <Avatar initials="JS" color="green" />
  <Avatar initials="MR" color="amber" />
  <Avatar initials="TL" color="red" />
  <Avatar initials="DK" color="purple" />
  {/* 10 more */}
</AvatarGroup>`,
    html:`<div class="av-group">
  <div class="av av-md" style="color:#6366F1">AK</div>
  <div class="av av-md" style="color:#10B981">JS</div>
  <div class="av av-md" style="color:#F59E0B">MR</div>
  <div class="av av-md" style="color:#EF4444">TL</div>
  <div class="av av-md" style="color:#6B6863;font-size:11px">+9</div>
</div>
<style>
.av-group { display:flex; }
.av-group .av { margin-left:-10px; border:2.5px solid #fff !important; }
.av-group .av:first-child { margin-left:0; }
</style>`
  },
  {
    name:"Square (Rounded)", tag:"Shape", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:14, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
        {AVATARDATA.slice(0,4).map((a,i) => (
          <div key={i} className="av av-lg av-sq" style={{
            background: a.color+"15", borderColor: a.color+"33",
            color: a.color, border:`2px solid ${a.color}33`
          }}>{a.init}</div>
        ))}
      </div>
    ),
    react:`<Avatar shape="square" size="lg" initials="AK" color="indigo" />
<Avatar shape="square" size="lg" initials="JS" color="green" />`,
    html:`<div class="av av-lg" style="border-radius:10px; color:#6366F1;">AK</div>
<div class="av av-lg" style="border-radius:10px; color:#10B981;">JS</div>`
  },
  {
    name:"With User Info Card", tag:"Profile", level:"Intermediate",
    preview:(
      <div style={{ display:"flex", gap:10, flexWrap:"wrap", justifyContent:"center" }}>
        {AVATARDATA.slice(0,3).map((a,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:10, background:"#fff",
            border:"1.5px solid #E9E7E3", borderRadius:10, padding:"10px 14px", minWidth:160 }}>
            <div className="av av-md" style={{ background:a.color+"22", borderColor:a.color+"44",
              color:a.color, position:"relative", border:`2px solid ${a.color}44` }}>
              {a.init}
              <div className="av-status av-online"/>
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:700, color:"#0F0F0F" }}>
                {["Alex Kim","Jamie Smith","Mia Ross"][i]}
              </div>
              <div style={{ fontSize:11.5, color:"#9E9B95" }}>
                {["Admin","Editor","Viewer"][i]}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    react:`function UserCard({ user }) {
  return (
    <div className="user-card">
      <Avatar size="md" initials={user.initials}
        color={user.color} status="online" />
      <div>
        <p className="user-name">{user.name}</p>
        <p className="user-role">{user.role}</p>
      </div>
    </div>
  );
}`,
    html:`<div class="user-card">
  <div class="av av-md" style="position:relative; color:#6366F1;">
    AK <div class="av-status av-online"></div>
  </div>
  <div>
    <p style="font-size:13px;font-weight:700;color:#0F0F0F;">Alex Kim</p>
    <p style="font-size:11.5px;color:#9E9B95;">Admin</p>
  </div>
</div>
<style>
.user-card { display:flex; align-items:center; gap:10px; background:#fff;
  border:1.5px solid #E9E7E3; border-radius:10px; padding:10px 14px; }
</style>`
  }
];

const MODALS = [
  { name:"Basic Modal",            tag:"Dialog",      level:"Beginner",     preview:<BasicModalPreview />,   react:`// See component code`, html:`<!-- See HTML code -->` },
  { name:"Confirm / Danger Dialog",tag:"Destructive", level:"Beginner",     preview:<ConfirmModalPreview />, react:`// See component code`, html:`<!-- See HTML code -->` },
  { name:"Alert / Notification",   tag:"Info",        level:"Beginner",     preview:<AlertModalPreview />,  react:`// See component code`, html:`<!-- See HTML code -->` },
  { name:"Modal with Form",        tag:"Form",        level:"Intermediate", preview:<FormModalPreview />,   react:`// See component code`, html:`<!-- See HTML code -->` },
  { name:"Bottom Sheet (Mobile)",  tag:"Mobile",      level:"Advanced",     preview:<BottomSheetPreview />, react:`// See component code`, html:`<!-- See HTML code -->` }
];

// Add proper code snippets to modals
MODALS[0].react = `function LoginModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="btn btn-primary" onClick={() => setOpen(true)}>Open Modal</button>
      {open && (
        <div className="modal-backdrop"
          onClick={e => e.target === e.currentTarget && setOpen(false)}>
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <div className="modal-title">Welcome back 👋</div>
                <div className="modal-sub">Sign in to continue.</div>
              </div>
              <button className="modal-close" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className="modal-body">
              <Input label="Email" type="email" />
              <Input label="Password" type="password" />
            </div>
            <div className="modal-footer">
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm">Sign in</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}`;
MODALS[0].html = `<button class="btn btn-primary" onclick="document.getElementById('m').style.display='flex'">
  Open Modal
</button>
<div class="modal-backdrop" id="m" style="display:none"
  onclick="if(event.target===this)this.style.display='none'">
  <div class="modal-box">
    <div class="modal-header">
      <h2 class="modal-title">Welcome back</h2>
      <button class="modal-close" onclick="document.getElementById('m').style.display='none'">×</button>
    </div>
    <div class="modal-body">
      <input class="inp" type="email" placeholder="Email" style="margin-bottom:10px" />
      <input class="inp" type="password" placeholder="Password" />
    </div>
    <div class="modal-footer">
      <button class="btn btn-ghost btn-sm">Cancel</button>
      <button class="btn btn-primary btn-sm">Sign in</button>
    </div>
  </div>
</div>`;

const TABS = [
  { name:"Underline Tabs",      tag:"Default",  level:"Beginner",     preview:<UnderlineTabsPreview />,  react:`<Tabs variant="underline"><Tabs.List>...</Tabs.List></Tabs>`, html:`...` },
  { name:"Pill / Segmented",    tag:"Pill",     level:"Beginner",     preview:<PillTabsPreview />,       react:`<Tabs variant="pill"><Tabs.List>...</Tabs.List></Tabs>`, html:`...` },
  { name:"Tabs with Icons",     tag:"Icons",    level:"Beginner",     preview:<IconTabsPreview />,       react:`<Tabs><Tabs.Tab icon={<Icon/>}>Analytics</Tabs.Tab></Tabs>`, html:`...` },
  { name:"Vertical Tabs",       tag:"Vertical", level:"Intermediate", preview:<VerticalTabsPreview />,   react:`<Tabs variant="vertical"><Tabs.List orientation="vertical">...</Tabs.List></Tabs>`, html:`...` },
  { name:"Scrollable Tabs",     tag:"Overflow", level:"Intermediate", preview:<ScrollableTabsPreview />, react:`<Tabs scrollable><Tabs.List>...</Tabs.List></Tabs>`, html:`...` }
];

const NAVS = [
  { name:"Default Navbar",         tag:"Standard", level:"Beginner",     preview:<DefaultNavPreview />,  react:`<Navbar><Navbar.Brand>...</Navbar.Brand></Navbar>`, html:`...` },
  { name:"Dark Navbar",            tag:"Dark",     level:"Beginner",     preview:<DarkNavPreview />,     react:`<Navbar theme="dark">...</Navbar>`, html:`...` },
  { name:"Navbar with Dropdown",   tag:"Dropdown", level:"Intermediate", preview:<DropdownNavPreview />, react:`<Navbar><Navbar.Dropdown>...</Navbar.Dropdown></Navbar>`, html:`...` },
  { name:"Sidebar Navigation",     tag:"Sidebar",  level:"Intermediate", preview:<SidebarNavPreview />,  react:`<Sidebar><Sidebar.Nav>...</Sidebar.Nav></Sidebar>`, html:`...` },
  { name:"Mobile Hamburger Nav",   tag:"Mobile",   level:"Intermediate", preview:<MobileNavPreview />,   react:`<Navbar><Navbar.Hamburger/><Navbar.MobileMenu>...</Navbar.MobileMenu></Navbar>`, html:`...` }
];

const LOADING = [
  {
    name:"Spinners", tag:"Classic", level:"Beginner",
    preview:(
      <div style={{ display:"flex", gap:24, alignItems:"center", flexWrap:"wrap", justifyContent:"center" }}>
        <div className="sp sp-sm"/>
        <div className="sp sp-md"/>
        <div className="sp sp-lg"/>
        <div style={{ width:32, height:32, borderRadius:"50%", border:"3px solid #F0EEE9",
          borderTopColor:"#10B981", animation:"spin .8s linear infinite" }}/>
        <div style={{ width:32, height:32, borderRadius:"50%", border:"3px solid #F0EEE9",
          borderTopColor:"#EF4444", animation:"spin .8s linear infinite" }}/>
      </div>
    ),
    react:`<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="md" color="green" />
<Spinner size="md" color="red" />`,
    html:`<div class="spinner sm"></div>
<div class="spinner md"></div>
<div class="spinner lg"></div>
<style>
.spinner { border-radius:50%; border:3px solid #F0EEE9; border-top-color:#6366F1;
  animation:spin .8s linear infinite; }
.spinner.sm { width:20px; height:20px; border-width:2px; }
.spinner.md { width:32px; height:32px; }
.spinner.lg { width:44px; height:44px; border-width:4px; }
@keyframes spin { to { transform:rotate(360deg); } }
</style>`
  },
  {
    name:"Dot Loaders", tag:"Dots", level:"Beginner",
    preview:(
      <div style={{ display:"flex", flexDirection:"column", gap:16, alignItems:"center" }}>
        <div className="dots-wrap">
          {[0,1,2].map(i => <div key={i} className="dot" style={{ animationDelay:`${i*.15}s` }}/>)}
        </div>
        <div style={{ display:"flex", gap:5 }}>
          {[0,1,2,3].map(i => <div key={i} style={{ width:8, height:8, borderRadius:"50%",
            background:"#6366F1", animation:"pulse 1.4s ease infinite",
            animationDelay:`${i*.18}s`, opacity:1 }}/>)}
        </div>
        <div style={{ display:"flex", gap:4, alignItems:"flex-end", height:28 }}>
          {[14,20,26,20,14].map((h,i) => <div key={i} style={{ width:5, height:h, borderRadius:3,
            background:"#6366F1", animation:"dotBounce .9s ease infinite",
            animationDelay:`${i*.1}s` }}/>)}
        </div>
      </div>
    ),
    react:`<Loader variant="dots" />
<Loader variant="pulse" count={4} />
<Loader variant="bars" />`,
    html:`<div class="dots-loader">
  <span></span><span></span><span></span>
</div>
<style>
.dots-loader { display:flex; gap:6px; }
.dots-loader span { width:9px; height:9px; border-radius:50%; background:#6366F1;
  animation:dotBounce .7s ease-in-out infinite; }
.dots-loader span:nth-child(2) { animation-delay:.15s; }
.dots-loader span:nth-child(3) { animation-delay:.3s; }
@keyframes dotBounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-7px)} }
</style>`
  },
  { name:"Progress Bar",     tag:"Progress", level:"Beginner",     preview:<ProgressBarPreview />,    react:`<Progress value={65} color="indigo" label="Uploading…" />`, html:`...` },
  { name:"Skeleton Loader",  tag:"Skeleton", level:"Intermediate", preview:<SkeletonLoaderPreview />, react:`<Skeleton.Block height={100} />`, html:`...` },
  { name:"Loading Overlay",  tag:"Overlay",  level:"Intermediate", preview:<LoadingOverlayPreview />, react:`<LoadingOverlay loading={isLoading}><Dashboard /></LoadingOverlay>`, html:`...` }
];

const FOOTERS = [
  {
    name:"Full Footer", tag:"Complete", level:"Beginner",
    preview:(
      <div className="fp-footer" style={{ maxWidth:460 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr 1fr", gap:20, marginBottom:14 }}>
          <div>
            <div className="fp-title"><span className="fp-dot"/>DevUI</div>
            <div className="fp-tagline">Production-ready components for modern UIs.</div>
            <div className="fp-social">
              {["𝕏","⭐","💬"].map(i => <div key={i} className="fp-social-btn">{i}</div>)}
            </div>
          </div>
          {[["Components",["Hero","Button","Card","Modal"]],["Company",["About","Blog","GitHub"]]].map(([t,ls]) => (
            <div key={t}>
              <div style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:.8,
                color:"rgba(255,255,255,.25)", marginBottom:8 }}>{t}</div>
              {ls.map(l => <div key={l} className="fp-link">{l}</div>)}
            </div>
          ))}
        </div>
        <div className="fp-divider"/>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:8 }}>
          <span className="fp-copy">© 2025 DevUI. MIT License.</span>
          <div style={{ display:"flex", gap:12 }}>
            {["Privacy","Terms"].map(l => <span key={l} className="fp-link" style={{ fontSize:11 }}>{l}</span>)}
          </div>
        </div>
      </div>
    ),
    react:`<Footer>
  <Footer.Brand>
    <Footer.Logo>DevUI</Footer.Logo>
    <Footer.Tagline>Production-ready components.</Footer.Tagline>
    <Footer.Socials />
  </Footer.Brand>
  <Footer.Column title="Components">
    <Footer.Link href="/hero">Hero</Footer.Link>
    <Footer.Link href="/button">Button</Footer.Link>
  </Footer.Column>
  <Footer.Bottom>
    <span>© 2025 DevUI. MIT License.</span>
  </Footer.Bottom>
</Footer>`,
    html:`<footer style="background:#0F0F0F;color:#fff;padding:40px;border-radius:12px;">
  <div style="display:grid;grid-template-columns:1.5fr 1fr 1fr;gap:40px;margin-bottom:32px;">
    <div>
      <h3 style="font-size:16px;font-weight:800;margin-bottom:8px;">DevUI</h3>
      <p style="font-size:13px;color:rgba(255,255,255,.4);">Production-ready components.</p>
    </div>
  </div>
  <div style="border-top:1px solid rgba(255,255,255,.07);padding-top:18px;font-size:12px;color:rgba(255,255,255,.25);">
    © 2025 DevUI. MIT License.
  </div>
</footer>`
  },
  {
    name:"Minimal Footer", tag:"Simple", level:"Beginner",
    preview:(
      <div className="fp-footer" style={{ maxWidth:460, padding:"16px 20px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
          <div className="fp-title" style={{ marginBottom:0 }}><span className="fp-dot"/>DevUI</div>
          <div className="fp-social">{["𝕏","⭐","📧"].map(i => <div key={i} className="fp-social-btn">{i}</div>)}</div>
          <span className="fp-copy">© 2025 DevUI</span>
        </div>
      </div>
    ),
    react:`<Footer variant="minimal">
  <Footer.Brand>DevUI</Footer.Brand>
  <Footer.Socials />
  <Footer.Copy>© 2025 DevUI</Footer.Copy>
</Footer>`,
    html:`<footer style="background:#0F0F0F;display:flex;align-items:center;
  justify-content:space-between;padding:16px 40px;flex-wrap:wrap;gap:10px;">
  <span style="font-size:15px;font-weight:800;color:#fff;">DevUI</span>
  <span style="font-size:12px;color:rgba(255,255,255,.25);">© 2025 DevUI</span>
</footer>`
  },
  {
    name:"Footer with Newsletter", tag:"Newsletter", level:"Intermediate",
    preview: (() => {
      // Static preview — no hooks needed here
      return (
        <div className="fp-footer" style={{ maxWidth:460 }}>
          <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", gap:20, marginBottom:14 }}>
            <div style={{ flex:"1 1 180px" }}>
              <div className="fp-title"><span className="fp-dot"/>DevUI</div>
              <div className="fp-tagline">New components every week. Subscribe for updates.</div>
              <div style={{ display:"flex", gap:6, marginTop:10 }}>
                <input placeholder="your@email.com" style={{ flex:1, padding:"7px 11px", borderRadius:7,
                  border:"1px solid rgba(255,255,255,.15)", background:"rgba(255,255,255,.07)",
                  color:"#fff", fontFamily:"'DM Sans',sans-serif", fontSize:12.5, outline:"none" }}/>
                <button className="btn btn-indigo btn-sm">Subscribe</button>
              </div>
            </div>
            <div style={{ flex:"1 1 120px" }}>
              <div style={{ fontSize:9.5, fontWeight:700, textTransform:"uppercase", letterSpacing:.8,
                color:"rgba(255,255,255,.25)", marginBottom:8 }}>Links</div>
              {["Components","Templates","Docs","GitHub"].map(l => <div key={l} className="fp-link">{l}</div>)}
            </div>
          </div>
          <div className="fp-divider"/>
          <span className="fp-copy">© 2025 DevUI. MIT License.</span>
        </div>
      );
    })(),
    react:`function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <footer>
      <div>
        <h3>DevUI</h3>
        <p>New components every week.</p>
        {!submitted ? (
          <div className="newsletter">
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
            <Button onClick={() => email && setSubmitted(true)}>Subscribe</Button>
          </div>
        ) : <p className="success">✓ You're subscribed!</p>}
      </div>
    </footer>
  );
}`,
    html:`<footer>
  <div class="newsletter-form">
    <input id="email" type="email" placeholder="your@email.com" />
    <button onclick="subscribe()">Subscribe</button>
  </div>
  <p id="thanks" style="display:none;color:#10B981;">✓ You're subscribed!</p>
</footer>
<script>
function subscribe() {
  if(!document.getElementById('email').value) return;
  document.getElementById('thanks').style.display='block';
  document.querySelector('.newsletter-form').style.display='none';
}
</script>`
  },
  {
    name:"Dark Footer with Grid", tag:"Grid", level:"Intermediate",
    preview:(
      <div className="fp-footer" style={{ maxWidth:460 }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:14 }}>
          {[["Product",["Components","Templates","Changelog","Roadmap"]],
            ["Docs",["Getting Started","API","Examples","GitHub"]],
            ["Company",["About","Blog","Careers","Press"]],
            ["Legal",["Privacy","Terms","License","Cookies"]]].map(([t,ls]) => (
            <div key={t}>
              <div style={{ fontSize:9, fontWeight:700, textTransform:"uppercase", letterSpacing:.8,
                color:"rgba(255,255,255,.25)", marginBottom:7 }}>{t}</div>
              {ls.map(l => <div key={l} className="fp-link" style={{ fontSize:11.5, marginBottom:4 }}>{l}</div>)}
            </div>
          ))}
        </div>
        <div className="fp-divider"/>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <div className="fp-title" style={{ marginBottom:0, fontSize:12 }}><span className="fp-dot"/>DevUI</div>
          <span className="fp-copy">© 2025 DevUI. MIT License.</span>
        </div>
      </div>
    ),
    react:`<Footer variant="grid" columns={4}>
  <Footer.Column title="Product">
    <Footer.Link>Components</Footer.Link>
    <Footer.Link>Templates</Footer.Link>
  </Footer.Column>
  <Footer.Column title="Docs">...</Footer.Column>
  <Footer.Column title="Company">...</Footer.Column>
  <Footer.Column title="Legal">...</Footer.Column>
</Footer>`,
    html:`<footer style="background:#0F0F0F;padding:32px 40px 24px;color:#fff;">
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;margin-bottom:24px;">
    <div>
      <h4 style="font-size:9px;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:10px;">Product</h4>
      <a href="#" style="display:block;font-size:12px;color:rgba(255,255,255,.45);margin-bottom:6px;">Components</a>
    </div>
  </div>
</footer>`
  },
  {
    name:"Footer with CTA Banner", tag:"CTA", level:"Intermediate",
    preview:(
      <div className="fp-footer" style={{ maxWidth:460 }}>
        <div style={{ background:"rgba(99,102,241,.12)", border:"1px solid rgba(99,102,241,.25)",
          borderRadius:10, padding:"16px 18px", marginBottom:16, textAlign:"center" }}>
          <div style={{ fontSize:14.5, fontWeight:700, color:"#fff", marginBottom:5 }}>Ready to ship faster?</div>
          <div style={{ fontSize:12.5, color:"rgba(255,255,255,.5)", marginBottom:12 }}>Start using DevUI today. Free forever.</div>
          <button className="btn btn-indigo btn-sm">Get started free →</button>
        </div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <div className="fp-title" style={{ marginBottom:0 }}><span className="fp-dot"/>DevUI</div>
          <div className="fp-social">{["𝕏","⭐","💬"].map(i => <div key={i} className="fp-social-btn">{i}</div>)}</div>
          <span className="fp-copy">© 2025 DevUI</span>
        </div>
      </div>
    ),
    react:`<Footer>
  <Footer.CTA
    title="Ready to ship faster?"
    description="Start using DevUI in your project today."
    action={<Button variant="indigo">Get started free →</Button>}
  />
  <Footer.Bottom>
    <Footer.Logo>DevUI</Footer.Logo>
    <Footer.Socials />
    <Footer.Copy>© 2025 DevUI</Footer.Copy>
  </Footer.Bottom>
</Footer>`,
    html:`<footer style="background:#0F0F0F;padding:32px 40px 24px;">
  <div style="background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.25);
    border-radius:10px;padding:20px;text-align:center;margin-bottom:20px;">
    <h3 style="color:#fff;font-size:16px;margin-bottom:6px;">Ready to ship faster?</h3>
    <p style="color:rgba(255,255,255,.5);font-size:13px;margin-bottom:14px;">Free forever.</p>
    <button class="btn btn-indigo btn-sm">Get started free →</button>
  </div>
</footer>`
  }
];

/* ─────────────────────────────────────────────────────────────────
   REGISTRY
───────────────────────────────────────────────────────────────── */
const REGISTRY = [
  { id:"button",  label:"Button",  emoji:"🔘", desc:"All button variants, sizes, loading states, and groups.",      count:5, variants:BUTTONS  },
  { id:"badge",   label:"Badge",   emoji:"🏷",  desc:"Status badges, color variants, sizes, counters, dismissible.", count:5, variants:BADGES   },
  { id:"input",   label:"Input",   emoji:"📝", desc:"Form fields, search, password strength, addons, textarea.",    count:5, variants:INPUTS   },
  { id:"avatar",  label:"Avatar",  emoji:"👤", desc:"Sizes, status indicators, group stacking, profile cards.",     count:5, variants:AVATARS  },
  { id:"modal",   label:"Modal",   emoji:"🪟", desc:"Dialogs, confirm, alerts, forms, and mobile bottom sheets.",   count:5, variants:MODALS   },
  { id:"tab",     label:"Tab",     emoji:"📑", desc:"Underline, pill, icons, vertical, and scrollable tabs.",       count:5, variants:TABS     },
  { id:"nav",     label:"Nav",     emoji:"🧭", desc:"Navbar, dark, dropdown, sidebar, and mobile hamburger nav.",   count:5, variants:NAVS     },
  { id:"loading", label:"Loading", emoji:"⏳", desc:"Spinners, dots, progress bars, skeleton loaders, overlays.",   count:5, variants:LOADING  },
  { id:"footer",  label:"Footer",  emoji:"📄", desc:"Full footer, minimal, newsletter, grid, and CTA banner.",      count:5, variants:FOOTERS  },
];

const CATS = ["All", ...REGISTRY.map(r => r.label)];

/* ─────────────────────────────────────────────────────────────────
   MAIN APP
───────────────────────────────────────────────────────────────── */
export default function DevUI() {
  const [cat, setCat]       = useState("All");
  const [search, setSearch] = useState("");
  const mainRef             = useRef(null);

  const visible = REGISTRY.filter(r => {
    const matchCat    = cat === "All" || r.label === cat;
    const matchSearch = r.label.toLowerCase().includes(search.toLowerCase()) ||
                        r.desc.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalVariants = visible.reduce((s, r) => s + r.count, 0);
  const scrollTop = () => mainRef.current?.scrollTo({ top:0, behavior:"smooth" });

  return (
    <>
      <style>{CSS}</style>

      {/* TOP NAV */}
      <nav className="topnav">
        <a href="#" className="brand" onClick={e => { e.preventDefault(); setCat("All"); setSearch(""); }}>
          <span className="brand-dot"/>dev.UI
        </a>
        <div className="topnav-links">
          <button className="topnav-link active">Components</button>
          <button className="topnav-link">Templates</button>
          <button className="topnav-link">Docs</button>
        </div>
        <div className="topnav-spacer"/>
        <button className="gh-btn">⭐ Star on GitHub</button>
      </nav>

      {/* LAYOUT */}
      <div className="page-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sb-search-wrap">
            <div className="sb-search">
              <span style={{ fontSize:13, color:"#B0ACA6" }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"/>
              {search && <span style={{ cursor:"pointer", fontSize:13, color:"#B0ACA6" }} onClick={() => setSearch("")}>×</span>}
            </div>
          </div>
          <div className="sb-nav">
            <div className="sb-section">Getting Started</div>
            <button onClick={() => { setCat("All"); setSearch(""); scrollTop(); }}
              className={`sb-item${cat==="All" && !search ? " active" : ""}`}>
              Overview
              <span className="sb-count">{REGISTRY.reduce((s,r) => s + r.count, 0)}</span>
            </button>
            <div className="sb-section" style={{ marginTop:8 }}>Components</div>
            {REGISTRY.map(r => (
              <button key={r.id} onClick={() => { setCat(r.label); setSearch(""); scrollTop(); }}
                className={`sb-item${cat === r.label ? " active" : ""}`}>
                <span>{r.emoji} {r.label}</span>
                <span className="sb-count">{r.count}</span>
              </button>
            ))}
          </div>
        </aside>

        {/* MAIN */}
        <div className="main-scroll" ref={mainRef}>

          {/* HERO */}
          {cat === "All" && !search && (
            <div className="page-hero">
              <div className="page-hero-inner">
                <div className="eyebrow">Component Library</div>
                <h1 className="hero-h1">Beautiful UI, <span>zero&nbsp;friction</span></h1>
                <p className="hero-sub">
                  {REGISTRY.reduce((s,r) => s + r.count, 0)}+ production-ready components.
                  Copy-paste into React or plain HTML. Dark mode. TypeScript. Free.
                </p>
                <div className="hero-stats">
                  <div className="stat">
                    <span className="stat-num">{REGISTRY.reduce((s,r) => s + r.count, 0)}+</span>
                    <span className="stat-label">Components</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">{REGISTRY.length}</span>
                    <span className="stat-label">Categories</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">2</span>
                    <span className="stat-label">Frameworks</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">Free</span>
                    <span className="stat-label">MIT License</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TOOLBAR */}
          <div className="toolbar">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search components…"/>
            </div>
            <div className="filter-row">
              {CATS.map(c => (
                <button key={c} onClick={() => { setCat(c); scrollTop(); }}
                  className={`filter-btn${cat === c ? " active" : ""}`}>{c}</button>
              ))}
            </div>
            <span className="results-label">{totalVariants} variants</span>
          </div>

          {/* COMPONENT GROUPS */}
          <div className="comp-groups">
            {visible.length === 0 ? (
              <div className="empty-state">
                <div style={{ fontSize:36, marginBottom:12 }}>🔍</div>
                <h3>No results for "{search}"</h3>
                <p>Try a different keyword like "button" or "modal".</p>
                <button className="btn btn-primary btn-sm" style={{ marginTop:16 }}
                  onClick={() => { setSearch(""); setCat("All"); }}>
                  Clear search
                </button>
              </div>
            ) : (
              visible.map(comp => (
                <div key={comp.id} className="comp-group">
                  <div className="group-header">
                    <div className="group-title">
                      <span className="group-emoji">{comp.emoji}</span>
                      {comp.label}
                      <span className="group-badge">{comp.count} variants</span>
                    </div>
                    <span className="group-desc">{comp.desc}</span>
                  </div>
                  {comp.variants.map((v, i) => (
                    <VariantRow
                      key={i}
                      num={i + 1}
                      name={v.name}
                      tag={v.tag}
                      level={v.level}
                      preview={v.preview}
                      react={v.react}
                      html={v.html}
                      defaultOpen={i === 0}
                    />
                  ))}
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  );
}