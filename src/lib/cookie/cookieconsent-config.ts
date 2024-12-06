import * as CookieConsent from 'vanilla-cookieconsent';

const config: CookieConsent.CookieConsentConfig = {
    categories: {
        necessary: {
            enabled: true,
            readOnly: true
        },
    },

    onFirstConsent: ({ cookie }) => {
        console.log('onFirstConsent fired', cookie);
    },

    onConsent: ({ cookie }) => {
        console.log('onConsent fired!', cookie, CookieConsent.getUserPreferences());
    },

    onChange: ({ changedCategories, changedServices }) => {
        console.log('onChange fired!', changedCategories, changedServices);
    },

    onModalReady: ({ modalName }) => {
        console.log('ready:', modalName);
    },

    onModalShow: ({ modalName }) => {
        console.log('visible:', modalName);
    },

    onModalHide: ({ modalName }) => {
        console.log('hidden:', modalName);
    },

    guiOptions: {
        consentModal: {
            layout: 'box inline',
            position: 'bottom left',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            equalWeightButtons: true,
            flipButtons: false
        }
    },

    language: {
        default: 'de',
        translations: {
            de: {
                consentModal: {
                    title: 'Wir benutzen Cookies',
                    description:
                        'Diese Seite verwendet Cookies nur, wenn es für Ihre Nutzung der Webseite unerlässlich ist. Für alle anderen Cookies benötigen wir Ihre Zustimmung.',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Alle ablehnen',
                    showPreferencesBtn: 'Cookie Einstellungen',
                    // closeIconLabel: 'Reject all and close modal',
                    footer: `
							<a href="/impressum" target="_blank">Impressum</a>
							<a href="/datenschutz" target="_blank">Datenschutz</a>
					`
                },
                preferencesModal: {
                    title: 'Cookie Einstellungen',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Alle ablehnen',
                    savePreferencesBtn: 'Einstellungen speichern',
                    closeIconLabel: 'Schließen',
                    serviceCounterLabel: 'Service|Services',
                    sections: [
                        {
                            title: 'Deine Privatsphären entscheidungen',
                            description: `In diesem Bereich können Sie Präferenzen in Bezug auf die Verarbeitung Ihrer persönlichen Daten festlegen. Sie können die getroffenen Entscheidungen jederzeit überprüfen und ändern, indem Sie diesen Bereich über den bereitgestellten Link erneut aufrufen. Um Ihre Zustimmung zu den unten beschriebenen spezifischen Verarbeitungstätigkeiten zu verweigern, schalten Sie die Schalter aus oder verwenden Sie die Schaltfläche „Alle ablehnen“ und bestätigen Sie, dass Sie Ihre Auswahl speichern möchten.`
                        },
                        {
                            title: 'Erforderliche Cookies',
                            description:
                                'Diese Cookies sind für das Funktionieren der Website erforderlich und können in unseren Systemen nicht deaktiviert werden. Sie werden in der Regel nur als Reaktion auf von Ihnen durchgeführte Aktionen festgelegt, die einer Anforderung von Diensten gleichkommen, z. B. das Festlegen Ihrer Datenschutzeinstellungen, das Anmelden oder das Ausfüllen von Formularen. Sie können Ihren Browser so einstellen, dass er Sie über diese Cookies blockiert oder benachrichtigt, aber einige Teile der Website funktionieren dann nicht. Diese Cookies speichern keine persönlichen Informationen.',

                            //this field will generate a toggle linked to the 'necessary' category
                            linkedCategory: 'necessary'
                        },
                    ]
                }
            }
        }
    }
};

export default config;
