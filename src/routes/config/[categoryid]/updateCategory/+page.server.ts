// src/routes/config/%5Bid%5D/+page.server.ts
import type { Actions, PageServerLoad } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import { error, fail, redirect } from "@sveltejs/kit";
import {type Appointment, type Workshop, WorkshopService} from "$lib/services/WorkshopService";
import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { goto } from "$app/navigation";

const categorySchema = z.object({
  categoryname: z.string().min(1).max(50),
  price: z.number().positive(),
  appointmentcount: z.number().positive(),
});

export const load: PageServerLoad = async ({ params, locals }) => {
  ensureAdmin(locals);

  const workshopService = new WorkshopService(locals.dbconn);
  const category = await workshopService.getCategoryById(Number(params.categoryid));
  if (category === undefined){
    return fail(404)
  }

  const categorySchemaWithDefaults = z.object({
    categoryname: z.string().min(1).max(50).default(category.categoryname),
    price: z.number().positive().default(category.price),
    appointmentcount: z.number().positive().default(category.appointmentcount),
  });

  const form = await superValidate(zod(categorySchemaWithDefaults));

  return { form, message: null, categoryid: Number(params.categoryid) };
};

export const actions: Actions = {
  default: async ({ request, locals, params }) => {
    const form = await superValidate(request, zod(categorySchema));
    if (!form.valid) {
      console.log("Form is not valid");
      return fail(400, { form });
    }

    const workshopService = new WorkshopService(locals.dbconn);
    const category = await workshopService.getCategoryById(Number(params.categoryid));
    if (category === undefined){
      return fail(404)
    }
    const statusCode = await workshopService.updateCategory(Number(params.categoryid), form.data.categoryname, form.data.price, form.data.appointmentcount);
    if(statusCode !== 200){
        return error(statusCode, "Category could not be updated");
    }

    return redirect(300, "/config/");
  },
};
