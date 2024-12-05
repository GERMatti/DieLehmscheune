import { Lucia } from "lucia";
import { dev } from "$app/environment";
import { NodePostgresAdapter } from "@lucia-auth/adapter-postgresql";
import pg from "pg";
import { env } from "$env/dynamic/private";
import { GitHub } from "arctic";
import { redirect } from "@sveltejs/kit";

const pool = new pg.Pool({
  host: env.PRIVATE_POSTGRES_HOST, // Postgres ip address[s] or domain name[s]
  port: Number(env.PRIVATE_POSTGRES_PORT), // Postgres server port[s]
  database: env.PRIVATE_POSTGRES_DB, // Name of a database to connect to
  user: env.PRIVATE_POSTGRES_USER, // Username of database user
  password: env.PRIVATE_POSTGRES_PASSWORD, // Password of database user
});

const adapter = new NodePostgresAdapter(pool, {
  user: "users",
  session: "user_session",
});

export const github = new GitHub(
  env.PRIVATE_GITHUB_CLIENT_ID,
  env.PRIVATE_GITHUB_CLIENT_SECRET,
  "http://192.168.2.101:5173/auth/callback/github",
);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: !dev,
    },
  },
  getUserAttributes: (data) => {
    return {
      email: data.email,
      name: data.name,
      isAdmin: data.isadmin,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: {
      email: string;
      name: string;
      isadmin: boolean;
    };
  }
}

export function ensureAdmin(locals: App.Locals) {
  if (!locals.user || !locals.session) {
    redirect(303, "/auth/login");
  }
  if (!locals.user.isAdmin) {
    redirect(303, "/");
  }
}
