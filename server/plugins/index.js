import mongoose from 'mongoose'

export default async (nitroApp) => {
  try {
    await mongoose.connect(useRuntimeConfig().mongoUri)
    console.log('Connected to MongoDB!')
  } catch (err) {
    console.error(err)
  }
}