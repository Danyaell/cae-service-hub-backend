import express from 'express';
import { deleteUser, getAllUsers, login, signin, updateUser } from '../controllers/users.controller';

const router = express.Router();

router.get('/', getAllUsers);
router.post('/register', signin);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;