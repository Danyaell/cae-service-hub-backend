//
// ─── ENUMS & TYPE ALIASES ───────────────────────────────────────────────
//

/**
 * Supported room numbers.
 */
export type Room = 203 | 204;

/**
 * User roles available in the system.
 */
export type Roles = "Estudiante" | "Docente" | "Encargado";

/**
 * Current status of a request or report.
 */
export type Status = "pending" | "in_progress" | "needs_attention" | "completed" | "cancelled";

//
// ─── INTERFACES ─────────────────────────────────────────────────────────
//

/**
 * Represents a user with their assigned reports and requests.
 */
export interface User {
  id: number;
  name: string;
  password: string;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
  attendedReports: Report[];
  attendedSoftwareRequests: SoftwareRequest[];
}

/**
 * Represents a request for software.
 */
export interface SoftwareRequest {
  id: number;
  requestDate: Date;
  requestorName: string;
  room: Room;
  software: string;
  attendantId: number;
  commitmentDate: Date;
  status: Status;
}

/**
 * Represents a technical or support report.
 */
export interface Report {
  id: number;
  reportDate: Date;
  reporterName: string;
  role: Roles;
  room: Room;
  pc: string;
  description: string;
  attendantId: number;
  actionTaken: string;
  status: Status;
}
