import express from 'express';
import { deleteUser, getAllUsers, login, signin, updateUser } from '../controllers/users.controller';
import { authMiddleware } from '../utils/auth';

const router = express.Router();

router.get('/', authMiddleware, getAllUsers);
router.post('/register', signin);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;