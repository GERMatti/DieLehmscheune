import { type Workshop } from "$lib/services/WorkshopService";

function getMonthName(month: number): string {
  const monthNames = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  return monthNames[month - 1];
}
function generateCalendar(month: number, year: number) {
  const daysInMonth = (month: number, year: number) =>
    new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const daysInPrevMonth = daysInMonth(month - 1, year);
  const daysInCurrentMonth = daysInMonth(month, year);

  const calendarArr: ({ day: number | null; isCurrentMonth: boolean })[][] = [];
  let week: ({ day: number | null; isCurrentMonth: boolean })[] = [];

  // Fill in the days from the previous month
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    week.push({ day: daysInPrevMonth - i, isCurrentMonth: false });
  }

  // Fill in the days of the current month
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    week.push({ day, isCurrentMonth: true });
    if (week.length === 7) {
      calendarArr.push(week);
      week = [];
    }
  }

  // Fill in the days from the next month
  let nextMonthDay = 1;
  while (week.length < 7) {
    week.push({ day: nextMonthDay++, isCurrentMonth: false });
  }
  calendarArr.push(week);

  // Ensure the calendar is always 6x7
  while (calendarArr.length < 6) {
    week = [];
    for (let i = 0; i < 7; i++) {
      week.push({ day: nextMonthDay++, isCurrentMonth: false });
    }
    calendarArr.push(week);
  }
  let MonthName = getMonthName(month);
  return { year, monthName: MonthName, month: month, calendarArr };
}

function sortArrayOfWorkshops(workshops: Workshop[]) {
  workshops.sort((a, b) => {
    const dateA = new Date(a.appointments[0].appointmentdate);
    const dateB = new Date(b.appointments[0].appointmentdate);
    return dateA.getTime() - dateB.getTime();
  });
}

function formatDateFromWorkshop(workshops: Workshop[]) {
  workshops.forEach((workshop) => {
    workshop.appointments.forEach((appointment) => {
      const dateObj = new Date(appointment.appointmentdate);
      appointment.formattedAppointmentDate = `${dateObj.getDate().toString().padStart(2, "0")}.${
          (dateObj.getMonth() + 1).toString().padStart(2, "0")
      }.${dateObj.getFullYear()}`;
      appointment.formattedTime = `${dateObj.getHours().toString().padStart(2, "0")}:${
          dateObj.getMinutes().toString().padStart(2, "0")
      }`;
    });
  });
}

export { formatDateFromWorkshop, generateCalendar, sortArrayOfWorkshops };
