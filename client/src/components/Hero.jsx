import { ArrowUpRight, Disc3, Music2, Play, Radio, Youtube } from 'lucide-react';

export function Hero({ artist, album, apiStatus }) {
  const statusText = {
    loading: 'syncing universe',
    live: 'api live',
    fallback: 'static fallback'
  }[apiStatus];

  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">
          <Radio size={15} />
          {statusText} · new album era
        </p>

        <h1>
          {artist.name}
          <span> opens the Young Universe.</span>
        </h1>

        <p className="hero-lead">{artist.tagline}</p>

        <div className="hero-actions">
          <a className="primary-cta" href={artist.spotifyUrl} target="_blank" rel="noreferrer">
            <Play size={18} fill="currentColor" />
            Spotify Artist
          </a>
          <a className="ghost-cta" href={artist.youtubeUrl} target="_blank" rel="noreferrer">
            <Youtube size={18} />
            YouTube Channel
          </a>
        </div>

        <div className="hero-metrics" aria-label="Album facts">
          <div>
            <strong>{album.tracks?.length || 14}</strong>
            <span>tracks</span>
          </div>
          <div>
            <strong>01</strong>
            <span>cosmic era</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>orbiting moods</span>
          </div>
        </div>
      </div>

      <aside className="hero-card" aria-label="Featured album card">
        <div className="vinyl-orbit" />
        <img src={album.coverUrl || artist.portraitUrl} alt={`${artist.name} ${album.title} cover`} />
        <div className="hero-card-content">
          <span className="album-badge">
            <Disc3 size={15} />
            Album
          </span>
          <h2>{album.title}</h2>
          <p>{album.description}</p>
          <a href="#album" className="mini-link">
            Explore track universe <ArrowUpRight size={15} />
          </a>
        </div>
        <Music2 className="floating-note" size={40} aria-hidden="true" />
      </aside>
    </section>
  );
}
