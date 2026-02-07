import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Database, Code2, ArrowRight, Copy, Check, Flame } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FirebaseLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(
    () => [
      { id: "intro", title: "What is Firebase?" },
      { id: "setup", title: "Setup & Installation" },
      { id: "init", title: "Initialize Firebase" },
      { id: "auth-intro", title: "Authentication Basics" },
      { id: "auth-email", title: "Email/Password Auth" },
      { id: "auth-google", title: "Google Sign-In" },
      { id: "auth-state", title: "Auth State Management" },
      { id: "firestore-intro", title: "Firestore Database" },
      { id: "firestore-add", title: "Add Documents" },
      { id: "firestore-read", title: "Read Documents" },
      { id: "firestore-update", title: "Update Documents" },
      { id: "firestore-delete", title: "Delete Documents" },
      { id: "firestore-query", title: "Query Data" },
      { id: "firestore-realtime", title: "Real-time Listeners" },
      { id: "storage-intro", title: "Storage Basics" },
      { id: "storage-upload", title: "Upload Files" },
      { id: "storage-download", title: "Download Files" },
      { id: "storage-delete", title: "Delete Files" },
      { id: "hosting", title: "Firebase Hosting" },
      { id: "security", title: "Security Rules" },
      { id: "project-auth", title: "Mini Project: Auth System" },
      { id: "project-crud", title: "Mini Project: CRUD App" },
      { id: "best", title: "Best Practices" },
    ],
    []
  );

  const [activeId, setActiveId] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { threshold: [0.3, 0.5, 0.7], rootMargin: "-15% 0px -70% 0px" }
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
              Preview / Output
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
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

      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Flame size={48} />
          </div>
          <h1 className="text-5xl font-bold mb-4">Firebase Tutorial</h1>
          <p className="text-xl text-orange-100 mb-8">
            Master Firebase authentication, Firestore database, storage, and hosting.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => navigate("/firebase")}
              className="px-6 py-3 bg-white text-orange-600 rounded-xl font-semibold flex items-center gap-2 hover:bg-orange-50 transition shadow-lg"
            >
              Start Firebase Quiz
              <ArrowRight size={20} />
            </button>
            <button
              onClick={() => scrollTo("setup")}
              className="px-6 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition"
            >
              Jump to Setup
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
                      ? "bg-orange-600 text-white font-semibold"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 max-w-4xl">
          <Section id="intro" title="What is Firebase?">
            <div className="prose prose-lg mb-6">
              <ul className="space-y-2 text-gray-700">
                <li>Firebase is a Backend-as-a-Service (BaaS) platform by Google</li>
                <li>Provides authentication, database, storage, hosting, and more</li>
                <li>No server setup required - focus on building your app</li>
                <li>Real-time data synchronization across devices</li>
                <li>Built-in security with authentication and security rules</li>
              </ul>
            </div>
          </Section>

          <Section id="setup" title="Setup & Installation">
            <p className="text-gray-700 mb-4">
              First, install Firebase SDK in your React project:
            </p>
            <CodeBlock id="setup" language="bash">
{`npm install firebase`}
            </CodeBlock>
          </Section>

          <Section id="init" title="Initialize Firebase">
            <p className="text-gray-700 mb-4">
              Create a Firebase project at console.firebase.google.com, then initialize Firebase in your app:
            </p>
            <CodeBlock id="init" result={
              <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <Check size={20} className="text-green-600" />
                  <span className="font-semibold">Firebase Initialized</span>
                </div>
                <p className="text-sm">Config loaded and app ready to use</p>
              </div>
            }>
{`// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);`}
            </CodeBlock>
          </Section>

          <Section id="auth-intro" title="Authentication Basics">
            <p className="text-gray-700 mb-4">
              Firebase Authentication provides easy user sign-up and sign-in with multiple methods:
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-lg mb-4">
              <ul className="space-y-2 text-gray-700">
                <li>✓ Email/Password</li>
                <li>✓ Google, Facebook, Twitter, GitHub</li>
                <li>✓ Phone Number</li>
                <li>✓ Anonymous</li>
              </ul>
            </div>
          </Section>

          <Section id="auth-email" title="Email/Password Authentication">
            <p className="text-gray-700 mb-4">
              Sign up and sign in users with email and password:
            </p>
            <CodeBlock id="auth-email" result={
              <div className="w-full max-w-md space-y-4">
                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold">
                    Sign Up
                  </button>
                  <button className="flex-1 px-4 py-2 border-2 border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 transition font-semibold">
                    Sign In
                  </button>
                </div>
              </div>
            }>
{`import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

// Sign Up
const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created:', userCredential.user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Sign In
const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCredential.user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="auth-google" title="Google Sign-In">
            <p className="text-gray-700 mb-4">
              Enable Google sign-in for a seamless authentication experience:
            </p>
            <CodeBlock id="auth-google" result={
              <button className="px-6 py-3 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center gap-3 font-semibold text-gray-700 shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Sign in with Google
              </button>
            }>
{`import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from './firebase';

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log('User signed in:', result.user);
  } catch (error) {
    console.error('Error:', error.message);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="auth-state" title="Auth State Management">
            <p className="text-gray-700 mb-4">
              Listen to authentication state changes to update your UI:
            </p>
            <CodeBlock id="auth-state" result={
              <div className="w-full max-w-md bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    U
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">user@example.com</p>
                    <p className="text-sm text-gray-600">Logged In</p>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold">
                  Sign Out
                </button>
              </div>
            }>
{`import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <p>Please sign in</p>
      )}
    </div>
  );
}`}
            </CodeBlock>
          </Section>

          <Section id="firestore-intro" title="Firestore Database">
            <p className="text-gray-700 mb-4">
              Cloud Firestore is a NoSQL document database with real-time synchronization:
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li>✓ Documents stored in collections</li>
                <li>✓ Real-time listeners for live updates</li>
                <li>✓ Offline support built-in</li>
                <li>✓ Powerful querying and filtering</li>
              </ul>
            </div>
          </Section>

          <Section id="firestore-add" title="Add Documents">
            <p className="text-gray-700 mb-4">
              Add new documents to a Firestore collection:
            </p>
            <CodeBlock id="firestore-add" result={
              <div className="w-full max-w-md space-y-4">
                <input
                  type="text"
                  placeholder="Task name"
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
                <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2">
                  <span>+</span> Add Task
                </button>
                <div className="bg-green-50 border border-green-300 rounded-lg p-3 text-sm text-green-800">
                  ✓ Document added with auto-generated ID
                </div>
              </div>
            }>
{`import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const addTask = async (taskName) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      name: taskName,
      completed: false,
      createdAt: new Date()
    });
    console.log('Document added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="firestore-read" title="Read Documents">
            <p className="text-gray-700 mb-4">
              Fetch documents from Firestore:
            </p>
            <CodeBlock id="firestore-read" result={
              <div className="w-full max-w-md space-y-3">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Complete project</span>
                    <input type="checkbox" className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">ID: abc123</p>
                </div>
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-blue-300 transition">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Review code</span>
                    <input type="checkbox" className="w-5 h-5" checked readOnly />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">ID: def456</p>
                </div>
              </div>
            }>
{`import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const fetchTasks = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'tasks'));
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    console.log('Tasks:', tasks);
    return tasks;
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="firestore-update" title="Update Documents">
            <p className="text-gray-700 mb-4">
              Update existing documents in Firestore:
            </p>
            <CodeBlock id="firestore-update" result={
              <div className="w-full max-w-md bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-800">Buy groceries</span>
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition">
                    Mark Complete
                  </button>
                </div>
                <div className="bg-yellow-50 border border-yellow-300 rounded p-2 text-xs text-yellow-800">
                  → Click to update status to completed
                </div>
              </div>
            }>
{`import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

const updateTask = async (taskId) => {
  try {
    const taskRef = doc(db, 'tasks', taskId);
    await updateDoc(taskRef, {
      completed: true,
      updatedAt: new Date()
    });
    console.log('Document updated');
  } catch (error) {
    console.error('Error updating document:', error);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="firestore-delete" title="Delete Documents">
            <p className="text-gray-700 mb-4">
              Remove documents from Firestore:
            </p>
            <CodeBlock id="firestore-delete" result={
              <div className="w-full max-w-md bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800 line-through text-gray-400">Old task</span>
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition">
                    Delete
                  </button>
                </div>
                <div className="bg-red-50 border border-red-300 rounded p-2 text-xs text-red-800 mt-3">
                  ⚠️ This will permanently delete the document
                </div>
              </div>
            }>
{`import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, 'tasks', taskId));
    console.log('Document deleted');
  } catch (error) {
    console.error('Error deleting document:', error);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="firestore-query" title="Query Data">
            <p className="text-gray-700 mb-4">
              Filter and sort Firestore data with queries:
            </p>
            <CodeBlock id="firestore-query" result={
              <div className="w-full max-w-md space-y-3">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                  <p className="font-semibold text-sm text-blue-900">Query: Completed Tasks</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white border border-green-300 rounded p-3">
                    <span className="text-sm">✓ Task A (completed)</span>
                  </div>
                  <div className="bg-white border border-green-300 rounded p-3">
                    <span className="text-sm">✓ Task C (completed)</span>
                  </div>
                </div>
              </div>
            }>
{`import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const getCompletedTasks = async () => {
  try {
    const q = query(
      collection(db, 'tasks'),
      where('completed', '==', true),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const tasks = [];
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
    return tasks;
  } catch (error) {
    console.error('Error querying documents:', error);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="firestore-realtime" title="Real-time Listeners">
            <p className="text-gray-700 mb-4">
              Get live updates when data changes:
            </p>
            <CodeBlock id="firestore-realtime" result={
              <div className="w-full max-w-md">
                <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-purple-900">Live Updates Active</span>
                  </div>
                  <p className="text-sm text-purple-700">Listening for changes in real-time...</p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white border border-gray-200 rounded p-3 animate-pulse">
                    <span className="text-sm">New task appeared!</span>
                  </div>
                </div>
              </div>
            }>
{`import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { useEffect, useState } from 'react';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = [];
      snapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
    });

    return () => unsubscribe(); // Cleanup
  }, []);

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
}`}
            </CodeBlock>
          </Section>

          <Section id="storage-intro" title="Storage Basics">
            <p className="text-gray-700 mb-4">
              Firebase Storage allows you to store and serve user-generated content like images, videos, and files:
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-lg">
              <ul className="space-y-2 text-gray-700">
                <li>✓ Upload files directly from client</li>
                <li>✓ Automatic CDN distribution</li>
                <li>✓ Secure with Firebase Security Rules</li>
                <li>✓ Resume uploads and downloads</li>
              </ul>
            </div>
          </Section>

          <Section id="storage-upload" title="Upload Files">
            <p className="text-gray-700 mb-4">
              Upload files to Firebase Storage:
            </p>
            <CodeBlock id="storage-upload" result={
              <div className="w-full max-w-md space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition cursor-pointer">
                  <div className="text-4xl mb-2">📁</div>
                  <p className="text-gray-600 font-semibold">Click to upload file</p>
                  <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
                </div>
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Uploading: image.jpg</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">65%</span>
                  </div>
                </div>
              </div>
            }>
{`import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

