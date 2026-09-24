import { verifyToken } from './_auth.js';
import { commitFiles } from './_github.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_IMAGES_PER_SAVE = 20;
const IMAGE_PATH_RE = /^uploads\/[a-zA-Z0-9._-]+$/;

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Method not allowed.' }) };
  }

  const secret = process.env.TOKEN_SECRET;
  const authHeader = event.headers.authorization || event.headers.Authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!secret || !verifyToken(token, secret)) {
    return { statusCode: 401, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Unauthorized. Please sign in again.' }) };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Invalid JSON body.' }) };
  }

  const { content, images = [] } = payload;
  if (!content || typeof content !== 'object' || Array.isArray(content)) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Missing content.' }) };
  }
  if (!Array.isArray(images) || images.length > MAX_IMAGES_PER_SAVE) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Too many images in one save.' }) };
  }
  for (const img of images) {
    if (!img || typeof img.path !== 'string' || !IMAGE_PATH_RE.test(img.path)) {
      return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Invalid image path.' }) };
    }
    if (typeof img.base64 !== 'string' || !img.base64 || Buffer.byteLength(img.base64, 'base64') > MAX_IMAGE_BYTES) {
      return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Image missing or larger than 8MB.' }) };
    }
  }

  const files = images.map((img) => ({ path: 'frontend/public/' + img.path, content: img.base64, encoding: 'base64' }));
  files.push({
    path: 'frontend/src/data/siteContent.json',
    content: JSON.stringify(content, null, 2) + '\n',
    encoding: 'utf-8',
  });

  try {
    const commitSha = await commitFiles(files, 'Admin panel update via /admin');
    return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify({ ok: true, commitSha }) };
  } catch (e) {
    return { statusCode: 502, headers: JSON_HEADERS, body: JSON.stringify({ error: String(e.message || e) }) };
  }
};
