import { useState, useEffect, useRef } from "react";

/* ── NAV DATA ─────────────────────────────────────────── */
const NAV_GROUPS = [
  { section: "Getting Started", items: ["Overview"] },
  { section: "Layout", items: ["Card", "Divider"] },
  { section: "Inputs", items: ["Button", "Checkbox", "Input", "Radio", "Select", "Toggle"] },
  { section: "Display", items: ["Badge", "Breadcrumbs", "Chip", "Skeleton", "Tooltip"] },
  { section: "Feedback", items: ["Alert", "Modal", "Progress", "Toast"] },
  { section: "Navigation", items: ["Accordion", "Pagination", "Tabs"] },
];
const ALL_ITEMS = NAV_GROUPS.flatMap(g => g.items);
const FRAMEWORKS = ["React", "Vue", "Angular", "HTML"];

/* ── META ─────────────────────────────────────────────── */
const META = {
  Overview: { desc: "48+ production-ready components for React, Vue, Angular, and HTML. Zero config. Full TypeScript. WCAG 2.1 AA." },
  Badge: { desc: "Small status indicators for tags, notifications, and labels." },
  Breadcrumbs: { desc: "Navigation trail showing where a user is within the app." },
  Card: { desc: "Flexible surface for grouping related content and actions." },
  Chip: { desc: "Compact tags for categories, filters, and user attributes." },
  Divider: { desc: "Visual separator between content sections, horizontal or vertical." },
  Button: { desc: "Triggers actions and navigation. Full variants, sizes, and loading states." },
  Checkbox: { desc: "Binary selection control with indeterminate state for select-all patterns." },
  Input: { desc: "Text field with label, validation, icons, and accessible error messaging." },
  Radio: { desc: "Single-selection control for mutually exclusive options." },
  Select: { desc: "Dropdown with search, multi-select, and grouped options." },
  Toggle: { desc: "Binary switch — smoother than a checkbox for boolean preferences." },
  Alert: { desc: "Contextual feedback for success, errors, warnings, and information." },
  Modal: { desc: "Accessible overlay dialogs for confirmations, forms, and focused tasks." },
  Progress: { desc: "Animated progress bars and step indicators with color variants." },
  Skeleton: { desc: "Loading placeholders that mimic content shape to reduce perceived wait." },
  Toast: { desc: "Non-blocking notifications that auto-dismiss. Fire-and-forget." },
  Tooltip: { desc: "Contextual labels on hover. Accessible via keyboard and screen readers." },
  Accordion: { desc: "Expandable sections for FAQs, settings panels, and navigation groups." },
  Tabs: { desc: "Organize content into switchable panels with multiple style variants." },
  Pagination: { desc: "Navigate paginated data with accessible previous/next controls." },
};

/* ── PROPS TABLE DATA ─────────────────────────────────── */
const PROPS = {
  Button: [
    { name:"variant", type:"string", def:'"primary"', desc:'"primary" | "secondary" | "outline" | "ghost" | "destructive"' },
    { name:"size", type:"string", def:'"md"', desc:'"sm" | "md" | "lg" | "icon"' },
    { name:"loading", type:"boolean", def:"false", desc:"Show spinner and disable interaction" },
    { name:"disabled", type:"boolean", def:"false", desc:"Disable the button" },
    { name:"leftIcon", type:"ReactNode", def:"—", desc:"Icon element rendered before the label" },
  ],
  Badge: [
    { name:"variant", type:"string", def:'"default"', desc:'"default" | "success" | "warning" | "error" | "info"' },
    { name:"size", type:"string", def:'"md"', desc:'"sm" | "md" | "lg"' },
    { name:"dot", type:"boolean", def:"false", desc:"Show a colored dot indicator before label" },
    { name:"dismissible", type:"boolean", def:"false", desc:"Render a remove (×) button" },
  ],
  Input: [
    { name:"label", type:"string", def:"—", desc:"Label rendered above the field" },
    { name:"error", type:"string", def:"—", desc:"Error message — also triggers error styles" },
    { name:"hint", type:"string", def:"—", desc:"Helper text below the field" },
    { name:"leftIcon", type:"ReactNode", def:"—", desc:"Icon inside the left edge of input" },
    { name:"disabled", type:"boolean", def:"false", desc:"Disable the field" },
  ],
  Modal: [
    { name:"open", type:"boolean", def:"false", desc:"Controls modal visibility" },
    { name:"onClose", type:"() => void", def:"—", desc:"Called when backdrop or × clicked" },
    { name:"size", type:"string", def:'"md"', desc:'"sm" | "md" | "lg" | "xl" | "full"' },
    { name:"title", type:"string", def:"—", desc:"Modal header title text" },
    { name:"closeOnBackdrop", type:"boolean", def:"true", desc:"Clicking backdrop closes the modal" },
  ],
  Toggle: [
    { name:"checked", type:"boolean", def:"false", desc:"Controlled checked state" },
    { name:"onChange", type:"(v:boolean)=>void", def:"—", desc:"Called with new boolean value" },
    { name:"size", type:"string", def:'"md"', desc:'"sm" | "md" | "lg"' },
    { name:"disabled", type:"boolean", def:"false", desc:"Disable the toggle" },
  ],
  Progress: [
    { name:"value", type:"number", def:"0", desc:"Progress 0–100" },
    { name:"color", type:"string", def:'"blue"', desc:"Color preset or any hex string" },
    { name:"size", type:"string", def:'"md"', desc:'"sm" | "md" | "lg"' },
    { name:"striped", type:"boolean", def:"false", desc:"Add animated stripe texture" },
    { name:"showValue", type:"boolean", def:"false", desc:"Show percentage label" },
  ],
  Accordion: [
    { name:"items", type:"AccordionItem[]", def:"[]", desc:"Array of { title, content }" },
    { name:"multiple", type:"boolean", def:"false", desc:"Allow multiple panels open at once" },
    { name:"defaultOpen", type:"number[]", def:"—", desc:"Panel index(es) open by default" },
  ],
  Tabs: [
    { name:"items", type:"TabItem[]", def:"[]", desc:"Array of { label, content }" },
    { name:"defaultIndex", type:"number", def:"0", desc:"Initially active tab index" },
    { name:"variant", type:"string", def:'"underline"', desc:'"underline" | "pill" | "card"' },
    { name:"onChange", type:"(i:number)=>void", def:"—", desc:"Called with new active index" },
  ],
  Pagination: [
    { name:"page", type:"number", def:"1", desc:"Current page (1-indexed)" },
    { name:"total", type:"number", def:"required", desc:"Total page count" },
    { name:"onChange", type:"(p:number)=>void", def:"required", desc:"Called with new page number" },
    { name:"siblingCount", type:"number", def:"1", desc:"Pages shown around current" },
  ],
};

