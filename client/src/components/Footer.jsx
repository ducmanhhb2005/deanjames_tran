import { Disc3, Github, Youtube } from 'lucide-react';

export function Footer({ artist }) {
  return (
    <footer className="footer">
      <div>
        <strong>{artist.name}</strong>
        <span>Young Universe website concept · React / Express</span>
      </div>
      <nav aria-label="Footer links">
        <a href={artist.spotifyUrl} target="_blank" rel="noreferrer">
          <Disc3 size={16} />
          Spotify
        </a>
        <a href={artist.youtubeUrl} target="_blank" rel="noreferrer">
          <Youtube size={16} />
          YouTube
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer">
          <Github size={16} />
          Source
        </a>
      </nav>
    </footer>
  );
}
