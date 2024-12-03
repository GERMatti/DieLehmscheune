import type { PageServerLoad } from "./$types";
import {ensureAdmin} from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
 ensureAdmin(locals);
}