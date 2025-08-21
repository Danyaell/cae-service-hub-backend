import express from 'express';
import cors from 'cors';
import usersRouter from './routes/users.routes';
import softwareRequestsRouter from './routes/softwareRequests.routes';
import reportsRouter from './routes/reports.routes';
import lostItemsRouter from './routes/lostItems.routes';
import {
  API_LOST_ITEMS,
  API_REPORTS,
  API_SOFTWARE_REQUEST,
  API_USERS,
} from './constants/routes.const';
//import { authMiddleware } from './utils/auth';
// Optional: use of middleware for authentication validation in routes.

/**
 * Initializes the Express application instance.
 */
export const app = express();

/**
 * Enables CORS for the frontend application.
 */
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

/**
 * Middleware to parse incoming JSON requests.
 */
app.use(express.json());

/**
 * Route handlers for the application API.
 */
app.use(API_SOFTWARE_REQUEST, softwareRequestsRouter);
app.use(API_REPORTS, reportsRouter);
app.use(API_LOST_ITEMS, lostItemsRouter);
app.use(API_USERS, usersRouter);