const uploadFile = (file) => {
  const storageRef = ref(storage, 'images/' + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
    },
    (error) => {
      console.error('Upload error:', error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at:', downloadURL);
    }
  );
};`}
            </CodeBlock>
          </Section>

          <Section id="storage-download" title="Download Files">
            <p className="text-gray-700 mb-4">
              Get download URLs for stored files:
            </p>
            <CodeBlock id="storage-download" result={
              <div className="w-full max-w-md space-y-3">
                <div className="bg-white border-2 border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">profile.jpg</p>
                      <p className="text-xs text-gray-500">256 KB</p>
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            }>
{`import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

const downloadFile = async (fileName) => {
  try {
    const fileRef = ref(storage, 'images/' + fileName);
    const url = await getDownloadURL(fileRef);
    console.log('Download URL:', url);
    
    // Open in new tab or download
    window.open(url, '_blank');
  } catch (error) {
    console.error('Error getting download URL:', error);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="storage-delete" title="Delete Files">
            <p className="text-gray-700 mb-4">
              Remove files from Firebase Storage:
            </p>
            <CodeBlock id="storage-delete" result={
              <div className="w-full max-w-md bg-white border-2 border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded flex items-center justify-center text-2xl">
                      🗑️
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">old_file.pdf</p>
                      <p className="text-xs text-gray-500">Ready to delete</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm">
                    Delete
                  </button>
                </div>
              </div>
            }>
{`import { ref, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

const deleteFile = async (fileName) => {
  try {
    const fileRef = ref(storage, 'images/' + fileName);
    await deleteObject(fileRef);
    console.log('File deleted successfully');
  } catch (error) {
    console.error('Error deleting file:', error);
  }
};`}
            </CodeBlock>
          </Section>

          <Section id="hosting" title="Firebase Hosting">
            <p className="text-gray-700 mb-4">
              Deploy your web app to Firebase Hosting:
            </p>
            <CodeBlock id="hosting" language="bash">
{`# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Build your app
npm run build

# Deploy to Firebase
firebase deploy`}
            </CodeBlock>
          </Section>

          <Section id="security" title="Security Rules">
            <p className="text-gray-700 mb-4">
              Secure your data with Firestore Security Rules:
            </p>
            <CodeBlock id="security" language="rules" result={
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                <p className="font-semibold text-yellow-900 mb-2">🔒 Security Rules Active</p>
                <ul className="text-sm text-yellow-800 space-y-1">
                  <li>✓ Users can only read/write their own data</li>
                  <li>✓ Authentication required</li>
                  <li>✓ Prevents unauthorized access</li>
                </ul>
              </div>
            }>
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Anyone can read tasks, but only authenticated users can write
    match /tasks/{taskId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`}
            </CodeBlock>
          </Section>

          <Section id="project-auth" title="Mini Project: Complete Auth System">
            <p className="text-gray-700 mb-4">
              Build a complete authentication system with sign up, sign in, and user profile:
            </p>
            <CodeBlock id="project-auth" result={
              <div className="w-full max-w-md space-y-6">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl text-center">
                  <h3 className="text-2xl font-bold mb-2">Welcome Back!</h3>
                  <p className="text-orange-100">Sign in to continue</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-200">
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Email address"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
                    />
                    <button className="w-full py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition">
                      Sign In
                    </button>
                    
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>
                    
                    <button className="w-full py-3 bg-white border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </button>
                    
                    <p className="text-center text-sm text-gray-600">
                      Don't have an account? <span className="text-orange-600 font-semibold cursor-pointer hover:underline">Sign up</span>
                    </p>
                  </div>
                </div>
              </div>
            }>
{`import { useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth } from './firebase';

function AuthSystem() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign In</button>
          <button type="button" onClick={handleSignUp}>Sign Up</button>
          <button type="button" onClick={handleGoogleSignIn}>
            Sign in with Google
          </button>
        </form>
      )}
    </div>
  );
}`}
            </CodeBlock>
          </Section>

          <Section id="project-crud" title="Mini Project: CRUD Todo App">
            <p className="text-gray-700 mb-4">
              Build a complete Todo app with Create, Read, Update, and Delete operations:
            </p>
            <CodeBlock id="project-crud" result={
              <div className="w-full max-w-md space-y-4">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
                  <h3 className="text-2xl font-bold mb-1">My Tasks</h3>
                  <p className="text-blue-100">3 tasks remaining</p>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-gray-200">
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Add a new task..."
                      className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                    />
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                      Add
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <input type="checkbox" className="w-5 h-5" />
                      <span className="flex-1 text-gray-800">Complete Firebase tutorial</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <input type="checkbox" checked readOnly className="w-5 h-5" />
                      <span className="flex-1 text-gray-400 line-through">Build React app</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <input type="checkbox" className="w-5 h-5" />
                      <span className="flex-1 text-gray-800">Deploy to production</span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            }>
{`import { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  onSnapshot 
} from 'firebase/firestore';
import { db } from './firebase';

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'tasks'), (snapshot) => {
      const tasksData = [];
      snapshot.forEach((doc) => {
        tasksData.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksData);
    });
    return () => unsubscribe();
  }, []);

  // Add task
  const addTask = async () => {
    if (newTask.trim()) {
      await addDoc(collection(db, 'tasks'), {
        name: newTask,
        completed: false,
        createdAt: new Date()
      });
      setNewTask('');
    }
  };

  // Update task
  const toggleTask = async (id, completed) => {
    const taskRef = doc(db, 'tasks', id);
    await updateDoc(taskRef, { completed: !completed });
  };

  // Delete task
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  return (
    <div>
      <h1>My Tasks</h1>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add</button>

      {tasks.map(task => (
        <div key={task.id}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id, task.completed)}
          />
          <span>{task.name}</span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}`}
            </CodeBlock>
          </Section>

          <Section id="best" title="Best Practices">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-l-4 border-orange-600">
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Security Rules:</strong> Always set up proper security rules before deploying</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Error Handling:</strong> Wrap all Firebase calls in try-catch blocks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Listeners:</strong> Always unsubscribe from real-time listeners in cleanup</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Queries:</strong> Use indexes for complex queries (Firebase will suggest them)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>File Size:</strong> Compress images before uploading to Storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Environment:</strong> Use environment variables for Firebase config</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 font-bold">•</span>
                  <span><strong>Pagination:</strong> Implement pagination for large datasets to reduce reads</span>
                </li>
              </ul>
            </div>
          </Section>

          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-white text-center mt-16">
            <h2 className="text-3xl font-bold mb-4">Ready to test your Firebase skills?</h2>
            <p className="text-orange-100 mb-6">
              Take the interactive quiz to reinforce what you've learned!
            </p>
            <button
              onClick={() => navigate("/firebase")}
              className="px-8 py-4 bg-white text-orange-600 rounded-xl font-bold inline-flex items-center gap-2 hover:bg-orange-50 transition shadow-lg text-lg"
            >
              Start Firebase Quiz
              <ArrowRight size={24} />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FirebaseLearn;