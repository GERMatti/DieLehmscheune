<script lang="ts">
    import type { PageData } from "./$types";
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
    import type { Participant, Workshop } from "$lib/services/WorkshopService";

    const modalStore = getModalStore();

    export let data: PageData;
    let { form, enhance, errors, message } = superForm(data.form,  { dataType: 'json' });
</script>

<div class="flex justify-center items-center mt-80">
    <form method="POST" use:enhance>
        {#each $form.appointments as appointment, index}
            <div class="bg-surface-200 mb-4">
                <label>
                    Datum
                    <input class="input {$errors.date ? 'input-error' : ''}" type="date" bind:value={appointment.date} />
                </label>
                <label>
                    Zeit
                    <input class="input {$errors.time ? 'input-error' : ''}" type="time" bind:value={appointment.time} />
                </label>
                <label>
                    Dauer in Minuten
                    <input class="input {$errors.duration ? 'input-error' : ''}" type="number" bind:value={appointment.duration} />
                </label>
            </div>
        {/each}
        <button class="btn variant-filled-success w-full" type="submit">Create Appointments</button>
    </form>
</div>