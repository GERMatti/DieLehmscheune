import type { PoolClient } from "pg";

export interface Workshop {
  workshopid: number;
  title: string;
  description: string;
  categoryid: number;
  maxparticipants: number;
  createdat: Date;
  categoryname: string;
  appointmentcount: number;
  appointments: Appointment[];
}

export interface Appointment {
  appointmentid: number;
  workshopid: number;
  duration: number;
  appointmentdate: Date;
  formattedAppointmentDate?: string;
  formattedTime?: string;
}

export class WorkshopService {
  private dbClient: PoolClient;

  constructor(dbClient: PoolClient) {
    this.dbClient = dbClient;
  }

  async getWorkshopById(id: number): Promise<Workshop | undefined> {
    try {
      const workshopResult = await this.dbClient.query(
          `SELECT w.*, c.CategoryName, c.AppointmentCount
         FROM Workshops w
         JOIN WorkshopCategories c ON w.CategoryID = c.CategoryID
         WHERE w.WorkshopID = $1`,
          [id]
      );

      if (workshopResult.rows.length === 0) {
        return undefined;
      }

      const workshop: Workshop = workshopResult.rows[0];

      const appointmentsResult = await this.dbClient.query(
          `SELECT * FROM Appointments WHERE WorkshopID = $1`,
          [id]
      );

      workshop.appointments = appointmentsResult.rows;

      return workshop;
    } catch (error) {
      console.error("Error fetching workshop by ID:", error);
      return undefined;
    }
  }

  async getAllWorkshops(): Promise<Workshop[]> {
    try {
      const workshopsResult = await this.dbClient.query(
          `SELECT w.*, c.CategoryName, c.AppointmentCount
         FROM Workshops w
         JOIN WorkshopCategories c ON w.CategoryID = c.CategoryID`
      );

      const workshops: Workshop[] = workshopsResult.rows;

      for (const workshop of workshops) {
        const appointmentsResult = await this.dbClient.query(
            `SELECT * FROM Appointments WHERE WorkshopID = $1`,
            [workshop.workshopid]
        );

        workshop.appointments = appointmentsResult.rows;
      }

      return workshops;
    } catch (error) {
      console.error("Error fetching all workshops:", error);
      return [];
    }
  }
  async getWorkshopPrice(categoryid: number): Promise<number | unknown> {
    try {
      const priceResult = await this.dbClient.query(
          `SELECT Price FROM WorkshopCategories WHERE CategoryID = $1`,
          [categoryid]
      );

      return priceResult.rows[0].price;
    } catch (error) {
      console.error("Error fetching workshop price:", error);
      return error;
  }
}
async getRemainingAppointments(workshopid: number): Promise<number | unknown> {
  try {
    const appointmentResult = await this.dbClient.query(
        `SELECT w.WorkshopID,
                w.MaxParticipants - COALESCE(SUM(r.SlotCount), 0) AS AvailableSlots
         FROM Workshops w
        LEFT JOIN
              Registrations r ON w.WorkshopID = r.WorkshopID
        WHERE w.WorkshopID = $1
        GROUP BY w.WorkshopID;
        `,
        [workshopid]
    );

    return appointmentResult.rows[0].availableslots;
  } catch (error) {
    console.error("Error fetching remaining appointments:", error);
    return error;
  }
}
}
