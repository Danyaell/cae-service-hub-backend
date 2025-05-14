import express from 'express';
import softwareRequestsRouter from './routes/softwareRequests.routes';

const PORT = 3000;
const app = express();
app.use(express.json());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.use('/api/software-requests', softwareRequestsRouter);