import { ArrowUpRight, BookOpenText, ExternalLink, Headphones, Sparkle } from 'lucide-react';
import { trackPath } from '../utils/albumRouting.js';

export function AlbumSection({ album }) {
  const tracks = album.tracks || [];

  return (
    <section className="section album-section" id="album">
      <div className="section-heading">
        <div>
          <div className="section-kicker">track constellation</div>
          <h2>{album.title}</h2>
          <p>{album.description}</p>
        </div>
        {tracks.length > 0 && <span className="track-count">{tracks.length} {album.status === 'Unreleased' ? 'tracks listed' : 'tracks'}</span>}
      </div>

      {tracks.length === 0 && <p className="album-empty-state">The tracklist for {album.title} has not been added yet.</p>}

      <div className="track-grid">
        {tracks.map((track) => {
          const hasLyrics = Boolean(track.lyrics?.length);
          const href = hasLyrics ? trackPath(album.id, track.id) : track.youtubeUrl || track.spotifyUrl;
          return (
            <article className="track-card" key={track.id || track.order}>
              <div className="track-number">{String(track.order).padStart(2, '0')}</div>
              <div className="track-body">
                <span className="track-mood"><Sparkle size={13} />{track.mood}</span>
                <h3>{href ? <a href={href} target={hasLyrics ? undefined : '_blank'} rel={hasLyrics ? undefined : 'noreferrer'}>{track.title}</a> : track.title}</h3>
                <div className="track-actions">
                  {hasLyrics && <a className="track-lyrics-link" href={href} aria-label={'Listen and read lyrics: ' + track.title}><BookOpenText size={16} />Listen & lyrics<ArrowUpRight size={14} /></a>}
                  {track.youtubeUrl && <a href={track.youtubeUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} />YouTube</a>}
                  {track.spotifyUrl && <a href={track.spotifyUrl} target="_blank" rel="noreferrer"><Headphones size={15} />Spotify</a>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
