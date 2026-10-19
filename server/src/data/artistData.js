import { createLiquidResetAlbum } from '../../../shared/liquidReset.mjs';
import { readFileSync } from 'node:fs';
import { createYoungUniverseTracks } from '../../../shared/youngUniverse.mjs';

const lyricSheet = readFileSync(new URL('../../../lyrics.md', import.meta.url), 'utf8');
const liquidLyricSheet = readFileSync(new URL('../../../lyrics_liquid_reset.md', import.meta.url), 'utf8');

export const artist = {
  id: 'deanjames-tran',
  name: 'Deanjames Tran',
  slug: 'deanjames-tran',
  tagline: 'Young Universe / cosmic pop from the quiet storm inside.',
  bio:
    'Deanjames Tran is building a dreamy Young Universe era: intimate lyrics, cinematic textures, ghostly memories and star-lit melodies wrapped in a modern cosmic visual world.',
  portraitUrl: '/images/young-universe-cover.jpg',
  spotifyUrl: 'https://open.spotify.com/artist/04P7gvMyOtbbro57e2RFTK',
  youtubeUrl: 'https://www.youtube.com/@manhuc9459',
  links: [
    {
      id: 'spotify-profile',
      label: 'Spotify Artist Profile',
      type: 'spotify',
      url: 'https://open.spotify.com/artist/04P7gvMyOtbbro57e2RFTK'
    },
    {
      id: 'youtube-channel',
      label: 'YouTube Channel',
      type: 'youtube',
      url: 'https://www.youtube.com/@manhuc9459'
    }
  ],
  albums: [
    {
      id: 'young-universe',
      title: 'Young Universe',
      era: 'Cosmic debut era',
      description:
        'A 14-track universe built from ghosts, mirrors, countdowns, secret kingdoms and quiet storms.',
      coverUrl: '/images/young-universe-cover.jpg',
      tracks: createYoungUniverseTracks(lyricSheet)
    },
    createLiquidResetAlbum(liquidLyricSheet)
  ]
};

export const tracks = artist.albums.flatMap((album) =>
  album.tracks.map((track) => ({
    ...track,
    album: {
      title: album.title,
      coverUrl: album.coverUrl
    }
  }))
);
