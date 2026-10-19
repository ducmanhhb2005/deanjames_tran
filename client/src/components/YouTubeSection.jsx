import { ArrowUpRight, Youtube } from 'lucide-react';
import { trackPath } from '../utils/albumRouting.js';

export function YouTubeSection({ artist, album }) {
  const featured = (album.tracks || []).filter((track) => track.youtubeId).slice(0, 3);

  return (
    <section className="section videos-section" id="videos">
      <div className="section-heading compact">
        <div>
          <div className="section-kicker">visual orbit</div>
          <h2>YouTube channel + featured drops</h2>
        </div>
        <a className="ghost-cta small" href={artist.youtubeUrl} target="_blank" rel="noreferrer">
          <Youtube size={18} />
          Open @manhuc9459
        </a>
      </div>

      {featured.length === 0 && <p className="album-empty-state">Videos for {album.title} have not been added yet.</p>}

      <div className="video-grid">
        {featured.map((track) => (
          <a className="video-tile" key={track.youtubeId} href={track.lyrics?.length ? trackPath(album.id, track.id) : track.youtubeUrl} target={track.lyrics?.length ? undefined : '_blank'} rel={track.lyrics?.length ? undefined : 'noreferrer'}>
            <img src={`https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`} alt={`${track.title} thumbnail`} />
            <div>
              <span>Listen to track {String(track.order).padStart(2, '0')}</span>
              <h3>{track.title}</h3>
              <p>
                {track.lyrics?.length ? 'Listen & read lyrics' : 'Launch video'} <ArrowUpRight size={14} />
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
