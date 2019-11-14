/**
 * English locale
 */
import appLocaleData from '@formatjs/intl-relativetimeformat/dist/locale-data/en';
import enMessages from '../locales/en_US';

const EnLang = {
    messages: {
        ...enMessages
    },
    locale: 'en-US',
    data: appLocaleData
};
export default EnLang;