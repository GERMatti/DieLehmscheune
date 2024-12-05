// src/routes/config/%5Bid%5D/+page.server.ts
import type { Actions, PageServerLoad } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import { error, fail, redirect } from "@sveltejs/kit";
import {type Appointment, type Workshop, WorkshopService} from "$lib/services/WorkshopService";
import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { goto } from "$app/navigation";

const schema = z.object({
  categoryname: z.string().min(1).max(50),
  price: z.number().positive().default(75),
  appointmentcount: z.number().positive().default(2),
});

export const load: PageServerLoad = async ({ params, locals }) => {
  ensureAdmin(locals);
  const form = await superValidate(zod(schema));

  return { form, message: null };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) {
      console.log("Form is not valid");
      return fail(400, { form });
    }
    let isUnique = false;

    const workshopService = new WorkshopService(locals.dbconn);
    const categories = await workshopService.getAllCategories();
    const categoryMap = new Map(
        categories.map(
            (category) => [category.categoryname, category.categoryid],
        ),
    );

    const categoryname = form.data.categoryname;
    const categoryid = categoryMap.get(categoryname) ?? (() => {
      //Unique Categoryname
      return isUnique = true;
    })();

    if (isUnique) {
      const statusCode = await workshopService.createCategory( form.data.categoryname,form.data.price,form.data.appointmentcount);
    } else {
        return message(form, "Categoryname already exists");
    }

    return redirect(300, "/config/");
  },
};
