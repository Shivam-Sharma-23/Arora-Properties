import { generateId } from './id';

// In-memory registry mapping a session-local blob: URL (used for instant
// image previews) to the raw File plus the repo-relative path it will be
// committed to on the next successful sync. Never persisted — a page
// reload naturally drops any preview whose upload hasn't synced yet.
const registry = new Map();

function extensionFor(file) {
  const fromName = (file.name || '').split('.').pop();
  if (fromName && /^[a-z0-9]{2,5}$/i.test(fromName)) return fromName.toLowerCase();
  const fromType = (file.type || '').split('/').pop();
  return fromType && /^[a-z0-9]{2,5}$/i.test(fromType) ? fromType.toLowerCase() : 'jpg';
}

// Call in place of URL.createObjectURL(file) for any admin image upload.
// Returns the same kind of blob: URL for immediate <img> preview, while
// registering the file so a later sync can commit it and rewrite this URL
// to its final /uploads/<name> path.
export function registerImageFile(file) {
  const path = 'uploads/' + generateId('img') + '.' + extensionFor(file);
  const blobUrl = URL.createObjectURL(file);
  registry.set(blobUrl, { file, path });
  return blobUrl;
}

export function getPendingImage(blobUrl) {
  return registry.get(blobUrl);
}

export function clearPendingImage(blobUrl) {
  registry.delete(blobUrl);
}
