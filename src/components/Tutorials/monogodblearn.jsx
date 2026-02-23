import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight, Copy, Check, Info, AlertCircle, CheckCircle2, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function MongoDBLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(() => [
    { id: "intro", title: "What is MongoDB?" },
    { id: "basics", title: "Database Basics" },
    { id: "collections", title: "Collections & Documents" },
    { id: "insert", title: "Insert Documents" },
    { id: "find", title: "Query Documents" },
    { id: "update", title: "Update Documents" },
    { id: "delete", title: "Delete Documents" },
    { id: "sorting", title: "Sorting & Limiting" },
    { id: "indexing", title: "Indexing" },
    { id: "aggregation", title: "Aggregation Pipeline" },
    { id: "best", title: "Best Practices" },
  ], []);

  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-120px 0px -60% 0px" }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const copyToClipboard = useCallback((text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  }, []);

  const CodeBlock = ({ children, id, language = "javascript" }) => {
    const blockId = `code-${id}`;
    const isCopied = copiedId === blockId;

    return (
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-4 w-full">
        <div className="flex justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
            <Database className="w-3.5 h-3.5" />
            {language}
          </span>
          <button onClick={() => copyToClipboard(children, blockId)} className="text-xs flex items-center gap-1">
            {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            {isCopied ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="bg-slate-900 text-slate-50 p-4 text-sm overflow-x-auto rounded-b-2xl">
          <code>{children}</code>
        </pre>
      </div>
    );
  };

  const InfoBox = ({ children, type = "info" }) => {
    const styles = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      tip: "bg-green-50 border-green-200 text-green-800",
      warning: "bg-amber-50 border-amber-200 text-amber-800",
    };
    const icons = {
      info: <Info className="w-5 h-5" />,
      tip: <CheckCircle2 className="w-5 h-5" />,
      warning: <AlertCircle className="w-5 h-5" />,
    };
    return (
      <div className={`border rounded-xl p-4 mb-4 ${styles[type]}`}>
        <div className="flex gap-3">
          <div className="mt-0.5">{icons[type]}</div>
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    );
  };

  const Section = ({ id, title, children }) => (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm scroll-mt-28"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center">
          <Database className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <AnimatePresence>
        {copiedId && (
          <motion.div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg z-50">
            Code copied!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10 bg-gradient-to-r from-green-50 to-emerald-100 p-8 rounded-3xl border border-green-200">
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900">MongoDB Complete Learning Guide</h1>
          <p className="text-lg text-gray-700 max-w-2xl">
            Learn MongoDB step by step from basics to advanced querying.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button onClick={() => navigate("/mongodbquiz")} className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold flex items-center gap-2">
              Start MongoDB Quiz <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => scrollTo("basics")} className="px-6 py-3 border border-gray-400 rounded-xl font-semibold">
              Jump to Basics
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
          <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
            <div className="bg-white border rounded-2xl p-4 shadow-sm w-[260px]">
              <h3 className="flex items-center gap-2 font-bold mb-3">
                <BookOpen className="w-5 h-5 text-gray-700" /> Contents
              </h3>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                      activeId === s.id ? "bg-green-600 text-white" : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <Section id="intro" title="What is MongoDB?">
              <p className="text-slate-700">
                MongoDB is a NoSQL database that stores data as flexible JSON-like documents instead of tables.
              </p>
            </Section>

            <Section id="basics" title="Database Basics">
              <CodeBlock id="show-dbs">{"show dbs"}</CodeBlock>
              <CodeBlock id="use-db">{"use mystore"}</CodeBlock>
              <CodeBlock id="current-db">{"db"}</CodeBlock>
            </Section>

            <Section id="collections" title="Collections & Documents">
              <CodeBlock id="create-collection">{"db.createCollection('users')"}</CodeBlock>
              <CodeBlock id="show-collections">{"show collections"}</CodeBlock>
            </Section>

            <Section id="insert" title="Insert Documents">
              <CodeBlock id="insert-one">
{"db.users.insertOne({ name: 'Alice', age: 25, city: 'London' })"}
              </CodeBlock>
              <CodeBlock id="insert-many">
{"db.users.insertMany([{ name: 'Bob' }, { name: 'Carol' }])"}
              </CodeBlock>
            </Section>

            <Section id="find" title="Query Documents">
              <CodeBlock id="find-all">{"db.users.find()"}</CodeBlock>
              <CodeBlock id="find-condition">{"db.users.find({ age: 25 })"}</CodeBlock>
              <CodeBlock id="find-and">{"db.users.find({ age: 25, city: 'London' })"}</CodeBlock>
              <CodeBlock id="find-projection">{"db.users.find({}, { name: 1, _id: 0 })"}</CodeBlock>
            </Section>

            <Section id="update" title="Update Documents">
              <CodeBlock id="update-one">
{"db.users.updateOne({ name: 'Alice' }, { $set: { age: 26 } })"}
              </CodeBlock>
            </Section>

            <Section id="delete" title="Delete Documents">
              <CodeBlock id="delete-one">{"db.users.deleteOne({ name: 'Alice' })"}</CodeBlock>
            </Section>

            <Section id="sorting" title="Sorting & Limiting">
              <CodeBlock id="sort">{"db.users.find().sort({ age: -1 })"}</CodeBlock>
              <CodeBlock id="limit">{"db.users.find().limit(5)"}</CodeBlock>
            </Section>

            <Section id="indexing" title="Indexing">
              <CodeBlock id="index-create">{"db.users.createIndex({ email: 1 })"}</CodeBlock>
            </Section>

            <Section id="aggregation" title="Aggregation Pipeline">
              <CodeBlock id="agg-basic">
{"db.orders.aggregate([{ $group: { _id: '$customerId', total: { $sum: '$amount' } } }])"}
              </CodeBlock>
            </Section>

            <Section id="best" title="Best Practices">
              <ul className="list-disc pl-6 space-y-2 text-sm text-slate-700">
                <li>Create indexes for frequent queries</li>
                <li>Project only needed fields</li>
                <li>Avoid unbounded document growth</li>
              </ul>
            </Section>

            <div className="bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200 p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Ready to Test Your MongoDB Knowledge?</h3>
              <button
                onClick={() => navigate("/mongodbquiz")}
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-semibold inline-flex items-center gap-2"
              >
                Start MongoDB Quiz <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default MongoDBLearn;
