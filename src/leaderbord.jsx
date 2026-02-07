import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

export default function Leaderboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("basic");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    onAuthStateChanged(auth, (u) => setUser(u));
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedLevel, search, allData]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    const q = query(collection(db, "leaderboard"), orderBy("percentage", "desc"), limit(500));
    const snapshot = await getDocs(q);
    setAllData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const applyFilters = () => {
    let data = allData.filter(e => e.level === selectedLevel);
    if (search.trim()) {
      data = data.filter(e =>
        (e.displayName || "").toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredData(data);
    setPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / perPage);
  const visible = filteredData.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-700 to-blue-700 text-white py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => navigate("/")} className="mb-6 text-white/80 hover:text-white">
            ← Back
          </button>
          <h1 className="text-4xl font-bold">Leaderboard</h1>
          <p className="text-blue-100 mt-2">Top performers ranked by quiz scores</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex gap-3">
            {["basic", "medium", "hard"].map(level => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  selectedLevel === level
                    ? "bg-indigo-600 text-white shadow"
                    : "bg-white border border-gray-200 text-gray-600"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <input
            type="text"
            placeholder="Search name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Leaderboard List */}
       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
  {loading ? (
    <div className="p-16 text-center text-gray-500">Loading...</div>
  ) : visible.length === 0 ? (
    <div className="p-16 text-center text-gray-500">No results found</div>
  ) : (
    <div className="divide-y divide-gray-100 animate-fadeIn">
      {visible.map((entry, index) => {
        const globalRank = (page - 1) * perPage + index + 1;
        const isUser = user && entry.uid === user.uid;

        return (
          <div
            key={entry.id}
            className={`p-4 sm:px-6 sm:py-4 transition ${
              isUser
                ? "bg-indigo-50 border-l-4 border-indigo-500"
                : "hover:bg-slate-50"
            }`}
          >
            {/* MOBILE LAYOUT */}
            <div className="flex flex-col gap-2 sm:hidden">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800">#{globalRank}</span>
                <span className="font-semibold text-indigo-600">
                  {entry.percentage}%
                </span>
              </div>

              <div className="text-gray-800 font-medium">
                {entry.displayName || "Anonymous"}
              </div>

              <div className="text-xs text-gray-500">
                {new Date(entry.submittedAt).toLocaleDateString()}
              </div>
            </div>

            {/* DESKTOP LAYOUT */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="w-1/4 font-bold text-gray-800">#{globalRank}</div>
              <div className="w-1/4">{entry.displayName || "Anonymous"}</div>
              <div className="w-1/4 font-semibold text-indigo-600">
                {entry.percentage}%
              </div>
              <div className="w-1/4 text-sm text-gray-500">
                {new Date(entry.submittedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>


        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="px-4 py-2 bg-white border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 bg-white border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
  
}

