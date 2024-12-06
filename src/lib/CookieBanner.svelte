<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const cookieConsent = writable(null); // Start as `null` to represent "not yet checked"

    onMount(() => {
        const consent = localStorage.getItem('cookieConsent');
        cookieConsent.set(consent === 'true'); // Set to true if consent exists
    });

    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'true');
        cookieConsent.set(true);
    }
</script>

{#if $cookieConsent === false} <!-- Render only when explicitly false -->
    <div class="z-20 items-center flex p-4 bg-surface-500 text-white w-full">
        <p class="md:mx-auto max-md:space-x-2">Diese Seite verwendet Cookies nur, wenn es für Ihre Nutzung der Webseite unerlässlich ist. Mehr dazu in der <a class="underline font-bold" href="/datenschutz">Datenschutzerklärung</a>. </p>
        <a class="btn variant-ghost-success" on:click={acceptCookies}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.6652 2.35151C16.1116 2.82018 16.1116 3.58132 15.6652 4.04999L6.52338 13.6485C6.077 14.1172 5.35208 14.1172 4.9057 13.6485L0.334784 8.84924C-0.111595 8.38057 -0.111595 7.61943 0.334784 7.15076C0.781163 6.68208 1.50608 6.68208 1.95246 7.15076L5.71633 11.0989L14.0511 2.35151C14.4975 1.88283 15.2224 1.88283 15.6688 2.35151H15.6652Z" fill="white"/>
        </svg>
        </a>
    </div>
{/if}
