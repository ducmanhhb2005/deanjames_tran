import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { createYoungUniverseTracks, parseLyricSheet } from '../shared/youngUniverse.mjs';
import { createLiquidResetAlbum, liquidResetArtwork } from '../shared/liquidReset.mjs';
import { mergeAlbums, resolvePage, trackPath } from '../client/src/utils/albumRouting.js';
import { artist, tracks } from '../server/src/data/artistData.js';

const markdown = readFileSync(new URL('../lyrics.md', import.meta.url), 'utf8');
const songs = createYoungUniverseTracks(markdown);
const liquidMarkdown = readFileSync(new URL('../lyrics_liquid_reset.md', import.meta.url), 'utf8');
const liquidAlbum = createLiquidResetAlbum(liquidMarkdown);

test('all lyric lines are preserved in their original order, including repeated choruses', () => {
  const sourceLines = markdown.replace(/\r\n?/g, '\n').split('\n').map((line) => line.trim())
    .filter((line) => line && !/^\d+\. /.test(line) && !/^https:\/\//.test(line) && !/^\[[^\]]+\]$/.test(line));
  const lyricLines = songs.flatMap((song) => song.lyrics.flatMap((section) => section.paragraphs.flatMap((paragraph) => paragraph.split('\n'))));
  assert.deepEqual(lyricLines, sourceLines);
  assert.equal(songs.length, 14);
  assert.equal(songs[0].youtubeId, '2sVvSWP0OM4');
  assert.equal(songs[13].youtubeId, 'n6TOfckvXSo');
  for (const song of songs) {
    assert.equal(new URL(song.youtubeUrl).pathname.slice(1), song.youtubeId);
    assert.ok(song.lyrics.some((section) => /chorus/i.test(section.label)));
  }
});

test('each song has a stable direct route with optional trailing slash', () => {
  for (const song of songs) {
    const expected = { albumId: 'young-universe', trackId: song.id };
    assert.deepEqual(resolvePage(trackPath('young-universe', song.id)), expected);
    assert.deepEqual(resolvePage(trackPath('young-universe', song.id) + '/'), expected);
  }
  assert.deepEqual(resolvePage('/'), { albumId: 'liquid-reset', trackId: null });
  assert.deepEqual(resolvePage('/albums/young-universe'), { albumId: 'young-universe', trackId: null });
  assert.deepEqual(resolvePage('/albums/liquid-reset'), { albumId: 'liquid-reset', trackId: null });
  for (const path of ['/albums/young-universe/tracks/%E0%A4%A', '/albums/young-universe/tracks/', '/albums/young-universe/tracks/that-61s/extra']) {
    assert.equal(resolvePage(path), null);
  }
});

test('older API data cannot overwrite newly authored lyrics or audio URLs', () => {
  const olderApi = [{ id: 'young-universe', tracks: [{ id: 'that-61s', youtubeId: 'old-video', title: 'Old title' }] }];
  assert.deepEqual(mergeAlbums(olderApi, artist.albums)[0].tracks, songs);
  assert.equal(mergeAlbums(olderApi, artist.albums).length, 2);
  assert.deepEqual(mergeAlbums(undefined, artist.albums)[0].tracks, songs);
});

test('invalid or incomplete lyric sheets fail with an actionable message', () => {
  assert.throws(() => createYoungUniverseTracks(markdown.replace('1. That', '15. That')), /Missing track 1/);
  assert.throws(() => createYoungUniverseTracks(''), /all 14/);
  assert.throws(() => parseLyricSheet(markdown.replace('2. In My', '1. In My')), /Duplicate track/);
  assert.throws(() => parseLyricSheet(markdown.replace('2sVvSWP0OM4', 'invalid')), /Invalid YouTube/);
});

test('section parsing handles Unicode, blank instrumental sections, and Windows newlines', () => {
  const input = "1. A song\r\nhttps://youtu.be/2sVvSWP0OM4\r\n[Intro]\r\n[Verse 1]\r\nI can\u2019t sleep\r\n\r\nAnother stanza\r\n[Chorus]\r\nStill here\r\n";
  const [song] = parseLyricSheet(input);
  assert.equal(song.lyrics[0].label, 'Intro');
  assert.deepEqual(song.lyrics[0].paragraphs, []);
  assert.deepEqual(song.lyrics[1].paragraphs, ['I can\u2019t sleep', 'Another stanza']);
});

test('API uses the same authored songs and preserves Liquid Reset', () => {
  assert.deepEqual(artist.albums[0].tracks, songs);
  assert.equal(tracks.length, 18);
  assert.deepEqual(artist.albums[1].tracks.map((song) => song.title), ['Panic Room', 'I Thought I Knew You', 'Waving at the ship', 'The Porch Light']);
  assert.deepEqual(artist.albums[1], liquidAlbum);
});

test('Liquid Reset preserves every lyric line, paragraph, repeated chorus and section label', () => {
  const sourceLines = liquidMarkdown.replace(/\r\n?/g, '\n').split('\n').map((line) => line.trim())
    .filter((line) => line && !/^\d+\. /.test(line) && !/^https:\/\//.test(line) && !/^\[[^\]]+\]$/.test(line));
  const lyricLines = liquidAlbum.tracks.flatMap((song) => song.lyrics.flatMap((section) => section.paragraphs.flatMap((paragraph) => paragraph.split('\n'))));
  assert.deepEqual(lyricLines, sourceLines);
  assert.ok(liquidAlbum.tracks[0].lyrics.some((section) => section.label === 'verse 1.5'));
  assert.equal(liquidAlbum.tracks[1].lyrics.filter((section) => section.label === 'Chorus').length, 2);
});

test('Liquid Reset matches both YouTube URL formats, Spotify links, artwork and stable song routes', () => {
  assert.deepEqual(liquidAlbum.tracks.map((song) => song.youtubeId), ['MIPqR9gTCGc', 'ynBxUS-OVN8', null, null]);
  assert.deepEqual(liquidAlbum.tracks.map((song) => song.id), ['panic-room', 'i-thought-i-knew-you', 'waving-at-the-ship', 'the-porch-light']);
  assert.match(liquidAlbum.tracks[0].spotifyUrl, /track\/4cywjRDoMbg9W7Qxpiqcep/);
  assert.match(liquidAlbum.tracks[1].spotifyUrl, /album\/1SFLZgWTqzRzXpZidaIWCL/);
  assert.equal(liquidAlbum.tracks[0].artworkUrl, liquidResetArtwork.panicRoom);
  assert.equal(liquidAlbum.tracks[1].artworkUrl, liquidResetArtwork.goldenLight);
  for (const song of liquidAlbum.tracks) {
    assert.deepEqual(resolvePage(trackPath(liquidAlbum.id, song.id)), { albumId: 'liquid-reset', trackId: song.id });
  }
});

test('Liquid Reset lyrics remain available with an outdated API and invalid sheets fail clearly', () => {
  const oldApi = [{ id: 'liquid-reset', tracks: [{ id: 'panic-room', youtubeId: null }] }];
  assert.deepEqual(mergeAlbums(oldApi, [liquidAlbum])[0].tracks, liquidAlbum.tracks);
  assert.throws(() => createLiquidResetAlbum(''), /lyrics_liquid_reset.md/);
  assert.throws(() => createLiquidResetAlbum(liquidMarkdown.replace('2. I Thought', '5. I Thought')), /Missing track 2/);
});

test('unreleased songs have their own lyrics and the requested shoreline artwork without streaming links', () => {
  for (const song of liquidAlbum.tracks.slice(2)) {
    assert.equal(song.status, 'Unreleased');
    assert.equal(song.spotifyUrl, null);
    assert.equal(song.youtubeUrl, null);
    assert.equal(song.youtubeId, null);
    assert.equal(song.artworkUrl, liquidResetArtwork.shoreline);
    assert.ok(song.lyrics.some((section) => /chorus/i.test(section.label)));
    assert.ok(song.lyrics[0].paragraphs[0].length > 0);
  }
  assert.throws(() => parseLyricSheet('1. Missing audio\n[Verse 1]\nA line\n'), /Missing YouTube audio/);
});
