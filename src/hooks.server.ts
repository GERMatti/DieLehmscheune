import { connectToDB } from "$lib/db";
import type { Handle } from "@sveltejs/kit";
import { lucia } from "$lib/server/auth";

export const handle = (async ({ event, resolve }) => {
  const dbconn = await connectToDB();
  event.locals.dbconn = dbconn;

  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    const response = await resolve(event);
    dbconn.release();
    return response;
  }

  const  { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
        ...sessionCookie.attributes
    });
  }
  event.locals.user = user;
  event.locals.session = session;

  const response = await resolve(event);
  dbconn.release();
  return response;
}) satisfies Handle;