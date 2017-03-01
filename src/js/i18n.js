import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'


i18n
    .use(LanguageDetector)
    .init({
        resources: {
            es: {
                defaultNamespace: {
                    'E-mail': 'Correo electrónico',
                    'Submit': 'Enviar',
                    'Reset': 'Limpiar',
                    'Invalid-email': 'Dirección de correo inválida (en este caso debe empezar con la letra "a")',
                }
            },
            en: {
                defaultNamespace: {
                    'E-mail': 'E-mail',
                    'Submit': 'Submit',
                    'Clear': 'Clear',
                    'Invalid-email': 'Invalid email address (in this example it must start with the letter "a")',
                }
            }
        },
        fallbackLng: 'en',

        debug: true,
    })


export default i18n
