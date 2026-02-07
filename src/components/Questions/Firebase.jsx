import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Flame, ArrowRight, Copy, Check, Info, AlertCircle, CheckCircle2, Terminal, Database, Lock, Cloud, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FirebaseLearn() {
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const sections = useMemo(() => [
    { id: "intro", title: "What is Firebase?" },
    { id: "setup", title: "Setup & Installation" },
    { id: "project", title: "Create Firebase Project" },
    { id: "config", title: "Initialize Firebase" },
    { id: "auth", title: "Authentication" },
    { id: "firestore", title: "Cloud Firestore" },
    { id: "realtime", title: "Realtime Database" },
    { id: "storage", title: "Cloud Storage" },
    { id: "hosting", title: "Firebase Hosting" },
    { id: "functions", title: "Cloud Functions" },
    { id: "fcm", title: "Cloud Messaging" },
    { id: "analytics", title: "Analytics" },
    { id: "security", title: "Security Rules" },
    { id: "emulators", title: "Local Emulators" },
    { id: "deployment", title: "Deployment" },
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
            <Terminal className="w-3.5 h-3.5" />
            {language}
          </span>
          <button onClick={() => copyToClipboard(children, blockId)} className="text-xs flex items-center gap-1 hover:text-orange-600 transition-colors">
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

  const Section = ({ id, title, children, icon: Icon = Flame }) => (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm scroll-mt-28"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </motion.section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-amber-50/50">
      <AnimatePresence>
        {copiedId && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-orange-600 text-white px-4 py-2 rounded-xl shadow-lg z-50"
          >
            Code copied!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-10 bg-gradient-to-r from-orange-50 to-amber-100 p-8 rounded-3xl border border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <Flame className="w-10 h-10 text-orange-600" />
            <h1 className="text-4xl font-extrabold text-gray-900">Firebase Complete Tutorial</h1>
          </div>
          <p className="text-lg text-slate-700 max-w-2xl">
            Master Firebase - Google's comprehensive app development platform. Learn authentication, databases, hosting, and more.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => navigate("/firebase")} 
              className="px-6 py-3 bg-orange-600 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-md"
            >
              Start Firebase Quiz <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scrollTo("setup")} 
              className="px-6 py-3 border border-orange-400 text-orange-700 rounded-xl font-semibold hover:bg-orange-50 transition-colors"
            >
              Jump to Setup
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10">
          {/* Sidebar */}
          <aside className="hidden lg:block lg:sticky lg:top-24 self-start">
            <div className="bg-white border border-orange-100 rounded-2xl p-4 shadow-sm w-[260px]">
              <h3 className="flex items-center gap-2 font-bold mb-3 text-orange-900">
                <BookOpen className="w-5 h-5 text-orange-600" /> Contents
              </h3>
              <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-1">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeId === s.id 
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white" 
                        : "hover:bg-orange-50 text-gray-700"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="space-y-6">
            <Section id="intro" title="What is Firebase?">
              <div className="space-y-4 text-slate-700">
                <p>
                  <strong className="text-gray-900">Firebase</strong> is Google's comprehensive app development platform that provides backend services, 
                  easy-to-use SDKs, and ready-made UI libraries to help you build high-quality apps quickly.
                </p>
                <p>
                  Firebase eliminates the need to manage servers and write server-side code, allowing you to focus on creating amazing user experiences.
                </p>
                <div className="bg-orange-50 rounded-xl p-4 mt-4 border border-orange-100">
                  <h4 className="font-semibold mb-2 text-gray-900">Core Firebase Services:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-orange-600 mt-0.5" />
                      <div>
                        <strong>Authentication:</strong> User identity & access management
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Database className="w-4 h-4 text-orange-600 mt-0.5" />
                      <div>
                        <strong>Firestore:</strong> NoSQL cloud database
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-orange-600 mt-0.5" />
                      <div>
                        <strong>Realtime Database:</strong> Synced data in real-time
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Cloud className="w-4 h-4 text-orange-600 mt-0.5" />
                      <div>
                        <strong>Cloud Storage:</strong> File storage and serving
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Why Choose Firebase?</h4>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Quick setup and easy integration</li>
                    <li>Scales automatically with your app</li>
                    <li>Real-time data synchronization</li>
                    <li>Built-in security and authentication</li>
                    <li>Comprehensive analytics and monitoring</li>
                    <li>Free tier for small projects</li>
                  </ul>
                </div>
              </div>
            </Section>

            <Section id="setup" title="Setup & Installation">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Get started with Firebase by installing the necessary tools and SDKs for your project.
                </p>

                <h4 className="font-semibold text-gray-900">Install Firebase CLI (Command Line Interface):</h4>
                <CodeBlock id="setup-cli" language="bash">npm install -g firebase-tools</CodeBlock>

                <InfoBox type="tip">
                  The Firebase CLI provides tools for testing, managing, and deploying your Firebase projects.
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-4">Login to Firebase:</h4>
                <CodeBlock id="setup-login" language="bash">firebase login</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Install Firebase SDK for Web:</h4>
                <CodeBlock id="setup-sdk" language="bash">npm install firebase</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">For React Projects:</h4>
                <CodeBlock id="setup-react" language="bash">npm install firebase react-firebase-hooks</CodeBlock>

                <InfoBox type="info">
                  <code className="bg-blue-100 px-1.5 py-0.5 rounded">react-firebase-hooks</code> provides easy-to-use React hooks for Firebase services.
                </InfoBox>
              </div>
            </Section>

            <Section id="project" title="Create Firebase Project">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Create a new Firebase project from the Firebase Console to start using Firebase services.
                </p>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 text-gray-900">Steps to Create Project:</h4>
                  <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-700">
                    <li>Go to <a href="https://console.firebase.google.com" className="text-orange-600 underline">Firebase Console</a></li>
                    <li>Click "Add project" or "Create a project"</li>
                    <li>Enter your project name</li>
                    <li>Enable/disable Google Analytics (recommended)</li>
                    <li>Choose or create a Google Analytics account</li>
                    <li>Click "Create project"</li>
                  </ol>
                </div>

                <InfoBox type="tip">
                  Enable Google Analytics to get insights about your app usage, user behavior, and performance metrics.
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-4">Register Your App:</h4>
                <div className="bg-slate-50 rounded-xl p-4">
                  <ol className="list-decimal pl-6 space-y-2 text-sm text-slate-700">
                    <li>In your Firebase project, click the web icon (&lt;/&gt;)</li>
                    <li>Register your app with a nickname</li>
                    <li>Optionally set up Firebase Hosting</li>
                    <li>Copy the configuration object provided</li>
                  </ol>
                </div>
              </div>
            </Section>

            <Section id="config" title="Initialize Firebase">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Initialize Firebase in your application using the configuration from your Firebase Console.
                </p>

                <h4 className="font-semibold text-gray-900">Create a Firebase Configuration File:</h4>
                <CodeBlock id="config-file" language="javascript">{`// firebase.js or firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef",
  measurementId: "G-XXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;`}</CodeBlock>

                <InfoBox type="warning">
                  <strong>Never commit your API keys directly to public repositories!</strong> Use environment variables for sensitive configuration.
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-4">Using Environment Variables:</h4>
                <CodeBlock id="config-env" language="javascript">{`// .env file
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id

// firebase.js
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // ... other config
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Initialize in Your App:</h4>
                <CodeBlock id="config-app" language="javascript">{`// App.js
import { auth, db, storage } from './firebase';

function App() {
  // Now you can use auth, db, and storage throughout your app
  return (
    <div className="App">
      {/* Your app content */}
    </div>
  );
}`}</CodeBlock>
              </div>
            </Section>

            <Section id="auth" title="Authentication" icon={Lock}>
              <div className="space-y-4">
                <p className="text-slate-700">
                  Firebase Authentication provides backend services and SDKs to authenticate users to your app.
                </p>

                <h4 className="font-semibold text-gray-900">Enable Authentication in Console:</h4>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <ol className="list-decimal pl-6 space-y-1 text-sm text-slate-700">
                    <li>Go to Authentication in Firebase Console</li>
                    <li>Click "Get Started"</li>
                    <li>Choose sign-in methods (Email/Password, Google, etc.)</li>
                    <li>Enable the methods you want to use</li>
                  </ol>
                </div>

                <h4 className="font-semibold text-gray-900">Email/Password Sign Up:</h4>
                <CodeBlock id="auth-signup" language="javascript">{`import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    const user = userCredential.user;
    console.log("User created:", user);
  } catch (error) {
    console.error("Error signing up:", error.message);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Email/Password Sign In:</h4>
                <CodeBlock id="auth-signin" language="javascript">{`import { signInWithEmailAndPassword } from "firebase/auth";

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth, 
      email, 
      password
    );
    const user = userCredential.user;
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Google Sign In:</h4>
                <CodeBlock id="auth-google" language="javascript">{`import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Google user:", user);
  } catch (error) {
    console.error("Error with Google sign in:", error.message);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Sign Out:</h4>
                <CodeBlock id="auth-signout" language="javascript">{`import { signOut } from "firebase/auth";

const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Monitor Auth State:</h4>
                <CodeBlock id="auth-state" language="javascript">{`import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function AuthComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? \`Welcome, \${user.email}\` : "Please sign in"}
    </div>
  );
}`}</CodeBlock>

                <InfoBox type="tip">
                  Use <code className="bg-green-100 px-1.5 py-0.5 rounded">onAuthStateChanged</code> to persist user sessions across page refreshes.
                </InfoBox>
              </div>
            </Section>

            <Section id="firestore" title="Cloud Firestore" icon={Database}>
              <div className="space-y-4">
                <p className="text-slate-700">
                  Cloud Firestore is a flexible, scalable NoSQL cloud database to store and sync data for client and server-side development.
                </p>

                <h4 className="font-semibold text-gray-900">Enable Firestore:</h4>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <ol className="list-decimal pl-6 space-y-1 text-sm text-slate-700">
                    <li>Go to Firestore Database in Firebase Console</li>
                    <li>Click "Create database"</li>
                    <li>Choose production mode or test mode</li>
                    <li>Select a location for your database</li>
                  </ol>
                </div>

                <h4 className="font-semibold text-gray-900">Add Data to Firestore:</h4>
                <CodeBlock id="firestore-add" language="javascript">{`import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      name: userData.name,
      email: userData.email,
      age: userData.age,
      createdAt: new Date()
    });
    console.log("Document written with ID:", docRef.id);
  } catch (error) {
    console.error("Error adding document:", error);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Set Document with Custom ID:</h4>
                <CodeBlock id="firestore-set" language="javascript">{`import { doc, setDoc } from "firebase/firestore";

const createUserProfile = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), {
      name: userData.name,
      email: userData.email,
      bio: userData.bio,
      updatedAt: new Date()
    });
    console.log("User profile created");
  } catch (error) {
    console.error("Error creating profile:", error);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Read Data:</h4>
                <CodeBlock id="firestore-read" language="javascript">{`import { doc, getDoc } from "firebase/firestore";

const getUserProfile = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("User data:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Query Collection:</h4>
                <CodeBlock id="firestore-query" language="javascript">{`import { collection, query, where, getDocs } from "firebase/firestore";

const getAdultUsers = async () => {
  const q = query(
    collection(db, "users"), 
    where("age", ">=", 18)
  );

  const querySnapshot = await getDocs(q);
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Real-time Updates:</h4>
                <CodeBlock id="firestore-realtime" language="javascript">{`import { onSnapshot } from "firebase/firestore";

const subscribeToUsers = (callback) => {
  const unsubscribe = onSnapshot(
    collection(db, "users"),
    (snapshot) => {
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      callback(users);
    },
    (error) => {
      console.error("Error listening to changes:", error);
    }
  );
  return unsubscribe;
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Update Data:</h4>
                <CodeBlock id="firestore-update" language="javascript">{`import { doc, updateDoc } from "firebase/firestore";

const updateUser = async (userId, updates) => {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      ...updates,
      updatedAt: new Date()
    });
    console.log("User updated");
  } catch (error) {
    console.error("Error updating user:", error);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Delete Data:</h4>
                <CodeBlock id="firestore-delete" language="javascript">{`import { doc, deleteDoc } from "firebase/firestore";

const deleteUser = async (userId) => {
  try {
    await deleteDoc(doc(db, "users", userId));
    console.log("User deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};`}</CodeBlock>

                <InfoBox type="tip">
                  Firestore automatically indexes your data. For complex queries, you may need to create composite indexes in the Firebase Console.
                </InfoBox>
              </div>
            </Section>

            <Section id="realtime" title="Realtime Database" icon={Zap}>
              <div className="space-y-4">
                <p className="text-slate-700">
                  Firebase Realtime Database is a cloud-hosted NoSQL database that syncs data in real-time to every connected client.
                </p>

                <h4 className="font-semibold text-gray-900">Initialize Realtime Database:</h4>
                <CodeBlock id="realtime-init" language="javascript">{`import { getDatabase, ref, set } from "firebase/database";

const database = getDatabase();

// Write data
const writeUserData = (userId, name, email) => {
  set(ref(database, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture: ''
  });
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Read Data Once:</h4>
                <CodeBlock id="realtime-read" language="javascript">{`import { get, child } from "firebase/database";

const getUserData = async (userId) => {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, \`users/\${userId}\`));
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Listen for Real-time Changes:</h4>
                <CodeBlock id="realtime-listen" language="javascript">{`import { onValue } from "firebase/database";

const listenToUserChanges = (userId, callback) => {
  const userRef = ref(database, 'users/' + userId);
  
  const unsubscribe = onValue(userRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
  
  return unsubscribe;
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Update Data:</h4>
                <CodeBlock id="realtime-update" language="javascript">{`import { update } from "firebase/database";

const updateUserProfile = (userId, updates) => {
  const userRef = ref(database, 'users/' + userId);
  update(userRef, updates);
};`}</CodeBlock>

                <InfoBox type="info">
                  <strong>Firestore vs Realtime Database:</strong> Use Firestore for more complex queries and better scalability. 
                  Use Realtime Database for simpler data models with low latency requirements.
                </InfoBox>
              </div>
            </Section>

            <Section id="storage" title="Cloud Storage" icon={Cloud}>
              <div className="space-y-4">
                <p className="text-slate-700">
                  Firebase Cloud Storage is built for app developers who need to store and serve user-generated content like photos and videos.
                </p>

                <h4 className="font-semibold text-gray-900">Upload File:</h4>
                <CodeBlock id="storage-upload" language="javascript">{`import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const uploadImage = async (file, userId) => {
  const storageRef = ref(storage, \`users/\${userId}/profile.jpg\`);
  
  try {
    // Upload file
    const snapshot = await uploadBytes(storageRef, file);
    console.log('Uploaded a file!', snapshot);
    
    // Get download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File available at', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Upload with Progress Tracking:</h4>
                <CodeBlock id="storage-progress" language="javascript">{`import { ref, uploadBytesResumable } from "firebase/storage";

const uploadWithProgress = (file, userId, onProgress) => {
  const storageRef = ref(storage, \`users/\${userId}/\${file.name}\`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onProgress(progress);
      console.log('Upload is ' + progress + '% done');
    }, 
    (error) => {
      console.error('Upload error:', error);
    }, 
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      console.log('File available at', downloadURL);
    }
  );
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Download File URL:</h4>
                <CodeBlock id="storage-download" language="javascript">{`import { ref, getDownloadURL } from "firebase/storage";

const getFileURL = async (filePath) => {
  const fileRef = ref(storage, filePath);
  try {
    const url = await getDownloadURL(fileRef);
    return url;
  } catch (error) {
    console.error("Error getting download URL:", error);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Delete File:</h4>
                <CodeBlock id="storage-delete" language="javascript">{`import { ref, deleteObject } from "firebase/storage";

const deleteFile = async (filePath) => {
  const fileRef = ref(storage, filePath);
  try {
    await deleteObject(fileRef);
    console.log('File deleted successfully');
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">List Files in Directory:</h4>
                <CodeBlock id="storage-list" language="javascript">{`import { ref, listAll } from "firebase/storage";

const listFiles = async (folderPath) => {
  const listRef = ref(storage, folderPath);
  
  try {
    const res = await listAll(listRef);
    res.items.forEach((itemRef) => {
      console.log('File:', itemRef.name);
    });
    return res.items;
  } catch (error) {
    console.error("Error listing files:", error);
  }
};`}</CodeBlock>

                <InfoBox type="warning">
                  Always implement proper security rules for Cloud Storage to protect user data and prevent unauthorized access.
                </InfoBox>
              </div>
            </Section>

            <Section id="hosting" title="Firebase Hosting">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Firebase Hosting provides fast and secure hosting for your web app, static and dynamic content, and microservices.
                </p>

                <h4 className="font-semibold text-gray-900">Initialize Firebase Hosting:</h4>
                <CodeBlock id="hosting-init" language="bash">firebase init hosting</CodeBlock>

                <div className="bg-slate-50 rounded-xl p-4">
                  <h4 className="font-semibold mb-2 text-gray-900">During initialization, you'll be asked:</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm text-slate-700">
                    <li>What do you want to use as your public directory? (usually <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">build</code> or <code className="bg-slate-200 px-1 py-0.5 rounded text-xs">dist</code>)</li>
                    <li>Configure as a single-page app? (Yes for React apps)</li>
                    <li>Set up automatic builds with GitHub? (Optional)</li>
                  </ul>
                </div>

                <h4 className="font-semibold text-gray-900 mt-4">Build Your Project:</h4>
                <CodeBlock id="hosting-build" language="bash">npm run build</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Deploy to Firebase Hosting:</h4>
                <CodeBlock id="hosting-deploy" language="bash">firebase deploy --only hosting</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Preview Before Deploy:</h4>
                <CodeBlock id="hosting-preview" language="bash">firebase hosting:channel:deploy preview</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Custom Domain Setup:</h4>
                <div className="bg-slate-50 rounded-xl p-4">
                  <ol className="list-decimal pl-6 space-y-1 text-sm text-slate-700">
                    <li>Go to Hosting in Firebase Console</li>
                    <li>Click "Add custom domain"</li>
                    <li>Enter your domain name</li>
                    <li>Add the provided DNS records to your domain registrar</li>
                    <li>Wait for verification (can take up to 24 hours)</li>
                  </ol>
                </div>

                <InfoBox type="tip">
                  Firebase Hosting automatically provisions SSL certificates for your domains at no extra cost!
                </InfoBox>
              </div>
            </Section>

            <Section id="functions" title="Cloud Functions">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Cloud Functions let you run backend code in response to events triggered by Firebase features and HTTPS requests.
                </p>

                <h4 className="font-semibold text-gray-900">Initialize Cloud Functions:</h4>
                <CodeBlock id="functions-init" language="bash">firebase init functions</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Create an HTTPS Function:</h4>
                <CodeBlock id="functions-https" language="javascript">{`// functions/index.js
const functions = require("firebase-functions");

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Callable Function (for client apps):</h4>
                <CodeBlock id="functions-callable" language="javascript">{`const functions = require("firebase-functions");

exports.addMessage = functions.https.onCall((data, context) => {
  const text = data.text;
  
  // Check authentication
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated', 
      'User must be authenticated'
    );
  }
  
  return { message: \`Added: \${text}\` };
});`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Call from Client:</h4>
                <CodeBlock id="functions-call" language="javascript">{`import { getFunctions, httpsCallable } from "firebase/functions";

const functions = getFunctions();
const addMessage = httpsCallable(functions, 'addMessage');

addMessage({ text: "Hello" })
  .then((result) => {
    console.log(result.data);
  })
  .catch((error) => {
    console.error(error);
  });`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Firestore Trigger:</h4>
                <CodeBlock id="functions-trigger" language="javascript">{`const admin = require("firebase-admin");
admin.initializeApp();

exports.onUserCreate = functions.firestore
  .document('users/{userId}')
  .onCreate((snap, context) => {
    const newUser = snap.data();
    console.log('New user created:', newUser);
    
    // Send welcome email, create profile, etc.
    return null;
  });`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Deploy Functions:</h4>
                <CodeBlock id="functions-deploy" language="bash">firebase deploy --only functions</CodeBlock>

                <InfoBox type="info">
                  Cloud Functions run on Google's servers, so you don't need to manage any infrastructure!
                </InfoBox>
              </div>
            </Section>

            <Section id="fcm" title="Cloud Messaging">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Firebase Cloud Messaging (FCM) is a cross-platform messaging solution that lets you reliably send notifications and messages.
                </p>

                <h4 className="font-semibold text-gray-900">Request Permission:</h4>
                <CodeBlock id="fcm-permission" language="javascript">{`import { getMessaging, getToken } from "firebase/messaging";

const messaging = getMessaging();

const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_KEY"
      });
      console.log("FCM Token:", token);
      // Save token to database
    }
  } catch (error) {
    console.error("Error getting permission:", error);
  }
};`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Receive Messages:</h4>
                <CodeBlock id="fcm-receive" language="javascript">{`import { onMessage } from "firebase/messaging";

onMessage(messaging, (payload) => {
  console.log('Message received:', payload);
  // Show notification
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  });
});`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Send from Server (Node.js):</h4>
                <CodeBlock id="fcm-send" language="javascript">{`const admin = require('firebase-admin');

const message = {
  notification: {
    title: 'New Message',
    body: 'You have a new notification'
  },
  token: userDeviceToken
};

admin.messaging().send(message)
  .then((response) => {
    console.log('Successfully sent:', response);
  })
  .catch((error) => {
    console.error('Error sending:', error);
  });`}</CodeBlock>

                <InfoBox type="tip">
                  Get your VAPID key from Project Settings → Cloud Messaging in the Firebase Console.
                </InfoBox>
              </div>
            </Section>

            <Section id="analytics" title="Analytics">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Firebase Analytics provides insights on app usage and user engagement, helping you make data-driven decisions.
                </p>

                <h4 className="font-semibold text-gray-900">Initialize Analytics:</h4>
                <CodeBlock id="analytics-init" language="javascript">{`import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();

// Log custom event
logEvent(analytics, 'select_content', {
  content_type: 'image',
  content_id: 'P12453'
});`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Common Events:</h4>
                <CodeBlock id="analytics-events" language="javascript">{`// Login event
logEvent(analytics, 'login', {
  method: 'Google'
});

// Purchase event
logEvent(analytics, 'purchase', {
  currency: 'USD',
  value: 29.99,
  items: [{ name: 'Premium Plan' }]
});

// Page view
logEvent(analytics, 'page_view', {
  page_title: 'Home',
  page_location: window.location.href
});

// Search
logEvent(analytics, 'search', {
  search_term: 'firebase tutorial'
});`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Set User Properties:</h4>
                <CodeBlock id="analytics-properties" language="javascript">{`import { setUserProperties } from "firebase/analytics";

setUserProperties(analytics, {
  account_type: 'premium',
  preferred_language: 'en'
});`}</CodeBlock>

                <InfoBox type="info">
                  Analytics data appears in the Firebase Console within 24 hours. Use DebugView for real-time testing.
                </InfoBox>
              </div>
            </Section>

            <Section id="security" title="Security Rules">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Security Rules protect your data in Firestore, Realtime Database, and Cloud Storage by controlling who can read and write.
                </p>

                <h4 className="font-semibold text-gray-900">Firestore Security Rules:</h4>
                <CodeBlock id="security-firestore" language="javascript">{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read, authenticated write
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
    
    // Validate data structure
    match /products/{productId} {
      allow create: if request.auth != null
                    && request.resource.data.name is string
                    && request.resource.data.price is number;
    }
  }
}`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Storage Security Rules:</h4>
                <CodeBlock id="security-storage" language="javascript">{`rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User can only access their own files
    match /users/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null 
                         && request.auth.uid == userId;
    }
    
    // Image size validation
    match /images/{imageId} {
      allow write: if request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('image/.*');
    }
  }
}`}</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Realtime Database Rules:</h4>
                <CodeBlock id="security-rtdb" language="json">{`{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "public_data": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}`}</CodeBlock>

                <InfoBox type="warning">
                  <strong>Never use test mode rules in production!</strong> They allow anyone to read and write your data.
                  Always implement proper security rules before going live.
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-4">Deploy Security Rules:</h4>
                <CodeBlock id="security-deploy" language="bash">firebase deploy --only firestore:rules
firebase deploy --only storage:rules
firebase deploy --only database:rules</CodeBlock>
              </div>
            </Section>

            <Section id="emulators" title="Local Emulators">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Firebase Emulators allow you to test your app locally without affecting production data.
                </p>

                <h4 className="font-semibold text-gray-900">Initialize Emulators:</h4>
                <CodeBlock id="emulators-init" language="bash">firebase init emulators</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Start Emulators:</h4>
                <CodeBlock id="emulators-start" language="bash">firebase emulators:start</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Connect to Emulators in Code:</h4>
                <CodeBlock id="emulators-connect" language="javascript">{`import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator } from "firebase/storage";
import { connectFunctionsEmulator } from "firebase/functions";

// Only in development
if (process.env.NODE_ENV === 'development') {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}`}</CodeBlock>

                <InfoBox type="tip">
                  The Emulator Suite UI at <code className="bg-green-100 px-1.5 py-0.5 rounded">http://localhost:4000</code> lets you 
                  view and manage emulated data.
                </InfoBox>

                <h4 className="font-semibold text-gray-900 mt-4">Export/Import Emulator Data:</h4>
                <CodeBlock id="emulators-export" language="bash"># Export data
firebase emulators:export ./emulator-data

# Start with imported data
firebase emulators:start --import=./emulator-data</CodeBlock>
              </div>
            </Section>

            <Section id="deployment" title="Deployment">
              <div className="space-y-4">
                <p className="text-slate-700">
                  Deploy your complete Firebase project including hosting, functions, and security rules.
                </p>

                <h4 className="font-semibold text-gray-900">Deploy Everything:</h4>
                <CodeBlock id="deploy-all" language="bash">firebase deploy</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Deploy Specific Services:</h4>
                <CodeBlock id="deploy-specific" language="bash"># Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:functionName

# Deploy multiple services
firebase deploy --only hosting,firestore:rules</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">View Deployment History:</h4>
                <CodeBlock id="deploy-history" language="bash">firebase hosting:channel:list</CodeBlock>

                <h4 className="font-semibold text-gray-900 mt-4">Rollback Deployment:</h4>
                <div className="bg-slate-50 rounded-xl p-4">
                  <ol className="list-decimal pl-6 space-y-1 text-sm text-slate-700">
                    <li>Go to Hosting in Firebase Console</li>
                    <li>View release history</li>
                    <li>Click on a previous release</li>
                    <li>Click "Rollback to this release"</li>
                  </ol>
                </div>

                <h4 className="font-semibold text-gray-900 mt-4">Environment Configuration:</h4>
                <CodeBlock id="deploy-env" language="bash"># Set environment variables for functions
firebase functions:config:set someservice.key="THE API KEY"

# Get config
firebase functions:config:get

# Use in function
const functions = require('firebase-functions');
const key = functions.config().someservice.key;</CodeBlock>

                <InfoBox type="info">
                  Use different Firebase projects for development, staging, and production environments.
                </InfoBox>
              </div>
            </Section>

            <Section id="best" title="Best Practices">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Do's
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-green-900">
                      <li>Use environment variables for API keys</li>
                      <li>Implement proper security rules</li>
                      <li>Test with emulators before deploying</li>
                      <li>Monitor usage in Firebase Console</li>
                      <li>Index Firestore queries for better performance</li>
                      <li>Use batch writes for multiple operations</li>
                      <li>Enable Analytics for user insights</li>
                      <li>Regularly review security rule coverage</li>
                    </ul>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Don'ts
                    </h4>
                    <ul className="list-disc pl-6 space-y-2 text-sm text-red-900">
                      <li>Don't expose API keys in public repositories</li>
                      <li>Don't use test mode security rules in production</li>
                      <li>Don't store sensitive data without encryption</li>
                      <li>Don't make unlimited real-time listeners</li>
                      <li>Don't ignore Firebase quota limits</li>
                      <li>Don't skip authentication for sensitive operations</li>
                      <li>Don't hardcode configuration values</li>
                      <li>Don't deploy without testing first</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-orange-800 mb-3">Performance Tips</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-orange-900">
                    <li>Use <code className="bg-orange-100 px-1.5 py-0.5 rounded">limit()</code> to restrict query results</li>
                    <li>Implement pagination for large datasets</li>
                    <li>Cache frequently accessed data locally</li>
                    <li>Use Cloud Functions for heavy computations</li>
                    <li>Optimize images before uploading to Storage</li>
                    <li>Detach listeners when components unmount</li>
                    <li>Use compound indexes for complex queries</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
                  <h4 className="font-semibold text-blue-800 mb-3">Security Checklist</h4>
                  <ul className="list-disc pl-6 space-y-2 text-sm text-blue-900">
                    <li>✓ Security rules are in production mode</li>
                    <li>✓ User data is properly authenticated</li>
                    <li>✓ Sensitive operations validated on server-side</li>
                    <li>✓ Storage files have size and type restrictions</li>
                    <li>✓ API keys are in environment variables</li>
                    <li>✓ Regular security rule audits performed</li>
                  </ul>
                </div>

                <InfoBox type="tip">
                  <strong>Pro Tip:</strong> Use Firebase Extensions to add common functionality like image resizing, 
                  email sending, and more without writing custom code!
                </InfoBox>
              </div>
            </Section>

            <div className="bg-gradient-to-r from-orange-50 to-amber-100 border border-orange-200 p-8 rounded-2xl text-center">
              <Flame className="w-12 h-12 text-orange-600 mx-auto mb-3" />
              <h3 className="text-2xl font-bold mb-3">Ready to Test Your Firebase Knowledge?</h3>
              <p className="text-slate-700 mb-6">Take our interactive quiz to see how much you've learned!</p>
              <button
                onClick={() => navigate("/firebase")}
                className="px-8 py-4 bg-orange-600 text-white rounded-xl font-semibold inline-flex items-center gap-2 hover:bg-orange-700 transition-colors shadow-lg"
              >
                Start Firebase Quiz <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default FirebaseLearn;