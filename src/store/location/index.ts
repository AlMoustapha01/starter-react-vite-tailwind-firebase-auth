import { atom, useRecoilState } from 'recoil';
import { useLocalStorage } from 'primereact/hooks';
import { Actions } from './type';
import { AtomEffectParams } from '../type';
import { navigatorDetector } from 'typesafe-i18n/detectors';
import { detectLocale } from '../../i18n/i18n-util';
import { Locales } from '../../i18n/i18n-types';
import { loadLocaleAsync } from '../../i18n/i18n-util.async';

const locale = detectLocale(navigatorDetector);
const storedLang = localStorage.getItem('lang');

const langState = atom({
  key: 'location-state',
  default: locale,
  effects: [synchronizeWithLocalStorage],
});

function synchronizeWithLocalStorage({ setSelf, onSet }: AtomEffectParams) {
  try {
    storedLang && setSelf(storedLang);
  } catch (error) {
    console.error(error);
  }
  onSet((value: Locales) => {
    try {
        localStorage.setItem('lang',value);
    } catch (error) {
      console.error(error);
    }
  });
}
function useLocation(): [Locales, Actions] {
  const [lang, setLang] = useRecoilState(langState);
  function toggle() {
    try {
      setLang((value) => (value === 'fr' ? 'en' : 'fr'));
    } catch (error) {
      console.error(error);
    }
  }
  return [lang, { toggle }];
}

export default useLocation;
