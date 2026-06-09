import { useMemo, useState } from 'react';
import { ExternalLink, Pause, Play, Sparkle } from 'lucide-react';

function getEmbedUrl(track) {
  if (!track.youtubeId) {
    return null;
  }

  return `https://www.youtube.com/embed/${track.youtubeId}`;
}

export function AlbumSection({ album }) {
  const [activeTrackId, setActiveTrackId] = useState(null);
  const tracks = album.tracks || [];

  const activeTrack = useMemo(
    () => tracks.find((track) => track.id === activeTrackId || `${track.order}-${track.title}` === activeTrackId),
    [tracks, activeTrackId]
  );

  const activeEmbed = getEmbedUrl(activeTrack || {});

  return (
    <section className="section album-section" id="album">
      <div className="section-heading">
        <div>
          <div className="section-kicker">track constellation</div>
          <h2>{album.title}</h2>
          <p>{album.description}</p>
        </div>
        <span className="track-count">{tracks.length} tracks</span>
      </div>

      {activeEmbed && (
        <div className="video-stage">
          <iframe
            src={activeEmbed}
            title={`Playing ${activeTrack.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
          <div>
            <span>Now orbiting</span>
            <strong>{activeTrack.title}</strong>
          </div>
        </div>
      )}

      <div className="track-grid">
        {tracks.map((track) => {
          const trackKey = track.id || `${track.order}-${track.title}`;
          const isActive = activeTrackId === trackKey;
          const canPlay = Boolean(track.youtubeId);
          const link = track.youtubeUrl || track.spotifyUrl;

          return (
            <article className={isActive ? 'track-card active' : 'track-card'} key={trackKey}>
              <div className="track-number">{String(track.order).padStart(2, '0')}</div>
              <div className="track-body">
                <span className="track-mood">
                  <Sparkle size={13} />
                  {track.mood}
                </span>
                <h3>{track.title}</h3>
                <div className="track-actions">
                  {canPlay && (
                    <button type="button" onClick={() => setActiveTrackId(isActive ? null : trackKey)}>
                      {isActive ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                      {isActive ? 'Close' : 'Play'}
                    </button>
                  )}
                  {link && (
                    <a href={link} target="_blank" rel="noreferrer">
                      <ExternalLink size={15} />
                      Open
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
