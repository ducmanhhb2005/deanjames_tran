import { useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BookOpenText, Droplets, Headphones, Menu, Play, Waves, X, ZoomIn } from 'lucide-react';
import { liquidResetAlbum, liquidResetArtwork as art } from '../../../shared/liquidReset.mjs';
import { albumPath, trackPath } from '../utils/albumRouting.js';
import { TrackPage } from './TrackPage.jsx';
import '../styles/liquid-reset.css';

const photographs = [
  { src: art.blueHour, title: 'The stillness', caption: 'Blue hour / a moment suspended', alt: 'Deanjames Tran standing in a still lake beneath a blue evening sky' },
  { src: art.goldenLight, title: 'The light', caption: 'Warmth / finding a way through', alt: 'Warm window light falling across Deanjames Tran’s face' },
  { src: art.shoreline, title: 'The beginning', caption: 'The shoreline / another horizon', alt: 'Deanjames Tran beside the sea in golden sunset light' }
];

function spotifyEmbed(url) {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'open.spotify.com' && /^\/(track|album)\/[A-Za-z0-9]+$/.test(parsed.pathname)
      ? `https://open.spotify.com/embed${parsed.pathname}?utm_source=generator`
      : null;
  } catch {
    return null;
  }
}

export function LiquidResetPage({ artist, album, albums, track }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [photoIndex, setPhotoIndex] = useState(0);
  const lightbox = useRef(null);
  const sectionBase = track ? albumPath(album.id) : '';
  const songs = album.tracks || liquidResetAlbum.tracks;
  const links = [['The story', 'about'], ['Music', 'album'], ['Visual diary', 'visuals'], ['Connect', 'connect']];

  function openPhotograph(index) {
    setPhotoIndex(index);
    lightbox.current.showModal();
  }

  function changePhotograph(direction) {
    setPhotoIndex((index) => (index + direction + photographs.length) % photographs.length);
  }

  return (
    <main className={`liquid-site${track ? ' liquid-song-page' : ''}`}>
      <header className="liquid-header">
        <a className="liquid-brand" href={track ? sectionBase : '#top'} aria-label={track ? 'Back to Liquid Reset' : 'Back to top'}>
          <Droplets size={23} strokeWidth={1.2} /><span>Deanjames Tran</span>
        </a>
        <nav id="liquid-main-navigation" className={`liquid-navigation${menuOpen ? ' is-open' : ''}`} aria-label="Liquid Reset navigation">
          {links.map(([label, id]) => <a key={id} href={`${sectionBase}#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <a className="liquid-header-listen" href={`${sectionBase}#album`}><Headphones size={15} /><span>Listen</span></a>
        <button className="liquid-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="liquid-main-navigation" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </header>

      {track ? (
        <div className="liquid-track-content liquid-frame">
          <nav className="liquid-album-switch" aria-label="Albums">
            {albums.map((item) => <a key={item.id} href={albumPath(item.id)} aria-current={item.id === album.id ? 'page' : undefined}>{item.title}</a>)}
          </nav>
          <TrackPage key={track.id} artist={artist} album={album} track={track} />
        </div>
      ) : <>
        <section className="liquid-hero" id="top" aria-labelledby="liquid-title">
          <img className="liquid-hero-image" src={art.blueHour} width="1537" height="1023" alt="Deanjames Tran in a calm lake at blue hour" fetchPriority="high" />
          <div className="liquid-hero-shade" />
          <div className="liquid-hero-inner liquid-frame">
            <nav className="liquid-album-switch" aria-label="Albums">
              {albums.map((item) => <a key={item.id} href={albumPath(item.id)} aria-current={item.id === album.id ? 'page' : undefined}>{item.title}</a>)}
            </nav>
            <div className="liquid-hero-copy">
              <p className="liquid-kicker"><span /> The second album <span className="liquid-kicker-divider">/</span> Unreleased</p>
              <h1 id="liquid-title"><span>Liquid</span><em>Reset</em></h1>
              <p className="liquid-hero-tagline">A cycle of letting go.<br />To become who I am meant to be.</p>
              <a className="liquid-button liquid-button-light" href="#album">Listen to the first songs <ArrowUpRight size={18} /></a>
            </div>
            <div className="liquid-hero-bottom"><span>Deeper than you can see.</span><a href="#about">Enter the next chapter <ArrowDown size={16} /></a></div>
          </div>
        </section>

        <section className="liquid-story liquid-frame" id="about" aria-labelledby="liquid-story-title">
          <div className="liquid-story-copy">
            <p className="liquid-kicker">01 / The reset</p>
            <h2 id="liquid-story-title">Let it go.<br /><em>Begin again.</em></h2>
            <p className="liquid-story-lead">Still water. Heavy thoughts.<br />A little light breaking through.</p>
            <p>Between the quiet of blue hour and the warmth of a new horizon, there is a moment to let go. To be still. To begin again.</p>
            <p>Liquid Reset is the next chapter from {artist.name}. The album is still taking shape; these are its first glimpses.</p>
            <a className="liquid-text-link" href="#album">Discover the music <ArrowRight size={18} /></a>
          </div>
          <figure className="liquid-album-art">
            <img src={art.album} width="1536" height="1536" alt="Liquid Reset album artwork: Deanjames Tran beneath a ring of water in golden light" loading="lazy" />
            <figcaption><span>Liquid Reset</span><span>The album / in the making</span></figcaption>
          </figure>
        </section>

        <section className="liquid-music" id="album" aria-labelledby="liquid-music-title">
          <div className="liquid-frame">
            <header className="liquid-section-heading">
              <div><p className="liquid-kicker">02 / The music</p><h2 id="liquid-music-title">The first <em>ripples.</em></h2></div>
              <p>{songs.length} songs. A first glimpse of Liquid Reset.<br />Listen to the first releases. Read the unreleased chapters.</p>
            </header>
            <div className="liquid-songs">
              {songs.map((song, index) => {
                const image = liquidResetAlbum.tracks.find((item) => item.id === song.id)?.artworkUrl;
                const embed = spotifyEmbed(song.spotifyUrl);
                const playing = activeTrack === song.id;
                const songHref = trackPath(album.id, song.id);
                const hasAudio = Boolean(song.youtubeId || song.spotifyUrl);
                return (
                  <article className="liquid-song" key={song.id}>
                    <div className="liquid-song-image">
                      {image && <a className="liquid-song-art-link" href={songHref} aria-label={`${hasAudio ? 'Listen and read lyrics' : 'Read lyrics'}: ${song.title}`}><img src={image} width="819" height="819" alt={song.id === 'panic-room' ? 'Panic Room artwork by Deanjames Tran' : song.status === 'Unreleased' ? 'Deanjames Tran beside the sea in golden sunset light' : 'Deanjames Tran in warm window light'} loading="lazy" /></a>}
                      <span className="liquid-song-number">{String(index + 1).padStart(2, '0')} / Liquid Reset</span>
                      <a className="liquid-art-play" href={songHref} aria-label={`Open lyrics: ${song.title}`}>{hasAudio ? <Play size={22} fill="currentColor" /> : <BookOpenText size={22} />}</a>
                    </div>
                    <div className="liquid-song-caption"><div><p>{song.status === 'Unreleased' ? 'Unreleased · Lyrics' : artist.name}</p><h3><a href={songHref}>{song.title}</a></h3></div><Waves size={28} strokeWidth={1} aria-hidden="true" /></div>
                    <div className="liquid-song-actions">
                      <a className="liquid-lyrics-link" href={songHref}><BookOpenText size={15} />{hasAudio ? 'Listen & lyrics' : 'Read lyrics'}</a>
                      {embed && <button type="button" aria-expanded={playing} aria-controls={`liquid-player-${song.id}`} onClick={() => setActiveTrack(playing ? null : song.id)}>{playing ? 'Close player' : 'Spotify player'} <Headphones size={15} /></button>}
                      {song.spotifyUrl && <a href={song.spotifyUrl} target="_blank" rel="noreferrer">Open Spotify <ArrowUpRight size={16} /></a>}
                    </div>
                    <div id={`liquid-player-${song.id}`} className="liquid-inline-player" hidden={!playing}>
                      {playing && embed && <iframe src={embed} title={`Listen to ${song.title} on Spotify`} height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="liquid-visuals liquid-frame" id="visuals" aria-labelledby="liquid-visuals-title">
          <header className="liquid-section-heading"><div><p className="liquid-kicker">03 / A visual diary</p><h2 id="liquid-visuals-title">Between the water<br /><em>& the light.</em></h2></div><p>Fragments of a new beginning.<br />A world in blue, a little gold.</p></header>
          <div className="liquid-gallery">
            {photographs.map((photo, index) => <figure key={photo.src}>
              <button type="button" onClick={() => openPhotograph(index)} aria-label={`View photograph: ${photo.title}`}><img src={photo.src} alt={photo.alt} loading="lazy" width={index === 0 ? '1537' : '1600'} height={index === 0 ? '1023' : '1600'} /><span><ZoomIn size={19} /></span></button>
              <figcaption><strong>{photo.title}</strong><span>{photo.caption}</span></figcaption>
            </figure>)}
          </div>
          <div className="liquid-closing-quote"><Waves size={33} strokeWidth={0.8} /><blockquote>“A cycle of letting go<br />to become who I am <em>meant to be.</em>”</blockquote><span>Liquid Reset / {artist.name}</span></div>
        </section>
      </>}

      <footer className="liquid-footer" id="connect">
        <div className="liquid-frame">
          <div className="liquid-footer-top"><div><p className="liquid-kicker">Stay a little longer</p><h2>Meet me at<br /><em>the next horizon.</em></h2></div><div className="liquid-socials"><a href={artist.spotifyUrl} target="_blank" rel="noreferrer">Follow on Spotify <ArrowUpRight size={19} /></a><a href={artist.youtubeUrl} target="_blank" rel="noreferrer">Find me on YouTube <ArrowUpRight size={19} /></a></div></div>
          <div className="liquid-footer-bottom"><a className="liquid-brand" href={track ? sectionBase : '#top'}><Droplets size={20} strokeWidth={1.1} />{artist.name}</a><span>Liquid Reset · The second album</span><a href={albumPath('young-universe')}>Back to Young Universe <ArrowUpRight size={15} /></a></div>
        </div>
      </footer>

      <dialog className="liquid-lightbox" ref={lightbox} aria-label="Liquid Reset visual diary" onClick={(event) => { if (event.target === event.currentTarget) lightbox.current.close(); }} onKeyDown={(event) => { if (event.key === 'ArrowLeft') changePhotograph(-1); if (event.key === 'ArrowRight') changePhotograph(1); }}>
        <div className="liquid-lightbox-inner"><button className="liquid-lightbox-close" type="button" aria-label="Close photograph" onClick={() => lightbox.current.close()}><X size={23} /></button><img src={photographs[photoIndex].src} alt={photographs[photoIndex].alt} /><div className="liquid-lightbox-controls"><button type="button" aria-label="Previous photograph" onClick={() => changePhotograph(-1)}><ArrowLeft size={20} /></button><p aria-live="polite">{photographs[photoIndex].title}<span>{photoIndex + 1} / {photographs.length}</span></p><button type="button" aria-label="Next photograph" onClick={() => changePhotograph(1)}><ArrowRight size={20} /></button></div></div>
      </dialog>
    </main>
  );
}
