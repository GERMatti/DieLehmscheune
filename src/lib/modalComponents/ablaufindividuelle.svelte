<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();
</script>

<div class="flex justify-center max-h-screen max-w-2xl">
<div class="card card-hover flex flex-col h-full ">
    <button class="btn bg-initial absolute p-4" on:click={() => (modalStore.close())}>
        <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6449 4.04935C14.1134 3.58082 14.1134 2.81993 13.6449 2.3514C13.1763 1.88287 12.4154 1.88287 11.9469 2.3514L8 6.30205L4.04935 2.35515C3.58082 1.88662 2.81993 1.88662 2.3514 2.35515C1.88287 2.82368 1.88287 3.58457 2.3514 4.0531L6.30205 8L2.35515 11.9506C1.88662 12.4192 1.88662 13.1801 2.35515 13.6486C2.82368 14.1171 3.58457 14.1171 4.0531 13.6486L8 9.69795L11.9506 13.6449C12.4192 14.1134 13.1801 14.1134 13.6486 13.6449C14.1171 13.1763 14.1171 12.4154 13.6486 11.9469L9.69795 8L13.6449 4.04935Z" fill="white"/> </svg>
    </button>
    <header class="card-header">
        <img
                class="bg-black/50 w-full aspect-[4/3] object-cover"
                src="/images/custom.jpg"
                alt="Kurs Bild">
    </header>
    <div class="p-4 space-y-4 flex-grow">
        <h6 class="h6" data-toc-ignore>Individuelle - Events</h6>
        <article class="overflow-y-auto md:max-h-[400px] pr-2">
            <p class="mb-1 leading-relaxed"> Kindergeburtstage, Junggesellenabschiede, Teamevents und Betriebsausflüge – überall dort, wo Menschen zusammenkommen, steht das Gemeinschaftsgefühl im Mittelpunkt. Diese Anlässe sind nicht nur eine Möglichkeit, zu feiern, sondern auch wertvolle Gelegenheiten, die Kreativität zu entfalten und Stress zu reduzieren.</p>
            <p class="mb-1 mt-2 leading-relaxed"> <strong>1 Termin: </strong>Gemeinsames Modellieren</p>
            <p class="mb-1 mt-2 leading-relaxed"> Alle entstandenen Werke werden von uns in Weiß glasiert.</p>
            <h3 class="h3 mt-3 ">Kindergeburtstage – Spaß und Kreativität</h3>
            <p class="mb-1 mt-2 leading-relaxed">Ein Kindergeburtstag ist mehr als nur Kuchen und Geschenke. Hier wird die Fantasie lebendig! Spieletische, Kreativstationen und thematische Aktivitäten fördern die Kreativität der kleinen Gäste und schaffen eine unvergessliche Atmosphäre voller Lachen und Freude.</p>
            <h3 class="h3 mt-3 ">Junggesellenabschiede – Feiern mit Stil</h3>
            <p class="mb-1 mt-2 leading-relaxed">Junggesellenabschiede sind perfekte Gelegenheiten, um die letzten Tage der Ungebundenheit gebührend zu feiern.  Hierbei stehen das Miteinander und die gemeinsamen Erlebnisse im Vordergrund. Sich als Gruppe herauszufordern, stärkt nicht nur die Resilienz, sondern sorgt auch für jede Menge Spaß!</p>
            <h3 class="h3 mt-3 ">Teamevents – Stärkung des Betriebsklimas</h3>
            <p class="mb-1 mt-2 leading-relaxed">In der Arbeitswelt sind Teamevents unverzichtbar. Sie ermöglichen es den Mitarbeitern, sich außerhalb des Büros kennenzulernen und kreative Lösungen im Team zu entwickeln. Ob bei einer Schnitzeljagd, einem Escape Room oder einem Kunst-Workshop – solche Events fördern nicht nur die Zusammenarbeit, sondern helfen auch, den Stress des Arbeitsalltags hinter sich zu lassen. Das Gefühl, Teil eines Teams zu sein, trägt wesentlich zur Resilienz bei.</p>
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