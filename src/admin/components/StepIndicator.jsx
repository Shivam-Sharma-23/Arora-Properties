export default function StepIndicator({ steps, currentIndex }) {
  return (
    <div className="admin-steps">
      {steps.map((label, i) => (
        <div key={label} className={'admin-step' + (i === currentIndex ? ' active' : i < currentIndex ? ' done' : '')}>
          <div className="admin-step-dot">{i < currentIndex ? '✓' : i + 1}</div>
          <div className="admin-step-label">{label}</div>
          <div className="admin-step-connector" />
        </div>
      ))}
    </div>
  );
}
