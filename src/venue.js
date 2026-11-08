import { Venue as Base } from 'madness-engine/venue/venue';

export * from 'madness-engine/venue/venue';

/** The studio's venue: the engine's, with this game's names for what lies about on a set. */
export class Venue extends Base {
  /** A handful of popcorn, to roll over: it is the buzz. */
  popcorn(x, z, amount = 10) {
    return this.pickup('popcorn', x, z, amount);
  }

  /** A bucket of popcorn, the big one from the concession stand. */
  bucket(x, z, amount = 60) {
    return this.pickup('bucket', x, z, amount);
  }

  /** A roll of gaffer tape: holds Rock together. */
  tape(x, z, amount = 25) {
    return this.pickup('tape', x, z, amount);
  }

  /** A clapperboard: when Rock is done for, the director calls take two and he gets up. */
  clapper(x, z) {
    return this.pickup('clapper', x, z, 1);
  }

  /** A studio pass, for the closed sets. */
  pass(x, z) {
    return this.pickup('pass', x, z, 1);
  }

  /** A golden reel: three are hidden on every set. */
  reel(x, z) {
    return this.pickup('reel', x, z, 100);
  }
}
