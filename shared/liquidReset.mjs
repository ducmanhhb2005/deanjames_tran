import { parseLyricSheet } from './lyricSheet.mjs';

export const liquidResetArtwork = {
  blueHour: '/images/liquid-reset/blue-hour.jpg',
  album: '/images/liquid-reset/album-artwork.jpg',
  panicRoom: '/images/liquid-reset/panic-room.jpg',
  goldenLight: '/images/liquid-reset/golden-light.jpg',
  shoreline: '/images/liquid-reset/shoreline.jpg'
};

export const liquidResetAlbum = {
  id: 'liquid-reset',
  title: 'Liquid Reset',
  status: 'Unreleased',
  era: 'The second album',
  tagline: 'A cycle of letting go to become who I am meant to be.',
  description: 'A cycle of letting go to become who I am meant to be.',
  coverUrl: liquidResetArtwork.album,
  tracks: [
    {
      id: 'panic-room',
      order: 1,
      title: 'Panic Room',
      spotifyUrl: 'https://open.spotify.com/track/4cywjRDoMbg9W7Qxpiqcep?si=8c03a8296fdb4ef3',
      youtubeUrl: null,
      youtubeId: null,
      artworkUrl: liquidResetArtwork.panicRoom,
      mood: 'Liquid Reset'
    },
    {
      id: 'i-thought-i-knew-you',
      order: 2,
      title: 'I Thought I Knew You',
      spotifyUrl: 'https://open.spotify.com/album/1SFLZgWTqzRzXpZidaIWCL?si=i1SvLpAHToS40MX-eI34EQ',
      youtubeUrl: null,
      youtubeId: null,
      artworkUrl: liquidResetArtwork.goldenLight,
      mood: 'Liquid Reset'
    },
    {
      id: 'waving-at-the-ship',
      order: 3,
      title: 'Waving at the ship',
      status: 'Unreleased',
      spotifyUrl: null,
      artworkUrl: liquidResetArtwork.shoreline,
      mood: 'Liquid Reset'
    },
    {
      id: 'the-porch-light',
      order: 4,
      title: 'The Porch Light',
      status: 'Unreleased',
      spotifyUrl: null,
      artworkUrl: liquidResetArtwork.shoreline,
      mood: 'Liquid Reset'
    }
  ]
};

export function createLiquidResetAlbum(markdown) {
  const songs = parseLyricSheet(markdown, 'lyrics_liquid_reset.md', { requireAudio: false });
  if (songs.length !== liquidResetAlbum.tracks.length) {
    throw new Error(`lyrics_liquid_reset.md must contain all ${liquidResetAlbum.tracks.length} Liquid Reset songs.`);
  }

  return {
    ...liquidResetAlbum,
    tracks: liquidResetAlbum.tracks.map((metadata) => {
      const song = songs.find((item) => item.order === metadata.order);
      if (!song) throw new Error(`Missing track ${metadata.order} in lyrics_liquid_reset.md`);
      return { ...metadata, ...song };
    })
  };
}
