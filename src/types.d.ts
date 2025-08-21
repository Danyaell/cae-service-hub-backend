import { status } from './generated/prisma/index';
// Aquí tipeamos el objeto de configuración

export type Room = 203 | 204;
export type Roles = "Estudiante" | "Docente" | "Encargado";
export type Status = "pending" | "in_progress" | "needs_attention" | "completed" | "cancelled";

export interface User {
    id: number,
    name: string,
    password: string,
    role: Roles,
    createdAt: Date,
    updatedAt: Date,
    attendedReports: Report[],
    attendedSoftwareRequests: SoftwareRequest[],
};

export interface SoftwareRequest {
    id: number,
    requestDate: Date,
    requestorName: string,
    room: Room,
    software: string,
    attendantId: number,
    commitmentDate: Date,
    status: Status,
};

export interface Report {
    id: number,
    reportDate: Date,
    reporterName: string,
    role: Roles,
    room: Room,
    pc: string,
    description: string,
    attendantId: number,
    actionTaken: string,
    status: Status,
};