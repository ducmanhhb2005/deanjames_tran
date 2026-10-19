export function albumPath(albumId) {
  return `/albums/${encodeURIComponent(albumId)}`;
}

export function resolveAlbumId(pathname) {
  return resolvePage(pathname)?.albumId ?? null;
}

export function trackPath(albumId, trackId) {
  return `${albumPath(albumId)}/tracks/${encodeURIComponent(trackId)}`;
}

export function resolvePage(pathname) {
  if (pathname === '/') return { albumId: 'liquid-reset', trackId: null };

  const match = /^\/albums\/([^/]+)(?:\/tracks\/([^/]+))?\/?$/.exec(pathname);
  if (!match) return null;

  try {
    return {
      albumId: decodeURIComponent(match[1]),
      trackId: match[2] ? decodeURIComponent(match[2]) : null
    };
  } catch {
    return null;
  }
}

export function mergeAlbums(albums = [], defaults = []) {
  const byId = new Map(defaults.map((album) => [album.id, album]));
  for (const album of albums) {
    if (!album.id) continue;
    const localAlbum = byId.get(album.id);
    byId.set(album.id, {
      ...localAlbum,
      ...album,
      coverUrl: album.coverUrl || localAlbum?.coverUrl,
      // Keep local lyric sheets authoritative when the deployed API has older audio links.
      tracks: localAlbum?.tracks?.some((track) => track.lyrics?.length)
        ? localAlbum.tracks
        : album.tracks ?? localAlbum?.tracks ?? []
    });
  }
  return [...byId.values()];
}
