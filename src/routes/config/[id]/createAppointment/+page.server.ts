// src/routes/config/%5Bid%5D/+page.server.ts
import type {Actions, PageServerLoad} from "./$types";
import {ensureAdmin} from "$lib/server/auth";
import {fail} from "@sveltejs/kit";
import {type Appointment, WorkshopService} from "$lib/services/WorkshopService";
import {z} from "zod";
import {superValidate} from "sveltekit-superforms";
import {zod} from "sveltekit-superforms/adapters";

function generateFormSchema(appointmentCount: number) {
 const appointmentSchema = z.object({
  date: z.date(),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  duration: z.number().positive(),
 });

 return z.object({
  appointments: z.array(appointmentSchema).length(appointmentCount),
 });
}

export const load: PageServerLoad = async ({ params, locals }) => {
 ensureAdmin(locals);
 const workshopService = new WorkshopService(locals.dbconn);
 const workshopCategoryId = await workshopService.getWorkshopCatoegoryById(Number(params.id));
 if (!workshopCategoryId) {
  return fail(404);
 }

 const category = await workshopService.getCategoryById(workshopCategoryId);
 if (!category) {
  return fail(404);
 }
 console.log(category.appointmentcount);
 const formSchema = generateFormSchema(category.appointmentcount);
 const form = await superValidate(zod(formSchema));
 console.log(form);
 return { form, category };
};


export const actions: Actions = {
 default: async ({ request, locals, params }) => {
  const workshopService = new WorkshopService(locals.dbconn);
  const workshopCategoryId = await workshopService.getWorkshopCatoegoryById(Number(params.id));
  if (!workshopCategoryId) {
   return fail(404);
  }

  const category = await workshopService.getCategoryById(workshopCategoryId);
  if (!category) {
   return fail(404);
  }

  const form = await superValidate(request, zod(generateFormSchema(category.appointmentcount)));
  if (!form.valid) {
   return fail(400, { form });
  }

  const appointments: Appointment[] = form.data.appointments.map(appointment => ({
   appointmentid: 0, // not needed
   workshopid: Number(params.id),
   appointmentdate: new Date(`${appointment.date.toISOString().split('T')[0]}T${appointment.time}:00`),
   duration: appointment.duration,
  }));
  console.log(appointments[0].appointmentdate);
  await workshopService.createAppointments(appointments);

  return { success: true };
 }
};