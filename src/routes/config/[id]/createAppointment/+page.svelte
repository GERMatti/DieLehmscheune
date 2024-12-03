<script lang="ts">
    import type { PageData } from "./$types";
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import { getModalStore, type ModalSettings } from '@skeletonlabs/skeleton';
    import type { Participant, Workshop } from "$lib/services/WorkshopService";

    const modalStore = getModalStore();

    export let data: PageData;
    let { form, enhance, errors, message } = superForm(data.form);
</script>

<SuperDebug data="{$form}" />
<form method="POST" use:enhance>
    {#each $form.appointments as appointment, index}
        <label>
            Date
            <input type="date" bind:value={appointment.date} />
        </label>
        <label>
            Time
            <input type="time" bind:value={appointment.time} />
        </label>
        <label>
            Duration
            <input type="number" bind:value={appointment.duration} />
        </label>
    {/each}
    <button type="submit">Create Appointments</button>
</form>