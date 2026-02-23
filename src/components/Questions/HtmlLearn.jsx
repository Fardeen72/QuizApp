import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Code2, ArrowRight, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function HtmlLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is HTML?" },
      { id: "vscode", title: "How to Install VS Code" },
      { id: "structure", title: "HTML Page Structure" },
      { id: "elements", title: "Elements & Tags" },
      { id: "attributes", title: "Attributes" },
      { id: "headings", title: "Headings" },
      { id: "paragraphs", title: "Paragraphs" },
      { id: "links", title: "Links" },
      { id: "images", title: "Images" },
      { id: "lists", title: "Lists" },
      { id: "tables", title: "Tables" },
      { id: "forms", title: "Forms" },
      { id: "buttons", title: "Buttons" },
      { id: "dropdown", title: "Dropdown" },
      { id: "divspan", title: "Div vs Span" },
      { id: "classid", title: "Class vs ID" },
      { id: "inputs", title: "Input Types" },
      { id: "blockinline", title: "Block vs Inline" },
      { id: "semantic", title: "Semantic HTML" },
      { id: "comments", title: "Comments" },
      { id: "formatting", title: "Text Formatting" },
      { id: "marquee", title: "Marquee Tag" },
      { id: "media", title: "Audio & Video" },
      { id: "meta", title: "Meta Tags" },
      { id: "entities", title: "HTML Entities" },
      { id: "iframes", title: "Iframes" },
      { id: "canvas", title: "Canvas" },
      { id: "svg", title: "SVG Graphics" },
      { id: "textarea", title: "Textarea" },
      { id: "label", title: "Labels" },
      { id: "fieldset", title: "Fieldset & Legend" },
      { id: "dataattr", title: "Data Attributes" },
      { id: "progress", title: "Progress & Meter" },
      { id: "details", title: "Details & Summary" },
      { id: "code", title: "Code & Pre Tags" },
      { id: "blockquote", title: "Blockquote" },
      { id: "abbr", title: "Abbreviation" },
      { id: "figure", title: "Figure & Figcaption" },
      { id: "fullpage", title: "Complete Page Structure" },
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
      {
        root: null,
        threshold: [0.2, 0.35, 0.5, 0.7],
        rootMargin: "-15% 0px -70% 0px",
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
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

    return ( <>
      
      <div className="space-y-3">


        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
            <span className="text-xs font-semibold text-slate-600">Code</span>
            <button
              onClick={() => copyToClipboard(children, blockId)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all text-xs font-medium text-slate-700 hover:text-blue-700"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-slate-900 text-slate-50 p-4 text-sm overflow-x-auto">
            <code>{children}</code>
          </pre>
        </div>

        {result && (
          <div className="rounded-2xl border border-emerald-200 overflow-hidden shadow-sm bg-emerald-50">
            <div className="px-4 py-2 bg-emerald-100 border-b border-emerald-200">
              <span className="text-xs font-semibold text-emerald-800">
                Output
              </span>
            </div>
            <div className="p-4 bg-white">
              <div dangerouslySetInnerHTML={{ __html: result }} />
            </div>
          </div>
        )}
      </div>
   </> );
  };

  const Section = ({ id, title, children }) => (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm scroll-mt-28"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
          <Code2 className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      {children}
    </motion.section>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-gradient-to-b from-white to-slate-50"
    >
      {/* Copied Toast Notification */}
      <AnimatePresence>
        {copiedId && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50 bg-green-600 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2"
          >
            <Check className="w-5 h-5" />
            <span className="font-medium">Code copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-8 shadow-sm">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              HTML Tutorial
            </h1>

            <p className="text-slate-700 max-w-3xl text-lg leading-relaxed">
              Learn HTML from scratch with simple explanations and real
              examples. This covers the important concepts you will actually use
              in web development.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate("/html")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Start HTML Quiz <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => scrollTo("structure")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-blue-200 text-blue-700 font-semibold bg-white hover:bg-blue-50 transition"
              >
                Jump to Structure
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* MAIN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* LEFT SIDEBAR TOC */}
          <aside className="lg:sticky lg:top-24 h-fit">
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
            >
              <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Contents
              </h3>

              <div className="space-y-1 max-h-[72vh] overflow-y-auto pr-1">
                {sections.map((s) => {
                  const active = activeId === s.id;

                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-xl border transition ${
                        active
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-white border-gray-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {s.title}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={() => navigate("/html")}
                  className="w-full px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:opacity-95 transition shadow-md"
                >
                  Start Quiz
                </button>
              </div>
            </motion.div>
          </aside>

          {/* RIGHT CONTENT */}
          <main className="space-y-6">
            <Section id="intro" title="What is HTML?">
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>
                  HTML stands for <b>HyperText Markup Language</b>
                </li>
                <li>It defines the structure of web pages</li>
                <li>
                  HTML uses tags like <code>&lt;p&gt;</code>,{" "}
                  <code>&lt;h1&gt;</code>, <code>&lt;img&gt;</code>
                </li>
                <li>
                  HTML is the standard markup language for creating web pages
                </li>
                <li>HTML elements tell the browser how to display content</li>
              </ul>
            </Section>

            <Section id="vscode" title="How to Install VS Code">
              <p className="text-slate-700 mb-4">
                Visual Studio Code is a free, lightweight code editor perfect
                for HTML development. Follow these steps to install it:
              </p>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                <p className="font-semibold text-blue-900 mb-3">
                  Step-by-Step Installation:
                </p>
                <ol className="list-decimal pl-6 text-slate-700 space-y-2">
                  <li>
                    Go to <b>https://code.visualstudio.com</b> in your browser
                  </li>
                  <li>
                    Click the download button for your operating system
                    (Windows, Mac, or Linux)
                  </li>
                  <li>Run the installer file you just downloaded</li>
                  <li>
                    Follow the installation wizard and accept the default
                    settings
                  </li>
                  <li>Click "Finish" to complete the installation</li>
                  <li>
                    Open VS Code from your applications menu or desktop shortcut
                  </li>
                </ol>
              </div>

              <p className="text-slate-700 font-semibold mb-2">
                Useful Extensions for HTML:
              </p>
              <CodeBlock id="vscode-1">{`1. Live Server
   - Auto-refresh browser when you save changes
   - Search: "Live Server" by Ritwick Dey

2. HTML CSS Support
   - Better HTML and CSS support
   - Search: "HTML CSS Support"

3. Prettier
   - Auto-format your code
   - Search: "Prettier"

4. Thunder Client
   - Test APIs directly in VS Code
   - Search: "Thunder Client"`}</CodeBlock>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-4">
                <p className="font-semibold text-green-900 mb-2">
                  ✓ How to Install Extensions:
                </p>
                <ol className="list-decimal pl-6 text-slate-700 space-y-1 text-sm">
                  <li>
                    Click the Extensions icon on the left sidebar (or press
                    Ctrl+Shift+X)
                  </li>
                  <li>Search for the extension name</li>
                  <li>Click "Install" button</li>
                  <li>The extension will be ready to use</li>
                </ol>
              </div>

              <p className="text-slate-700 mt-4 font-semibold mb-2">
                Creating Your First HTML File:
              </p>
              <CodeBlock id="vscode-2">{`1. Open VS Code
2. Click File > New File (or press Ctrl+N)
3. Save the file with .html extension
   - Example: index.html
4. Start typing your HTML code
5. Right-click and select "Open with Live Server"
6. Your browser will open showing your HTML page`}</CodeBlock>
            </Section>

            <Section id="structure" title="HTML Page Structure">
              <p className="text-slate-700 mb-4">
                Every HTML page starts with this basic template:
              </p>
              <CodeBlock
                id="structure-1"
                result='<div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb;"><h1 style="margin: 0 0 16px 0; font-size: 28px;">Hello World</h1><p style="margin: 0; color: #6b7280; font-size: 16px;">Welcome to HTML</p></div>'
              >{`<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>Welcome to HTML</p>
</body>
</html>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <code>&lt;!DOCTYPE html&gt;</code> declares this is an HTML5
                  document
                </li>
                <li>
                  <code>&lt;html&gt;</code> is the root element
                </li>
                <li>
                  <code>&lt;head&gt;</code> contains meta information
                </li>
                <li>
                  <code>&lt;body&gt;</code> contains the visible page content
                </li>
              </ul>
            </Section>

            <Section id="elements" title="Elements & Tags">
              <p className="text-slate-700 mb-4">
                Most HTML elements have an opening tag, content, and closing
                tag.
              </p>
              <CodeBlock
                id="elements-1"
                result="<p>This is a paragraph</p>"
              >{`<p>This is a paragraph</p>`}</CodeBlock>
              <p className="text-slate-700 mt-4">
                Some elements are self-closing and don't need a closing tag:
              </p>
              <CodeBlock id="elements-2">{`<br />
<hr />
<img src="image.jpg" alt="Description" />`}</CodeBlock>
            </Section>

            <Section id="attributes" title="Attributes">
              <p className="text-slate-700 mb-4">
                Attributes give extra information to elements. They are always
                specified in the opening tag.
              </p>
              <CodeBlock
                id="attributes-1"
                result='<a href="https://fardeensportfolilo.netlify.app/"  >Visit Example</a>'
              >{`<a href="https://www.example.com" >Visit Example</a>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <b>href</b> specifies the URL for links
                </li>
                <li>
                  <b>src</b> specifies the source for images
                </li>
                <li>
                  <b>alt</b> provides alternative text for images
                </li>
                <li>
                  <b>id</b> provides a unique identifier
                </li>
                <li>
                  <b>class</b> specifies one or more class names
                </li>
              </ul>
            </Section>

            <Section id="headings" title="Headings">
              <p className="text-slate-700 mb-4">
                HTML has six levels of headings, from h1 (largest) to h6
                (smallest).
              </p>
              <CodeBlock
                id="headings-1"
                result='<h1 style="font-size: 2em; font-weight: bold; margin: 0.67em 0;">Main Heading</h1><h2 style="font-size: 1.5em; font-weight: bold; margin: 0.75em 0;">Subheading</h2><h3 style="font-size: 1.17em; font-weight: bold; margin: 0.83em 0;">Smaller Heading</h3><h4 style="font-size: 1em; font-weight: bold; margin: 1em 0;">Level 4</h4><h5 style="font-size: 0.83em; font-weight: bold; margin: 1.17em 0;">Level 5</h5><h6 style="font-size: 0.67em; font-weight: bold; margin: 1.33em 0;">Level 6</h6>'
              >{`<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Smaller Heading</h3>
<h4>Level 4</h4>
<h5>Level 5</h5>
<h6>Level 6</h6>`}</CodeBlock>
              <p className="text-slate-600 text-sm mt-3">
                Note: Use h1 for the main title, and use headings in order for
                better SEO.
              </p>
            </Section>

            <Section id="paragraphs" title="Paragraphs">
              <p className="text-slate-700 mb-4">
                The <code>&lt;p&gt;</code> tag defines a paragraph. Browsers
                automatically add space before and after paragraphs.
              </p>
              <CodeBlock
                id="paragraphs-1"
                result="<p>This is a paragraph of text.</p><p>This is another paragraph.</p>"
              >{`<p>This is a paragraph of text.</p>
<p>This is another paragraph.</p>`}</CodeBlock>
            </Section>

            <Section id="links" title="Links">
              <p className="text-slate-700 mb-4">
                Links allow users to navigate between pages. Use the{" "}
                <code>&lt;a&gt;</code> tag with the <b>href</b> attribute.
              </p>
              <CodeBlock
                id="links-1"
                result='<a href="https://google.com">Visit Google</a>'
              >{`<a href="https://google.com">Visit Google</a>`}</CodeBlock>
              <p className="text-slate-700 mt-4">Open link in new tab:</p>
              <CodeBlock id="links-2">{`<a href="https://google.com" target="_blank">Visit Google</a>`}</CodeBlock>
            </Section>

            <Section id="images" title="Images">
              <p className="text-slate-700 mb-4">
                Images are embedded using the <code>&lt;img&gt;</code> tag. The{" "}
                <b>src</b> and <b>alt</b> attributes are essential.
              </p>
              <CodeBlock
                id="images-1"
                result='<img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop" alt="Description" style="border-radius: 8px; margin-right: 10px;" /><img src="https://th.bing.com/th/id/OIP.36d0gb5RiQl3G13VFVSbyAHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" alt="My photo" style="border-radius: 8px;" />'
              >{`<img src="image.jpg" alt="Description" />
<img src="photo.png" alt="My photo" width="300" height="200" />`}</CodeBlock>
              <p className="text-slate-600 text-sm mt-3">
                Always use <b>alt</b> attribute for accessibility and SEO. It
                describes the image for screen readers and search engines.
              </p>
            </Section>

            <Section id="lists" title="Lists">
              <p className="text-slate-700 mb-4">
                HTML supports ordered (numbered) and unordered (bulleted) lists.
              </p>
              <p className="text-slate-700 font-semibold mb-2">
                Unordered List:
              </p>
              <CodeBlock
                id="lists-1"
                result="<ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>"
              >{`<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>`}</CodeBlock>
              <p className="text-slate-700 font-semibold mb-2 mt-4">
                Ordered List:
              </p>
              <CodeBlock
                id="lists-2"
                result="<ol><li>First</li><li>Second</li><li>Third</li></ol>"
              >{`<ol>
  <li>First</li>
  <li>Second</li>
  <li>Third</li>
</ol>`}</CodeBlock>
            </Section>

            <Section id="tables" title="Tables">
              <p className="text-slate-700 mb-4">
                Tables display data in rows and columns using{" "}
                <code>&lt;table&gt;</code>, <code>&lt;tr&gt;</code>,{" "}
                <code>&lt;th&gt;</code>, and <code>&lt;td&gt;</code> tags.
              </p>
              <CodeBlock
                id="tables-1"
                result='<table border="1" style="border-collapse: collapse; width: 100%;"><tr><th style="border: 1px solid #ddd; padding: 8px;">Name</th><th style="border: 1px solid #ddd; padding: 8px;">Age</th></tr><tr><td style="border: 1px solid #ddd; padding: 8px;">Alex</td><td style="border: 1px solid #ddd; padding: 8px;">25</td></tr><tr><td style="border: 1px solid #ddd; padding: 8px;">Sarah</td><td style="border: 1px solid #ddd; padding: 8px;">30</td></tr></table>'
              >{`<table>
  <tr>
    <th>Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Alex</td>
    <td>25</td>
  </tr>
  <tr>
    <td>Sarah</td>
    <td>30</td>
  </tr>
</table>`}</CodeBlock>
            </Section>

            <Section id="forms" title="Forms">
              <p className="text-slate-700 mb-4">
                Forms collect user input. Use <code>&lt;form&gt;</code>,{" "}
                <code>&lt;input&gt;</code>, and <code>&lt;button&gt;</code>{" "}
                tags.
              </p>
              <CodeBlock
                id="forms-1"
                result='<form style="display: flex; flex-direction: column; gap: 10px; max-width: 300px;"><label style="font-weight: 500;">Name:</label><input type="text" name="username" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" /><label style="font-weight: 500;">Email:</label><input type="email" name="email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" /><button type="submit" style="padding: 10px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Submit</button></form>'
              >{`<form action="/submit" method="post">
  <label>Name:</label>
  <input type="text" name="username" />
  
  <label>Email:</label>
  <input type="email" name="email" />
  
  <button type="submit">Submit</button>
</form>`}</CodeBlock>
            </Section>

            <Section id="buttons" title="Buttons">
              <p className="text-slate-700 mb-4">
                Buttons are clickable elements used to trigger actions. Use the{" "}
                <code>&lt;button&gt;</code> tag or{" "}
                <code>&lt;input type="button"&gt;</code>.
              </p>
              <CodeBlock
                id="buttons-1"
                result='<button style="padding: 10px 20px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; margin-right: 8px;">Click Me</button><button style="padding: 10px 20px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; margin-right: 8px;">Submit</button><button style="padding: 10px 20px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Delete</button>'
              >{`<button>Click Me</button>
<button type="submit">Submit</button>
<button type="reset">Reset</button>
<button type="button">Button</button>`}</CodeBlock>
              <p className="text-slate-700 mt-4">Buttons inside forms:</p>
              <CodeBlock
                id="buttons-2"
                result='<form style="display: flex; flex-direction: column; gap: 10px; max-width: 300px;"><input type="text" placeholder="Enter name" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" /><div style="display: flex; gap: 8px;"><button type="submit" style="flex: 1; padding: 10px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Submit</button><button type="reset" style="flex: 1; padding: 10px; background-color: #6b7280; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Reset</button></div></form>'
              >{`<form>
  <input type="text" placeholder="Enter name" />
  <button type="submit">Submit</button>
  <button type="reset">Reset</button>
</form>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <b>type="submit"</b>: Submits the form
                </li>
                <li>
                  <b>type="reset"</b>: Resets form fields to default
                </li>
                <li>
                  <b>type="button"</b>: Generic button (requires JavaScript to
                  work)
                </li>
              </ul>
            </Section>

            <Section id="dropdown" title="Dropdown">
              <p className="text-slate-700 mb-4">
                Dropdowns allow users to select one option from a list. Use the{" "}
                <code>&lt;select&gt;</code> tag with <code>&lt;option&gt;</code>{" "}
                tags.
              </p>
              <CodeBlock
                id="dropdown-1"
                result='<select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; margin-bottom: 12px;"><option>Select a language</option><option>HTML</option><option>CSS</option><option>JavaScript</option><option>Python</option></select><br><select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;"><option>--Select--</option><option selected>JavaScript</option><option>React</option><option>Vue</option></select>'
              >{`<select>
  <option>Select a language</option>
  <option>HTML</option>
  <option>CSS</option>
  <option>JavaScript</option>
  <option>Python</option>
</select>`}</CodeBlock>
              <p className="text-slate-700 mt-4">
                Dropdown with preset value and grouped options:
              </p>
              <CodeBlock
                id="dropdown-2"
                result='<select style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;"><optgroup label="Frontend"><option>HTML</option><option>CSS</option><option>JavaScript</option></optgroup><optgroup label="Backend"><option>Python</option><option>PHP</option><option>Java</option></optgroup></select>'
              >{`<select>
  <optgroup label="Frontend">
    <option>HTML</option>
    <option>CSS</option>
    <option>JavaScript</option>
  </optgroup>
  <optgroup label="Backend">
    <option>Python</option>
    <option>PHP</option>
    <option>Java</option>
  </optgroup>
</select>`}</CodeBlock>
              <p className="text-slate-700 mt-4">
                Multiple selection dropdown:
              </p>
              <CodeBlock
                id="dropdown-3"
                result='<select multiple style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px; height: 100px; width: 200px;"><option>Web Development</option><option>Mobile Development</option><option>Data Science</option><option>Cloud Computing</option><option>AI & Machine Learning</option></select>'
              >{`<select multiple size="4">
  <option>Web Development</option>
  <option>Mobile Development</option>
  <option>Data Science</option>
  <option>Cloud Computing</option>
  <option>AI & Machine Learning</option>
</select>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <b>selected</b>: Pre-selects an option
                </li>
                <li>
                  <b>disabled</b>: Disables an option
                </li>
                <li>
                  <b>optgroup</b>: Groups related options with a label
                </li>
                <li>
                  <b>multiple</b>: Allows selecting multiple options
                </li>
                <li>
                  <b>size</b>: Number of visible options
                </li>
              </ul>
            </Section>

            <Section id="divspan" title="Div vs Span">
              <p className="text-slate-700 mb-4">
                <b>div</b> is a block-level container, <b>span</b> is an inline
                container.
              </p>
              <CodeBlock
                id="divspan-1"
                result='<div style="background: #e0f2fe; padding: 10px; margin: 5px 0;">Block Element (div)</div><span style="background: #fef3c7; padding: 5px;">Inline Element (span)</span>'
              >{`<div>Block Element (div)</div>
<span>Inline Element (span)</span>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <b>div</b>: Takes full width, starts on new line
                </li>
                <li>
                  <b>span</b>: Takes only necessary width, stays inline
                </li>
              </ul>
            </Section>

            <Section id="classid" title="Class vs ID">
              <p className="text-slate-700 mb-4">
                Both are used to target elements, but they have different
                purposes.
              </p>
              <CodeBlock id="classid-1">{`<div class="box">Can be reused</div>
<div class="box">Multiple elements</div>

<div id="unique">Must be unique</div>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 mt-4 space-y-2">
                <li>
                  <b>class</b>: Can be reused on multiple elements
                </li>
                <li>
                  <b>id</b>: Must be unique on the page
                </li>
                <li>
                  Use <b>class</b> for styling groups of elements
                </li>
                <li>
                  Use <b>id</b> for unique elements or JavaScript targeting
                </li>
              </ul>
            </Section>

            <Section id="inputs" title="Input Types">
              <p className="text-slate-700 mb-4">
                HTML5 provides many input types for different data collection
                needs.
              </p>
              <CodeBlock
                id="inputs-1"
                result='<div style="display: flex; flex-direction: column; gap: 12px; max-width: 400px;"><input type="text" placeholder="Text input" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" /><input type="email" placeholder="Email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" /><input type="password" placeholder="Password" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" /><input type="number" placeholder="Number" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" /><input type="date" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" /><div style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" /><label>Checkbox</label></div><div style="display: flex; align-items: center; gap: 8px;"><input type="radio" name="option" /><label>Radio Option</label></div><input type="file" style="padding: 8px;" /><input type="color" style="padding: 4px; cursor: pointer;" /><input type="range" min="0" max="100" style="width: 100%;" />'
              >{`<input type="text" placeholder="Text input" />
<input type="email" placeholder="Email" />
<input type="password" placeholder="Password" />
<input type="number" placeholder="Number" />
<input type="date" />
<input type="checkbox" />
<input type="radio" name="option" />
<input type="file" />
<input type="color" />
<input type="range" min="0" max="100" />`}</CodeBlock>
            </Section>

            <Section id="blockinline" title="Block vs Inline">
              <p className="text-slate-700 mb-4">
                HTML elements are categorized as block-level or inline.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div>
                  <p className="font-semibold text-slate-900 mb-2">
                    Block Elements:
                  </p>
                  <ul className="list-disc pl-6 text-slate-700 space-y-1">
                    <li>div, p, h1-h6, ul, ol, li</li>
                    <li>Start on a new line</li>
                    <li>Take up full width available</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2">
                    Inline Elements:
                  </p>
                  <ul className="list-disc pl-6 text-slate-700 space-y-1">
                    <li>span, a, img, strong, em</li>
                    <li>Stay in line with other content</li>
                    <li>Take up only necessary width</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="semantic" title="Semantic HTML">
              <p className="text-slate-700 mb-4">
                Semantic tags clearly describe their meaning to both browser and
                developer, improving SEO and accessibility.
              </p>
              <CodeBlock
                id="semantic-1"
                result='<header style="background-color: #f3f4f6; padding: 16px; margin-bottom: 16px; border-radius: 8px;"><nav style="display: flex; gap: 16px;"><a href="/" target="_blank" style="color: #3b82f6; text-decoration: none;">Home</a></nav></header><main style="display: flex; gap: 16px;"><article style="flex: 1;"><section style="background: white; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 16px;"><h2 style="margin: 0 0 8px 0;">Title</h2><p style="margin: 0; color: #6b7280;">Content goes here with semantic structure for better SEO and accessibility.</p></section></article><aside style="width: 200px; background-color: #f9fafb; padding: 16px; border: 1px solid #e5e7eb; border-radius: 8px;"><p style="margin: 0; font-weight: 600; margin-bottom: 8px;">Sidebar</p><p style="margin: 0; font-size: 14px; color: #6b7280;">Related content appears here</p></aside></main><footer style="background-color: #f3f4f6; padding: 16px; margin-top: 16px; border-radius: 8px; text-align: center; color: #6b7280;">Copyright 2024</footer>'
              >{`<header>
  <nav>
    <a href="/" target="_blank">Home</a>
  </nav>
</header>

<main>
  <article>
    <section>
      <h2>Title</h2>
      <p>Content</p>
    </section>
  </article>
  
  <aside>
    Sidebar content
  </aside>
</main>

<footer>
  Copyright 2024
</footer>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <b>header</b>: Introductory content or navigation
                </li>
                <li>
                  <b>nav</b>: Navigation links
                </li>
                <li>
                  <b>main</b>: Main content of document
                </li>
                <li>
                  <b>article</b>: Self-contained content
                </li>
                <li>
                  <b>section</b>: Thematic grouping of content
                </li>
                <li>
                  <b>aside</b>: Content aside from main content
                </li>
                <li>
                  <b>footer</b>: Footer information
                </li>
              </ul>
            </Section>

            <Section id="comments" title="Comments">
              <p className="text-slate-700 mb-4">
                Comments are ignored by browsers and help document your code.
              </p>
              <CodeBlock id="comments-1">{`<!-- This is a single-line comment -->

<!--
  This is a
  multi-line comment
-->

<p>Visible content</p> <!-- Inline comment -->`}</CodeBlock>
            </Section>

            <Section id="formatting" title="Text Formatting">
              <p className="text-slate-700 mb-4">
                HTML provides tags to format text in different ways.
              </p>
              <CodeBlock
                id="formatting-1"
                result="<b>Bold text</b><br><strong>Important text</strong><br><i>Italic text</i><br><em>Emphasized text</em><br><mark>Highlighted</mark><br><small>Small text</small><br><del>Deleted</del><br><ins>Inserted</ins><br><sub>Subscript</sub><br><sup>Superscript</sup>"
              >{`<b>Bold text</b>
<strong>Important text</strong>
<i>Italic text</i>
<em>Emphasized text</em>
<mark>Highlighted</mark>
<small>Small text</small>
<del>Deleted</del>
<ins>Inserted</ins>
<sub>Subscript</sub>
<sup>Superscript</sup>`}</CodeBlock>
            </Section>

            <Section id="marquee" title="Marquee Tag">
              <p className="text-slate-700 mb-4">
                The <code>&lt;marquee&gt;</code> tag creates a scrolling text
                effect. It moves content horizontally or vertically across the
                screen.
              </p>
              <CodeBlock
                id="marquee-1"
                result='<marquee behavior="scroll" direction="right" style="background: #e0f2fe; padding: 16px; border-radius: 8px; border: 2px solid #0284c7; margin-bottom: 12px;">This text scrolls from left to right</marquee><marquee behavior="slide" direction="left" style="background: #f0fdf4; padding: 16px; border-radius: 8px; border: 2px solid #16a34a;">This text slides from right to left</marquee>'
              >{`<marquee behavior="scroll" direction="right">
  This text scrolls from left to right
</marquee>

<marquee behavior="slide" direction="left">
  This text slides from right to left
</marquee>`}</CodeBlock>
              <p className="text-slate-700 mt-4">Marquee with speed control:</p>
              <CodeBlock
                id="marquee-2"
                result='<marquee behavior="alternate" direction="left" scrollamount="5" style="background: #fef3c7; padding: 16px; border-radius: 8px; border: 2px solid #d97706;">Bouncing text with custom speed</marquee>'
              >{`<marquee behavior="alternate" direction="left" scrollamount="5">
  Bouncing text with custom speed
</marquee>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <b>behavior</b>: "scroll" (repeats), "slide" (one-time),
                  "alternate" (bounces)
                </li>
                <li>
                  <b>direction</b>: "left", "right", "up", "down"
                </li>
                <li>
                  <b>scrollamount</b>: Speed of scrolling (pixels per frame)
                </li>
                <li>
                  <b>loop</b>: Number of times to loop (-1 for infinite)
                </li>
              </ul>
              <p className="text-slate-600 text-sm mt-3">
                <b>Note:</b> The marquee tag is deprecated in modern HTML. Use
                CSS animations instead for better performance.
              </p>
            </Section>

            <Section id="media" title="Audio & Video">
              <p className="text-slate-700 mb-4">
                HTML5 provides native support for audio and video playback.
              </p>
              <p className="text-slate-700 font-semibold mb-2">Audio:</p>
              <CodeBlock
                id="media-1"
                result='<audio controls style="width: 100%; max-width: 300px; margin-bottom: 16px;"><source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">Your browser does not support audio.</audio>'
              >{`<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  Your browser does not support audio.
</audio>`}</CodeBlock>
              <p className="text-slate-700 font-semibold mb-2 mt-4">Video:</p>
              <CodeBlock
                id="media-2"
                result='<video controls width="300" style="border-radius: 8px;"><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">Your browser does not support video.</video>'
              >{`<video controls width="400">
  <source src="video.mp4" type="video/mp4">
  Your browser does not support video.
</video>`}</CodeBlock>
            </Section>

            <Section id="meta" title="Meta Tags">
              <p className="text-slate-700 mb-4">
                Meta tags provide metadata about the HTML document. They go in
                the <code>&lt;head&gt;</code> section.
              </p>
              <CodeBlock id="meta-1">{`<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Page description for SEO" />
  <meta name="keywords" content="HTML, CSS, JavaScript" />
  <meta name="author" content="Your Name" />
  <title>Page Title</title>
</head>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <b>charset</b>: Specifies character encoding
                </li>
                <li>
                  <b>viewport</b>: Controls responsive design on mobile
                </li>
                <li>
                  <b>description</b>: Page description for search engines
                </li>
                <li>
                  <b>keywords</b>: Keywords for search engines
                </li>
              </ul>
            </Section>

            <Section id="entities" title="HTML Entities">
              <p className="text-slate-700 mb-4">
                Special characters must be written as HTML entities to display
                correctly.
              </p>
              <CodeBlock
                id="entities-1"
                result='&lt; Less than<br>&gt; Greater than<br>&amp; Ampersand<br>" Quote<br>&copy; Copyright<br>&reg; Registered<br>&trade; Trademark<br>Non-breaking space'
              >{`&lt;   Less than
&gt;   Greater than
&amp;  Ampersand
&quot; Quote
&copy; Copyright
&reg;  Registered
&trade; Trademark
&nbsp; Non-breaking space`}</CodeBlock>
            </Section>

            <Section id="iframes" title="Iframes">
              <p className="text-slate-700 mb-4">
                An iframe is used to embed another document within the current
                HTML document.
              </p>
              <CodeBlock
                id="iframes-1"
                result='<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648149165!2d-74.00601592346949!3d40.71278307138062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ0LjEiTiA3NMKwMDAnMjEuNiJX!5e0!3m2!1sen!2sus!4v1234567890" width="300" height="250" style="border: 1px solid #ddd; border-radius: 8px;" title="Google Maps"></iframe>'
              >{`<iframe 
  src="https://www.example.com" 
  width="600" 
  height="400"
  title="Example Website">
</iframe>`}</CodeBlock>
              <p className="text-slate-600 text-sm mt-3">
                Common uses: Embed YouTube videos, Google Maps, or external
                content.
              </p>
            </Section>

            <Section id="canvas" title="Canvas">
              <p className="text-slate-700 mb-4">
                The <code>&lt;canvas&gt;</code> element is used to draw graphics
                using JavaScript.
              </p>
              <CodeBlock
                id="canvas-1"
                result='<svg width="400" height="200" style="border: 1px solid #000; border-radius: 8px; background: white;"><rect x="20" y="20" width="150" height="100" fill="#0066ff" /><circle cx="300" cy="100" r="50" fill="#ff6600" /></svg>'
              >{`<canvas id="myCanvas" width="400" height="200" 
  style="border:1px solid #000;">
</canvas>

<script>
  const canvas = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0066ff';
  ctx.fillRect(20, 20, 150, 100);
</script>`}</CodeBlock>
            </Section>

            <Section id="svg" title="SVG Graphics">
              <p className="text-slate-700 mb-4">
                SVG (Scalable Vector Graphics) defines vector-based graphics in
                XML format.
              </p>
              <CodeBlock
                id="svg-1"
                result='<svg width="200" height="200"><circle cx="100" cy="100" r="80" fill="#3b82f6" /><rect x="50" y="150" width="100" height="40" fill="#8b5cf6" /></svg>'
              >{`<svg width="200" height="200">
  <circle cx="100" cy="100" r="80" fill="#3b82f6" />
  <rect x="50" y="150" width="100" height="40" fill="#8b5cf6" />
</svg>`}</CodeBlock>
              <p className="text-slate-600 text-sm mt-3">
                SVG graphics are scalable and maintain quality at any size.
              </p>
            </Section>

            <Section id="textarea" title="Textarea">
              <p className="text-slate-700 mb-4">
                The <code>&lt;textarea&gt;</code> tag allows users to enter
                multiple lines of text.
              </p>
              <CodeBlock
                id="textarea-1"
                result='<textarea rows="4" cols="50" placeholder="Enter your message here..." style="padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: Arial, sans-serif; font-size: 14px;"></textarea>'
              >{`<textarea rows="4" cols="50" 
  placeholder="Enter your message here...">
</textarea>`}</CodeBlock>
              <p className="text-slate-700 mt-4">Textarea with default text:</p>
              <CodeBlock
                id="textarea-2"
                result='<textarea rows="5" cols="40" style="padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-family: Arial, sans-serif;">This is default text in the textarea.</textarea>'
              >{`<textarea rows="5" cols="40">
This is default text in the textarea.
</textarea>`}</CodeBlock>
              <ul className="list-disc pl-6 text-slate-700 space-y-2 mt-4">
                <li>
                  <b>rows</b>: Number of visible text rows
                </li>
                <li>
                  <b>cols</b>: Number of visible text columns
                </li>
                <li>
                  <b>placeholder</b>: Hint text for the user
                </li>
                <li>
                  <b>readonly</b>: Makes textarea read-only
                </li>
                <li>
                  <b>disabled</b>: Disables the textarea
                </li>
              </ul>
            </Section>

            <Section id="label" title="Labels">
              <p className="text-slate-700 mb-4">
                The <code>&lt;label&gt;</code> tag associates text with form
                elements for better accessibility and usability.
              </p>
              <CodeBlock
                id="label-1"
                result='<div style="display: flex; flex-direction: column; gap: 12px; max-width: 300px;"><div><label htmlFor="name" style="display: block; font-weight: 500; margin-bottom: 4px;">Full Name:</label><input type="text" id="name" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" /></div><div><label htmlFor="email" style="display: block; font-weight: 500; margin-bottom: 4px;">Email:</label><input type="email" id="email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" /></div><div style="display: flex; align-items: center; gap: 8px;"><input type="checkbox" id="agree" /><label htmlFor="agree" style="margin: 0;">I agree to terms</label></div></div>'
              >{`<label for="name">Full Name:</label>
<input type="text" id="name" />

<label for="email">Email:</label>
<input type="email" id="email" />

<input type="checkbox" id="agree" />
<label for="agree">I agree to terms</label>`}</CodeBlock>
              <p className="text-slate-600 text-sm mt-3">
                Use <b>for</b> attribute to connect label with input id.
                Clicking the label will focus the input.
              </p>
            </Section>

            <Section id="fieldset" title="Fieldset & Legend">
              <p className="text-slate-700 mb-4">
                <code>&lt;fieldset&gt;</code> groups form elements, and{" "}
                <code>&lt;legend&gt;</code> provides a caption for the group.
              </p>
              <CodeBlock
                id="fieldset-1"
                result='<fieldset style="border: 2px solid #3b82f6; border-radius: 4px; padding: 16px; margin-bottom: 16px;"><legend style="padding: 0 8px; color: #3b82f6; font-weight: 600;">Personal Information</legend><div style="display: flex; flex-direction: column; gap: 12px;"><div><label style="display: block; font-weight: 500; margin-bottom: 4px;">Name:</label><input type="text" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" /></div><div><label style="display: block; font-weight: 500; margin-bottom: 4px;">Age:</label><input type="number" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" /></div></div></fieldset><fieldset style="border: 2px solid #10b981; border-radius: 4px; padding: 16px;"><legend style="padding: 0 8px; color: #10b981; font-weight: 600;">Contact</legend><div><label style="display: block; font-weight: 500; margin-bottom: 4px;">Email:</label><input type="email" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" /></div></fieldset>'
              >{`<fieldset>
  <legend>Personal Information</legend>
  <label>Name:</label>
  <input type="text" />
  
  <label>Age:</label>
  <input type="number" />
</fieldset>

<fieldset>
  <legend>Contact</legend>
  <label>Email:</label>
  <input type="email" />
</fieldset>`}</CodeBlock>
            </Section>

            <Section id="dataattr" title="Data Attributes">
              <p className="text-slate-700 mb-4">
                Data attributes (<code>data-*</code>) store custom data on HTML
                elements for use with JavaScript.
              </p>
              <CodeBlock
                id="dataattr-1"
                result='<div style="display: flex; gap: 8px; flex-wrap: wrap;"><button data-color="red" style="padding: 10px 16px; background-color: #ef4444; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Red</button><button data-color="green" style="padding: 10px 16px; background-color: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Green</button><button data-color="blue" style="padding: 10px 16px; background-color: #3b82f6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500;">Blue</button></div><p style="margin-top: 12px; color: #6b7280; font-size: 14px;">Click buttons to see data attributes in action</p>'
              >{`<button data-color="red" data-id="1">Red</button>
<button data-color="green" data-id="2">Green</button>
<button data-color="blue" data-id="3">Blue</button>

<script>
  const buttons = document.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      console.log(this.dataset.color);
      console.log(this.dataset.id);
    });
  });
</script>`}</CodeBlock>
            </Section>

            <Section id="progress" title="Progress & Meter">
              <p className="text-slate-700 mb-4">
                <code>&lt;progress&gt;</code> shows task completion, and{" "}
                <code>&lt;meter&gt;</code> displays measurements.
              </p>
              <CodeBlock
                id="progress-1"
                result='<div style="margin-bottom: 16px;"><label style="display: block; margin-bottom: 8px; font-weight: 500;">Download Progress:</label><progress value="70" max="100" style="width: 100%; height: 20px; border-radius: 4px;"></progress><span style="font-size: 12px; color: #6b7280;">70%</span></div><div><label style="display: block; margin-bottom: 8px; font-weight: 500;">Storage Usage:</label><meter value="6" min="0" max="10" style="width: 100%; height: 20px;"></meter><span style="font-size: 12px; color: #6b7280;">6/10</span></div>'
              >{`<label>Download Progress:</label>
<progress value="70" max="100"></progress>

<label>Storage Usage:</label>
<meter value="6" min="0" max="10" low="3" high="8"></meter>`}</CodeBlock>
            </Section>

            <Section id="details" title="Details & Summary">
              <p className="text-slate-700 mb-4">
                <code>&lt;details&gt;</code> creates expandable/collapsible
                content, with <code>&lt;summary&gt;</code> as the header.
              </p>
              <CodeBlock
                id="details-1"
                result='<details style="border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; margin-bottom: 12px;"><summary style="cursor: pointer; font-weight: 600; color: #3b82f6;">What is HTML?</summary><p style="margin-top: 12px; color: #6b7280;">HTML is HyperText Markup Language used to create web pages.</p></details><details style="border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; margin-bottom: 12px;"><summary style="cursor: pointer; font-weight: 600; color: #3b82f6;">What is CSS?</summary><p style="margin-top: 12px; color: #6b7280;">CSS is used to style and layout HTML elements.</p></details><details style="border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px;"><summary style="cursor: pointer; font-weight: 600; color: #3b82f6;">What is JavaScript?</summary><p style="margin-top: 12px; color: #6b7280;">JavaScript adds interactivity and functionality to web pages.</p></details>'
              >{`<details>
  <summary>What is HTML?</summary>
  <p>HTML is HyperText Markup Language used to create web pages.</p>
</details>

<details>
  <summary>What is CSS?</summary>
  <p>CSS is used to style and layout HTML elements.</p>
</details>

<details open>
  <summary>What is JavaScript?</summary>
  <p>JavaScript adds interactivity to web pages.</p>
</details>`}</CodeBlock>
            </Section>

            <Section id="code" title="Code & Pre Tags">
              <p className="text-slate-700 mb-4">
                <code>&lt;code&gt;</code> displays inline code, and{" "}
                <code>&lt;pre&gt;</code> preserves formatting for code blocks.
              </p>
              <CodeBlock
                id="code-1"
                result='<p style="color: #6b7280;">Use <code style="background-color: #f3f4f6; padding: 2px 6px; border-radius: 3px; font-family: monospace;">console.log()</code> to print messages.</p><pre style="background: #1f2937; color: #e5e7eb; padding: 16px; border-radius: 4px; overflow-x: auto; font-family: monospace; font-size: 12px; line-height: 1.5;">function greet(name) {
  console.log("Hello, " + name);
}
greet("World");</pre>'
              >{`<p>Use <code>console.log()</code> to print messages.</p>

<pre>
function greet(name) {
  console.log("Hello, " + name);
}
greet("World");
</pre>`}</CodeBlock>
            </Section>

            <Section id="blockquote" title="Blockquote">
              <p className="text-slate-700 mb-4">
                The <code>&lt;blockquote&gt;</code> tag indicates a quoted
                section from another source.
              </p>
              <CodeBlock
                id="blockquote-1"
                result='<blockquote style="border-left: 4px solid #3b82f6; padding-left: 16px; margin: 16px 0; color: #6b7280; font-style: italic;">"The only way to do great work is to love what you do." - Steve Jobs</blockquote><blockquote cite="https://www.example.com" style="border-left: 4px solid #10b981; padding-left: 16px; margin: 16px 0; color: #6b7280; font-style: italic;">"Innovation distinguishes between a leader and a follower." - Steve Jobs</blockquote>'
              >{`<blockquote>
  "The only way to do great work is to love what you do."
  - Steve Jobs
</blockquote>

<blockquote cite="https://www.example.com">
  "Innovation distinguishes between a leader and a follower."
  - Steve Jobs
</blockquote>`}</CodeBlock>
            </Section>

            <Section id="abbr" title="Abbreviation">
              <p className="text-slate-700 mb-4">
                The <code>&lt;abbr&gt;</code> tag defines an abbreviation or
                acronym with the full term in the title attribute.
              </p>
              <CodeBlock
                id="abbr-1"
                result='<p style="color: #6b7280;"><abbr title="HyperText Markup Language" style="border-bottom: 1px dotted #3b82f6; cursor: help;">HTML</abbr> is used to create web pages. <abbr title="Cascading Style Sheets" style="border-bottom: 1px dotted #3b82f6; cursor: help;">CSS</abbr> is used for styling. <abbr title="JavaScript" style="border-bottom: 1px dotted #3b82f6; cursor: help;">JS</abbr> adds functionality.</p><p style="color: #9ca3af; font-size: 12px; margin-top: 8px;">Hover over abbreviations to see full text</p>'
              >{`<p>
  <abbr title="HyperText Markup Language">HTML</abbr> is used to create web pages.
  <abbr title="Cascading Style Sheets">CSS</abbr> is used for styling.
  <abbr title="JavaScript">JS</abbr> adds functionality.
</p>`}</CodeBlock>
            </Section>

            <Section id="figure" title="Figure & Figcaption">
              <p className="text-slate-700 mb-4">
                <code>&lt;figure&gt;</code> contains illustrations, diagrams, or
                images, with <code>&lt;figcaption&gt;</code> as the caption.
              </p>
              <CodeBlock
                id="figure-1"
                result='<figure style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; text-align: center; margin-bottom: 12px;" ><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop" alt="Web Development" style="border-radius: 4px; width: 100%; max-width: 300px; margin-bottom: 8px;" /><figcaption style="color: #6b7280; font-style: italic; font-size: 14px;">Web development involves creating interactive websites</figcaption></figure><figure style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; text-align: center;"><svg width="300" height="150" style="margin: 0 auto; display: block;"><circle cx="75" cy="75" r="50" fill="#3b82f6"></circle><rect x="150" y="50" width="100" height="50" fill="#10b981"></rect></svg><figcaption style="color: #6b7280; font-style: italic; font-size: 14px; margin-top: 8px;">SVG graphics example</figcaption></figure>'
              >{`<figure>
  <img src="image.jpg" alt="Description" />
  <figcaption>
    This image shows important information
  </figcaption>
</figure>

<figure>
  <svg width="300" height="150">
    <circle cx="75" cy="75" r="50" fill="#3b82f6"></circle>
  </svg>
  <figcaption>SVG graphics example</figcaption>
</figure>`}</CodeBlock>
            </Section>

            <Section id="fullpage" title="Complete Page Structure">
              <p className="text-slate-700 mb-4">
                Here's a simple complete HTML page structure with navigation,
                hero section, content, images, and footer.
              </p>
              <CodeBlock
                id="fullpage-1"
                result='<div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto;"><nav style="background-color: #3b82f6; color: white; padding: 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;"><h1 style="margin: 0; font-size: 24px;">MyWebsite</h1><ul style="list-style: none; margin: 0; padding: 0; display: flex; gap: 16px;"><li><a href="#" style="color: white; text-decoration: none;">Home</a></li><li><a href="#" style="color: white; text-decoration: none;">About</a></li><li><a href="#" style="color: white; text-decoration: none;">Contact</a></li></ul></nav><header style="background-color: #e0f2fe; padding: 32px; text-align: center; border-radius: 8px; margin-bottom: 24px;"><h2 style="margin: 0 0 12px 0; font-size: 32px; color: #0284c7;">Welcome to My Website</h2><p style="margin: 0; color: #6b7280;">This is a simple example page</p></header><main style="margin-bottom: 24px;"><section style="margin-bottom: 24px;"><h3 style="color: #3b82f6; margin-bottom: 12px;">Featured Services</h3><div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;"><div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;"><img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=300&h=200&fit=crop" alt="Web Design" style="width: 100%; height: 150px; object-fit: cover;" /><div style="padding: 12px;"><h4 style="margin: 0 0 8px 0;">Web Design</h4><p style="margin: 0; color: #6b7280; font-size: 14px;">Create beautiful websites</p></div></div><div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;"><img src="https://media.istockphoto.com/id/183381310/photo/html-code.webp?a=1&b=1&s=612x612&w=0&k=20&c=hHi0GgEvrjDXCu-B7KJCroKmjM4Q6PYlZqRNicZ4XcA=" alt="Development" style="width: 100%; height: 150px; object-fit: cover;" /><div style="padding: 12px;"><h4 style="margin: 0 0 8px 0;">Development</h4><p style="margin: 0; color: #6b7280; font-size: 14px;">Build powerful applications</p></div></div></div></section><section><h3 style="color: #3b82f6; margin-bottom: 12px;">About Us</h3><p style="color: #6b7280; margin: 0;">We provide professional web development and design services. Our team is experienced and dedicated to creating amazing digital experiences for our clients.</p></section></main><footer style="background-color: #374151; color: white; padding: 24px; text-align: center; border-radius: 8px; margin-top: 24px;"><p style="margin: 0 0 8px 0;"><strong>MyWebsite &copy; 2024</strong></p><p style="margin: 0 0 8px 0;"><small>All rights reserved</small></p><div style="margin-top: 12px;"><a href="#" style="color: #93c5fd; text-decoration: none; margin: 0 12px;">Privacy</a><a href="#" style="color: #93c5fd; text-decoration: none; margin: 0 12px;">Terms</a><a href="#" style="color: #93c5fd; text-decoration: none; margin: 0 12px;">Contact</a></div></footer></div>'
              >{`<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
  <!-- Navigation -->
  <nav>
    <h1>MyWebsite</h1>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About</a></li>
      <li><a href="#">Contact</a></li>
    </ul>
  </nav>

  <!-- Header/Hero Section -->
  <header>
    <h2>Welcome to My Website</h2>
    <p>This is a simple example page</p>
  </header>

  <!-- Main Content -->
  <main>
    <!-- Featured Services Section -->
    <section>
      <h3>Featured Services</h3>
      <div class="services">
        <article>
          <img src="image1.jpg" alt="Web Design" />
          <h4>Web Design</h4>
          <p>Create beautiful websites</p>
        </article>
        <article>
          <img src="image2.jpg" alt="Development" />
          <h4>Development</h4>
          <p>Build powerful applications</p>
        </article>
      </div>
    </section>

    <!-- About Section -->
    <section>
      <h3>About Us</h3>
      <p>We provide professional web development and design services.</p>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <p><strong>MyWebsite © 2024</strong></p>
    <p><small>All rights reserved</small></p>
    <nav>
      <a href="#">Privacy</a>
      <a href="#">Terms</a>
      <a href="#">Contact</a>
    </nav>
  </footer>
</body>
</html>`}</CodeBlock>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                <p className="font-semibold text-blue-900 mb-2">
                  ✓ Page Structure Breakdown:
                </p>
                <ul className="list-disc pl-6 text-slate-700 space-y-1 text-sm">
                  <li>
                    <b>&lt;nav&gt;</b>: Navigation bar with links
                  </li>
                  <li>
                    <b>&lt;header&gt;</b>: Hero/banner section with title
                  </li>
                  <li>
                    <b>&lt;main&gt;</b>: Main content area with sections
                  </li>
                  <li>
                    <b>&lt;section&gt;</b>: Groups related content (services,
                    about)
                  </li>
                  <li>
                    <b>&lt;article&gt;</b>: Individual service cards with images
                  </li>
                  <li>
                    <b>&lt;footer&gt;</b>: Copyright, links, and site info
                  </li>
                  <li>
                    <b>&lt;img&gt;</b>: Images with alt text for accessibility
                  </li>
                </ul>
              </div>
            </Section>

            <Section id="best" title="Best Practices">
              <ul className="list-disc pl-6 text-slate-700 space-y-2">
                <li>Use semantic HTML tags for better SEO and accessibility</li>
                <li>Always include DOCTYPE declaration</li>
                <li>Indent code properly for readability</li>
                <li>Always use alt attribute in images</li>
                <li>Close all tags properly</li>
                <li>Use lowercase for tag names</li>
                <li>Quote attribute values</li>
                <li>Validate your HTML code regularly</li>
                <li>Use meaningful class and id names</li>
                <li>Keep HTML, CSS, and JavaScript separate</li>
                <li>Optimize images for web performance</li>
                <li>Make your website responsive with viewport meta tag</li>
              </ul>
            </Section>

            {/* FINAL CTA */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 text-center shadow-sm"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to test yourself?
              </h3>
              <p className="text-slate-600 mb-6">
                Start the HTML quiz and update your dashboard progress.
              </p>

              <motion.button
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.03 }}
                onClick={() => navigate("/html")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-md hover:opacity-95 transition"
              >
                Start HTML Quiz <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </main>
        </div>
      </div>
    </motion.div>
  );
}

export default HtmlLearn;
