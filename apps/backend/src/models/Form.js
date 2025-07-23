import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: [true, 'Name is required']
  },
  email: {
    type: String,
    // required: [true, 'Email is required'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email']
  },
  description: {
    type: String,
    default: ''
  },
  singleImage: {
    type: String,
    default: null
  },
  multipleImages: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Form = mongoose.model('Form', formSchema);

export default Form;