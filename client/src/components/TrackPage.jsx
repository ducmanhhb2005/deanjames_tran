import { useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpenText, Disc3, Headphones, ListMusic, Minus, Plus, Sparkles } from 'lucide-react';
import { albumPath, trackPath } from '../utils/albumRouting.js';
import '../styles/track.css';

const accents = ['#ffc999', '#ffb8dc', '#a9c9ff', '#ffdb91', '#ccadff', '#a4e9d3', '#c7b8ff', '#9ce1ed', '#ffc1a6', '#d4b0ff', '#b8dbb6', '#ffbaad', '#f8d797', '#c9c3ff'];

export function TrackPage({ artist, album, track }) {
  const [textSize, setTextSize] = useState(1);
  const tracks = album.tracks || [];
  const index = tracks.findIndex((item) => item.id === track.id);
  const previous = tracks[index - 1];
  const next = tracks[index + 1];
  const sections = track.lyrics || [];
  const accent = accents[index % accents.length] || '#c9c3ff';
  const artwork = track.artworkUrl || album.coverUrl;
  const isLiquidReset = album.id === 'liquid-reset';
  const hasAudio = Boolean(track.youtubeId || track.spotifyUrl);

  return (
    <article className="listening-room" id="top" style={{ '--song-accent': accent, '--lyric-scale': textSize }}>
      <div className="room-ambient" aria-hidden="true" />
      <div className="room-breadcrumb">
        <a href={`${albumPath(album.id)}#album`}><ArrowLeft size={15} /> {album.title}</a>
        <span>/</span>
        <span>Track {String(track.order).padStart(2, '0')}</span>
      </div>

      <header className="room-heading">
        <div>
          <p className="room-eyebrow"><Sparkles size={14} /> {track.status === 'Unreleased' ? 'Unreleased · The words before the music' : 'A little closer to the music'}</p>
          <h1>{track.title}</h1>
          <p className="room-byline">{artist.name}<span>·</span>{album.title}{track.mood && track.mood !== album.title && <><span>·</span>{track.mood}</>}</p>
        </div>
        <a className="room-lyrics-jump" href="#song-lyrics"><ArrowDown size={18} /> Into the lyrics</a>
      </header>

      <div className="listening-layout">
        <aside className="listening-sidebar" aria-label="Audio and album tracks">
          <section className="room-player" aria-label={`${hasAudio ? 'Listen to' : 'Read lyrics for'} ${track.title}`}>
            <div className="room-artwork">
              {artwork ? <img src={artwork} alt={track.artworkUrl ? `${track.title} artwork` : `${album.title} album cover`} /> : <Disc3 size={72} />}
              <div className="room-artwork-shade" />
              <span className="room-artwork-tag">{hasAudio ? <Headphones size={13} /> : <BookOpenText size={13} />}{hasAudio ? 'THE LISTENING ROOM' : 'THE LYRIC ROOM'}</span>
              <div className="room-artwork-caption">
                <span>{album.title}</span>
                <strong>{String(track.order).padStart(2, '0')}<small> / {String(tracks.length).padStart(2, '0')}</small></strong>
              </div>
            </div>

            <div className="room-player-body">
              {hasAudio && <>
              <div className="room-player-label"><span className="room-signal" /> {track.youtubeId ? 'YouTube audio' : 'Listen on Spotify'} <span>{track.youtubeId ? 'Press play & stay a while' : 'Open the link below'}</span></div>
              {track.youtubeId && (
                <iframe
                  className="room-youtube"
                  src={`https://www.youtube-nocookie.com/embed/${track.youtubeId}?rel=0`}
                  title={`${track.title} — YouTube audio`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              )}
              <div className="room-external-links">
                {track.youtubeUrl && <a href={track.youtubeUrl} target="_blank" rel="noreferrer">Open YouTube <ArrowUpRight size={14} /></a>}
                {track.spotifyUrl && <a href={track.spotifyUrl} target="_blank" rel="noreferrer">Spotify <ArrowUpRight size={14} /></a>}
              </div>
              </>}
              <div className="room-transport" aria-label="Track navigation">
                {previous ? (
                  <a href={trackPath(album.id, previous.id)} aria-label={`Previous song: ${previous.title}`}>
                    <ArrowLeft size={18} /><span>Previous<strong>{previous.title}</strong></span>
                  </a>
                ) : <span className="room-boundary">The beginning<br /><strong>Track 01</strong></span>}
                {next ? (
                  <a href={trackPath(album.id, next.id)} aria-label={`Next song: ${next.title}`}>
                    <span>Up next<strong>{next.title}</strong></span><ArrowRight size={18} />
                  </a>
                ) : <span className="room-boundary">{album.status === 'Unreleased' ? 'More to come' : 'The final chapter'}<br /><strong>{album.title}</strong></span>}
              </div>
            </div>
          </section>

          <details className="room-tracklist">
            <summary><ListMusic size={18} /><span>Inside {album.title}</span><span>{tracks.length} {album.status === 'Unreleased' ? 'songs so far' : 'tracks'}</span></summary>
            <ol>
              {tracks.map((item) => (
                <li key={item.id}>
                  <a href={trackPath(album.id, item.id)} aria-current={item.id === track.id ? 'page' : undefined}>
                    <span>{String(item.order).padStart(2, '0')}</span><strong>{item.title}</strong>
                    {item.id === track.id && <Headphones size={15} />}
                  </a>
                </li>
              ))}
            </ol>
          </details>
          <p className="room-side-note">{isLiquidReset ? 'Let the noise settle.' : 'Every song, a small universe.'}<br />{isLiquidReset ? 'Stay with the words.' : 'Take your time in this one.'}</p>
        </aside>

        <section className="room-lyrics" id="song-lyrics" aria-labelledby="lyrics-heading">
          <header className="room-lyrics-header">
            <div><p className="room-eyebrow">The words behind the world</p><h2 id="lyrics-heading">Lyrics<span> / {String(track.order).padStart(2, '0')}</span></h2></div>
            <div className="room-text-controls" role="group" aria-label="Lyrics text size">
              <button type="button" aria-label="Smaller lyrics" disabled={textSize <= 0.9} onClick={() => setTextSize((size) => Math.max(0.9, Math.round((size - 0.1) * 10) / 10))}><Minus size={15} /></button>
              <span aria-hidden="true">Aa</span>
              <button type="button" aria-label="Larger lyrics" disabled={textSize >= 1.3} onClick={() => setTextSize((size) => Math.min(1.3, Math.round((size + 0.1) * 10) / 10))}><Plus size={15} /></button>
            </div>
          </header>

          {sections.length > 0 && <nav className="room-section-nav" aria-label="Lyric sections">
            {sections.map((section, sectionIndex) => <a key={sectionIndex} href={`#lyric-${sectionIndex}`}>{section.label}</a>)}
          </nav>}

          <div className="room-lyric-sections">
            {sections.length ? sections.map((section, sectionIndex) => (
              <section
                key={sectionIndex}
                id={`lyric-${sectionIndex}`}
                className={`room-verse${/chorus/i.test(section.label) ? ' room-chorus' : ''}`}
                aria-labelledby={`lyric-label-${sectionIndex}`}
              >
                <h3 id={`lyric-label-${sectionIndex}`}><span>{String(sectionIndex + 1).padStart(2, '0')}</span>{section.label}</h3>
                {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
              </section>
            )) : <p className="album-empty-state">Lyrics for this song have not been added yet.</p>}
          </div>

          <div className="room-lyrics-end"><Sparkles size={20} /><span>{sections.length ? 'Some words stay with you.' : 'Stay for the music.'}</span><small>{artist.name} / {album.title}</small></div>
          {next ? <a className="room-next-chapter" href={trackPath(album.id, next.id)}>
            <div><span>The next chapter · {String(next.order).padStart(2, '0')}</span><strong>{next.title}</strong></div><ArrowRight size={28} />
          </a> : <a className="room-next-chapter" href={`${albumPath(album.id)}#album`}>
            <div><span>You’ve reached the last track</span><strong>Back to {album.title}</strong></div><ArrowRight size={28} />
          </a>}
        </section>
      </div>
    </article>
  );
}
