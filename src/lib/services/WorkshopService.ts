import type { PoolClient } from "pg";
import type { Appointment } from "./AppointmentService";

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
  colorClass?: string; // Used for calendar
}

export interface WorkshopCategory {
  categoryid: number;
  categoryname: string;
  price: number;
  appointmentcount: number;
}

export class WorkshopService {
  private dbClient: PoolClient;

  constructor(dbClient: PoolClient) {
    this.dbClient = dbClient;
  }

  async deleteWorkshop(workshopId: number): Promise<number> {
    try {
      await this.dbClient.query(
        `DELETE FROM Workshops
         WHERE WorkshopID = $1`,
        [workshopId],
      );
      return 200;
    } catch (error) {
      console.error("Error deleting workshop:", error);
      return 500;
    }
  }

  async createWorkshop(
    title: string,
    description: string,
    categoryid: number,
    maxparticipants: number,
  ): Promise<number | unknown> {
    try {
      const result = await this.dbClient.query(
        `INSERT INTO Workshops (Title, Description, CategoryID, MaxParticipants)
           VALUES ($1, $2, $3, $4)
          RETURNING WorkshopID`,
        [title, description, categoryid, maxparticipants],
      );
      return result.rows[0].workshopid;
    } catch (error) {
      console.error("Error creating workshop:", error);
      return error;
    }
  }

  async getWorkshopById(id: number): Promise<Workshop | undefined> {
    try {
      const workshopResult = await this.dbClient.query(
        `SELECT w.*, c.CategoryName, c.AppointmentCount
           FROM Workshops w
                  JOIN WorkshopCategories c ON w.CategoryID = c.CategoryID
           WHERE w.WorkshopID = $1`,
        [id],
      );

      if (workshopResult.rows.length === 0) {
        return undefined;
      }

      const workshop: Workshop = workshopResult.rows[0];

      const appointmentsResult = await this.dbClient.query(
        `SELECT *
           FROM Appointments
           WHERE WorkshopID = $1`,
        [id],
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
                  JOIN WorkshopCategories c ON w.CategoryID = c.CategoryID`,
      );

      const workshops: Workshop[] = workshopsResult.rows;

      for (const workshop of workshops) {
        const appointmentsResult = await this.dbClient.query(
          `SELECT *
             FROM Appointments
             WHERE WorkshopID = $1`,
          [workshop.workshopid],
        );

        workshop.appointments = appointmentsResult.rows;
      }

      return workshops;
    } catch (error) {
      console.error("Error fetching all workshops:", error);
      return [];
    }
  }

  async getWorkshopCatoegoryById(
    workshopId: number,
  ): Promise<number | undefined> {
    try {
      const categoryResult = await this.dbClient.query(
        `SELECT categoryid
               FROM workshops
               WHERE workshopid = $1`,
        [workshopId],
      );

      if (categoryResult.rows.length === 0) {
        return undefined;
      }

      return categoryResult.rows[0].categoryid;
    } catch (error) {
      console.error("Error fetching workshop category by ID:", error);
      return undefined;
    }
  }

  async getWorkshopPrice(categoryid: number): Promise<number | unknown> {
    try {
      const priceResult = await this.dbClient.query(
        `SELECT Price
           FROM WorkshopCategories
           WHERE CategoryID = $1`,
        [categoryid],
      );

      return priceResult.rows[0].price;
    } catch (error) {
      console.error("Error fetching workshop price:", error);
      return error;
    }
  }

  async getRemainingAppointments(
    workshopid: number,
  ): Promise<number | unknown> {
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
        [workshopid],
      );

      return appointmentResult.rows[0].availableslots;
    } catch (error) {
      console.error("Error fetching remaining appointments:", error);
      return error;
    }
  }
  async getAllCategories(): Promise<WorkshopCategory[]> {
    try {
      const categoriesResult = await this.dbClient.query(
        `SELECT * FROM WorkshopCategories`,
      );
      return categoriesResult.rows;
    } catch (error) {
      console.error("Error fetching all categories:", error);
      return [];
    }
  }
  async updateWorkshop(workshop: Workshop): Promise<number> {
    try {
      await this.dbClient.query(
        `UPDATE Workshops
             SET Title = $1, Description = $2, CategoryID = $3, MaxParticipants = $4
             WHERE WorkshopID = $5`,
        [
          workshop.title,
          workshop.description,
          workshop.categoryid,
          workshop.maxparticipants,
          workshop.workshopid,
        ],
      );
      return 200;
    } catch (error) {
      console.error("Error updating workshop:", error);
      return 500;
    }
  }
  async getCategoryById(
    categoryId: number,
  ): Promise<WorkshopCategory | undefined> {
    try {
      const categoryResult = await this.dbClient.query(
        `SELECT *
             FROM WorkshopCategories
             WHERE CategoryID = $1`,
        [categoryId],
      );
      if (categoryResult.rows.length === 0) {
        return undefined;
      }
      return categoryResult.rows[0];
    } catch (error) {
      console.error("Error fetching category by ID:", error);
      return undefined;
    }
  }
  async createCategory(
    categoryname: string,
    price: number,
    appointmentcount: number,
  ): Promise<number> {
    try {
      await this.dbClient.query(
        `INSERT INTO WorkshopCategories (CategoryName, Price, AppointmentCount)
               VALUES ($1, $2, $3)`,
        [categoryname, price, appointmentcount],
      );
      return 200;
    } catch (error) {
      console.error("Error creating category:", error);
      return 500;
    }
  }
  async updateCategory(
    categoryid: number,
    categoryname: string,
    categoryprice: number,
    categoryappointmentcount: number,
  ): Promise<number> {
    try {
      await this.dbClient.query(
        `UPDATE WorkshopCategories
             SET CategoryName = $1, Price = $2, AppointmentCount = $3
             WHERE CategoryID = $4`,
        [categoryname, categoryprice, categoryappointmentcount, categoryid],
      );
      return 200;
    } catch (error) {
      console.error("Error updating category:", error);
      return 500;
    }
  }
  async deleteCategory(categoryid: number): Promise<number> {
    try {
      await this.dbClient.query(
        `DELETE FROM WorkshopCategories
             WHERE CategoryID = $1`,
        [categoryid],
      );
      return 200;
    } catch (error) {
      console.error("Error deleting category:", error);
      return 500;
    }
  }
}