/* ── CODE SNIPPETS ────────────────────────────────────── */
const CODE = {
  Overview: {
    React:`// Install
npm install @uikit/react

// Import
import { Button, Card, Badge } from "@uikit/react";

// Use in your component
export default function App() {
  return (
    <Card>
      <Badge variant="success" dot>Active</Badge>
      <h2>Analytics Dashboard</h2>
      <p>48,291 total events this month.</p>
      <Button variant="primary">View Report</Button>
    </Card>
  );
}`,
    Vue:`// Install
npm install @uikit/vue

// main.ts
import { createApp } from "vue";
import UiKit from "@uikit/vue";
import "@uikit/vue/dist/style.css";

createApp(App).use(UiKit).mount("#app");

// Component.vue
<template>
  <UiCard>
    <UiBadge variant="success" dot>Active</UiBadge>
    <h2>Analytics Dashboard</h2>
    <UiButton variant="primary">View Report</UiButton>
  </UiCard>
</template>`,
    Angular:`// Install
npm install @uikit/angular

// app.module.ts
import { UiKitModule } from "@uikit/angular";

@NgModule({ imports: [UiKitModule] })
export class AppModule {}

// template
<ui-badge variant="success">Active</ui-badge>
<ui-button variant="primary">Get started</ui-button>`,
    HTML:`<link rel="stylesheet" href="https://cdn.uikit.dev/css/uikit.min.css" />

<span class="uk-badge uk-badge-success">Active</span>
<button class="uk-btn uk-btn-primary">Get Started</button>
<div class="uk-card uk-card-padded">
  <h2>Analytics</h2>
  <p>48,291</p>
</div>`,
  },
  Button: {
    React:`import { Button } from "@uikit/react";
import { useState } from "react";

export default function Example() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Delete</Button>
      <Button
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 2000);
        }}
      >
        Save Changes
      </Button>
    </div>
  );
}`,
    Vue:`<template>
  <div class="flex gap-2 flex-wrap">
    <UiButton variant="primary">Primary</UiButton>
    <UiButton variant="secondary">Secondary</UiButton>
    <UiButton variant="outline">Outline</UiButton>
    <UiButton variant="ghost">Ghost</UiButton>
    <UiButton variant="destructive">Delete Account</UiButton>
    <UiButton :loading="saving" @click="save">Save</UiButton>
  </div>
</template>`,
    Angular:`<ui-button variant="primary">Primary</ui-button>
<ui-button variant="secondary">Secondary</ui-button>
<ui-button variant="destructive">Delete Account</ui-button>

export class AppComponent {
  saving = false;
  async save() {
    this.saving = true;
    await this.service.save();
    this.saving = false;
  }
}`,
    HTML:`<button class="uk-btn uk-btn-primary">Primary</button>
<button class="uk-btn uk-btn-secondary">Secondary</button>
<button class="uk-btn uk-btn-outline">Outline</button>
<button class="uk-btn uk-btn-ghost">Ghost</button>
<button class="uk-btn uk-btn-destructive">Delete</button>`,
  },
  Badge: {
    React:`import { Badge } from "@uikit/react";

export default function Example() {
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
      <Badge variant="default">Default</Badge>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="error" dot>Failed</Badge>
      <Badge variant="info">New</Badge>
      {/* Sizes */}
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  );
}`,
    Vue:`<template>
  <div class="flex gap-2 flex-wrap">
    <UiBadge variant="default">Default</UiBadge>
    <UiBadge variant="success" dot>Active</UiBadge>
    <UiBadge variant="warning" dot>Pending</UiBadge>
    <UiBadge variant="error" dot>Failed</UiBadge>
  </div>
</template>`,
    Angular:`<ui-badge variant="default">Default</ui-badge>
<ui-badge variant="success" [dot]="true">Active</ui-badge>
<ui-badge variant="warning" [dot]="true">Pending</ui-badge>
<ui-badge variant="error" [dot]="true">Failed</ui-badge>`,
    HTML:`<span class="uk-badge">Default</span>
<span class="uk-badge uk-badge-success uk-badge-dot">Active</span>
<span class="uk-badge uk-badge-warning uk-badge-dot">Pending</span>
<span class="uk-badge uk-badge-error uk-badge-dot">Failed</span>`,
  },
  Input: {
    React:`import { Input } from "@uikit/react";
import { useState } from "react";

export default function Example() {
  const [pass, setPass] = useState("");
  const error = pass.length > 0 && pass.length < 8
    ? "Must be at least 8 characters."
    : undefined;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <Input label="Email address" type="email" leftIcon={<MailIcon />} />
      <Input label="Username" hint="3–20 chars, letters and numbers only." />
      <Input
        label="Password"
        type="password"
        value={pass}
        onChange={e => setPass(e.target.value)}
        error={error}
      />
    </div>
  );
}`,
    Vue:`<template>
  <div class="flex flex-col gap-4">
    <UiInput label="Email" type="email" :left-icon="MailIcon" />
    <UiInput label="Username" hint="3–20 chars." />
    <UiInput
      label="Password"
      type="password"
      v-model="pass"
      :error="passError"
    />
  </div>
</template>`,
    Angular:`<ui-input label="Email" type="email"></ui-input>
<ui-input label="Username" hint="3–20 chars."></ui-input>
<ui-input
  label="Password"
  type="password"
  [(ngModel)]="pass"
  [error]="passError">
</ui-input>`,
    HTML:`<div class="uk-field">
  <label class="uk-label">Email address</label>
  <div class="uk-input-wrap uk-input-icon-left">
    <span class="uk-icon">✉</span>
    <input class="uk-input" type="email" placeholder="you@example.com" />
  </div>
</div>`,
  },
};

ALL_ITEMS.forEach(comp => {
  if (!CODE[comp]) {
    CODE[comp] = {};
    FRAMEWORKS.forEach(fw => {
      CODE[comp][fw] = `import { ${comp} } from "@uikit/${fw.toLowerCase() === "html" ? "css" : fw.toLowerCase()}";

// Basic usage
<${comp} />

// With common props
<${comp} variant="default" size="md" />`;
    });
  } else {
    FRAMEWORKS.forEach(fw => {
      if (!CODE[comp][fw]) {
        CODE[comp][fw] = `// ${comp} — ${fw} usage coming soon.
import { ${comp} } from "@uikit/${fw.toLowerCase()}";
<${comp} />`;
      }
    });
  }
});

