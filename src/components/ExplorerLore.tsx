"use client";

import { motion } from "framer-motion";

const TEAL = "#2dd4bf";

/** The "world as data" manifesto. */
export function ExplorerManifesto() {
  const lines = [
    "Every city is a dataset.",
    "Every street is an unindexed document.",
    "Every conversation is new training data.",
  ];
  return (
    <div className="mx-auto max-w-2xl text-center">
      {lines.map((l, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.18 }}
          className="font-mono text-sm text-white/55 sm:text-base"
        >
          {l}
        </motion.p>
      ))}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-4 font-display text-xl font-bold sm:text-2xl"
        style={{ color: TEAL, textShadow: `0 0 20px ${TEAL}66` }}
      >
        And the world remains my favorite search engine.
      </motion.p>
    </div>
  );
}

/* tiny syntax helpers */
const C = ({ children }: { children: React.ReactNode }) => <span className="text-white/35">{children}</span>; // comment
const K = ({ children }: { children: React.ReactNode }) => <span className="text-fuchsia-400">{children}</span>; // keyword
const F = ({ children }: { children: React.ReactNode }) => <span className="text-cyan-300">{children}</span>; // fn
const Y = ({ children }: { children: React.ReactNode }) => <span className="text-teal-300">{children}</span>; // yaml key

/** A terminal window with the traveller's "source code". */
export function ExplorerTerminal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a0f0e] shadow-[0_0_40px_-12px_rgba(45,212,191,0.5)]"
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-amber-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-2 font-mono text-xs text-white/40">explorer@earth: ~/world</span>
      </div>

      <div className="overflow-x-auto p-5 font-mono text-[12px] leading-relaxed text-white/80 sm:text-[13px]">
        {/* mission.yaml — valid YAML */}
        <div><span className="text-emerald-400">$</span> cat mission.yaml</div>
        <div><Y>mission</Y>:</div>
        <div className="pl-4">- visit_new_places</div>
        <div className="pl-4">- meet_interesting_people</div>
        <div className="pl-4">- collect_absurd_stories</div>
        <div><Y>termination_condition</Y>: <span className="text-amber-300">null</span> <C># there is none</C></div>

        <div className="h-3" />
        {/* explore.py — valid Python */}
        <div><span className="text-emerald-400">$</span> cat explore.py</div>
        <div>visited = <F>set</F>()</div>
        <div className="h-2" />
        <div><K>def</K> <F>dfs</F>(place):</div>
        <div className="pl-4">visited.<F>add</F>(place)</div>
        <div className="pl-4"><K>for</K> neighbor <K>in</K> place.neighbors:</div>
        <div className="pl-8"><K>if</K> neighbor <K>not in</K> visited:</div>
        <div className="pl-12"><F>dfs</F>(neighbor)</div>
        <div className="h-2" />
        <div><K>def</K> <F>explore</F>():</div>
        <div className="pl-4"><F>dfs</F>(world.here)</div>
        <div className="h-2" />
        <div><C># the only loop that matters</C></div>
        <div><K>while</K> alive:</div>
        <div className="pl-4"><F>explore</F>()</div>

        <div className="h-3" />
        <div><span className="text-emerald-400">$</span> git checkout <span className="text-amber-300">somewhere-new</span></div>
        <div><span className="text-emerald-400">$</span> python explore.py</div>

        <div className="mt-1 flex">
          <span className="text-emerald-400">$</span>
          <motion.span
            className="ml-2 inline-block h-4 w-2 bg-teal-300/80"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      </div>
    </motion.div>
  );
}
