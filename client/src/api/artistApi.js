const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export async function getArtist() {
  const response = await fetch(`${API_URL}/artist`);

  if (!response.ok) {
    throw new Error('Unable to load artist API.');
  }

  const data = await response.json();
  return data.artist;
}

export async function sendMessage(payload) {
  const response = await fetch(`${API_URL}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Unable to send message.');
  }

  return data;
}
