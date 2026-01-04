import { neon } from '@netlify/neon';

export default async (req) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { file, platform, version } = await req.json();

    if (!file || !platform) {
      return new Response('Missing required fields', { status: 400 });
    }

    const sql = neon();

    await sql`
      INSERT INTO downloads (file, platform, version, downloaded_at)
      VALUES (${file}, ${platform}, ${version || null}, NOW())
    `;

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Download tracking error:', error);
    return new Response(JSON.stringify({ error: 'Failed to track download' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const config = {
  path: '/api/track-download'
};
