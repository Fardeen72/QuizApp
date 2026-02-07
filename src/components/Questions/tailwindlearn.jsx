import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TailwindLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is Tailwind CSS?" },
      { id: "install", title: "Installation" },
      { id: "utility", title: "Utility Classes" },
      { id: "colors", title: "Colors & Backgrounds" },
      { id: "spacing", title: "Margin & Padding" },
      { id: "flexbox", title: "Flexbox" },
      { id: "grid", title: "Grid" },
      { id: "typography", title: "Typography" },
      { id: "borders", title: "Borders & Radius" },
      { id: "shadows", title: "Shadows" },
      { id: "responsive", title: "Responsive Design" },
      { id: "hover", title: "Hover & States" },
      { id: "buttons", title: "Buttons UI" },
      { id: "cards", title: "Card UI" },
      { id: "position", title: "Position" },
      { id: "zindex", title: "Z-Index" },
      { id: "transition", title: "Transitions" },
      { id: "transform", title: "Transforms" },
      { id: "opacity", title: "Opacity" },
      { id: "gradients", title: "Gradients" },
      { id: "forms", title: "Forms" },
      { id: "darkmode", title: "Dark Mode" },
      { id: "container", title: "Container" },
      { id: "display", title: "Display & Visibility" },
      { id: "pricing", title: "Mini Project: Pricing Card" },
      { id: "navbarproject", title: "Mini Project: Navbar" },
      { id: "best", title: "Best Practices" },
    ],
    [],
  );

  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0),
          )[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-15% 0px -70% 0px" },
    );

    sections.forEach((s) => {
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

  const CodeBlock = ({ children, id, result }) => {
    const blockId = `code-${id}`;
    const isCopied = copiedId === blockId;

    return (
      <div className="space-y-3">
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Code2 size={16} />
              <span className="font-medium">Code</span>
            </div>
            <button
              onClick={() => copyToClipboard(children, blockId)}
              className="text-xs font-medium flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-xs sm:text-sm leading-relaxed">
            <code className="text-gray-100 whitespace-pre">{children}</code>
          </pre>
        </div>

        {result && (
          <div className="bg-white rounded-xl border-2 border-gray-200 p-4 sm:p-6">
            <div className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
              Preview
            </div>
            <div className="flex items-center justify-center min-h-[80px] sm:min-h-[120px] overflow-x-auto">
              {result}
            </div>
          </div>
        )}
      </div>
    );
  };

  const Section = ({ id, title, children }) => (
    <section id={id} className="mb-12 sm:mb-16 scroll-mt-24 px-1">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <AnimatePresence>
        {copiedId && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2"
          >
            <Check size={18} />
            Code copied!
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <BookOpen size={40} className="sm:w-12 sm:h-12" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            Tailwind CSS Tutorial
          </h1>
          <p className="text-base sm:text-xl text-blue-100 mb-6">
            Learn how to build modern designs using utility-first Tailwind CSS
            classes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate("/tailwind")}
              className="px-5 py-3 bg-white text-blue-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 transition shadow-lg"
            >
              Start Tailwind Quiz <ArrowRight size={18} />
            </button>
            <button
              onClick={() => scrollTo("utility")}
              className="px-5 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Jump to Utilities
            </button>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block w-64 shrink-0 sticky top-6 h-fit">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">
              Contents
            </h3>
            <nav className="space-y-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    activeId === s.id
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 max-w-4xl">
          <Section id="intro" title="What is Tailwind CSS?">
            <div className="prose prose-lg mb-6">
              <ul className="space-y-2 text-gray-700">
                <li>Tailwind is a utility-first CSS framework</li>
                <li>You style elements using small utility classes</li>
                <li>No need to write custom CSS for most designs</li>
              </ul>
            </div>
          </Section>

          <Section id="install" title="Installation">
            <CodeBlock id="install">
              {`npm install -D tailwindcss
npx tailwindcss init`}
            </CodeBlock>
          </Section>

          <Section id="utility" title="Utility Classes">
            <p className="text-gray-700 mb-4">
              Utility classes are single-purpose classes that do one thing.
              Combine them to create complex designs.
            </p>
            <CodeBlock
              id="utility"
              result={
                <div className="text-xl font-bold text-blue-600">
                  Hello Tailwind
                </div>
              }
            >
              {`<div className="text-xl font-bold text-blue-600">
  Hello Tailwind
</div>`}
            </CodeBlock>
          </Section>

          <Section id="colors" title="Colors & Backgrounds">
            <p className="text-gray-700 mb-4">
              Tailwind provides a comprehensive color palette with shades from
              50 to 900.
            </p>
            <CodeBlock
              id="colors"
              result={
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-red-500 rounded-lg"></div>
                  <div className="w-20 h-20 bg-blue-500 rounded-lg"></div>
                  <div className="w-20 h-20 bg-green-500 rounded-lg"></div>
                </div>
              }
            >
              {`<div className="bg-red-500"></div>
<div className="bg-blue-500"></div>
<div className="bg-green-500"></div>`}
            </CodeBlock>
          </Section>

          <Section id="spacing" title="Margin & Padding">
            <p className="text-gray-700 mb-4">
              Use m-* for margin and p-* for padding. Numbers follow a
              consistent spacing scale.
            </p>
            <CodeBlock
              id="spacing"
              result={
                <div className="space-y-4">
                  <div className="p-4 bg-blue-100 border-2 border-blue-300 rounded">
                    p-4 (padding)
                  </div>
                  <div className="m-8 p-4 bg-green-100 border-2 border-green-300 rounded">
                    m-8 p-4 (margin + padding)
                  </div>
                </div>
              }
            >
              {`<div className="p-4">p-4 (padding)</div>
<div className="m-8 p-4">m-8 p-4</div>`}
            </CodeBlock>
          </Section>

          <Section id="flexbox" title="Flexbox">
            <p className="text-gray-700 mb-4">
              Use flex utilities to create flexible layouts with ease.
            </p>
            <CodeBlock
              id="flexbox"
              result={
                <div className="flex gap-4 items-center justify-center w-full">
                  <div className="w-20 h-20 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    1
                  </div>
                  <div className="w-20 h-20 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
              }
            >
              {`<div className="flex gap-4 items-center">
  <div>1</div>
  <div>2</div>
</div>`}
            </CodeBlock>
          </Section>

          <Section id="grid" title="Grid">
            <p className="text-gray-700 mb-4">
              Create responsive grid layouts with grid utilities.
            </p>
            <CodeBlock
              id="grid"
              result={
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-orange-500 h-20 rounded-lg flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div className="bg-orange-500 h-20 rounded-lg flex items-center justify-center text-white font-bold">
                    B
                  </div>
                </div>
              }
            >
              {`<div className="grid grid-cols-2 gap-4">
  <div>A</div>
  <div>B</div>
</div>`}
            </CodeBlock>
          </Section>

          <Section id="typography" title="Typography">
            <p className="text-gray-700 mb-4">
              Control text size, weight, alignment, and more.
            </p>
            <CodeBlock
              id="typography"
              result={
                <div className="space-y-2">
                  <div className="text-sm font-normal">text-sm font-normal</div>
                  <div className="text-lg font-semibold">
                    text-lg font-semibold
                  </div>
                  <div className="text-2xl font-bold">text-2xl font-bold</div>
                </div>
              }
            >
              {`<div className="text-sm font-normal">text-sm</div>
<div className="text-lg font-semibold">text-lg</div>
<div className="text-2xl font-bold">text-2xl</div>`}
            </CodeBlock>
          </Section>

          <Section id="borders" title="Borders & Radius">
            <p className="text-gray-700 mb-4">
              Add borders and rounded corners to elements.
            </p>
            <CodeBlock
              id="borders"
              result={
                <div className="flex gap-4">
                  <div className="w-20 h-20 border-2 border-gray-400"></div>
                  <div className="w-20 h-20 border-4 border-blue-500 rounded-lg bg-blue-50"></div>
                  <div className="w-20 h-20 border-4 border-green-500 rounded-full bg-green-50"></div>
                </div>
              }
            >
              {`<div className="border-2"></div>
<div className="border-4 rounded-lg"></div>
<div className="border-4 rounded-full"></div>`}
            </CodeBlock>
          </Section>

          <Section id="shadows" title="Shadows">
            <p className="text-gray-700 mb-4">
              Add depth with shadow utilities.
            </p>
            <CodeBlock
              id="shadows"
              result={
                <div className="flex gap-4 flex-wrap">
                  <div className="w-24 h-24 bg-white shadow-sm rounded-lg flex items-center justify-center text-xs">
                    shadow-sm
                  </div>
                  <div className="w-24 h-24 bg-white shadow-md rounded-lg flex items-center justify-center text-xs">
                    shadow-md
                  </div>
                  <div className="w-24 h-24 bg-white shadow-xl rounded-lg flex items-center justify-center text-xs">
                    shadow-xl
                  </div>
                </div>
              }
            >
              {`<div className="shadow-sm">shadow-sm</div>
<div className="shadow-md">shadow-md</div>
<div className="shadow-xl">shadow-xl</div>`}
            </CodeBlock>
          </Section>

          <Section id="responsive" title="Responsive Design">
            <p className="text-gray-700 mb-4">
              Use breakpoint prefixes (sm:, md:, lg:, xl:) for responsive
              designs.
            </p>
            <CodeBlock
              id="responsive"
              result={
                <div className="text-sm md:text-xl lg:text-3xl font-bold text-purple-600">
                  Resize to see me change!
                </div>
              }
            >
              {`<div className="text-sm md:text-xl lg:text-3xl">
  Responsive Text
</div>`}
            </CodeBlock>
          </Section>

          <Section id="hover" title="Hover & States">
            <p className="text-gray-700 mb-4">
              Add interactivity with hover:, focus:, active:, and other state
              variants.
            </p>
            <CodeBlock
              id="hover"
              result={
                <button className="px-6 py-3 bg-blue-500 hover:bg-blue-700 text-white rounded-lg transition">
                  Hover me
                </button>
              }
            >
              {`<button className="bg-blue-500 hover:bg-blue-700">
  Hover me
</button>`}
            </CodeBlock>
          </Section>

          <Section id="buttons" title="Buttons UI">
            <p className="text-gray-700 mb-4">
              Create beautiful buttons with utility classes.
            </p>
            <CodeBlock
              id="buttons"
              result={
                <div className="flex gap-4 flex-wrap">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Primary
                  </button>
                  <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
                    Secondary
                  </button>
                  <button className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition">
                    Outline
                  </button>
                </div>
              }
            >
              {`<button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
  Primary
</button>
<button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg">
  Secondary
</button>
<button className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg">
  Outline
</button>`}
            </CodeBlock>
          </Section>

          <Section id="cards" title="Card UI">
            <p className="text-gray-700 mb-4">
              Build card components using spacing, shadows, and borders.
            </p>
            <CodeBlock
              id="cards"
              result={
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm border border-gray-200">
                  <h3 className="text-xl font-bold mb-2">Card Title</h3>
                  <p className="text-gray-600">
                    This is a beautiful card component built with Tailwind CSS.
                  </p>
                </div>
              }
            >
              {`<div className="bg-white rounded-xl shadow-lg p-6 border">
  <h3 className="text-xl font-bold mb-2">Card Title</h3>
  <p className="text-gray-600">Card description</p>
</div>`}
            </CodeBlock>
          </Section>

          <Section id="position" title="Position">
            <p className="text-gray-700 mb-4">
              Control element positioning with relative, absolute, fixed, and
              sticky.
            </p>
            <CodeBlock
              id="position"
              result={
                <div className="relative w-full h-32 bg-gray-100 rounded-lg border-2 border-gray-300">
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm">
                    Absolute
                  </div>
                  <div className="absolute bottom-2 left-2 bg-blue-500 text-white px-3 py-1 rounded text-sm">
                    Positioned
                  </div>
                </div>
              }
            >
              {`<div className="relative">
  <div className="absolute top-2 right-2">Absolute</div>
  <div className="absolute bottom-2 left-2">Positioned</div>
</div>`}
            </CodeBlock>
          </Section>

          <Section id="zindex" title="Z-Index">
            <p className="text-gray-700 mb-4">
              Control stacking order with z-index utilities.
            </p>
            <CodeBlock
              id="zindex"
              result={
                <div className="relative w-full h-32">
                  <div className="absolute w-24 h-24 bg-red-400 rounded-lg z-10 top-0 left-0"></div>
                  <div className="absolute w-24 h-24 bg-blue-400 rounded-lg z-20 top-8 left-8"></div>
                  <div className="absolute w-24 h-24 bg-green-400 rounded-lg z-30 top-16 left-16"></div>
                </div>
              }
            >
              {`<div className="z-10">Back</div>
<div className="z-20">Middle</div>
<div className="z-30">Front</div>`}
            </CodeBlock>
          </Section>

          <Section id="transition" title="Transitions">
            <p className="text-gray-700 mb-4">
              Add smooth transitions to your elements.
            </p>
            <CodeBlock
              id="transition"
              result={
                <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-700 hover:scale-110 transition-all duration-300">
                  Hover for transition
                </button>
              }
            >
              {`<button className="transition-all duration-300 hover:scale-110">
  Hover
</button>`}
            </CodeBlock>
          </Section>

          <Section id="transform" title="Transforms">
            <p className="text-gray-700 mb-4">
              Rotate, scale, and skew elements.
            </p>
            <CodeBlock
              id="transform"
              result={
                <div className="flex gap-4 flex-wrap">
                  <div className="w-20 h-20 bg-pink-500 rounded-lg rotate-12"></div>
                  <div className="w-20 h-20 bg-yellow-500 rounded-lg scale-110"></div>
                  <div className="w-20 h-20 bg-teal-500 rounded-lg -skew-y-6"></div>
                </div>
              }
            >
              {`<div className="rotate-12">Rotated</div>
<div className="scale-110">Scaled</div>
<div className="-skew-y-6">Skewed</div>`}
            </CodeBlock>
          </Section>

          <Section id="opacity" title="Opacity">
            <p className="text-gray-700 mb-4">Control element transparency.</p>
            <CodeBlock
              id="opacity"
              result={
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-indigo-500 opacity-25 rounded-lg"></div>
                  <div className="w-20 h-20 bg-indigo-500 opacity-50 rounded-lg"></div>
                  <div className="w-20 h-20 bg-indigo-500 opacity-100 rounded-lg"></div>
                </div>
              }
            >
              {`<div className="opacity-25">25%</div>
<div className="opacity-50">50%</div>
<div className="opacity-100">100%</div>`}
            </CodeBlock>
          </Section>

          <Section id="gradients" title="Gradients">
            <p className="text-gray-700 mb-4">
              Create beautiful gradient backgrounds.
            </p>
            <CodeBlock
              id="gradients"
              result={
                <div className="w-full h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-xl"></div>
              }
            >
              {`<div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
  Gradient Background
</div>`}
            </CodeBlock>
          </Section>

          <Section id="forms" title="Forms">
            <p className="text-gray-700 mb-4">
              Style form inputs and elements.
            </p>
            <CodeBlock
              id="forms"
              result={
                <div className="space-y-4 max-w-sm">
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              }
            >
              {`<input 
  type="text" 
  className="px-4 py-2 border-2 rounded-lg focus:border-blue-500"
  placeholder="Enter text"
/>`}
            </CodeBlock>
          </Section>

          <Section id="darkmode" title="Dark Mode">
            <p className="text-gray-700 mb-4">
              Use the dark: variant to create dark mode styles.
            </p>
            <CodeBlock
              id="darkmode"
              result={
                <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  This adapts to dark mode (if enabled in your system)
                </div>
              }
            >
              {`<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Dark Mode Ready
</div>`}
            </CodeBlock>
          </Section>

          <Section id="container" title="Container">
            <p className="text-gray-700 mb-4">
              Use container class to center content with max-width.
            </p>
            <CodeBlock
              id="container"
              result={
                <div className="container mx-auto px-4 bg-blue-50 py-4 rounded-lg">
                  <p className="text-center">Centered container content</p>
                </div>
              }
            >
              {`<div className="container mx-auto px-4">
  Centered Content
</div>`}
            </CodeBlock>
          </Section>

          <Section id="display" title="Display & Visibility">
            <p className="text-gray-700 mb-4">
              Control element display and visibility.
            </p>
            <CodeBlock
              id="display"
              result={
                <div className="space-y-2">
                  <div className="block bg-green-100 p-2 rounded">
                    block - takes full width
                  </div>
                  <div className="inline-block bg-blue-100 p-2 rounded">
                    inline-block
                  </div>
                  <div className="hidden md:block bg-purple-100 p-2 rounded">
                    Visible on medium screens+
                  </div>
                </div>
              }
            >
              {`<div className="block">block</div>
<div className="inline-block">inline-block</div>
<div className="hidden md:block">Responsive visibility</div>`}
            </CodeBlock>
          </Section>

          <Section id="pricing" title="Mini Project: Pricing Card">
            <p className="text-gray-700 mb-4">
              This project combines spacing, shadows, buttons, and typography to
              build a real pricing card UI.
            </p>
            <CodeBlock
              id="pricing"
              result={
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm border-2 border-blue-100">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
                    <div className="text-4xl font-bold text-blue-600 mb-6">
                      $19<span className="text-lg text-gray-500">/mo</span>
                    </div>
                    <ul className="text-left space-y-3 mb-6">
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✔</span> 10 Projects
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✔</span> Priority
                        Support
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-500">✔</span> All Features
                      </li>
                    </ul>
                    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                      Get Started
                    </button>
                  </div>
                </div>
              }
            >
              {`<div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-blue-100">
  <div className="text-center">
    <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
    <div className="text-4xl font-bold text-blue-600 mb-6">
      $19<span className="text-lg text-gray-500">/mo</span>
    </div>
    <ul className="text-left space-y-3 mb-6">
      <li className="flex items-center gap-2">
        <span className="text-green-500">✔</span> 10 Projects
      </li>
      <li className="flex items-center gap-2">
        <span className="text-green-500">✔</span> Priority Support
      </li>
      <li className="flex items-center gap-2">
        <span className="text-green-500">✔</span> All Features
      </li>
    </ul>
    <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
      Get Started
    </button>
  </div>
</div>`}
            </CodeBlock>
          </Section>

          <Section id="navbarproject" title="Mini Project: Navbar">
            <p className="text-gray-700 mb-4">
              This navbar uses flexbox, spacing, hover states, and alignment
              utilities to build a real header layout.
            </p>
            <CodeBlock
              id="navbar"
              result={
                <nav className="bg-white shadow-md px-6 py-4 rounded-lg w-full">
                  <div className="flex items-center justify-between">
                    <div className="text-xl font-bold text-blue-600">
                      MySite
                    </div>
                    <div className="flex gap-6">
                      <a
                        href="#"
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        Home
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        About
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        Courses
                      </a>
                      <a
                        href="#"
                        className="text-gray-700 hover:text-blue-600 transition"
                      >
                        Contact
                      </a>
                    </div>
                  </div>
                </nav>
              }
            >
              {`<nav className="bg-white shadow-md px-6 py-4">
  <div className="flex items-center justify-between">
    <div className="text-xl font-bold text-blue-600">MySite</div>
    <div className="flex gap-6">
      <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
      <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
      <a href="#" className="text-gray-700 hover:text-blue-600">Courses</a>
      <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
    </div>
  </div>
</nav>`}
            </CodeBlock>
          </Section>

          <Section id="best" title="Best Practices">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-l-4 border-blue-600">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Use consistent spacing scale (4, 8, 16, 24, 32, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Prefer flex/grid utilities over custom CSS</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Use responsive prefixes (sm:, md:, lg:, xl:) for
                    mobile-first design
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>
                    Keep class names readable - extract components when needed
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Use the @apply directive sparingly in custom CSS</span>
                </li>
              </ul>
            </div>
          </Section>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">
              Ready to test your Tailwind skills?
            </h2>
            <p className="text-blue-100 mb-6">
              Take the interactive quiz to reinforce what you've learned!
            </p>
            <button
              onClick={() => navigate("/tailwind")}
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-blue-50 transition shadow-lg text-lg"
            >
              Start Tailwind Quiz
              <ArrowRight size={24} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TailwindLearn;
