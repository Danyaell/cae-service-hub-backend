export const getAllSoftwareRequests = (_req: any, res: any) => {
    res.send('Getting all Software Requests');
};

export const getSoftwareRequest = (_req: any, res: any) => {
    res.send('Getting Software Request');
};

export const createSoftwareRequest = (req: any, res: any) => {
    console.log(req.body);
    res.send('Creating a new Software Request');
};

export const updateSoftwareRequest = (_req: any, res: any) => {
    res.send('Updating Software Request');
};

export const deleteSoftwareRequest = (_req: any, res: any) => {
    res.send('Deleting Software Request');
};

export const getAllReports = (_req: any, res: any) => {
    res.send('Getting all Reports');
};

export const getReport = (_req: any, res: any) => {
    res.send('Getting Report');
};

export const createReport = (_req: any, res: any) => {
    res.send('Creating a new Report');
};

export const updateReport = (_req: any, res: any) => {
    res.send('Updating Report');
};

export const deleteReport = (_req: any, res: any) => {
    res.send('Deleting Report');
};
