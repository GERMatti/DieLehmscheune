import type { PoolClient } from "pg";
import { randomBytes } from "node:crypto";

export class GitHubOAuthService {
  private dbClient: PoolClient;

  constructor(dbClient: PoolClient) {
    this.dbClient = dbClient;
  }
  async getUserByGitHubId(
    gitHubId: string,
  ): Promise<null | { id: number; githubId: number }> {
    const userResult = await this.dbClient.query(
      `SELECT *
             FROM Users
             WHERE providerid = $1`,
      [gitHubId],
    );
    if (userResult.rows.length === 0) {
      return null;
    } else {
      return userResult.rows[0];
    }
  }
  async createUser(
    gitHubId: string,
    name: string,
    email: string,
  ): Promise<string> {
    const generatedId = randomBytes(64).toString("hex");
    const userResult = await this.dbClient.query(
      `INSERT INTO Users (id, providerid, name, email)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
      [generatedId, gitHubId, name, email],
    );
    return userResult.rows[0].id.toString();
  }
}
