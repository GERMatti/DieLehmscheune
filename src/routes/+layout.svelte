<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		Modal,
		initializeStores,
		type ModalComponent,
		type ModalSettings, getModalStore
	} from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	// For Modal

	import ModalComponentOne from '$lib/modalComponents/ablauferwachsen.svelte';
	import ModalComponentTwo from '$lib/modalComponents/ablaufkinder.svelte';
	import ModalComponentThree from '$lib/modalComponents/ablaufindividuelle.svelte';
	import ModalComponentFour from '$lib/modalComponents/emailsuccess.svelte';
	import ModalComponentFive from '$lib/modalComponents/nav.svelte';
	import ModalComponentSix from '$lib/modalComponents/paypalSuccess.svelte';
	import ModalComponentSeven from '$lib/modalComponents/paypalError.svelte';
	import ModalComponentEight from '$lib/modalComponents/workshopFull.svelte';
	import ModalComponentNine from '$lib/modalComponents/buttonError.svelte';
	import ModalComponentTen from '$lib/modalComponents/successGeneral.svelte';

	const modalRegistry: Record<string, ModalComponent> = {
		// Set a unique modal ID, then pass the component reference
		ModalComponentOne: { ref: ModalComponentOne },
		ModalComponentTwo: { ref: ModalComponentTwo },
		ModalComponentThree: { ref: ModalComponentThree },
		ModalComponentFour: { ref: ModalComponentFour },
		ModalComponentFive: { ref: ModalComponentFive },
		ModalComponentSix: { ref: ModalComponentSix },
		ModalComponentSeven: { ref: ModalComponentSeven },
		ModalComponentEight: { ref: ModalComponentEight },
		ModalComponentNine: { ref: ModalComponentNine },
		ModalComponentTen: { ref: ModalComponentTen },
		// ...
	};

	initializeStores();

	const modalStore = getModalStore();

	const modalNav: ModalSettings = {
		type: 'component',
		// Data
		component: 'ModalComponentFive',
	};
</script>

<Modal components={modalRegistry} />
<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<a class="flex" href="/">
					<img 
						class = "w-12 h-12 md:w-16 md:h-16 place-content-center"
						src="/images/LogoNoBg.png" 
						alt="">
					<strong class="max-md:text-sm md:text-xl uppercase place-content-center">Die Lehmscheune</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="max-md:hidden">
					<a
						class="btn btn-initial"
						href="/kurse"
					>
						Kursangebote
					</a>
					<a
						class="btn btn-initial"
						href="/termine"
					>
						Termine
					</a>
					<a
						class="btn btn-initial"
						href="/about"
					>
						Über mich
					</a>
					<a
						class="btn btn-initial"
						href="/kontakt"
					>
						Kontakt
					</a>
					<a
						class="btn variant-filled-primary"
						href="/shop"
					>
						Jetzt Kurse buchen!
					</a>
				</div>
				<a class="md:hidden" on:click={() => modalStore.trigger(modalNav)}>
					<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 13C1 13.5531 1.44687 14 2 14H14C14.5531 14 15 13.5531 15 13C15 12.4469 14.5531 12 14 12H2C1.44687 12 1 12.4469 1 13ZM1 8C1 8.55312 1.44687 9 2 9H14C14.5531 9 15 8.55312 15 8C15 7.44688 14.5531 7 14 7H2C1.44687 7 1 7.44688 1 8ZM15 3C15 2.44687 14.5531 2 14 2H2C1.44687 2 1 2.44687 1 3C1 3.55313 1.44687 4 2 4H14C14.5531 4 15 3.55313 15 3Z" fill="black"/>
					</svg>
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />

	<svelte:fragment slot="footer">
		<div class="flex justify-center items-center space-x-2 bg">
			<a
				class="btn btn-initial"
				href="/impressum"
				target="_blank"
				rel="noreferrer"
			>
				Impressum
			</a>
			<a
				class="btn btn-initial"
				href="/datenschutz"
				target="_blank"
				rel="noreferrer"
			>
				Datenschutz
			</a>
		</div>
	</svelte:fragment>
</AppShell>
