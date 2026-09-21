import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminData } from '../../context/AdminDataContext';
import { useToast } from '../../../hooks/useToast';
import StepIndicator from '../../components/StepIndicator';
import StepPropertyDetails from './steps/StepPropertyDetails';
import StepAdditionalDetails from './steps/StepAdditionalDetails';
import StepPhotos from './steps/StepPhotos';
import StepPhotoVerification from './steps/StepPhotoVerification';
import StepHighlights from './steps/StepHighlights';
import StepReview from './steps/StepReview';
import { emptyPropertyDraft, validateProperty, validateDraftSave } from '../../utils/propertyValidation';

const STEP_LABELS = ['Property Details', 'Additional Details', 'Photos', 'Photo Verification', 'Highlights', 'Review'];

export default function PropertyFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { getProperty, addProperty, updateProperty, experts } = useAdminData();
  const { showToast } = useToast();

  const existing = isEdit ? getProperty(id) : null;

  const [draft, setDraft] = useState(() => {
    if (isEdit && existing) return { ...emptyPropertyDraft(experts[0]?.id), ...existing };
    return emptyPropertyDraft(experts[0]?.id);
  });
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && !existing) {
      navigate('/admin/properties', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, existing]);

  const setField = (key, value) => setDraft((d) => ({ ...d, [key]: value }));
  const setAddressField = (key, value) => setDraft((d) => ({ ...d, address: { ...d.address, [key]: value } }));

  const goToStep = (i) => { setStepIndex(i); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const goNext = () => goToStep(Math.min(stepIndex + 1, STEP_LABELS.length - 1));
  const goBack = () => {
    if (stepIndex === 0) { navigate('/admin/properties'); return; }
    goToStep(stepIndex - 1);
  };

  const persist = (status) => {
    const record = { ...draft, status };
    if (isEdit) {
      updateProperty(existing.id, record);
      return existing.id;
    }
    const created = addProperty(record);
    return created.id;
  };

  const handleSaveDraft = () => {
    const { errors: draftErrors, isValid } = validateDraftSave(draft);
    setErrors(draftErrors);
    if (!isValid) return;
    setSaving(true);
    persist('draft');
    showToast('Draft saved.');
    setSaving(false);
    navigate('/admin/properties');
  };

  const handlePublish = () => {
    const { errors: pubErrors, isValid } = validateProperty(draft);
    setErrors(pubErrors);
    if (!isValid) {
      const firstErrorStep = pubErrors.photos ? 2 : (pubErrors.address ? 1 : 0);
      goToStep(firstErrorStep);
      return;
    }
    setSaving(true);
    persist('published');
    showToast('✓ Property published successfully');
    setSaving(false);
    navigate('/admin/properties');
  };

  const stepProps = useMemo(() => ({ draft, setField, setAddressField, errors, experts, goToStep }), [draft, errors, experts]);

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1>{isEdit ? 'Edit Property' : 'Add Property'}</h1>
          <p>{isEdit ? 'Update listing details across the wizard steps.' : 'Complete each step to publish a new listing.'}</p>
        </div>
      </div>

      <StepIndicator steps={STEP_LABELS} currentIndex={stepIndex} />

      {stepIndex === 0 && <StepPropertyDetails {...stepProps} />}
      {stepIndex === 1 && <StepAdditionalDetails {...stepProps} />}
      {stepIndex === 2 && <StepPhotos {...stepProps} />}
      {stepIndex === 3 && <StepPhotoVerification {...stepProps} />}
      {stepIndex === 4 && <StepHighlights {...stepProps} />}
      {stepIndex === 5 && <StepReview {...stepProps} />}

      <div className="admin-wizard-actions">
        <button className="admin-btn admin-btn-secondary" onClick={goBack}>
          {stepIndex === 0 ? 'Cancel' : '← Back'}
        </button>
        <div className="admin-wizard-actions-right">
          <button className="admin-btn admin-btn-secondary" onClick={handleSaveDraft} disabled={saving}>Save Draft</button>
          {stepIndex < STEP_LABELS.length - 1 ? (
            <button className="admin-btn admin-btn-dark" onClick={goNext}>Continue →</button>
          ) : (
            <button className="admin-btn admin-btn-primary" onClick={handlePublish} disabled={saving}>Publish Property →</button>
          )}
        </div>
      </div>
    </div>
  );
}
