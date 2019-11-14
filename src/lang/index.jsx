/**
 * App Language Provider
 * Add more locales here
 */
import enLang from './entries/en-US';
import frLang from './entries/fr_FR';

const AppLocale = {
    en: enLang,
    fr: frLang
};

if (!Intl.PluralRules) {
   require('@formatjs/intl-pluralrules/polyfill');
   require('@formatjs/intl-pluralrules/dist/locale-data/en'); // Add locale data for de
 }
 
 if (!Intl.RelativeTimeFormat) {
   require('@formatjs/intl-relativetimeformat/polyfill');
   require('@formatjs/intl-relativetimeformat/dist/locale-data/en'); // Add locale data for de
 }

export default AppLocale;
