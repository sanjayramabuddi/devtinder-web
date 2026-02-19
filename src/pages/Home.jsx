import { useState } from "react";
import { DEVS } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Home() {
  const loggedUser = useSelector((store) => store.user);
  const [cardIndex, setCardIndex] = useState(0);
  const [swipeDir, setSwipeDir] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleSwipe = (dir) => {
    if (animating) return;
    setSwipeDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setCardIndex((i) => (i + 1) % DEVS.length);
      setSwipeDir(null);
      setAnimating(false);
    }, 380);
  };

  const dev = DEVS[cardIndex];
  const nextDev = DEVS[(cardIndex + 1) % DEVS.length];

  return (
    <div className="min-h-full text-white flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-5xl w-full grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-7 font-body">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tag text-violet-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Beta · 10+ developers
          </div>

          <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight">
            Swipe right on
            <br />
            your next{" "}
            <span className="bg-linear-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              collab.
            </span>
          </h1>

          <p className="text-white/50 text-lg leading-relaxed max-w-sm">
            DevMatch connects developers by stack, vibe, and ambition. Find your
            co-founder or open-source partner — one swipe at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <Link to={loggedUser ? "/feed" : "/login"}>
              <button className="btn-primary font-medium px-8 py-3.5 rounded-xl text-base">
                Start Matching →
              </button>
            </Link>
          </div>

          <div className="flex items-center gap-3 pt-1">
            <div className="flex -space-x-2">
              {[
                "from-violet-500 to-pink-500",
                "from-cyan-500 to-blue-500",
                "from-emerald-500 to-teal-500",
                "from-orange-400 to-red-500",
              ].map((g, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full bg-linear-to-br ${g} border-2 border-[#09090f] flex items-center justify-center text-xs font-bold`}
                >
                  {["A", "B", "C", "D"][i]}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/40">
              <span className="text-white/70 font-medium">8+ devs</span> matched
              this week
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="relative w-72 h-100 float">
            <div
              className="absolute inset-0 rounded-3xl scale-95 opacity-40 translate-y-5 pointer-events-none"
              style={{
                background: "#1b1b28",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="p-6 h-full flex flex-col justify-between">
                <div
                  className={`w-14 h-14 rounded-2xl bg-linear-to-br ${nextDev.color} flex items-center justify-center text-base font-bold`}
                >
                  {nextDev.avatar}
                </div>
                <div>
                  <p className="font-display font-bold text-lg">
                    {nextDev.name}
                  </p>
                  <p className="text-white/40 text-sm">{nextDev.role}</p>
                </div>
              </div>
            </div>

            <div
              className={`absolute inset-0 rounded-3xl card-border cursor-grab active:cursor-grabbing
                ${swipeDir === "left" ? "card-exit-left" : ""}
                ${swipeDir === "right" ? "card-exit-right" : ""}`}
              style={{ boxShadow: "0 0 50px rgba(139,92,246,.2)" }}
            >
              <div className="p-6 h-full flex flex-col justify-between font-body">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-linear-to-br ${dev.color} flex items-center justify-center text-base font-bold shadow-lg`}
                    >
                      {dev.avatar}
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/30 uppercase tracking-wide">
                        GitHub
                      </p>
                      <p className="text-sm font-medium text-emerald-400">
                        {dev.github}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-2xl leading-tight">
                      {dev.name}
                    </h3>
                    <p className="text-white/50 text-sm mt-0.5">{dev.role}</p>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed">
                    {dev.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {dev.stack.map((s) => (
                      <span
                        key={s}
                        className="tag text-violet-300 text-xs px-2.5 py-1 rounded-lg font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleSwipe("left")}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg transition-all hover:scale-110 active:scale-95 font-bold text-red-400"
                    style={{
                      background: "rgba(239,68,68,.1)",
                      border: "1px solid rgba(239,68,68,.22)",
                    }}
                  >
                    ✕
                  </button>
                  <button
                    onClick={() => handleSwipe("right")}
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95"
                    style={{
                      background: "rgba(34,197,94,.1)",
                      border: "1px solid rgba(34,197,94,.22)",
                    }}
                  >
                    ♥
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
