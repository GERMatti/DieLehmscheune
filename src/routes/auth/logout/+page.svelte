<script lang="ts">
    import { goto } from "$app/navigation";

    async function handleLogout() {
        const response = await fetch('/auth/logout', {
            method: 'GET',
            credentials: 'include'
        });

        if (response.ok) {
            await goto('/auth/login');
        } else {
            console.error('Logout failed');
        }
    }
</script>

<button class="btn variant-filled-primary" on:click={handleLogout}>Logout</button>