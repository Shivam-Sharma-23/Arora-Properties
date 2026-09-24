import { signToken } from './_auth.js';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Method not allowed.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Invalid JSON body.' }) };
  }

  const expectedPassword = process.env.ADMIN_PASSWORD;
  const secret = process.env.TOKEN_SECRET;
  if (!expectedPassword || !secret) {
    return {
      statusCode: 500,
      headers: JSON_HEADERS,
      body: JSON.stringify({ error: 'Admin login is not configured (missing ADMIN_PASSWORD/TOKEN_SECRET).' }),
    };
  }

  if (typeof body.password !== 'string' || body.password !== expectedPassword) {
    return { statusCode: 401, headers: JSON_HEADERS, body: JSON.stringify({ error: 'Incorrect password.' }) };
  }

  const token = signToken({ role: 'admin' }, secret);
  return { statusCode: 200, headers: JSON_HEADERS, body: JSON.stringify({ token }) };
};
