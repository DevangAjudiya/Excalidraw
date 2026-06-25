"use client";

import Navbar from "./components/Home/Nevbar";

export default function Home() {

  return (
    <div style={{
      minHeight: "100vh",
      width: "100%",
      backgroundColor: "#0F1117",
      color: "#F0F0FA",
      fontFamily: "'Inter', system-ui, sans-serif",
      boxSizing: "border-box",
    }}>
      <Navbar />

      {/* Ambient glow */}
      <div aria-hidden style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "400px",
        background: "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(99,102,241,0.35), transparent)",
        zIndex: 0,
      }} />

      {/* Single centered column — explicit style, no Tailwind for layout */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: "640px",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "0 24px",
        boxSizing: "border-box",
      }}>

        {/* ── Hero ── */}
        <section style={{
          paddingTop: "80px",
          paddingBottom: "60px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            border: "1px solid rgba(99,102,241,0.3)",
            background: "rgba(99,102,241,0.1)",
            color: "#A5B4FC",
            borderRadius: "999px",
            padding: "4px 12px",
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Real-time collaboration
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: "clamp(32px, 5vw, 48px)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            marginBottom: "20px",
            marginTop: 0,
          }}>
            Sketch ideas,{" "}
            <span style={{
              backgroundImage: "linear-gradient(135deg, #818CF8 0%, #6366F1 50%, #A78BFA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              together in real time
            </span>
          </h1>

          {/* Subhead */}
          <p style={{
            fontSize: "15px",
            color: "#8B8FA8",
            maxWidth: "340px",
            lineHeight: 1.65,
            marginBottom: "36px",
            marginTop: 0,
          }}>
            Create infinite canvas rooms, invite your team, and draw together — no setup needed.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <a href="/create-room" style={{
              backgroundColor: "#4F46E5",
              color: "#FFFFFF",
              borderRadius: "12px",
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.15s",
            }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "#4338CA")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "#4F46E5")}
            >
              Create a room
            </a>
            <a href="/join-room" style={{
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#C4C4D4",
              borderRadius: "12px",
              padding: "10px 20px",
              fontSize: "14px",
              textDecoration: "none",
              transition: "background 0.15s",
            }}
              onMouseOver={e => (e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.05)")}
              onMouseOut={e => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              Join a room
            </a>
          </div>
        </section>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: 0 }} />

        {/* ── Features ── */}
        <section id="features" style={{
          padding: "48px 0",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "12px",
        }}>
          {[
            { icon: "👥", bg: "rgba(99,102,241,0.12)", label: "Multiplayer", desc: "See everyone's cursor live as you draw." },
            { icon: "💾", bg: "rgba(16,185,129,0.12)", label: "Auto-saved", desc: "Everything persists between sessions automatically." },
            { icon: "🔗", bg: "rgba(245,158,11,0.12)", label: "Instant share", desc: "Share a link — no account needed to view." },
          ].map((f) => (
            <div key={f.label} style={{
              background: "#1A1B26",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "14px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}>
              <div style={{
                width: "36px", height: "36px",
                background: f.bg,
                borderRadius: "10px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "18px", flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <div>
                <h3 style={{ fontSize: "13px", fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px" }}>{f.label}</h3>
                <p style={{ fontSize: "12px", color: "#6B6F85", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </section>

        <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: 0 }} />

        {/* ── About Project ── */}
        <section id="about" style={{ padding: "48px 0" }}>
          <p style={{
            fontSize: "10px", fontWeight: 600,
            color: "#4B4F6A",
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            marginBottom: "20px", marginTop: 0,
          }}>
            About Threadline
          </p>

          <div style={{
            background: "#1A1B26",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "14px",
            padding: "32px",
            display: "flex", flexDirection: "column", gap: "16px",
            lineHeight: 1.8,
            color: "#8B8FA8",
            fontSize: "15px",
          }}>
            <p style={{ margin: 0 }}>
              Threadline is an innovative platform for real-time visual collaboration. Whether you're wireframing a new application, mapping out an architecture, or just brainstorming with your team, Threadline provides an infinite canvas that syncs instantly across all clients.
            </p>
            <p style={{ margin: 0 }}>
              Built with cutting-edge web technologies, it ensures a seamless, lag-free experience where creativity knows no bounds. Create your account today, spin up a secure room, and invite your peers to join the conversation — free forever.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}