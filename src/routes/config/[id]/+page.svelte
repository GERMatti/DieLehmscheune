<script lang="ts">
    import type { PageData } from "./$types"
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import {getModalStore, type ModalSettings} from '@skeletonlabs/skeleton';
    import type {Appointment, Participant, Workshop} from "$lib/services/WorkshopService";
    import { browser } from "$app/environment";
    import {goto, invalidateAll} from "$app/navigation";
    import {string} from "zod";

    const modalStore = getModalStore();

    const modalSuccess: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentTen',

    };

    export let data: PageData
    let participants: Participant[] = data.participants;
    let workshop: Workshop = data.workshop;
    let appointments = data.appointments;

    let { form, enhance, errors, message} = superForm(data.form)
    let categoryNamesArray = data.categoryNamesArray;

    let buttonVisible = false;
    $:{buttonVisible = workshop.maxparticipants > participants.length}

    async function deleteWorkshop(){
        const response = await fetch(`/api/workshops/deleteWorkshop`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workshopid: workshop.workshopid
            })
        });
        if (response.ok && response.status === 200) {
            modalStore.trigger(modalSuccess);
            await goto(`/config`);
        } else {
            alert('error');
        }
    }
    function nav_back() {
        goto('/config');
    }

    function formatDateFromAppointment(appointment: Appointment): { formattedAppointmentDate: string } {
        const dateObj = new Date(appointment.appointmentdate);
        const day = dateObj.getDate().toString().padStart(2, "0");
        const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
        const year = dateObj.getFullYear();
        const hours = dateObj.getHours().toString().padStart(2, "0");
        const minutes = dateObj.getMinutes().toString().padStart(2, "0");

        return {
            formattedAppointmentDate: `${day}.${month}.${year}` + ' - ' + `${hours}:${minutes}`,
        };
    }

</script>
<button class="btn" on:click={nav_back}>
    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.27206 7.29402C1.90931 7.6845 1.90931 8.31863 2.27206 8.7091L6.91517 13.7071C7.27792 14.0976 7.86701 14.0976 8.22976 13.7071C8.5925 13.3167 8.5925 12.6825 8.22976 12.2921L5.1682 8.99961H14.0714C14.585 8.99961 15 8.55291 15 8C15 7.44709 14.585 7.00039 14.0714 7.00039H5.1711L8.22685 3.70793C8.5896 3.31745 8.5896 2.68333 8.22685 2.29285C7.86411 1.90238 7.27502 1.90238 6.91227 2.29285L2.26916 7.2909L2.27206 7.29402Z" fill="black"/>
</svg>
</button>
<div class="flex flex-col md:flex-row md:items-center md:justify-center max-sm:mx-4">
    <div class="flex flex-col md:flex-row md:space-x-20 mt-12">
        <div class="flex flex-col">
            <div class="table-container max-w-xl rounded-xl">
                <h1 class="text-2xl font-bold">Teilnehmer</h1>
                <table class="table table-hover">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Bearbeiten</th>
                    </tr>
                    </thead>
                    <tbody>
                    {#each participants as participant}
                        <tr>
                                <td>{participant.fullname}</td>
                                <td>{participant.email}</td>
                                <td><button class="btn variant-filled-primary w-full" on:click={() => goto(`/config/${workshop.workshopid}/${participant.participantid}`)}>Bearbeiten</button></td>
                        </tr>
                    {/each}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="1">AnzahlTeilnehmer</th>
                            <td>{participants.length}</td>
                        </tr>
                    </tfoot>
                </table>
                {#if buttonVisible}
                <a class="btn variant-filled-primary mt-2 w-full" href="/config/{data.workshop.workshopid}/addUser">Teilnehmer hinzufügen</a>
                {/if}
            </div>
            <div class="table-container max-w-xl rounded-xl">
            <h1 class="text-2xl font-bold mt-8">Termine</h1>
            <table class="table table-hover">
                <thead>
                <tr>
                    <th>Datum</th>
                    <th>Dauer</th>
                </tr>
                </thead>
                <tbody>
                {#each appointments as appointment}
                    <tr>
                        <td>{formatDateFromAppointment(appointment).formattedAppointmentDate}</td>
                        <td>{appointment.duration}</td>
                    </tr>
                {/each}
                </tbody>
            </table>
            <a class="btn variant-filled-primary mt-2 w-full" href="/config/{data.workshop.workshopid}/updateappointments">Termine bearbeiten</a>
            </div>
            </div>
        <div class="bg-surface-200 rounded-xl p-2 md:min-w-96 max-sm:mt-8 my-auto">
            <form method="POST" use:enhance>
                <input
                        class="input hidden"
                        type="text" placeholder="id"
                        name="id"
                        bind:value={$form.id}
                />
                <label class="label">
                    <span>Titel</span>
                    <input
                            class="input {$errors.title ? 'input-error' : ''}"
                            type="text" placeholder="Titel"
                            name="title"
                            bind:value={$form.title}
                    />
                </label>
                {#if $errors.title}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Titel zu lang, oder leer! Oder frag mich</span>
                        </p>
                    </div>
                {/if}
                <label class="label">
                    <span>Beschreibung</span>
                    <textarea bind:value={$form.description} class="textarea {$errors.description ? 'input-error' : ''}" rows="4" name="description" />
                </label>
                {#if $errors.description}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Beschreibung zu lang! Oder frag mich</span>
                        </p>
                    </div>
                {/if}
                <label class="label">
                    <span>Select</span>
                    <select bind:value={$form.categoryname} class="select" name="categoryname">
                        {#each categoryNamesArray as category}
                            <option value={category}>{category}</option>
                        {/each}
                    </select>
                </label>
                {#if $errors.categoryname}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Bitte angeben</span>
                        </p>
                    </div>
                {/if}
                <label class="label">
                    <span>Maximale Teilnehmer</span>
                    <input class="input {$errors.maxparticipants ? 'input-error' : ''}" type="text" name="maxparticipants" bind:value={$form.maxparticipants}>
                </label>
                {#if $errors.maxparticipants}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Teilnehmer > 0 sein!</span>
                        </p>
                    </div>
                {/if}
                <button class="btn variant-filled-primary mt-2 w-full">Submit</button>
            </form>
            <button class="btn variant-filled-error mt-2 w-full" on:click={deleteWorkshop}>Aus Workshop entfernen</button>
        </div>
    </div>
</div>
{#if $message}
    <div class="hidden"> {modalStore.trigger(modalSuccess)}</div>
    {invalidateAll()}
{/if}
