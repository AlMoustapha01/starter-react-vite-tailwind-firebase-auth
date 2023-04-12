import { useState, useEffect, useRef, LegacyRef } from 'react';
import 'primereact/resources/themes/tailwind-light/theme.css';
import { Button } from 'primereact/button';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import { useI18nContext } from '../i18n/i18n-react';
import useLocation from '../store/location';
import { loadLocaleAsync } from '../i18n/i18n-util.async';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/images/binary-code.png';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Menu } from 'primereact/menu';

import { useFavicon } from 'primereact/hooks';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import Profile from '../assets/images/bussiness-man.png';
import { useAuth } from '../contexts/AuthContext';
const OPTIONS = ['FR', 'EN'];

export default function DashboardHeader() {
  const { currentUser } = useAuth();
  const [lang, LocationActions] = useLocation();
  const { logout } = useAuth();
  const { LL, locale, setLocale } = useI18nContext();
  const [selectedLang, setSelectedLang] = useState<string>(locale);
  const items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        navigation('/dashbord/profile');
      },
    },
    {
      label: 'Deconnexion',
      icon: 'pi pi-power-off',
      command: () => {
        logout();
      },
    },
    {
      label: 'Retour',
      icon: 'pi pi-arrow-left',
      command: () => {
        navigation(-1);
      },
    },
  ];
  const op = useRef<OverlayPanel>(null);
  const menu = useRef<Menu>(null);
  const navigation = useNavigate();
  useFavicon(Logo, 'icon');
  const handleLangChange = async (e: SelectButtonChangeEvent) => {
    if (e.value) {
      const event = e.value.toLowerCase();
      LocationActions.toggle();
      setSelectedLang(e.value);
      await loadLocaleAsync(event);

      setLocale(event);
    }
  };

  useEffect(() => {
    setSelectedLang(lang.toUpperCase());
    setLocale(lang);
  }, []);
  return (
    <>
      <section className="overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 bg-white">
          <div className="w-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-auto mr-14">
                <a href="/">
                  <img src={Logo} className="w-20" alt="" />
                </a>
              </div>
            </div>
          </div>

          <div className="w-auto">
            <div className="flex flex-wrap items-center">
              <div className="w-auto">
                <div className="flex items-center gap-4 md:mr-16">
                  <div className='mx-2'>
                    <i className="pi pi-bell p-overlay-badge cursor-pointer" style={{ fontSize: '1.5rem' }}>
                      <Badge value="2"></Badge>
                    </i>
                  </div>
                  <div>
                    <Avatar
                      className="p-overlay-badge cursor-pointer"
                      image={currentUser?.photoURL || Profile}
                      size="xlarge"
                      shape='circle'
                      onClick={(e) => menu.current?.toggle(e)}
                    >
                    </Avatar>
                    <Menu model={items} popup ref={menu} />
                  </div>

                  <div>
                    <SelectButton value={selectedLang} onChange={handleLangChange} options={OPTIONS} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
