import { getPendingImage, clearPendingImage } from './pendingImages';
import { getAdminToken } from '../AdminGuard';
import { API_BASE_URL } from '../../utils/apiBase';

function readAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] || '');
    reader.onerror = () => reject(reader.error || new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

function collectBlobUrls(value, found) {
  if (typeof value === 'string') {
    if (value.startsWith('blob:')) found.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collectBlobUrls(v, found));
  } else if (value && typeof value === 'object') {
    Object.values(value).forEach((v) => collectBlobUrls(v, found));
  }
  return found;
}

function replaceBlobUrls(value, map) {
  if (typeof value === 'string') return map.has(value) ? map.get(value) : value;
  if (Array.isArray(value)) return value.map((v) => replaceBlobUrls(v, map));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = replaceBlobUrls(v, map);
    return out;
  }
  return value;
}

// Resolves any pending blob: image URLs inside `data` to their final
// committed /uploads/<name> paths, POSTs the result plus the raw image
// bytes to the save-content function (which commits both to GitHub in one
// push), and returns the resolved data so the caller can use it as the new
// state whether or not the network call itself succeeds.
export async function syncContentToGitHub(data) {
  const blobUrls = collectBlobUrls(data, new Set());
  const urlToFinal = new Map();
  const images = [];

  for (const blobUrl of blobUrls) {
    const pending = getPendingImage(blobUrl);
    if (!pending) continue;
    urlToFinal.set(blobUrl, '/' + pending.path);
    images.push({
      path: pending.path,
      base64: await readAsBase64(pending.file),
      contentType: pending.file.type,
    });
  }

  const resolved = replaceBlobUrls(data, urlToFinal);
  const stamped = { ...resolved, _meta: { updatedAt: new Date().toISOString() } };

  const token = getAdminToken();
  if (!token) {
    return { data: stamped, synced: false, error: 'Not signed in to the publish service.' };
  }

  try {
    const res = await fetch(API_BASE_URL + '/save-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
      body: JSON.stringify({ content: stamped, images }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { data: stamped, synced: false, error: body.error || ('Publish failed (' + res.status + ').') };
    }
    urlToFinal.forEach((_, blobUrl) => clearPendingImage(blobUrl));
    return { data: stamped, synced: true };
  } catch (e) {
    return { data: stamped, synced: false, error: 'Could not reach the publish service.' };
  }
}
