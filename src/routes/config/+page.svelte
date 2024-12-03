<script lang="ts">
    import type { Workshop } from "$lib/services/WorkshopService";
    import type { PageData } from "./$types"
    import {getModalStore, type ModalSettings} from '@skeletonlabs/skeleton';


    const modalStore = getModalStore();

    export let data: PageData

    let workshops: Workshop[] = data.workshops;

    function calculateEndTime(startTime: string, durationMinutes: number): string {
        const [hours, minutes] = startTime.split(':').map(Number);
        const date = new Date();
        date.setHours(hours, minutes);
        date.setMinutes(date.getMinutes() + durationMinutes);
        return date.toTimeString().slice(0, 5);
    }

</script>

<div class="flex flex-col justify-center items-center my-80">
    <div class="">
        <dl class="list-dl bg-gray-200">
        {#each workshops as workshop}
            <div class="">
                <span class="badge">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.07143 1.65625C6.07143 1.29258 5.78482 1 5.42857 1C5.07232 1 4.78571 1.29258 4.78571 1.65625V2.75H3.71429C2.76875 2.75 2 3.53477 2 4.5V4.9375V6.25V13.25C2 14.2152 2.76875 15 3.71429 15H12.2857C13.2312 15 14 14.2152 14 13.25V6.25V4.9375V4.5C14 3.53477 13.2312 2.75 12.2857 2.75H11.2143V1.65625C11.2143 1.29258 10.9277 1 10.5714 1C10.2152 1 9.92857 1.29258 9.92857 1.65625V2.75H6.07143V1.65625ZM3.28571 6.25H12.7143V13.25C12.7143 13.4906 12.5214 13.6875 12.2857 13.6875H3.71429C3.47857 13.6875 3.28571 13.4906 3.28571 13.25V6.25Z" fill="black"/>
                    </svg>
                </span>
                <span class="flex-auto">
                    <dt>{workshop.title}</dt>
                    <dd>
                        {#each workshop.appointments as appointment}
                                                {appointment.formattedAppointmentDate}
                            {appointment.formattedTime} - {appointment.formattedTime ? calculateEndTime(appointment.formattedTime, appointment.duration) : ''}
                            {#if appointment !== workshop.appointments[workshop.appointments.length - 1]}
                                {' & '}
                            {/if}
                        {/each}
                    </dd>
		        </span>
                <a class="btn variant-filled-primary" href="/config/{workshop.workshopid}" style="margin-left: 12rem;">Bearbeiten</a>
            </div>
        {/each}
        </dl>
    </div>
</div>