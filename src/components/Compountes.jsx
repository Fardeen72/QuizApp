import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ───────────────────────────────────────────────────────
   NOTE FOR INTEGRATION:
   • This component renders its OWN sidebar + content area.
   • Wrap it inside your existing layout (after your Navbar).
   • It does NOT include any top navbar / header — that comes
     from your existing app shell.
   • Add this route: <Route path="/components" element={<ComponentDocs />} />
─────────────────────────────────────────────────────── */

/* ── NAV DATA ─────────────────────────────────────────── */
const NAV_GROUPS = [
  { section: "Getting Started", items: ["Overview"] },
  { section: "Layout",          items: ["Card", "Divider"] },
  { section: "Inputs",          items: ["Button", "Checkbox", "Input", "Radio", "Select", "Toggle"] },
  { section: "Display",         items: ["Badge", "Breadcrumbs", "Chip", "Skeleton", "Tooltip"] },
  { section: "Feedback",        items: ["Alert", "Modal", "Progress", "Toast"] },
  { section: "Navigation",      items: ["Accordion", "Pagination", "Tabs"] },
];
const ALL_ITEMS = NAV_GROUPS.flatMap(g => g.items);
const FRAMEWORKS = ["React", "Vue", "Angular", "HTML"];

/* ── META ─────────────────────────────────────────────── */
const META = {
  Overview:    { desc: "48+ production-ready components for React, Vue, Angular, and HTML. Zero config. Full TypeScript. WCAG 2.1 AA." },
  Badge:       { desc: "Small status indicators for tags, notifications, and labels." },
  Breadcrumbs: { desc: "Navigation trail showing where a user is within the app." },
  Card:        { desc: "Flexible surface for grouping related content and actions." },
  Chip:        { desc: "Compact tags for categories, filters, and user attributes." },
  Divider:     { desc: "Visual separator between content sections, horizontal or vertical." },
  Button:      { desc: "Triggers actions and navigation. Full variants, sizes, and loading states." },
  Checkbox:    { desc: "Binary selection control with indeterminate state for select-all patterns." },
  Input:       { desc: "Text field with label, validation, icons, and accessible error messaging." },
  Radio:       { desc: "Single-selection control for mutually exclusive options." },
  Select:      { desc: "Dropdown with search, multi-select, and grouped options." },
  Toggle:      { desc: "Binary switch — smoother than a checkbox for boolean preferences." },
  Alert:       { desc: "Contextual feedback for success, errors, warnings, and information." },
  Modal:       { desc: "Accessible overlay dialogs for confirmations, forms, and focused tasks." },
  Progress:    { desc: "Animated progress bars and step indicators with color variants." },
  Skeleton:    { desc: "Loading placeholders that mimic content shape to reduce perceived wait." },
  Toast:       { desc: "Non-blocking notifications that auto-dismiss. Fire-and-forget." },
  Tooltip:     { desc: "Contextual labels on hover. Accessible via keyboard and screen readers." },
  Accordion:   { desc: "Expandable sections for FAQs, settings panels, and navigation groups." },
  Tabs:        { desc: "Organize content into switchable panels with multiple style variants." },
  Pagination:  { desc: "Navigate paginated data with accessible previous/next controls." },
};

