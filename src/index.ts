import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.routes';
import softwareRequestsRouter from './routes/softwareRequests.routes';
import reportsRouter from './routes/reports.routes';
import lostItemsRouter from './routes/lostItems.routes';
import { API_LOST_ITEMS, API_REPORTS, API_SOFTWARE_REQUEST, API_USERS } from './constants/routes.const';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;
export const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use(API_SOFTWARE_REQUEST, softwareRequestsRouter);
app.use(API_REPORTS, reportsRouter);
app.use(API_LOST_ITEMS, lostItemsRouter);
app.use(API_USERS, usersRouter);
