<script lang="ts">
    import type { PageData } from "./$types"
    import { popup } from "@skeletonlabs/skeleton";
    import type {PopupSettings} from "@skeletonlabs/skeleton";

    export let data: PageData

    let calendarArr = data.calendarArr;
    let calendarMonth = calendarArr.month;
    let calendarYear = calendarArr.year;
    let workshops = data.workshops;
    let monthOffset = 0;

    const getPopupClickSettings = (workshopId: string): PopupSettings => ({
        event: 'click',
        target: `popupClick-${workshopId}`,
        placement: 'top'
    });

    // ==========HELPER FUNCTIONS==========
    // ++++++++++++++++++++++++++++++++++++

    function calculateEndTime(startTime: string, durationMinutes: number): string {
        const [hours, minutes] = startTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes);
        date.setMinutes(date.getMinutes() + durationMinutes);
        return date.toTimeString().slice(0, 5);
    }

    function hasWorkshopOnDay(day: number, workshops: any[]) {
        return workshops.flatMap(workshop => {
            return workshop.appointments
                .map((appointment, index) => {
                    const [appointmentDay, appointmentMonth, appointmentYear] = appointment.formattedAppointmentDate.split('.').map(Number);
                    if (appointmentDay === day && appointmentMonth === calendarMonth && appointmentYear === calendarYear) {
                        return { workshop, appointmentIndex: index };
                    }
                    return null;
                })
                .filter(Boolean);
        });
    }

    const workshopColor: Record<string, string> = {
        1: 'purple',
        2: 'emerald',
        3: 'sky',
        4: 'amber',
        'default': 'gray'
    };

    function getWorkshopColorClass(categoryid: number): string {
        const color = workshopColor[categoryid] || workshopColor.default;
        return `bg-${color}-500`;
    }

    async function updateCalendar(monthOffsetChange: number) {
        monthOffset += monthOffsetChange;
        const response = await fetch('/api/calendar', {
		method: 'POST',
		body: JSON.stringify({
			MonthOffset: monthOffset
		}),
		headers: {
			'content-type': 'application/json'
		}
	});

        if (!response.ok) {
            console.error('Failed to fetch calendar data:', response.statusText);
            return;
        }
        try {
            const data = await response.json();
            calendarArr = data.calendarArr;
            workshops = data.workshops;
            calendarMonth = calendarArr.month;
            calendarYear = calendarArr.year;
        } catch (error) {
            console.error('Failed to parse JSON:', error);
        }
    }
    // ++++++++++++++++++++++++++++++++++++
</script>

