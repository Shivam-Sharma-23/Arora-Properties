export default function FormField({ label, hint, error, children }) {
  return (
    <div className="admin-form-field">
      {label && <label>{label}</label>}
      {children}
      {hint && !error && <span className="hint">{hint}</span>}
      {error && <p className="admin-error-text">{error}</p>}
    </div>
  );
}
