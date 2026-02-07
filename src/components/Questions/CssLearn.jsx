import React, { useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight, Eye } from "lucide-react";

function CssLearn() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is CSS?" },
      { id: "addcss", title: "Ways to Add CSS" },
      { id: "selectors", title: "CSS Selectors" },
      { id: "colors", title: "Colors & Text Styling" },
      { id: "boxmodel", title: "CSS Box Model" },
      { id: "display", title: "Display Property" },
      { id: "position", title: "Position Property" },
      { id: "flexbox", title: "Flexbox" },
      { id: "grid", title: "CSS Grid" },
      { id: "responsive", title: "Responsive Design (Media Query)" },
      { id: "units", title: "CSS Units" },
      { id: "pseudo", title: "Pseudo Classes & Elements" },
      { id: "transition", title: "Transition & Animation Basics" },
      { id: "best", title: "Best Practices" },
    ],
    []
  );

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const CodeBlock = ({ children }) => (
    <pre className="bg-slate-900 text-slate-50 p-4 rounded-xl text-sm overflow-x-auto border border-slate-800">
      <code>{children}</code>
    </pre>
  );

  const Preview = ({ children, title = "Result" }) => (
    <div className="mt-4 border-2 border-blue-200 rounded-xl overflow-hidden">
      <div className="bg-blue-50 px-4 py-2 border-b border-blue-200 flex items-center gap-2">
        <Eye className="w-4 h-4 text-blue-700" />
        <span className="text-sm font-semibold text-blue-900">{title}</span>
      </div>
      <div className="bg-white p-6">{children}</div>
    </div>
  );

  const Section = ({ id, title, children }) => (
    <section
      id={id}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm scroll-mt-24"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center">
          <Code2 className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* TOP HEADER */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Learning
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            CSS Tutorial (Full Basics)
          </h1>

          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            CSS (Cascading Style Sheets) is used to style and layout web pages.
            It controls colors, spacing, alignment, responsiveness and design.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate("/css")}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition flex items-center justify-center gap-2"
            >
              Start CSS Quiz <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => scrollTo("selectors")}
              className="px-5 py-3 rounded-xl border border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 transition"
            >
              Jump to Selectors
            </button>
          </div>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          {/* LEFT: TOC */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-700" />
                Table of Contents
              </h3>

              <div className="max-h-[75vh] overflow-auto pr-2 space-y-2">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className="w-full text-left px-3 py-2 rounded-lg border border-gray-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition text-sm"
                  >
                    {s.title}
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate("/css")}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-95 transition"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </aside>

          {/* RIGHT: CONTENT */}
          <main className="space-y-6">
            <Section id="intro" title="What is CSS?">
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>CSS stands for <b>Cascading Style Sheets</b></li>
                <li>CSS controls color, font, layout and design</li>
                <li>CSS works with HTML elements</li>
              </ul>

              <Preview title="Example: Without vs With CSS">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-semibold">WITHOUT CSS</p>
                    <div className="border border-gray-300 p-4 rounded bg-gray-50">
                      <h1>Welcome</h1>
                      <p>This is plain HTML without any styling.</p>
                      <button>Click Me</button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-semibold">WITH CSS</p>
                    <div className="border border-gray-300 p-4 rounded bg-gradient-to-br from-blue-50 to-indigo-50">
                      <h1 className="text-2xl font-bold text-blue-900 mb-2">Welcome</h1>
                      <p className="text-gray-700 mb-3">This is HTML styled with CSS.</p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        Click Me
                      </button>
                    </div>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section id="addcss" title="Ways to Add CSS">
              <p className="text-slate-700 mb-4">
                There are three main ways to add CSS to your HTML code:
              </p>

              <h3 className="font-semibold text-slate-900 mt-6 mb-3">1. Inline CSS</h3>
              <CodeBlock>{`<p style="color: red; font-size: 18px;">This is red text</p>
<h1 style="background-color: blue; color: white;">Blue Background</h1>`}</CodeBlock>

              <Preview>
                <p style={{ color: "red", fontSize: "18px" }}>This is red text</p>
                <h1 style={{ backgroundColor: "blue", color: "white", padding: "10px", marginTop: "10px" }}>
                  Blue Background
                </h1>
              </Preview>

              <h3 className="font-semibold text-slate-900 mt-6 mb-3">2. Internal CSS (Style Tag)</h3>
              <CodeBlock>{`<head>
  <style>
    p { color: red; font-size: 18px; }
    h1 { background-color: blue; color: white; }
    .highlight { background-color: yellow; }
  </style>
</head>`}</CodeBlock>

              <h3 className="font-semibold text-slate-900 mt-6 mb-3">3. External CSS (Best Practice)</h3>
              <CodeBlock>{`<!-- In HTML head -->
<link rel="stylesheet" href="style.css">

/* In style.css file */
p { color: red; font-size: 18px; }
h1 { background-color: blue; color: white; }
.highlight { background-color: yellow; }`}</CodeBlock>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-blue-900 font-semibold">Best Practice:</p>
                </div>
                <ul className="list-disc pl-6 text-blue-800 text-sm space-y-1">
                  <li>Use <b>External CSS</b> for production websites</li>
                  <li>Keep CSS in separate files for better organization</li>
                  <li>Inline CSS is only useful for quick testing</li>
                  <li>External CSS is reusable across multiple pages</li>
                </ul>
              </div>
            </Section>

            <Section id="selectors" title="CSS Selectors">
              <CodeBlock>{`/* Element selector */
p { color: blue; }

/* Class selector */
.box { color: red; }

/* ID selector */
#main { background: yellow; }

/* Universal selector */
* { margin: 0; padding: 0; }`}</CodeBlock>

              <Preview>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Element Selector (p)</p>
                    <p style={{ color: "blue" }}>This paragraph is blue</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Class Selector (.box)</p>
                    <div style={{ color: "red", padding: "10px", border: "1px solid red" }}>
                      This div has class "box" and is red
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">ID Selector (#main)</p>
                    <div style={{ background: "yellow", padding: "10px" }}>
                      This div has id "main" and has yellow background
                    </div>
                  </div>
                </div>
              </Preview>

              <ul className="list-disc pl-6 mt-4 text-slate-700 space-y-1">
                <li><b>.</b> is used for class</li>
                <li><b>#</b> is used for id</li>
              </ul>
            </Section>

            <Section id="colors" title="Colors & Text Styling">
              <CodeBlock>{`p {
  color: #1e293b;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  line-height: 1.6;
}`}</CodeBlock>

              <Preview>
                <p style={{
                  color: "#1e293b",
                  fontSize: "18px",
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: 1.6
                }}>
                  This text demonstrates CSS text styling with custom color, size, weight, alignment, and line height.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                  <div className="text-center">
                    <div className="w-full h-16 bg-red-500 rounded mb-2"></div>
                    <p className="text-xs">color: red</p>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-16 bg-blue-600 rounded mb-2"></div>
                    <p className="text-xs">color: #0066ff</p>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-16 bg-green-500 rounded mb-2"></div>
                    <p className="text-xs">color: rgb(0,255,0)</p>
                  </div>
                  <div className="text-center">
                    <div className="w-full h-16 rounded mb-2" style={{ background: "linear-gradient(to right, purple, pink)" }}></div>
                    <p className="text-xs">gradient</p>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section id="boxmodel" title="CSS Box Model">
              <p className="text-slate-700 mb-4">
                Every element in CSS is a box made of:
              </p>

              <ul className="list-disc pl-6 space-y-1 text-slate-700 mb-4">
                <li><b>Content</b> (text/image)</li>
                <li><b>Padding</b> (inside space)</li>
                <li><b>Border</b></li>
                <li><b>Margin</b> (outside space)</li>
              </ul>

              <CodeBlock>{`div {
  margin: 10px;
  padding: 20px;
  border: 2px solid black;
}`}</CodeBlock>

              <Preview>
                <div className="bg-orange-100 p-4">
                  <p className="text-xs text-orange-800 mb-2">Margin (orange area)</p>
                  <div className="bg-green-200 p-4">
                    <p className="text-xs text-green-800 mb-2">Border (green area)</p>
                    <div className="bg-blue-200 p-4">
                      <p className="text-xs text-blue-800 mb-2">Padding (blue area)</p>
                      <div className="bg-white p-4 border-2 border-dashed border-gray-400">
                        <p className="text-sm font-semibold text-center">Content</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-4 border-2 border-black" style={{ margin: "20px", padding: "20px" }}>
                  <p className="text-center font-semibold">
                    This box has margin: 20px, padding: 20px, and border: 2px solid black
                  </p>
                </div>
              </Preview>
            </Section>

            <Section id="display" title="Display Property">
              <CodeBlock>{`display: block;
display: inline;
display: inline-block;
display: none;
visibility: hidden;`}</CodeBlock>

              <Preview>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">display: block (takes full width)</p>
                    <div className="bg-blue-200 p-2" style={{ display: "block" }}>Block Element 1</div>
                    <div className="bg-blue-300 p-2" style={{ display: "block" }}>Block Element 2</div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">display: inline (stays in line)</p>
                    <div>
                      <span className="bg-green-200 p-2" style={{ display: "inline" }}>Inline 1</span>
                      <span className="bg-green-300 p-2" style={{ display: "inline" }}>Inline 2</span>
                      <span className="bg-green-400 p-2" style={{ display: "inline" }}>Inline 3</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">display: inline-block (inline but with block properties)</p>
                    <div>
                      <div className="bg-purple-200 p-3" style={{ display: "inline-block", width: "80px" }}>Box 1</div>
                      <div className="bg-purple-300 p-3" style={{ display: "inline-block", width: "80px" }}>Box 2</div>
                      <div className="bg-purple-400 p-3" style={{ display: "inline-block", width: "80px" }}>Box 3</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">display: none vs visibility: hidden</p>
                    <div className="flex gap-4">
                      <div className="flex-1 border border-gray-300 p-2">
                        <div className="bg-red-200 p-2">Visible</div>
                        <div className="bg-red-300 p-2" style={{ display: "none" }}>display: none</div>
                        <div className="bg-red-400 p-2">Visible</div>
                      </div>
                      <div className="flex-1 border border-gray-300 p-2">
                        <div className="bg-red-200 p-2">Visible</div>
                        <div className="bg-red-300 p-2" style={{ visibility: "hidden" }}>visibility: hidden</div>
                        <div className="bg-red-400 p-2">Visible</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Preview>

              <ul className="list-disc pl-6 mt-4 text-slate-700 space-y-1">
                <li><b>display: none</b> removes element completely</li>
                <li><b>visibility: hidden</b> hides but keeps its space</li>
              </ul>
            </Section>

            <Section id="position" title="Position Property">
              <CodeBlock>{`position: static;
position: relative;
position: absolute;
position: fixed;
position: sticky;`}</CodeBlock>

              <Preview>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">position: relative (with top: 20px, left: 20px)</p>
                    <div className="border border-gray-300 p-4 bg-gray-50">
                      <div className="bg-blue-200 p-3 inline-block">Normal</div>
                      <div className="bg-green-200 p-3 inline-block" style={{ position: "relative", top: "20px", left: "20px" }}>
                        Relative (moved)
                      </div>
                      <div className="bg-blue-200 p-3 inline-block">Normal</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">position: absolute (inside relative parent)</p>
                    <div className="border border-gray-300 p-4 bg-gray-50 h-40" style={{ position: "relative" }}>
                      <div className="bg-purple-200 p-2" style={{ position: "absolute", top: "10px", right: "10px" }}>
                        Top Right
                      </div>
                      <div className="bg-purple-300 p-2" style={{ position: "absolute", bottom: "10px", left: "10px" }}>
                        Bottom Left
                      </div>
                      <p className="text-gray-600">Parent container (position: relative)</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">position: sticky (scroll to see effect)</p>
                    <div className="border border-gray-300 bg-gray-50 h-48 overflow-y-scroll">
                      <div className="bg-yellow-200 p-2 sticky top-0 z-10 border-b-2 border-yellow-400">
                        Sticky Header (scrolls with content)
                      </div>
                      <div className="p-4">
                        <p>Content line 1</p>
                        <p>Content line 2</p>
                        <p>Content line 3</p>
                        <p>Content line 4</p>
                        <p>Content line 5</p>
                        <p>Content line 6</p>
                        <p>Content line 7</p>
                        <p>Content line 8</p>
                        <p>Content line 9</p>
                        <p>Content line 10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Preview>

              <p className="text-slate-600 mt-3 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Most used: <b>relative</b> + <b>absolute</b></span>
              </p>
            </Section>

            <Section id="flexbox" title="Flexbox">
              <p className="text-slate-700 mb-4">
                Flexbox is mainly used for alignment and layout.
              </p>

              <CodeBlock>{`.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}`}</CodeBlock>

              <Preview>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">justify-content: center</p>
                    <div className="flex justify-center gap-2 border border-gray-300 p-4 bg-gray-50">
                      <div className="bg-blue-400 p-3 w-16 h-16"></div>
                      <div className="bg-blue-500 p-3 w-16 h-16"></div>
                      <div className="bg-blue-600 p-3 w-16 h-16"></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">justify-content: space-between</p>
                    <div className="flex justify-between gap-2 border border-gray-300 p-4 bg-gray-50">
                      <div className="bg-green-400 p-3 w-16 h-16"></div>
                      <div className="bg-green-500 p-3 w-16 h-16"></div>
                      <div className="bg-green-600 p-3 w-16 h-16"></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">align-items: center (vertical alignment)</p>
                    <div className="flex items-center gap-2 border border-gray-300 p-4 bg-gray-50 h-32">
                      <div className="bg-purple-400 p-3 w-16 h-12"></div>
                      <div className="bg-purple-500 p-3 w-16 h-16"></div>
                      <div className="bg-purple-600 p-3 w-16 h-20"></div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">flex-direction: column</p>
                    <div className="flex flex-col gap-2 border border-gray-300 p-4 bg-gray-50 w-40">
                      <div className="bg-red-400 p-3"></div>
                      <div className="bg-red-500 p-3"></div>
                      <div className="bg-red-600 p-3"></div>
                    </div>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section id="grid" title="CSS Grid">
              <p className="text-slate-700 mb-4">
                Grid is best for full page layouts (rows + columns).
              </p>

              <CodeBlock>{`.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}`}</CodeBlock>

              <Preview>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">3 Column Grid</p>
                    <div className="grid grid-cols-3 gap-4 border border-gray-300 p-4 bg-gray-50">
                      <div className="bg-indigo-300 p-4 text-center">1</div>
                      <div className="bg-indigo-400 p-4 text-center">2</div>
                      <div className="bg-indigo-500 p-4 text-center">3</div>
                      <div className="bg-indigo-300 p-4 text-center">4</div>
                      <div className="bg-indigo-400 p-4 text-center">5</div>
                      <div className="bg-indigo-500 p-4 text-center">6</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">2 Column Grid with different sizes</p>
                    <div className="grid gap-4 border border-gray-300 p-4 bg-gray-50" style={{ gridTemplateColumns: "2fr 1fr" }}>
                      <div className="bg-pink-300 p-4">2fr (wider)</div>
                      <div className="bg-pink-400 p-4">1fr</div>
                      <div className="bg-pink-300 p-4">2fr (wider)</div>
                      <div className="bg-pink-400 p-4">1fr</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Grid with row and column span</p>
                    <div className="grid grid-cols-3 gap-4 border border-gray-300 p-4 bg-gray-50">
                      <div className="bg-teal-300 p-4 col-span-2">Spans 2 columns</div>
                      <div className="bg-teal-400 p-4">1</div>
                      <div className="bg-teal-500 p-4">2</div>
                      <div className="bg-teal-300 p-4 col-span-2">Spans 2 columns</div>
                    </div>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section id="responsive" title="Responsive Design (Media Query)">
              <CodeBlock>{`@media (max-width: 768px) {
  body {
    background: lightgray;
  }

  .container {
    flex-direction: column;
  }
}`}</CodeBlock>

              <Preview>
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Resize your browser window to see responsive behavior (or view on mobile):
                  </p>
                  
                  <div className="flex flex-col md:flex-row gap-4 border border-gray-300 p-4 bg-gray-50">
                    <div className="bg-orange-300 p-4 flex-1 text-center">
                      Box 1<br/>
                      <span className="text-xs">(stacks on mobile)</span>
                    </div>
                    <div className="bg-orange-400 p-4 flex-1 text-center">
                      Box 2<br/>
                      <span className="text-xs">(stacks on mobile)</span>
                    </div>
                    <div className="bg-orange-500 p-4 flex-1 text-center">
                      Box 3<br/>
                      <span className="text-xs">(stacks on mobile)</span>
                    </div>
                  </div>

                  <div className="text-xs bg-blue-50 border border-blue-200 rounded p-3">
                    <p className="font-semibold text-blue-900 mb-1">Common Breakpoints:</p>
                    <ul className="space-y-1 text-blue-800">
                      <li>• Mobile: max-width: 768px</li>
                      <li>• Tablet: max-width: 1024px</li>
                      <li>• Desktop: min-width: 1025px</li>
                    </ul>
                  </div>
                </div>
              </Preview>

              <p className="text-slate-600 mt-3 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Media queries make websites work on mobile screens.</span>
              </p>
            </Section>

            <Section id="units" title="CSS Units">
              <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
                <li><b>px</b> – fixed unit</li>
                <li><b>%</b> – relative to parent</li>
                <li><b>em / rem</b> – relative to font size</li>
                <li><b>vw / vh</b> – relative to viewport</li>
              </ul>

              <Preview>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">px - Fixed pixels</p>
                    <div className="bg-cyan-200 p-2" style={{ width: "200px" }}>200px wide</div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">% - Percentage of parent</p>
                    <div className="border border-gray-300 p-2">
                      <div className="bg-lime-200 p-2" style={{ width: "50%" }}>50% of parent</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">rem - Relative to root font size</p>
                    <div className="space-y-1">
                      <div className="bg-amber-200 p-1" style={{ fontSize: "1rem" }}>1rem (16px default)</div>
                      <div className="bg-amber-300 p-1" style={{ fontSize: "1.5rem" }}>1.5rem (24px)</div>
                      <div className="bg-amber-400 p-1" style={{ fontSize: "2rem" }}>2rem (32px)</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">vw - Viewport width (10vw = 10% of screen width)</p>
                    <div className="bg-rose-200 p-2" style={{ width: "50vw" }}>50vw (50% of viewport width)</div>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section id="pseudo" title="Pseudo Classes & Elements">
              <CodeBlock>{`/* pseudo class */
button:hover {
  background: black;
  color: white;
}

/* pseudo element */
p::first-letter {
  font-size: 30px;
}`}</CodeBlock>

              <Preview>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">:hover - Hover over the button</p>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-black hover:scale-105 transition-all">
                      Hover Me
                    </button>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">::first-letter - First letter styled</p>
                    <p className="text-lg" style={{ fontSize: "16px" }}>
                      <span style={{ fontSize: "32px", fontWeight: "bold", color: "#3b82f6" }}>T</span>his 
                      paragraph has a large first letter using the ::first-letter pseudo-element.
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">:nth-child() - Style specific children</p>
                    <div className="space-y-1">
                      <div className="bg-gray-200 p-2">Item 1</div>
                      <div className="bg-blue-300 p-2">Item 2 (even - colored)</div>
                      <div className="bg-gray-200 p-2">Item 3</div>
                      <div className="bg-blue-300 p-2">Item 4 (even - colored)</div>
                      <div className="bg-gray-200 p-2">Item 5</div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">:focus - Click inside the input</p>
                    <input 
                      type="text" 
                      placeholder="Click me"
                      className="border-2 border-gray-300 p-2 rounded focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 w-full"
                    />
                  </div>
                </div>
              </Preview>
            </Section>

            <Section id="transition" title="Transition & Animation Basics">
              <CodeBlock>{`button {
  transition: all 0.3s ease;
}

button:hover {
  transform: scale(1.05);
}`}</CodeBlock>

              <Preview>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Transform: scale - Hover to grow</p>
                    <button className="bg-purple-500 text-white px-6 py-3 rounded-lg transition-transform hover:scale-110">
                      Hover to Scale
                    </button>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Transform: rotate - Hover to rotate</p>
                    <button className="bg-green-500 text-white px-6 py-3 rounded-lg transition-transform hover:rotate-12">
                      Hover to Rotate
                    </button>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Color transition - Smooth color change</p>
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors hover:bg-pink-500">
                      Hover for Color Change
                    </button>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Multiple transitions - Hover for combined effect</p>
                    <button className="bg-orange-500 text-white px-6 py-3 rounded-lg transition-all hover:bg-red-600 hover:scale-105 hover:shadow-lg">
                      Hover Me
                    </button>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Animation - Continuous pulse</p>
                    <div className="inline-block bg-red-500 w-16 h-16 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Preview>
            </Section>

            <Section id="best" title="Best Practices">
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Use class selectors more than ids</li>
                <li>Keep CSS clean and reusable</li>
                <li>Use flex/grid for layout (avoid margin hacks)</li>
                <li>Always make UI responsive</li>
                <li>Use rem units for better scaling</li>
              </ul>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-green-900 font-semibold">Quick Tips:</p>
                </div>
                <ul className="list-disc pl-6 text-green-800 text-sm space-y-1">
                  <li>Name classes meaningfully (e.g., .card-header not .blue-box)</li>
                  <li>Avoid !important unless absolutely necessary</li>
                  <li>Group related styles together</li>
                  <li>Test on multiple browsers and devices</li>
                  <li>Minimize CSS file size by removing unused styles</li>
                </ul>
              </div>
            </Section>

            {/* FINAL CTA */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to test yourself?
              </h3>
              <p className="text-slate-600 mb-6">
                Start the CSS quiz and update your dashboard progress.
              </p>

              <button
                onClick={() => navigate("/css")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Start CSS Quiz <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default CssLearn;