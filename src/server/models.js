import mongoose from 'mongoose';

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  }
})


// Create Model
const CatModel = mongoose.model('cat', catSchema);

// Export Model
export { CatModel };