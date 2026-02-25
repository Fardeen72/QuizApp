import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const LEVELS = ["basic", "medium", "hard"];

const LEVEL_META = {
  basic:  { label: "Basic",  color: "#10B981", bg: "#ECFDF5" },
  medium: { label: "Medium", color: "#F59E0B", bg: "#FFFBEB" },
  hard:   { label: "Hard",   color: "#EF4444", bg: "#FEF2F2" },
};

const MEDALS = ["🥇", "🥈", "🥉"];

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
    setAllData(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  const applyFilters = () => {
    let data = allData.filter((e) => e.level === selectedLevel);
    if (search.trim()) {
      data = data.filter((e) =>
        (e.displayName || "").toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredData(data);
    setPage(1);
  };

  const totalPages = Math.ceil(filteredData.length / perPage);
  const visible = filteredData.slice((page - 1) * perPage, page * perPage);

  const topThree = filteredData.slice(0, 3);

  const getScoreColor = (pct) => {
    if (pct >= 80) return "#10B981";
    if (pct >= 50) return "#F59E0B";
    return "#EF4444";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

        .lb-root {
          font-family: 'DM Sans', sans-serif;
          background: #F8F7F4;
          min-height: 100vh;
          color: #1A1A1A;
        }

        /* ── HERO ── */
        .lb-hero {
          background: #0F0F0F;
          color: #fff;
          padding: 64px 24px 56px;
          position: relative;
          overflow: hidden;
        }
        .lb-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 50% 80% at 85% 50%, rgba(99,102,241,0.16) 0%, transparent 70%),
            radial-gradient(ellipse 35% 55% at 15% 20%, rgba(16,185,129,0.10) 0%, transparent 60%);
          pointer-events: none;
        }
        .lb-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .lb-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          margin-bottom: 28px;
          font-family: 'DM Sans', sans-serif;
          transition: color 0.15s;
        }
        .lb-back:hover { color: rgba(255,255,255,0.85); }

        .lb-eyebrow {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .lb-eyebrow::before {
          content: '';
          display: block;
          width: 28px;
          height: 1px;
          background: rgba(255,255,255,0.25);
        }
        .lb-hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 6vw, 60px);
          font-weight: 800;
          line-height: 1.0;
          letter-spacing: -0.03em;
          margin: 0 0 14px;
          color: #fff;
        }
        .lb-hero h1 span {
          background: linear-gradient(135deg, #6366F1, #10B981);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .lb-hero-sub {
          font-size: 16px;
          color: rgba(255,255,255,0.5);
          font-weight: 300;
          max-width: 380px;
          line-height: 1.6;
        }

        /* ── PODIUM ── */
        .lb-podium-wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px 24px 0;
        }
        .lb-section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #A09D98;
          margin-bottom: 16px;
        }
        .lb-podium {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 40px;
        }
        .lb-podium-card {
          background: #fff;
          border: 1.5px solid #E9E7E3;
          border-radius: 16px;
          padding: 20px 16px;
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .lb-podium-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.07);
        }
        .lb-podium-card.first {
          border-color: #F59E0B;
          background: linear-gradient(160deg, #FFFBEB 0%, #fff 60%);
        }
        .lb-podium-medal {
          font-size: 28px;
          margin-bottom: 8px;
          display: block;
        }
        .lb-podium-name {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #0F0F0F;
          margin-bottom: 4px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lb-podium-score {
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        /* ── CONTROLS ── */
        .lb-controls {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .lb-level-btn {
          padding: 8px 18px;
          border-radius: 8px;
          border: 1.5px solid #E5E3DE;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #6B6863;
          cursor: pointer;
          transition: all 0.18s;
          text-transform: capitalize;
        }
        .lb-level-btn:hover { border-color: #6366F1; color: #6366F1; }
        .lb-level-btn.active { background: #0F0F0F; border-color: #0F0F0F; color: #fff; }

        .lb-search {
          margin-left: auto;
          position: relative;
          min-width: 200px;
        }
        .lb-search input {
          width: 100%;
          padding: 9px 14px 9px 36px;
          border: 1.5px solid #E5E3DE;
          border-radius: 10px;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #1A1A1A;
          outline: none;
          transition: border-color 0.2s;
          box-sizing: border-box;
        }
        .lb-search input:focus { border-color: #6366F1; }
        .lb-search input::placeholder { color: #A09D98; }
        .lb-search-icon {
          position: absolute;
          left: 11px;
          top: 50%;
          transform: translateY(-50%);
          color: #A09D98;
          pointer-events: none;
        }

        /* ── TABLE ── */
        .lb-table-wrap {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 24px 80px;
        }
        .lb-table {
          background: #fff;
          border: 1.5px solid #E9E7E3;
          border-radius: 18px;
          overflow: hidden;
        }
        .lb-thead {
          display: grid;
          grid-template-columns: 64px 1fr 100px 120px;
          padding: 12px 24px;
          background: #F8F7F4;
          border-bottom: 1px solid #ECEAE6;
        }
        .lb-thead span {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #A09D98;
        }
        .lb-thead span:not(:first-child) { text-align: center; }

        .lb-row {
          display: grid;
          grid-template-columns: 64px 1fr 100px 120px;
          align-items: center;
          padding: 14px 24px;
          border-bottom: 1px solid #F0EEE9;
          transition: background 0.15s;
        }
        .lb-row:last-child { border-bottom: none; }
        .lb-row:hover { background: #FAFAF8; }
        .lb-row.is-user {
          background: #F0F0FF;
          border-left: 3px solid #6366F1;
        }
        .lb-row.is-user:hover { background: #EAEAFF; }

        .lb-rank {
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: #3D3B37;
        }
        .lb-rank.top { color: #F59E0B; }

        .lb-name-wrap { display: flex; align-items: center; gap: 8px; }
        .lb-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366F1, #10B981);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #fff;
          flex-shrink: 0;
          font-family: 'Syne', sans-serif;
        }
        .lb-name {
          font-size: 14px;
          font-weight: 500;
          color: #1A1A1A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .lb-you-badge {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 20px;
          background: #EEEEFF;
          color: #6366F1;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .lb-score-bar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .lb-score-val {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }
        .lb-score-bar {
          width: 52px;
          height: 4px;
          border-radius: 4px;
          background: #ECEAE6;
          overflow: hidden;
        }
        .lb-score-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.4s ease;
        }

        .lb-date {
          font-size: 12.5px;
          color: #A09D98;
          text-align: center;
          font-weight: 300;
        }

        /* MOBILE ROW */
        .lb-row-mobile {
          display: none;
          padding: 14px 18px;
          border-bottom: 1px solid #F0EEE9;
          transition: background 0.15s;
        }
        .lb-row-mobile:last-child { border-bottom: none; }
        .lb-row-mobile.is-user { background: #F0F0FF; border-left: 3px solid #6366F1; }

        /* ── EMPTY ── */
        .lb-empty {
          padding: 64px 24px;
          text-align: center;
          color: #A09D98;
        }
        .lb-empty-icon { font-size: 36px; margin-bottom: 12px; }
        .lb-empty h3 {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          color: #3D3B37;
          margin-bottom: 6px;
        }

        /* ── SKELETON ── */
        .lb-skeleton-row {
          display: grid;
          grid-template-columns: 64px 1fr 100px 120px;
          align-items: center;
          padding: 14px 24px;
          border-bottom: 1px solid #F0EEE9;
        }
        .lb-skeleton-row:last-child { border-bottom: none; }
        .skel {
          border-radius: 6px;
          background: linear-gradient(90deg, #F0EEE9 25%, #E8E6E1 50%, #F0EEE9 75%);
          background-size: 200% 100%;
          animation: shimmer 1.4s infinite;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── PAGINATION ── */
        .lb-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }
        .lb-page-btn {
          padding: 8px 18px;
          border-radius: 8px;
          border: 1.5px solid #E5E3DE;
          background: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #3D3B37;
          cursor: pointer;
          transition: all 0.18s;
        }
        .lb-page-btn:hover:not(:disabled) { border-color: #6366F1; color: #6366F1; }
        .lb-page-btn:disabled { opacity: 0.35; cursor: default; }
        .lb-page-info {
          font-size: 13px;
          color: #9E9B95;
          padding: 0 8px;
        }

        @media (max-width: 620px) {
          .lb-podium { grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
          .lb-podium-card { padding: 14px 10px; }
          .lb-thead, .lb-row, .lb-skeleton-row { display: none; }
          .lb-row-mobile { display: block; }
          .lb-controls { flex-direction: column; align-items: stretch; }
          .lb-search { margin-left: 0; }
        }
      `}</style>

      <div className="lb-root">
        {/* Hero */}
        <div className="lb-hero">
          <div className="lb-hero-inner">
            <button className="lb-back" onClick={() => navigate("/")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>
            <div className="lb-eyebrow">Rankings</div>
            <h1>
              Top <span>performers</span>
            </h1>
            <p className="lb-hero-sub">
              See how you stack up against other learners. Rankings update in real time.
            </p>
          </div>
        </div>

        {/* Podium */}
        {!loading && topThree.length > 0 && (
          <div className="lb-podium-wrap">
            <div className="lb-section-label">Top 3 this level</div>
            <div className="lb-podium">
              {topThree.map((entry, i) => (
                <div key={entry.id} className={`lb-podium-card ${i === 0 ? "first" : ""}`}>
                  <span className="lb-podium-medal">{MEDALS[i]}</span>
                  <div className="lb-podium-name">{entry.displayName || "Anonymous"}</div>
                  <div
                    className="lb-podium-score"
                    style={{ color: getScoreColor(entry.percentage) }}
                  >
                    {entry.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="lb-controls">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {LEVELS.map((level) => (
              <button
                key={level}
                className={`lb-level-btn ${selectedLevel === level ? "active" : ""}`}
                onClick={() => setSelectedLevel(level)}
              >
                {LEVEL_META[level].label}
              </button>
            ))}
          </div>

          <div className="lb-search">
            <svg className="lb-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Search player..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="lb-table-wrap">
          <div className="lb-table">
            {!loading && visible.length > 0 && (
              <div className="lb-thead">
                <span>Rank</span>
                <span style={{ textAlign: "left" }}>Player</span>
                <span>Score</span>
                <span>Date</span>
              </div>
            )}

            {loading ? (
              [...Array(10)].map((_, i) => (
                <div key={i} className="lb-skeleton-row">
                  <div className="skel" style={{ height: 16, width: 32 }} />
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <div className="skel" style={{ width: 30, height: 30, borderRadius: "50%" }} />
                    <div className="skel" style={{ height: 14, width: 120 }} />
                  </div>
                  <div className="skel" style={{ height: 14, width: 48, margin: "0 auto" }} />
                  <div className="skel" style={{ height: 12, width: 72, margin: "0 auto" }} />
                </div>
              ))
            ) : visible.length === 0 ? (
              <div className="lb-empty">
                <div className="lb-empty-icon">🏆</div>
                <h3>No results found</h3>
                <p>Try a different level or search term.</p>
              </div>
            ) : (
              visible.map((entry, index) => {
                const globalRank = (page - 1) * perPage + index + 1;
                const isUser = user && entry.uid === user.uid;
                const initials = (entry.displayName || "A")[0].toUpperCase();
                const scoreColor = getScoreColor(entry.percentage);

                return (
                  <React.Fragment key={entry.id}>
                    {/* Desktop row */}
                    <div className={`lb-row ${isUser ? "is-user" : ""}`}>
                      <span className={`lb-rank ${globalRank <= 3 ? "top" : ""}`}>
                        {globalRank <= 3 ? MEDALS[globalRank - 1] : `#${globalRank}`}
                      </span>

                      <div className="lb-name-wrap">
                        <div className="lb-avatar">{initials}</div>
                        <span className="lb-name">{entry.displayName || "Anonymous"}</span>
                        {isUser && <span className="lb-you-badge">YOU</span>}
                      </div>

                      <div className="lb-score-bar-wrap">
                        <span className="lb-score-val" style={{ color: scoreColor }}>
                          {entry.percentage}%
                        </span>
                        <div className="lb-score-bar">
                          <div
                            className="lb-score-fill"
                            style={{ width: `${entry.percentage}%`, background: scoreColor }}
                          />
                        </div>
                      </div>

                      <span className="lb-date">
                        {new Date(entry.submittedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    {/* Mobile row */}
                    <div className={`lb-row-mobile ${isUser ? "is-user" : ""}`}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div className="lb-avatar" style={{ width: 26, height: 26, fontSize: 11 }}>{initials}</div>
                          <span style={{ fontWeight: 500, fontSize: 14, color: "#1A1A1A" }}>
                            {entry.displayName || "Anonymous"}
                          </span>
                          {isUser && <span className="lb-you-badge">YOU</span>}
                        </div>
                        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: scoreColor }}>
                          {entry.percentage}%
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span className={`lb-rank ${globalRank <= 3 ? "top" : ""}`} style={{ fontSize: 13 }}>
                          {globalRank <= 3 ? MEDALS[globalRank - 1] : `#${globalRank}`}
                        </span>
                        <span className="lb-date">
                          {new Date(entry.submittedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="lb-pagination">
              <button
                className="lb-page-btn"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
              >
                ← Prev
              </button>
              <span className="lb-page-info">
                {page} / {totalPages}
              </span>
              <button
                className="lb-page-btn"
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}