import type {PoolClient} from "pg";
import {type Capture} from "../../routes/api/capture-paypal-order/+server";

export class PaypalService {
    private dbClient: PoolClient;

    constructor(dbClient: PoolClient) {
        this.dbClient = dbClient;
    }

    async findOrCreateParticipant(email: string, name: string): Promise<number> {
        const participantResult = await this.dbClient.query(
            `SELECT *
             FROM Participants
             WHERE Email = $1`,
            [email]
        );
        if (participantResult.rows.length === 0) {
            const newParticipantResult = await this.dbClient.query(
                `INSERT INTO Participants (Email, FullName)
                 VALUES ($1, $2)
                 RETURNING ParticipantID`,
                [email, name]
            );
            return newParticipantResult.rows[0].participantid;
        } else {
            return participantResult.rows[0].participantid;
        }
    }

    async writePaypalOrderToDB(capture: Capture, participantID: number): Promise<void> {
        // write the order to the database
        const bookingResult = await this.dbClient.query(
            `INSERT INTO PayPalOrders (PayPalOrderID, ParticipantID, OrderStatus)
            VALUES ($1, $2, $3)`,
            [capture.id, participantID, capture.status]
        );
    }

    async registerforWorkshop(workshopID: number, participantID: number): Promise<void> {
        const checkForRegistration = await this.dbClient.query(
            `SELECT RegistrationID
             FROM Registrations
             WHERE ParticipantID = $1
               AND WorkshopID = $2`,
            [participantID, workshopID]
        );
        if (checkForRegistration.rows.length > 0) {
            const bookingResult = await this.dbClient.query(
                `UPDATE Registrations
                 SET SlotCount = SlotCount + 1
                    WHERE ParticipantID = $1 AND WorkshopID = $2`
                ,
                [participantID, workshopID])
        } else {
            const bookingResult = await this.dbClient.query(
                `INSERT INTO Registrations (ParticipantID, WorkshopID)
                 VALUES ($1, $2)`,
                [participantID, workshopID]
            );
        }
    }
}