/* ── PROPS TABLE DATA ─────────────────────────────────── */
const PROPS = {
  Button: [
    { name:"variant",  type:"string",   def:'"primary"',  desc:'"primary" | "secondary" | "outline" | "ghost" | "destructive"' },
    { name:"size",     type:"string",   def:'"md"',       desc:'"sm" | "md" | "lg" | "icon"' },
    { name:"loading",  type:"boolean",  def:"false",      desc:"Show spinner and disable interaction" },
    { name:"disabled", type:"boolean",  def:"false",      desc:"Disable the button" },
    { name:"leftIcon", type:"ReactNode",def:"—",          desc:"Icon element rendered before the label" },
  ],
  Badge: [
    { name:"variant",    type:"string",  def:'"default"', desc:'"default" | "success" | "warning" | "error" | "info"' },
    { name:"size",       type:"string",  def:'"md"',      desc:'"sm" | "md" | "lg"' },
    { name:"dot",        type:"boolean", def:"false",     desc:"Show a colored dot indicator before label" },
    { name:"dismissible",type:"boolean", def:"false",     desc:"Render a remove (×) button" },
  ],
  Input: [
    { name:"label",    type:"string",   def:"—",       desc:"Label rendered above the field" },
    { name:"error",    type:"string",   def:"—",       desc:"Error message — also triggers error styles" },
    { name:"hint",     type:"string",   def:"—",       desc:"Helper text below the field" },
    { name:"leftIcon", type:"ReactNode",def:"—",       desc:"Icon inside the left edge of input" },
    { name:"disabled", type:"boolean",  def:"false",   desc:"Disable the field" },
  ],
  Modal: [
    { name:"open",            type:"boolean",    def:"false",  desc:"Controls modal visibility" },
    { name:"onClose",         type:"() => void", def:"—",      desc:"Called when backdrop or × clicked" },
    { name:"size",            type:"string",     def:'"md"',   desc:'"sm" | "md" | "lg" | "xl" | "full"' },
    { name:"title",           type:"string",     def:"—",      desc:"Modal header title text" },
    { name:"closeOnBackdrop", type:"boolean",    def:"true",   desc:"Clicking backdrop closes the modal" },
  ],
  Toggle: [
    { name:"checked",  type:"boolean",          def:"false",  desc:"Controlled checked state" },
    { name:"onChange", type:"(v:boolean)=>void",def:"—",      desc:"Called with new boolean value" },
    { name:"size",     type:"string",           def:'"md"',   desc:'"sm" | "md" | "lg"' },
    { name:"disabled", type:"boolean",          def:"false",  desc:"Disable the toggle" },
  ],
  Progress: [
    { name:"value",    type:"number",  def:"0",       desc:"Progress 0–100" },
    { name:"color",    type:"string",  def:'"blue"',  desc:"Color preset or any hex string" },
    { name:"size",     type:"string",  def:'"md"',    desc:'"sm" | "md" | "lg"' },
    { name:"striped",  type:"boolean", def:"false",   desc:"Add animated stripe texture" },
    { name:"showValue",type:"boolean", def:"false",   desc:"Show percentage label" },
  ],
  Accordion: [
    { name:"items",      type:"AccordionItem[]",def:"[]",  desc:"Array of { title, content }" },
    { name:"multiple",   type:"boolean",        def:"false",desc:"Allow multiple panels open at once" },
    { name:"defaultOpen",type:"number[]",       def:"—",   desc:"Panel index(es) open by default" },
  ],
  Tabs: [
    { name:"items",       type:"TabItem[]",     def:"[]",         desc:"Array of { label, content }" },
    { name:"defaultIndex",type:"number",        def:"0",          desc:"Initially active tab index" },
    { name:"variant",     type:"string",        def:'"underline"',desc:'"underline" | "pill" | "card"' },
    { name:"onChange",    type:"(i:number)=>void",def:"—",        desc:"Called with new active index" },
  ],
  Pagination: [
    { name:"page",        type:"number",         def:"1",       desc:"Current page (1-indexed)" },
    { name:"total",       type:"number",         def:"required",desc:"Total page count" },
    { name:"onChange",    type:"(p:number)=>void",def:"required",desc:"Called with new page number" },
    { name:"siblingCount",type:"number",         def:"1",       desc:"Pages shown around current" },
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
    <Card hoverable>
      <Badge variant="success">Active</Badge>
      <h2>Analytics Dashboard</h2>
      <p>48,291 total events this month.</p>
      <Button>View Report</Button>
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
  <Card hoverable>
    <Badge variant="success">Active</Badge>
    <Button>Get started</Button>
  </Card>
</template>`,
    Angular:`// Install
npm install @uikit/angular

// app.module.ts
import { UiKitModule } from "@uikit/angular";
@NgModule({ imports: [UiKitModule] })
export class AppModule {}

// template
<app-card [hoverable]="true">
  <app-badge variant="success">Active</app-badge>
  <app-button>Get started</app-button>
</app-card>`,
    HTML:`<!-- CDN link -->
<link rel="stylesheet"
  href="https://cdn.uikit.dev/latest/uikit.min.css" />

<!-- Use classes directly -->
<span class="badge badge-success">Active</span>
<button class="btn btn-primary">Get Started</button>
<div class="card">
  <h3 class="card-title">Analytics</h3>
  <p class="card-value">48,291</p>
</div>`,
  },
  Button: {
    React:`import { Button } from "@uikit/react";
import { useState } from "react";

export default function Example() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex gap-2 flex-wrap">
      <Button>Primary</Button>
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
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Delete</Button>
  <Button :loading="saving" @click="save">Save</Button>
</template>

<script setup>
import { ref } from "vue";
import { Button } from "@uikit/vue";

const saving = ref(false);
const save = async () => {
  saving.value = true;
  await doSave();
  saving.value = false;
};
</script>`,
    Angular:`<app-button>Primary</app-button>
<app-button variant="secondary">Secondary</app-button>
<app-button variant="destructive" [loading]="saving">
  Delete Account
</app-button>

<!-- component.ts -->
export class AppComponent {
  saving = false;
  async save() {
    this.saving = true;
    await this.service.save();
    this.saving = false;
  }
}`,
    HTML:`<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-destructive">Delete</button>

<style>
.btn {
  padding: 8px 16px; border-radius: 8px;
  font-size: 13px; font-weight: 500;
  cursor: pointer; border: 1.5px solid transparent;
  transition: all 0.15s;
}
.btn-primary     { background:#111110; color:#fff; }
.btn-secondary   { background:#F5F4F1; color:#3D3B37; border-color:#E9E7E3; }
.btn-outline     { background:transparent; color:#111; border-color:#ccc; }
.btn-ghost       { background:transparent; color:#666; }
.btn-destructive { background:#ef4444; color:#fff; }
</style>`,
  },
  Badge: {
    React:`import { Badge } from "@uikit/react";

export default function Example() {
  return (
    <div className="flex gap-2 flex-wrap items-center">
      <Badge>Default</Badge>
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="error">Failed</Badge>
      <Badge variant="info" dot>New</Badge>

      {/* Sizes */}
      <Badge size="sm" variant="success">Small</Badge>
      <Badge size="md" variant="success">Medium</Badge>
      <Badge size="lg" variant="success">Large</Badge>
    </div>
  );
}`,
    Vue:`<template>
  <Badge>Default</Badge>
  <Badge variant="success">Active</Badge>
  <Badge variant="warning" dot>Pending</Badge>
  <Badge variant="error">Failed</Badge>
</template>

<script setup>
import { Badge } from "@uikit/vue";
</script>`,
    Angular:`<app-badge>Default</app-badge>
<app-badge variant="success">Active</app-badge>
<app-badge variant="warning" [dot]="true">Pending</app-badge>
<app-badge variant="error">Failed</app-badge>`,
    HTML:`<span class="badge badge-success">
  <span class="dot"></span> Active
</span>
<span class="badge badge-warning">Pending</span>
<span class="badge badge-error">Failed</span>

<style>
.badge {
  display: inline-flex; align-items: center;
  gap: 5px; padding: 2px 10px;
  border-radius: 100px; font-size: 12px;
  font-weight: 500; border: 1px solid;
}
.badge-success { background:#ecfdf5; color:#065f46; border-color:#a7f3d0; }
.badge-warning { background:#fffbeb; color:#92400e; border-color:#fcd34d; }
.badge-error   { background:#fff1f2; color:#9f1239; border-color:#fda4af; }
.dot { width:5px; height:5px; border-radius:50%; background:currentColor; }
</style>`,
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
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <Input label="Email" placeholder="you@example.com" />
      <Input
        label="Username"
        hint="3–20 chars, letters and numbers only."
      />
      <Input
        label="Password"
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        error={error}
      />
    </div>
  );
}`,
    Vue:`<template>
  <Input label="Email" placeholder="you@example.com" />
  <Input label="Username" hint="3–20 characters." />
  <Input
    label="Password"
    type="password"
    v-model="password"
    :error="passwordError"
  />
</template>

<script setup>
import { ref, computed } from "vue";
import { Input } from "@uikit/vue";

const password = ref("");
const passwordError = computed(() =>
  password.value.length > 0 && password.value.length < 8
    ? "Must be at least 8 characters." : ""
);
</script>`,
    Angular:`<app-input label="Email" placeholder="you@example.com"></app-input>
<app-input
  label="Password"
  type="password"
  [(ngModel)]="password"
  [error]="passwordError">
</app-input>`,
    HTML:`<div class="field">
  <label for="email">Email address</label>
  <div class="input-wrap">
    <span class="icon">✉</span>
    <input id="email" type="email" placeholder="you@example.com" />
  </div>
</div>

<style>
.field { display:flex; flex-direction:column; gap:4px; }
label  { font-size:12px; font-weight:500; color:#333; }
.input-wrap {
  display:flex; align-items:center; gap:8px;
  border:1.5px solid #e2e2e0; border-radius:8px;
  padding:7px 11px; background:#fff;
}
.input-wrap:focus-within {
  border-color:#111110;
  box-shadow:0 0 0 3px rgba(17,17,16,0.08);
}
input { border:none; outline:none; font-size:13px; flex:1; }
</style>`,
  },
};

// Fill missing code entries
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
    <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:16 }}>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
        {[
          { n:"01", icon:"📦", title:"Install",    bg:"#eff6ff", dot:"#3b5bdb", desc:"One npm command." },
          { n:"02", icon:"🎨", title:"Customize",  bg:"#ecfdf5", dot:"#10b981", desc:"CSS variables." },
          { n:"03", icon:"🚀", title:"Ship",       bg:"#fffbeb", dot:"#f59e0b", desc:"Production-ready." },
        ].map(s => (
          <div key={s.n} style={{ background:"#fff", border:"1.5px solid #ECEAE6", borderRadius:12, padding:"14px 12px", position:"relative" }}>
            <span style={{ position:"absolute", top:10, right:10, width:6, height:6, borderRadius:"50%", background:s.dot }} />
            <div style={{ fontSize:9, color:"#C0BCB6", letterSpacing:".1em", marginBottom:7 }}>{s.n}</div>
            <div style={{ width:30, height:30, borderRadius:7, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:12.5, fontWeight:600, color:"#111", marginBottom:3 }}>{s.title}</div>
            <div style={{ fontSize:11, color:"#888", lineHeight:1.5 }}>{s.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8 }}>
        {[{v:"48+",l:"Components"},{v:"4.2kb",l:"Gzipped"},{v:"AA",l:"Accessible"},{v:"4",l:"Frameworks"}].map(s => (
          <div key={s.l} style={{ background:"#fff", border:"1.5px solid #ECEAE6", borderRadius:10, padding:"10px", textAlign:"center" }}>
            <div style={{ fontSize:20, fontWeight:700, color:"#111", letterSpacing:"-.02em" }}>{s.v}</div>
            <div style={{ fontSize:10, color:"#aaa", marginTop:2 }}>{s.l}</div>
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
    { label:"Error",   bg:"#fff1f2", color:"#9f1239", border:"#fda4af", dot:"#ef4444" },
    { label:"Info",    bg:"#eff6ff", color:"#1e40af", border:"#bfdbfe", dot:"#3b82f6" },
  ];
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
      {variants.map(v => (
        <span key={v.label} style={{
          display:"inline-flex", alignItems:"center", gap:5,
          padding:"3px 11px", borderRadius:100, fontSize:12.5, fontWeight:500,
          background:v.bg, color:v.color, border:`1px solid ${v.border}`,
        }}>
          <span style={{ width:5, height:5, borderRadius:"50%", background:v.dot, flexShrink:0 }} />
          {v.label}
        </span>
      ))}
    </div>
  );
}

function ButtonPreview() {
  const [loading, setLoading] = useState(false);
  const btns = [
    { label:"Primary",     bg:"#111110", color:"#fff",    border:"transparent" },
    { label:"Secondary",   bg:"#F5F4F1", color:"#3D3B37", border:"#E9E7E3" },
    { label:"Outline",     bg:"transparent", color:"#111", border:"#D0CECC" },
    { label:"Ghost",       bg:"transparent", color:"#6B6863", border:"transparent" },
    { label:"Destructive", bg:"#ef4444", color:"#fff",    border:"transparent" },
  ];
  return (
    <div style={{ display:"flex", flexWrap:"wrap", gap:9, justifyContent:"center", alignItems:"center" }}>
      {btns.map(b => (
        <button key={b.label} style={{
          padding:"7px 15px", borderRadius:8, fontSize:13, fontWeight:500,
          background:b.bg, color:b.color, border:`1.5px solid ${b.border}`,
          cursor:"pointer", fontFamily:"inherit",
        }}>{b.label}</button>
      ))}
      <button
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}
        disabled={loading}
        style={{
          padding:"7px 15px", borderRadius:8, fontSize:13, fontWeight:500,
          background:"#111110", color:"#fff", border:"none",
          cursor:loading ? "not-allowed" : "pointer", fontFamily:"inherit",
          display:"flex", alignItems:"center", gap:7,
          opacity:loading ? 0.7 : 1, minWidth:115, justifyContent:"center",
        }}
      >
        {loading ? (
          <>
            <svg style={{ width:13,height:13,animation:"cd-spin .8s linear infinite",flexShrink:0 }} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.25)" strokeWidth="3"/>
              <path d="M4 12a8 8 0 018-8" stroke="#fff" strokeWidth="3" strokeLinecap="round"/>
            </svg>
            Saving…
          </>
        ) : "▶ Try Loading"}
      </button>
    </div>
  );
}

function InputPreview() {
  const [focused, setFocused] = useState(null);
  const [pass, setPass] = useState("");
  const err = pass.length > 0 && pass.length < 8;
  const borderColor = (name, isErr) =>
    isErr ? "#ef4444" : focused === name ? "#111110" : "#E9E7E3";
  const shadow = (name, isErr) =>
    isErr ? "0 0 0 3px rgba(239,68,68,.1)" : focused === name ? "0 0 0 3px rgba(17,17,16,.07)" : "none";
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:12, width:"100%", maxWidth:310 }}>
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        <span style={{ fontSize:12, fontWeight:500, color:"#3D3B37" }}>Email address</span>
        <div style={{ display:"flex", alignItems:"center", gap:8, border:`1.5px solid ${borderColor("em",false)}`, borderRadius:8, padding:"7px 11px", background:"#fff", boxShadow:shadow("em",false), transition:"all .15s" }}>
          <span style={{ color:"#B0ACA6", fontSize:13 }}>✉</span>
          <input placeholder="you@example.com" onFocus={()=>setFocused("em")} onBlur={()=>setFocused(null)}
            style={{ border:"none",outline:"none",fontSize:13,flex:1,fontFamily:"inherit",background:"transparent",color:"#111" }}/>
        </div>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        <span style={{ fontSize:12, fontWeight:500, color:"#3D3B37" }}>Username</span>
        <input placeholder="cooldev_42" onFocus={()=>setFocused("us")} onBlur={()=>setFocused(null)}
          style={{ border:`1.5px solid ${borderColor("us",false)}`,borderRadius:8,padding:"7px 11px",fontSize:13,outline:"none",background:"#fff",boxShadow:shadow("us",false),transition:"all .15s",fontFamily:"inherit",color:"#111",width:"100%",boxSizing:"border-box" }}/>
        <span style={{ fontSize:11, color:"#A09D98" }}>3–20 chars, letters and numbers only.</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
        <span style={{ fontSize:12, fontWeight:500, color:err?"#ef4444":"#3D3B37" }}>Password</span>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)}
          onFocus={()=>setFocused("pw")} onBlur={()=>setFocused(null)} placeholder="••••••••"
          style={{ border:`1.5px solid ${borderColor("pw",err)}`,borderRadius:8,padding:"7px 11px",fontSize:13,outline:"none",background:"#fff",boxShadow:shadow("pw",err),transition:"all .15s",fontFamily:"inherit",color:"#111",width:"100%",boxSizing:"border-box" }}/>
        {err && <span style={{ fontSize:11, color:"#ef4444" }}>Must be at least 8 characters.</span>}
      </div>
    </div>
  );
}

function ModalPreview() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={()=>setOpen(true)} style={{ padding:"8px 18px",borderRadius:8,background:"#111110",color:"#fff",border:"none",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit" }}>
        Open Modal
      </button>
      {open && (
        <div style={{ position:"fixed",inset:0,zIndex:9999,display:"flex",alignItems:"center",justifyContent:"center" }}>
          <div onClick={()=>setOpen(false)} style={{ position:"absolute",inset:0,background:"rgba(0,0,0,.5)",backdropFilter:"blur(4px)" }}/>
          <div style={{ position:"relative",background:"#fff",borderRadius:16,padding:"28px",width:"100%",maxWidth:400,margin:"0 20px",boxShadow:"0 32px 72px rgba(0,0,0,.18)",animation:"cd-up .2s ease" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14 }}>
              <div>
                <p style={{ fontSize:16,fontWeight:600,color:"#111" }}>Delete Project</p>
                <p style={{ fontSize:12,color:"#A09D98",marginTop:2 }}>This action cannot be undone.</p>
              </div>
              <button onClick={()=>setOpen(false)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:19,color:"#A09D98",lineHeight:1 }}>×</button>
            </div>
            <div style={{ background:"#fff1f2",border:"1px solid #fda4af",borderRadius:9,padding:"10px 13px",marginBottom:20,fontSize:13,color:"#9f1239",lineHeight:1.6 }}>
              Deleting <strong>my-awesome-project</strong> will permanently remove all 48 files.
            </div>
            <div style={{ display:"flex",gap:8,justifyContent:"flex-end" }}>
              <button onClick={()=>setOpen(false)} style={{ padding:"7px 14px",borderRadius:8,background:"#F5F4F1",border:"1.5px solid #E9E7E3",fontSize:13,cursor:"pointer",fontFamily:"inherit",color:"#555" }}>Cancel</button>
              <button onClick={()=>setOpen(false)} style={{ padding:"7px 14px",borderRadius:8,background:"#ef4444",border:"none",color:"#fff",fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:"inherit" }}>Yes, delete</button>
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
    { title:"Deployed successfully", msg:"v2.4.1 is live.",                icon:"✓", bg:"#ecfdf5", border:"#a7f3d0", color:"#065f46" },
    { title:"Storage at 85%",        msg:"Consider upgrading.",             icon:"⚠", bg:"#fffbeb", border:"#fcd34d", color:"#92400e" },
    { title:"Build failed",          msg:"TypeScript error in /src/api.ts.",icon:"✕", bg:"#fff1f2", border:"#fda4af", color:"#9f1239" },
    { title:"Update available",      msg:"v3.2.0 is ready.",                icon:"i", bg:"#eff6ff", border:"#bfdbfe", color:"#1e40af" },
  ];
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:7,width:"100%",maxWidth:380 }}>
      {alerts.filter((_,i)=>shown.includes(i)).map((a,i) => (
        <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:9,background:a.bg,border:`1px solid ${a.border}`,borderRadius:9,padding:"9px 11px",animation:"cd-up .2s ease" }}>
          <span style={{ fontSize:11,fontWeight:700,color:a.color,marginTop:1,width:14,textAlign:"center",flexShrink:0 }}>{a.icon}</span>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:12.5,fontWeight:500,color:a.color }}>{a.title}</p>
            <p style={{ fontSize:11.5,color:a.color,opacity:.75,marginTop:1 }}>{a.msg}</p>
          </div>
          <button onClick={()=>setShown(shown.filter(x=>x!==i))}
            style={{ background:"none",border:"none",cursor:"pointer",fontSize:15,color:a.color,opacity:.45,lineHeight:1,padding:0,flexShrink:0 }}>×</button>
        </div>
      ))}
      {shown.length===0 && (
        <div style={{ textAlign:"center" }}>
          <button onClick={()=>setShown([0,1,2,3])}
            style={{ fontSize:12,color:"#3D3B37",background:"none",border:"1.5px solid #E9E7E3",borderRadius:7,padding:"4px 12px",cursor:"pointer",fontFamily:"inherit" }}>
            Reset
          </button>
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
    <div style={{ display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:310 }}>
      {labels.map((l,i) => (
        <div key={l}>
          <div style={{ display:"flex",justifyContent:"space-between",marginBottom:5 }}>
            <span style={{ fontSize:12,color:"#3D3B37",fontWeight:500 }}>{l}</span>
            <span style={{ fontSize:12,color:"#A09D98" }}>{vals[i]}%</span>
          </div>
          <div style={{ height:5,background:"#F0EEE9",borderRadius:100,overflow:"hidden" }}>
            <div style={{ height:"100%",width:`${vals[i]}%`,background:colors[i],borderRadius:100,transition:"width .6s cubic-bezier(.34,1.56,.64,1)" }}/>
          </div>
        </div>
      ))}
      <button onClick={()=>setVals(vals.map(()=>Math.floor(Math.random()*88)+5))}
        style={{ alignSelf:"flex-start",marginTop:2,padding:"5px 13px",borderRadius:7,background:"#F5F4F1",border:"1.5px solid #E9E7E3",fontSize:11,cursor:"pointer",fontFamily:"inherit",color:"#3D3B37" }}>
        Animate
      </button>
    </div>
  );
}

