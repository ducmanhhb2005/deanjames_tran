import { Headphones, Sparkles } from 'lucide-react';

export function Navbar({ artist }) {
  return (
    <header className="nav-wrap">
      <a className="brand" href="#top" aria-label="Back to top">
        <span className="brand-mark">
          <Sparkles size={18} />
        </span>
        <span>{artist.name}</span>
      </a>

      <nav className="nav-links" aria-label="Main navigation">
        <a href="#about">About</a>
        <a href="#album">Album</a>
        <a href="#videos">Videos</a>
        <a href="#connect">Connect</a>
      </nav>

      <a className="listen-pill" href={artist.spotifyUrl} target="_blank" rel="noreferrer">
        <Headphones size={17} />
        Listen
      </a>
    </header>
  );
}
