/**
 * The reels scripts/reel.js makes. Each is a soundtrack (a theme from the
 * game's music, the tempo to play it at, and the bar of the song to open on:
 * the chorus and the solo are full-band, the intro a build), a line to open
 * on, and clips cut on its bar lines: from a set (they count from 0), so many
 * bars long, the best stretch of it the autopilot played. Every one ends on
 * the card with the address.
 */

/** The premiere's brass and trumpet, from the solo into the last chorus: the band from the first beat. */
const FINALE = { theme: 'finale', tempo: 124, from: 40, lead: 0.12 };
/** The title theme's drive: piano, guitars and a saw lead. */
const DRIVE = { theme: 'hollywood', tempo: 128, from: 40, lead: 0.12 };

export const REELS = {
  tour: {
    hook: ['Rock goes Hollywood', 'smash your way through ten sets'],
    music: FINALE,
    // Four of the ten, the best each has to show, in order; the premiere to finish.
    clips: { from: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], take: 4, keep: [9], bars: 3 },
  },
  // The sets the tour reel doesn't show, two bars of the best of each: no boss fights, just rolling and smashing.
  gameplay: {
    hook: ['Run into people', "it's what rocks do"],
    music: DRIVE,
    clips: { from: [1, 2, 4, 5, 7, 8], take: 6, bars: 2 },
  },
};

/**
 * What each sound the game makes is worth to a reel: a number, or a function
 * of what it was called with. A smash says how hard it was. Falls and hurts
 * are worth less than nothing: they're no advert.
 */
export const WORTH = {
  smash: (grade) => ({ crit: 45, smash: 22, bonk: 6, tap: -2 })[grade] ?? 0,
  panel: 8,
  reel: 18,
  pass: 8,
  gate: 12,
  clapper: 6,
  tape: 3,
  popcorn: 3,
  retake: 10,
  bumper: 3,
  flash: 2,
  slam: (near) => (near ?? 0) * 1.5,
  burst: (near) => (near ?? 0) * 1.5,
  land: (speed) => Math.min(4, (speed ?? 0) * 0.4),
  locked: 1,
  clear: 20,
  zap: -12,
  fall: -12,
  hurt: -8,
  over: -30,
};

/** How long the card to end on stays up, in seconds. */
export const CARD = 4.6;

/** How long the opening line stays up, and when the address comes in under the HUD. */
export const HOOK = 2.4;
export const PILL = 2.7;
