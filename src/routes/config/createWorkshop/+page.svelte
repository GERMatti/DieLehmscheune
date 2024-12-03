<script lang="ts">
    import type { PageData } from "./$types"
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import {getModalStore, type ModalSettings} from '@skeletonlabs/skeleton';
    import type {Participant, Workshop} from "$lib/services/WorkshopService";
    import {redirect} from "@sveltejs/kit";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";

    const modalStore = getModalStore();

    const modalSuccess: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentTen',

    };

    export let data: PageData

    let { form, enhance, errors, message} = superForm(data.form)
    let categoryNamesArray = data.categoryNamesArray;

</script>
<div class="flex flex-col md:flex-row items-center justify-center max-sm:mx-6 ">
    <div class="flex flex-col md:flex-row md:space-x-20 mt-12">
        <div class="bg-surface-200 rounded-xl p-2 md:min-w-96 max-sm:mt-8">
            <form method="POST" use:enhance>
                <label class="label">
                    <span>Name</span>
                    <input
                            class="input {$errors.title ? 'input-error' : ''}"
                            type="text" placeholder="Vorname"
                            name="title"
                            bind:value={$form.title}
                    />
                </label>
                {#if $errors.title}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Titel zu lang! Oder frag mich</span>
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
                            <span class="font-medium">Bitte geben Sie eine längere nachricht ein!</span>
                        </p>
                    </div>
                {/if}
                <label class="label">
                    <span>Maximale Teilnehmer</span>
                    <input class="input {$errors.maxparticipants ? 'input-error' : ''}" type="text" name="maxparticipants" bind:value={$form.maxparticipants}>
                </label>
                <button class="btn variant-filled-primary mt-2 w-full">Submit</button>
            </form>
        </div>
    </div>
</div>
{#if $message}
    <div class="hidden"> {modalStore.trigger(modalSuccess)}</div>
{/if}
