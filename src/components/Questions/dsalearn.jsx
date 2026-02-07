import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Code2, ArrowRight, Copy, Check, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function DSALearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is DSA?" },
      { id: "complexity", title: "Time & Space Complexity" },
      { id: "arrays", title: "Arrays" },
      { id: "strings", title: "Strings" },
      { id: "linked-list", title: "Linked Lists" },
      { id: "stacks", title: "Stacks" },
      { id: "queues", title: "Queues" },
      { id: "hash-tables", title: "Hash Tables" },
      { id: "trees", title: "Trees" },
      { id: "bst", title: "Binary Search Trees" },
      { id: "heaps", title: "Heaps" },
      { id: "graphs", title: "Graphs" },
      { id: "sorting", title: "Sorting Algorithms" },
      { id: "searching", title: "Searching Algorithms" },
      { id: "recursion", title: "Recursion" },
      { id: "dynamic-programming", title: "Dynamic Programming" },
      { id: "greedy", title: "Greedy Algorithms" },
      { id: "backtracking", title: "Backtracking" },
      { id: "two-pointers", title: "Two Pointers" },
      { id: "sliding-window", title: "Sliding Window" },
      { id: "binary-search-algo", title: "Binary Search Pattern" },
      { id: "dfs", title: "Depth First Search" },
      { id: "bfs", title: "Breadth First Search" },
      { id: "project-problems", title: "Practice Problems" },
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

  const CodeBlock = ({ children, id, result, language = "javascript" }) => {
    const blockId = `code-${id}`;
    const isCopied = copiedId === blockId;

    return (
      <div className="space-y-3">
        <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Code2 size={16} />
              <span className="font-medium">{language}</span>
            </div>
            <button
              onClick={() => copyToClipboard(children, blockId)}
              className="text-xs font-medium flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 transition"
            >
              {isCopied ? <Check size={14} /> : <Copy size={14} />}
              {isCopied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="p-4 overflow-x-auto text-sm">
            <code className="text-gray-100">{children}</code>
          </pre>
        </div>

        {result && (
          <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
            <div className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">
              Visualization / Output
            </div>
            <div className="flex items-center justify-center min-h-[100px]">
              {result}
            </div>
          </div>
        )}
      </div>
    );
  };

  const Section = ({ id, title, children }) => (
    <section id={id} className="mb-16 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">{title}</h2>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
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

      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Brain size={48} />
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Data Structures & Algorithms
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Master DSA concepts with visualizations, code examples, and practice
            problems.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/dsa")}
              className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold flex items-center gap-2 hover:bg-purple-50 transition shadow-lg"
            >
              Start DSA Quiz
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollTo("arrays")}
              className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition"
            >
              Jump to Data Structures
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0 sticky top-6 h-fit">
          <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
            <h3 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">
              Contents
            </h3>
            <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                    activeId === s.id
                      ? "bg-purple-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-purple-50"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 max-w-4xl">
          <Section id="intro" title="What is DSA?">
            <div className="prose prose-lg mb-6">
              <ul className="space-y-2 text-gray-700">
                <li>
                  <strong>Data Structures:</strong> Ways to organize and store
                  data efficiently
                </li>
                <li>
                  <strong>Algorithms:</strong> Step-by-step procedures to solve
                  problems
                </li>
                <li>
                  Essential for technical interviews at top companies (FAANG)
                </li>
                <li>Improves problem-solving and coding skills</li>
                <li>Helps write efficient, optimized code</li>
              </ul>
            </div>
          </Section>

          <Section id="complexity" title="Time & Space Complexity">
            <p className="text-gray-700 mb-4">
              Big O notation describes how algorithm performance scales with
              input size:
            </p>
            <CodeBlock
              id="complexity"
              result={
                <div className="w-full space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-700 mb-1">
                        O(1)
                      </div>
                      <div className="text-sm text-green-600">
                        Constant - Best
                      </div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-700 mb-1">
                        O(log n)
                      </div>
                      <div className="text-sm text-blue-600">Logarithmic</div>
                    </div>
                    <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-700 mb-1">
                        O(n)
                      </div>
                      <div className="text-sm text-yellow-600">Linear</div>
                    </div>
                    <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-orange-700 mb-1">
                        O(n log n)
                      </div>
                      <div className="text-sm text-orange-600">
                        Linearithmic
                      </div>
                    </div>
                    <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-red-700 mb-1">
                        O(n²)
                      </div>
                      <div className="text-sm text-red-600">Quadratic</div>
                    </div>
                    <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-700 mb-1">
                        O(2ⁿ)
                      </div>
                      <div className="text-sm text-purple-600">
                        Exponential - Worst
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              {`// O(1) - Constant
function getFirst(arr) {
  return arr[0];
}

// O(n) - Linear
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// O(n²) - Quadratic
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`}
            </CodeBlock>
          </Section>

          <Section id="arrays" title="Arrays">
            <p className="text-gray-700 mb-4">
              Arrays store elements in contiguous memory locations. Access:
              O(1), Search: O(n)
            </p>
            <CodeBlock
              id="arrays"
              result={
                <div className="w-full space-y-4">
                  <div className="flex gap-2 justify-center">
                    {[10, 20, 30, 40, 50].map((val, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                          {val}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          [{idx}]
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-300 rounded-lg p-3 text-sm text-blue-800">
                    <strong>Operations:</strong> Access O(1), Insert O(n),
                    Delete O(n), Search O(n)
                  </div>
                </div>
              }
            >
              {`// Array Operations
const arr = [10, 20, 30, 40, 50];

// Access - O(1)
console.log(arr[2]); // 30

// Insert at end - O(1)
arr.push(60);

// Insert at beginning - O(n)
arr.unshift(5);

// Delete - O(n)
arr.splice(2, 1);

// Search - O(n)
const index = arr.indexOf(40);

// Common Array Methods
arr.map(x => x * 2);      // Transform
arr.filter(x => x > 20);  // Filter
arr.reduce((sum, x) => sum + x, 0); // Reduce`}
            </CodeBlock>
          </Section>

          <Section id="strings" title="Strings">
            <p className="text-gray-700 mb-4">
              Strings are sequences of characters. Immutable in JavaScript.
            </p>
            <CodeBlock
              id="strings"
              result={
                <div className="w-full space-y-4">
                  <div className="flex gap-1 justify-center flex-wrap">
                    {"HELLO".split("").map((char, idx) => (
                      <div
                        key={idx}
                        className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center font-bold"
                      >
                        {char}
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>Length:</strong> 5
                      </div>
                      <div>
                        <strong>Reversed:</strong> OLLEH
                      </div>
                      <div>
                        <strong>Lowercase:</strong> hello
                      </div>
                      <div>
                        <strong>Palindrome:</strong> false
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              {`// String Operations
const str = "Hello World";

// Access character - O(1)
console.log(str[0]); // 'H'

// Length
console.log(str.length); // 11

// Common methods
str.toLowerCase();
str.toUpperCase();
str.trim();
str.split(' ');
str.substring(0, 5);
str.indexOf('World');
str.includes('Hello');

// Reverse string
function reverseString(s) {
  return s.split('').reverse().join('');
}

// Check palindrome
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`}
            </CodeBlock>
          </Section>

          <Section id="linked-list" title="Linked Lists">
            <p className="text-gray-700 mb-4">
              Nodes connected by pointers. Better insertion/deletion than
              arrays.
            </p>
            <CodeBlock
              id="linked-list"
              result={
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-2 justify-center overflow-x-auto">
                    {[
                      { val: 1, next: true },
                      { val: 2, next: true },
                      { val: 3, next: true },
                      { val: 4, next: false },
                    ].map((node, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center">
                          <div className="bg-purple-500 text-white rounded-lg p-3 min-w-[60px] text-center">
                            <div className="text-xs text-purple-200">data</div>
                            <div className="font-bold text-lg">{node.val}</div>
                          </div>
                        </div>
                        {node.next && (
                          <div className="text-purple-500 text-2xl">→</div>
                        )}
                      </React.Fragment>
                    ))}
                    <div className="text-gray-400 text-xl">∅</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-300 rounded-lg p-3 text-sm text-purple-800">
                    <strong>Operations:</strong> Insert O(1), Delete O(1),
                    Search O(n), Access O(n)
                  </div>
                </div>
              }
            >
              {`// Linked List Node
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // Insert at beginning - O(1)
  insertAtHead(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  // Insert at end - O(n)
  insertAtTail(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  // Delete node - O(n)
  delete(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    while (current.next && current.next.data !== data) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
    }
  }
}`}
            </CodeBlock>
          </Section>

          <Section id="stacks" title="Stacks">
            <p className="text-gray-700 mb-4">
              LIFO (Last In First Out) structure. Push and pop from the same
              end.
            </p>
            <CodeBlock
              id="stacks"
              result={
                <div className="w-full space-y-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-sm text-gray-600 mb-2">
                      ↓ Push / Pop ↑
                    </div>
                    {[30, 20, 10].map((val, idx) => (
                      <div
                        key={idx}
                        className="w-32 h-12 bg-orange-500 text-white rounded-lg flex items-center justify-center font-bold text-lg border-2 border-orange-600"
                      >
                        {val}
                      </div>
                    ))}
                    <div className="w-32 h-2 bg-gray-300 rounded"></div>
                  </div>
                  <div className="bg-orange-50 border border-orange-300 rounded-lg p-3 text-sm text-orange-800">
                    <strong>Use Cases:</strong> Undo/Redo, Browser history,
                    Expression evaluation
                  </div>
                </div>
              }
            >
              {`// Stack Implementation
class Stack {
  constructor() {
    this.items = [];
  }

  // Push - O(1)
  push(element) {
    this.items.push(element);
  }

  // Pop - O(1)
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  // Peek - O(1)
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// Example: Valid Parentheses
function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  
  for (let char of s) {
    if (pairs[char]) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (pairs[top] !== char) return false;
    }
  }
  return stack.length === 0;
}`}
            </CodeBlock>
          </Section>

          <Section id="queues" title="Queues">
            <p className="text-gray-700 mb-4">
              FIFO (First In First Out) structure. Enqueue at rear, dequeue from
              front.
            </p>
            <CodeBlock
              id="queues"
              result={
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-sm text-gray-600">Dequeue →</div>
                    <div className="flex gap-2">
                      {[10, 20, 30, 40].map((val, idx) => (
                        <div
                          key={idx}
                          className="w-16 h-16 bg-teal-500 text-white rounded-lg flex items-center justify-center font-bold text-lg"
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">← Enqueue</div>
                  </div>
                  <div className="bg-teal-50 border border-teal-300 rounded-lg p-3 text-sm text-teal-800">
                    <strong>Use Cases:</strong> Task scheduling, BFS, Print
                    queue, Message queues
                  </div>
                </div>
              }
            >
              {`// Queue Implementation
class Queue {
  constructor() {
    this.items = [];
  }

  // Enqueue - O(1)
  enqueue(element) {
    this.items.push(element);
  }

  // Dequeue - O(n) for array, O(1) for linked list
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  // Peek front - O(1)
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

// Circular Queue
class CircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.size = k;
    this.front = -1;
    this.rear = -1;
  }

  enqueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.front = 0;
    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = value;
    return true;
  }
}`}
            </CodeBlock>
          </Section>

          <Section id="hash-tables" title="Hash Tables">
            <p className="text-gray-700 mb-4">
              Key-value pairs with O(1) average lookup time. Uses hash function.
            </p>
            <CodeBlock
              id="hash-tables"
              result={
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: "name", value: "John", hash: 0 },
                      { key: "age", value: "25", hash: 1 },
                      { key: "city", value: "NYC", hash: 2 },
                      { key: "role", value: "Dev", hash: 3 },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-indigo-50 border-2 border-indigo-300 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-indigo-600 font-mono">
                            [{item.hash}]
                          </span>
                          <span className="text-xs text-gray-500">hash</span>
                        </div>
                        <div className="mt-2 font-semibold text-indigo-900">
                          {item.key}: {item.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-indigo-50 border border-indigo-300 rounded-lg p-3 text-sm text-indigo-800">
                    <strong>Operations:</strong> Insert O(1), Delete O(1),
                    Search O(1) average
                  </div>
                </div>
              }
            >
              {`// Hash Table using JavaScript Object/Map
const hashTable = new Map();

// Insert - O(1)
hashTable.set('name', 'John');
hashTable.set('age', 25);

// Get - O(1)
console.log(hashTable.get('name')); // 'John'

// Delete - O(1)
hashTable.delete('age');

// Check existence - O(1)
console.log(hashTable.has('name')); // true

// Example: Two Sum
function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}

// Example: First Non-Repeating Character
function firstUniqChar(s) {
  const freq = new Map();
  for (let char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }
  return -1;
}`}
            </CodeBlock>
          </Section>

          <Section id="trees" title="Trees">
            <p className="text-gray-700 mb-4">
              Hierarchical structure with root and children nodes.
            </p>
            <CodeBlock
              id="trees"
              result={
                <div className="w-full space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div className="h-6 w-0.5 bg-gray-300"></div>
                    <div className="flex gap-8">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div className="h-4 w-0.5 bg-gray-300"></div>
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            4
                          </div>
                          <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            5
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                        <div className="h-4 w-0.5 bg-gray-300"></div>
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            6
                          </div>
                          <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            7
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-800">
                    <strong>Terms:</strong> Root (1), Parent (1,2,3), Children
                    (2,3,4,5,6,7), Leaf (4,5,6,7)
                  </div>
                </div>
              }
            >
              {`// Tree Node
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

// Tree Traversals
function inorder(root, result = []) {
  if (!root) return result;
  inorder(root.left, result);
  result.push(root.val);
  inorder(root.right, result);
  return result; // Left, Root, Right
}

function preorder(root, result = []) {
  if (!root) return result;
  result.push(root.val);
  preorder(root.left, result);
  preorder(root.right, result);
  return result; // Root, Left, Right
}

function postorder(root, result = []) {
  if (!root) return result;
  postorder(root.left, result);
  postorder(root.right, result);
  result.push(root.val);
  return result; // Left, Right, Root
}

// Tree Height
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`}
            </CodeBlock>
          </Section>

          <Section id="bst" title="Binary Search Trees">
            <p className="text-gray-700 mb-4">
              Binary tree where left subtree has smaller values, right subtree
              has larger values.
            </p>
            <CodeBlock
              id="bst"
              result={
                <div className="w-full space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      8
                    </div>
                    <div className="h-6 w-0.5 bg-gray-300"></div>
                    <div className="flex gap-12">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                        <div className="h-4 w-0.5 bg-gray-300"></div>
                        <div className="flex gap-6">
                          <div className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            1
                          </div>
                          <div className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            6
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          10
                        </div>
                        <div className="h-4 w-0.5 bg-gray-300"></div>
                        <div className="flex gap-6">
                          <div className="w-10 h-10 bg-transparent"></div>
                          <div className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            14
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-300 rounded-lg p-3 text-sm text-blue-800">
                    <strong>Property:</strong> Left &lt; Root &lt; Right |{" "}
                    <strong>Search:</strong> O(log n) balanced, O(n) worst
                  </div>
                </div>
              }
            >
              {`// BST Operations
class BST {
  constructor() {
    this.root = null;
  }

  // Insert - O(log n) average
  insert(val) {
    const newNode = new TreeNode(val);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  // Search - O(log n) average
  search(val) {
    let current = this.root;
    while (current) {
      if (val === current.val) return true;
      if (val < current.val) current = current.left;
      else current = current.right;
    }
    return false;
  }

  // Validate BST
  isValidBST(root, min = -Infinity, max = Infinity) {
    if (!root) return true;
    if (root.val <= min || root.val >= max) return false;
    return this.isValidBST(root.left, min, root.val) &&
           this.isValidBST(root.right, root.val, max);
  }
}`}
            </CodeBlock>
          </Section>

          <Section id="heaps" title="Heaps">
            <p className="text-gray-700 mb-4">
              Complete binary tree where parent is greater (max heap) or smaller
              (min heap) than children.
            </p>
            <CodeBlock
              id="heaps"
              result={
                <div className="w-full space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="text-sm text-gray-600 mb-2">Max Heap</div>
                    <div className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-xl">
                      50
                    </div>
                    <div className="h-6 w-0.5 bg-gray-300"></div>
                    <div className="flex gap-12">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                          30
                        </div>
                        <div className="h-4 w-0.5 bg-gray-300"></div>
                        <div className="flex gap-4">
                          <div className="w-10 h-10 bg-red-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            10
                          </div>
                          <div className="w-10 h-10 bg-red-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            20
                          </div>
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">
                        40
                      </div>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-sm text-red-800">
                    <strong>Use Cases:</strong> Priority Queue, Heap Sort, Find
                    Kth largest/smallest
                  </div>
                </div>
              }
            >
              {`// Min Heap Implementation
class MinHeap {
  constructor() {
    this.heap = [];
  }

  parent(i) { return Math.floor((i - 1) / 2); }
  left(i) { return 2 * i + 1; }
  right(i) { return 2 * i + 2; }

  // Insert - O(log n)
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  bubbleUp(i) {
    while (i > 0 && this.heap[this.parent(i)] > this.heap[i]) {
      [this.heap[i], this.heap[this.parent(i)]] = 
        [this.heap[this.parent(i)], this.heap[i]];
      i = this.parent(i);
    }
  }

  // Extract Min - O(log n)
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleDown(i) {
    let minIndex = i;
    const l = this.left(i);
    const r = this.right(i);
    
    if (l < this.heap.length && this.heap[l] < this.heap[minIndex]) {
      minIndex = l;
    }
    if (r < this.heap.length && this.heap[r] < this.heap[minIndex]) {
      minIndex = r;
    }
    if (i !== minIndex) {
      [this.heap[i], this.heap[minIndex]] = [this.heap[minIndex], this.heap[i]];
      this.bubbleDown(minIndex);
    }
  }

  peek() {
    return this.heap[0];
  }
}`}
            </CodeBlock>
          </Section>

          <Section id="graphs" title="Graphs">
            <p className="text-gray-700 mb-4">
              Nodes (vertices) connected by edges. Can be directed or
              undirected.
            </p>
            <CodeBlock
              id="graphs"
              result={
                <div className="w-full space-y-4">
                  <div className="flex justify-center items-center h-48 relative">
                    <svg width="300" height="200" className="absolute">
                      <line
                        x1="60"
                        y1="60"
                        x2="120"
                        y2="100"
                        stroke="#9333ea"
                        strokeWidth="2"
                      />
                      <line
                        x1="60"
                        y1="60"
                        x2="120"
                        y2="20"
                        stroke="#9333ea"
                        strokeWidth="2"
                      />
                      <line
                        x1="120"
                        y1="100"
                        x2="180"
                        y2="60"
                        stroke="#9333ea"
                        strokeWidth="2"
                      />
                      <line
                        x1="120"
                        y1="20"
                        x2="180"
                        y2="60"
                        stroke="#9333ea"
                        strokeWidth="2"
                      />
                      <line
                        x1="180"
                        y1="60"
                        x2="240"
                        y2="100"
                        stroke="#9333ea"
                        strokeWidth="2"
                      />
                    </svg>
                    <div
                      className="absolute"
                      style={{ left: "30px", top: "30px" }}
                    >
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        A
                      </div>
                    </div>
                    <div
                      className="absolute"
                      style={{ left: "90px", top: "70px" }}
                    >
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        B
                      </div>
                    </div>
                    <div
                      className="absolute"
                      style={{ left: "90px", top: "0" }}
                    >
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        C
                      </div>
                    </div>
                    <div
                      className="absolute"
                      style={{ left: "150px", top: "30px" }}
                    >
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        D
                      </div>
                    </div>
                    <div
                      className="absolute"
                      style={{ left: "210px", top: "70px" }}
                    >
                      <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                        E
                      </div>
                    </div>
                  </div>
                  <div className="bg-purple-50 border border-purple-300 rounded-lg p-3 text-sm text-purple-800">
                    <strong>Representations:</strong> Adjacency List (space
                    efficient), Adjacency Matrix (fast lookup)
                  </div>
                </div>
              }
            >
              {`// Graph using Adjacency List
class Graph {
  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(v1, v2) {
    this.adjacencyList.get(v1).push(v2);
    this.adjacencyList.get(v2).push(v1); // For undirected
  }

  removeEdge(v1, v2) {
    this.adjacencyList.set(
      v1,
      this.adjacencyList.get(v1).filter(v => v !== v2)
    );
    this.adjacencyList.set(
      v2,
      this.adjacencyList.get(v2).filter(v => v !== v1)
    );
  }

  removeVertex(vertex) {
    while (this.adjacencyList.get(vertex).length) {
      const adjacentVertex = this.adjacencyList.get(vertex).pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    this.adjacencyList.delete(vertex);
  }
}

// Example usage
const graph = new Graph();
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addEdge('A', 'B');
graph.addEdge('B', 'C');`}
            </CodeBlock>
          </Section>

          <Section id="sorting" title="Sorting Algorithms">
            <p className="text-gray-700 mb-4">
              Algorithms to arrange elements in order.
            </p>
            <CodeBlock
              id="sorting"
              result={
                <div className="w-full space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">
                        Unsorted:
                      </div>
                      <div className="flex gap-2">
                        {[64, 34, 25, 12, 22, 11, 90].map((val, idx) => (
                          <div
                            key={idx}
                            className="w-12 bg-gray-300 rounded-t"
                            style={{ height: `${val}px` }}
                          >
                            <div className="text-xs text-center mt-1">
                              {val}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-green-600 mb-1 font-semibold">
                        Sorted:
                      </div>
                      <div className="flex gap-2">
                        {[11, 12, 22, 25, 34, 64, 90].map((val, idx) => (
                          <div
                            key={idx}
                            className="w-12 bg-green-400 rounded-t"
                            style={{ height: `${val}px` }}
                          >
                            <div className="text-xs text-center mt-1">
                              {val}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-blue-50 p-2 rounded border border-blue-300">
                      <strong>Bubble:</strong> O(n²)
                    </div>
                    <div className="bg-green-50 p-2 rounded border border-green-300">
                      <strong>Merge:</strong> O(n log n)
                    </div>
                    <div className="bg-purple-50 p-2 rounded border border-purple-300">
                      <strong>Quick:</strong> O(n log n) avg
                    </div>
                  </div>
                </div>
              }
            >
              {`// Bubble Sort - O(n²)
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Merge Sort - O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

// Quick Sort - O(n log n) average
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x < pivot && i < arr.length - 1);
  const right = arr.filter((x, i) => x >= pivot && i < arr.length - 1);
  return [...quickSort(left), pivot, ...quickSort(right)];
}`}
            </CodeBlock>
          </Section>

          <Section id="searching" title="Searching Algorithms">
            <p className="text-gray-700 mb-4">
              Algorithms to find elements in data structures.
            </p>
            <CodeBlock
              id="searching"
              result={
                <div className="w-full space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-gray-600 mb-2">
                        Binary Search (Target: 25)
                      </div>
                      <div className="flex gap-2">
                        {[11, 12, 22, 25, 34, 64, 90].map((val, idx) => (
                          <div
                            key={idx}
                            className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                              val === 25
                                ? "bg-green-500 text-white ring-4 ring-green-300"
                                : idx === 3
                                  ? "bg-yellow-300"
                                  : "bg-gray-200"
                            }`}
                          >
                            {val}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-sm text-yellow-800">
                    <strong>Binary Search:</strong> O(log n) - Array must be
                    sorted!
                  </div>
                </div>
              }
            >
              {`// Linear Search - O(n)
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// Binary Search - O(log n)
// Array must be sorted!
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}

// Binary Search (Recursive)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  }
  return binarySearchRecursive(arr, target, left, mid - 1);
}`}
            </CodeBlock>
          </Section>

          <Section id="recursion" title="Recursion">
            <p className="text-gray-700 mb-4">
              Function that calls itself. Must have a base case to stop.
            </p>
            <CodeBlock
              id="recursion"
              result={
                <div className="w-full space-y-4">
                  <div className="bg-gradient-to-b from-blue-500 to-blue-700 text-white p-4 rounded-lg">
                    <div className="text-center mb-3 font-bold">
                      Factorial(4)
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="bg-blue-600 p-2 rounded">
                        4 × factorial(3)
                      </div>
                      <div className="bg-blue-600 p-2 rounded ml-4">
                        3 × factorial(2)
                      </div>
                      <div className="bg-blue-600 p-2 rounded ml-8">
                        2 × factorial(1)
                      </div>
                      <div className="bg-green-600 p-2 rounded ml-12">
                        1 (base case)
                      </div>
                      <div className="text-center text-lg font-bold mt-3">
                        = 24
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              {`// Factorial
function factorial(n) {
  // Base case
  if (n <= 1) return 1;
  // Recursive case
  return n * factorial(n - 1);
}

// Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Fibonacci with Memoization (Better)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Sum of Array
function sumArray(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumArray(arr.slice(1));
}

// Reverse String
function reverseString(str) {
  if (str === "") return "";
  return reverseString(str.substr(1)) + str[0];
}

// Power
function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}`}
            </CodeBlock>
          </Section>

          <Section id="dynamic-programming" title="Dynamic Programming">
            <p className="text-gray-700 mb-4">
              Optimization technique: solve subproblems once and store results.
            </p>
            <CodeBlock
              id="dynamic-programming"
              result={
                <div className="w-full space-y-4">
                  <div className="grid grid-cols-5 gap-2">
                    {[1, 1, 2, 3, 5].map((val, idx) => (
                      <div
                        key={idx}
                        className="bg-purple-500 text-white rounded-lg p-3 text-center"
                      >
                        <div className="text-xs">F({idx})</div>
                        <div className="font-bold text-lg">{val}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-purple-50 border border-purple-300 rounded-lg p-3 text-sm text-purple-800">
                    <strong>Key:</strong> Memoization (top-down) or Tabulation
                    (bottom-up)
                  </div>
                </div>
              }
            >
              {`// Fibonacci with DP (Tabulation) - O(n)
function fibDP(n) {
  if (n <= 1) return n;
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Climbing Stairs
// You can climb 1 or 2 steps. How many ways to reach n?
function climbStairs(n) {
  if (n <= 2) return n;
  const dp = [0, 1, 2];
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

// Coin Change
// Minimum coins to make amount
function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Longest Common Subsequence
function lcs(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`}
            </CodeBlock>
          </Section>

          <Section id="greedy" title="Greedy Algorithms">
            <p className="text-gray-700 mb-4">
              Make locally optimal choice at each step, hoping for global
              optimum.
            </p>
            <CodeBlock
              id="greedy"
              result={
                <div className="w-full space-y-4">
                  <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                    <div className="text-sm font-semibold text-green-900 mb-2">
                      Activity Selection Problem
                    </div>
                    <div className="space-y-2">
                      {[
                        { name: "A1", start: 1, end: 3, selected: true },
                        { name: "A2", start: 2, end: 5, selected: false },
                        { name: "A3", start: 4, end: 7, selected: true },
                        { name: "A4", start: 6, end: 9, selected: false },
                        { name: "A5", start: 8, end: 10, selected: true },
                      ].map((activity, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 p-2 rounded ${
                            activity.selected
                              ? "bg-green-200 font-semibold"
                              : "bg-gray-100"
                          }`}
                        >
                          <span className="w-8">{activity.name}</span>
                          <div className="flex-1 h-6 bg-white rounded relative">
                            <div
                              className={`absolute h-full rounded ${activity.selected ? "bg-green-500" : "bg-gray-300"}`}
                              style={{
                                left: `${activity.start * 10}%`,
                                width: `${(activity.end - activity.start) * 10}%`,
                              }}
                            ></div>
                          </div>
                          <span className="text-xs">
                            {activity.start}-{activity.end}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              }
            >
              {`// Activity Selection
// Select maximum number of non-overlapping activities
function activitySelection(start, end) {
  const n = start.length;
  const activities = [];
  
  for (let i = 0; i < n; i++) {
    activities.push({ start: start[i], end: end[i], index: i });
  }
  
  // Sort by end time
  activities.sort((a, b) => a.end - b.end);
  
  const selected = [activities[0]];
  let lastEnd = activities[0].end;
  
  for (let i = 1; i < n; i++) {
    if (activities[i].start >= lastEnd) {
      selected.push(activities[i]);
      lastEnd = activities[i].end;
    }
  }
  return selected;
}

// Fractional Knapsack
function fractionalKnapsack(values, weights, capacity) {
  const items = values.map((v, i) => ({
    value: v,
    weight: weights[i],
    ratio: v / weights[i]
  }));
  
  // Sort by value/weight ratio
  items.sort((a, b) => b.ratio - a.ratio);
  
  let totalValue = 0;
  let remainingCapacity = capacity;
  
  for (let item of items) {
    if (remainingCapacity >= item.weight) {
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      totalValue += item.ratio * remainingCapacity;
      break;
    }
  }
  return totalValue;
}

// Coin Change (Greedy - doesn't always work)
function coinChangeGreedy(coins, amount) {
  coins.sort((a, b) => b - a);
  let count = 0;
  
  for (let coin of coins) {
    while (amount >= coin) {
      amount -= coin;
      count++;
    }
  }
  return amount === 0 ? count : -1;
}`}
            </CodeBlock>
          </Section>

          <Section id="backtracking" title="Backtracking">
            <p className="text-gray-700 mb-4">
              Try all possibilities, backtrack when you hit a dead end.
            </p>
            <CodeBlock
              id="backtracking"
              result={
                <div className="w-full space-y-4">
                  <div className="bg-orange-50 border-2 border-orange-300 rounded-lg p-4">
                    <div className="text-sm font-semibold text-orange-900 mb-3">
                      N-Queens (4×4)
                    </div>
                    <div className="grid grid-cols-4 gap-1 w-fit mx-auto">
                      {[
                        [0, 1, 0, 0],
                        [0, 0, 0, 1],
                        [1, 0, 0, 0],
                        [0, 0, 1, 0],
                      ]
                        .flat()
                        .map((cell, idx) => (
                          <div
                            key={idx}
                            className={`w-12 h-12 flex items-center justify-center font-bold text-xl ${
                              (Math.floor(idx / 4) + (idx % 4)) % 2 === 0
                                ? "bg-orange-200"
                                : "bg-white"
                            }`}
                          >
                            {cell === 1 ? "♛" : ""}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              }
            >
              {`// N-Queens Problem
function solveNQueens(n) {
  const result = [];
  const board = Array(n).fill(0).map(() => Array(n).fill('.'));
  
  function isSafe(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    
    // Check diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    
    // Check anti-diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    
    return true;
  }
  
  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isSafe(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.'; // Backtrack
      }
    }
  }
  
  backtrack(0);
  return result;
}

// Generate Parentheses
function generateParentheses(n) {
  const result = [];
  
  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    
    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }
  
  backtrack('', 0, 0);
  return result;
}`}
            </CodeBlock>
          </Section>

          <Section id="two-pointers" title="Two Pointers">
            <p className="text-gray-700 mb-4">
              Use two pointers to traverse array/string from different
              positions.
            </p>
            <CodeBlock
              id="two-pointers"
              result={
                <div className="w-full space-y-4">
                  <div className="flex gap-2 justify-center items-center">
                    {[1, 2, 3, 4, 5, 6, 7].map((val, idx) => (
                      <div
                        key={idx}
                        className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                          idx === 0
                            ? "bg-blue-500 text-white ring-4 ring-blue-300"
                            : idx === 6
                              ? "bg-red-500 text-white ring-4 ring-red-300"
                              : "bg-gray-200"
                        }`}
                      >
                        {val}
                        {idx === 0 && (
                          <div className="absolute -bottom-6 text-xs text-blue-600">
                            Left
                          </div>
                        )}
                        {idx === 6 && (
                          <div className="absolute -bottom-6 text-xs text-red-600">
                            Right
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-300 rounded-lg p-3 text-sm text-blue-800">
                    <strong>Pattern:</strong> Move pointers based on conditions
                  </div>
                </div>
              }
            >
              {`// Two Sum (Sorted Array) - O(n)
function twoSum(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [left, right];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  return [];
}

// Remove Duplicates from Sorted Array
function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let i = 0;
  
  for (let j = 1; j < nums.length; j++) {
    if (nums[j] !== nums[i]) {
      i++;
      nums[i] = nums[j];
    }
  }
  return i + 1;
}

// Container With Most Water
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    maxArea = Math.max(maxArea, area);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  return maxArea;
}

// Valid Palindrome
function isPalindrome(s) {
  const cleaned = s.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}`}
            </CodeBlock>
          </Section>

          <Section id="sliding-window" title="Sliding Window">
            <p className="text-gray-700 mb-4">
              Maintain a window that slides through the array/string.
            </p>
            <CodeBlock
              id="sliding-window"
              result={
                <div className="w-full space-y-4">
                  <div className="space-y-2">
                    <div className="flex gap-2 justify-center">
                      {[2, 1, 5, 1, 3, 2].map((val, idx) => (
                        <div
                          key={idx}
                          className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold ${
                            idx >= 0 && idx <= 2
                              ? "bg-green-500 text-white"
                              : "bg-gray-200"
                          }`}
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                    <div className="text-center text-sm text-gray-600">
                      Window size k=3, Sum=8
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-800">
                    <strong>Pattern:</strong> Expand window, then contract when
                    condition met
                  </div>
                </div>
              }
            >
              {`// Maximum Sum Subarray of Size K
function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  
  // First window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}

// Longest Substring Without Repeating Characters
function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
}

// Minimum Window Substring
function minWindow(s, t) {
  const need = new Map();
  const window = new Map();
  
  for (let char of t) {
    need.set(char, (need.get(char) || 0) + 1);
  }
  
  let left = 0, right = 0;
  let valid = 0;
  let start = 0, minLen = Infinity;
  
  while (right < s.length) {
    const char = s[right];
    right++;
    
    if (need.has(char)) {
      window.set(char, (window.get(char) || 0) + 1);
      if (window.get(char) === need.get(char)) {
        valid++;
      }
    }
    
    while (valid === need.size) {
      if (right - left < minLen) {
        start = left;
        minLen = right - left;
      }
      
      const leftChar = s[left];
      left++;
      
      if (need.has(leftChar)) {
        if (window.get(leftChar) === need.get(leftChar)) {
          valid--;
        }
        window.set(leftChar, window.get(leftChar) - 1);
      }
    }
  }
  return minLen === Infinity ? "" : s.substr(start, minLen);
}`}
            </CodeBlock>
          </Section>

          <Section id="binary-search-algo" title="Binary Search Pattern">
            <p className="text-gray-700 mb-4">
              Apply binary search to various problems beyond sorted arrays.
            </p>
            <CodeBlock
              id="binary-search-algo"
              result={
                <div className="w-full space-y-4">
                  <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                    <div className="text-sm font-semibold text-yellow-900 mb-2">
                      Search in Rotated Array
                    </div>
                    <div className="flex gap-2 justify-center mb-2">
                      {[4, 5, 6, 7, 0, 1, 2].map((val, idx) => (
                        <div
                          key={idx}
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${
                            val === 0
                              ? "bg-yellow-500 text-white"
                              : "bg-yellow-200"
                          }`}
                        >
                          {val}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-center text-yellow-700">
                      Target: 0, Found at index 4
                    </div>
                  </div>
                </div>
              }
            >
              {`// Search in Rotated Sorted Array
function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (nums[mid] === target) return mid;
    
    // Left half is sorted
    if (nums[left] <= nums[mid]) {
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } 
    // Right half is sorted
    else {
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}

// Find Peak Element
function findPeakElement(nums) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

// Find Minimum in Rotated Sorted Array
function findMin(nums) {
  let left = 0;
  let right = nums.length - 1;
  
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}`}
            </CodeBlock>
          </Section>

          <Section id="dfs" title="Depth First Search (DFS)">
            <p className="text-gray-700 mb-4">
              Explore as far as possible along each branch before backtracking.
            </p>
            <CodeBlock
              id="dfs"
              result={
                <div className="w-full space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="text-sm text-gray-600 mb-3">
                      DFS Order: 1 → 2 → 4 → 5 → 3 → 6 → 7
                    </div>
                    <div className="relative h-48">
                      <svg width="240" height="180" className="absolute">
                        <path
                          d="M 120 20 L 80 80"
                          stroke="#10b981"
                          strokeWidth="3"
                          fill="none"
                          markerEnd="url(#arrowgreen)"
                        />
                        <path
                          d="M 120 20 L 160 80"
                          stroke="#d1d5db"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M 80 80 L 50 140"
                          stroke="#10b981"
                          strokeWidth="3"
                          fill="none"
                          markerEnd="url(#arrowgreen)"
                        />
                        <path
                          d="M 80 80 L 110 140"
                          stroke="#10b981"
                          strokeWidth="3"
                          fill="none"
                          markerEnd="url(#arrowgreen)"
                        />
                        <path
                          d="M 160 80 L 140 140"
                          stroke="#d1d5db"
                          strokeWidth="2"
                          fill="none"
                        />
                        <path
                          d="M 160 80 L 180 140"
                          stroke="#d1d5db"
                          strokeWidth="2"
                          fill="none"
                        />
                        <defs>
                          <marker
                            id="arrowgreen"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="3"
                            orient="auto"
                            markerUnits="strokeWidth"
                          >
                            <path d="M0,0 L0,6 L9,3 z" fill="#10b981" />
                          </marker>
                        </defs>
                      </svg>
                      <div
                        className="absolute w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold"
                        style={{ left: "95px", top: "0" }}
                      >
                        1
                      </div>
                      <div
                        className="absolute w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold"
                        style={{ left: "55px", top: "60px" }}
                      >
                        2
                      </div>
                      <div
                        className="absolute w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold"
                        style={{ left: "135px", top: "60px" }}
                      >
                        3
                      </div>
                      <div
                        className="absolute w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center font-bold"
                        style={{ left: "25px", top: "120px" }}
                      >
                        4
                      </div>
                      <div
                        className="absolute w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center font-bold"
                        style={{ left: "85px", top: "120px" }}
                      >
                        5
                      </div>
                      <div
                        className="absolute w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold"
                        style={{ left: "115px", top: "120px" }}
                      >
                        6
                      </div>
                      <div
                        className="absolute w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-bold"
                        style={{ left: "155px", top: "120px" }}
                      >
                        7
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              {`// DFS on Graph (Recursive)
function dfs(graph, node, visited = new Set()) {
  visited.add(node);
  console.log(node);
  
  for (let neighbor of graph[node]) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
}

// DFS on Tree (Recursive)
function dfsTree(root) {
  if (!root) return;
  console.log(root.val); // Process node
  dfsTree(root.left);
  dfsTree(root.right);
}

// DFS Iterative (Using Stack)
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  
  while (stack.length > 0) {
    const node = stack.pop();
    
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
      
      for (let neighbor of graph[node]) {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }
}

// Number of Islands (DFS Application)
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  let count = 0;
  
  function dfs(i, j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === '0') {
      return;
    }
    grid[i][j] = '0'; // Mark as visited
    dfs(i + 1, j);
    dfs(i - 1, j);
    dfs(i, j + 1);
    dfs(i, j - 1);
  }
  
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        count++;
        dfs(i, j);
      }
    }
  }
  return count;
}`}
            </CodeBlock>
          </Section>

          <Section id="bfs" title="Breadth First Search (BFS)">
            <p className="text-gray-700 mb-4">
              Explore all neighbors at current depth before moving to next
              level.
            </p>
            <CodeBlock
              id="bfs"
              result={
                <div className="w-full space-y-4">
                  <div className="flex flex-col items-center">
                    <div className="text-sm text-gray-600 mb-3">
                      BFS Level Order: 1 → 2,3 → 4,5,6,7
                    </div>
                    <div className="space-y-6">
                      <div className="flex justify-center">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          1
                        </div>
                      </div>
                      <div className="flex gap-12 justify-center">
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          2
                        </div>
                        <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                          3
                        </div>
                      </div>
                      <div className="flex gap-6 justify-center">
                        <div className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          4
                        </div>
                        <div className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          5
                        </div>
                        <div className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          6
                        </div>
                        <div className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          7
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
            >
              {`// BFS on Graph
function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    console.log(node);
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}

// BFS on Tree (Level Order)
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}

// Shortest Path in Unweighted Graph
function shortestPath(graph, start, end) {
  const queue = [[start, 0]];
  const visited = new Set([start]);
  
  while (queue.length > 0) {
    const [node, distance] = queue.shift();
    
    if (node === end) return distance;
    
    for (let neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, distance + 1]);
      }
    }
  }
  return -1;
}

// Rotten Oranges
function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let fresh = 0;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 2) queue.push([i, j, 0]);
      if (grid[i][j] === 1) fresh++;
    }
  }
  
  const directions = [[0,1], [1,0], [0,-1], [-1,0]];
  let minutes = 0;
  
  while (queue.length > 0) {
    const [row, col, time] = queue.shift();
    minutes = Math.max(minutes, time);
    
    for (let [dr, dc] of directions) {
      const newRow = row + dr;
      const newCol = col + dc;
      
      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol] === 1) {
        grid[newRow][newCol] = 2;
        fresh--;
        queue.push([newRow, newCol, time + 1]);
      }
    }
  }
  return fresh === 0 ? minutes : -1;
}`}
            </CodeBlock>
          </Section>

          <Section id="project-problems" title="Practice Problems">
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-300 rounded-xl p-6">
                <h3 className="text-xl font-bold text-purple-900 mb-4">
                  Essential LeetCode Problems
                </h3>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">
                      Easy (Master These First)
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Two Sum</li>
                      <li>• Valid Parentheses</li>
                      <li>• Merge Two Sorted Lists</li>
                      <li>• Best Time to Buy and Sell Stock</li>
                      <li>• Valid Palindrome</li>
                      <li>• Invert Binary Tree</li>
                      <li>• Maximum Depth of Binary Tree</li>
                      <li>• Contains Duplicate</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-orange-800 mb-2">
                      Medium (Core Interview Questions)
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Longest Substring Without Repeating Characters</li>
                      <li>• Add Two Numbers (Linked List)</li>
                      <li>• 3Sum</li>
                      <li>• Container With Most Water</li>
                      <li>• Group Anagrams</li>
                      <li>• Longest Palindromic Substring</li>
                      <li>• Product of Array Except Self</li>
                      <li>• Validate Binary Search Tree</li>
                      <li>• Binary Tree Level Order Traversal</li>
                      <li>• Clone Graph</li>
                      <li>• Course Schedule (Topological Sort)</li>
                      <li>• Number of Islands</li>
                      <li>• Coin Change</li>
                      <li>• House Robber</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-purple-200">
                    <h4 className="font-semibold text-red-800 mb-2">
                      Hard (Advanced Concepts)
                    </h4>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Median of Two Sorted Arrays</li>
                      <li>• Merge k Sorted Lists</li>
                      <li>• Trapping Rain Water</li>
                      <li>• Word Ladder</li>
                      <li>• Serialize and Deserialize Binary Tree</li>
                      <li>• Maximum Subarray Sum</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-3">
                  Problem-Solving Strategy
                </h4>
                <ol className="space-y-2 text-gray-700">
                  <li>
                    <strong>1. Understand:</strong> Read problem carefully,
                    clarify inputs/outputs
                  </li>
                  <li>
                    <strong>2. Examples:</strong> Work through 2-3 examples
                    manually
                  </li>
                  <li>
                    <strong>3. Approach:</strong> Think of brute force first,
                    then optimize
                  </li>
                  <li>
                    <strong>4. Pseudocode:</strong> Write steps before coding
                  </li>
                  <li>
                    <strong>5. Code:</strong> Implement with clean, readable
                    code
                  </li>
                  <li>
                    <strong>6. Test:</strong> Run through edge cases
                  </li>
                  <li>
                    <strong>7. Optimize:</strong> Improve time/space complexity
                    if needed
                  </li>
                </ol>
              </div>
            </div>
          </Section>

          <Section id="best" title="Best Practices">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-600">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Start Simple:</strong> Master arrays and strings
                    before advanced data structures
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Practice Daily:</strong> Solve 1-2 problems every
                    day consistently
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Understand Patterns:</strong> Recognize common
                    patterns (two pointers, sliding window, etc.)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Time Yourself:</strong> Practice with time limits to
                    simulate interviews
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Explain Out Loud:</strong> Practice explaining your
                    approach verbally
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Review Solutions:</strong> Study optimal solutions
                    even after solving
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>
                    <strong>Track Progress:</strong> Keep a list of solved
                    problems and revisit weak areas
                  </span>
                </li>
              </ul>
            </div>
          </Section>

          {/* QUIZ CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">
              Ready to test your DSA skills?
            </h2>
            <p className="text-purple-100 mb-6">
              Take the quiz and see how well you understand data structures and
              algorithms.
            </p>
            <button
              onClick={() => navigate("/dsa")}
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-purple-50 transition shadow-lg text-lg"
            >
              Start DSA Quiz
              <ArrowRight size={24} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DSALearn;
