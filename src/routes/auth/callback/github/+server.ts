import type { RequestEvent } from "@sveltejs/kit";
import { github, lucia } from "$lib/server/auth";
import { GitHubOAuthService } from "$lib/services/GitHubOAuthService";

export async function GET(event: RequestEvent) {
  const code = event.url.searchParams.get("code");
  const state = event.url.searchParams.get("state");

  const storedState = event.cookies.get("github_oauth_state") ?? null;
  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, { status: 400 });
  }

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const accessToken = tokens.accessToken();
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const githubUser: GitHubUser = await githubUserResponse.json();
    const gitHubOAuthService = new GitHubOAuthService(event.locals.dbconn);
    const existingUser = await gitHubOAuthService.getUserByGitHubId(
      githubUser.id,
    );

    if (existingUser) {
      const session = await lucia.createSession(existingUser.id.toString(), {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
      console.log("Session created");
    } else {
      const githubEmailResponse = await fetch(
        "https://api.github.com/user/emails",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const githubEmail: GitHubEmail[] = await githubEmailResponse.json();
      const primaryEmail = githubEmail.find((email) =>
        email.primary && email.verified
      );
      if (!primaryEmail) {
        return new Response(null, { status: 400 });
      }
      const userId: string = await gitHubOAuthService.createUser(
        githubUser.id,
        githubUser.name,
        primaryEmail.email,
      );

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes,
      });
    }
    return new Response(null, {
      status: 302,
      headers: { Location: "/config" },
    }); // Redirect to the config page for ease of use for the user
  } catch (e) {
    console.error(e);
    return new Response(null, { status: 500 });
  }
}

type GitHubUser = {
  id: string;
  login: string;
  name: string;
};

type GitHubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
};
