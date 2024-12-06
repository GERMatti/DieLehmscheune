// src/routes/config/%5Bid%5D/+page.server.ts
import type { Actions, PageServerLoad } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import { error, fail, redirect } from "@sveltejs/kit";
import {
  WorkshopService,
} from "$lib/services/WorkshopService";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import {type Appointment, AppointmentService} from "$lib/services/AppointmentService";

const schema = z.object({
  title: z.string(),
  description: z.string(),
  categoryname: z.string(),
  maxparticipants: z.number().positive(),
});

export const load: PageServerLoad = async ({ locals }) => {
  ensureAdmin(locals);
  const workshopService = new WorkshopService(locals.dbconn);
  const categories = await workshopService.getAllCategories();

  if (!categories) {
    return fail(404);
  }
  const categoryNames = categories.map((category) => category.categoryname);
  const categoryNamesArray = [categoryNames[0], ...categoryNames.slice(1)];

  const schemaDefault = z.object({
    title: z.string().default("Titel"),
    description: z.string().default("Beschreibung"),
    categoryname: z.enum([categoryNames[0], ...categoryNames.slice(1)]),
    maxparticipants: z.number().positive().default(6),
  });

  const form = await superValidate(zod(schemaDefault));

  return { form, categoryNamesArray, message: null };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod(schema));
    console.log(form);

    const workshopService = new WorkshopService(locals.dbconn);
    const appointmentService = new AppointmentService(locals.dbconn);
    const categories = await workshopService.getAllCategories();
    const categoryMap = new Map(
      categories.map(
        (category) => [category.categoryname, category.categoryid],
      ),
    );

    const categoryname = form.data.categoryname;
    const categoryid = categoryMap.get(categoryname) ?? (() => {
      throw error(500, "Category not found");
    })();

    const workshopId: number | unknown = await workshopService.createWorkshop(
      form.data.title,
      form.data.description,
      categoryid,
      form.data.maxparticipants,
    );
    if (workshopId === undefined) {
      return fail(500);
    }
    const category = await workshopService.getCategoryById(categoryid);
    if (!category) {
      return fail(404);
    }
    // Set default appointments based on category.appointmentcount
    const defaultAppointments: Appointment[] = Array.from({
      length: category.appointmentcount,
    }, () => ({
      appointmentid: 0, // 0 is a placeholder for the database
      workshopid: workshopId as number,
      appointmentdate: new Date(), // Placeholder current date
      duration: 120,
    }));

    await appointmentService.createAppointments(defaultAppointments);

    return redirect(300, "/config/" + workshopId + "/updateappointments");
  },
};
