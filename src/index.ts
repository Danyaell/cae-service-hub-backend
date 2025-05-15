import express from 'express';
import softwareRequestsRouter from './routes/softwareRequests.routes';
import reportsRouter from './routes/reports.routes';

const PORT = 3000;
const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use('/api/software-requests', softwareRequestsRouter);
app.use('/api/reports', reportsRouter);