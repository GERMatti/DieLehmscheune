<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from "./$types"
    import {loadScript, type PayPalNamespace} from "@paypal/paypal-js";
    import { env } from "$env/dynamic/public";
    import {getModalStore, type ModalSettings} from "@skeletonlabs/skeleton";
    import {redirect} from "@sveltejs/kit";

    export let data: PageData

    let workshop = data.workshop;

    const modalStore = getModalStore();

    let paypal: PayPalNamespace | null;
    let isCheckboxChecked = !workshop.categoryname.toLowerCase().includes("kinder");

    onMount( async () => {
        try {
            paypal = await loadScript({clientId: env.PUBLIC_API_CLIENT_ID, currency: "EUR"});
        } catch (error) {
            console.error("failed to load the PayPal JS SDK script", error);
        }

        if (paypal)
            try {
                await paypal.Buttons!({
                    style: {
                        color: "gold",
                        shape: "pill",
                        layout: "horizontal",

                    },
                    async createOrder() {
                        try {
                            console.log("fetch start create order")
                            const response = await fetch("/api/create-order", {
                                method: "POST",
                                headers: {"Content-Type": "application/json"},
                                body: JSON.stringify({
                                    workshopID: workshop.workshopid,
                                    isCheckboxChecked: isCheckboxChecked,
                                }),
                            });

                            const orderData = await response.json();
                            if (orderData.error) {
                                throw orderData.error;
                            }

                            return orderData.id;

                        } catch (error) {
                            console.error(error);
                            throw error;
                        }
                    },
                    async onApprove(data) {
                        // Capture the funds from the transaction.
                        const response = await fetch("/api/capture-paypal-order", {
                            method: "POST",
                            body: JSON.stringify({
                                orderID: data.orderID,
                                workshopID: workshop.workshopid,
                            }),
                        });

                        const details = await response.json();
                        modalStore.trigger(modalSuccess);
                        await redirect(200, "/shop/" + workshop.workshopid);
                    },
                    onError: function (err) {
                        if (err.toString().includes("No more slots available")) {
                            modalStore.trigger(modalFull);
                        } else if (err.toString().includes("Please accept the terms and conditions")) {
                            modalStore.trigger(modalNotAccepted);
                        } else {
                            modalStore.trigger(modalError);
                        }
                        redirect(300, "/shop/" + workshop.workshopid);
                    },
                }).render("#paypal-button-container");
            } catch (error) {
                console.error("failed to render the PayPal button", error);
            }
    });

    const modalSuccess: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentSix',
    };
    const modalError: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentSeven',
    };
    const modalNotAccepted: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentNine',
    };
    const modalFull: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentEight',
    };
    let slots = Array.from({ length: Number(data.remainingSlots) }, (_, i) => i + 1);
</script>

<div class="flex flex-col md:flex-row justify-center items-center h-auto md:h-1/2 max-md:mt-16 max-md:mx-8 md:my-80">
    <div class="max-w-7xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 pb-10 bg-gray-100 p-4 rounded-xl">
        <div class="h-full xl:col-span-2">
            <img class="w-full h-full object-cover" src="/images/bowl.jpeg" alt="KursBild">
        </div>
        <div class="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center">
            <div class="flex flex-col gap-5">
                <h2 class="text-2xl md:text-4xl font-semibold">{workshop.title}</h2>
                <p class="text-lg md:text-xl font-semibold">{data.price} €</p>
                <p class=" text-md md:text-lg font-semibold">Freie Plätze: {data.remainingSlots}</p>
                <p class="text-sm md:text-base text-gray-600">{workshop.description}</p>
                <p class="text-sm md:text-base text-red-500">Beim onlinekauf über Paypal fallen extra Gebühren an für die Paypal Nutzung!</p>
                <div class="space-y-2">
                    {#if workshop.categoryname.toLowerCase().includes("kinder")}
                        <label class="flex items-center space-x-2">
                            <input class="checkbox" type="checkbox" on:change="{() => { isCheckboxChecked = !isCheckboxChecked; }}"/>
                            <p class="text-sm md:text-base">Hiermit bestätige ich das mein Kind 8 Jahre oder älter ist.</p>
                        </label>
                    {/if}
            </div>
                <div id="paypal-button-container"></div>
            </div>
        </div>
    </div>
</div>