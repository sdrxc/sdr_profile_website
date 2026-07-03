"use client";

import { useCallback, useEffect, useState } from "react";

type Country = { flag: string; name: string };

const COUNTRIES: Country[] = [
  { flag: "🇮🇳", name: "India" },
  { flag: "🇯🇵", name: "Japan" },
  { flag: "🇺🇸", name: "United States" },
  { flag: "🇧🇷", name: "Brazil" },
  { flag: "🇫🇷", name: "France" },
  { flag: "🇩🇪", name: "Germany" },
  { flag: "🇬🇧", name: "United Kingdom" },
  { flag: "🇨🇦", name: "Canada" },
  { flag: "🇦🇺", name: "Australia" },
  { flag: "🇲🇽", name: "Mexico" },
  { flag: "🇮🇹", name: "Italy" },
  { flag: "🇪🇸", name: "Spain" },
  { flag: "🇨🇳", name: "China" },
  { flag: "🇰🇷", name: "South Korea" },
  { flag: "🇸🇬", name: "Singapore" },
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇦🇷", name: "Argentina" },
  { flag: "🇷🇺", name: "Russia" },
  { flag: "🇳🇱", name: "Netherlands" },
  { flag: "🇸🇪", name: "Sweden" },
  { flag: "🇳🇴", name: "Norway" },
  { flag: "🇨🇭", name: "Switzerland" },
  { flag: "🇧🇪", name: "Belgium" },
  { flag: "🇵🇹", name: "Portugal" },
  { flag: "🇬🇷", name: "Greece" },
  { flag: "🇹🇷", name: "Türkiye" },
  { flag: "🇪🇬", name: "Egypt" },
  { flag: "🇰🇪", name: "Kenya" },
  { flag: "🇳🇬", name: "Nigeria" },
  { flag: "🇲🇦", name: "Morocco" },
  { flag: "🇨🇱", name: "Chile" },
  { flag: "🇵🇪", name: "Peru" },
  { flag: "🇨🇴", name: "Colombia" },
  { flag: "🇮🇩", name: "Indonesia" },
  { flag: "🇹🇭", name: "Thailand" },
  { flag: "🇻🇳", name: "Vietnam" },
  { flag: "🇵🇭", name: "Philippines" },
  { flag: "🇲🇾", name: "Malaysia" },
  { flag: "🇵🇰", name: "Pakistan" },
  { flag: "🇧🇩", name: "Bangladesh" },
  { flag: "🇱🇰", name: "Sri Lanka" },
  { flag: "🇳🇵", name: "Nepal" },
  { flag: "🇮🇪", name: "Ireland" },
  { flag: "🇫🇮", name: "Finland" },
  { flag: "🇩🇰", name: "Denmark" },
  { flag: "🇵🇱", name: "Poland" },
  { flag: "🇨🇿", name: "Czechia" },
  { flag: "🇭🇺", name: "Hungary" },
  { flag: "🇮🇸", name: "Iceland" },
  { flag: "🇦🇪", name: "United Arab Emirates" },
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇮🇱", name: "Israel" },
  { flag: "🇶🇦", name: "Qatar" },
  { flag: "🇳🇿", name: "New Zealand" },
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type Round = { answer: Country; choices: Country[] };

function makeRound(prev?: Country): Round {
  let answer = prev;
  while (!answer || answer === prev) {
    answer = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)];
  }
  const distractors = shuffle(COUNTRIES.filter((c) => c.name !== answer!.name)).slice(0, 3);
  return { answer: answer!, choices: shuffle([answer!, ...distractors]) };
}

export function FlagGuess() {
  const [round, setRound] = useState<Round>(() => makeRound());
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    setBest(Number(localStorage.getItem("flag-best") || 0));
  }, []);

  const pick = (name: string) => {
    if (picked) return;
    setPicked(name);
    if (name === round.answer.name) {
      const gain = 10 + streak * 2;
      const ns = score + gain;
      setScore(ns);
      setStreak((s) => s + 1);
      setBest((b) => {
        const nb = Math.max(b, ns);
        localStorage.setItem("flag-best", String(nb));
        return nb;
      });
    } else {
      setStreak(0);
    }
  };

  const next = useCallback(() => {
    setRound(makeRound(round.answer));
    setPicked(null);
  }, [round.answer]);

  const correct = picked === round.answer.name;

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div
        className="overflow-hidden rounded-2xl border-2 border-neon-cyan/40 bg-black/60 p-6 backdrop-blur sm:p-8"
        style={{ boxShadow: "0 0 40px -8px rgba(0,240,255,0.5)" }}
      >
        <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-white/55">
          <span>Score <span className="text-neon-cyan">{score}</span></span>
          <span>Streak <span className="text-neon-pink">×{streak}</span></span>
          <span>Best <span className="text-white/80">{best}</span></span>
        </div>

        <div className="my-6 grid place-items-center">
          <div className="text-[7rem] leading-none drop-shadow-[0_8px_24px_rgba(0,240,255,0.45)] sm:text-[9rem]">
            {round.answer.flag}
          </div>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-neon-pink">
            ▸ name this country ◂
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {round.choices.map((c) => {
            const isAnswer = c.name === round.answer.name;
            const isPicked = c.name === picked;
            const cls = !picked
              ? "border-white/15 bg-white/5 text-white/85 hover:border-neon-cyan/50 hover:bg-neon-cyan/5"
              : isAnswer
                ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                : isPicked
                  ? "border-rose-400/60 bg-rose-400/10 text-rose-200"
                  : "border-white/10 bg-white/[0.02] text-white/40";
            return (
              <button
                key={c.name}
                onClick={() => pick(c.name)}
                disabled={!!picked}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${cls}`}
              >
                {c.name}
              </button>
            );
          })}
        </div>

        {picked && (
          <div className="mt-5 text-center">
            <p className="font-mono text-sm">
              {correct ? (
                <span className="text-emerald-300">✓ Correct! +{10 + (streak - 1) * 2}</span>
              ) : (
                <span className="text-rose-300">
                  ✗ Nope — it&apos;s <span className="text-white">{round.answer.name}</span>
                </span>
              )}
            </p>
            <button
              onClick={next}
              className="mt-4 rounded-lg border border-fuchsia-400/40 bg-fuchsia-500/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fuchsia-200 hover:bg-fuchsia-500/20"
            >
              Next flag →
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-[10px] text-white/30">
          Flags render via your OS emoji set — best on macOS, iOS, Android or Firefox.
        </p>
      </div>
    </div>
  );
}
