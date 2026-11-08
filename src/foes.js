import { CAST } from './models/cast/index.js';
import { isBaked, ready } from './models/library.js';
import { createFoeMeshes } from 'madness-engine/venue/foemesh';

/**
 * Who is in the way: the annoying people you find on a film set, and in the
 * pictures being shot on it. Each has how it gets about — `walk` (pushed
 * over the floor as Rock is, and after him when he comes near), `crawl`
 * (round a set loop on the floor) or `fly` (round a set loop above
 * everyone's heads, over gaps and all, on a wire if need be) — and how it
 * takes being rolled over:
 *
 *   `toughness`  the speed (tiles a second) Rock has to hit it at to smash it
 *                in one go. Slower and it only gets knocked about: it takes
 *                that much of its `hp` and Rock takes some of its `power`.
 *   `power`      how much it hurts to bounce off it.
 *   `hype`       what smashing it is worth.
 *   `hp`         (a boss) how much it takes in all.
 *   `tactic`     (a boss) what it does besides come at Rock: `lunge` (every
 *                so often a sudden rush), `tempo` (it moves on the beat:
 *                still, then a surge) or `stomp` (it stops, stamps, and the
 *                floor throws Rock back).
 *
 * How each one looks is its model (models/cast/): sculpted in code, baked in
 * the background as the page loads.
 */

