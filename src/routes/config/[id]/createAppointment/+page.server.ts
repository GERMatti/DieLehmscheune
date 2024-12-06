// src/routes/config/%5Bid%5D/+page.server.ts
import type { Actions, PageServerLoad } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import {
  WorkshopService,
} from "$lib/services/WorkshopService";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import {type Appointment, AppointmentService} from "$lib/services/AppointmentService";

function generateFormSchema(appointmentCount: number) {
  return z.object({
    appointments: z.array(
      z.object({
        date: z.string().min(10).max(10),
        time: z.string().min(5, "24 stundenformat").max(5, "24 stundenformat"),
        duration: z.number().int().positive("Number must be positive"),
      }),
    ).length(appointmentCount),
  });
}

export const load: PageServerLoad = async ({ params, locals }) => {
  ensureAdmin(locals);
  const workshopService = new WorkshopService(locals.dbconn);
  const workshopCategoryId = await workshopService.getWorkshopCatoegoryById(
    Number(params.id),
  );
  if (!workshopCategoryId) {
    return fail(404);
  }

  const category = await workshopService.getCategoryById(workshopCategoryId);
  if (!category) {
    return fail(404);
  }
  const formSchema = generateFormSchema(category.appointmentcount);
  const initialData = {
    appointments: Array.from({ length: category.appointmentcount }, () => ({
      date: "",
      time: "",
      duration: 0,
    })),
  };

  const form = await superValidate(initialData, zod(formSchema));

  return { form, category };
};

export const actions: Actions = {
  default: async ({ request, locals, params }) => {
    const workshopService = new WorkshopService(locals.dbconn);
    const appointmentService = new AppointmentService(locals.dbconn);
    const workshopCategoryId = await workshopService.getWorkshopCatoegoryById(
      Number(params.id),
    );
    if (!workshopCategoryId) {
      return fail(404);
    }

    const category = await workshopService.getCategoryById(workshopCategoryId);
    if (!category) {
      return fail(404);
    }

    const form = await superValidate(
      request,
      zod(generateFormSchema(category.appointmentcount)),
    );
    if (!form.valid) {
      return fail(400, { form });
    }
    const appointments: Appointment[] = form.data.appointments.map(
      (appointment) => ({
        appointmentid: 0, // not needed
        workshopid: Number(params.id),
        appointmentdate: new Date(
          `${appointment.date.split("T")[0]}T${appointment.time}:00`,
        ),
        duration: appointment.duration,
      }),
    );
    await appointmentService.createAppointments(appointments);

    redirect(300, `/config/${params.id}`);
  },
};
