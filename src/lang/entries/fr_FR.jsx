/**
 * French locale
 */
import appLocaleData from '@formatjs/intl-relativetimeformat/dist/locale-data/fr';
import saMessages from '../locales/fr_FR';

const saLang = {
    messages: {
        ...saMessages
    },
    locale: 'fr-FR',
    data: appLocaleData
};
export default saLang;
