<script>
    import { Button, Hr, Html, Text } from 'svelte-email';

    export let name = ' ';
    export let message = ' ';
    export let email = ' ';
</script>

<Html lang="en">
<Text>
    Du hast eine neue Anfrage von {{name}}.
    Du kannst sie unter {{email}} erreichen.

    Hier ist ihre Nachricht:
    {{message}}
</Text>
</Html>