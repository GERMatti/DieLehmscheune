import {redirect, type RequestEvent} from "@sveltejs/kit";
import {lucia} from "$lib/server/auth";

export const GET = async (event: RequestEvent) => {
    if (!event.locals.session) {
        return new Response(null, {status: 401});
    }
    const session = event.locals.session;
    if(session) {
        await lucia.invalidateSession(session.id);
        const sessionCookie = lucia.createBlankSessionCookie();
        event.cookies.set(sessionCookie.name, sessionCookie.value, {
            path: ".",
            ...sessionCookie.attributes
        });
    }
    return redirect(302, "/auth/login");
}