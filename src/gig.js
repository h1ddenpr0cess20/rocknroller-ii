import { createActors } from './actors.js';
import { createGig as create } from 'madness-engine/venue/gig';
import { loadVenue } from './venues/index.js';

export * from 'madness-engine/venue/gig';

/** What each kind of pickup does in this game. */
export const PICKUPS = Object.freeze({
  popcorn: { score: 1 },
  bucket: { score: 5 },
  tape: { heal: true },
  clapper: { revive: true },
  pass: { pass: true },
  reel: { token: true },
});

/** Starts set `index`. */
export const createGig = (GFX, index, options = {}) => create(GFX, index, { loadVenue, createActors, pickups: PICKUPS, ...options });

/** The rating inputs for this set as it stands. */
export const resultOf = (gig) => ({ smashed: gig.stats.smashed, foes: gig.stats.foes, reels: gig.stats.tokens });
