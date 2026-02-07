import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Server, Code2, ArrowRight, Copy, Check, BookOpen, Terminal, Package, FileText, Globe, Lock, Settings, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function NodeLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);
  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(() => [
    { id: "intro", title: "What is Node.js?", icon: Server },
    { id: "install", title: "Installation & Setup", icon: Terminal },
    { id: "modules", title: "Modules & require()", icon: Package },
    { id: "npm", title: "NPM & Packages", icon: Package },
    { id: "fs", title: "File System (fs)", icon: FileText },
    { id: "http", title: "Creating HTTP Server", icon: Globe },
    { id: "express", title: "Express.js Basics", icon: Zap },
    { id: "routing", title: "Routing", icon: ArrowRight },
    { id: "middleware", title: "Middleware", icon: Settings },
    { id: "rest", title: "Building REST APIs", icon: Code2 },
    { id: "mongodb", title: "MongoDB Connection", icon: Server },
    { id: "auth", title: "Authentication (JWT)", icon: Lock },
    { id: "env", title: "Environment Variables", icon: Settings },
    { id: "async", title: "Async/Await & Promises", icon: Zap },
    { id: "error", title: "Error Handling", icon: Code2 },
    { id: "project", title: "Mini Project: API Server", icon: Code2 },
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

  const CodeBlock = ({ children, id, language = "javascript" }) => {
    const blockId = `code-${id}`;
    const isCopied = copiedId === blockId;
    return (
      <div className="my-4">
        <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-gray-300 text-sm border-b border-gray-700">
            <span className="flex items-center gap-2">
              <Code2 size={14} />
              {language}
            </span>
            <button 
              onClick={() => copyToClipboard(children, blockId)} 
              className="flex items-center gap-1 text-xs hover:text-white transition px-2 py-1 rounded hover:bg-gray-700"
            >
              {isCopied ? <Check size={14} className="text-green-400" /> : <Copy size={14}/>}
              {isCopied ? "Copied!" : "Copy"}
            </button>
          </div>
          <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
            <code>{children}</code>
          </pre>
        </div>
      </div>
    );
  };

  const Output = ({ children, title = "Output" }) => (
    <div className="my-4 bg-slate-900 rounded-xl border border-slate-700 overflow-hidden">
      <div className="px-4 py-2 bg-slate-800 text-slate-300 text-sm border-b border-slate-700 flex items-center gap-2">
        <Terminal size={14} />
        {title}
      </div>
      <pre className="p-4 text-sm text-green-400 overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );

  const InfoBox = ({ children, type = "info" }) => {
    const styles = {
      info: "bg-blue-50 border-blue-200 text-blue-900",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
      success: "bg-green-50 border-green-200 text-green-900",
      tip: "bg-purple-50 border-purple-200 text-purple-900"
    };
    
    const icons = {
      info: "ℹ️",
      warning: "⚠️",
      success: "✅",
      tip: "💡"
    };

    return (
      <div className={`my-4 border rounded-xl p-4 ${styles[type]}`}>
        <div className="flex items-start gap-2">
          <span className="text-xl">{icons[type]}</span>
          <div className="flex-1 text-sm">{children}</div>
        </div>
      </div>
    );
  };

  const Section = ({ id, title, icon: Icon, children }) => (
    <section id={id} className="mb-12 md:mb-16 scroll-mt-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center shadow-lg">
          <Icon size={24} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <AnimatePresence>
        {copiedId && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm flex items-center gap-2"
          >
            <Check size={16} />
            Code copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-14 px-4 sm:px-6 text-center">
        <Server size={48} className="mx-auto mb-4" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Node.js Complete Guide</h1>
        <p className="text-sm sm:text-base md:text-lg text-green-100 mb-6 max-w-2xl mx-auto">
          Master backend development with Node.js, Express, and modern JavaScript patterns
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button 
            onClick={() => navigate("/nodequiz")} 
            className="px-6 py-3 bg-white text-green-600 rounded-xl font-semibold inline-flex items-center justify-center gap-2 hover:bg-green-50 transition shadow-lg"
          >
            Start Node Quiz <ArrowRight size={18}/>
          </button>
          <button 
            onClick={() => scrollTo("intro")} 
            className="px-6 py-3 border-2 border-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition"
          >
            Start Learning
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex gap-8">

        {/* SIDEBAR */}
        <aside className="hidden lg:block w-72 sticky top-6 h-fit">
          <div className="bg-white border rounded-xl p-5 shadow-sm">
            <h3 className="font-bold mb-4 text-gray-800 flex items-center gap-2">
              <BookOpen size={20} className="text-green-600" />
              Table of Contents
            </h3>
            <div className="space-y-1 max-h-[75vh] overflow-y-auto pr-2">
              {sections.map(s => {
                const Icon = s.icon;
                return (
                  <button 
                    key={s.id} 
                    onClick={() => scrollTo(s.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition flex items-center gap-2 ${
                      activeId === s.id 
                        ? "bg-green-600 text-white shadow-md" 
                        : "hover:bg-green-50 text-gray-700"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{s.title}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t">
              <button 
                onClick={() => navigate("/nodequiz")}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-full lg:max-w-4xl">

          <Section id="intro" title="What is Node.js?" icon={Server}>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">
              Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server side.
            </p>
            
            <div className="bg-white rounded-xl p-6 border shadow-sm mb-4">
              <h3 className="font-bold text-gray-800 mb-3">Key Features:</h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 text-sm sm:text-base">
                <li><b>JavaScript Everywhere:</b> Use the same language for frontend and backend</li>
                <li><b>Non-blocking I/O:</b> Handles multiple requests efficiently</li>
                <li><b>Event-driven:</b> Perfect for real-time applications</li>
                <li><b>V8 Engine:</b> Fast JavaScript execution</li>
                <li><b>NPM Ecosystem:</b> Access to millions of packages</li>
              </ul>
            </div>

            <InfoBox type="tip">
              <b>Use Cases:</b> REST APIs, Real-time apps (chat, gaming), Microservices, Streaming applications, IoT
            </InfoBox>
          </Section>

          <Section id="install" title="Installation & Setup" icon={Terminal}>
            <p className="text-gray-700 mb-4">Download and install Node.js from <a href="https://nodejs.org" className="text-green-600 underline">nodejs.org</a></p>
            
            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Verify Installation:</h3>
            <CodeBlock id="install-verify" language="bash">{`# Check Node.js version
node -v
# Output: v20.x.x

# Check NPM version
npm -v
# Output: 10.x.x`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Create Your First Node.js File:</h3>
            <CodeBlock id="hello-node">{`// hello.js
console.log("Hello from Node.js!");`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Run the file:</h3>
            <CodeBlock id="run-node" language="bash">{`node hello.js`}</CodeBlock>

            <Output>Hello from Node.js!</Output>

            <InfoBox type="success">
              Node.js is successfully installed if you see version numbers!
            </InfoBox>
          </Section>

          <Section id="modules" title="Modules & require()" icon={Package}>
            <p className="text-gray-700 mb-4">
              Node.js uses the CommonJS module system to organize code into reusable pieces.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Creating a Module:</h3>
            <CodeBlock id="module-create">{`// math.js
exports.add = (a, b) => a + b;
exports.subtract = (a, b) => a - b;
exports.multiply = (a, b) => a * b;

// OR using module.exports
module.exports = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Using a Module:</h3>
            <CodeBlock id="module-use">{`// app.js
const math = require('./math');

console.log(math.add(5, 3));        // 8
console.log(math.subtract(10, 4));  // 6
console.log(math.multiply(3, 7));   // 21`}</CodeBlock>

            <Output>{`8
6
21`}</Output>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Built-in Modules:</h3>
            <CodeBlock id="builtin-modules">{`// No ./ needed for built-in modules
const fs = require('fs');
const path = require('path');
const http = require('http');
const os = require('os');`}</CodeBlock>

            <InfoBox type="info">
              <b>ES6 Modules:</b> You can also use <code className="bg-blue-100 px-2 py-1 rounded">import/export</code> by adding <code className="bg-blue-100 px-2 py-1 rounded">"type": "module"</code> to package.json
            </InfoBox>
          </Section>

          <Section id="npm" title="NPM & Packages" icon={Package}>
            <p className="text-gray-700 mb-4">
              NPM (Node Package Manager) is the world's largest software registry with millions of packages.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Initialize a Project:</h3>
            <CodeBlock id="npm-init" language="bash">{`npm init -y`}</CodeBlock>
            
            <p className="text-gray-600 text-sm mb-4">This creates a <code className="bg-gray-100 px-2 py-1 rounded">package.json</code> file</p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Install Packages:</h3>
            <CodeBlock id="npm-install" language="bash">{`# Install a package
npm install express

# Install as dev dependency
npm install --save-dev nodemon

# Install globally
npm install -g nodemon

# Install specific version
npm install express@4.18.2`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Common Commands:</h3>
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <table className="w-full text-sm">
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 font-mono text-green-600">npm install</td>
                    <td className="py-2 text-gray-600">Install all dependencies</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-green-600">npm start</td>
                    <td className="py-2 text-gray-600">Run the start script</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-green-600">npm run dev</td>
                    <td className="py-2 text-gray-600">Run custom script</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-green-600">npm uninstall pkg</td>
                    <td className="py-2 text-gray-600">Remove package</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">package.json Scripts:</h3>
            <CodeBlock id="npm-scripts">{`{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}`}</CodeBlock>

            <InfoBox type="tip">
              <b>Popular Packages:</b> express, mongoose, dotenv, jsonwebtoken, bcrypt, cors, nodemon
            </InfoBox>
          </Section>

          <Section id="fs" title="File System (fs)" icon={FileText}>
            <p className="text-gray-700 mb-4">
              The <code className="bg-gray-100 px-2 py-1 rounded">fs</code> module allows you to work with files and directories.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Reading Files:</h3>
            <CodeBlock id="fs-read">{`const fs = require('fs');

// Synchronous (blocks execution)
const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

// Asynchronous (non-blocking)
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

// Using Promises (modern way)
const fsPromises = require('fs').promises;

async function readFile() {
  try {
    const data = await fsPromises.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Writing Files:</h3>
            <CodeBlock id="fs-write">{`// Write (overwrites if exists)
fs.writeFileSync('output.txt', 'Hello World');

// Append to file
fs.appendFileSync('log.txt', 'New log entry\\n');

// Async write
fs.writeFile('data.json', JSON.stringify({name: 'John'}), (err) => {
  if (err) throw err;
  console.log('File saved!');
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Other File Operations:</h3>
            <CodeBlock id="fs-other">{`// Check if file exists
if (fs.existsSync('file.txt')) {
  console.log('File exists');
}

// Delete file
fs.unlinkSync('file.txt');

// Rename file
fs.renameSync('old.txt', 'new.txt');

// Create directory
fs.mkdirSync('newFolder');

// Read directory
const files = fs.readdirSync('./');
console.log(files);`}</CodeBlock>

            <InfoBox type="warning">
              Prefer async methods in production to avoid blocking the event loop!
            </InfoBox>
          </Section>

          <Section id="http" title="Creating HTTP Server" icon={Globe}>
            <p className="text-gray-700 mb-4">
              Node.js can create web servers using the built-in <code className="bg-gray-100 px-2 py-1 rounded">http</code> module.
            </p>

            <CodeBlock id="http-basic">{`const http = require('http');

const server = http.createServer((req, res) => {
  // Set response header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  
  // Send response
  res.end('Hello World!');
});

// Listen on port 3000
server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});`}</CodeBlock>

            <Output>Server running on http://localhost:3000</Output>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Handling Different Routes:</h3>
            <CodeBlock id="http-routes">{`const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Home Page</h1>');
  } 
  else if (req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'API endpoint' }));
  } 
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3000);`}</CodeBlock>

            <InfoBox type="info">
              While you can use the <code className="bg-blue-100 px-2 py-1 rounded">http</code> module directly, most developers use Express.js for easier routing and middleware support.
            </InfoBox>
          </Section>

          <Section id="express" title="Express.js Basics" icon={Zap}>
            <p className="text-gray-700 mb-4">
              Express is a minimal and flexible Node.js web application framework that makes building servers much easier.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Installation:</h3>
            <CodeBlock id="express-install" language="bash">{`npm install express`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Basic Express Server:</h3>
            <CodeBlock id="express-basic">{`const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Route
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

// Start server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Sending Different Response Types:</h3>
            <CodeBlock id="express-responses">{`// Send plain text
app.get('/text', (req, res) => {
  res.send('Plain text');
});

// Send JSON
app.get('/json', (req, res) => {
  res.json({ message: 'Hello', status: 'success' });
});

// Send HTML
app.get('/html', (req, res) => {
  res.send('<h1>HTML Response</h1>');
});

// Send file
app.get('/download', (req, res) => {
  res.sendFile(__dirname + '/file.pdf');
});

// Redirect
app.get('/old', (req, res) => {
  res.redirect('/new');
});`}</CodeBlock>

            <InfoBox type="success">
              Express simplifies routing, middleware, and response handling compared to raw Node.js http module!
            </InfoBox>
          </Section>

          <Section id="routing" title="Routing" icon={ArrowRight}>
            <p className="text-gray-700 mb-4">
              Routing determines how an application responds to client requests to specific endpoints.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">HTTP Methods:</h3>
            <CodeBlock id="routing-methods">{`const express = require('express');
const app = express();

// GET - Read data
app.get('/users', (req, res) => {
  res.json({ users: ['John', 'Jane'] });
});

// POST - Create data
app.post('/users', (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: 'User created', user: newUser });
});

// PUT - Update data (full update)
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: \`User \${id} updated\` });
});

// PATCH - Update data (partial update)
app.patch('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: \`User \${id} partially updated\` });
});

// DELETE - Delete data
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: \`User \${id} deleted\` });
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Route Parameters:</h3>
            <CodeBlock id="routing-params">{`// URL parameters
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.json({ userId });
});
// Example: /users/123 → { userId: '123' }

// Query parameters
app.get('/search', (req, res) => {
  const { q, page } = req.query;
  res.json({ query: q, page });
});
// Example: /search?q=node&page=1 → { query: 'node', page: '1' }

// Multiple parameters
app.get('/posts/:year/:month', (req, res) => {
  const { year, month } = req.params;
  res.json({ year, month });
});
// Example: /posts/2024/05 → { year: '2024', month: '05' }`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Router (Organizing Routes):</h3>
            <CodeBlock id="routing-router">{`// routes/users.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ users: [] });
});

router.post('/', (req, res) => {
  res.json({ message: 'User created' });
});

module.exports = router;

// app.js
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);`}</CodeBlock>

            <InfoBox type="tip">
              <b>RESTful Convention:</b> GET (read), POST (create), PUT/PATCH (update), DELETE (remove)
            </InfoBox>
          </Section>

          <Section id="middleware" title="Middleware" icon={Settings}>
            <p className="text-gray-700 mb-4">
              Middleware functions have access to request, response objects and can execute code, modify req/res, or end the request-response cycle.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Built-in Middleware:</h3>
            <CodeBlock id="middleware-builtin">{`const express = require('express');
const app = express();

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Custom Middleware:</h3>
            <CodeBlock id="middleware-custom">{`// Logger middleware
app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next(); // Pass to next middleware
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // Verify token...
  req.user = { id: 1, name: 'John' };
  next();
};

// Use on specific route
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'Protected data', user: req.user });
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Error Handling Middleware:</h3>
            <CodeBlock id="middleware-error">{`// Must have 4 parameters
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Third-party Middleware:</h3>
            <CodeBlock id="middleware-third">{`const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

// Enable CORS
app.use(cors());

// HTTP request logger
app.use(morgan('dev'));

// Security headers
app.use(helmet());`}</CodeBlock>

            <div className="bg-white rounded-xl p-6 border shadow-sm mt-4">
              <h4 className="font-bold text-gray-800 mb-3">Middleware Execution Order:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">1</div>
                  <span>app.use() - Global middleware</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">2</div>
                  <span>Route-specific middleware</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">3</div>
                  <span>Route handler</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">4</div>
                  <span>Error handling middleware</span>
                </div>
              </div>
            </div>
          </Section>

          <Section id="rest" title="Building REST APIs" icon={Code2}>
            <p className="text-gray-700 mb-4">
              REST (Representational State Transfer) is an architectural style for designing networked applications.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Complete REST API Example:</h3>
            <CodeBlock id="rest-complete">{`const express = require('express');
const app = express();

app.use(express.json());

// In-memory database
let users = [
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
];

// GET all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET single user
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

// POST create user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email required' });
  }
  
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update user
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  user.name = req.body.name;
  user.email = req.body.email;
  
  res.json(user);
});

// DELETE user
app.delete('/api/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  users.splice(index, 1);
  res.status(204).send();
});

app.listen(3000);`}</CodeBlock>

            <div className="bg-white rounded-xl p-6 border shadow-sm mt-4">
              <h4 className="font-bold text-gray-800 mb-3">HTTP Status Codes:</h4>
              <table className="w-full text-sm">
                <tbody className="divide-y">
                  <tr>
                    <td className="py-2 font-mono text-green-600">200 OK</td>
                    <td className="py-2 text-gray-600">Success</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-green-600">201 Created</td>
                    <td className="py-2 text-gray-600">Resource created</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-yellow-600">400 Bad Request</td>
                    <td className="py-2 text-gray-600">Invalid request</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-yellow-600">401 Unauthorized</td>
                    <td className="py-2 text-gray-600">Authentication required</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-yellow-600">404 Not Found</td>
                    <td className="py-2 text-gray-600">Resource not found</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-mono text-red-600">500 Server Error</td>
                    <td className="py-2 text-gray-600">Internal server error</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="mongodb" title="MongoDB Connection" icon={Server}>
            <p className="text-gray-700 mb-4">
              MongoDB is a popular NoSQL database that works perfectly with Node.js.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Installation:</h3>
            <CodeBlock id="mongo-install" language="bash">{`npm install mongoose`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Connect to MongoDB:</h3>
            <CodeBlock id="mongo-connect">{`const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Define a Schema and Model:</h3>
            <CodeBlock id="mongo-schema">{`const mongoose = require('mongoose');

// Define schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model
const User = mongoose.model('User', userSchema);

module.exports = User;`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">CRUD Operations:</h3>
            <CodeBlock id="mongo-crud">{`const User = require('./models/User');

// CREATE
const createUser = async () => {
  const user = new User({
    name: 'John Doe',
    email: 'john@example.com',
    age: 25
  });
  
  await user.save();
  console.log('User created:', user);
};

// READ - Find all
const getUsers = async () => {
  const users = await User.find();
  console.log(users);
};

// READ - Find one
const getUserById = async (id) => {
  const user = await User.findById(id);
  console.log(user);
};

// READ - Find with condition
const findUserByEmail = async (email) => {
  const user = await User.findOne({ email });
  console.log(user);
};

// UPDATE
const updateUser = async (id) => {
  const user = await User.findByIdAndUpdate(
    id,
    { age: 26 },
    { new: true } // Return updated document
  );
  console.log('Updated:', user);
};

// DELETE
const deleteUser = async (id) => {
  await User.findByIdAndDelete(id);
  console.log('User deleted');
};`}</CodeBlock>

            <InfoBox type="tip">
              <b>MongoDB Atlas:</b> Use MongoDB Atlas for free cloud-hosted database at <a href="https://www.mongodb.com/cloud/atlas" className="text-purple-600 underline">mongodb.com/cloud/atlas</a>
            </InfoBox>
          </Section>

          <Section id="auth" title="Authentication (JWT)" icon={Lock}>
            <p className="text-gray-700 mb-4">
              JWT (JSON Web Tokens) is a secure way to handle authentication in Node.js APIs.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Installation:</h3>
            <CodeBlock id="auth-install" language="bash">{`npm install jsonwebtoken bcrypt`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">User Registration:</h3>
            <CodeBlock id="auth-register">{`const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

// Register
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });
    
    await user.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">User Login:</h3>
            <CodeBlock id="auth-login">{`// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'your-secret-key', // Store in .env file
      { expiresIn: '1h' }
    );
    
    res.json({ 
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Protected Routes Middleware:</h3>
            <CodeBlock id="auth-middleware">{`// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }
  
  try {
    const verified = jwt.verify(token, 'your-secret-key');
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Protected route
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`}</CodeBlock>

            <InfoBox type="warning">
              <b>Security:</b> Always store JWT secret in environment variables, never hardcode it!
            </InfoBox>
          </Section>

          <Section id="env" title="Environment Variables" icon={Settings}>
            <p className="text-gray-700 mb-4">
              Environment variables help keep sensitive information secure and make your app configurable.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Installation:</h3>
            <CodeBlock id="env-install" language="bash">{`npm install dotenv`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Create .env file:</h3>
            <CodeBlock id="env-file" language="text">{`PORT=3000
MONGODB_URI=mongodb://localhost:27017/mydb
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=development`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Use in your app:</h3>
            <CodeBlock id="env-use">{`// Load at the top of your main file
require('dotenv').config();

const express = require('express');
const app = express();

// Access environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

// Use in JWT
const token = jwt.sign({ userId }, process.env.JWT_SECRET);

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}</CodeBlock>

            <InfoBox type="warning">
              <b>Important:</b> Add <code className="bg-yellow-100 px-2 py-1 rounded">.env</code> to <code className="bg-yellow-100 px-2 py-1 rounded">.gitignore</code> to prevent committing secrets to version control!
            </InfoBox>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">.gitignore example:</h3>
            <CodeBlock id="gitignore" language="text">{`node_modules/
.env
.env.local
.env.production`}</CodeBlock>
          </Section>

          <Section id="async" title="Async/Await & Promises" icon={Zap}>
            <p className="text-gray-700 mb-4">
              Handle asynchronous operations cleanly in Node.js using Promises and async/await.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Callback Hell (Old Way):</h3>
            <CodeBlock id="async-callback">{`// ❌ Callback hell - hard to read
fs.readFile('file1.txt', (err, data1) => {
  if (err) throw err;
  fs.readFile('file2.txt', (err, data2) => {
    if (err) throw err;
    fs.writeFile('combined.txt', data1 + data2, (err) => {
      if (err) throw err;
      console.log('Done!');
    });
  });
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Promises (Better):</h3>
            <CodeBlock id="async-promise">{`const fsPromises = require('fs').promises;

// ✅ Using Promises - cleaner
fsPromises.readFile('file1.txt', 'utf8')
  .then(data1 => {
    return fsPromises.readFile('file2.txt', 'utf8')
      .then(data2 => data1 + data2);
  })
  .then(combined => {
    return fsPromises.writeFile('combined.txt', combined);
  })
  .then(() => {
    console.log('Done!');
  })
  .catch(err => {
    console.error('Error:', err);
  });`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Async/Await (Best):</h3>
            <CodeBlock id="async-await">{`// ✅ Async/Await - cleanest and most readable
async function combineFiles() {
  try {
    const data1 = await fsPromises.readFile('file1.txt', 'utf8');
    const data2 = await fsPromises.readFile('file2.txt', 'utf8');
    await fsPromises.writeFile('combined.txt', data1 + data2);
    console.log('Done!');
  } catch (err) {
    console.error('Error:', err);
  }
}

combineFiles();`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Parallel Execution:</h3>
            <CodeBlock id="async-parallel">{`// Run multiple async operations in parallel
async function fetchMultipleUsers() {
  try {
    // These run in parallel (faster)
    const [user1, user2, user3] = await Promise.all([
      User.findById('id1'),
      User.findById('id2'),
      User.findById('id3')
    ]);
    
    console.log(user1, user2, user3);
  } catch (err) {
    console.error('Error:', err);
  }
}`}</CodeBlock>

            <InfoBox type="success">
              <b>Best Practice:</b> Always use async/await for modern Node.js code. It's cleaner and easier to debug!
            </InfoBox>
          </Section>

          <Section id="error" title="Error Handling" icon={Code2}>
            <p className="text-gray-700 mb-4">
              Proper error handling prevents your application from crashing and provides better user experience.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Try-Catch with Async/Await:</h3>
            <CodeBlock id="error-try">{`app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Global Error Handler:</h3>
            <CodeBlock id="error-global">{`// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Default error
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Custom Error Class:</h3>
            <CodeBlock id="error-custom">{`class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Usage
app.get('/api/users/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    res.json(user);
  } catch (error) {
    next(error); // Pass to error handler
  }
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Async Handler Wrapper:</h3>
            <CodeBlock id="error-wrapper">{`// Utility to catch async errors
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Usage - no try-catch needed!
app.get('/api/users', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json(users);
}));`}</CodeBlock>

            <InfoBox type="tip">
              Always validate user input and handle errors gracefully to prevent crashes and security issues!
            </InfoBox>
          </Section>

          <Section id="project" title="Mini Project: Complete API Server" icon={Code2}>
            <p className="text-gray-700 mb-4">
              Let's build a complete RESTful API with authentication, database, and error handling.
            </p>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg">Project Structure:</h3>
            <CodeBlock id="project-structure" language="text">{`my-api/
├── models/
│   └── User.js
├── routes/
│   └── users.js
├── middleware/
│   └── auth.js
├── .env
├── .gitignore
├── package.json
└── server.js`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Complete server.js:</h3>
            <CodeBlock id="project-server">{`require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`}</CodeBlock>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Test with cURL:</h3>
            <CodeBlock id="project-test" language="bash">{`# Register user
curl -X POST http://localhost:3000/api/register \\
  -H "Content-Type: application/json" \\
  -d '{"name":"John","email":"john@example.com","password":"123456"}'

# Login
curl -X POST http://localhost:3000/api/login \\
  -H "Content-Type: application/json" \\
  -d '{"email":"john@example.com","password":"123456"}'

# Get users (protected)
curl http://localhost:3000/api/users \\
  -H "Authorization: Bearer YOUR_TOKEN_HERE"`}</CodeBlock>

            <InfoBox type="success">
              <b>Congratulations!</b> You now have a production-ready API server with authentication, database, and proper error handling!
            </InfoBox>
          </Section>

          <Section id="best" title="Best Practices" icon={BookOpen}>
            <div className="bg-white rounded-xl p-6 border shadow-sm">
              <h3 className="font-bold text-gray-800 mb-4 text-lg">Essential Best Practices:</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Use Environment Variables</h4>
                    <p className="text-sm text-gray-600">Never hardcode secrets, API keys, or configuration</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Use Async/Await</h4>
                    <p className="text-sm text-gray-600">Avoid callbacks, embrace modern async patterns</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Proper Error Handling</h4>
                    <p className="text-sm text-gray-600">Always use try-catch and global error handlers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Validate Input</h4>
                    <p className="text-sm text-gray-600">Use libraries like Joi or express-validator</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">5</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Use MVC Architecture</h4>
                    <p className="text-sm text-gray-600">Separate models, views, and controllers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">6</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Security Headers</h4>
                    <p className="text-sm text-gray-600">Use helmet.js for security headers</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">7</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Rate Limiting</h4>
                    <p className="text-sm text-gray-600">Prevent abuse with express-rate-limit</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">8</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Logging</h4>
                    <p className="text-sm text-gray-600">Use winston or morgan for logging</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">9</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Testing</h4>
                    <p className="text-sm text-gray-600">Write tests with Jest or Mocha</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0 font-bold">10</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Documentation</h4>
                    <p className="text-sm text-gray-600">Document your API with Swagger/OpenAPI</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-semibold text-gray-800 mb-3 text-lg mt-6">Essential NPM Packages:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Core</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• express - Web framework</li>
                  <li>• mongoose - MongoDB ODM</li>
                  <li>• dotenv - Environment variables</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <h4 className="font-semibold text-green-900 mb-2">Security</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• helmet - Security headers</li>
                  <li>• bcrypt - Password hashing</li>
                  <li>• jsonwebtoken - JWT auth</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-2">Utilities</h4>
                <ul className="text-sm text-purple-800 space-y-1">
                  <li>• cors - CORS middleware</li>
                  <li>• morgan - HTTP logger</li>
                  <li>• nodemon - Auto-restart</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-2">Validation</h4>
                <ul className="text-sm text-orange-800 space-y-1">
                  <li>• joi - Schema validation</li>
                  <li>• express-validator - Validation</li>
                  <li>• validator - String validation</li>
                </ul>
              </div>
            </div>
          </Section>

          {/* FINAL CTA */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-8 rounded-2xl text-center shadow-xl mt-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Ready to Test Your Node.js Skills?</h2>
            <p className="text-green-100 mb-6 text-sm md:text-base">
              Complete the quiz to test your knowledge and track your progress!
            </p>
            <button 
              onClick={() => navigate("/nodequiz")} 
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-green-50 transition shadow-lg inline-flex items-center gap-2"
            >
              Start Node.js Quiz <ArrowRight size={20}/>
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}

export default NodeLearn;