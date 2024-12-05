<script lang="ts">
    import type { PageData } from "./$types"
    import SuperDebug, { superForm } from "sveltekit-superforms";
    import {getModalStore, type ModalSettings} from '@skeletonlabs/skeleton';
    import type {Participant, Workshop} from "$lib/services/WorkshopService";
    import {goto} from "$app/navigation";

    const modalStore = getModalStore();

    export let data: PageData

    let { form, enhance, errors, message} = superForm(data.form)

    function nav_back() {
        goto('/config/' + $form.workshopId);
    }
</script>
<button class="btn" on:click={nav_back}>
    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.27206 7.29402C1.90931 7.6845 1.90931 8.31863 2.27206 8.7091L6.91517 13.7071C7.27792 14.0976 7.86701 14.0976 8.22976 13.7071C8.5925 13.3167 8.5925 12.6825 8.22976 12.2921L5.1682 8.99961H14.0714C14.585 8.99961 15 8.55291 15 8C15 7.44709 14.585 7.00039 14.0714 7.00039H5.1711L8.22685 3.70793C8.5896 3.31745 8.5896 2.68333 8.22685 2.29285C7.86411 1.90238 7.27502 1.90238 6.91227 2.29285L2.26916 7.2909L2.27206 7.29402Z" fill="black"/>
    </svg>
</button>
<div class="flex flex-col md:flex-row items-center justify-center max-sm:mx-6 ">
        <div class="bg-surface-200 rounded-xl p-2 md:min-w-96 max-sm:mt-8">
            <form method="POST" use:enhance>
                <input
                        class="input hidden {$errors.workshopId ? 'input-error' : ''}"
                        type="text" placeholder="id"
                        name="workshopId"
                        bind:value={$form.workshopId}
                />
                {#if $errors.workshopId}
                    <div class="flex">
                        <p id="standard_error_help" class="mx-auto text-xs text-red-600 dark:text-red-400">
                            <span class="font-medium">Server Error! Bitte mich fragen!</span>
                        </p>
                    </div>
                {/if}
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
                            <span class="font-medium">Name zu lang, oder leer! Oder frag mich</span>
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
                            <span class="font-medium">E-Mail falsch, oder zu lang! Oder frag mich</span>
                        </p>
                    </div>
                {/if}
                <button class="btn variant-filled-success mt-2 w-full">Speichern</button>
            </form>
        </div>
    </div>
