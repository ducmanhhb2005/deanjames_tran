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

  const album = useMemo(() => artist.albums?.[0] || fallbackArtist.albums[0], [artist]);

  return (
    <main className="site-shell">
      <Starfield />
      <Navbar artist={artist} />
      <Hero artist={artist} album={album} apiStatus={apiStatus} />
      <AboutArtist artist={artist} album={album} />
      <AlbumSection album={album} />
      <YouTubeSection artist={artist} album={album} />
      <ContactSection artist={artist} />
      <Footer artist={artist} />
    </main>
  );
}
