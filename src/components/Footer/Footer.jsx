import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Github, Linkedin, Earth, Send, Check, AlertCircle } from "lucide-react";
import { db } from "@/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "newsletter"), {
        email: email.trim().toLowerCase(),
        subscribedAt: serverTimestamp(),
        source: "footer",
      });
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch {
      setError("Failed to subscribe. Please try again.");
      setTimeout(() => setError(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const socialLinks = [
    { icon: Mail, href: "mailto:im.feedi4u@gmail.com", label: "Email" },
    { icon: Github, href: "https://github.com/Fardeen72", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Earth, href: "https://fardeensportfolilo.netlify.app/", label: "Website" },
  ];

  const linkSections = [
    {
      title: "Platform",
      links: [
        { label: "Courses", to: "/" },
        { label: "Quizzes", to: "/" },
        { label: "Learning Path", to: "/tutorial" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", to: "/" },
        { label: "Help Center", to: "/" },
        { label: "Community", to: "/" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
        { label: "Portfolio", to: "https://fardeensportfolilo.netlify.app/" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="py-14 grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Brand + Newsletter */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-indigo-600 mb-3">
              Quiz4Coder
            </h2>
            <p className="text-gray-600 text-sm mb-6 leading-relaxed">
              Learn web development through structured lessons and interactive quizzes. Practice regularly and grow your skills.
            </p>

            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Join our newsletter
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubmitted || isLoading}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted || isLoading}
                  className="px-5 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  {isLoading ? "Sending..." : isSubmitted ? "Subscribed" : "Subscribe"}
                </button>
              </div>

              {isSubmitted && (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Subscription successful
                </p>
              )}
              {error && (
                <p className="text-sm text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" /> {error}
                </p>
              )}
            </form>

            <div className="flex gap-3 mt-6">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-indigo-600 hover:border-indigo-300 transition"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-10">
            {linkSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-sm font-semibold text-gray-900 mb-4">
                  {section.title}
                </h4>
                <ul className="space-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        className="text-gray-600 hover:text-indigo-600 transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>© 2026 Quiz4Coder. All rights reserved.</p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="hover:text-indigo-600">Privacy</Link>
            <Link to="/terms" className="hover:text-indigo-600">Terms</Link>
            <Link to="/cookies" className="hover:text-indigo-600">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
