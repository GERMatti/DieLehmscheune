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

export interface Registration {
    registrationid: number;
    participantid: number;
    workshopid: number;
    slotcount: number;
    registeredat: Date;
}

export interface Participant {
    participantid: number;
    fullname: string;
    email: string;
    ischild: boolean;
}

export interface WorkshopCategory {
  categoryid: number;
  categoryname: string;
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
          `SELECT *
           FROM Appointments
           WHERE WorkshopID = $1`,
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
            `SELECT *
             FROM Appointments
             WHERE WorkshopID = $1`,
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
          `SELECT Price
           FROM WorkshopCategories
           WHERE CategoryID = $1`,
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

  async getAllRegistrationsFromWorkshop(workshopid: number): Promise<Participant[]> {
    try {
      const registrationsResult = await this.dbClient.query(
          `SELECT p.participantid, p.fullname, p.email, p.ischild, r.slotcount
           FROM Participants p
                  JOIN Registrations r ON p.participantid = r.participantid
           WHERE r.workshopid = $1
           ORDER BY p.participantid`,
          [workshopid]
      );

      const participants: Participant[] = [];
      for (const row of registrationsResult.rows) {
        for (let i = 0; i < row.slotcount; i++) {
          participants.push(row);
        }
      }

      return participants;
    } catch (error) {
      console.error("Error fetching all registrations:", error);
      return [];
    }
  }
  async getAllCategories(): Promise<WorkshopCategory[]> {
    try {
      const categoriesResult = await this.dbClient.query(
          `SELECT CategoryID, CategoryName FROM WorkshopCategories`
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
            [workshop.title, workshop.description, workshop.categoryid, workshop.maxparticipants, workshop.workshopid]
        );
        return 200;
        } catch (error) {
        console.error("Error updating workshop:", error);
        return 500;
        }
    }
    async getParticipantById(participantId:number): Promise<Participant | undefined> {
        try {
        const participantResult = await this.dbClient.query(
            `SELECT *
             FROM Participants
             WHERE ParticipantID = $1`,
            [participantId]
        );
        if (participantResult.rows.length === 0) {
            return undefined;
        }
        return participantResult.rows[0];
        } catch (error) {
        console.error("Error fetching participant by ID:", error);
        return undefined;
        }
    }
    async updateParticipant(participant: Participant): Promise<number> {
        try {
        await this.dbClient.query(
            `UPDATE Participants
             SET FullName = $1, Email = $2, IsChild = $3
             WHERE ParticipantID = $4`,
            [participant.fullname, participant.email, participant.ischild, participant.participantid]
        );
        return 200;
        } catch (error) {
        console.error("Error updating participant:", error);
        return 500;
        }
    }
    async deleteParticipant(participantId: number): Promise<number> {
        try {
        await this.dbClient.query(
            `DELETE FROM Participants
             WHERE ParticipantID = $1`,
            [participantId]
        );
        return 200;
        } catch (error) {
        console.error("Error deleting participant:", error);
        return 500;
        }
    }
    async getSlotCount(participantId: number, workshopId: number): Promise<number | null> {
        try {
        const slotCountResult = await this.dbClient.query(
            `SELECT SlotCount
             FROM Registrations
             WHERE ParticipantID = $1 AND WorkshopID = $2`,
            [participantId, workshopId]
        );
        return slotCountResult.rows[0].slotcount;
        } catch (error) {
        console.error("Error fetching slot count:", error);
        return null;
        }
    }
    async decreaseSlot(participantId: number, workshopId: number): Promise<number> {
        try {
        await this.dbClient.query(
            `UPDATE Registrations
             SET SlotCount = SlotCount - 1
             WHERE ParticipantID = $1 AND WorkshopID = $2`,
            [participantId, workshopId]
        );
        return 200;
        } catch (error) {
        console.error("Error deleting slot:", error);
        return 500;
        }
    }
}
