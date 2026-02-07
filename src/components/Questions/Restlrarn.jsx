import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Code2, ArrowRight, Copy, Check, BookOpen, Server, Layers, ShieldCheck, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function RESTLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);
  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(() => [
    { id: "intro", title: "What is REST API?", icon: Globe },
    { id: "http", title: "HTTP Methods", icon: ArrowRight },
    { id: "status", title: "HTTP Status Codes", icon: Code2 },
    { id: "structure", title: "REST URL Structure", icon: Layers },
    { id: "request", title: "Request & Response", icon: Server },
    { id: "headers", title: "Headers & Body", icon: Code2 },
    { id: "auth", title: "Authentication", icon: ShieldCheck },
    { id: "crud", title: "CRUD Operations", icon: Database },
    { id: "best", title: "Best Practices", icon: BookOpen }
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const copyToClipboard = useCallback((text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const CodeBlock = ({ children, id, language = "json" }) => {
    const blockId = `code-${id}`;
    const isCopied = copiedId === blockId;
    return (
      <div className="my-4">
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-gray-300 text-sm border-b border-gray-700">
            <span className="flex items-center gap-2"><Code2 size={14} />{language}</span>
            <button onClick={() => copyToClipboard(children, blockId)} className="text-xs hover:text-white">
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="p-4 text-sm text-gray-100 overflow-x-auto"><code>{children}</code></pre>
        </div>
      </div>
    );
  };

  const Section = ({ id, title, icon: Icon, children }) => (
    <section id={id} className="mb-14 scroll-mt-24">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl flex items-center justify-center shadow">
          <Icon size={22} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">

      <AnimatePresence>
        {copiedId && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
            Code copied
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-14 px-4 text-center">
        <Globe size={46} className="mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">REST API Complete Guide</h1>
        <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
          Learn how APIs work, how data travels between client and server, and how real apps communicate.
        </p>
        <button onClick={() => navigate("/restquiz")} className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold inline-flex items-center gap-2">
          Start REST Quiz <ArrowRight size={18}/>
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex gap-8">

        {/* SIDEBAR */}
        <aside className="hidden lg:block w-64 sticky top-6 h-fit">
          <div className="bg-white border rounded-xl p-4 shadow-sm">
            <h3 className="font-bold mb-3 text-gray-800">Contents</h3>
            <div className="space-y-1">
              {sections.map(s => {
                const Icon = s.icon;
                return (
                  <button key={s.id} onClick={() => scrollTo(s.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                      activeId === s.id ? "bg-indigo-600 text-white" : "hover:bg-indigo-50 text-gray-700"
                    }`}>
                    <Icon size={16} /> {s.title}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 max-w-4xl">

          <Section id="intro" title="What is REST API?" icon={Globe}>
            <p className="text-gray-700">REST API allows applications to communicate over HTTP using simple rules.</p>
          </Section>

          <Section id="http" title="HTTP Methods" icon={ArrowRight}>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li><b>GET</b> → Read data</li>
              <li><b>POST</b> → Create data</li>
              <li><b>PUT</b> → Update full data</li>
              <li><b>PATCH</b> → Update partial data</li>
              <li><b>DELETE</b> → Remove data</li>
            </ul>
          </Section>

          <Section id="status" title="HTTP Status Codes" icon={Code2}>
            <CodeBlock id="status-codes">{`200 OK
201 Created
400 Bad Request
401 Unauthorized
404 Not Found
500 Server Error`}</CodeBlock>
          </Section>

          <Section id="structure" title="REST URL Structure" icon={Layers}>
            <CodeBlock id="url">{`GET /api/users
GET /api/users/10
POST /api/users
DELETE /api/users/10`}</CodeBlock>
          </Section>

          <Section id="request" title="Request & Response" icon={Server}>
            <CodeBlock id="request">{`Request:
GET /api/users
Headers: Authorization: Bearer token

Response:
200 OK
[
 { "id": 1, "name": "John" }
]`}</CodeBlock>
          </Section>

          <Section id="headers" title="Headers & Body" icon={Code2}>
            <CodeBlock id="headers">{`Headers:
Content-Type: application/json
Authorization: Bearer token

Body:
{
  "name": "John",
  "email": "john@mail.com"
}`}</CodeBlock>
          </Section>

          <Section id="auth" title="Authentication" icon={ShieldCheck}>
            <p className="text-gray-700">APIs often use tokens (JWT) to verify users.</p>
            <CodeBlock id="auth">{`Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}</CodeBlock>
          </Section>

          <Section id="crud" title="CRUD Operations" icon={Database}>
            <CodeBlock id="crud">{`CREATE → POST /api/products
READ   → GET /api/products
UPDATE → PUT /api/products/1
DELETE → DELETE /api/products/1`}</CodeBlock>
          </Section>

          <Section id="best" title="Best Practices" icon={BookOpen}>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Use nouns, not verbs in URLs</li>
              <li>Use proper HTTP status codes</li>
              <li>Secure APIs with authentication</li>
              <li>Use versioning ( /api/v1/ )</li>
              <li>Handle errors consistently</li>
              hiigit add .

            </ul>
          </Section>

          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-8 rounded-2xl text-center mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Now Test Yourself</h2>
            <button onClick={() => navigate("/restquiz")} className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-bold">
              Start REST Quiz
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

export default RESTLearn;
