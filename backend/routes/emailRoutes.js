import express from 'express';
import { sendJobApplicationEmail } from '../controllers/emailController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js'; // Import authentication middleware

const router = express.Router();

// Apply authentication middleware to the route
router.post('/send-email', isAuthenticated, sendJobApplicationEmail);

export default router;
