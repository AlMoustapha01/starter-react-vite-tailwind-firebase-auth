import { useState, useEffect } from 'react';
import 'primereact/resources/themes/tailwind-light/theme.css';
import { Button } from 'primereact/button';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import theme from '../../theme';
import { useI18nContext } from '../../i18n/i18n-react';
import useLocation from '../../store/location';
import { loadLocaleAsync } from '../../i18n/i18n-util.async';
import { Outlet, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';

const OPTIONS = ['FR', 'EN'];

export default function Home() {
  const [lang, LocationActions] = useLocation();
  const { LL, locale, setLocale } = useI18nContext();
  const [selectedLang, setSelectedLang] = useState<string>(locale);
  const navigation = useNavigate(); 
  const handleLangChange = async (e: SelectButtonChangeEvent) => {
    if(e.value){
        const event = e.value.toLowerCase();
        LocationActions.toggle();
        setSelectedLang(e.value);
        await loadLocaleAsync(event)

        setLocale(event);
    }
    
  };

  useEffect(() => {
    setSelectedLang(lang.toUpperCase());
    setLocale(lang);
  }, []);

  return (
    <>
      <Header />
      <div className={`grid p-8 max-w-8xl mx-auto content-center`}>
        <Outlet />
      </div>
    </>
  );
}
