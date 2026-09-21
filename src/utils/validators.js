export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_RE = /^[0-9+\-\s]{7,15}$/;

export function validateScheduleForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!EMAIL_RE.test(form.email)) errors.email = 'Enter a valid email';
  if (!PHONE_RE.test(form.phone)) errors.phone = 'Enter a valid phone number';
  if (!form.date) errors.date = 'Pick a date';
  if (!form.time) errors.time = 'Pick a time';
  return errors;
}
