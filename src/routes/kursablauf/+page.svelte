<script lang="ts">
    import { getModalStore } from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

</script>

<div class="container mx-auto p-4">
    <div class="space-y-10 text-left">
        <h1 class="h1">Kursabläufe</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-fr lg:auto-rows-fr">
            <div class="card card-hover flex flex-col h-full">
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
                        <a class="btn btn-initial" href="/termine">Jetzt Termin finden!</a>
                    </div>
                </footer>
            </div>
            <div class="card card-hover flex flex-col h-full ">
                <header class="card-header">
                    <img
                            class="bg-black/50 w-full aspect-[4/3] object-cover"
                            src="/images/Drache.jpg"
                            alt="Kurs Bild">
                </header>
                <div class="p-4 space-y-4 flex-grow">
                    <h6 class="h6" data-toc-ignore>Kinder - Workshop</h6>
                    <h3 class="h3" data-toc-ignore>Ablauf</h3>
                    <article class="overflow-y-auto md:max-h-[400px] pr-2">
                        <p class="mb-1 leading-relaxed"> <strong>2 Termine: </strong> Erster Termin modelieren, zweiter Termin glasieren</p>
                        <p class="mb-1 leading-relaxed"> <strong>4 Termine: </strong> Erster bis dritter Termin modellieren, vierter Termin glasieren</p>
                        <p class="mb-1 leading-relaxed"> <strong>6 Termine: </strong> Erster bis fünfter Termin modellieren, sechster Termin glasieren</p>
                        <p class="mb-1 leading-relaxed">In diesem Workshop werden die entstandenen Objekte nur einmal gebrannt, das verkürzt die Wartezeit für die Kinder. Nach einer Woche Trocknungszeit können die Kunstwerke schon glasiert werden.</p>
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
                        <a class="btn btn-initial" href="/termine">Jetzt Termin finden!</a>
                    </div>
                </footer>
            </div>
            <div class="card card-hover flex flex-col h-full ">
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
                        <a class="btn btn-initial" href="/termine">Jetzt Termin finden!</a>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</div>