/* ── LIVE PREVIEWS ────────────────────────────────────── */
function OverviewPreview() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
        {[
          { n:"01", icon:"📦", title:"Install", bg:"#eff6ff", dot:"#3b5bdb", desc:"One npm command." },
          { n:"02", icon:"🎨", title:"Customize", bg:"#ecfdf5", dot:"#10b981", desc:"CSS variables." },
          { n:"03", icon:"🚀", title:"Ship", bg:"#fffbeb", dot:"#f59e0b", desc:"Production-ready." },
        ].map(s => (
          <div key={s.n} style={{ flex:"1 1 140px", background:s.bg, border:"1.5px solid transparent", borderRadius:12, padding:"16px 14px", position:"relative" }}>
            <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"#111", marginBottom:3 }}>{s.title}</div>
            <div style={{ fontSize:11.5, color:"#666" }}>{s.desc}</div>
            <div style={{ position:"absolute", top:12, right:12, fontSize:10, fontWeight:700, color:s.dot, letterSpacing:1 }}>{s.n}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"flex", gap:10 }}>
        {[{v:"48+",l:"Components"},{v:"4.2kb",l:"Gzipped"},{v:"AA",l:"Accessible"},{v:"4",l:"Frameworks"}].map(s => (
          <div key={s.l} style={{ flex:1, background:"#F5F4F1", borderRadius:10, padding:"12px 8px", textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:700, color:"#111" }}>{s.v}</div>
            <div style={{ fontSize:10.5, color:"#888", marginTop:2 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BadgePreview() {
  const variants = [
    { label:"Default", bg:"#F5F4F1", color:"#3D3B37", border:"#E9E7E3", dot:"#A09D98" },
    { label:"Success", bg:"#ecfdf5", color:"#065f46", border:"#a7f3d0", dot:"#10b981" },
    { label:"Warning", bg:"#fffbeb", color:"#92400e", border:"#fcd34d", dot:"#f59e0b" },
    { label:"Error", bg:"#fff1f2", color:"#9f1239", border:"#fda4af", dot:"#ef4444" },
    { label:"Info", bg:"#eff6ff", color:"#1e40af", border:"#bfdbfe", dot:"#3b82f6" },
  ];
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
      {variants.map(v => (
        <span key={v.label} style={{ display:"inline-flex", alignItems:"center", gap:5, background:v.bg, color:v.color, border:`1.5px solid ${v.border}`, borderRadius:100, padding:"3px 10px 3px 7px", fontSize:12, fontWeight:500 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:v.dot, flexShrink:0 }}/>
          {v.label}
        </span>
      ))}
    </div>
  );
}

function ButtonPreview() {
  const [loading, setLoading] = useState(false);
  const btns = [
    { label:"Primary", bg:"#111110", color:"#fff", border:"transparent" },
    { label:"Secondary", bg:"#F5F4F1", color:"#3D3B37", border:"#E9E7E3" },
    { label:"Outline", bg:"transparent", color:"#111", border:"#D0CECC" },
    { label:"Ghost", bg:"transparent", color:"#6B6863", border:"transparent" },
    { label:"Destructive", bg:"#ef4444", color:"#fff", border:"transparent" },
  ];
  return (
    <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
      {btns.map(b => (
        <button key={b.label} style={{ padding:"7px 15px", borderRadius:8, fontSize:13, fontWeight:500, background:b.bg, color:b.color, border:`1.5px solid ${b.border}`, cursor:"pointer", fontFamily:"inherit", transition:"opacity .15s" }}
          onMouseOver={e => e.currentTarget.style.opacity="0.8"}
          onMouseOut={e => e.currentTarget.style.opacity="1"}>
          {b.label}
        </button>
      ))}
      <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
        disabled={loading}
        style={{ padding:"7px 15px", borderRadius:8, fontSize:13, fontWeight:500, background:"#111110", color:"#fff", border:"none", cursor:loading?"not-allowed":"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:7, opacity:loading?0.7:1, minWidth:115, justifyContent:"center" }}>
        {loading ? (<><span style={{ width:12, height:12, border:"2px solid rgba(255,255,255,.3)", borderTop:"2px solid #fff", borderRadius:"50%", animation:"spin 0.7s linear infinite", display:"inline-block" }}/> Saving…</>) : "▶ Try Loading"}
      </button>
    </div>
  );
}

function InputPreview() {
  const [focused, setFocused] = useState(null);
  const [pass, setPass] = useState("");
  const err = pass.length > 0 && pass.length < 8;
  const borderColor = (name, isErr) => isErr ? "#ef4444" : focused === name ? "#111110" : "#E9E7E3";
  const shadow = (name, isErr) => isErr ? "0 0 0 3px rgba(239,68,68,.1)" : focused === name ? "0 0 0 3px rgba(17,17,16,.07)" : "none";
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
      <div>
        <div style={{ fontSize:12, fontWeight:500, color:"#3D3B37", marginBottom:5 }}>Email address</div>
        <div style={{ display:"flex", alignItems:"center", border:`1.5px solid ${borderColor("em",false)}`, borderRadius:8, background:"#fff", boxShadow:shadow("em",false), transition:"all .15s", overflow:"hidden" }}>
          <span style={{ padding:"0 10px", color:"#B0ACA6", fontSize:14, flexShrink:0 }}>✉</span>
          <input type="email" placeholder="you@example.com" onFocus={()=>setFocused("em")} onBlur={()=>setFocused(null)} style={{ border:"none", outline:"none", fontSize:13, flex:1, fontFamily:"inherit", background:"transparent", color:"#111", padding:"7px 10px 7px 0" }}/>
        </div>
      </div>
      <div>
        <div style={{ fontSize:12, fontWeight:500, color:"#3D3B37", marginBottom:5 }}>Username</div>
        <input onFocus={()=>setFocused("us")} onBlur={()=>setFocused(null)} style={{ border:`1.5px solid ${borderColor("us",false)}`, borderRadius:8, padding:"7px 11px", fontSize:13, outline:"none", background:"#fff", boxShadow:shadow("us",false), transition:"all .15s", fontFamily:"inherit", color:"#111", width:"100%", boxSizing:"border-box" }}/>
        <div style={{ fontSize:11.5, color:"#888", marginTop:5 }}>3–20 chars, letters and numbers only.</div>
      </div>
      <div>
        <div style={{ fontSize:12, fontWeight:500, color:"#3D3B37", marginBottom:5 }}>Password</div>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} onFocus={()=>setFocused("pw")} onBlur={()=>setFocused(null)} placeholder="••••••••" style={{ border:`1.5px solid ${borderColor("pw",err)}`, borderRadius:8, padding:"7px 11px", fontSize:13, outline:"none", background:"#fff", boxShadow:shadow("pw",err), transition:"all .15s", fontFamily:"inherit", color:"#111", width:"100%", boxSizing:"border-box" }}/>
        {err && <div style={{ fontSize:11.5, color:"#ef4444", marginTop:5 }}>Must be at least 8 characters.</div>}
      </div>
    </div>
  );
}

function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display:"flex", justifyContent:"center" }}>
      <button onClick={()=>setOpen(true)} style={{ padding:"8px 18px", borderRadius:8, background:"#111110", color:"#fff", border:"none", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>Open Modal</button>
      {open && (
        <div style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div onClick={()=>setOpen(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,.5)", backdropFilter:"blur(4px)" }}/>
          <div style={{ position:"relative", background:"#fff", borderRadius:14, padding:"24px", width:380, maxWidth:"90vw", boxShadow:"0 32px 64px rgba(0,0,0,.2)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
              <div>
                <div style={{ fontSize:16, fontWeight:600, color:"#111" }}>Delete Project</div>
                <div style={{ fontSize:12, color:"#888", marginTop:2 }}>This action cannot be undone.</div>
              </div>
              <button onClick={()=>setOpen(false)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:19, color:"#A09D98", lineHeight:1 }}>×</button>
            </div>
            <p style={{ fontSize:13, color:"#555", lineHeight:1.6, marginBottom:20 }}>Deleting <strong>my-awesome-project</strong> will permanently remove all 48 files and associated data.</p>
            <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
              <button onClick={()=>setOpen(false)} style={{ padding:"7px 14px", borderRadius:8, background:"#F5F4F1", border:"1.5px solid #E9E7E3", fontSize:13, cursor:"pointer", fontFamily:"inherit", color:"#555" }}>Cancel</button>
              <button onClick={()=>setOpen(false)} style={{ padding:"7px 14px", borderRadius:8, background:"#ef4444", border:"none", color:"#fff", fontSize:13, fontWeight:500, cursor:"pointer", fontFamily:"inherit" }}>Yes, delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function AlertPreview() {
  const [shown, setShown] = useState([0,1,2,3]);
  const alerts = [
    { title:"Deployed successfully", msg:"v2.4.1 is live.", icon:"✓", bg:"#ecfdf5", border:"#a7f3d0", color:"#065f46" },
    { title:"Storage at 85%", msg:"Consider upgrading.", icon:"⚠", bg:"#fffbeb", border:"#fcd34d", color:"#92400e" },
    { title:"Build failed", msg:"TypeScript error in /src/api.ts.", icon:"✕", bg:"#fff1f2", border:"#fda4af", color:"#9f1239" },
    { title:"Update available", msg:"v3.2.0 is ready.", icon:"i", bg:"#eff6ff", border:"#bfdbfe", color:"#1e40af" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {alerts.filter((_,i)=>shown.includes(i)).map((a,i) => (
        <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, background:a.bg, border:`1.5px solid ${a.border}`, borderRadius:9, padding:"10px 12px" }}>
          <span style={{ fontSize:11, fontWeight:700, color:a.color, border:`1.5px solid ${a.color}`, borderRadius:"50%", width:18, height:18, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>{a.icon}</span>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:12.5, fontWeight:600, color:a.color }}>{a.title}</div>
            <div style={{ fontSize:11.5, color:a.color, opacity:.75, marginTop:1 }}>{a.msg}</div>
          </div>
          <button onClick={()=>setShown(shown.filter(x=>x!==i))} style={{ background:"none", border:"none", cursor:"pointer", fontSize:15, color:a.color, opacity:.45, lineHeight:1, padding:0, flexShrink:0 }}>×</button>
        </div>
      ))}
      {shown.length===0 && (
        <div style={{ textAlign:"center", padding:"8px 0" }}>
          <button onClick={()=>setShown([0,1,2,3])} style={{ fontSize:12, color:"#3D3B37", background:"none", border:"1.5px solid #E9E7E3", borderRadius:7, padding:"4px 12px", cursor:"pointer", fontFamily:"inherit" }}>Reset</button>
        </div>
      )}
    </div>
  );
}

function ProgressPreview() {
  const [vals, setVals] = useState([68,42,91,27]);
  const colors = ["#111110","#10b981","#f59e0b","#ef4444"];
  const labels = ["Storage","Bandwidth","CPU","Memory"];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {labels.map((l,i) => (
        <div key={l}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
            <span style={{ fontSize:12, color:"#555" }}>{l}</span>
            <span style={{ fontSize:12, fontWeight:600, color:colors[i] }}>{vals[i]}%</span>
          </div>
          <div style={{ height:8, background:"#F0EEE9", borderRadius:100, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${vals[i]}%`, background:colors[i], borderRadius:100, transition:"width 0.6s cubic-bezier(.4,0,.2,1)" }}/>
          </div>
        </div>
      ))}
      <button onClick={()=>setVals(vals.map(()=>Math.floor(Math.random()*88)+5))} style={{ alignSelf:"flex-start", marginTop:2, padding:"5px 13px", borderRadius:7, background:"#F5F4F1", border:"1.5px solid #E9E7E3", fontSize:11, cursor:"pointer", fontFamily:"inherit", color:"#3D3B37" }}>Animate</button>
    </div>
  );
}

function ToastPreview() {
  const [toasts, setToasts] = useState([]);
  const id = useRef(0);
  const TYPES = [
    { label:"Success", icon:"✓", color:"#10b981", bg:"#ecfdf5", border:"#a7f3d0" },
    { label:"Error", icon:"✕", color:"#ef4444", bg:"#fff1f2", border:"#fda4af" },
    { label:"Info", icon:"i", color:"#3b82f6", bg:"#eff6ff", border:"#bfdbfe" },
    { label:"Warning", icon:"⚠", color:"#f59e0b", bg:"#fffbeb", border:"#fcd34d" },
  ];
  const fire = t => {
    const tid = ++id.current;
    setToasts(p => [...p, { id:tid,...t }]);
    setTimeout(() => setToasts(p => p.filter(x=>x.id!==tid)), 3200);
  };
  return (
    <div style={{ position:"relative", minHeight:100 }}>
      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
        {TYPES.map(t => (
          <button key={t.label} onClick={()=>fire(t)} style={{ padding:"6px 14px", borderRadius:8, fontSize:12.5, fontWeight:500, border:"1.5px solid #E9E7E3", background:"#fff", cursor:"pointer", fontFamily:"inherit", color:"#3D3B37" }}>{t.label}</button>
        ))}
      </div>
      <div style={{ position:"absolute", bottom:0, right:0, display:"flex", flexDirection:"column", gap:6, alignItems:"flex-end" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ display:"flex", alignItems:"center", gap:10, background:t.bg||"#fff", border:`1.5px solid ${t.border||"#eee"}`, borderRadius:10, padding:"9px 14px", boxShadow:"0 4px 16px rgba(0,0,0,.08)", animation:"fadeIn .2s ease", minWidth:180 }}>
            <span style={{ width:18, height:18, borderRadius:"50%", background:t.color, color:"#fff", fontSize:10, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{t.icon}</span>
            <div>
              <div style={{ fontSize:12.5, fontWeight:600, color:"#111" }}>{t.label}</div>
              <div style={{ fontSize:11, color:"#888" }}>Action completed.</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AccordionPreview() {
  const [open, setOpen] = useState(0);
  const items = [
    { q:"What frameworks are supported?", a:"React, Vue, Angular, and Svelte — all first-class with TypeScript." },
    { q:"Is it accessible?", a:"Yes — WCAG 2.1 AA with full keyboard navigation and ARIA." },
    { q:"Can I use Tailwind CSS?", a:"Yes. Zero default styles. Works with any CSS approach." },
    { q:"Is there a Figma kit?", a:"A community Figma library with all tokens is available free." },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0, border:"1.5px solid #E9E7E3", borderRadius:10, overflow:"hidden" }}>
      {items.map((item,i) => (
        <div key={i} style={{ borderBottom:i<items.length-1?"1.5px solid #E9E7E3":"none" }}>
          <button onClick={()=>setOpen(open===i?-1:i)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:500, color:"#111", textAlign:"left", gap:12 }}>
            {item.q}
            <span style={{ transform:open===i?"rotate(180deg)":"rotate(0)", transition:"transform .2s", color:"#888", fontSize:12, flexShrink:0 }}>↓</span>
          </button>
          {open===i && (
            <div style={{ padding:"0 14px 12px", fontSize:13, color:"#555", lineHeight:1.6 }}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function TabsPreview() {
  const [active, setActive] = useState(0);
  const tabs = [
    { label:"Overview", c:"Get started quickly with comprehensive docs. No config needed." },
    { label:"Props", c:"Every component exposes a well-typed API with sensible defaults." },
    { label:"Examples", c:"Interactive examples covering forms, dashboards, tables and more." },
    { label:"Changelog", c:"v3.1.0 — Tooltip added, Modal a11y improved, Dropdown z-index fixed." },
  ];
  return (
    <div>
      <div style={{ display:"flex", borderBottom:"1.5px solid #E9E7E3", marginBottom:16 }}>
        {tabs.map((t,i) => (
          <button key={i} onClick={()=>setActive(i)} style={{ padding:"8px 12px", background:"none", border:"none", borderBottom:`2px solid ${active===i?"#111110":"transparent"}`, marginBottom:-1.5, cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:500, color:active===i?"#111110":"#888", transition:"all .13s" }}>{t.label}</button>
        ))}
      </div>
      <div style={{ fontSize:13, color:"#555", lineHeight:1.6, background:"#F9F8F6", borderRadius:8, padding:"12px 14px" }}>{tabs[active].c}</div>
    </div>
  );
}

function PaginationPreview() {
  const [page, setPage] = useState(3);
  const total = 8;
  const btn = (active, disabled) => ({
    minWidth:32, height:32, borderRadius:7, border:"1.5px solid", fontSize:13, fontWeight:500,
    cursor:disabled?"not-allowed":"pointer", fontFamily:"inherit", transition:"all .13s",
    background:active?"#111110":"#fff", color:active?"#fff":"#6B6863",
    borderColor:active?"#111110":"#E9E7E3", opacity:disabled?.4:1, padding:"0 8px",
  });
  return (
    <div style={{ display:"flex", gap:6, alignItems:"center", flexWrap:"wrap" }}>
      <button onClick={()=>setPage(Math.max(1,page-1))} disabled={page===1} style={btn(false,page===1)}>‹</button>
      {Array.from({length:total},(_,i)=>i+1).map(n=>(
        <button key={n} onClick={()=>setPage(n)} style={btn(page===n,false)}>{n}</button>
      ))}
      <button onClick={()=>setPage(Math.min(total,page+1))} disabled={page===total} style={btn(false,page===total)}>›</button>
    </div>
  );
}

function TogglePreview() {
  const items = [
    { l:"Email notifications", d:"Receive updates via email" },
    { l:"Dark mode", d:"Use dark theme across the app" },
    { l:"Auto-save", d:"Save changes every 30 seconds" },
    { l:"Analytics tracking", d:"Help us improve with usage data" },
  ];
  const [st, setSt] = useState([true,false,true,false]);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
      {items.map(({l,d},i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 2px", borderBottom:i<items.length-1?"1.5px solid #F0EEE9":"none" }}>
          <div>
            <div style={{ fontSize:13, fontWeight:500, color:"#111" }}>{l}</div>
            <div style={{ fontSize:11.5, color:"#999" }}>{d}</div>
          </div>
          <button onClick={()=>setSt(st.map((s,j)=>j===i?!s:s))} style={{ width:34, height:19, borderRadius:100, border:"none", cursor:"pointer", transition:"background .18s", background:st[i]?"#111110":"#E9E7E3", position:"relative", flexShrink:0, padding:0 }}>
            <div style={{ position:"absolute", top:2, left:st[i]?15:2, width:15, height:15, borderRadius:"50%", background:"#fff", boxShadow:"0 1px 3px rgba(0,0,0,.2)", transition:"left .18s" }}/>
          </button>
        </div>
      ))}
    </div>
  );
}

function CheckboxPreview() {
  const tasks = ["Design system","Write unit tests","Deploy to staging","Code review","Update docs"];
  const [checked, setChecked] = useState([true,false,true,false,false]);
  const all = checked.every(Boolean), some = checked.some(Boolean) && !all;
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
      <div style={{ display:"flex", alignItems:"center", gap:9, padding:"8px 2px", borderBottom:"1.5px solid #E9E7E3", marginBottom:4 }}
        onClick={()=>setChecked(checked.map(()=>!all))}>
        <div style={{ width:15, height:15, borderRadius:4, border:`2px solid ${all||some?"#111110":"#D9D6D0"}`, background:all?"#111110":some?"#F5F4F1":"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
          {all&&<span style={{ color:"#fff", fontSize:9, lineHeight:1 }}>✓</span>}
          {some&&!all&&<div style={{ width:7, height:2, background:"#111", borderRadius:1 }}/>}
        </div>
        <span style={{ fontSize:13, fontWeight:600, color:"#111", cursor:"pointer" }}>Select all tasks</span>
      </div>
      {tasks.map((t,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:9, padding:"7px 2px", cursor:"pointer" }}
          onClick={()=>setChecked(checked.map((c,j)=>j===i?!c:c))}>
          <div style={{ width:15, height:15, borderRadius:4, border:`2px solid ${checked[i]?"#111110":"#D9D6D0"}`, background:checked[i]?"#111110":"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {checked[i]&&<span style={{ color:"#fff", fontSize:9, lineHeight:1 }}>✓</span>}
          </div>
          <span style={{ fontSize:13, color:checked[i]?"#111":"#777", textDecoration:checked[i]?"none":"line-through" }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

function SelectPreview() {
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const opts = ["Design System","Component Library","UI Kit","Pattern Library","Style Guide"];
  return (
    <div style={{ position:"relative" }}>
      <div style={{ fontSize:12, fontWeight:500, color:"#3D3B37", marginBottom:5 }}>Project type</div>
      <button onClick={()=>setOpen(!open)} style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"7px 11px", border:"1.5px solid #E9E7E3", borderRadius:8, background:"#fff", cursor:"pointer", fontFamily:"inherit", fontSize:13, color:val?"#111":"#B0ACA6", textAlign:"left" }}>
        {val||"Select an option…"}
        <span style={{ transform:open?"rotate(180deg)":"none", transition:"transform .2s", color:"#888", fontSize:10 }}>▼</span>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"100%", left:0, right:0, background:"#fff", border:"1.5px solid #E9E7E3", borderRadius:9, marginTop:4, zIndex:10, boxShadow:"0 8px 24px rgba(0,0,0,.1)", overflow:"hidden" }}>
          {opts.map(op => (
            <button key={op} onClick={()=>{setVal(op);setOpen(false);}} style={{ display:"block", width:"100%", textAlign:"left", padding:"8px 12px", background:val===op?"#F5F4F1":"none", border:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, color:val===op?"#111":"#3D3B37", transition:"background .1s" }}>{op}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function RadioPreview() {
  const [plan, setPlan] = useState("pro");
  const plans = [
    { id:"free", l:"Free", d:"Up to 3 projects, community support" },
    { id:"pro", l:"Pro", d:"Unlimited projects, priority support" },
    { id:"team", l:"Team", d:"SSO, audit logs, custom roles" },
  ];
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {plans.map(p => (
        <div key={p.id} onClick={()=>setPlan(p.id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px", border:`1.5px solid ${plan===p.id?"#111110":"#E9E7E3"}`, borderRadius:9, cursor:"pointer", background:plan===p.id?"#F5F4F1":"#fff", transition:"all .13s" }}>
          <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${plan===p.id?"#111110":"#D9D6D0"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
            {plan===p.id&&<div style={{ width:7, height:7, borderRadius:"50%", background:"#111110" }}/>}
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:500, color:"#111" }}>{p.l}</div>
            <div style={{ fontSize:11.5, color:"#888" }}>{p.d}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonPreview() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) { const t = setTimeout(() => setLoading(false), 2800); return () => clearTimeout(t); }
  }, [loading]);
  const sk = (w,h,r=5) => (
    <div style={{ width:w, height:h, borderRadius:r, background:"linear-gradient(90deg,#F0EEE9 25%,#E6E3DD 50%,#F0EEE9 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }}/>
  );
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      {loading ? (
        <div style={{ border:"1.5px solid #E9E7E3", borderRadius:12, padding:16, display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            {sk(36,36,100)}
            <div style={{ flex:1, display:"flex", flexDirection:"column", gap:6 }}>
              {sk("52%",10)}{sk("36%",9)}
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {sk("100%",10)}{sk("86%",10)}{sk("68%",10)}
          </div>
          <div style={{ display:"flex", gap:8 }}>{sk(56,26,7)}{sk(48,26,7)}</div>
        </div>
      ) : (
        <div style={{ border:"1.5px solid #E9E7E3", borderRadius:12, padding:16 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"#F0EEE9", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🎨</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"#111" }}>Design System v3</div>
              <div style={{ fontSize:11, color:"#888" }}>48 components · MIT</div>
            </div>
          </div>
          <p style={{ fontSize:12.5, color:"#555", lineHeight:1.6, margin:"0 0 12px" }}>A comprehensive design system built for modern product teams.</p>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ padding:"5px 13px", borderRadius:7, background:"#111", color:"#fff", border:"none", fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>Install</button>
            <button style={{ padding:"5px 13px", borderRadius:7, background:"#F5F4F1", color:"#555", border:"1.5px solid #E9E7E3", fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>Docs</button>
          </div>
        </div>
      )}
      <button onClick={()=>setLoading(true)} style={{ marginTop:4, fontSize:11, color:"#6B6863", background:"none", border:"none", cursor:"pointer", fontFamily:"inherit" }}>↺ Replay</button>
    </div>
  );
}

function TooltipPreview() {
  const [active, setActive] = useState(null);
  const items = [
    { label:"Save", icon:"💾" },
    { label:"Share", icon:"🔗" },
    { label:"Duplicate", icon:"📋" },
    { label:"Archive", icon:"📦" },
    { label:"Delete", icon:"🗑" },
  ];
  return (
    <div style={{ display:"flex", gap:10, alignItems:"center", justifyContent:"center", padding:"12px 0" }}>
      {items.map((item,i) => (
        <div key={i} style={{ position:"relative", display:"inline-flex" }}
          onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}>
          <button style={{ width:40, height:40, borderRadius:9, border:"1.5px solid #E9E7E3", background:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all .13s", boxShadow:active===i?"0 4px 12px rgba(0,0,0,.1)":"none" }}>{item.icon}</button>
          {active===i && (
            <div style={{ position:"absolute", bottom:"calc(100% + 8px)", left:"50%", transform:"translateX(-50%)", background:"#111110", color:"#fff", fontSize:11, fontWeight:500, padding:"4px 9px", borderRadius:6, whiteSpace:"nowrap", pointerEvents:"none", boxShadow:"0 4px 12px rgba(0,0,0,.2)" }}>
              {item.label}
              <div style={{ position:"absolute", bottom:-4, left:"50%", transform:"translateX(-50%)", width:8, height:8, background:"#111110", rotate:"45deg" }}/>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function ChipPreview() {
  const tags = ["React","TypeScript","Tailwind","GraphQL","Next.js"];
  const [active, setActive] = useState(["React","Tailwind"]);
  const [chips, setChips] = useState(["Design","Engineering","Product","Research"]);
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:1, color:"#B0ACA6" }}>FILTER — CLICK TO TOGGLE</div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {tags.map(t => (
          <button key={t} onClick={()=>setActive(active.includes(t)?active.filter(x=>x!==t):[...active,t])} style={{ padding:"3px 11px", borderRadius:100, fontSize:12, fontWeight:500, border:"1.5px solid", fontFamily:"inherit", cursor:"pointer", transition:"all .13s", background:active.includes(t)?"#111110":"transparent", color:active.includes(t)?"#fff":"#6B6863", borderColor:active.includes(t)?"#111110":"#E9E7E3" }}>
            {active.includes(t)&&"✓ "}{t}
          </button>
        ))}
      </div>
      <div style={{ fontSize:10, fontWeight:700, letterSpacing:1, color:"#B0ACA6" }}>DELETABLE</div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        {chips.map(c => (
          <span key={c} style={{ display:"inline-flex", alignItems:"center", gap:5, background:"#F5F4F1", border:"1.5px solid #E9E7E3", borderRadius:100, padding:"3px 6px 3px 11px", fontSize:12, color:"#3D3B37" }}>
            {c}
            <button onClick={()=>setChips(chips.filter(x=>x!==c))} style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:"#A09D98", lineHeight:1, padding:0 }}>×</button>
          </span>
        ))}
        {chips.length===0 && <span style={{ fontSize:12, color:"#B0ACA6", fontStyle:"italic" }}>All removed</span>}
      </div>
    </div>
  );
}

function BreadcrumbsPreview() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
      {[["Home","Projects","Frontend","Badge"],["Dashboard","Analytics","Monthly"],["Settings","Team","Permissions"]].map((trail,i) => (
        <div key={i} style={{ display:"flex", alignItems:"center", gap:4, flexWrap:"wrap" }}>
          {trail.map((item,j) => (
            <span key={j} style={{ display:"inline-flex", alignItems:"center", gap:4 }}>
              {j>0&&<span style={{ color:"#C8C5C0", fontSize:12 }}>›</span>}
              {j===trail.length-1
                ? <span style={{ fontSize:13, fontWeight:600, color:"#111" }}>{item}</span>
                : <a href="#" onClick={e=>e.preventDefault()} style={{ fontSize:13, color:"#3b5bdb", textDecoration:"none" }}>{item}</a>
              }
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

function CardPreview() {
  return (
    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
      {[
        { t:"Analytics", s:"Last 30 days", v:"48,291", ch:"+12.4%", color:"#111110", accent:"#F5F4F1" },
        { t:"Revenue", s:"This month", v:"$9,840", ch:"+8.1%", color:"#10b981", accent:"#ecfdf5" },
        { t:"Issues", s:"Open tickets", v:"24", ch:"−3 today", color:"#ef4444", accent:"#fff1f2" },
      ].map(c => (
        <div key={c.t} style={{ flex:"1 1 120px", border:"1.5px solid #E9E7E3", borderRadius:12, padding:"14px", background:"#fff", cursor:"pointer", transition:"all .2s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 24px rgba(0,0,0,.07)";e.currentTarget.style.borderColor="transparent";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="#E9E7E3";}}>
          <div style={{ fontSize:10.5, color:"#999", fontWeight:500, marginBottom:6, textTransform:"uppercase", letterSpacing:.5 }}>{c.s}</div>
          <div style={{ fontSize:12.5, fontWeight:600, color:"#555", marginBottom:4 }}>{c.t}</div>
          <div style={{ fontSize:22, fontWeight:700, color:"#111", marginBottom:4 }}>{c.v}</div>
          <div style={{ fontSize:11.5, fontWeight:600, color:c.color, background:c.accent, borderRadius:5, padding:"2px 7px", display:"inline-block" }}>{c.ch}</div>
        </div>
      ))}
    </div>
  );
}

function DividerPreview() {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
      <div>
        <div style={{ fontSize:11, color:"#B0ACA6", marginBottom:8, fontWeight:500, textTransform:"uppercase", letterSpacing:.5 }}>Default horizontal</div>
        <div style={{ height:1, background:"#E9E7E3" }}/>
      </div>
      <div>
        <div style={{ fontSize:11, color:"#B0ACA6", marginBottom:8, fontWeight:500, textTransform:"uppercase", letterSpacing:.5 }}>OR CONTINUE WITH</div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ flex:1, height:1, background:"#E9E7E3" }}/>
          <span style={{ fontSize:12, color:"#B0ACA6", fontWeight:500, padding:"0 4px" }}>OR</span>
          <div style={{ flex:1, height:1, background:"#E9E7E3" }}/>
        </div>
      </div>
      <div>
        <div style={{ fontSize:11, color:"#B0ACA6", marginBottom:8, fontWeight:500, textTransform:"uppercase", letterSpacing:.5 }}>With label</div>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ flex:1, height:1, background:"#E9E7E3" }}/>
          <span style={{ fontSize:11, fontWeight:600, color:"#888", padding:"2px 8px", border:"1.5px solid #E9E7E3", borderRadius:100 }}>Section break</span>
          <div style={{ flex:1, height:1, background:"#E9E7E3" }}/>
        </div>
      </div>
      <div>
        <div style={{ fontSize:11, color:"#B0ACA6", marginBottom:8, fontWeight:500, textTransform:"uppercase", letterSpacing:.5 }}>Gradient</div>
        <div style={{ height:1, background:"linear-gradient(90deg, transparent, #111110, transparent)" }}/>
      </div>
    </div>
  );
}

const PREVIEWS = {
  Overview: OverviewPreview, Badge: BadgePreview, Button: ButtonPreview, Input: InputPreview,
  Modal: ModalPreview, Progress: ProgressPreview, Toast: ToastPreview, Accordion: AccordionPreview,
  Tabs: TabsPreview, Pagination: PaginationPreview, Alert: AlertPreview, Toggle: TogglePreview,
  Checkbox: CheckboxPreview, Select: SelectPreview, Radio: RadioPreview, Skeleton: SkeletonPreview,
  Tooltip: TooltipPreview, Chip: ChipPreview, Breadcrumbs: BreadcrumbsPreview, Card: CardPreview,
  Divider: DividerPreview,
};

/* ── SYNTAX HIGHLIGHT ─────────────────────────────────── */
function Highlight({ code }) {
  const html = code
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/\b(import|from|export|default|const|function|return|let|var|async|await|true|false|null|undefined|class|if|else|for|of|in|new)\b/g,'<span style="color:#c678dd">$1</span>')
    .replace(/(\/\/[^\n]*)/g,'<span style="color:#7f848e;font-style:italic">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,'<span style="color:#98c379">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g,'<span style="color:#d19a66">$1</span>');
  return <code dangerouslySetInnerHTML={{ __html: html }} style={{ fontFamily:"'Fira Code', 'Cascadia Code', monospace", fontSize:12.5, lineHeight:1.7 }}/>;
}

/* ── STYLES ───────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body, #root { height: 100%; font-family: 'DM Sans', sans-serif; }
  .cd-root { display: flex; height: 100vh; background: #FAFAF8; font-family: 'DM Sans', sans-serif; overflow: hidden; }
  .cd-sidebar { width: 248px; flex-shrink: 0; background: #fff; border-right: 1.5px solid #E9E7E3; display: flex; flex-direction: column; height: 100%; overflow: hidden; }
  .cd-sidebar-logo { padding: 18px 18px 14px; display: flex; align-items: center; gap: 9px; border-bottom: 1.5px solid #F0EEE9; }
  .cd-sidebar-search { padding: 10px 12px; border-bottom: 1.5px solid #F0EEE9; }
  .cd-sidebar-search input { width: 100%; padding: 7px 10px; border: 1.5px solid #E9E7E3; border-radius: 8px; font-size: 12.5px; font-family: 'DM Sans', sans-serif; outline: none; background: #FAFAF8; color: #111; transition: border-color .15s; }
  .cd-sidebar-search input:focus { border-color: #111110; }
  .cd-sidebar-nav { flex: 1; overflow-y: auto; padding: 10px 0 16px; }
  .cd-sidebar-nav::-webkit-scrollbar { width: 3px; }
  .cd-sidebar-nav::-webkit-scrollbar-thumb { background: #E0DDD8; border-radius: 10px; }
  .cd-nav-group { margin-bottom: 2px; }
  .cd-nav-section { font-size: 10px; font-weight: 700; letter-spacing: .8px; color: #B0ACA6; padding: 8px 16px 4px; text-transform: uppercase; }
  .cd-nav-btn { display: block; width: 100%; text-align: left; padding: 6px 16px; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 13px; color: #6B6863; border-radius: 0; transition: all .12s; }
  .cd-nav-btn:hover { color: #111110; background: #F5F4F1; }
  .cd-nav-btn.active { color: #111110; background: #F0EEE9; font-weight: 600; border-right: 2.5px solid #111110; }
  .cd-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }
  .cd-topbar { display: flex; align-items: center; gap: 8px; padding: 0 20px; height: 52px; border-bottom: 1.5px solid #E9E7E3; background: #fff; flex-shrink: 0; }
  .cd-fw-btn { padding: 5px 13px; border-radius: 7px; border: 1.5px solid transparent; background: none; font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500; cursor: pointer; color: #6B6863; transition: all .13s; }
  .cd-fw-btn:hover { color: #111; background: #F5F4F1; }
  .cd-fw-btn.active { background: #111110; color: #fff; border-color: #111110; }
  .cd-content { flex: 1; overflow-y: auto; display: flex; gap: 0; min-height: 0; }
  .cd-content::-webkit-scrollbar { width: 4px; }
  .cd-content::-webkit-scrollbar-thumb { background: #E0DDD8; border-radius: 10px; }
  .cd-article { flex: 1; padding: 32px 36px; max-width: 860px; min-width: 0; }
  .cd-toc { width: 200px; flex-shrink: 0; padding: 28px 18px; border-left: 1.5px solid #E9E7E3; position: sticky; top: 0; height: fit-content; }
  .cd-section { margin-bottom: 32px; }
  .cd-section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .7px; color: #B0ACA6; margin-bottom: 14px; display: flex; align-items: center; gap: 8px; }
  .cd-section-title::after { content: ''; flex: 1; height: 1px; background: #E9E7E3; }
  .cd-preview-box { border: 1.5px solid #E9E7E3; border-radius: 12px; overflow: hidden; background: #fff; }
  .cd-preview-inner { padding: 24px; }
  .cd-code-box { background: #282c34; border-radius: 12px; overflow: hidden; }
  .cd-code-tabs { display: flex; gap: 0; background: #21252b; border-bottom: 1.5px solid #333; padding: 0 8px; }
  .cd-code-tab { padding: 8px 12px; background: none; border: none; font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; color: #7f848e; border-bottom: 2px solid transparent; transition: all .13s; }
  .cd-code-tab:hover { color: #abb2bf; }
  .cd-code-tab.active { color: #abb2bf; border-bottom-color: #61afef; }
  .cd-code-copy { padding: 8px 12px; background: none; border: none; font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500; cursor: pointer; color: #7f848e; margin-left: auto; transition: color .13s; }
  .cd-code-copy:hover { color: #abb2bf; }
  .cd-code-body { padding: 18px 20px; overflow-x: auto; }
  .cd-code-body pre { margin: 0; white-space: pre; }
  .cd-props-table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
  .cd-props-table th { text-align: left; padding: 8px 12px; font-size: 10.5px; font-weight: 700; letter-spacing: .6px; text-transform: uppercase; color: #B0ACA6; border-bottom: 1.5px solid #E9E7E3; }
  .cd-props-table td { padding: 9px 12px; border-bottom: 1.5px solid #F5F4F1; color: #555; vertical-align: top; }
  .cd-props-table tr:last-child td { border-bottom: none; }
  .cd-props-table tr:hover td { background: #FAFAF8; }
  .cd-prop-name { font-family: 'DM Mono', monospace; color: #111; font-weight: 500; font-size: 12px; }
  .cd-prop-type { font-family: 'DM Mono', monospace; color: #3b5bdb; font-size: 11.5px; }
  .cd-prop-def { font-family: 'DM Mono', monospace; color: #10b981; font-size: 11.5px; }
  .cd-toc-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .7px; color: #B0ACA6; margin-bottom: 10px; }
  .cd-toc-btn { display: block; width: 100%; text-align: left; background: none; border: none; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 12px; color: #888; padding: 4px 0; transition: color .13s; }
  .cd-toc-btn:hover { color: #111; }
  .cd-import-pill { display: inline-flex; align-items: center; gap: 6px; background: #F5F4F1; border: 1.5px solid #E9E7E3; border-radius: 8px; padding: 6px 12px; font-family: 'DM Mono', monospace; font-size: 12px; color: #555; margin-bottom: 24px; }
  .cd-badge-live { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 100px; background: #ecfdf5; color: #10b981; border: 1.5px solid #a7f3d0; }
  .cd-preview-header { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border-bottom: 1.5px solid #F0EEE9; background: #FAFAF8; }
  .cd-mobile-toggle { display: none; padding: 5px 10px; border-radius:7px; border: 1.5px solid #E9E7E3; background: #fff; font-size: 13px; cursor: pointer; }
  @media (max-width: 900px) {
    .cd-sidebar { position: fixed; z-index: 100; left: -260px; transition: left .25s; top: 0; height: 100vh; }
    .cd-sidebar.open { left: 0; box-shadow: 4px 0 24px rgba(0,0,0,.12); }
    .cd-mobile-toggle { display: flex; }
    .cd-toc { display: none; }
    .cd-article { padding: 20px 16px; }
    .cd-overlay { display: block !important; }
  }
  @media (max-width: 1100px) { .cd-toc { display: none; } }
  .cd-overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,.4); z-index: 90; }
  @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity:0; transform: translateY(4px); } to { opacity:1; transform: translateY(0); } }
`;

/* ── MAIN COMPONENT ───────────────────────────────────── */
export default function ComponentDocs() {
  const [selected, setSelected] = useState("Overview");
  const [fw, setFw] = useState("React");
  const [copied, setCopied] = useState(false);
  const [search, setSearch] = useState("");
  const [mobileSidebar, setMobileSidebar] = useState(false);
  const contentRef = useRef(null);

  const meta = META[selected] || {};
  const props = PROPS[selected] || [];
  const code = (CODE[selected]||{})[fw] || (CODE[selected]||{})["React"] || "// Coming soon";
  const PreviewComp = PREVIEWS[selected] || (() => (
    <div style={{ padding:32, textAlign:"center", color:"#B0ACA6" }}>
      <div style={{ fontSize:28, marginBottom:8 }}>🧩</div>
      <div style={{ fontSize:13 }}>Interactive preview</div>
    </div>
  ));

  const filtered = NAV_GROUPS
    .map(g => ({ ...g, items: g.items.filter(i => i.toLowerCase().includes(search.toLowerCase())) }))
    .filter(g => g.items.length > 0);

  const select = (item) => {
    setSelected(item);
    setMobileSidebar(false);
    contentRef.current?.scrollTo({ top:0, behavior:"smooth" });
  };

  const copy = () => {
    try { navigator.clipboard.writeText(code); } catch(_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="cd-overlay" onClick={()=>setMobileSidebar(false)} style={{ display: mobileSidebar ? "block" : "none" }}/>

      <div className="cd-root">
        {/* ── SIDEBAR ── */}
        <div className={`cd-sidebar${mobileSidebar?" open":""}`}>
          <div className="cd-sidebar-logo">
            <div style={{ width:30, height:30, borderRadius:8, background:"#111110", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14 }}>⬡</div>
            <div>
              <div style={{ fontSize:13.5, fontWeight:700, color:"#111" }}>UIKit</div>
              <div style={{ fontSize:10.5, color:"#B0ACA6" }}>v3.1.0</div>
            </div>
          </div>
          <div className="cd-sidebar-search">
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search components…"/>
          </div>
          <div className="cd-sidebar-nav">
            {filtered.map(group => (
              <div key={group.section} className="cd-nav-group">
                <div className="cd-nav-section">{group.section}</div>
                {group.items.map(item => (
                  <button key={item} onClick={()=>select(item)} className={`cd-nav-btn${selected===item?" active":""}`}>{item}</button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="cd-main">
          <div className="cd-topbar">
            <button className="cd-mobile-toggle" onClick={()=>setMobileSidebar(true)}>☰ Menu</button>
            <div style={{ flex:1 }}/>
            {FRAMEWORKS.map(f => (
              <button key={f} onClick={()=>setFw(f)} className={`cd-fw-btn${fw===f?" active":""}`}>{f}</button>
            ))}
            <div style={{ width:1, height:20, background:"#E9E7E3", margin:"0 4px" }}/>
            <span className="cd-badge-live">Interactive</span>
            <a href="#" onClick={e=>e.preventDefault()} style={{ fontSize:12, color:"#888", textDecoration:"none", padding:"5px 8px" }}>GitHub ↗</a>
          </div>

          {/* Scrollable content */}
          <div className="cd-content" ref={contentRef}>
            <div className="cd-article">
              {/* Breadcrumb */}
              <div style={{ fontSize:12, color:"#B0ACA6", marginBottom:16, display:"flex", alignItems:"center", gap:5 }}>
                <span>UIKit</span><span>›</span>
                <span>{NAV_GROUPS.find(g=>g.items.includes(selected))?.section||"Docs"}</span>
                {selected!=="Overview" && <><span>›</span><span style={{ color:"#555" }}>{selected}</span></>}
              </div>

              {/* Header */}
              <h1 style={{ fontSize:28, fontWeight:700, color:"#111110", marginBottom:8, letterSpacing:-.5 }}>{selected}</h1>
              <p style={{ fontSize:14.5, color:"#6B6863", lineHeight:1.6, marginBottom:20, maxWidth:580 }}>{meta.desc}</p>

              {selected!=="Overview" && (
                <div className="cd-import-pill">
                  <span style={{ color:"#B0ACA6", fontFamily:"inherit" }}>import</span>
                  <span style={{ color:"#111" }}>{"{ "}{selected}{" }"}</span>
                  <span style={{ color:"#B0ACA6" }}>from</span>
                  <span style={{ color:"#10b981" }}>"@uikit/{fw==="HTML"?"css":fw.toLowerCase()}"</span>
                </div>
              )}

              {/* Preview */}
              <div className="cd-section" id="preview">
                <div className="cd-section-title">Live Preview</div>
                <div className="cd-preview-box">
                  <div className="cd-preview-header">
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:"#f87171" }}/>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:"#fbbf24" }}/>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:"#34d399" }}/>
                    </div>
                    <div style={{ fontSize:11.5, color:"#B0ACA6", fontWeight:500 }}>Interactive · {fw}</div>
                    <div style={{ display:"flex", gap:4 }}>
                      {FRAMEWORKS.map(f => (
                        <button key={f} onClick={()=>setFw(f)} className={`cd-fw-btn${fw===f?" active":""}`} style={{ fontSize:11, padding:"3px 8px" }}>{f}</button>
                      ))}
                    </div>
                  </div>
                  <div className="cd-preview-inner">
                    <PreviewComp />
                  </div>
                </div>
              </div>

              {/* Code */}
              <div className="cd-section" id="code">
                <div className="cd-section-title">Code</div>
                <div className="cd-code-box">
                  <div className="cd-code-tabs">
                    {FRAMEWORKS.map(f => (
                      <button key={f} onClick={()=>setFw(f)} className={`cd-code-tab${fw===f?" active":""}`}>{f}</button>
                    ))}
                    <button className="cd-code-copy" onClick={copy}>{copied?"✓ Copied":"⧉ Copy"}</button>
                  </div>
                  <div className="cd-code-body">
                    <pre><Highlight code={code}/></pre>
                  </div>
                </div>
              </div>

              {/* Props */}
              {props.length>0 && (
                <div className="cd-section" id="props">
                  <div className="cd-section-title">Properties</div>
                  <div style={{ border:"1.5px solid #E9E7E3", borderRadius:12, overflow:"hidden", background:"#fff" }}>
                    <table className="cd-props-table">
                      <thead>
                        <tr>
                          <th>Prop</th><th>Type</th><th>Default</th><th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {props.map(p => (
                          <tr key={p.name}>
                            <td><span className="cd-prop-name">{p.name}</span></td>
                            <td><span className="cd-prop-type">{p.type}</span></td>
                            <td><span className="cd-prop-def">{p.def}</span></td>
                            <td style={{ fontSize:12 }}>{p.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* ── RIGHT TOC ── */}
            <div className="cd-toc">
              <div className="cd-toc-title">On this page</div>
              {["Live Preview","Code",...(props.length>0?["Properties"]:[])].map((sec,i) => (
                <button key={i} className="cd-toc-btn">{sec}</button>
              ))}
              <div style={{ height:1, background:"#E9E7E3", margin:"14px 0" }}/>
              <div className="cd-toc-title">Other Components</div>
              {ALL_ITEMS.filter(c=>c!==selected).slice(0,9).map(c => (
                <button key={c} onClick={()=>select(c)} className="cd-toc-btn">{c}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}