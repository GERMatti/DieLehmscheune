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

</script>
<div class="flex flex-col md:flex-row items-center justify-center max-sm:mx-6 ">
    <div class="flex flex-col md:flex-row md:space-x-20 mt-12">
        <div class="bg-surface-200 rounded-xl p-2 md:min-w-96 max-sm:mt-8">
            <form method="POST" use:enhance>
                <label class="label">
                    <span>Name der Kategorie</span>
                    <input
                            class="input {$errors.categoryname ? 'input-error' : ''}"
                            type="text" placeholder="Name der Kategorie"
                            name="categoryname"
                            bind:value={$form.categoryname}
                    />
                </label>
                {#if $errors.categoryname || $message === 'Categoryname already exists'}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Kategorienname muss einzigartig sein und darf max. 50 zeichen haben!</span>
                        </p>
                    </div>
                {/if}
                <label class="label">
                    <span>Preis</span>
                    <input bind:value={$form.price} class="input {$errors.price ? 'input-error' : ''}" name="price" type="number" />
                </label>
                {#if $errors.price}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Preis muss z.B. 75.00 sein</span>
                        </p>
                    </div>
                {/if}
                <label class="label">
                    <span>Maximale Teilnehmer</span>
                    <input bind:value={$form.appointmentcount} type="number" class="input {$errors.appointmentcount ? 'input-error' : ''}" name="appointmentcount"/>
                </label>
                {#if $errors.appointmentcount}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Mindestens 1</span>
                        </p>
                    </div>
                {/if}
                <button class="btn variant-filled-primary mt-2 w-full">Kategorie erstellen</button>
            </form>
        </div>
    </div>
</div>
