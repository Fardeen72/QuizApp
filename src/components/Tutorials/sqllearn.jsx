import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Code2, ArrowRight, Copy, Check, Info, AlertCircle, 
  CheckCircle2, Database, Zap, Lock, Search, TrendingUp,
  GitBranch, FileText, Settings, Award, ChevronDown, ChevronUp,
  Play, Lightbulb, Terminal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SqlLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [completedSections, setCompletedSections] = useState(new Set());
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Load completed sections from localStorage
    const saved = localStorage.getItem('sql-learn-progress');
    if (saved) {
      setCompletedSections(new Set(JSON.parse(saved)));
    }
  }, []);

  const sections = useMemo(() => [
    { id: "intro", title: "What is SQL?", icon: Database },
    { id: "db", title: "Databases & Tables", icon: FileText },
    { id: "datatypes", title: "Data Types", icon: Code2 },
    { id: "create", title: "Creating Tables", icon: Settings },
    { id: "insert", title: "Inserting Data", icon: TrendingUp },
    { id: "select", title: "SELECT Queries", icon: Search },
    { id: "where", title: "WHERE Clause", icon: GitBranch },
    { id: "operators", title: "Operators & Functions", icon: Zap },
    { id: "order", title: "ORDER BY & DISTINCT", icon: TrendingUp },
    { id: "limit", title: "LIMIT & OFFSET", icon: Settings },
    { id: "aggregate", title: "Aggregate Functions", icon: TrendingUp },
    { id: "update", title: "UPDATE Data", icon: Settings },
    { id: "delete", title: "DELETE Data", icon: AlertCircle },
    { id: "constraints", title: "Constraints", icon: Lock },
    { id: "keys", title: "Primary & Foreign Keys", icon: Lock },
    { id: "joins", title: "JOINS", icon: GitBranch },
    { id: "group", title: "GROUP BY & HAVING", icon: TrendingUp },
    { id: "subqueries", title: "Subqueries", icon: Code2 },
    { id: "indexes", title: "Indexes", icon: Zap },
    { id: "views", title: "Views", icon: FileText },
    { id: "transactions", title: "Transactions", icon: Lock },
    { id: "advanced", title: "Advanced Queries", icon: Award },
    { id: "optimization", title: "Query Optimization", icon: Zap },
    { id: "best", title: "Best Practices", icon: CheckCircle2 },
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

  const markAsComplete = useCallback((sectionId) => {
    setCompletedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      localStorage.setItem('sql-learn-progress', JSON.stringify([...newSet]));
      return newSet;
    });
  }, []);

  const toggleSection = useCallback((id) => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const progressPercentage = (completedSections.size / sections.length) * 100;

  const CodeBlock = ({ children, id, language = "sql", runnable = false }) => {
    const blockId = `code-${id}`;
    const isCopied = copiedId === blockId;

    return (
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm mb-4 w-full">
        <div className="flex justify-between px-4 py-2 bg-slate-50 border-b border-slate-200">
          <span className="text-xs font-semibold text-slate-600 flex items-center gap-2">
            <Database className="w-3.5 h-3.5" />
            {language}
          </span>
          <div className="flex items-center gap-2">
            {runnable && (
              <button className="text-xs flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200">
                <Play className="w-3 h-3" />
                Run
              </button>
            )}
            <button onClick={() => copyToClipboard(children, blockId)} className="text-xs flex items-center gap-1 hover:text-indigo-600">
              {isCopied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
        <pre className="bg-slate-900 text-slate-50 p-4 text-sm overflow-x-auto rounded-b-2xl">
          <code>{children}</code>
        </pre>
      </div>
    );
  };

  const InfoBox = ({ children, type = "info", title }) => {
    const styles = {
      info: "bg-blue-50 border-blue-200 text-blue-800",
      tip: "bg-green-50 border-green-200 text-green-800",
      warning: "bg-amber-50 border-amber-200 text-amber-800",
      note: "bg-purple-50 border-purple-200 text-purple-800",
    };
    const icons = {
      info: <Info className="w-5 h-5" />,
      tip: <Lightbulb className="w-5 h-5" />,
      warning: <AlertCircle className="w-5 h-5" />,
      note: <Terminal className="w-5 h-5" />,
    };
    return (
      <div className={`border rounded-xl p-4 mb-4 ${styles[type]}`}>
        <div className="flex gap-3">
          <div className="mt-0.5">{icons[type]}</div>
          <div>
            {title && <div className="font-semibold mb-1">{title}</div>}
            <div className="text-sm leading-relaxed">{children}</div>
          </div>
        </div>
      </div>
    );
  };

  const CollapsibleExample = ({ title, children, id }) => {
    const isExpanded = expandedSections[id];
    return (
      <div className="border border-slate-200 rounded-xl mb-3 overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full px-4 py-3 bg-slate-50 flex items-center justify-between hover:bg-slate-100"
        >
          <span className="font-medium text-sm">{title}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const Section = ({ id, title, children }) => {
    const Icon = sections.find(s => s.id === id)?.icon || Code2;
    const isCompleted = completedSections.has(id);
    
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm scroll-mt-28"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-center">
              <Icon className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <button
            onClick={() => markAsComplete(id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors ${
              isCompleted 
                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Completed' : 'Mark Complete'}
          </button>
        </div>
        {children}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
      <AnimatePresence>
        {copiedId && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg z-50 flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Query copied!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10 bg-gradient-to-r from-indigo-600 to-blue-600 p-8 rounded-3xl border border-indigo-700 shadow-xl text-white">
          <h1 className="text-4xl font-extrabold mb-4">SQL Complete Learning Guide</h1>
          <p className="text-lg text-indigo-100 max-w-2xl mb-6">
            Master SQL from basics to advanced concepts. Learn how to store, manage, query, and optimize data using SQL.
          </p>
          
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm font-medium">{completedSections.size} / {sections.length}</span>
            </div>
            <div className="w-full bg-indigo-800 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                className="bg-green-400 h-3 rounded-full"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => navigate("/sqlquiz")} 
              className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold flex items-center gap-2 hover:bg-indigo-50"
            >
              Start SQL Quiz <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollTo("create")} 
              className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10"
            >
              Jump to First Table
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-10">
          <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
            <div className="bg-white border rounded-2xl p-4 shadow-sm">
              <h3 className="flex items-center gap-2 font-bold mb-3">
                <BookOpen className="w-5 h-5 text-gray-700" /> Contents
              </h3>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {sections.map((s) => {
                  const Icon = s.icon;
                  const isCompleted = completedSections.has(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                        activeId === s.id 
                          ? "bg-indigo-600 text-white" 
                          : isCompleted
                          ? "bg-green-50 text-green-700 hover:bg-green-100"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="flex-1">{s.title}</span>
                      {isCompleted && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <main className="space-y-6">
            <Section id="intro" title="What is SQL?">
              <p className="text-slate-700 mb-4">
                SQL (Structured Query Language) is a standard programming language designed for managing and manipulating relational databases. 
                It allows you to store, retrieve, update, and delete data efficiently using simple, declarative commands.
              </p>
              <InfoBox type="info" title="Why Learn SQL?">
                SQL is one of the most in-demand skills in tech. It's used by data analysts, backend developers, data scientists, 
                database administrators, and many other roles. Almost every application that stores data uses SQL in some form.
              </InfoBox>
              <InfoBox type="tip">
                SQL is used across many database systems including MySQL, PostgreSQL, SQL Server, Oracle, SQLite, and more. 
                While there are minor syntax differences, the core concepts remain the same.
              </InfoBox>
            </Section>

            <Section id="db" title="Databases & Tables">
              <p className="text-slate-700 mb-4">
                A <strong>database</strong> is an organized collection of data. Within a database, data is stored in <strong>tables</strong>, 
                which consist of rows and columns, similar to a spreadsheet.
              </p>
              
              <div className="bg-slate-50 p-4 rounded-xl mb-4 border">
                <h4 className="font-semibold mb-2">Key Concepts:</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>Table:</strong> A collection of related data organized in rows and columns</li>
                  <li><strong>Row (Record):</strong> A single entry in a table</li>
                  <li><strong>Column (Field):</strong> An attribute or property of the data</li>
                  <li><strong>Schema:</strong> The structure and organization of the database</li>
                </ul>
              </div>

              <CodeBlock id="create-db">
{`-- Create a new database
CREATE DATABASE school;

-- Use the database
USE school;

-- Show all databases
SHOW DATABASES;`}
              </CodeBlock>
            </Section>

            <Section id="datatypes" title="Data Types">
              <p className="text-slate-700 mb-4">
                SQL supports various data types to store different kinds of information efficiently.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Numeric Types</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li><code className="bg-blue-100 px-1 rounded">INT</code> - Whole numbers</li>
                    <li><code className="bg-blue-100 px-1 rounded">DECIMAL(p,s)</code> - Fixed precision</li>
                    <li><code className="bg-blue-100 px-1 rounded">FLOAT</code> - Floating point</li>
                    <li><code className="bg-blue-100 px-1 rounded">DOUBLE</code> - Double precision</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2">String Types</h4>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li><code className="bg-green-100 px-1 rounded">CHAR(n)</code> - Fixed length</li>
                    <li><code className="bg-green-100 px-1 rounded">VARCHAR(n)</code> - Variable length</li>
                    <li><code className="bg-green-100 px-1 rounded">TEXT</code> - Large text</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2">Date & Time</h4>
                  <ul className="text-sm text-purple-800 space-y-1">
                    <li><code className="bg-purple-100 px-1 rounded">DATE</code> - YYYY-MM-DD</li>
                    <li><code className="bg-purple-100 px-1 rounded">TIME</code> - HH:MM:SS</li>
                    <li><code className="bg-purple-100 px-1 rounded">DATETIME</code> - Date + Time</li>
                    <li><code className="bg-purple-100 px-1 rounded">TIMESTAMP</code> - Unix timestamp</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2">Other Types</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li><code className="bg-amber-100 px-1 rounded">BOOLEAN</code> - TRUE/FALSE</li>
                    <li><code className="bg-amber-100 px-1 rounded">BLOB</code> - Binary data</li>
                    <li><code className="bg-amber-100 px-1 rounded">JSON</code> - JSON documents</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="create" title="Creating Tables">
              <p className="text-slate-700 mb-4">
                The <code className="bg-slate-100 px-2 py-0.5 rounded">CREATE TABLE</code> statement is used to create a new table in the database.
              </p>

              <CodeBlock id="create-table-basic">
{`CREATE TABLE students (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  age INT,
  grade VARCHAR(10),
  enrollment_date DATE
);`}
              </CodeBlock>

              <CollapsibleExample title="More Examples" id="create-more">
                <CodeBlock id="create-table-advanced">
{`-- Table with multiple constraints
CREATE TABLE employees (
  employee_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(100) UNIQUE,
  salary DECIMAL(10, 2),
  hire_date DATE DEFAULT CURRENT_DATE,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES departments(id)
);`}
                </CodeBlock>
              </CollapsibleExample>

              <InfoBox type="tip" title="Pro Tip">
                Always plan your table structure before creating it. Think about what data you need to store, 
                what data types are appropriate, and what constraints will ensure data integrity.
              </InfoBox>
            </Section>

            <Section id="insert" title="Inserting Data">
              <p className="text-slate-700 mb-4">
                Use the <code className="bg-slate-100 px-2 py-0.5 rounded">INSERT INTO</code> statement to add new rows to a table.
              </p>

              <CodeBlock id="insert-single">
{`-- Insert a single row
INSERT INTO students (id, name, age, grade)
VALUES (1, 'Rahul', 20, 'A');`}
              </CodeBlock>

              <CodeBlock id="insert-multiple">
{`-- Insert multiple rows at once
INSERT INTO students (id, name, age, grade)
VALUES 
  (2, 'Priya', 21, 'B'),
  (3, 'Amit', 19, 'A'),
  (4, 'Sneha', 22, 'C');`}
              </CodeBlock>

              <CollapsibleExample title="Insert with SELECT" id="insert-select">
                <CodeBlock id="insert-from-select">
{`-- Insert data from another table
INSERT INTO archive_students (id, name, grade)
SELECT id, name, grade 
FROM students 
WHERE graduation_year = 2023;`}
                </CodeBlock>
              </CollapsibleExample>

              <InfoBox type="warning">
                Make sure the values you insert match the data types defined in the table schema. 
                Inserting incompatible data types will result in an error.
              </InfoBox>
            </Section>

            <Section id="select" title="SELECT Queries">
              <p className="text-slate-700 mb-4">
                The <code className="bg-slate-100 px-2 py-0.5 rounded">SELECT</code> statement is used to query and retrieve data from tables.
              </p>

              <CodeBlock id="select-all">
{`-- Select all columns from a table
SELECT * FROM students;`}
              </CodeBlock>

              <CodeBlock id="select-specific">
{`-- Select specific columns
SELECT name, grade FROM students;`}
              </CodeBlock>

              <CodeBlock id="select-alias">
{`-- Use column aliases for readable output
SELECT 
  name AS student_name,
  grade AS final_grade,
  age AS student_age
FROM students;`}
              </CodeBlock>

              <InfoBox type="tip">
                Using <code>SELECT *</code> is convenient for quick tests, but in production code, 
                always specify the columns you need. This improves performance and makes your code more maintainable.
              </InfoBox>
            </Section>

            <Section id="where" title="WHERE Clause">
              <p className="text-slate-700 mb-4">
                The <code className="bg-slate-100 px-2 py-0.5 rounded">WHERE</code> clause filters rows based on specified conditions.
              </p>

              <CodeBlock id="where-basic">
{`-- Filter by a single condition
SELECT * FROM students WHERE age > 18;`}
              </CodeBlock>

              <CodeBlock id="where-multiple">
{`-- Combine multiple conditions with AND/OR
SELECT * FROM students 
WHERE age >= 20 AND grade = 'A';

SELECT * FROM students 
WHERE grade = 'A' OR grade = 'B';`}
              </CodeBlock>

              <CodeBlock id="where-in">
{`-- Use IN for multiple values
SELECT * FROM students 
WHERE grade IN ('A', 'B', 'C');`}
              </CodeBlock>

              <CodeBlock id="where-between">
{`-- Use BETWEEN for ranges
SELECT * FROM students 
WHERE age BETWEEN 18 AND 22;`}
              </CodeBlock>

              <CodeBlock id="where-like">
{`-- Use LIKE for pattern matching
SELECT * FROM students 
WHERE name LIKE 'R%';  -- Names starting with 'R'

SELECT * FROM students 
WHERE name LIKE '%a%';  -- Names containing 'a'`}
              </CodeBlock>
            </Section>

            <Section id="operators" title="Operators & Functions">
              <p className="text-slate-700 mb-4">
                SQL provides various operators and built-in functions for data manipulation and calculation.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl mb-4 border">
                <h4 className="font-semibold mb-3">Comparison Operators</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                  <code className="bg-white px-2 py-1 rounded border">=</code>
                  <code className="bg-white px-2 py-1 rounded border">!=  or  &lt;&gt;</code>
                  <code className="bg-white px-2 py-1 rounded border">&gt;</code>
                  <code className="bg-white px-2 py-1 rounded border">&lt;</code>
                  <code className="bg-white px-2 py-1 rounded border">&gt;=</code>
                  <code className="bg-white px-2 py-1 rounded border">&lt;=</code>
                </div>
              </div>

              <CodeBlock id="functions">
{`-- String functions
SELECT UPPER(name), LOWER(grade), LENGTH(name)
FROM students;

SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM employees;

-- Numeric functions
SELECT ROUND(salary, 2), ABS(balance), CEIL(price), FLOOR(score)
FROM financial_data;

-- Date functions
SELECT CURRENT_DATE(), CURRENT_TIME(), NOW();

SELECT YEAR(hire_date), MONTH(hire_date), DAY(hire_date)
FROM employees;

SELECT DATEDIFF(CURRENT_DATE, hire_date) AS days_employed
FROM employees;`}
              </CodeBlock>
            </Section>

            <Section id="order" title="ORDER BY & DISTINCT">
              <p className="text-slate-700 mb-4">
                Sort your results with <code className="bg-slate-100 px-2 py-0.5 rounded">ORDER BY</code> and remove duplicates with <code className="bg-slate-100 px-2 py-0.5 rounded">DISTINCT</code>.
              </p>

              <CodeBlock id="order-basic">
{`-- Sort ascending (default)
SELECT * FROM students ORDER BY age;

-- Sort descending
SELECT * FROM students ORDER BY age DESC;

-- Sort by multiple columns
SELECT * FROM students 
ORDER BY grade ASC, age DESC;`}
              </CodeBlock>

              <CodeBlock id="distinct">
{`-- Get unique grades
SELECT DISTINCT grade FROM students;

-- Get unique combinations
SELECT DISTINCT grade, age FROM students;`}
              </CodeBlock>
            </Section>

            <Section id="limit" title="LIMIT & OFFSET">
              <p className="text-slate-700 mb-4">
                Control the number of rows returned with <code className="bg-slate-100 px-2 py-0.5 rounded">LIMIT</code> and <code className="bg-slate-100 px-2 py-0.5 rounded">OFFSET</code>.
              </p>

              <CodeBlock id="limit-basic">
{`-- Get top 5 students
SELECT * FROM students 
ORDER BY grade DESC 
LIMIT 5;

-- Pagination: Skip first 10, get next 5
SELECT * FROM students 
LIMIT 5 OFFSET 10;

-- Alternative syntax
SELECT * FROM students 
LIMIT 10, 5;  -- offset, count`}
              </CodeBlock>

              <InfoBox type="note">
                LIMIT and OFFSET are commonly used for pagination in web applications. 
                The first page shows rows 0-9, second page shows rows 10-19, and so on.
              </InfoBox>
            </Section>

            <Section id="aggregate" title="Aggregate Functions">
              <p className="text-slate-700 mb-4">
                Aggregate functions perform calculations on multiple rows and return a single value.
              </p>

              <CodeBlock id="aggregate-basic">
{`-- Count total students
SELECT COUNT(*) AS total_students FROM students;

-- Average age
SELECT AVG(age) AS average_age FROM students;

-- Maximum and minimum
SELECT MAX(salary) AS highest_salary, 
       MIN(salary) AS lowest_salary
FROM employees;

-- Sum
SELECT SUM(order_total) AS total_revenue
FROM orders;`}
              </CodeBlock>

              <CodeBlock id="aggregate-with-where">
{`-- Aggregate with filtering
SELECT COUNT(*) AS a_students
FROM students
WHERE grade = 'A';

SELECT AVG(salary) AS avg_tech_salary
FROM employees
WHERE department = 'Technology';`}
              </CodeBlock>
            </Section>

            <Section id="update" title="UPDATE Data">
              <p className="text-slate-700 mb-4">
                Modify existing records using the <code className="bg-slate-100 px-2 py-0.5 rounded">UPDATE</code> statement.
              </p>

              <CodeBlock id="update-basic">
{`-- Update a single record
UPDATE students 
SET grade = 'A+' 
WHERE id = 1;`}
              </CodeBlock>

              <CodeBlock id="update-multiple">
{`-- Update multiple columns
UPDATE students 
SET grade = 'B', age = 21 
WHERE id = 2;

-- Update multiple rows
UPDATE students 
SET grade = 'A' 
WHERE age > 20;`}
              </CodeBlock>

              <InfoBox type="warning" title="Important!">
                Always use a WHERE clause with UPDATE! Without it, you'll update ALL rows in the table. 
                Test your WHERE clause with a SELECT statement first to ensure you're updating the right rows.
              </InfoBox>
            </Section>

            <Section id="delete" title="DELETE Data">
              <p className="text-slate-700 mb-4">
                Remove records from a table using the <code className="bg-slate-100 px-2 py-0.5 rounded">DELETE</code> statement.
              </p>

              <CodeBlock id="delete-basic">
{`-- Delete specific rows
DELETE FROM students WHERE id = 1;

DELETE FROM students WHERE age < 18;`}
              </CodeBlock>

              <CodeBlock id="delete-all">
{`-- Delete all rows (use with extreme caution!)
DELETE FROM students;

-- Better: Use TRUNCATE for removing all rows (faster)
TRUNCATE TABLE students;`}
              </CodeBlock>

              <InfoBox type="warning" title="Critical Warning!">
                DELETE operations are permanent! Always backup your data before deleting, and test your WHERE clause 
                with a SELECT statement first. Consider using soft deletes (marking records as deleted) for important data.
              </InfoBox>
            </Section>

            <Section id="constraints" title="Constraints">
              <p className="text-slate-700 mb-4">
                Constraints enforce rules on data in tables to ensure data integrity and accuracy.
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-1">NOT NULL</h4>
                  <p className="text-sm text-blue-800">Ensures a column cannot have NULL values</p>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-1">UNIQUE</h4>
                  <p className="text-sm text-green-800">Ensures all values in a column are different</p>
                </div>
                
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-1">DEFAULT</h4>
                  <p className="text-sm text-purple-800">Sets a default value for a column</p>
                </div>
                
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-1">CHECK</h4>
                  <p className="text-sm text-amber-800">Ensures values meet a specific condition</p>
                </div>
              </div>

              <CodeBlock id="constraints-example">
{`CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price > 0),
  stock INT DEFAULT 0,
  sku VARCHAR(50) UNIQUE,
  category VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
              </CodeBlock>
            </Section>

            <Section id="keys" title="Primary & Foreign Keys">
              <p className="text-slate-700 mb-4">
                Keys establish relationships between tables and ensure data integrity.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2">Primary Key</h4>
                  <ul className="text-sm text-indigo-800 space-y-1">
                    <li>• Uniquely identifies each record</li>
                    <li>• Cannot be NULL</li>
                    <li>• Only one per table</li>
                    <li>• Often auto-incrementing</li>
                  </ul>
                </div>

                <div className="bg-pink-50 p-4 rounded-xl border border-pink-200">
                  <h4 className="font-semibold text-pink-900 mb-2">Foreign Key</h4>
                  <ul className="text-sm text-pink-800 space-y-1">
                    <li>• Links two tables together</li>
                    <li>• References primary key of another table</li>
                    <li>• Enforces referential integrity</li>
                    <li>• Can have multiple per table</li>
                  </ul>
                </div>
              </div>

              <CodeBlock id="keys-example">
{`-- Parent table
CREATE TABLE departments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL
);

-- Child table with foreign key
CREATE TABLE employees (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id) 
    REFERENCES departments(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);`}
              </CodeBlock>

              <InfoBox type="info">
                ON DELETE CASCADE means if a department is deleted, all employees in that department are also deleted. 
                ON UPDATE CASCADE means if a department ID changes, the employee records are updated automatically.
              </InfoBox>
            </Section>

            <Section id="joins" title="JOINS">
              <p className="text-slate-700 mb-4">
                JOINs combine rows from two or more tables based on related columns.
              </p>

              <CodeBlock id="inner-join">
{`-- INNER JOIN: Returns matching rows from both tables
SELECT orders.id, customers.name, orders.total
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id;`}
              </CodeBlock>

              <CodeBlock id="left-join">
{`-- LEFT JOIN: Returns all rows from left table, matching from right
SELECT customers.name, orders.id, orders.total
FROM customers
LEFT JOIN orders ON customers.id = orders.customer_id;`}
              </CodeBlock>

              <CodeBlock id="right-join">
{`-- RIGHT JOIN: Returns all rows from right table, matching from left
SELECT employees.name, departments.name AS dept_name
FROM employees
RIGHT JOIN departments ON employees.department_id = departments.id;`}
              </CodeBlock>

              <CodeBlock id="full-join">
{`-- FULL OUTER JOIN: Returns all rows when there's a match in either table
SELECT students.name, enrollments.course_id
FROM students
FULL OUTER JOIN enrollments ON students.id = enrollments.student_id;`}
              </CodeBlock>

              <CollapsibleExample title="Multiple Joins Example" id="multiple-joins">
                <CodeBlock id="multi-join">
{`-- Join three tables
SELECT 
  orders.id AS order_id,
  customers.name AS customer_name,
  products.name AS product_name,
  order_items.quantity,
  order_items.price
FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id
WHERE orders.status = 'completed';`}
                </CodeBlock>
              </CollapsibleExample>
            </Section>

            <Section id="group" title="GROUP BY & HAVING">
              <p className="text-slate-700 mb-4">
                <code className="bg-slate-100 px-2 py-0.5 rounded">GROUP BY</code> groups rows with the same values. 
                <code className="bg-slate-100 px-2 py-0.5 rounded">HAVING</code> filters groups (like WHERE for groups).
              </p>

              <CodeBlock id="group-basic">
{`-- Count students by grade
SELECT grade, COUNT(*) AS student_count
FROM students
GROUP BY grade;`}
              </CodeBlock>

              <CodeBlock id="group-having">
{`-- Get grades with more than 2 students
SELECT grade, COUNT(*) AS count
FROM students
GROUP BY grade
HAVING COUNT(*) > 2;`}
              </CodeBlock>

              <CodeBlock id="group-advanced">
{`-- Average salary by department
SELECT 
  department,
  AVG(salary) AS avg_salary,
  COUNT(*) AS employee_count,
  MAX(salary) AS highest_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 50000
ORDER BY avg_salary DESC;`}
              </CodeBlock>

              <InfoBox type="info">
                Key difference: WHERE filters rows before grouping, HAVING filters groups after grouping. 
                WHERE cannot use aggregate functions, but HAVING can.
              </InfoBox>
            </Section>

            <Section id="subqueries" title="Subqueries">
              <p className="text-slate-700 mb-4">
                A subquery is a query nested inside another query. It can return single values, rows, or tables.
              </p>

              <CodeBlock id="subquery-single">
{`-- Find students older than the average age
SELECT name, age
FROM students
WHERE age > (SELECT AVG(age) FROM students);`}
              </CodeBlock>

              <CodeBlock id="subquery-in">
{`-- Find employees in departments with more than 10 people
SELECT name, department_id
FROM employees
WHERE department_id IN (
  SELECT department_id
  FROM employees
  GROUP BY department_id
  HAVING COUNT(*) > 10
);`}
              </CodeBlock>

              <CodeBlock id="subquery-exists">
{`-- Find customers who have placed orders
SELECT name
FROM customers c
WHERE EXISTS (
  SELECT 1 
  FROM orders o 
  WHERE o.customer_id = c.id
);`}
              </CodeBlock>

              <CollapsibleExample title="Correlated Subquery" id="correlated-subquery">
                <CodeBlock id="correlated">
{`-- Find employees earning more than their department average
SELECT e1.name, e1.salary, e1.department_id
FROM employees e1
WHERE salary > (
  SELECT AVG(salary)
  FROM employees e2
  WHERE e2.department_id = e1.department_id
);`}
                </CodeBlock>
              </CollapsibleExample>
            </Section>

            <Section id="indexes" title="Indexes">
              <p className="text-slate-700 mb-4">
                Indexes speed up data retrieval but slow down writes. Use them on frequently searched columns.
              </p>

              <CodeBlock id="index-create">
{`-- Create an index
CREATE INDEX idx_student_name ON students(name);

-- Create a unique index
CREATE UNIQUE INDEX idx_email ON users(email);

-- Composite index (multiple columns)
CREATE INDEX idx_name_grade ON students(name, grade);

-- Drop an index
DROP INDEX idx_student_name ON students;`}
              </CodeBlock>

              <InfoBox type="tip" title="When to Use Indexes">
                Create indexes on columns used in WHERE clauses, JOIN conditions, and ORDER BY clauses. 
                Don't over-index - each index uses storage and slows down INSERT/UPDATE/DELETE operations.
              </InfoBox>

              <CodeBlock id="index-analysis">
{`-- See how query uses indexes
EXPLAIN SELECT * FROM students WHERE name = 'Rahul';

-- Show all indexes on a table
SHOW INDEX FROM students;`}
              </CodeBlock>
            </Section>

            <Section id="views" title="Views">
              <p className="text-slate-700 mb-4">
                A view is a virtual table based on a SELECT query. It doesn't store data but provides a way to simplify complex queries.
              </p>

              <CodeBlock id="view-create">
{`-- Create a view
CREATE VIEW student_summary AS
SELECT 
  grade,
  COUNT(*) AS total_students,
  AVG(age) AS avg_age
FROM students
GROUP BY grade;

-- Use the view
SELECT * FROM student_summary;

-- Update a view (creates or replaces)
CREATE OR REPLACE VIEW student_summary AS
SELECT 
  grade,
  COUNT(*) AS total_students,
  AVG(age) AS avg_age,
  MAX(age) AS max_age
FROM students
GROUP BY grade;

-- Drop a view
DROP VIEW student_summary;`}
              </CodeBlock>

              <InfoBox type="info">
                Views are great for security (hiding sensitive columns), simplifying complex queries, 
                and maintaining backward compatibility when table structures change.
              </InfoBox>
            </Section>

            <Section id="transactions" title="Transactions">
              <p className="text-slate-700 mb-4">
                Transactions ensure that a group of operations either all succeed or all fail, maintaining data consistency.
              </p>

              <CodeBlock id="transaction-basic">
{`-- Start a transaction
START TRANSACTION;

-- Execute multiple operations
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;

-- Commit if everything is successful
COMMIT;

-- Or rollback if something went wrong
-- ROLLBACK;`}
              </CodeBlock>

              <div className="bg-slate-50 p-4 rounded-xl mb-4 border">
                <h4 className="font-semibold mb-2">ACID Properties</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li><strong>Atomicity:</strong> All operations succeed or all fail</li>
                  <li><strong>Consistency:</strong> Database remains in valid state</li>
                  <li><strong>Isolation:</strong> Concurrent transactions don't interfere</li>
                  <li><strong>Durability:</strong> Committed changes are permanent</li>
                </ul>
              </div>

              <CodeBlock id="transaction-example">
{`-- Real-world example: Bank transfer
START TRANSACTION;

-- Withdraw from account 1
UPDATE accounts 
SET balance = balance - 500 
WHERE account_id = 1001;

-- Check if balance went negative
IF (SELECT balance FROM accounts WHERE account_id = 1001) < 0 THEN
  ROLLBACK;
ELSE
  -- Deposit to account 2
  UPDATE accounts 
  SET balance = balance + 500 
  WHERE account_id = 1002;
  
  COMMIT;
END IF;`}
              </CodeBlock>
            </Section>

            <Section id="advanced" title="Advanced Queries">
              <p className="text-slate-700 mb-4">
                Master these advanced techniques to write powerful SQL queries.
              </p>

              <CodeBlock id="window-functions">
{`-- Window functions (ROW_NUMBER, RANK, DENSE_RANK)
SELECT 
  name,
  salary,
  department,
  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS row_num,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
  DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dense_rank
FROM employees;`}
              </CodeBlock>

              <CodeBlock id="cte">
{`-- Common Table Expressions (CTE)
WITH high_earners AS (
  SELECT * FROM employees WHERE salary > 80000
),
top_departments AS (
  SELECT department, COUNT(*) as emp_count
  FROM high_earners
  GROUP BY department
)
SELECT * FROM top_departments WHERE emp_count > 5;`}
              </CodeBlock>

              <CodeBlock id="case-when">
{`-- CASE statements for conditional logic
SELECT 
  name,
  age,
  CASE 
    WHEN age < 18 THEN 'Minor'
    WHEN age BETWEEN 18 AND 65 THEN 'Adult'
    ELSE 'Senior'
  END AS age_category,
  CASE grade
    WHEN 'A' THEN 'Excellent'
    WHEN 'B' THEN 'Good'
    WHEN 'C' THEN 'Average'
    ELSE 'Needs Improvement'
  END AS performance
FROM students;`}
              </CodeBlock>

              <CollapsibleExample title="Recursive CTE" id="recursive-cte">
                <CodeBlock id="recursive">
{`-- Find all employees and their hierarchy
WITH RECURSIVE employee_hierarchy AS (
  -- Base case: top-level managers
  SELECT id, name, manager_id, 1 AS level
  FROM employees
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive case: employees under managers
  SELECT e.id, e.name, e.manager_id, eh.level + 1
  FROM employees e
  INNER JOIN employee_hierarchy eh ON e.manager_id = eh.id
)
SELECT * FROM employee_hierarchy ORDER BY level, name;`}
                </CodeBlock>
              </CollapsibleExample>
            </Section>

            <Section id="optimization" title="Query Optimization">
              <p className="text-slate-700 mb-4">
                Writing efficient queries is crucial for performance, especially with large datasets.
              </p>

              <div className="space-y-3 mb-4">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-1 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Do's
                  </h4>
                  <ul className="text-sm text-green-800 space-y-1 ml-6 list-disc">
                    <li>Use specific column names instead of SELECT *</li>
                    <li>Create indexes on frequently queried columns</li>
                    <li>Use LIMIT to restrict result sets</li>
                    <li>Use EXPLAIN to analyze query performance</li>
                    <li>Use JOINs instead of subqueries when possible</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 mb-1 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> Don'ts
                  </h4>
                  <ul className="text-sm text-red-800 space-y-1 ml-6 list-disc">
                    <li>Avoid using functions on indexed columns in WHERE</li>
                    <li>Don't use LIKE with leading wildcards ('%search')</li>
                    <li>Avoid SELECT DISTINCT when possible</li>
                    <li>Don't use OR extensively; consider UNION instead</li>
                  </ul>
                </div>
              </div>

              <CodeBlock id="optimization-examples">
{`-- Bad: Function on indexed column
SELECT * FROM users WHERE YEAR(created_at) = 2024;

-- Good: Use range instead
SELECT * FROM users 
WHERE created_at >= '2024-01-01' 
  AND created_at < '2025-01-01';

-- Bad: Leading wildcard
SELECT * FROM products WHERE name LIKE '%phone%';

-- Good: No leading wildcard
SELECT * FROM products WHERE name LIKE 'phone%';

-- Use EXPLAIN to analyze
EXPLAIN SELECT * FROM orders WHERE customer_id = 123;`}
              </CodeBlock>
            </Section>

            <Section id="best" title="Best Practices">
              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                  <h4 className="font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Database Design
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-indigo-800">
                    <li>Normalize your database to reduce redundancy</li>
                    <li>Use appropriate data types</li>
                    <li>Define primary and foreign keys</li>
                    <li>Use constraints to enforce data integrity</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Code2 className="w-4 h-4" /> Query Writing
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-blue-800">
                    <li>Always use WHERE clause with UPDATE and DELETE</li>
                    <li>Use prepared statements to prevent SQL injection</li>
                    <li>Specify column names instead of using SELECT *</li>
                    <li>Use meaningful aliases for better readability</li>
                    <li>Comment complex queries</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Performance
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-green-800">
                    <li>Create indexes on frequently searched columns</li>
                    <li>Avoid N+1 queries; use JOINs or eager loading</li>
                    <li>Use connection pooling in applications</li>
                    <li>Monitor slow queries and optimize them</li>
                    <li>Use EXPLAIN to understand query execution</li>
                  </ul>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <Lock className="w-4 h-4" /> Security & Maintenance
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-amber-800">
                    <li>Backup your database regularly</li>
                    <li>Use parameterized queries to prevent SQL injection</li>
                    <li>Implement proper access controls</li>
                    <li>Keep your database software updated</li>
                    <li>Monitor database size and clean up old data</li>
                  </ul>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Award className="w-4 h-4" /> Naming Conventions
                  </h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-purple-800">
                    <li>Use lowercase with underscores (snake_case)</li>
                    <li>Table names should be plural (users, orders)</li>
                    <li>Be consistent with naming across your schema</li>
                    <li>Use descriptive names that indicate purpose</li>
                    <li>Avoid reserved SQL keywords</li>
                  </ul>
                </div>
              </div>

              <InfoBox type="tip" title="Continuous Learning">
                SQL is a powerful language with many database-specific features. After mastering the basics, 
                explore specific features of your chosen database system (PostgreSQL, MySQL, SQL Server, etc.) 
                and learn about database design patterns, stored procedures, triggers, and advanced optimization techniques.
              </InfoBox>
            </Section>

            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 rounded-2xl text-center shadow-xl">
              <div className="mb-4">
                <Award className="w-16 h-16 mx-auto text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-white">Ready to Test Your SQL Knowledge?</h3>
              <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                You've learned the fundamentals and advanced concepts of SQL. Now it's time to put your skills to the test!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => navigate("/sqlquiz")}
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold inline-flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-50"
                >
                  Start SQL Quiz <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setCompletedSections(new Set());
                    localStorage.removeItem('sql-learn-progress');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white/10"
                >
                  Reset Progress
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SqlLearn;