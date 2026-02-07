import React, { useState, useEffect } from "react";
import { Mail, MapPin, User, Send, ExternalLink, Loader2, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

export default function Contact() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "success", text: "" });

  const showToast = (type, text) => {
    setToast({ show: true, type, text });
    setTimeout(() => setToast({ show: false, type: "success", text: "" }), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast("error", "Please fill all fields.");
      return;
    }

    if (!validateEmail(formData.email)) {
      showToast("error", "Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "contactMessages"), {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        createdAt: serverTimestamp(),
      });

      setFormData({ name: "", email: "", message: "" });
      showToast("success", "Message sent successfully!");
    } catch (error) {
      console.error("Error saving message:", error);
      showToast("error", "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50 px-6 py-16 flex items-center justify-center">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* LEFT INFO */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Contact
            </span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-2">Get in touch</h1>
          <p className="text-slate-600 mb-8">
            Fill in the form and I’ll get back to you as soon as possible.
          </p>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <p className="text-slate-500">Name</p>
                <p className="text-slate-900 font-semibold">Mohd Fardeen Ansari</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-center">
                <Mail className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <p className="text-slate-500">Email</p>
                <a href="mailto:im.feedi4u@gmail.com" className="text-blue-700 font-semibold hover:underline">
                  im.feedi4u@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-200 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <p className="text-slate-500">Location</p>
                <p className="text-slate-900 font-semibold">Mumbai, Maharashtra, India</p>
              </div>
            </div>

            <a
              href="https://fardeensportfolilo.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:underline"
            >
              Visit Portfolio <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-8 shadow-md flex flex-col gap-5"
        >
          <h2 className="text-xl font-bold text-slate-900">Send a message</h2>

          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600" />

          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600" />

          <textarea rows="5" name="message" placeholder="Your Message" value={formData.message} onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 resize-none" />

          <button type="submit" disabled={loading}
            className={`w-full py-3 rounded-xl text-white font-semibold flex items-center justify-center gap-2 ${
              loading ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"
            }`}>
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>
      </div>

      {toast.show && (
        <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 rounded-xl shadow-lg border text-sm font-semibold ${
          toast.type === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-rose-50 border-rose-200 text-rose-800"
        }`}>
          {toast.text}
        </div>
      )}
    </div>
  );
}
