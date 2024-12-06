<script lang="ts">
    import type { SvelteComponent } from 'svelte';

    // Stores
    import { getModalStore } from '@skeletonlabs/skeleton';

    // Props
    /** Exposes parent props to this component. */
    export let parent: SvelteComponent;

    const modalStore = getModalStore();

    // Notes: Use `w-screen h-screen` to fit the visible canvas size.
    const cBase = 'bg-surface-100-800-token w-screen h-screen p-4 flex';
</script>

{#if $modalStore[0]}
    <div class="modal-example-fullscreen {cBase}">
        <a class="pt-3" on:click={() => (modalStore.close())}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6449 4.04935C14.1134 3.58082 14.1134 2.81993 13.6449 2.3514C13.1763 1.88287 12.4154 1.88287 11.9469 2.3514L8 6.30205L4.04935 2.35515C3.58082 1.88662 2.81993 1.88662 2.3514 2.35515C1.88287 2.82368 1.88287 3.58457 2.3514 4.0531L6.30205 8L2.35515 11.9506C1.88662 12.4192 1.88662 13.1801 2.35515 13.6486C2.82368 14.1171 3.58457 14.1171 4.0531 13.6486L8 9.69795L11.9506 13.6449C12.4192 14.1134 13.1801 14.1134 13.6486 13.6449C14.1171 13.1763 14.1171 12.4154 13.6486 11.9469L9.69795 8L13.6449 4.04935Z" fill="black"/>
            </svg>
        </a>
        <div class="flex flex-col justify-center items-center space-y-4 mx-auto">
            <a
                    class="btn btn-initial text-2xl"
                    href="/kurse"
                    data-sveltekit-reload
                    on:click={() => (modalStore.close())}
            >
                Kursangebote
            </a>
            <a
                    class="btn btn-initial text-2xl"
                    href="/about"
                    data-sveltekit-reload
                    on:click={() => (modalStore.close())}
            >
                Über mich
            </a>
            <a
                    class="btn btn-initial text-2xl"
                    href="/kontakt"
                    data-sveltekit-reload
                    on:click={() => (modalStore.close())}
            >
                Kontakt
            </a>
            <a
                    class="btn variant-filled-primary text-2xl"
                    href="/termine"
                    data-sveltekit-reload
                    on:click={() => (modalStore.close())}
            >
                Termine
            </a>
        </div>
    </div>
{/if}