import React, { useState, useEffect } from "react";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const blogPosts = [
    {
      id: 1,
      title: "How to Start with HTML and CSS",
      date: "Jan 10, 2026",
      category: "HTML/CSS",
      author: "Sarah Chen",
      readTime: "5 min read",
      summary: "A beginner friendly guide to building your first web page using HTML and CSS.",
      content: `HTML is the structure of a webpage. CSS is used to style it.

Start by learning basic tags like div, h1, p, and img. These are the building blocks of any web page. Understanding semantic HTML will help you write cleaner, more accessible code.

Then move to CSS properties like color, margin, padding, and flexbox. Modern CSS includes powerful layout tools like Grid and Flexbox that make responsive design much easier.

Practice by building small layouts like cards and landing pages. Don't try to build complex websites right away. Start simple and gradually increase complexity.

Key tips for beginners:
- Use online resources like MDN and CSS-Tricks
- Build at least 3-5 small projects before moving to frameworks
- Learn responsive design principles early
- Practice debugging with browser developer tools

Remember, consistency is more important than speed. Code a little bit every day and you will see rapid improvement.`,
    },
    {
      id: 2,
      title: "Understanding JavaScript Basics",
      date: "Jan 15, 2026",
      category: "JavaScript",
      author: "Michael Torres",
      readTime: "7 min read",
      summary: "Learn the core concepts of JavaScript that every developer must know.",
      content: `JavaScript makes websites interactive and dynamic.

You should understand variables, functions, loops, and events. These fundamentals form the foundation of all JavaScript programming. Variables store data, functions organize code, loops repeat actions, and events respond to user interactions.

Start with simple programs like a counter or form validation. These projects teach you how to manipulate the DOM and handle user input. A counter teaches state management, while form validation teaches conditional logic.

Common JavaScript concepts to master:
- Data types: strings, numbers, booleans, objects, arrays
- Functions: declarations, expressions, arrow functions
- DOM manipulation: querySelector, addEventListener
- Async programming: callbacks, promises, async/await
- ES6+ features: destructuring, spread operator, template literals

Practice daily and build small projects. Consistency is key to becoming proficient. Try building a calculator, todo list, or simple game.

The best way to learn is by doing. Read documentation, watch tutorials, but most importantly, write code every single day.`,
    },
    {
      id: 3,
      title: "Why React is So Popular",
      date: "Jan 20, 2026",
      category: "React",
      author: "Emma Wilson",
      readTime: "6 min read",
      summary: "A simple explanation of why React is widely used in modern web development.",
      content: `React helps you build reusable UI components that can be used throughout your application.

It uses state and props to manage data. State is data that changes over time, while props are data passed from parent to child components. This separation makes it easy to understand data flow in your application.

React is fast because of the virtual DOM. Instead of updating the entire page, React only updates the parts that changed. This makes React applications feel snappy and responsive.

Most modern companies use React for web apps. Companies like Facebook, Instagram, Netflix, and Airbnb all use React in production. The job market for React developers is strong and growing.

Key React concepts:
- Components: functional and class components
- JSX: JavaScript XML syntax
- Hooks: useState, useEffect, useContext, useReducer
- Props and state management
- Component lifecycle
- Conditional rendering

React has a huge ecosystem with tools like React Router for navigation, Redux or Context API for state management, and countless UI libraries.

Start learning React after you are comfortable with JavaScript fundamentals. Build a few projects to understand how everything works together.`,
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: When to Use Each",
      date: "Jan 22, 2026",
      category: "HTML/CSS",
      author: "David Kim",
      readTime: "8 min read",
      summary: "Understanding the differences between CSS Grid and Flexbox and when to use each layout system.",
      content: `CSS Grid and Flexbox are both powerful layout systems, but they serve different purposes.

Flexbox is designed for one-dimensional layouts. Use Flexbox when you need to arrange items in a single row or column. It excels at distributing space and aligning items within a container.

CSS Grid is designed for two-dimensional layouts. Use Grid when you need to control both rows and columns simultaneously. Grid is perfect for page layouts and complex designs.

When to use Flexbox:
- Navigation bars
- Card layouts in a row
- Centering content
- Equal height columns
- Component-level layout

When to use Grid:
- Full page layouts
- Photo galleries
- Dashboard layouts
- Magazine-style designs
- Any layout requiring precise control over rows and columns

You can combine both in the same project. Use Grid for the overall page structure and Flexbox for component internals. This gives you the best of both worlds.

Modern browsers support both technologies fully. There is no reason not to use them in production today.`,
    },
    {
      id: 5,
      title: "Building Your First REST API",
      date: "Jan 25, 2026",
      category: "JavaScript",
      author: "Alex Rodriguez",
      readTime: "10 min read",
      summary: "A step-by-step guide to creating a REST API using Node.js and Express.",
      content: `REST APIs are the backbone of modern web applications. They allow your frontend to communicate with your backend.

Start by learning Node.js and Express. Node.js lets you run JavaScript on the server, while Express is a minimal web framework that makes building APIs simple.

A REST API typically has these HTTP methods:
- GET: retrieve data
- POST: create new data
- PUT: update existing data
- DELETE: remove data

Your first API should be simple. Try building a todo API or a simple blog API. Start with just a few endpoints and gradually add more features.

Essential concepts to understand:
- Routing: defining URL endpoints
- Middleware: functions that run before your route handlers
- Request and response objects
- Status codes: 200, 201, 400, 404, 500
- JSON data format
- Error handling

Use tools like Postman or Thunder Client to test your API endpoints. These tools let you send requests and see responses without building a frontend.

Once you understand the basics, add a database like MongoDB or PostgreSQL. Then learn about authentication, validation, and security best practices.

Building APIs is a valuable skill. Most web applications need a backend, and knowing how to build one makes you a more complete developer.`,
    },
    {
      id: 6,
      title: "Introduction to Git and GitHub",
      date: "Jan 28, 2026",
      category: "Tools",
      author: "Sarah Chen",
      readTime: "7 min read",
      summary: "Learn version control basics and how to use Git and GitHub for your projects.",
      content: `Git is a version control system that tracks changes in your code. GitHub is a platform for hosting Git repositories.

Every developer needs to know Git. It lets you save different versions of your code, collaborate with others, and deploy your projects.

Basic Git commands to learn first:
- git init: start a new repository
- git add: stage changes
- git commit: save changes
- git push: upload to GitHub
- git pull: download from GitHub
- git clone: copy a repository

Start using Git from day one. Even for small personal projects, Git helps you track changes and prevents you from losing work.

Create a GitHub account and push your projects there. This builds your portfolio and shows employers what you can do. Make sure to write good commit messages that explain what you changed.

GitHub also has great features:
- Issues: track bugs and feature requests
- Pull requests: review code before merging
- GitHub Pages: host static websites for free
- Actions: automate workflows

Learn to use branches. The main branch should always have working code. Create feature branches for new work, then merge them when complete.

Version control might seem complex at first, but it becomes second nature quickly. Practice with your own projects before contributing to open source.`,
    },
    {
      id: 7,
      title: "Understanding Async JavaScript",
      date: "Feb 1, 2026",
      category: "JavaScript",
      author: "Michael Torres",
      readTime: "9 min read",
      summary: "Master asynchronous programming with callbacks, promises, and async/await.",
      content: `Asynchronous code is code that does not run immediately. It runs later, after something else finishes.

JavaScript is single-threaded, but it can handle async operations using callbacks, promises, and async/await.

Callbacks were the original way to handle async code. A callback is a function passed to another function to be called later. However, callbacks can lead to callback hell when nested too deeply.

Promises are a better way. A promise represents a value that will be available in the future. Promises have three states: pending, fulfilled, and rejected.

Async/await makes promises even easier to use. It lets you write async code that looks like sync code. Use the async keyword before a function and await before a promise.

Common async operations:
- API calls with fetch
- File reading and writing
- Database queries
- Timers: setTimeout, setInterval

Always handle errors in async code. Use try/catch blocks with async/await or the catch method with promises.

Understanding async programming is crucial for modern JavaScript. Most real applications need to fetch data from APIs, and that requires async code.

Practice by building a weather app or a movie search app that fetches data from an API. This will help solidify your understanding.`,
    },
    {
      id: 8,
      title: "React Hooks Deep Dive",
      date: "Feb 5, 2026",
      category: "React",
      author: "Emma Wilson",
      readTime: "11 min read",
      summary: "A comprehensive guide to React Hooks including useState, useEffect, and custom hooks.",
      content: `React Hooks changed how we write React components. They let you use state and other React features in functional components.

useState is the most basic hook. It lets you add state to functional components. Call useState with an initial value and it returns the current state and a function to update it.

useEffect runs side effects in your components. Use it for fetching data, subscribing to events, or manually changing the DOM. It runs after every render by default, but you can control when it runs with dependencies.

Other built-in hooks:
- useContext: consume context values
- useReducer: manage complex state logic
- useRef: access DOM elements
- useMemo: memoize expensive calculations
- useCallback: memoize functions

You can also create custom hooks. Custom hooks let you extract component logic into reusable functions. Name them starting with "use" and they can call other hooks.

Rules of Hooks:
- Only call hooks at the top level
- Only call hooks from React functions
- Use the ESLint plugin to catch mistakes

Hooks make components more readable and easier to test. They encourage code reuse and composition over inheritance.

Start with useState and useEffect. Once you are comfortable with these, explore other hooks and try creating your own custom hooks.`,
    },
    {
      id: 9,
      title: "Responsive Design Best Practices",
      date: "Feb 8, 2026",
      category: "HTML/CSS",
      author: "David Kim",
      readTime: "8 min read",
      summary: "Learn how to build websites that look great on all devices using responsive design techniques.",
      content: `Responsive design means your website works well on all screen sizes from mobile phones to large desktop monitors.

Start with a mobile-first approach. Design for small screens first, then add complexity for larger screens. This ensures your site works on the most constrained devices.

Use relative units instead of fixed pixels:
- Percentages for widths
- rem and em for font sizes
- vw and vh for viewport-relative sizing

Media queries let you apply different styles at different screen sizes. Common breakpoints are 768px for tablets and 1024px for desktops, but choose breakpoints based on your design.

Flexbox and Grid make responsive layouts much easier. They automatically adjust to available space without needing complex calculations.

Images should be responsive too. Use max-width: 100% to prevent images from overflowing their containers. Consider using the picture element or srcset for serving different images at different sizes.

Test your designs on real devices, not just browser dev tools. Physical devices reveal issues that emulators might miss.

Key principles:
- Flexible grids
- Flexible images
- Media queries
- Mobile-first design
- Touch-friendly interactive elements

Responsive design is not optional anymore. Mobile devices account for more than half of all web traffic. Your site must work everywhere.`,
    },
    {
      id: 10,
      title: "Debugging Tips for JavaScript Developers",
      date: "Feb 12, 2026",
      category: "JavaScript",
      author: "Alex Rodriguez",
      readTime: "6 min read",
      summary: "Essential debugging techniques to find and fix bugs faster in your JavaScript code.",
      content: `Every developer spends time debugging. Learning to debug efficiently makes you much more productive.

Console.log is your first debugging tool. Log variables at different points to see how they change. Use console.table for objects and arrays to see data more clearly.

Browser developer tools are incredibly powerful. Learn to use the debugger. Set breakpoints to pause code execution and inspect variables. Step through code line by line to understand what is happening.

Common debugging techniques:
- Read error messages carefully
- Check the stack trace
- Use breakpoints instead of console.log
- Verify your assumptions
- Reproduce the bug consistently

The rubber duck method works. Explain your code out loud to a rubber duck or a colleague. Often you will find the bug while explaining.

Learn to search for errors effectively. Copy the error message and search on Google or Stack Overflow. Chances are someone else encountered the same issue.

Use ESLint to catch errors before runtime. Linting tools find potential bugs and enforce code quality standards.

Keep your code simple. Complex code is harder to debug. Break large functions into smaller ones. Each function should do one thing well.

Remember that debugging is a skill that improves with practice. Every bug you fix teaches you something new.`,
    },
    {
      id: 11,
      title: "Getting Started with TypeScript",
      date: "Feb 15, 2026",
      category: "Tools",
      author: "Sarah Chen",
      readTime: "9 min read",
      summary: "Learn why TypeScript is becoming essential and how to add type safety to your JavaScript projects.",
      content: `TypeScript is JavaScript with syntax for types. It helps you catch errors early and makes your code more maintainable.

Types describe what kind of data a variable can hold. String, number, boolean, and array are basic types. You can also create custom types for objects.

TypeScript catches type errors at compile time, before your code runs. This prevents many runtime errors and makes refactoring safer.

Basic TypeScript syntax:
- let name: string = "John"
- function greet(name: string): string
- interface User { name: string; age: number }
- type Status = "pending" | "complete"

Interfaces and types let you define the shape of objects. Use interfaces for objects and types for unions and other advanced features.

Many popular libraries have TypeScript definitions. This gives you autocomplete and type checking when using third-party code.

Benefits of TypeScript:
- Catch errors early
- Better IDE support
- Self-documenting code
- Easier refactoring
- Great for large codebases

You do not need to use TypeScript for every project. Small scripts and prototypes might not benefit. But for larger applications, TypeScript saves time in the long run.

Start by adding TypeScript to a small project. Configure tsconfig.json and gradually add types. You can adopt TypeScript incrementally.`,
    },
    {
      id: 12,
      title: "State Management in React Applications",
      date: "Feb 18, 2026",
      category: "React",
      author: "Emma Wilson",
      readTime: "10 min read",
      summary: "Compare different state management solutions and learn when to use each one.",
      content: `State management is how you handle data in your React application. Choosing the right solution depends on your needs.

For small apps, React's built-in useState and useContext are often enough. They are simple and require no additional libraries.

Context API is great for sharing state across many components without prop drilling. Create a context, provide it at the top level, and consume it anywhere.

Redux is the most popular state management library. It centralizes all your app state in a single store. Redux is powerful but adds complexity. Use it when you have complex state logic or need time-travel debugging.

Redux Toolkit simplifies Redux. It provides utilities that reduce boilerplate and include best practices by default. If you use Redux, use Redux Toolkit.

Other state management options:
- Zustand: minimal and flexible
- Jotai: atomic state management
- Recoil: similar to Zustand but more features
- MobX: observable state

Most apps do not need Redux. Start with useState and Context. Only add a state management library when your state logic becomes too complex.

Common patterns:
- Lift state up to common ancestors
- Keep state as local as possible
- Use derived state instead of duplicating
- Normalize nested data

Good state management makes your app easier to understand and maintain. Take time to organize your state well from the start.`,
    },
  ];

  // Define categories array - this was missing!
  const categories = ["All", "HTML/CSS", "JavaScript", "React", "Tools"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category) => {
    switch (category) {
      case "HTML/CSS":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "JavaScript":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "React":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "Tools":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-5xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Developer Blog
          </h1>
          <p className="text-blue-100 text-xl max-w-2xl leading-relaxed">
            Tutorials, insights, and practical guides for modern web development
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Filters Section */}
        {!selectedPost && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 mb-12 space-y-6">
            <div className="relative">
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by title, topic, or author..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl text-base focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-gray-600 mb-3 uppercase tracking-wider">
                Filter by Category
              </p>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                        : "bg-slate-100 text-gray-700 hover:bg-slate-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Blog List */}
        {!selectedPost && (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-8 rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900 flex-1 pr-4 leading-tight">
                    {post.title}
                  </h2>
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold border whitespace-nowrap ${getCategoryColor(
                      post.category
                    )}`}
                  >
                    {post.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span className="font-medium">{post.author}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>{post.date}</span>
                  </div>
                  <span className="text-gray-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed text-base">
                  {post.summary}
                </p>

                <button
                  onClick={() => {
                    setSelectedPost(post);
                    scrollToTop();
                  }}
                  className="inline-flex items-center gap-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors group"
                >
                  <span>Read Full Article</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 shadow-lg">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-gray-500 text-lg font-medium">
                  No articles found matching your criteria.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>
        )}

        {/* Selected Post View */}
        {selectedPost && (
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white p-10">
              <button
                onClick={() => {
                  setSelectedPost(null);
                  scrollToTop();
                }}
                className="inline-flex items-center gap-2 text-sm mb-8 hover:text-blue-200 transition-colors group"
              >
                <svg
                  className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="font-medium">Back to All Articles</span>
              </button>

              <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                {selectedPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium">{selectedPost.author}</span>
                </div>
                <span className="text-blue-300">•</span>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{selectedPost.date}</span>
                </div>
                <span className="text-blue-300">•</span>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
            </div>

            <div className="p-10">
              <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
                {selectedPost.content}
              </div>

              <div className="mt-12 pt-8 border-t-2 border-gray-100">
                <button
                  onClick={() => {
                    setSelectedPost(null);
                    scrollToTop();
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  <span>Back to All Articles</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}