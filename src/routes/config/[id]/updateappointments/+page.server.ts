// src/routes/config/%5Bid%5D/+page.server.ts
import type { Actions, PageServerLoad } from "./$types";
import { ensureAdmin } from "$lib/server/auth";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import {type Appointment, AppointmentService} from "$lib/services/AppointmentService";

function generateFormSchema(appointmentCount: number) {
  return z.object({
    appointments: z.array(
      z.object({
        appointmentid: z.number().min(1),
        date: z.string().min(10).max(10),
        time: z.string().min(5, "24 stundenformat").max(5, "24 stundenformat"),
        duration: z.number().int().positive("Number must be positive").min(1),
      }),
    ).length(appointmentCount),
  });
}

export const load: PageServerLoad = async ({ params, locals }) => {
  ensureAdmin(locals);
  const appointmentService = new AppointmentService(locals.dbconn);

  const appoinments = await appointmentService.getAllAppointmentsFromWorkshop(
    Number(params.id),
  );

  const formSchema = generateFormSchema(appoinments.length);

  const initialData = {
    appointments: appoinments.map((appointment) => ({
      appointmentid: appointment.appointmentid,
      date: new Date(
        appointment.appointmentdate.getTime() +
          (appointment.appointmentdate.getTimezoneOffset() + 120) * 60000,
      ).toISOString().split("T")[0],
      time: new Date(
        appointment.appointmentdate.getTime() +
          (appointment.appointmentdate.getTimezoneOffset() + 120) * 60000,
      ).toISOString().split("T")[1].substring(0, 5),
      duration: appointment.duration,
    })),
  };

  const form = await superValidate(initialData, zod(formSchema));
  console.log("time", form.data.appointments[0].time);
  return { form };
};

export const actions: Actions = {
  default: async ({ request, locals, params }) => {
    const appointmentService = new AppointmentService(locals.dbconn);
    const appoinments = await appointmentService.getAllAppointmentsFromWorkshop(
      Number(params.id),
    );

    const form = await superValidate(
      request,
      zod(generateFormSchema(appoinments.length)),
    );
    if (!form.valid) {
      return fail(400, { form });
    }

    const appointments: Appointment[] = form.data.appointments.map(
      (appointment) => ({
        appointmentid: appointment.appointmentid, // needed for update
        workshopid: Number(params.id),
        appointmentdate: new Date(
          `${appointment.date.split("T")[0]}T${appointment.time}:00`,
        ),
        duration: appointment.duration,
      }),
    );
    console.log(appointments[0].appointmentdate);
    await appointmentService.updateAppointments(appointments);

    return redirect(300, `/config/${params.id}`);
  },
};
