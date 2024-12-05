// src/routes/config/%5Bid%5D/+page.server.ts
import type { Actions, PageServerLoad } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import { error, fail } from "@sveltejs/kit";
import { WorkshopService } from "$lib/services/WorkshopService";
import { z } from "zod";
import { message, superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";

const schema = z.object({
  id: z.number(),
  title: z.string().min(1).max(100),
  description: z.string().min(1).max(1000),
  categoryname: z.string(),
  maxparticipants: z.number().positive().min(1),
});

export const load: PageServerLoad = async ({ params, locals }) => {
  ensureAdmin(locals);

  const workshopService = new WorkshopService(locals.dbconn);
  const participants = await workshopService.getAllRegistrationsFromWorkshop(
    Number(params.id),
  );
  const workshop = await workshopService.getWorkshopById(Number(params.id));
  if (!workshop) {
    return fail(404);
  }
  const categories = await workshopService.getAllCategories();
  const appointments = await workshopService.getAllAppointmentsFromWorkshop(Number(params.id));

  const categoryNames = categories.map((category) => category.categoryname);
  const categoryNamesArray = [categoryNames[0], ...categoryNames.slice(1)];

  const schemaDefault = z.object({
    id: z.number().default(workshop.workshopid), // Security risk, but we trust the User, because he is an Admin
    title: z.string().default(workshop.title),
    description: z.string().default(workshop.description),
    categoryname: z.enum([categoryNames[0], ...categoryNames.slice(1)]).default(
      workshop.categoryname,
    ),
    maxparticipants: z.number().positive().default(workshop.maxparticipants),
  });

  const form = await superValidate(zod(schemaDefault));

  return { participants, appointments, workshop, form, categoryNamesArray, message: null };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) {
      console.log("Form is not valid");
      return fail(400, { form });
    }

    const workshopService = new WorkshopService(locals.dbconn);
    const workshop = await workshopService.getWorkshopById(
      Number(form.data.id),
    );
    console.log(workshop);

    if (!workshop) {
      return fail(404);
    }

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

    // Check for changes
    const hasChanges = form.data.title !== workshop.title ||
      form.data.description !== workshop.description ||
      form.data.categoryname !== workshop.categoryname ||
      form.data.maxparticipants !== workshop.maxparticipants;

    if (hasChanges) {
      console.log("Changes detected");
      // Update the workshop in the database
      const statuscode = await workshopService.updateWorkshop({
        ...workshop,
        title: form.data.title,
        description: form.data.description,
        categoryid: categoryid,
        maxparticipants: form.data.maxparticipants,
      });
      if (statuscode !== 200) {
        return fail(statuscode);
      }
    }

    return message(form, true);
  },
};
