<script lang="ts">
    import type { PageData } from "./$types"
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import {getModalStore, type ModalSettings} from '@skeletonlabs/skeleton';
    import type {Participant, Workshop} from "$lib/services/WorkshopService";

    const modalStore = getModalStore();

    export let data: PageData

    let { form, enhance, errors, message} = superForm(data.form)


</script>
<SuperDebug data="{$form}" />
<div class="flex flex-col md:flex-row items-center justify-center max-sm:mx-6 ">
        <div class="bg-surface-200 rounded-xl p-2 md:min-w-96 max-sm:mt-8">
            <form method="POST" use:enhance>
                <input
                        class="input hidden {$errors.workshopId ? 'input-error' : ''}"
                        type="text" placeholder="id"
                        name="workshopId"
                        bind:value={$form.workshopId}
                />
                <label class="label">
                    <span>Name</span>
                    <input
                            class="input {$errors.fullname ? 'input-error' : ''}"
                            type="text" placeholder="Voller Name"
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
                    <input bind:value={$form.email} class="input {$errors.email ? 'input-error' : ''}" type="email" name="email" placeholder="Max.Mustermann@beispiel.de" />
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
        </div>
    </div>
