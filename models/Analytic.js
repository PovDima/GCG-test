import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create Schema
const AnaliticSchema = new Schema({
  userId: { type: String, required: true },
  area: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Analytic = mongoose.model('Analytic', AnaliticSchema);

export default Analytic;
