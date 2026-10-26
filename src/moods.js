import action from 'madness-engine/moods/action';
import backlot from 'madness-engine/moods/backlot';
import casting from 'madness-engine/moods/casting';
import horror from 'madness-engine/moods/horror';
import musical from 'madness-engine/moods/musical';
import noir from 'madness-engine/moods/noir';
import pirate from 'madness-engine/moods/pirate';
import premiere from 'madness-engine/moods/premiere';
import scifi from 'madness-engine/moods/scifi';
import western from 'madness-engine/moods/western';

/**
 * Each set's mood, in the order of the shoot (`venues/index.js`): its
 * light, its sky and reflections, the film it is shot on, its weather and
 * its band. The moods are the engine's, made from the sets' looks.
 */
export const MOODS = [casting, backlot, western, musical, scifi, horror, noir, pirate, action, premiere];
