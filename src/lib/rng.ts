/**
 * Deterministic seeded PRNG (mulberry32). Same seed → same sequence on both
 * server and client, so ambient animations don't trigger hydration mismatches.
 */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Build an array of `n` deterministic pseudo-random values in [0,1). */
export function seeded(n: number, seed = 1): number[] {
  const rng = mulberry32(seed);
  return Array.from({ length: n }, () => rng());
}

/** Linear interpolation helper. */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
