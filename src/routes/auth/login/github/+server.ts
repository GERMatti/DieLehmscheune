import { github } from "$lib/server/auth";
import { redirect, type RequestEvent } from "@sveltejs/kit";
import { generateState } from "arctic";

export async function GET(event: RequestEvent) {
  const state = generateState();
  const url = github.createAuthorizationURL(state, ["user:email"]);

  event.cookies.set("github_oauth_state", state, {
    path: "/",
    secure: !import.meta.env.DEV,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 10,
  });
  return redirect(302, url.toString());
}
