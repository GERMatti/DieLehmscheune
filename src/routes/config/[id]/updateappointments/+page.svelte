<script lang="ts">
    import type { PageData } from "./$types";
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
    import type { Participant, Workshop } from "$lib/services/WorkshopService";

    const modalStore = getModalStore();

    export let data: PageData;
    let { form, enhance, errors, message } = superForm(data.form,  { dataType: 'json' });

    async function nav_back() {
        window.history.back();
    }
</script>
<button class="btn" on:click={nav_back}>
    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.27206 7.29402C1.90931 7.6845 1.90931 8.31863 2.27206 8.7091L6.91517 13.7071C7.27792 14.0976 7.86701 14.0976 8.22976 13.7071C8.5925 13.3167 8.5925 12.6825 8.22976 12.2921L5.1682 8.99961H14.0714C14.585 8.99961 15 8.55291 15 8C15 7.44709 14.585 7.00039 14.0714 7.00039H5.1711L8.22685 3.70793C8.5896 3.31745 8.5896 2.68333 8.22685 2.29285C7.86411 1.90238 7.27502 1.90238 6.91227 2.29285L2.26916 7.2909L2.27206 7.29402Z" fill="black"/>
    </svg>
</button>
<div class="flex justify-center items-center">
    <form method="POST" use:enhance>
        {#each $form.appointments as appointment, index}
            <div class="bg-surface-200 mt-4 p-2 rounded-xl">
                <input class="hidden input {$errors.appointmentid ? 'input-error' : ''}" type="text" bind:value={appointment.appointmentid} name="appointmentid" />
                {#if errors.appointmentid}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Server Error! Bitte mich fragen!</span>
                        </p>
                    </div>
                {/if}
                <label>
                    Datum
                    <input class="input {$errors.date ? 'input-error' : ''}" type="date" bind:value={appointment.date} />
                    {#if errors.date}
                        <div class="flex">
                            <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                                <span class="font-medium">Gültiges Dastum eingeben!</span>
                            </p>
                        </div>
                    {/if}
                </label>
                <label>
                    Zeit
                    <input class="input {$errors.time ? 'input-error' : ''}" type="time" bind:value={appointment.time} />
                    {#if errors.time}
                        <div class="flex">
                            <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                                <span class="font-medium">Gültige Zeit eingeben!</span>
                            </p>
                        </div>
                    {/if}
                </label>
                <label>
                    Dauer in Minuten
                    <input class="input {$errors.duration ? 'input-error' : ''}" type="number" bind:value={appointment.duration} />
                    {#if errors.duration}
                        <div class="flex">
                            <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                                <span class="font-medium">Gültige Dauer eingeben!</span>
                            </p>
                        </div>
                    {/if}
                </label>
            </div>
        {/each}
        <button class="btn variant-filled-success w-full mt-2" type="submit">Update Appointments</button>
    </form>
</div>