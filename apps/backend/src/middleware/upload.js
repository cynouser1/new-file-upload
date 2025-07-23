import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
// Create uploads directory with proper path
const uploadsDir = path.join(__dirname, '..', '..', 'uploads');
// const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
    // Use the absolute path to the uploads directory
    // cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter function to validate file types
// const fileFilter = (req, file, cb) => {
//   // Accept images only
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return cb(new Error('Only image files are allowed!'), false);
//   }
//   cb(null, true);
// };

// Create the multer upload instance
const upload = multer({
  storage: storage,
  // fileFilter: fileFilter,
  // limits: {
  //   fileSize: 5 * 1024 * 1024 // 5MB limit
  // }
});

// Middleware for handling form uploads with single and multiple images
const uploadFormFiles = upload.fields([
  { name: 'singleImage', maxCount: 1 },
  { name: 'multipleImages', maxCount: 10 }
]);

export default uploadFormFiles;