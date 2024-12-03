<script lang="ts">
    import type { PageData } from "./$types"
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import {getModalStore, type ModalSettings} from '@skeletonlabs/skeleton';
    import type {Participant, Workshop} from "$lib/services/WorkshopService";
    import {goto} from "$app/navigation";

    const modalStore = getModalStore();

    export let data: PageData

    let { form, enhance, errors, message} = superForm(data.form)

    async function deleteParticipant() {
        const response = await fetch(`/api/workshops/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    participantid: $form.participantid,
                    workshopid: data.workshopId
            }
            )
        });
        if (response.ok && response.status === 200) {
            await goto(`/config/${data.workshopId}`);
        } else {
            alert('error');
        }
    }

</script>
<SuperDebug data="{$form}" />
<div class="flex flex-col md:flex-row items-center justify-center max-sm:mx-6 ">
        <div class="bg-surface-200 rounded-xl p-2 md:min-w-96 max-sm:mt-8">
            <form method="POST" use:enhance>
                <input
                        class="input hidden"
                        type="text" placeholder="participantid"
                        name="participantid"
                        bind:value={$form.participantid}
                />
                <label class="label">
                    <span>Name</span>
                    <input
                            class="input {$errors.fullname ? 'input-error' : ''}"
                            type="text" placeholder="fullname"
                            name="fullname"
                            bind:value={$form.fullname}
                    />
                </label>
                {#if $errors.fullname}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Name zu lang! Oder frag mich</span>
                        </p>
                    </div>
                {/if}
                <label class="label">
                    <span>E-Mail</span>
                    <input bind:value={$form.email} class="input {$errors.email ? 'input-error' : ''}" type="email" name="email" />
                </label>
                {#if $errors.email}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">E-Mail falsch! Oder frag mich</span>
                        </p>
                    </div>
                {/if}
                <button class="btn variant-filled-success mt-2 w-full">Speichern</button>
            </form>
            <button class="btn variant-filled-error mt-2 w-full" on:click={deleteParticipant}>Aus Workshop entfernen</button>
        </div>
    </div>
