<script lang="ts">
    import {getModalStore, type ModalSettings} from '@skeletonlabs/skeleton';

    const modalStore = getModalStore();

    const modalErwachsenen: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentOne',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => console.log('response:', r),
    };

    const modalKinder: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentTwo',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => console.log('response:', r),
    };

    const modalIndividuelle: ModalSettings = {
        type: 'component',
        // Data
        component: 'ModalComponentThree',
        // TRUE if confirm pressed, FALSE if cancel pressed
        response: (r: boolean) => console.log('response:', r),
    };
</script>

<div class="container mx-auto p-4">
    <div class="space-y-10 text-left">
        <h1 class="h1">Meine Workshops</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-fr lg:auto-rows-fr">
            <div class="card card-hover flex flex-col h-full rounded-xl">
                <header class="card-header">
                    <img 
                    class="bg-black/50 w-full aspect-[4/3] object-cover"
                    src="/images/bowl.jpeg" 
                    alt="Kurs Bild">
                </header>
                <div class="p-4 space-y-4 flex-grow">
                    <h6 class="h6" data-toc-ignore>Kursvorstellung</h6>
                    <h3 class="h3" data-toc-ignore>Erwachsenen - Workshop</h3>
                    <h6 class="h6" data-toc-ignore>75€</h6>
                    <article class="overflow-y-auto md:max-h-[300px] pr-2">
                        <p class="mb-1 leading-relaxed">Töpfern ist nicht nur ein Handwerk, sondern ein kreatives Abenteuer! In unseren Workshops tauchen Teilnehmer in die wunderbare Welt des Tons ein und entdecken die Magie, eigene kreative Ideen zum Leben zu erwecken. Mit den Händen formen, kneten und gestalten – es gibt kaum etwas Befriedigenderes, als seinen eigenen Becher oder eine fließend geformte Schale zu erschaffen.
                        </p>
                        <p class="mb-1 leading-relaxed">
                            Jeder Workshop ist ein bunter Mix aus Spaß, Entspannung und Lernen. Unter der Anleitung unserer erfahrenen Anleiter können sowohl Anfänger als auch Fortgeschrittene ihren eigenen Stil finden. Wir sorgen dafür, dass kein Grund zum Stress besteht – schließlich geht es beim Töpfern darum, den Alltagsstress hinter sich zu lassen und im Flow zu sein. 
                        </p>
                        <p class="mb-1 leading-relaxed">
                            Die richtige Technik und viele Tipps geben wir dir an die Hand, während du dich in die kreative Gestaltung vertiefst.  Am Ende des Workshops wirst du mit deinen eigenen Kunstwerken nach Hause gehen, die nicht nur dein Zuhause verschönern, sondern auch eine persönliche Note in dein Leben bringen.
                        </p>
                        <p class="mb-1 leading-relaxed">
                            Schau vorbei und lass dich von der Vielfalt des Töpferns begeistern! Bring deine Familie und Freunde mit und erlebt gemeinsam die Freude am Gestalten. Wir freuen uns darauf, mit dir kreativ zu werden!
                        </p>
                    </article>
                </div>
                <hr class="opacity-50">
                <footer class="flex justify-between items-center md:p-4">
                    <div class="">
                        <a class="btn btn-initial" href="#" on:click={() => modalStore.trigger(modalErwachsenen)}>Mehr erfahren</a>
                    </div>
                    <div class="">
                        <a class="btn btn-initial" href="/termine">Jetzt Termin finden!</a>
                    </div>
                </footer>
            </div>
            <div class="card card-hover flex flex-col h-full rounded-xl">
                <header class="card-header">
                    <img 
                    class="bg-black/50 w-full aspect-[4/3] object-cover"
                    src="/images/Drache.jpg" 
                    alt="Kurs Bild">
                </header>
                <div class="p-4 space-y-4 flex-grow">
                    <h6 class="h6" data-toc-ignore>Kursvorstellung</h6>
                    <h3 class="h3" data-toc-ignore>Kinder - Workshop</h3>
                    <h6 class="h6" data-toc-ignore>Preis abhängig vom Paket €</h6>
                    <article class="overflow-y-auto md:max-h-[300px] pr-2">
                        <p class="h4 mb-4 leading-relaxed"> Flexible Workshop-Pakete für jedes Zeitbudget</p>
                        <ul>
                        <li class="mb-1 leading-relaxed"> <strong>2 Termine: 60 €</strong> – Für einen ersten Einblick in die Töpferkunst.</li>
                        <li class="mb-1 leading-relaxed"> <strong>4 Termine: 105 €</strong> – Für alle, die tiefer in die Welt des Tons eintauchen möchten. </li>
                        <li class="mb-1 leading-relaxed"> <strong>6 Termine: 150 €</strong> – Für echte Töpfer-Fans, die ihre Kreativität voll ausleben wollen. </li>
                        </ul>
                        <p class="mb-1 leading-relaxed"> Taucht ein in unsere bunte Töpferwelt für Kinder, wo Kreativität, Fantasie und Freude im Mittelpunkt stehen! Unsere liebevoll gestalteten Workshops sind ideal, um kleine Künstler spielerisch in die Welt des Töpferns einzuführen. </p>
                        <p class="mb-1 leading-relaxed"> Egal, ob Anfänger oder Fortgeschrittene – durch meine pädagogische Erfahrung gewährleiste ich, dass jedes Kind sich wohlfühlt und inspiriert wird. Gemeinsam verwandeln wir einfache Tonklumpen in wundervolle Kunstwerke! Von der ersten Berührung mit dem Material bis hin zur liebevollen Bemalung der fertigen Werke stehe ich mit Rat und Tat zur Seite. </p>

                        <p class="h4 mb-1 leading-relaxed"> Warum unser Workshop das Richtige für Ihr Kind ist:</p>
                        <ul>
                        <li class="mb-1 leading-relaxed"> <strong>Kreatives Lernen:</strong> Spielerisches Erforschen handwerklicher Techniken.</li>
                        <li class="mb-1 leading-relaxed"> <strong>Förderung von Teamgeist:</strong> Gemeinsam Ideen entwickeln und umsetzen.</li>
                        <li class="mb-1 leading-relaxed"> <strong>Stärkung der Selbstsicherheit:</strong> Das Erfolgserlebnis, etwas Eigenes zu schaffen. </li>
                        </ul>
                    </article>
                </div>
                <hr class="opacity-50">
                <footer class="flex justify-between items-center md:p-4">
                    <div class="">
                        <a class="btn btn-initial" href="#" on:click={() => modalStore.trigger(modalKinder)}>Mehr erfahren</a>
                    </div>
                    <div class="">
                        <a class="btn btn-initial" href="/termine">Jetzt Termin finden!</a>
                    </div>
                </footer>
            </div>
            <div class="card card-hover flex flex-col h-full rounded-xl">
                <header class="card-header">
                    <img 
                    class="bg-black/50 w-full aspect-[4/3] object-cover"
                    src="/images/custom.jpg" 
                    alt="Kurs Bild">
                </header>
                <div class="p-4 space-y-4 flex-grow">
                    <h6 class="h6" data-toc-ignore>Kursvorstellung</h6>
                    <h3 class="h3" data-toc-ignore>Individuelle Events</h3>
                    <h6 class="h6" data-toc-ignore>Preis abhängig von Event €</h6>
                    <article class="overflow-y-auto md:max-h-[300px] pr-2">
                        <p class="mb-1 leading-relaxed">
                            Entdecke die kreative Welt unserer Workshops! Ob Kindergeburtstag, Junggesellinnenabschied, Team-Ausflug oder ein Treffen mit kleinen Gruppen von 4-6 Personen, bei uns erwartet dich ein unvergessliches Erlebnis. Gemeinsam formen wir aus Lehm wunderbare Kunstwerke, während Lachen und Freude die Luft erfüllen. Unsere erfahrenen Kursleiter*innen begleiten euch spielerisch durch den gesamten Prozess und sorgen dafür, dass jeder seine eigene kreative Note einbringen kann. Lass den Alltagsstress hinter dir und tauche ein in eine Welt der Farben, Fantasie und feuchtfröhlichem Matschen – der perfekte Anlass, um gemeinsam Spaß zu haben!
                        </p>
                    </article>
                </div>
                <hr class="opacity-50">
                <footer class="flex justify-between items-center md:p-4">
                    <div class="">
                        <a class="btn btn-initial" href="#" on:click={() => modalStore.trigger(modalIndividuelle)}>Mehr erfahren</a>
                    </div>
                    <div class="">
                        <a class="btn btn-initial" href="/termine">Jetzt Termin finden!</a>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</div>