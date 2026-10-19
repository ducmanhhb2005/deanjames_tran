import { Headphones, Sparkles } from 'lucide-react';
import { albumPath } from '../utils/albumRouting.js';

export function Navbar({ artist, albums, album, songPage = false }) {
  const sectionBase = songPage ? albumPath(album.id) : '';
  return (
    <>
      <header className="nav-wrap">
        <a className="brand" href={songPage ? sectionBase : album ? '#top' : '/'} aria-label={songPage ? 'Back to album' : album ? 'Back to top' : 'Home'}>
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span>{artist.name}</span>
        </a>

        {album && (
          <nav className="nav-links" aria-label="Main navigation">
            <a href={`${sectionBase}#about`}>About</a>
            <a href={`${sectionBase}#album`}>Album</a>
            <a href={`${sectionBase}#videos`}>Videos</a>
            <a href={`${sectionBase}#connect`}>Connect</a>
          </nav>
        )}

        <a className="listen-pill" href={artist.spotifyUrl} target="_blank" rel="noreferrer">
          <Headphones size={17} />
          Listen
        </a>
      </header>
      <nav className="album-nav" aria-label="Albums">
        <span>Albums</span>
        {albums.map((item) => (
          <a
            key={item.id}
            href={albumPath(item.id)}
            aria-current={item.id === album?.id ? 'page' : undefined}
          >
            {item.title}
          </a>
        ))}
      </nav>
    </>
  );
}
