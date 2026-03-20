import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware.js';
import { mockUsers } from '../data/mock-data.js'; // Import the data!
import * as R from '../utils/response.js';

const router = Router();

// Real Profile logic for your Frontend
router.get('/profile', authenticate, (req, res) => {
  // Use the ID attached to the request by the authenticate middleware
  const user = mockUsers.find((u) => u.id === req.user.id);

  if (!user) {
    return R.notFound(res, 'User profile not found');
  }

  // Strip the password so we don't send it to the browser
  const { password, ...safeUser } = user;
  
  return R.ok(res, safeUser, 'Profile retrieved');
});

export default router;