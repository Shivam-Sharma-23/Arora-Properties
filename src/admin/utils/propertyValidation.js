export function emptyPropertyDraft(defaultAgentId) {
  return {
    title: '',
    type: 'Apartment',
    buyRent: 'rent',
    location: '',
    bedrooms: 2,
    agentId: defaultAgentId || null,
    rating: 4.5,
    featured: false,

    buildupArea: '',
    carpetArea: '',
    age: '',
    bathrooms: '2',
    balconies: '1',
    furnishingType: 'Semi Furnished',
    coveredParking: '0',
    openParking: '0',

    tenantPreference: 'Family',
    bachelorPreference: null,
    petFriendly: 'No',

    availableFrom: '',
    price: '',
    maintenanceCharges: 'Included in Rent',
    maintenanceAmount: '',
    securityDeposit: '1 Month',
    securityDepositCustom: '',
    lockInPeriod: 'None',
    lockInCustom: '',
    brokerage: 'None',
    brokerageCustom: '',
    brokerageNegotiable: 'No',

    parkingCharges: 'Included in Rent',
    parkingChargesAmount: '',
    paintingCharges: 'None',
    paintingChargesAmount: '',
    facing: 'North',
    address: { flat: '', building: '', street: '', locality: '', city: '', state: '', pincode: '' },
    servantRoom: 'No',
    description: '',

    photos: [],
    photoVerification: {},

    highlights: {
      locationConnectivity: [],
      amenitiesWellness: [],
      propertyFeatures: [],
      securityFeatures: [],
    },

    status: 'draft',
  };
}

export function validateProperty(draft) {
  const errors = {};

  if (!draft.title || !draft.title.trim()) errors.title = 'Property title is required.';
  if (!draft.price || Number(draft.price) <= 0) {
    errors.price = draft.buyRent === 'rent' ? 'Monthly rent is required.' : 'Price is required.';
  }
  if (!draft.buildupArea || Number(draft.buildupArea) <= 0) errors.buildupArea = 'Buildup area is required.';
  if (!draft.furnishingType) errors.furnishingType = 'Please select furnishing type.';
  if (!draft.photos || draft.photos.length === 0) errors.photos = 'Please upload at least one property image.';

  const addr = draft.address || {};
  if (!addr.locality?.trim() && !addr.city?.trim() && !draft.location?.trim()) {
    errors.address = 'Please enter the property address.';
  }

  if (draft.tenantPreference === 'Bachelors' && !draft.bachelorPreference) {
    errors.bachelorPreference = 'Please select a bachelor preference.';
  }
  if (draft.maintenanceCharges === 'Separate' && !draft.maintenanceAmount) {
    errors.maintenanceAmount = 'Please enter the maintenance amount.';
  }
  if (draft.securityDeposit === 'Custom' && !draft.securityDepositCustom) {
    errors.securityDepositCustom = 'Please enter the custom security deposit.';
  }
  if (draft.lockInPeriod === 'Custom' && !draft.lockInCustom) {
    errors.lockInCustom = 'Please enter the custom lock-in period.';
  }
  if (draft.brokerage === 'Custom' && !draft.brokerageCustom) {
    errors.brokerageCustom = 'Please enter the brokerage amount.';
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}

export function validateDraftSave(draft) {
  // Drafts only require a title so admins can save partial progress.
  const errors = {};
  if (!draft.title || !draft.title.trim()) errors.title = 'Give the draft a title so you can find it later.';
  return { errors, isValid: Object.keys(errors).length === 0 };
}
