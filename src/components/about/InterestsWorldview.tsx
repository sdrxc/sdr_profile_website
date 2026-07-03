"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { A380Outline, F1Outline } from "./VehicleOutlines";

/* ── Easter egg: Kafka's cockroach — scuttles, then ducks behind a card ── */
function KafkaRoach() {
  const [say, setSay] = useState(false);
  return (
    <>
      <motion.button
        aria-label="A cockroach"
        onClick={() => setSay((s) => !s)}
        className="text-base hover:!opacity-100"
        style={{ position: "absolute", top: 0 }}
        animate={{
          left: ["-4%", "30%", "55%", "104%"],
          top: ["2%", "40%", "70%", "92%"],
          zIndex: [20, 20, -1, -1, 20],
          opacity: [0.55, 0.55, 0.18, 0.18, 0.55],
          rotate: [0, 90, 20, 0],
        }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear", times: [0, 0.35, 0.42, 0.72] }}
      >
        🪳
      </motion.button>
      <AnimatePresence>
        {say && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 top-2 z-30 max-w-xs -translate-x-1/2 rounded-xl border border-white/10 bg-ink/95 px-4 py-2 text-center text-xs italic text-white/70 backdrop-blur"
          >
            “As Gregor Samsa awoke one morning, he found himself transformed into a monstrous vermin.”
            <span className="mt-1 block not-italic text-white/35">— Kafka, The Metamorphosis</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Sisyphus boulder loop ── */
function Sisyphus() {
  return (
    <div className="relative mt-4 h-16 overflow-hidden rounded-lg border border-white/10 bg-black/20">
      <div className="absolute bottom-2 left-3 right-3 h-px origin-left -rotate-6 bg-white/15" />
      <motion.span
        className="absolute bottom-3 left-4 text-lg"
        animate={{ x: [0, 160, 160], y: [0, -36, -36], opacity: [1, 1, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeIn", times: [0, 0.85, 1] }}
      >
        🪨
      </motion.span>
      <span className="absolute bottom-2 right-3 font-mono text-[10px] text-white/30">one must imagine Sisyphus happy</span>
    </div>
  );
}

/* ── Schrödinger's cat ── */
function SchrodingerCat() {
  const [observed, setObserved] = useState(false);
  const [alive, setAlive] = useState(true);
  const observe = () => {
    setAlive(Math.random() > 0.4);
    setObserved(true);
  };
  return (
    <button onClick={observe} className="mt-4 flex w-full items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3 text-left">
      {!observed ? (
        <>
          <motion.span className="text-2xl" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.6, repeat: Infinity }}>📦</motion.span>
          <span className="text-xs text-white/55">A cat is in this box — both alive &amp; dead.<span className="block text-neon-cyan">tap to observe →</span></span>
        </>
      ) : (
        <>
          <span className="text-2xl">{alive ? "😺" : "🙀"}</span>
          <span className="text-xs text-white/60">{alive ? "Alive — and judging you." : "...let's not observe that again."}<span className="block text-white/35">tap to re-collapse the wavefunction</span></span>
        </>
      )}
    </button>
  );
}

/* ── Rocket launch ── */
function Rocket() {
  const [n, setN] = useState(0);
  return (
    <div className="relative mt-4 flex h-16 items-end gap-3 overflow-hidden rounded-lg border border-white/10 bg-black/20 px-3">
      <motion.button
        key={n}
        onClick={() => setN((x) => x + 1)}
        className="text-2xl"
        initial={n === 0 ? false : { y: 0, opacity: 1 }}
        animate={n === 0 ? {} : { y: -90, opacity: [1, 1, 0] }}
        transition={{ duration: 1.6, ease: "easeIn" }}
      >
        🚀
      </motion.button>
      <span className="mb-2 font-mono text-[10px] text-white/35">T-10… tap for liftoff</span>
    </div>
  );
}

const ISMS: [string, string][] = [
  ["stoicism", "control what you can; shrug at the rest"],
  ["existentialism", "you are condemned to be free"],
  ["absurdism", "the universe shrugs; you keep going"],
  ["nihilism", "lol nothing matters (allegedly)"],
  ["capitalism", "line must go up"],
  ["socialism", "share the line"],
];

const VOICES: [string, string][] = [
  ["Camus", "One must imagine Sisyphus happy."],
  ["Nietzsche", "He who has a why to live can bear almost any how. (And: God is dead — and we have killed him.)"],
  ["Sartre", "Existence precedes essence. Also: hell is other people."],
  ["Kafka", "A book must be the axe for the frozen sea within us."],
];

function Voices() {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="mt-4">
      <p className="font-mono text-[10px] uppercase tracking-wider text-white/35">voices in my head</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {VOICES.map(([name], i) => (
          <button
            key={name}
            onClick={() => setPick((p) => (p === i ? null : i))}
            className={`rounded-md border px-2.5 py-1 text-xs transition-colors ${
              pick === i ? "border-violet-400/60 bg-violet-400/15 text-white" : "border-white/15 text-white/60 hover:text-white"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        {pick !== null && (
          <motion.p
            key={pick}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-sm italic text-white/75"
          >
            “{VOICES[pick][1]}” <span className="not-italic text-white/35">— {VOICES[pick][0]}</span>
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── full-width card ── */
function Card({
  icon,
  title,
  children,
  outline,
  outlineClassName = "bottom-0 right-0 w-1/2 opacity-[0.16]",
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
  outline?: React.ReactNode;
  outlineClassName?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="glass relative overflow-hidden rounded-3xl p-7 sm:p-9"
    >
      {outline && (
        <div className={`pointer-events-none absolute hidden sm:block ${outlineClassName}`}>{outline}</div>
      )}
      <div className="relative max-w-2xl">
        <h3 className="flex items-center gap-3 font-display text-xl font-bold text-white sm:text-2xl">
          <span className="text-2xl">{icon}</span>
          {title}
        </h3>
        <div className="mt-4 text-[15px] leading-relaxed text-white/65">{children}</div>
      </div>
    </motion.div>
  );
}

/* ── escalating scroll interjections ── */
function Interjection({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 18 }}
      className="py-3 text-center"
    >
      <p
        className={`font-mono text-xs tracking-wide ${dark ? "neon-flicker" : ""}`}
        style={{ color: dark ? "#ff5d7a" : "rgba(255,255,255,0.4)", textShadow: dark ? "0 0 14px rgba(255,45,85,0.6)" : undefined }}
      >
        {text}
      </p>
    </motion.div>
  );
}

export function InterestsWorldview() {
  return (
    <div className="relative">
      <KafkaRoach />

      <p className="flex items-center gap-3">
        {/* <span className="jp neon-pink-text text-2xl leading-none">興味</span> */}
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-neon-cyan">interests &amp; worldview</span>
      </p>
      <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-white">
        {/* Curiosity, engineering &amp; nonsense */}
        Welcome to Mann's Planet
      </h2>
      <p className="mt-1 text-sm text-white/45">An alternate universe where engineering, philosophy, and professional nonsense coexist in unstable equilibrium</p>

      <div className="mt-8 space-y-6">
        {/* Transportation */}
        <Card icon="🚄" title="Transportation Nerdism" outline={<A380Outline />} outlineClassName="-bottom-3 -right-4 w-[78%] opacity-[0.2]">
          <p>
            A certified sucker for trains, aircraft, and anything that moves humans faster than common sense would
            suggest. Plane-spotting is a legitimate hobby — and yes, I check the aircraft type before booking. ✈️ It matters.
          </p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wider text-white/40">aircraft hierarchy</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs">
            {["A380", "A350", "777X", "everything else"].map((a, i) => (
              <span key={a} className="flex items-center gap-1.5">
                <span className="rounded-md border border-cyan-400/30 bg-cyan-400/10 px-2 py-0.5 text-cyan-200">{a}</span>
                {i < 3 && <span className="text-white/30">›</span>}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-white/55">
            <span className="text-white/40">dream rides (not ridden yet):</span> Shinkansen Hayabusa · Maglev · TGV.
            The bucket list remains aggressively optimistic. 🚄
          </p>
        </Card>


        {/* Formula 1 */}
        <Card icon="🏎️" title="Formula 1" outline={<F1Outline />}>
          <p>
            A recent addition to the obsessions. Still learning the sport, but already hooked on the absurd combination
            of engineering brilliance, strategy, and controlled chaos.
          </p>
          <p className="mt-4 font-mono text-xs text-white/35">// lights out and away we go</p>
        </Card>

        {/* <Interjection text="↓ want more? there's plenty where that came from 👀" /> */}

        {/* Spaceflight */}
        <Card icon="🌌" title="Spaceflight &amp; Rockets">
          <p>
            The type who&apos;ll happily spend an evening on rocket launches, booster landings, and arguing humanity&apos;s
            odds of going multi-planetary. 🚀
          </p>
          <Rocket />
        </Card>
        <Interjection text="↓ still scrolling? seems like you're actually interested…" />

        {/* Philosophy */}
        <Card icon="📚" title="Books, Philosophy &amp; Theology">
          <p>
            Drawn to ideas that shaped civilizations and arguments that survived centuries. I enjoy every imaginable
            <span className="text-white"> -ism</span> — and the occasional 2 A.M. philosophy that shows up uninvited.
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {ISMS.map(([k, v]) => (
              <span key={k} title={v} className="cursor-help rounded-md border border-amber-400/30 bg-amber-400/10 px-2 py-0.5 text-xs text-amber-200">
                {k}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-white/55">I avoid the “do we really exist?” rabbit hole — Descartes already did the paperwork:</p>
          <p className="mt-1 text-base italic text-white/75">“Cogito, ergo sum.” <span className="text-white/40">— I think, therefore I am.</span></p>
          <Voices />
          <Sisyphus />
        </Card>


        <Interjection text="↓ okay… you're seriously into me now, huh?" />


        {/* Cats */}
        <Card icon="🐱" title="Cats — the Gato Appreciation Society">
          <p>
            Absolutely adore cats. Cannot responsibly own one. A blend of laziness, questionable responsibility, and
            self-awareness says one chaotic, mildly toxic creature under the roof is already plenty. 🐈
          </p>
          <SchrodingerCat />
        </Card>

        <Interjection dark text="⚠ dark thoughts ahead. beware. 🕳️" />


        {/* Worldview */}
        <Card icon="🧭" title="Worldview">
          <p>
            Curiosity is one of humanity&apos;s most underrated superpowers. The world gets far more interesting when you
            ask questions, read things you disagree with, and fall down rabbit holes that begin with high-speed rail and
            end in medieval theology.
          </p>
          <p className="mt-3">Most debates eventually reach the same robust conclusion:</p>
          <p className="mt-1 font-display text-xl font-bold neon-cyan-text">“It is what it is.”</p>
          <p className="mt-3">And one personal principle no serious school endorses:</p>
          <p className="mt-1 text-lg font-semibold text-white" lang="hi">“भकचोदी परमो धर्मः”</p>
          <p className="text-xs italic text-white/40">Shenanigans are the highest virtue.</p>
          {/* <p className="mt-3 text-sm text-white/50">
            At the intersection of engineering, philosophy, and chaos, you&apos;ll usually find me — wondering how things
            work, why they exist, and whether my next flight is an A350.
          </p> */}
        </Card>

        <Interjection text="↓ you scrolled the whole thing. genuinely — respect. 🫡" />
      </div>
    </div>
  );
}