<section class="relative">
        <div class="w-full max-w-7xl mx-auto px-2 lg:px-8">
            <div class="grid grid-cols-12 gap-8 max-w-4xl mx-auto xl:max-w-full">
                <div class="col-span-12 xl:col-span-5 mt-2 max-sm:mt-8">
                    <h2 class="text-3xl leading-tight text-gray-900 mb-1.5">Bevorstehende Workshops</h2>
                    <p class="text-lg text-gray-600 mb-8">Verpasse jetzt keinen mehr!</p>
                    <div class="flex gap-5 flex-col">
                        <!-- Side event -->
                         {#each workshops as workshop}
                             <div class="p-6 rounded-xl bg-white">
                                <div class="flex items-center justify-between mb-3">
                                    <div class="flex items-center gap-2.5">
                                        <span class={`w-2.5 h-2.5 rounded-full ${getWorkshopColorClass(workshop.categoryid)}`}></span>
                                        <p class="text-base font-medium text-gray-900">
                                            {#each workshop.appointments as appointment}
                                                {appointment.formattedAppointmentDate}
                                                {appointment.formattedTime} - {calculateEndTime(appointment.formattedTime, appointment.duration)}
                                                {#if appointment !== workshop.appointments[workshop.appointments.length - 1]}
                                                    {' & '}
                                                {/if}
                                            {/each}
                                        </p>
                                    </div>
                                </div>
                                <h6 class="text-xl leading-8 font-semibold text-black mb-1">{workshop.title}</h6>
                                <p class="text-base font-normal text-gray-600">{workshop.description}</p>
                                 <hr class="opacity-50 mt-3 mb-3">
                                 <footer class="flex justify-between items-center mt-auto">
                                     <div class="flex mx-auto">
                                         <a class="btn btn-initial font-semibold" href="/shop/{workshop.workshopid}">Jetzt buchen</a>
                                     </div>
                                 </footer>
                            </div>
                         {/each}
                        <!-- Side event end -->
                    </div>
                </div>
                <div class="max-md:mt-8 md:mt-28 col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
                    <div class="flex flex-col md:flex-row gap-4 items-center justify-between mb-5">
                        <div class="flex items-center space-x-4">
                            <h5 class="text-xl leading-8 font-semibold text-gray-900">{calendarArr.monthName } {calendarArr.year}</h5>
                            <div class="flex items-center">
                                <button class="text-primary-500 p-1 rounded transition-all duration-300 hover:text-white hover:bg-primary-500" on:click={() => updateCalendar(-1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M10.0002 11.9999L6 7.99971L10.0025 3.99719" stroke="currentcolor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                                <button class="text-primary-500 p-1 rounded transition-all duration-300 hover:text-white hover:bg-primary-500" on:click={() => updateCalendar(1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M6.00236 3.99707L10.0025 7.99723L6 11.9998" stroke="currentcolor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="border border-primary-200 rounded-xl">
                        <div class="grid grid-cols-7 rounded-t-3xl border-b border-primary-200">
                            <div class="py-3.5 border-r rounded-tl-xl border-primary-200 bg-primary-50 flex items-center justify-center text-sm font-medium text-primary-500">So</div>
                            <div class="py-3.5 border-r border-primary-200 bg-primary-50 flex items-center justify-center text-sm font-medium text-primary-500">Mo</div>
                            <div class="py-3.5 border-r border-primary-200 bg-primary-50 flex items-center justify-center text-sm font-medium text-primary-500">Di</div>
                            <div class="py-3.5 border-r border-primary-200 bg-primary-50 flex items-center justify-center text-sm font-medium text-primary-500">Mi</div>
                            <div class="py-3.5 border-r border-primary-200 bg-primary-50 flex items-center justify-center text-sm font-medium text-primary-500">Do</div>
                            <div class="py-3.5 border-r border-primary-200 bg-primary-50 flex items-center justify-center text-sm font-medium text-primary-500">Fr</div>
                            <div class="py-3.5 rounded-tr-xl bg-primary-50 flex items-center justify-center text-sm font-medium text-primary-500">Sa</div>
                        </div>
                        <div class="grid grid-cols-7 rounded-b-xl">
                            {#await calendarArr.calendarArr}
                                <p>Loading...</p>
                            {:then calendarArr}
                                {#each calendarArr as week}
                                    {#each week as day}
                                    {#if day.isCurrentMonth}
                                        {#if hasWorkshopOnDay(day.day, workshops).length > 0}
                                                {#each hasWorkshopOnDay(day.day, workshops) as {workshop, appointmentIndex}}
                                                    <div use:popup={getPopupClickSettings(workshop.workshopid)} class="relative flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-primary-200 transition-all duration-300 hover:bg-primary-50 cursor-pointer">
                                                        <span class="text-xs font-semibold">{day.day}</span>
                                                    <div class="absolute bottom-1 left-7 p-1.5 xl:px-2 h-max rounded-full">
                                                        <p class={`w-2 h-2 rounded-full ${getWorkshopColorClass(workshop.categoryid)}`}></p>
                                                    </div>
                                                    <div class="card p-4 z-10" data-popup="popupClick-{workshop.workshopid}">
                                                        <p class="text-xs font-medium mb-px">{workshop.title}</p>
                                                        <span class="text-xs font-normal whitespace-nowrap">
                                                                    {workshop.appointments[appointmentIndex].formattedTime} - {calculateEndTime(workshop.appointments[appointmentIndex].formattedTime, workshop.appointments[appointmentIndex].duration)}
                                                            </span>
                                                    </div>
                                                    </div>
                                                {/each}
                                        {:else}
                                            <div class="relative flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-r border-b border-primary-200 transition-all duration-300 hover:bg-primary-50 cursor-pointer">
                                                <span class="text-xs font-semibold">{day.day}</span>
                                            </div>
                                        {/if}
                                {:else}
                                    <div class="relative flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-gray-50 border-r border-b border-primary-200 transition-all duration-300 hover:bg-primary-50">
                                        <span class="text-xs font-semibold text-gray-400">{day.day}</span>
                                    </div>
                                {/if}
                                    {/each}
                                {/each}
                            {/await}
                        </div>
                    </div>
                </div>
            </div>
        </div>
</section>
<div class="hidden bg-purple-500 border-gray-500 bg-amber-500 bg-sky-500 bg-emerald-500"></div>