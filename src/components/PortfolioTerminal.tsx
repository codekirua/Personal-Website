import React, { useEffect, useMemo, useRef, useState } from "react";

const SITE = {
  name: "Keto Khamkhounmavong",
  title: "Comp-Sci Student at MRU",
  email: "kkham944@mtroyal.ca",
  location: "Calgary, AB",
  socials: {
    github: "https://github.com/codekirua",
    linkedin: "https://www.linkedin.com/in/keto-khamkhounmavong/",
  },
  projects: [
    {
      name: "Portfolio Terminal",
      link: "https://github.com/codekirua/Personal-Website",
      description: "Interactive terminal-style portfolio.",
      tech: ["Front-End Development", "React", "Tailwind", "JavaScript"],
    },
    {
      name: "Study App",
      link: "https://github.com/codekirua/Study-App",
      description: "A comprehensive study application for managing notes and learning materials.",
      tech: ["Front-End Development", "Back-End Development", "JavaScript", "React", "Next.js", "Vercel"],
    }
  ],
  skills: [
    "Python", "JavaScript", "TypeScript", "React", "Next.js", "Node.js", "FastAPI", "PyTorch", "Transformers", "Docker", "AWS", "Git", "Linux",
    "AI/ML", "Software Development & Engineering", "Front-End Development", "Back-End Development", "Full Stack Development", "Cybersecurity", "Cloud Engineering"
  ],
  experience: [
    {
      role: "Student",
      company: "Mount Royal University",
      time: "Present",
      bullets: [
        "Currently studying Computer Science.",
        "Building personal projects and learning software + AI engineering."
      ],
    },
  ],
};

const COMMANDS_HELP = {
  help: "List available commands",
  about: "About me",
  projects: "View projects",
  skills: "List skills",
  experience: "Experience timeline",
  contact: "Contact information",
  socials: "Links to GitHub and LinkedIn",
  theme: "Toggle light/dark mode",
  clear: "Clear the terminal",
};

