import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5200;

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/fileupload', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Define Schema
const formSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    description: String,
    singleImage: String,
    multipleImages: [String]
  },
  { timestamps: true }
);

const Form = mongoose.model('Form', formSchema);

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Upload endpoint
app.post('/api/upload', upload.fields([
  { name: 'singleImage', maxCount: 1 },
  { name: 'multipleImages', maxCount: 10 }
]), async (req, res) => {
  try {
    const { name, email, description } = req.body;
    const singleImage = req.files['singleImage'] ? req.files['singleImage'][0].filename : null;
    const multipleImages = req.files['multipleImages'] ? req.files['multipleImages'].map(file => file.filename) : [];

    const form = new Form({
      name,
      email,
      description,
      singleImage,
      multipleImages
    });

    await form.save();

    res.status(201).json({
      message: 'Form submitted successfully',
      data: form
    });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ message: 'Error saving form', error: error.message });
  }
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.send({ message: 'Hello API from new file upload' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});