import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import formRoutes from './routes/formRoutes.js';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const host = process.env.HOST ?? '0.0.0.0'; // Use 
const app = express();
const port = process.env.PORT || 5200;

// MongoDB connection
connectDB();

// Middleware
// app.use(cors());
app.use(cors({ origin: "*" })); // this will allow all origins
app.use(express.json());

// Set up __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use("/api", formRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Hello API from new file upload' });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});