function ToastPreview() {
  const [toasts, setToasts] = useState([]);
  const id = useRef(0);
  const TYPES = [
    { label:"Success", icon:"✓", color:"#10b981" },
    { label:"Error",   icon:"✕", color:"#ef4444" },
    { label:"Info",    icon:"i", color:"#111110" },
    { label:"Warning", icon:"⚠", color:"#f59e0b" },
  ];
  const fire = t => {
    const tid = ++id.current;
    setToasts(p => [...p, { id:tid,...t }]);
    setTimeout(() => setToasts(p => p.filter(x=>x.id!==tid)), 3200);
  };
  return (
    <div style={{ width:"100%" }}>
      <div style={{ display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center" }}>
        {TYPES.map(t => (
          <button key={t.label} onClick={()=>fire(t)}
            style={{ padding:"6px 14px",borderRadius:8,fontSize:12.5,fontWeight:500,border:"1.5px solid #E9E7E3",background:"#fff",cursor:"pointer",fontFamily:"inherit",color:"#3D3B37" }}>
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ position:"fixed",bottom:20,right:20,display:"flex",flexDirection:"column",gap:8,zIndex:9999,pointerEvents:"none" }}>
        {toasts.map(t => (
          <div key={t.id} style={{ background:"#111110",borderRadius:10,padding:"10px 15px",display:"flex",alignItems:"center",gap:10,boxShadow:"0 8px 28px rgba(0,0,0,.25)",animation:"cd-up .2s ease",minWidth:220,pointerEvents:"auto",borderLeft:`3px solid ${t.color}` }}>
            <span style={{ fontSize:12,fontWeight:700,color:t.color,flexShrink:0 }}>{t.icon}</span>
            <div>
              <p style={{ fontSize:12.5,fontWeight:500,color:"#fff" }}>{t.label}</p>
              <p style={{ fontSize:11,color:"rgba(255,255,255,.4)",marginTop:1 }}>Action completed.</p>
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
    { q:"Is it accessible?",             a:"Yes — WCAG 2.1 AA with full keyboard navigation and ARIA." },
    { q:"Can I use Tailwind CSS?",        a:"Yes. Zero default styles. Works with any CSS approach." },
    { q:"Is there a Figma kit?",          a:"A community Figma library with all tokens is available free." },
  ];
  return (
    <div style={{ width:"100%",maxWidth:400,display:"flex",flexDirection:"column",gap:4 }}>
      {items.map((item,i) => (
        <div key={i} style={{ border:"1.5px solid #E9E7E3",borderRadius:10,overflow:"hidden",background:"#fff" }}>
          <button onClick={()=>setOpen(open===i?-1:i)}
            style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 13px",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:500,color:"#111",textAlign:"left",gap:12 }}>
            {item.q}
            <span style={{ fontSize:12,color:"#A09D98",flexShrink:0,display:"inline-block",transform:open===i?"rotate(180deg)":"none",transition:"transform .18s" }}>↓</span>
          </button>
          {open===i && (
            <div style={{ padding:"0 13px 12px",paddingTop:9,fontSize:12.5,color:"#6B6863",lineHeight:1.65,borderTop:"1px solid #F0EEE9" }}>{item.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function TabsPreview() {
  const [active, setActive] = useState(0);
  const tabs = [
    { label:"Overview",  c:"Get started quickly with comprehensive docs. No config needed." },
    { label:"Props",     c:"Every component exposes a well-typed API with sensible defaults." },
    { label:"Examples",  c:"Interactive examples covering forms, dashboards, tables and more." },
    { label:"Changelog", c:"v3.1.0 — Tooltip added, Modal a11y improved, Dropdown z-index fixed." },
  ];
  return (
    <div style={{ width:"100%",maxWidth:400 }}>
      <div style={{ display:"flex",borderBottom:"1.5px solid #E9E7E3",marginBottom:14 }}>
        {tabs.map((t,i) => (
          <button key={i} onClick={()=>setActive(i)}
            style={{ padding:"8px 12px",background:"none",border:"none",borderBottom:`2px solid ${active===i?"#111110":"transparent"}`,marginBottom:-1.5,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:500,color:active===i?"#111110":"#888",transition:"all .13s" }}>
            {t.label}
          </button>
        ))}
      </div>
      <p key={active} style={{ fontSize:13,color:"#555",lineHeight:1.65,animation:"cd-up .2s ease" }}>{tabs[active].c}</p>
    </div>
  );
}

function PaginationPreview() {
  const [page, setPage] = useState(3);
  const total = 8;
  const btn = (active, disabled) => ({
    minWidth:32,height:32,borderRadius:7,border:"1.5px solid",fontSize:13,fontWeight:500,
    cursor:disabled?"not-allowed":"pointer",fontFamily:"inherit",transition:"all .13s",
    background:active?"#111110":"#fff",color:active?"#fff":"#6B6863",
    borderColor:active?"#111110":"#E9E7E3",opacity:disabled?.4:1,padding:"0 8px",
  });
  return (
    <div style={{ display:"flex",alignItems:"center",gap:4 }}>
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
    { l:"Email notifications",  d:"Receive updates via email" },
    { l:"Dark mode",            d:"Use dark theme across the app" },
    { l:"Auto-save",            d:"Save changes every 30 seconds" },
    { l:"Analytics tracking",   d:"Help us improve with usage data" },
  ];
  const [st, setSt] = useState([true,false,true,false]);
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12,width:"100%",maxWidth:280 }}>
      {items.map(({l,d},i) => (
        <div key={i} style={{ display:"flex",alignItems:"center",justifyContent:"space-between",gap:14 }}>
          <div>
            <p style={{ fontSize:12.5,fontWeight:500,color:"#111" }}>{l}</p>
            <p style={{ fontSize:10.5,color:"#A09D98",marginTop:1 }}>{d}</p>
          </div>
          <button onClick={()=>setSt(st.map((s,j)=>j===i?!s:s))}
            style={{ width:34,height:19,borderRadius:100,border:"none",cursor:"pointer",transition:"background .18s",background:st[i]?"#111110":"#E9E7E3",position:"relative",flexShrink:0,padding:0 }}>
            <span style={{ display:"block",width:13,height:13,borderRadius:100,background:"#fff",boxShadow:"0 1px 3px rgba(0,0,0,.2)",position:"absolute",top:3,left:st[i]?18:3,transition:"left .18s" }}/>
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
    <div style={{ display:"flex",flexDirection:"column",gap:8,minWidth:220 }}>
      <label style={{ display:"flex",alignItems:"center",gap:9,cursor:"pointer" }}>
        <div onClick={()=>setChecked(checked.map(()=>!all))}
          style={{ width:15,height:15,borderRadius:4,border:`2px solid ${all||some?"#111110":"#D9D6D0"}`,background:all?"#111110":some?"#F5F4F1":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer" }}>
          {all&&<svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          {some&&!all&&<div style={{ width:7,height:2,borderRadius:2,background:"#111110" }}/>}
        </div>
        <span style={{ fontSize:12.5,fontWeight:500,color:"#111" }}>Select all tasks</span>
      </label>
      <div style={{ borderTop:"1px solid #ECEAE6",paddingTop:7,display:"flex",flexDirection:"column",gap:7 }}>
        {tasks.map((t,i) => (
          <label key={i} style={{ display:"flex",alignItems:"center",gap:9,cursor:"pointer" }}>
            <div onClick={()=>setChecked(checked.map((c,j)=>j===i?!c:c))}
              style={{ width:15,height:15,borderRadius:4,border:`2px solid ${checked[i]?"#111110":"#D9D6D0"}`,background:checked[i]?"#111110":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer" }}>
              {checked[i]&&<svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{ fontSize:12.5,color:checked[i]?"#A09D98":"#3D3B37",textDecoration:checked[i]?"line-through":"none" }}>{t}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function SelectPreview() {
  const [val, setVal] = useState("");
  const [open, setOpen] = useState(false);
  const opts = ["Design System","Component Library","UI Kit","Pattern Library","Style Guide"];
  return (
    <div style={{ position:"relative",width:"100%",maxWidth:280 }}>
      <span style={{ fontSize:12,fontWeight:500,color:"#3D3B37",display:"block",marginBottom:4 }}>Project type</span>
      <button onClick={()=>setOpen(!open)}
        style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"7px 11px",border:"1.5px solid #E9E7E3",borderRadius:8,background:"#fff",cursor:"pointer",fontFamily:"inherit",fontSize:13,color:val?"#111":"#B0ACA6",textAlign:"left" }}>
        {val||"Select an option…"}
        <span style={{ fontSize:10,color:"#A09D98",transform:open?"rotate(180deg)":"none",transition:"transform .13s" }}>▼</span>
      </button>
      {open && (
        <div style={{ position:"absolute",top:"calc(100% + 5px)",left:0,right:0,background:"#fff",border:"1.5px solid #E9E7E3",borderRadius:8,boxShadow:"0 10px 28px rgba(0,0,0,.1)",zIndex:100,overflow:"hidden" }}>
          {opts.map(op => (
            <button key={op} onClick={()=>{setVal(op);setOpen(false);}}
              style={{ display:"block",width:"100%",textAlign:"left",padding:"8px 12px",background:val===op?"#F5F4F1":"none",border:"none",cursor:"pointer",fontFamily:"inherit",fontSize:13,color:val===op?"#111":"#3D3B37",transition:"background .1s" }}>
              {op}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function RadioPreview() {
  const [plan, setPlan] = useState("pro");
  const plans = [
    { id:"free", l:"Free",  d:"Up to 3 projects, community support" },
    { id:"pro",  l:"Pro",   d:"Unlimited projects, priority support" },
    { id:"team", l:"Team",  d:"SSO, audit logs, custom roles" },
  ];
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:7,width:"100%",maxWidth:300 }}>
      {plans.map(p => (
        <label key={p.id} onClick={()=>setPlan(p.id)}
          style={{ display:"flex",alignItems:"center",gap:10,padding:"9px 12px",border:`1.5px solid ${plan===p.id?"#111110":"#E9E7E3"}`,borderRadius:9,cursor:"pointer",background:plan===p.id?"#F5F4F1":"#fff",transition:"all .13s" }}>
          <div style={{ width:14,height:14,borderRadius:"50%",border:`2px solid ${plan===p.id?"#111110":"#D9D6D0"}`,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
            {plan===p.id&&<div style={{ width:6,height:6,borderRadius:"50%",background:"#111110" }}/>}
          </div>
          <div>
            <p style={{ fontSize:12.5,fontWeight:500,color:"#111" }}>{p.l}</p>
            <p style={{ fontSize:10.5,color:"#A09D98",marginTop:1 }}>{p.d}</p>
          </div>
        </label>
      ))}
    </div>
  );
}

function SkeletonPreview() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      const t = setTimeout(() => setLoading(false), 2800);
      return () => clearTimeout(t);
    }
  }, [loading]);
  const sk = (w,h,r=5) => (
    <div style={{ width:w,height:h,borderRadius:r,background:"linear-gradient(90deg,#F0EEE9 25%,#E5E2DC 50%,#F0EEE9 75%)",backgroundSize:"200% 100%",animation:"cd-shimmer 1.4s infinite" }}/>
  );
  return (
    <div style={{ width:"100%",maxWidth:310 }}>
      {loading ? (
        <div style={{ background:"#fff",border:"1.5px solid #E9E7E3",borderRadius:12,padding:"14px" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:12 }}>
            {sk(36,36,100)}
            <div style={{ flex:1,display:"flex",flexDirection:"column",gap:5 }}>
              {sk("52%",10)}{sk("36%",9)}
            </div>
          </div>
          {sk("100%",10)}<div style={{ marginTop:5 }}/>{sk("86%",10)}<div style={{ marginTop:5 }}/>{sk("68%",10)}
          <div style={{ marginTop:12,display:"flex",gap:6 }}>{sk(56,26,7)}{sk(48,26,7)}</div>
        </div>
      ) : (
        <div style={{ background:"#fff",border:"1.5px solid #E9E7E3",borderRadius:12,padding:"14px",animation:"cd-up .3s ease" }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:10 }}>
            <div style={{ width:36,height:36,borderRadius:"50%",background:"#F5F4F1",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>🎨</div>
            <div>
              <p style={{ fontSize:12.5,fontWeight:600,color:"#111" }}>Design System v3</p>
              <p style={{ fontSize:10.5,color:"#A09D98" }}>48 components · MIT</p>
            </div>
          </div>
          <p style={{ fontSize:12,color:"#6B6863",lineHeight:1.6 }}>A comprehensive design system built for modern product teams.</p>
          <div style={{ marginTop:12,display:"flex",gap:6 }}>
            <button style={{ padding:"5px 12px",borderRadius:7,background:"#111110",color:"#fff",border:"none",fontSize:11,cursor:"pointer",fontFamily:"inherit" }}>Install</button>
            <button style={{ padding:"5px 12px",borderRadius:7,background:"#F5F4F1",color:"#3D3B37",border:"1.5px solid #E9E7E3",fontSize:11,cursor:"pointer",fontFamily:"inherit" }}>Docs</button>
          </div>
        </div>
      )}
      <button onClick={()=>setLoading(true)} style={{ marginTop:8,fontSize:11,color:"#6B6863",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit" }}>↺ Replay</button>
    </div>
  );
}

function TooltipPreview() {
  const [active, setActive] = useState(null);
  const items = [
    { label:"Save",      icon:"💾" },
    { label:"Share",     icon:"🔗" },
    { label:"Duplicate", icon:"📋" },
    { label:"Archive",   icon:"📦" },
    { label:"Delete",    icon:"🗑" },
  ];
  return (
    <div style={{ display:"flex",gap:9,alignItems:"center",paddingTop:24 }}>
      {items.map((item,i) => (
        <div key={item.label} style={{ position:"relative" }} onMouseEnter={()=>setActive(i)} onMouseLeave={()=>setActive(null)}>
          <button style={{ width:36,height:36,borderRadius:9,border:`1.5px solid ${active===i?"#D0CECC":"#E9E7E3"}`,background:"#fff",cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:active===i?"0 4px 12px rgba(0,0,0,.08)":"none",transition:"all .13s" }}>
            {item.icon}
          </button>
          {active===i && (
            <div style={{ position:"absolute",bottom:"calc(100% + 7px)",left:"50%",transform:"translateX(-50%)",background:"#111110",color:"#fff",borderRadius:6,padding:"4px 10px",fontSize:11,fontWeight:500,whiteSpace:"nowrap",zIndex:100,animation:"cd-up .14s ease",fontFamily:"inherit" }}>
              {item.label}
              <div style={{ position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"4px solid transparent",borderRight:"4px solid transparent",borderTop:"4px solid #111110" }}/>
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
    <div style={{ display:"flex",flexDirection:"column",gap:12,width:"100%" }}>
      <div>
        <p style={{ fontSize:10,color:"#A09D98",marginBottom:7,letterSpacing:".06em" }}>FILTER — CLICK TO TOGGLE</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
          {tags.map(t => (
            <button key={t} onClick={()=>setActive(active.includes(t)?active.filter(x=>x!==t):[...active,t])}
              style={{ padding:"3px 11px",borderRadius:100,fontSize:12,fontWeight:500,border:"1.5px solid",fontFamily:"inherit",cursor:"pointer",transition:"all .13s",background:active.includes(t)?"#111110":"transparent",color:active.includes(t)?"#fff":"#6B6863",borderColor:active.includes(t)?"#111110":"#E9E7E3" }}>
              {active.includes(t)&&"✓ "}{t}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize:10,color:"#A09D98",marginBottom:7,letterSpacing:".06em" }}>DELETABLE</p>
        <div style={{ display:"flex",flexWrap:"wrap",gap:5 }}>
          {chips.map(c => (
            <span key={c} style={{ display:"inline-flex",alignItems:"center",gap:4,padding:"3px 10px",borderRadius:100,fontSize:12,background:"#F5F4F1",color:"#3D3B37",border:"1.5px solid #E9E7E3" }}>
              {c}
              <button onClick={()=>setChips(chips.filter(x=>x!==c))} style={{ background:"none",border:"none",cursor:"pointer",fontSize:13,color:"#A09D98",lineHeight:1,padding:0 }}>×</button>
            </span>
          ))}
          {chips.length===0 && <span style={{ fontSize:12,color:"#A09D98" }}>All removed</span>}
        </div>
      </div>
    </div>
  );
}

function BreadcrumbsPreview() {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:12,width:"100%" }}>
      {[["Home","Projects","Frontend","Badge"],["Dashboard","Analytics","Monthly"],["Settings","Team","Permissions"]].map((trail,i) => (
        <nav key={i} style={{ display:"flex",alignItems:"center",gap:3,fontSize:12.5,flexWrap:"wrap" }}>
          {trail.map((item,j) => (
            <span key={j} style={{ display:"flex",alignItems:"center",gap:3 }}>
              {j>0&&<span style={{ color:"#D9D6D0",fontSize:11 }}>›</span>}
              {j===trail.length-1
                ? <span style={{ color:"#111",fontWeight:500 }}>{item}</span>
                : <a href="#" onClick={e=>e.preventDefault()} style={{ color:"#3b5bdb",textDecoration:"none" }}>{item}</a>
              }
            </span>
          ))}
        </nav>
      ))}
    </div>
  );
}

function CardPreview() {
  return (
    <div style={{ display:"flex",gap:10,flexWrap:"wrap",justifyContent:"center" }}>
      {[
        { t:"Analytics",s:"Last 30 days",v:"48,291",ch:"+12.4%",color:"#111110" },
        { t:"Revenue",  s:"This month",  v:"$9,840", ch:"+8.1%", color:"#10b981" },
        { t:"Issues",   s:"Open tickets",v:"24",     ch:"−3 today",color:"#ef4444" },
      ].map(c => (
        <div key={c.t}
          style={{ background:"#fff",border:"1.5px solid #E9E7E3",borderRadius:12,padding:"15px 17px",width:145,cursor:"pointer",transition:"all .22s" }}
          onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 14px 28px rgba(0,0,0,.08)";e.currentTarget.style.borderColor="transparent";}}
          onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor="#E9E7E3";}}>
          <p style={{ fontSize:9,color:"#A09D98",letterSpacing:".1em",textTransform:"uppercase",marginBottom:3 }}>{c.s}</p>
          <p style={{ fontWeight:600,fontSize:12,color:"#111",marginBottom:8 }}>{c.t}</p>
          <p style={{ fontWeight:700,fontSize:20,color:c.color,letterSpacing:"-.02em" }}>{c.v}</p>
          <p style={{ fontSize:10.5,color:"#A09D98",marginTop:2 }}>{c.ch}</p>
        </div>
      ))}
    </div>
  );
}

function DividerPreview() {
  return (
    <div style={{ display:"flex",flexDirection:"column",gap:18,width:"100%",maxWidth:320 }}>
      <div>
        <div style={{ height:1,background:"#ECEAE6" }}/>
        <p style={{ fontSize:10.5,color:"#A09D98",marginTop:5 }}>Default horizontal</p>
      </div>
      <div>
        <div style={{ display:"flex",alignItems:"center",gap:10 }}>
          <div style={{ flex:1,height:1,background:"#ECEAE6" }}/>
          <span style={{ fontSize:10.5,color:"#A09D98",fontWeight:500,letterSpacing:".08em",whiteSpace:"nowrap" }}>OR CONTINUE WITH</span>
          <div style={{ flex:1,height:1,background:"#ECEAE6" }}/>
        </div>
        <p style={{ fontSize:10.5,color:"#A09D98",marginTop:5 }}>With label</p>
      </div>
      <div>
        <div style={{ height:1,background:"linear-gradient(90deg,transparent,#111110,transparent)" }}/>
        <p style={{ fontSize:10.5,color:"#A09D98",marginTop:5 }}>Gradient</p>
      </div>
    </div>
  );
}

const PREVIEWS = {
  Overview: OverviewPreview, Badge: BadgePreview, Button: ButtonPreview,
  Input: InputPreview, Modal: ModalPreview, Progress: ProgressPreview,
  Toast: ToastPreview, Accordion: AccordionPreview, Tabs: TabsPreview,
  Pagination: PaginationPreview, Alert: AlertPreview, Toggle: TogglePreview,
  Checkbox: CheckboxPreview, Select: SelectPreview, Radio: RadioPreview,
  Skeleton: SkeletonPreview, Tooltip: TooltipPreview, Chip: ChipPreview,
  Breadcrumbs: BreadcrumbsPreview, Card: CardPreview, Divider: DividerPreview,
};

/* ── SYNTAX HIGHLIGHT ─────────────────────────────────── */
function Highlight({ code }) {
  const html = code
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/\b(import|from|export|default|const|function|return|let|var|async|await|true|false|null|undefined|class|if|else|for|of|in|new)\b/g,'<span style="color:#7da7e2">$1</span>')
    .replace(/(\/\/[^\n]*)/g,'<span style="color:#6b7f5a;font-style:italic">$1</span>')
    .replace(/("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,'<span style="color:#9fcf8e">$1</span>')
    .replace(/\b(\d+(?:\.\d+)?)\b/g,'<span style="color:#f0a76a">$1</span>');
  return <span dangerouslySetInnerHTML={{ __html:html }}/>;
}

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
    <div style={{ textAlign:"center", padding:"20px 0" }}>
      <div style={{ fontSize:36, marginBottom:8 }}>🧩</div>
      <p style={{ fontSize:13, color:"#A09D98" }}>Interactive preview</p>
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
      <style>{`
        /* scoped to .cd- prefix to not conflict with your global styles */
        .cd-wrap {
          display: flex;
          height: calc(100vh - 64px); /* adjust 64px = your navbar height */
          overflow: hidden;
          font-family: 'DM Sans', -apple-system, sans-serif;
          background: #FFFFFF;
          color: #111110;
        }

        /* ── SIDEBAR ── */
        .cd-sidebar {
          width: 232px;
          flex-shrink: 0;
          background: #FAFAF9;
          border-right: 1px solid #ECEAE6;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .cd-sidebar-search {
          padding: 10px 12px;
          border-bottom: 1px solid #ECEAE6;
          flex-shrink: 0;
        }
        .cd-search-wrap {
          display: flex;
          align-items: center;
          gap: 7px;
          background: #fff;
          border: 1.5px solid #E9E7E3;
          border-radius: 8px;
          padding: 6px 10px;
        }
        .cd-search-wrap input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 12.5px;
          font-family: inherit;
          color: #111;
        }
        .cd-search-wrap input::placeholder { color: #B0ACA6; }
        .cd-nav { flex: 1; overflow-y: auto; padding: 8px 8px 24px; }
        .cd-nav::-webkit-scrollbar { width: 3px; }
        .cd-nav::-webkit-scrollbar-thumb { background: #E9E7E3; border-radius: 2px; }
        .cd-nav-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #C0BCB6;
          padding: 10px 9px 4px;
        }
        .cd-nav-btn {
          display: block;
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          padding: 6px 10px;
          border-radius: 7px;
          font-size: 13px;
          font-family: inherit;
          color: #6B6863;
          cursor: pointer;
          transition: background .12s, color .12s;
          margin-bottom: 1px;
        }
        .cd-nav-btn:hover { background: #F0EEE9; color: #111; }
        .cd-nav-btn.active { background: #111110; color: #fff; font-weight: 500; }

        /* ── MAIN ── */
        .cd-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }
        .cd-topstrip {
          flex-shrink: 0;
          background: #fff;
          border-bottom: 1px solid #ECEAE6;
          padding: 0 28px;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }
        .cd-fw-tabs { display: flex; gap: 3px; }
        .cd-fw-btn {
          padding: 4px 13px;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 500;
          font-family: inherit;
          border: 1.5px solid #E9E7E3;
          background: none;
          color: #6B6863;
          cursor: pointer;
          transition: all .12s;
        }
        .cd-fw-btn:hover { background: #F5F4F1; color: #111; border-color: #D9D6D0; }
        .cd-fw-btn.active { background: #111110; color: #fff; border-color: #111110; }
        .cd-strip-right { display: flex; align-items: center; gap: 12px; }
        .cd-live-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          font-weight: 500;
          color: #10b981;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          border-radius: 100px;
          padding: 3px 10px;
        }
        .cd-live-dot { width:5px; height:5px; border-radius:50%; background:#10b981; animation:cd-pulse 1.6s infinite; }
        .cd-gh { font-size: 12px; color: #A09D98; text-decoration: none; }
        .cd-gh:hover { color: #111; }

        .cd-scroll { flex: 1; overflow-y: auto; }
        .cd-scroll::-webkit-scrollbar { width: 4px; }
        .cd-scroll::-webkit-scrollbar-thumb { background: #E9E7E3; border-radius: 2px; }

        .cd-content {
          max-width: 760px;
          margin: 0 auto;
          padding: 40px 36px 80px;
        }

        /* ── RIGHT TOC ── */
        .cd-toc {
          width: 188px;
          flex-shrink: 0;
          border-left: 1px solid #ECEAE6;
          padding: 28px 14px;
          overflow-y: auto;
        }
        .cd-toc-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #C0BCB6;
          margin-bottom: 8px;
        }
        .cd-toc-btn {
          display: block;
          width: 100%;
          text-align: left;
          font-size: 12.5px;
          color: #A09D98;
          background: none;
          border: none;
          padding: 4px 8px;
          border-radius: 5px;
          margin-bottom: 1px;
          cursor: pointer;
          font-family: inherit;
          transition: all .12s;
        }
        .cd-toc-btn:hover { background: #F5F4F1; color: #111; }
        .cd-toc-btn.active { color: #111110; font-weight: 600; background: #F0EEE9; }

        /* ── BREADCRUMB ── */
        .cd-breadcrumb {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #A09D98;
          margin-bottom: 18px;
        }

        /* ── COMP HEADER ── */
        .cd-comp-title { font-size: 28px; font-weight: 600; color: #111110; margin-bottom: 10px; letter-spacing: -.02em; line-height: 1.2; }
        .cd-comp-desc  { font-size: 15px; color: #6B6863; line-height: 1.7; max-width: 540px; font-weight: 300; }
        .cd-import-box {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FAFAF9;
          border: 1.5px solid #E9E7E3;
          border-radius: 8px;
          padding: 7px 13px;
          margin-top: 14px;
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: 12.5px;
          color: #111110;
        }

        /* ── SECTION LABEL ── */
        .cd-sec-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: .13em;
          text-transform: uppercase;
          color: #A09D98;
          margin: 32px 0 12px;
          padding-top: 28px;
          border-top: 1px solid #F0EEE9;
        }
        .cd-sec-label:first-of-type { margin-top: 0; border-top: none; padding-top: 0; }

        /* ── PREVIEW BOX ── */
        .cd-preview {
          background: #fff;
          border: 1.5px solid #E9E7E3;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 24px;
        }
        .cd-preview-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 14px;
          background: #FAFAF9;
          border-bottom: 1px solid #E9E7E3;
        }
        .cd-preview-bar-left {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #A09D98;
          font-weight: 500;
        }
        .cd-preview-dot { width:5px; height:5px; border-radius:50%; background:#10b981; }
        .cd-preview-stage {
          padding: 40px 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 160px;
          background-image: radial-gradient(circle, #ECEAE6 1px, transparent 1px);
          background-size: 22px 22px;
          background-color: #fff;
        }

        /* ── CODE BLOCK ── */
        .cd-code {
          background: #131312;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #2a2a28;
          margin-bottom: 24px;
        }
        .cd-code-topbar {
          display: flex;
          align-items: center;
          background: #0e0e0d;
          border-bottom: 1px solid #2a2a28;
          padding: 0 3px 0 0;
        }
        .cd-code-tab {
          padding: 9px 14px;
          font-family: inherit;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,.28);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          transition: all .13s;
          white-space: nowrap;
        }
        .cd-code-tab:hover { color: rgba(255,255,255,.6); }
        .cd-code-tab.active { color: #fff; border-bottom-color: #fff; }
        .cd-copy-btn {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 4px 11px;
          border-radius: 6px;
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.1);
          color: rgba(255,255,255,.4);
          font-family: inherit;
          font-size: 11px;
          cursor: pointer;
          transition: all .13s;
          margin: 5px;
        }
        .cd-copy-btn:hover { background: rgba(255,255,255,.12); color: #fff; }
        .cd-copy-btn.ok { color: #10b981; border-color: rgba(16,185,129,.3); background: rgba(16,185,129,.07); }
        .cd-pre {
          padding: 20px 22px;
          font-family: 'DM Mono', 'Courier New', monospace;
          font-size: 12.5px;
          line-height: 1.85;
          color: rgba(255,255,255,.78);
          overflow-x: auto;
          white-space: pre;
          margin: 0;
        }

        /* ── PROPS TABLE ── */
        .cd-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #fff;
          border: 1.5px solid #E9E7E3;
          border-radius: 10px;
          overflow: hidden;
        }
        .cd-table thead tr { background: #FAFAF9; }
        .cd-table th {
          padding: 10px 14px;
          text-align: left;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #A09D98;
          border-bottom: 1.5px solid #E9E7E3;
        }
        .cd-table td {
          padding: 10px 14px;
          font-size: 12.5px;
          color: #6B6863;
          border-bottom: 1px solid #F0EEE9;
          vertical-align: top;
        }
        .cd-table tr:last-child td { border-bottom: none; }
        .cd-table tbody tr:hover td { background: #FAFAF9; }
        .pill-n { font-family:'DM Mono','Courier New',monospace; font-size:11px; background:#EEF0FF; color:#4F46E5; border-radius:4px; padding:1px 6px; }
        .pill-t { font-family:'DM Mono','Courier New',monospace; font-size:11px; background:#FEF9EC; color:#B45309; border-radius:4px; padding:1px 6px; }
        .pill-d { font-family:'DM Mono','Courier New',monospace; font-size:11px; background:#ECFDF5; color:#065F46; border-radius:4px; padding:1px 6px; }

        /* ── MOBILE OVERLAY ── */
        .cd-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.4);
          z-index: 200;
        }
        .cd-mobile-btn {
          display: none;
          background: none;
          border: 1.5px solid #E9E7E3;
          border-radius: 7px;
          padding: 5px 8px;
          cursor: pointer;
          color: #6B6863;
          font-family: inherit;
          font-size: 12px;
        }

        @media (max-width: 1100px) { .cd-toc { display: none; } }
        @media (max-width: 760px) {
          .cd-sidebar { position: fixed; top: 0; bottom: 0; left: 0; z-index: 201; transform: translateX(-100%); transition: transform .25s ease; }
          .cd-sidebar.open { transform: translateX(0); }
          .cd-overlay.open { display: block; }
          .cd-mobile-btn { display: flex; align-items: center; gap: 5px; }
          .cd-content { padding: 28px 20px 60px; }
        }

        /* ── ANIMATIONS ── */
        @keyframes cd-up      { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes cd-pulse   { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes cd-spin    { to{transform:rotate(360deg)} }
        @keyframes cd-shimmer { 0%{background-position:200% 0} to{background-position:-200% 0} }
        .cd-fadein { animation: cd-up .3s ease; }
      `}</style>

      {/* ── MOBILE OVERLAY ── */}
      <div className={`cd-overlay${mobileSidebar?" open":""}`} onClick={()=>setMobileSidebar(false)}/>

      <div className="cd-wrap">

        {/* ── LEFT SIDEBAR ── */}
        <aside className={`cd-sidebar${mobileSidebar?" open":""}`}>
          <div className="cd-sidebar-search">
            <div className="cd-search-wrap">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#B0ACA6" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search components…"/>
            </div>
          </div>
          <nav className="cd-nav">
            {filtered.map(group => (
              <div key={group.section}>
                <div className="cd-nav-label">{group.section}</div>
                {group.items.map(item => (
                  <button key={item} onClick={()=>select(item)} className={`cd-nav-btn${selected===item?" active":""}`}>
                    {item}
                  </button>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* ── MAIN ── */}
        <main className="cd-main">
          {/* Top strip with framework tabs */}
          <div className="cd-topstrip">
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <button className="cd-mobile-btn" onClick={()=>setMobileSidebar(true)}>
                ☰ Menu
              </button>
              <div className="cd-fw-tabs">
                {FRAMEWORKS.map(f => (
                  <button key={f} onClick={()=>setFw(f)} className={`cd-fw-btn${fw===f?" active":""}`}>{f}</button>
                ))}
              </div>
            </div>
            <div className="cd-strip-right">
              <div className="cd-live-pill">
                <span className="cd-live-dot"/>
                Interactive
              </div>
              <a href="#" className="cd-gh" onClick={e=>e.preventDefault()}>GitHub ↗</a>
            </div>
          </div>

          {/* Scrollable content */}
          <div className="cd-scroll" ref={contentRef}>
            <div className="cd-content cd-fadein" key={selected}>

              {/* Breadcrumb */}
              <div className="cd-breadcrumb">
                <span>UIKit</span>
                <span style={{ color:"#E9E7E3" }}>›</span>
                <span>{NAV_GROUPS.find(g=>g.items.includes(selected))?.section||"Docs"}</span>
                {selected!=="Overview" && <>
                  <span style={{ color:"#E9E7E3" }}>›</span>
                  <span style={{ color:"#111110", fontWeight:500 }}>{selected}</span>
                </>}
              </div>

              {/* Header */}
              <div style={{ marginBottom:28 }}>
                <h1 className="cd-comp-title">{selected}</h1>
                <p className="cd-comp-desc">{meta.desc}</p>
                {selected!=="Overview" && (
                  <div className="cd-import-box">
                    import {"{ "}{selected}{" }"} from "@uikit/{fw==="HTML"?"css":fw.toLowerCase()}"
                  </div>
                )}
              </div>

              {/* Preview */}
              <div className="cd-sec-label">Live Preview</div>
              <div className="cd-preview">
                <div className="cd-preview-bar">
                  <div className="cd-preview-bar-left">
                    <span className="cd-preview-dot"/>
                    Interactive · {fw}
                  </div>
                  <div className="cd-fw-tabs">
                    {FRAMEWORKS.map(f => (
                      <button key={f} onClick={()=>setFw(f)} className={`cd-fw-btn${fw===f?" active":""}`} style={{ fontSize:11, padding:"3px 10px" }}>{f}</button>
                    ))}
                  </div>
                </div>
                <div className="cd-preview-stage">
                  <PreviewComp key={selected}/>
                </div>
              </div>

              {/* Code */}
              <div className="cd-sec-label">Code</div>
              <div className="cd-code">
                <div className="cd-code-topbar">
                  {FRAMEWORKS.map(f => (
                    <button key={f} onClick={()=>setFw(f)} className={`cd-code-tab${fw===f?" active":""}`}>{f}</button>
                  ))}
                  <button onClick={copy} className={`cd-copy-btn${copied?" ok":""}`}>
                    {copied?"✓ Copied":"⧉ Copy"}
                  </button>
                </div>
                <pre className="cd-pre"><Highlight code={code}/></pre>
              </div>

              {/* Props */}
              {props.length>0 && <>
                <div className="cd-sec-label">Properties</div>
                <table className="cd-table">
                  <thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Description</th></tr></thead>
                  <tbody>
                    {props.map(p => (
                      <tr key={p.name}>
                        <td><span className="pill-n">{p.name}</span></td>
                        <td><span className="pill-t">{p.type}</span></td>
                        <td><span className="pill-d">{p.def}</span></td>
                        <td style={{ fontSize:12, lineHeight:1.5 }}>{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>}

            </div>
          </div>
        </main>

        {/* ── RIGHT TOC ── */}
        <aside className="cd-toc">
          <div className="cd-toc-label">On this page</div>
          {["Overview","Live Preview","Code",...(props.length>0?["Properties"]:[])].map((sec,i) => (
            <button key={sec} className={`cd-toc-btn${i===0?" active":""}`}>{sec}</button>
          ))}
          <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid #F0EEE9" }}>
            <div className="cd-toc-label">Other Components</div>
            {ALL_ITEMS.filter(c=>c!==selected).slice(0,9).map(c => (
              <button key={c} onClick={()=>select(c)} className="cd-toc-btn">{c}</button>
            ))}
          </div>
        </aside>

      </div>
    </>
  );
}