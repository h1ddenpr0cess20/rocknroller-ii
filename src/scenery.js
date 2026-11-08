import { bill } from 'madness-engine/textures/venue';
import { createExit as exit } from 'madness-engine/venue/scenery';

export { createVenueMeshes } from 'madness-engine/venue/scenery';

// The studio's posters: the pictures it has made, and the one Rock is making, coming soon.
bill({
  bands: ['LIKE A ROCK', 'HOLLYWOOD NIGHTS', 'THE MALTESE PEBBLE', 'A FISTFUL OF GRAVEL', 'STONE COLD', 'GONE WITH THE GRIND', 'ROCKY ROAD', 'THE BIG ROLL', 'GRANITE', 'SLAB', 'NIGHT MOVES', 'CITIZEN QUARRY'],
  headline: 'LIKE A ROCK',
  badge: 'SOON',
});

/** The way out of a set: the engine's frame with a lit sign, with this game's words on it. */
export const createExit = (GFX, venue, options = {}) => exit(GFX, venue, { signs: { exit: 'CUT', last: 'THE END' }, ...options });
