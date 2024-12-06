import type { PoolClient } from "pg";
import { type Capture } from "../../routes/api/capture-paypal-order/+server";

export class PaypalService {
  private dbClient: PoolClient;

  constructor(dbClient: PoolClient) {
    this.dbClient = dbClient;
  }

  async writePaypalOrderToDB(
    capture: Capture,
    participantID: number,
  ): Promise<void> {
    // write the order to the database
    const _bookingResult = await this.dbClient.query(
      `INSERT INTO PayPalOrders (PayPalOrderID, ParticipantID, OrderStatus)
            VALUES ($1, $2, $3)`,
      [capture.id, participantID, capture.status],
    );
  }
}
