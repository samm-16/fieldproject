const mongoose = require('mongoose');

const ClientIdeaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  idea: { type: String, required: true },
  referenceImages: [String]
}, { timestamps: true });

module.exports = mongoose.model('ClientIdea', ClientIdeaSchema);
