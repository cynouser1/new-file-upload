import express from 'express';
import { submitForm, getForms } from '../controllers/formController.js';
import uploadFormFiles from '../middleware/upload.js';

const router = express.Router();

// POST /api/forms - Submit a new form with file uploads
router.post('/submit', uploadFormFiles, submitForm);

// GET /api/forms - Get all submitted forms
router.get('/get', getForms);

export default router;