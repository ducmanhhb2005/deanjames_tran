import { useMemo } from 'react';

export function Starfield() {
  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, index) => ({
        id: index,
        x: `${(index * 37) % 100}%`,
        y: `${(index * 61) % 100}%`,
        size: `${1 + ((index * 13) % 4)}px`,
        delay: `${((index * 7) % 18) / 2}s`,
        duration: `${6 + ((index * 5) % 12)}s`
      })),
    []
  );

  return (
    <div className="starfield" aria-hidden="true">
      <div className="nebula nebula-one" />
      <div className="nebula nebula-two" />
      <div className="nebula nebula-three" />
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: star.x,
            top: star.y,
            width: star.size,
            height: star.size,
            animationDelay: star.delay,
            animationDuration: star.duration
          }}
        />
      ))}
    </div>
  );
}
