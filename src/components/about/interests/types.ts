import type { ComponentType } from "react";

/* A chapter's identity in the navigation rail / progress tracking. */
export type Chapter = {
  /** DOM id of the scene's <section>; also used for scroll-spy + jump. */
  id: string;
  /** Two-digit ordinal shown in the rail and chapter label (e.g. "01"). */
  num: string;
  /** Human-readable name shown in the rail flyout. */
  label: string;
};

/* A full scene = its chapter identity + the component that renders it.
   Register one of these in `scenes/index.ts` to add a new stop to the
   journey — the rail, progress bar, and scroll-spy all derive from it. */
export type Scene = Chapter & {
  Component: ComponentType;
};
