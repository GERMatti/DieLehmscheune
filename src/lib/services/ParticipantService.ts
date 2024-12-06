import type {PoolClient} from "pg";

export interface Participant {
    participantid: number;
    fullname: string;
    email: string;
    ischild: boolean;
}

export class ParticipantService {
    private dbClient: PoolClient;

    constructor(dbClient: PoolClient) {
        this.dbClient = dbClient;
    }
    async getParticipantById(
        participantId: number,
    ): Promise<Participant | undefined> {
        try {
            const participantResult = await this.dbClient.query(
                `SELECT *
             FROM Participants
             WHERE ParticipantID = $1`,
                [participantId],
            );
            if (participantResult.rows.length === 0) {
                return undefined;
            }
            console.log(participantResult.rows[0]);
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
                [
                    participant.fullname,
                    participant.email,
                    participant.ischild,
                    participant.participantid,
                ],
            );
            return 200;
        } catch (error) {
            console.error("Error updating participant:", error);
            return 500;
        }
    }
    async findOrCreateParticipant(email: string, name: string): Promise<number> {
        const participantResult = await this.dbClient.query(
            `SELECT *
             FROM Participants
             WHERE Email = $1`,
            [email],
        );
        if (participantResult.rows.length === 0) {
            const newParticipantResult = await this.dbClient.query(
                `INSERT INTO Participants (Email, FullName)
                 VALUES ($1, $2)
                 RETURNING ParticipantID`,
                [email, name],
            );
            return newParticipantResult.rows[0].participantid;
        } else {
            return participantResult.rows[0].participantid;
        }
    }
    async deleteParticipant(participantId: number): Promise<number> {
        try {
            await this.dbClient.query(
                `DELETE FROM Participants
             WHERE ParticipantID = $1`,
                [participantId],
            );
            return 200;
        } catch (error) {
            console.error("Error deleting participant:", error);
            return 500;
        }
    }
}