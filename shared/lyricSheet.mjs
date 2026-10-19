function parseSections(text) {
  const sections = [];
  let section = { label: 'Lyrics', lines: [] };

  for (const line of text.trim().split('\n')) {
    const heading = /^\[([^\]]+)\]\s*$/.exec(line.trim());
    if (heading) {
      if (section.lines.some((item) => item.trim()) || section.label !== 'Lyrics') sections.push(section);
      section = { label: heading[1].trim(), lines: [] };
    } else {
      section.lines.push(line.trim());
    }
  }
  if (section.lines.some((line) => line.trim()) || section.label !== 'Lyrics') sections.push(section);

  return sections.map(({ label, lines }) => ({
    label,
    paragraphs: lines.join('\n').trim().split(/\n\s*\n/).filter(Boolean)
  }));
}

export function parseLyricSheet(markdown, sourceName = 'lyrics.md', { requireAudio = true } = {}) {
  const text = markdown.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const headings = [...text.matchAll(/^(\d+)\.[ \t]+([^\n]+)(?:\n|$)/gm)];
  const seen = new Set();

  return headings.map((match, index) => {
    const order = Number(match[1]);
    if (seen.has(order)) throw new Error(`Duplicate track ${order} in ${sourceName}`);
    seen.add(order);
    let body = text.slice(match.index + match[0].length, headings[index + 1]?.index ?? text.length).trim();
    const firstLine = body.split('\n')[0].trim();
    let youtubeUrl = null;
    let youtubeId = null;
    if (/^https?:\/\//.test(firstLine)) {
      youtubeUrl = firstLine;
      const url = new URL(youtubeUrl);
      if (!['youtu.be', 'youtube.com', 'www.youtube.com'].includes(url.hostname)) throw new Error(`Invalid YouTube audio for track ${order}`);
      youtubeId = url.hostname === 'youtu.be' ? url.pathname.slice(1) : url.searchParams.get('v');
      if (!/^[\w-]{11}$/.test(youtubeId || '')) throw new Error(`Invalid YouTube audio for track ${order}`);
      body = body.slice(firstLine.length).trim();
    } else if (requireAudio) {
      throw new Error(`Missing YouTube audio for track ${order} in ${sourceName}`);
    }
    const lyrics = parseSections(body);
    if (!lyrics.some((section) => section.paragraphs.length)) throw new Error(`Missing lyrics for track ${order}`);

    return { order, title: match[2].trim(), youtubeUrl, youtubeId, lyrics };
  });
}

