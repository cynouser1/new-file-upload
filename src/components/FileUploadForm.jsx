import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

const FileUploadForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
    singleImage: null,
    multipleImages: []
  });

  const onSingleDrop = (acceptedFiles) => {
    setFormData(prev => ({
      ...prev,
      singleImage: acceptedFiles[0]
    }));
  };

  const onMultipleDrop = (acceptedFiles) => {
    setFormData(prev => ({
      ...prev,
      multipleImages: [...prev.multipleImages, ...acceptedFiles]
    }));
  };

  const { getRootProps: getSingleRootProps, getInputProps: getSingleInputProps } = useDropzone({
    onDrop: onSingleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const { getRootProps: getMultipleRootProps, getInputProps: getMultipleInputProps } = useDropzone({
    onDrop: onMultipleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('description', formData.description);
    
    if (formData.singleImage) {
      formDataToSend.append('singleImage', formData.singleImage);
    }
    
    formData.multipleImages.forEach((file, index) => {
      formDataToSend.append(`multipleImages`, file);
    });

    console.log('Form Data:', {
      name: formData.name,
      email: formData.email,
      description: formData.description,
      singleImage: formData.singleImage?.name,
      multipleImages: formData.multipleImages.map(file => file.name)
    });

    try {
      const response = await fetch('http://localhost:5200/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });
      const data = await response.json();
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">File Upload Form</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Single Image Upload</label>
          <div
            {...getSingleRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors cursor-pointer"
          >
            <div className="space-y-1 text-center">
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <input {...getSingleInputProps()} />
                <p>Drag & drop a single image, or click to select</p>
              </div>
            </div>
          </div>
          {formData.singleImage && (
            <p className="mt-2 text-sm text-gray-500">
              Selected: {formData.singleImage.name}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Multiple Images Upload</label>
          <div
            {...getMultipleRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors cursor-pointer"
          >
            <div className="space-y-1 text-center">
              <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <input {...getMultipleInputProps()} />
                <p>Drag & drop multiple images, or click to select</p>
              </div>
            </div>
          </div>
          {formData.multipleImages.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Selected files:</p>
              <ul className="mt-1 text-sm text-gray-500">
                {formData.multipleImages.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Upload
        </button>
      </div>
    </form>
  );
};

export default FileUploadForm;