import { useToast } from '../../hooks/useToast';
import './Toast.css';

export default function Toast() {
  const { toast } = useToast();
  if (!toast) return null;

  return (
    <div className="toast">
      <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="#7ED9B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      {toast}
    </div>
  );
}
