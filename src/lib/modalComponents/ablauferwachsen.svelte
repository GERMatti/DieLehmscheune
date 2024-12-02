<script lang="ts">

    import { getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();
</script>
<div class="flex justify-center max-h-screen max-w-2xl">
    <div class="card flex flex-col h-full">
        <button class="btn bg-initial absolute p-4" on:click={() => (modalStore.close())}>
            <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.6449 4.04935C14.1134 3.58082 14.1134 2.81993 13.6449 2.3514C13.1763 1.88287 12.4154 1.88287 11.9469 2.3514L8 6.30205L4.04935 2.35515C3.58082 1.88662 2.81993 1.88662 2.3514 2.35515C1.88287 2.82368 1.88287 3.58457 2.3514 4.0531L6.30205 8L2.35515 11.9506C1.88662 12.4192 1.88662 13.1801 2.35515 13.6486C2.82368 14.1171 3.58457 14.1171 4.0531 13.6486L8 9.69795L11.9506 13.6449C12.4192 14.1134 13.1801 14.1134 13.6486 13.6449C14.1171 13.1763 14.1171 12.4154 13.6486 11.9469L9.69795 8L13.6449 4.04935Z" fill="white"/> </svg>
        </button>
        <header class="card-header">
            <img
                    class="bg-black/50 w-full aspect-[4/3] object-cover"
                    src="/images/bowl.jpeg"
                    alt="Kurs Bild">
        </header>
        <div class="p-4 space-y-4 flex-grow">
            <h6 class="h6" data-toc-ignore>Erwachsenen - Workshop</h6>
            <h3 class="h3" data-toc-ignore>Kursablauf</h3>
            <article class="overflow-y-auto md:max-h-[400px] pr-2">
                <p class="mb-1 leading-relaxed"> <strong>1. Termin: Modellieren</strong></p>
                <p class="mb-1 leading-relaxed">Bei diesem ersten Treffen machen wir uns kreativ ans Werk! Unter der Anleitung unserer erfahrenen Kursleiterin werden wir mit Ton modellieren und unsere eigenen tollen Kunstwerke erschaffen. Wir arbeiten in einer kleinen Gruppe von maximal 6 Personen, sodass jeder genügend Aufmerksamkeit erhält. </p>
                <p class="mb-1 leading-relaxed"><strong>2. Termin: Glasieren</strong></p>
                <p class="mb-1 leading-relaxed">Nach einer zweiwöchigen Trocknungszeit (ganz wichtig, damit unsere Kunstwerke gut aushärten!) treffen wir uns zum Glasieren. Hier bringen wir Farbe ins Spiel und machen unsere Stücke zu einem echten Hingucker! </p>
                <p class="mb-1 leading-relaxed"><strong>Wichtige Informationen:</strong></p>
                <ul>
                    <li class="mb-1 ml-6 leading-relaxed"> <strong>Kursgröße: </strong> Maximal 6 Personen</li>
                    <li class="mb-1 ml-6 leading-relaxed"> <strong>Alle Materialien und Brände inklusive </strong></li>
                    <li class="mb-1 ml-6 leading-relaxed"> <strong>Schürze und gute Laune mitbringen</strong></li>
                </ul>
                <p class="mb-1 leading-relaxed">Seid bereit für kreative Stunden voller Spaß! Wir freuen uns auf euch! 🎨✨</p>
            </article>
        </div>
        <hr class="opacity-50">
        <footer class="p-4 flex justify-center items-center mt-auto">
            <div class="flex space-x-4">
                <a class="btn btn-initial" href="/termine" on:click={() => (modalStore.close())}>Jetzt Termin finden!</a>
            </div>
        </footer>
    </div>
</div>