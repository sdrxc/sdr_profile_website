import type { Chapter, Scene } from "../types";
import { ArrivalScene } from "./ArrivalScene";
import { RailsScene } from "./RailsScene";
import { FormulaScene } from "./FormulaScene";
import { RocketScene } from "./RocketScene";
import { BooksScene } from "./BooksScene";
import { CatsScene } from "./CatsScene";
import { SkydiveScene } from "./SkydiveScene";
import { CompassScene } from "./CompassScene";

/* ──────────────────────────────────────────────────────────────────────────
   Scene registry — the single source of truth for the journey.

   To add a new stop:
     1. Create a `<Name>Scene.tsx` in this folder. Its <section> must have an
        `id` that matches the `id` below (used for scroll-spy + jump).
     2. Add one entry here with the next `num`, a `label`, and the Component.

   The chapter rail, top progress bar, scroll-spy, and render order all derive
   from this array — nothing else needs to change.
   ────────────────────────────────────────────────────────────────────────── */

export const SCENES: Scene[] = [
  { id: "arrive", num: "00", label: "Arrival", Component: ArrivalScene },
  { id: "rails", num: "01", label: "Rails & Sky", Component: RailsScene },
  { id: "f1", num: "02", label: "Lights Out", Component: FormulaScene },
  { id: "rockets", num: "03", label: "Liftoff", Component: RocketScene },
  { id: "books", num: "04", label: "Margin Notes", Component: BooksScene },
  { id: "cats", num: "05", label: "Cat in a Box", Component: CatsScene },
  { id: "skydive", num: "06", label: "Free Fall", Component: SkydiveScene },
  { id: "compass", num: "07", label: "Compass Point", Component: CompassScene },
];

/** Lightweight chapter list (no components) for the navigation rail. */
export const CHAPTERS: Chapter[] = SCENES.map(({ id, num, label }) => ({ id, num, label }));
