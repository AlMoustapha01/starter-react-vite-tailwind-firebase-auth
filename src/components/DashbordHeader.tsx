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
  const {currentUser} = useAuth();
  const [lang, LocationActions] = useLocation();
  const {logout} = useAuth();
  const { LL, locale, setLocale } = useI18nContext();
  const [selectedLang, setSelectedLang] = useState<string>(locale);
  const items = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command:()=>{
        navigation('/dashbord/profile')
      }
    },
    {
      label: 'Deconnexion',
      icon: 'pi pi-power-off',
      command:()=>{
        logout()
      }
    },
    {
      label:'Retour',
      icon:'pi pi-arrow-left',
      command:()=>{
        navigation(-1)
      }
    }
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

          <div className="w-auto hidden xl:block">
            <div className="flex flex-wrap items-center">
              <div className="w-auto hidden lg:block">
                <div className="flex items-center gap-4 mr-16">
                  <div>
                    <Button icon="pi pi-bell" size='large' rounded text aria-label="Filter" />
                  </div>
                  <div>
                    <Avatar
                      className="p-overlay-badge cursor-pointer"
                      image={currentUser?.photoURL || Profile}
                      size="xlarge"
                      onClick={(e) => menu.current?.toggle(e)}
                    >
                      <Badge value="4" severity="danger" />
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
          <div className="card flex justify-content-center xl:hidden">
            <Button type="button" icon="pi pi-bars" severity="info" outlined onClick={(e) => op.current?.toggle(e)} />
            <OverlayPanel ref={op}>
              <div className="grid content-center gap-4 w-full">
                <div>
                  <Button
                    className="w-full"
                    label={LL.header.login()}
                    onClick={() => navigation('/login')}
                    severity="info"
                    outlined
                  />
                </div>
                <div>
                  <Button
                    label={LL.header.sign_up()}
                    onClick={() => navigation('/signup')}
                    className="w-full"
                    severity="warning"
                    outlined
                  />
                </div>
                <div>
                  <SelectButton className="w-full" value={selectedLang} onChange={handleLangChange} options={OPTIONS} />
                </div>
              </div>
            </OverlayPanel>
          </div>
        </div>
      </section>
    </>
  );
}
