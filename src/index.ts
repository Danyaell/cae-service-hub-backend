import express from 'express';
import cors from 'cors';
import softwareRequestsRouter from './routes/softwareRequests.routes';
import reportsRouter from './routes/reports.routes';
import { API_REPORTS, API_SOFTWARE_REQUEST } from './constants/routes.const';

const PORT = 3000;
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use(API_SOFTWARE_REQUEST, softwareRequestsRouter);
app.use(API_REPORTS, reportsRouter);
