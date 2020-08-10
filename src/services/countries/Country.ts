import mongoose, { Document, Schema } from 'mongoose';

/**
 * Types
 */
export interface CountryModel extends Document {
  name: string;
}

/**
 * Models
 */
const countrySchema: Schema = new mongoose.Schema({
  name: { type: String, required: true }
});

const Country = mongoose.model<CountryModel>('country', countrySchema);

export default Country;
