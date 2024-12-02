<script lang="ts">
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import { onMount } from 'svelte';
    import type { PageData } from "./$types"
    import {getModalStore, type ModalSettings} from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    export let data: PageData

    let { form, enhance, errors, message} = superForm(data.form)

    const modalSuccess: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentFour',
    };

</script>
<div class="mx-5 md:mx-96 mt-2 md:mt-40 flex flex-col md:flex-row md:space-x-80">
    <div class="md:max-w-4xl">
        <h1 class="h1 mb-3 mt-3">Nimm Kontakt mit uns auf</h1>
        <article class="max-w-sm md:max-w-xl mb-8">
        <p class="mb-3">Hast du Interesse an einem individuellen Event oder noch Fragen? Schreib gerne an die, unten angegebenen, Mail Adresse. Wir freuen uns schon darauf, von dir zu hören.</p>
        <p class="mb-3">Alternativ kannst du auch das Kontaktformular nutzen.</p>
        <p>Oder anrufen: +49 228 94772631</p>
        </article>
        <form method="POST" use:enhance>
            <div class="flex space-x-4">
                <input 
                    class="input {$errors.vorname ? 'input-error' : ''}" 
                    type="text" placeholder="Vorname" 
                    name="vorname" 
                    bind:value={$form.vorname}
                />
                <input bind:value={$form.nachname} class="input {$errors.nachname ? 'input-error' : ''}" type="text" placeholder="Nachname" name="nachname" />
            </div>
            <div class="flex">
                {#if $errors.vorname}
                    <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                        <span class="font-medium">Bitte geben Sie einen Namen ein!</span>
                    </p>
                {/if}
                {#if $errors.nachname}
                    <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                        <span class="font-medium">Bitte geben Sie einen Namen ein!</span>
                    </p>
                {/if}
            </div>
                <input bind:value={$form.email} class="input mt-4 {$errors.email ? 'input-error' : ''}" type="email" placeholder="john@example.com" autocomplete="email" name="email" />
            {#if $errors.email}
                <div class="flex">
                <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                    <span class="font-medium">Bitte geben Sie Ihre E-Mail ein!</span>
                </p>
                </div>
            {/if}
                <textarea bind:value={$form.message} class="textarea mt-4 {$errors.message ? 'input-error' : ''}" rows="4" placeholder="Deine Nachricht." name="message" />
            {#if $errors.message}
                <div class="flex">
                    <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                        <span class="font-medium">Bitte geben Sie eine längere nachricht ein!</span>
                    </p>
                </div>
            {/if}
            <button class="btn variant-filled-primary mt-4">Submit</button>
            </form>
    </div>
    <img class="md:max-w-3xl max-w-sm md:mt-0" src="/images/LogoNoBg.png" alt="Lehmscheune Logo" />
</div>
{#if $message}
    <div class="hidden"> {modalStore.trigger(modalSuccess)}</div>
{/if}