export default function PortfolioTerminal() {
  const [theme, setTheme] = useState("dark");
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);
  const isLight = theme === "light";
  const prompt = useMemo(() => <span className={isLight ? "text-cyan-100" : "text-cyan-300"}>user@portfolio</span>, [isLight]);

  useEffect(() => {
    setLines([{ id: 1, html: <div className="text-white">Welcome! Type <kbd className="bg-white/20 px-1">help</kbd> to begin.</div> }]);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function navBar() {
    return (
      <div className="flex flex-wrap gap-2 mb-2">
        {Object.keys(COMMANDS_HELP).map((cmd) => (
          <span key={cmd} className="rounded border border-white/30 px-2 py-1 text-xs text-white/90 select-text" title={COMMANDS_HELP[cmd]}>
            {cmd}
          </span>
        ))}
      </div>
    );
  }

  function run(cmd) {
    let output;
    switch (cmd.trim().toLowerCase()) {
      case "help":
        output = (
          <ul className="list-disc list-inside">
            {Object.entries(COMMANDS_HELP).map(([c, desc]) => (
              <li key={c}><span className={isLight ? "text-blue-400" : "text-yellow-400"}>{c}</span> — {desc}</li>
            ))}
          </ul>
        );
        break;
      case "about":
        output = (
          <>
            Hi, I'm <span className="font-medium">Keto Khamkhounmavong</span> — a Computer Science student at Mount Royal University in Calgary, AB. I build clean, pragmatic software and explore the frontiers of AI and Machine Learning, but my love for coding runs deeper than just cutting-edge tech. I enjoy the craft of turning abstract ideas into something tangible — solving puzzles, architecting systems, and creating tools that make life smoother.
            <br /><br />
            Coffee fuels that process for me — it's not just caffeine, it's the quiet ritual that sharpens my focus and kicks off problem-solving marathons. Formula 1 inspires me for the same reason I love engineering: it's the perfect blend of speed, precision, and relentless iteration. Away from the keyboard, you'll find me hunting down great food in Calgary or under the hood of a project car, applying the same principle I bring to code: refine every detail until it performs beautifully.
            <br /><br />
            Want to connect? Just type <span className="bg-white/20 px-1 rounded text-sm">"socials"</span> or <span className="bg-white/20 px-1 rounded text-sm">\"contact"</span> and I'll point you in the right direction.
          </>
        );
        break;
      case "projects":
        output = (
          <div className="space-y-3">
            {SITE.projects.map((p, i) => (
              <div key={i} className="rounded border border-white/25 p-3 bg-white/10">
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline text-white">{p.name}</a>
                <div className="text-white/80 mt-1">{p.description}</div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {p.tech.map((tech, j) => (
                    <span key={j} className="text-xs bg-white/20 px-2 py-1 rounded">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {SITE.skills.map((skill, i) => (
              <span key={i} className="text-sm bg-white/10 px-2 py-1 rounded border border-white/20">{skill}</span>
            ))}
          </div>
        );
        break;
      case "experience":
        output = (
          <div className="space-y-3">
            {SITE.experience.map((x, i) => (
              <div key={i} className="border border-white/25 rounded p-3 bg-white/10">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-white">{x.role} · {x.company}</div>
                  <div className="text-white/70 text-sm">{x.time}</div>
                </div>
                <ul className="list-disc list-inside mt-1 text-white/85">
                  {x.bullets.map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="space-y-2">
            <div>📧 Email: <a href={`mailto:${SITE.email}`} className="underline hover:text-white/80">{SITE.email}</a></div>
            <div>📍 Location: {SITE.location}</div>
            <div>📄 Resume: <a href="https://tinyurl.com/keto-resume" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">View Resume</a></div>
          </div>
        );
        break;
      case "socials":
        output = (
          <div className="space-y-2">
            <div>🐙 GitHub: <a href={SITE.socials.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">{SITE.socials.github}</a></div>
            <div>💼 LinkedIn: <a href={SITE.socials.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-white/80">{SITE.socials.linkedin}</a></div>
          </div>
        );
        break;
      case "theme":
        setTheme(isLight ? "dark" : "light");
        output = <div>Theme toggled to {isLight ? "dark" : "light"} mode.</div>;
        break;
      case "clear":
        setLines([]);
        return;
      default:
        output = <div>Command not found: <span className="text-red-400">{cmd}</span>. Type <kbd className="bg-white/20 px-1">help</kbd> for available commands.</div>;
    }
    setLines((prev) => [...prev, { id: Math.random(), html: output }]);
  }

  return (
    <div className="min-h-screen relative text-white">
      <div
        aria-hidden
        className={`theme-layer pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000 ease-[cubic-bezier(.22,.61,.36,1)] ${isLight ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: `linear-gradient(135deg, #1e3a8a 0%, #3b82f6 55%, #60a5fa 100%)`,
          animation: "pulse 12s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden
        className={`theme-layer pointer-events-none fixed inset-0 -z-10 transition-opacity duration-1000 ease-[cubic-bezier(.22,.61,.36,1)] ${!isLight ? "opacity-100" : "opacity-0"}`}
        style={{
          backgroundImage: `linear-gradient(180deg, #0b132b 0%, #1c2541 60%, #3a506b 100%)`,
          animation: "pulse 12s ease-in-out infinite",
        }}
      />

      <main className="relative mx-auto max-w-3xl px-4 py-10 transition-colors duration-1000 ease-[cubic-bezier(.22,.61,.36,1)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{SITE.name}</h1>
            <p className="text-white/80">{SITE.title}</p>
          </div>
          <button 
            onClick={() => setTheme(isLight ? "dark" : "light")} 
            className="rounded-lg border border-white/30 px-3 py-1 text-sm hover:bg-white/10 transition-colors"
          >
            {isLight ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>

        <div className="rounded-2xl border-2 border-white/50 backdrop-blur-xl shadow-2xl bg-black/30">
          <div className="flex gap-2 mb-3 px-4 pt-4">
            <span className="w-3 h-3 rounded-full shadow" style={{ backgroundColor: "#ff5f56" }}></span>
            <span className="w-3 h-3 rounded-full shadow" style={{ backgroundColor: "#ffbd2e" }}></span>
            <span className="w-3 h-3 rounded-full shadow" style={{ backgroundColor: "#27c93f" }}></span>
          </div>

          <div className="px-4 py-4 space-y-2 text-sm">
            {navBar()}
            {lines.map(l => <div key={l.id}>{l.html}</div>)}
            <form onSubmit={e => { e.preventDefault(); run(value); setValue(""); }} className="mt-2 flex items-center gap-2 text-sm">
              <span>{prompt}</span>
              <span className="text-white/70">:~$</span>
              <input 
                ref={inputRef} 
                value={value} 
                onChange={e => setValue(e.target.value)} 
                className="flex-1 bg-transparent outline-none placeholder:text-white/40" 
                placeholder="Type a command, e.g. 'help'" 
                autoComplete="off"
              />
            </form>
            <div ref={bottomRef} />
          </div>
        </div>
      </main>

      <style>{`
        @keyframes pulse { 0% { filter: brightness(1); } 50% { filter: brightness(1.05); } 100% { filter: brightness(1); } }
        @media (prefers-reduced-motion: reduce) { .theme-layer { transition: none !important; animation: none !important; } }
      `}</style>
    </div>
  );
}
