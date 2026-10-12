# Rock 'n' Roller II: Hollywood Nights

The sequel to [Rock 'n' Roller](https://github.com/h1ddenpr0cess20/rocknroller).
Rock, the boulder, has been cast in a picture, *Like a Rock*, and rolls
through the night shoots of a Hollywood studio, smashing the annoying people
in the way. It runs on the first game's engine (renderer, physics, the tiled
sets and the camera), with the sets, light rig, score and rules redone for the
pictures.

The name and the picture's title are nods to two Bob Seger songs; nothing of
either song is used.

## Run

```sh
npm install
npm run dev               # → http://localhost:5173
```

A static page: no server, no keys. `npm run build` puts it in `dist/`. WebGPU
where the browser has it, WebGL2 otherwise. Node 22.12 or later.

## Play

Same controls as the first game: arrows or WASD to roll, Space or Shift to
rev, Q/E or the right mouse button to turn the view, the wheel to zoom, P to
pause, M for sound.

- **Buzz** is the score: popcorn, buckets of it, and smashing people one after another.
- **Gaffer tape** puts integrity back. A **clapperboard** means take two: when Rock is shattered, he gets back up on half.
- A **closed set** needs the **studio pass** from somewhere on the set.
- **Breakaways** (scenery flats, sugar glass, painted brick) give way if Rock comes at them fast enough.
- Three stars a scene: **hit your mark**, **scene-stealer** (smash three in four of the people), **in the can** (all three golden reels).

## What is in this build

A first playable build, for trying out:

| | Set | |
|---|---|---|
| 1 | **The Casting Call** | The teaching set: a queue of hopefuls, a waiting room, sandbags dropping behind Stage 7, the screen-test stage, a closed set and its pass. |
| 2 | **The Backlot** | The studio after dark under searchlights: New York Street's façades, the tour tram over the flash-flood channel, a raft out across the water tank, the stunt show's pyro, soundstage alley, the props warehouse. |

Already in the engine, ahead of the sets that use them: a black-and-white
noir grade with rain and a hard-boiled voice-over, sepia and Technicolor
grades, venetian-blind light, cinema marquees, streetlamps, searchlights,
lightning, steam vents, camera dollies, trams, rafts, mine carts and a flying
saucer to ride, and a score with a theme per genre (the main title is a night
drive with a pumping eighth-note bass; there is jazz for the noir, a whistle
and a train beat for the western, a theremin for the horror). A western set
is drafted in `src/venues/western.js` but not in the game yet.

Not done yet: the new cast (the people are plain stand-in figures for now),
the new props (plain boxes), and the rest of the sets.

## Develop

```sh
npm test                  # the rules, the light rig, the score, the physics, and every set played through by an autopilot
npm run lint
node scripts/map.js 2     # a set as text; --overlaps shows where two pieces were dug over each other
node scripts/drive.js 2   # put the autopilot through a set and say how it went
```

In the browser console, `rocknroller.debug.venue(i)` jumps to a set and
`teleport(x, z)` puts Rock somewhere on it.

## Credits

Rock is [h1ddenpr0cess20/rock](https://github.com/h1ddenpr0cess20/rock). The
engine is [Rock 'n' Roller](https://github.com/h1ddenpr0cess20/rocknroller)'s,
from [dungeon-roller](https://github.com/h1ddenpr0cess20/dungeon-roller).
Type is Anton, Barlow Condensed and Limelight, from [Fontsource](https://fontsource.org).
