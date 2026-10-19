import { parseLyricSheet } from './lyricSheet.mjs';
export { parseLyricSheet } from './lyricSheet.mjs';

const trackMetadata = [
  ['that-61s', 'opening signal', 'https://open.spotify.com/track/6HKWhKGV4WNz3X1vLKjVRa?si=55c0e55f510c4e5'],
  ['in-my-own-time', 'slow orbit'],
  ['paper-moons-quiet-storms', 'paper moonlight'],
  ['golden-ghost', 'golden echo'],
  ['the-beast-in-the-mirror', 'mirror tension'],
  ['the-shield', 'protective pulse'],
  ['i-hug-ghosts-in-my-dreams', 'dream haunt'],
  ['give-me-you-again', 'aching return'],
  ['october-thirty', 'late autumn'],
  ['secret-kingdom', 'hidden crown'],
  ['imperfect-circle', 'soft fracture'],
  ['didnt-win-still-alive', 'survival glow'],
  ['home-for-the-countdown', 'countdown warmth'],
  ['young-universe', 'title constellation']
];

export function createYoungUniverseTracks(markdown) {
  const tracks = parseLyricSheet(markdown);
  if (tracks.length !== trackMetadata.length) throw new Error('lyrics.md must contain all 14 Young Universe tracks.');

  return trackMetadata.map(([id, mood, spotifyUrl = null], index) => {
    const track = tracks.find((item) => item.order === index + 1);
    if (!track) throw new Error(`Missing track ${index + 1} in lyrics.md`);
    return { id, mood, spotifyUrl, ...track };
  });
}
