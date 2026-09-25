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

export function validateReviewForm(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required';
  if (!form.rating) errors.rating = 'Select a rating';
  if (!form.text.trim()) errors.text = 'Write a few words about your experience';
  else if (form.text.trim().length < 10) errors.text = 'Please write at least 10 characters';
  return errors;
}
