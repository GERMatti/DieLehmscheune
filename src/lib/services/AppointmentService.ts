import type {PoolClient} from "pg";

export interface Appointment {
    appointmentid: number;
    workshopid: number;
    duration: number;
    appointmentdate: Date;
    formattedAppointmentDate?: string;
    formattedTime?: string;
}

export class AppointmentService {
    private dbClient: PoolClient;

    constructor(dbClient: PoolClient) {
        this.dbClient = dbClient;
    }
    async createAppointments(appointments: Appointment[]): Promise<number> {
        try {
            for (const appointment of appointments) {
                await this.dbClient.query(
                    `INSERT INTO Appointments (WorkshopID, Duration, AppointmentDate)
                 VALUES ($1, $2, $3)`,
                    [
                        appointment.workshopid,
                        appointment.duration,
                        appointment.appointmentdate,
                    ],
                );
            }
            return 200;
        } catch (error) {
            console.error("Error creating appointments:", error);
            return 500;
        }
    }
    async getAllAppointmentsFromWorkshop(
        workshopId: number,
    ): Promise<Appointment[]> {
        try {
            const appointmentsResult = await this.dbClient.query(
                `SELECT *
             FROM Appointments
             WHERE WorkshopID = $1`,
                [workshopId],
            );
            return appointmentsResult.rows;
        } catch (error) {
            console.error("Error fetching all appointments:", error);
            return [];
        }
    }
    async updateAppointments(appointments: Appointment[]): Promise<number> {
        try {
            for (const appointment of appointments) {
                await this.dbClient.query(
                    `UPDATE Appointments
               SET Duration = $1, AppointmentDate = $2
               WHERE AppointmentID = $3`,
                    [
                        appointment.duration,
                        appointment.appointmentdate,
                        appointment.appointmentid,
                    ],
                );
            }
            return 200;
        } catch (error) {
            console.error("Error updating appointments:", error);
            return 500;
        }
    }
}