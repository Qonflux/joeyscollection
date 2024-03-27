import mongoose from 'mongoose'

const schema = mongoose.Schema({
  completed: {
    type: Boolean,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  genres: {
    type: Array,
    required: true
  },
  igdbId: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  platform: {
    type: String,
    required: true
  },
  releaseDate: {
    type: String,
    required: true
  }
},
{
  timestamps: true
})

export default mongoose.model('Game', schema)