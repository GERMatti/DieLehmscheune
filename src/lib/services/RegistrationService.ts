import type {PoolClient} from "pg";
import type {Participant} from "./ParticipantService";

export interface Registration {
    registrationid: number;
    participantid: number;
    workshopid: number;
    slotcount: number;
    registeredat: Date;
}

export class RegistrationService {
    private dbClient: PoolClient;

    constructor(dbClient: PoolClient) {
        this.dbClient = dbClient;
    }

    async registerforWorkshop(
        workshopID: number,
        participantID: number,
    ): Promise<void> {
        const checkForRegistration = await this.dbClient.query(
            `SELECT RegistrationID
             FROM Registrations
             WHERE ParticipantID = $1
               AND WorkshopID = $2`,
            [participantID, workshopID],
        );
        if (checkForRegistration.rows.length > 0) {
            const _bookingResult = await this.dbClient.query(
                `UPDATE Registrations
                 SET SlotCount = SlotCount + 1
                    WHERE ParticipantID = $1 AND WorkshopID = $2`,
                [participantID, workshopID],
            );
        } else {
            const _bookingResult = await this.dbClient.query(
                `INSERT INTO Registrations (ParticipantID, WorkshopID)
                 VALUES ($1, $2)`,
                [participantID, workshopID],
            );
        }
    }
    async getSlotCount(
        participantId: number,
        workshopId: number,
    ): Promise<number | null> {
        try {
            const slotCountResult = await this.dbClient.query(
                `SELECT SlotCount
             FROM Registrations
             WHERE ParticipantID = $1 AND WorkshopID = $2`,
                [participantId, workshopId],
            );
            return slotCountResult.rows[0].slotcount;
        } catch (error) {
            console.error("Error fetching slot count:", error);
            return null;
        }
    }
    async decreaseSlot(
        participantId: number,
        workshopId: number,
    ): Promise<number> {
        try {
            await this.dbClient.query(
                `UPDATE Registrations
             SET SlotCount = SlotCount - 1
             WHERE ParticipantID = $1 AND WorkshopID = $2`,
                [participantId, workshopId],
            );
            return 200;
        } catch (error) {
            console.error("Error deleting slot:", error);
            return 500;
        }
    }
    async getAllRegistrationsFromWorkshop(
        workshopid: number,
    ): Promise<Participant[]> {
        try {
            const registrationsResult = await this.dbClient.query(
                `SELECT p.participantid, p.fullname, p.email, p.ischild, r.slotcount
           FROM Participants p
                  JOIN Registrations r ON p.participantid = r.participantid
           WHERE r.workshopid = $1
           ORDER BY p.participantid`,
                [workshopid],
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
}