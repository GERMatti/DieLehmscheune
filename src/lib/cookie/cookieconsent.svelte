<script>
    import { onMount } from 'svelte';
    import * as CookieConsent from 'vanilla-cookieconsent';
    import config from '$lib/cookie/cookieconsent-config';
    import 'vanilla-cookieconsent/dist/cookieconsent.css';

    /**
     * Only run plugin on the client side
     */
    onMount(() => {
        CookieConsent.run(config);
    });
</script>

<button on:click={CookieConsent.showPreferences}>Öffne Cookie Einstellungen</button>