export const FOES = Object.freeze({
  // The crew, and the hopefuls.
  extra: { name: 'Extra', blurb: 'Background artist number 212. Has been told to look busy. Is looking busy.', move: 'walk', toughness: 3, power: 3, hype: 30, radius: 0.37, speed: 3.6 },
  pa: { name: 'Production Assistant', blurb: 'A headset, a clipboard and no authority. Says "copy" a lot.', move: 'walk', toughness: 4, power: 4, hype: 50, radius: 0.37, speed: 4.4 },
  paparazzo: { name: 'Paparazzo', blurb: 'Got your good side. You do not have a good side.', move: 'walk', toughness: 4, power: 4, hype: 50, radius: 0.37, speed: 3.4, flash: true },
  tourist: { name: 'Studio Tourist', blurb: 'Paid for the tram tour. Got off the tram.', move: 'walk', toughness: 4, power: 3, hype: 40, radius: 0.39, speed: 2.4 },
  fan: { name: 'Autograph Hunter', blurb: 'Has a pen, a book and your face on a T-shirt. It is not your face.', move: 'walk', toughness: 4, power: 3, hype: 50, radius: 0.34, speed: 4.4, shout: 'SIGN IT!' },
  agent: { name: 'Agent', blurb: 'Ten percent of everything. Including you.', move: 'walk', toughness: 6, power: 6, hype: 80, radius: 0.37, speed: 3.2 },
  makeup: { name: 'Make-up Artist', blurb: 'You are shiny. Hold still.', move: 'walk', toughness: 4, power: 4, hype: 50, radius: 0.34, speed: 3.8 },
  critic: { name: 'Film Critic', blurb: 'Has seen it. Has notes. Has one star for you.', move: 'walk', toughness: 6, power: 7, hype: 90, radius: 0.37, speed: 3.0, shout: '★☆☆☆☆' },
  influencer: { name: 'Influencer', blurb: 'Here for the premiere. Not for the picture.', move: 'walk', toughness: 4, power: 4, hype: 60, radius: 0.34, speed: 3.6, flash: true },
  usher: { name: 'Usher', blurb: 'Phones off. Feet off the seats. Boulders off the carpet.', move: 'walk', toughness: 5, power: 5, hype: 60, radius: 0.37, speed: 3.4 },
  security: { name: 'Studio Security', blurb: 'Has a golf cart and a radio. Is using the radio.', move: 'walk', toughness: 9, power: 9, hype: 140, radius: 0.49, speed: 2.8 },
  bouncer: { name: 'Doorman', blurb: 'Your name is not on the list. Nobody\'s name is on the list.', move: 'walk', toughness: 10, power: 11, hype: 160, radius: 0.51, speed: 2.6 },
  mascot: { name: 'Costume Character', blurb: 'Studio tour. Wants a hug. Wants a photo of the hug.', move: 'walk', toughness: 9, power: 3, hype: 150, radius: 0.61, speed: 2.4 },
  stuntman: { name: 'Stunt Double', blurb: 'Falls off things for a living. Will fall off you.', move: 'walk', toughness: 7, power: 7, hype: 100, radius: 0.41, speed: 4.2 },
  // In the pictures.
  cowboy: { name: 'Cowboy', blurb: 'Fastest draw on the lot. Draws a salary.', move: 'walk', toughness: 5, power: 5, hype: 60, radius: 0.37, speed: 3.6, shout: 'YEEHAW!' },
  drunk: { name: 'Saloon Extra', blurb: 'Was told the whiskey was cold tea. It was not.', move: 'walk', toughness: 4, power: 4, hype: 50, radius: 0.37, speed: 2.0, wobble: 1 },
  horse: { name: 'Pantomime Horse', blurb: 'Two men, one horse, no plan.', move: 'walk', toughness: 6, power: 5, hype: 90, radius: 0.55, speed: 3.0 },
  dancer: { name: 'Hoofer', blurb: 'Five, six, seven, eight. And again. And again.', move: 'walk', toughness: 5, power: 4, hype: 60, radius: 0.36, speed: 4.0 },
  robot: { name: 'Tin Robot', blurb: 'Beep. Boop. Union break in five.', move: 'walk', toughness: 7, power: 7, hype: 100, radius: 0.43, speed: 2.2 },
  alien: { name: 'Rubber Alien', blurb: 'Three eyes, two antennae and a card from the actors\' union.', move: 'walk', toughness: 5, power: 5, hype: 70, radius: 0.39, speed: 3.0 },
  drone: { name: 'Camera Drone', blurb: 'Getting the aerial shot. You are now the aerial shot.', move: 'fly', toughness: 5, power: 5, hype: 80, radius: 0.39, speed: 2.4 },
  zombie: { name: 'Zombie Extra', blurb: 'In make-up since four. Hungry. For craft services.', move: 'walk', toughness: 5, power: 5, hype: 60, radius: 0.37, speed: 1.9, wobble: 0.6 },
  mummy: { name: 'The Mummy', blurb: 'Wrapped since Tuesday. Coming undone.', move: 'walk', toughness: 6, power: 6, hype: 80, radius: 0.39, speed: 1.8 },
  bat: { name: 'Rubber Bat', blurb: 'On a wire. Mostly.', move: 'fly', toughness: 3, power: 3, hype: 50, radius: 0.34, speed: 3.0 },
  gangster: { name: 'Hood', blurb: 'Pinstripes, a fedora and a violin case. He does not play.', move: 'walk', toughness: 6, power: 6, hype: 80, radius: 0.37, speed: 3.2 },
  goon: { name: 'Muscle', blurb: 'Mr. Big\'s. Does not talk. Does not need to.', move: 'walk', toughness: 9, power: 9, hype: 140, radius: 0.49, speed: 2.6 },
  cop: { name: 'Flatfoot', blurb: 'Has a nightstick and a hunch.', move: 'walk', toughness: 6, power: 6, hype: 80, radius: 0.37, speed: 3.4, shout: 'FREEZE!' },
  dame: { name: 'The Dame', blurb: 'Walked in out of the rain. Trouble walked in behind her.', move: 'walk', toughness: 5, power: 7, hype: 90, radius: 0.34, speed: 3.0 },
  newsie: { name: 'Newsie', blurb: 'Read all about it. It is about you.', move: 'walk', toughness: 3, power: 3, hype: 40, radius: 0.29, speed: 4.6, shout: 'EXTRA! EXTRA!' },
  pirate: { name: 'Pirate Extra', blurb: 'Has been saying "arr" since eight this morning. Cannot stop.', move: 'walk', toughness: 5, power: 5, hype: 60, radius: 0.37, speed: 3.4, shout: 'ARR!' },
  parrot: { name: 'Animatronic Parrot', blurb: 'Squawks its lines. Better than the leads.', move: 'fly', toughness: 3, power: 3, hype: 60, radius: 0.32, speed: 2.8, shout: 'SQUAWK!' },
  // The ones who run the picture.
  director: { name: 'The Director', blurb: 'Wants it again. Bigger. With feeling. Lunges for the close-up.', move: 'walk', toughness: 9, power: 9, hype: 600, radius: 0.85, speed: 1.6, boss: true, hp: 50, tactic: 'lunge' },
  mrbig: { name: 'Mr. Big', blurb: 'Runs the docks, the cops and the rain. Moves only on the beat.', move: 'walk', toughness: 9, power: 9, hype: 800, radius: 0.85, speed: 1.8, boss: true, hp: 56, tactic: 'tempo' },
  mogul: { name: 'The Mogul', blurb: 'Owns the studio, the lot and the rights to your face. Stamps.', move: 'walk', toughness: 10, power: 12, hype: 1500, radius: 1.04, speed: 1.6, boss: true, hp: 70, tactic: 'stomp' },
});

export { BOARD_DETAIL, FLIGHT, KNOCKED_OUT, STRIKE } from 'madness-engine/venue/foemesh';

/** A foe to look at: the engine's mesh, with this game's roster and cast. */
export const { createFoeMesh } = createFoeMeshes({ foes: FOES, cast: CAST, isBaked, ready });
