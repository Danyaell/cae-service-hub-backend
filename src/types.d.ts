// Aquí tipeamos el objeto de configuración

export type Room = 203 | 204;
export type Roles = "Estudiante" | "Docente" | "Encargado";

export interface SoftwareRequest {
    id: number,
    requestDate: Date,
    requestorName: string,
    room: string,
    software: string,
    attendant: string,
    commitmentDate: Date,
};

export interface Report {
    id: number,
    reportDate: Date,
    reporterName: string,
    role: Roles,
    room: Room,
    pc: string,
    description: string,
    attendant: string,
    actionTaken: string,
};
