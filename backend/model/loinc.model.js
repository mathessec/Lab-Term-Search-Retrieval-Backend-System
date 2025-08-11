import mongoose from 'mongoose';

const loincSchema = new mongoose.Schema({
  LOINC_NUM: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  COMPONENT: {
    type: String,
    required: true,
    index: true
  },
  PROPERTY: {
    type: String,
    index: true
  },
  SCALE_TYP: {
    type: String,
    index: true
  },
  METHOD_TYP: {
    type: String,
    index: true
  },
  RELATEDNAMES2: {
    type: String,
    index: true
  },
  SHORTNAME: {
    type: String,
    index: true
  },
  EXAMPLE_UNITS: {
    type: String
  },
  LONG_COMMON_NAME: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: true,
  collection: 'excel_1754889340230' // Your existing collection name
});

// Create text indexes for full-text search
loincSchema.index({
  COMPONENT: 'text',
  LONG_COMMON_NAME: 'text',
  SHORTNAME: 'text',
  RELATEDNAMES2: 'text'
}, {
  weights: {
    COMPONENT: 10,
    LONG_COMMON_NAME: 8,
    SHORTNAME: 5,
    RELATEDNAMES2: 3
  }
});

export default mongoose.model('Loinc', loincSchema);