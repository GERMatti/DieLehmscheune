<script lang="ts">

    import { getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

</script>

<aside id="success-message" class="alert variant-filled-success mx-auto max-w-2xl mt-10 rounded-xl">
    <div class="mr-5">
        <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.6204 1.1532C14.8966 1.34456 15.0415 1.67536 14.9896 2.00615L13.2395 13.3788C13.1985 13.644 13.0372 13.8763 12.802 14.0076C12.5669 14.1388 12.2852 14.1552 12.0364 14.0513L8.76603 12.6926L6.89295 14.7184C6.64959 14.9835 6.26677 15.071 5.93044 14.9398C5.59411 14.8086 5.37535 14.4832 5.37535 14.1224V11.8369C5.37535 11.7276 5.41637 11.6237 5.4902 11.5444L10.0731 6.54427C10.2317 6.37204 10.2262 6.10686 10.0621 5.94283C9.89808 5.7788 9.63284 5.76787 9.46057 5.92369L3.89877 10.8637L1.48428 9.65534C1.19443 9.51045 1.00849 9.22066 1.00028 8.89808C0.992082 8.57549 1.16162 8.27477 1.44053 8.11347L13.6907 1.11492C13.9833 0.948162 14.3442 0.964565 14.6204 1.1532Z" fill="black"/>
        </svg>
    </div>
    <div class="alert-message">
        <h3 class="h3">Danke</h3>
        <p>Deine E-Mail wurde erfolgreich zugestellt!</p>
    </div>
</aside>