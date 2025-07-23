import Form from '../models/Form.js';

/**
 * Handle form submission with file uploads
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const submitForm = async (req, res) => {
  try {
    const { name, email, description } = req.body;
    
    // Extract file information from the request
    const singleImage = req.files['singleImage'] 
      ? req.files['singleImage'][0].filename 
      : null;
      
    const multipleImages = req.files['multipleImages'] 
      ? req.files['multipleImages'].map(file => file.filename) 
      : [];

    // Create a new form document
    const form = new Form({
      name,
      email,
      description,
      singleImage,
      multipleImages
    });
    console.log("form", form);

    // Save to database
    await form.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      data: form
    });
  } catch (error) {
    console.error('Error saving form:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error saving form', 
      error: error.message 
    });
  }
};

/**
 * Get all submitted forms
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: forms.length,
      data: forms
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error fetching forms', 
      error: error.message 
    });
  }
};