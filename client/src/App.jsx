import { useEffect, useMemo, useState } from 'react';
import { getArtist } from './api/artistApi.js';
import { fallbackArtist } from './data/fallbackData.js';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { AlbumSection } from './components/AlbumSection.jsx';
import { AboutArtist } from './components/AboutArtist.jsx';
import { YouTubeSection } from './components/YouTubeSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';
import { Starfield } from './components/Starfield.jsx';
import { mergeAlbums, resolvePage } from './utils/albumRouting.js';
import { TrackPage } from './components/TrackPage.jsx';
import { LiquidResetPage } from './components/LiquidResetPage.jsx';

export default function App() {
  const [artist, setArtist] = useState(fallbackArtist);
  const [apiStatus, setApiStatus] = useState('loading');

  useEffect(() => {
    let ignore = false;

    getArtist()
      .then((data) => {
        if (!ignore) {
          setArtist(data);
          setApiStatus('live');
        }
      })
      .catch(() => {
        if (!ignore) {
          setArtist(fallbackArtist);
          setApiStatus('fallback');
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  const albums = useMemo(() => mergeAlbums(artist.albums, fallbackArtist.albums), [artist]);
  const page = resolvePage(window.location.pathname);
  const album = albums.find((item) => item.id === page?.albumId);
  const track = album?.tracks?.find((item) => item.id === page?.trackId);
  const missingTrack = Boolean(page?.trackId && !track);
  const notFound = !album || missingTrack;

  useEffect(() => {
    document.body.dataset.album = !notFound && album.id === 'liquid-reset' ? 'liquid-reset' : 'young-universe';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', document.body.dataset.album === 'liquid-reset' ? '#07171f' : '#080516');
    return () => { delete document.body.dataset.album; };
  }, [album?.id, notFound]);

  useEffect(() => {
    document.title = `${notFound ? 'Page not found' : track ? `${track.title} — Lyrics` : album.title} | ${artist.name}`;
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      notFound ? 'Page not found.' : track
        ? `Listen to ${track.title} by ${artist.name} and read the lyrics. From ${album.title}.`
        : `${album.title} by ${artist.name}.${album.description ? ` ${album.description}` : ''}`
    );
  }, [artist.name, album, track, notFound]);

  if (notFound) {
    return (
      <main className="site-shell">
        <Starfield />
        <Navbar artist={artist} albums={albums} />
        <section className="section">
          <h1>{missingTrack ? 'Song not found' : 'Album not found'}</h1>
          <p>Choose an album above to explore its music.</p>
          <a className="ghost-cta" href="/">Back to Liquid Reset</a>
        </section>
      </main>
    );
  }

  if (album.id === 'liquid-reset') {
    return <LiquidResetPage artist={artist} album={album} albums={albums} track={track} />;
  }

  return (
    <main className="site-shell">
      <Starfield />
      <Navbar artist={artist} albums={albums} album={album} songPage={Boolean(track)} />
      {track ? (
        <TrackPage key={track.id} artist={artist} album={album} track={track} />
      ) : (
        <>
          <Hero artist={artist} album={album} apiStatus={apiStatus} />
          <AboutArtist artist={artist} album={album} />
          <AlbumSection album={album} />
          <YouTubeSection artist={artist} album={album} />
          <ContactSection artist={artist} />
        </>
      )}
      <Footer artist={artist} album={album} />
    </main>
  );
}
