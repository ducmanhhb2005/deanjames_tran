import { Orbit, Rocket, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Cosmic palette',
    text: 'Deep violet, electric cyan, soft pink glow and grainy starlight.'
  },
  {
    icon: Orbit,
    title: 'Album-first storytelling',
    text: 'Each track becomes a planet in this album’s constellation.'
  },
  {
    icon: Rocket,
    title: 'Streaming ready',
    text: 'Spotify artist link, YouTube channel and playable video cards are wired in.'
  }
];

export function AboutArtist({ artist, album }) {
  return (
    <section className="section about-grid" id="about">
      <div className="section-kicker">mission log</div>
      <div className="about-copy">
        <h2>{album.id === 'young-universe' ? 'Dreamy, dramatic, and built for night-listening.' : album.title}</h2>
        <p>{album.bio || (album.id === 'young-universe' ? artist.bio : `Explore ${album.title} by ${artist.name}.`)}</p>
      </div>

      <div className="feature-grid">
        {features.map(({ icon: Icon, title, text }) => (
          <article className="feature-card" key={title}>
            <Icon size={22} />
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
      </div>

      {album.description && (
        <div className="quote-panel">
          <p>“{album.description}”</p>
          <span>{album.title}{album.era && ` · ${album.era}`}</span>
        </div>
      )}
    </section>
  );
}
