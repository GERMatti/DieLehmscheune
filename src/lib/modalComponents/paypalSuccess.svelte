<script lang="ts">

    import { getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

</script>

<aside id="success-message" class="alert variant-filled-success mx-auto max-w-2xl mt-10 rounded-xl">
    <div class="mr-5">
        <svg width="40" height="40" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6652 2.35151C16.1116 2.82018 16.1116 3.58132 15.6652 4.04999L6.52338 13.6485C6.077 14.1172 5.35208 14.1172 4.9057 13.6485L0.334784 8.84924C-0.111595 8.38057 -0.111595 7.61943 0.334784 7.15076C0.781163 6.68208 1.50608 6.68208 1.95246 7.15076L5.71633 11.0989L14.0511 2.35151C14.4975 1.88283 15.2224 1.88283 15.6688 2.35151H15.6652Z" fill="black"/>
        </svg>
    </div>
    <div class="alert-message">
        <h3 class="h3">Danke für deine Bestellung!</h3>
        <p class="text-xl">Du wurdest erfolgreich angemeldet für den Workshop</p>
    </div>
</aside>