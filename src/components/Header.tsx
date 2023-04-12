import { useState, useEffect, useRef, LegacyRef } from 'react';
import 'primereact/resources/themes/tailwind-light/theme.css';
import { Button } from 'primereact/button';
import { SelectButton, SelectButtonChangeEvent } from 'primereact/selectbutton';
import theme from '../theme';
import { useI18nContext } from '../i18n/i18n-react';
import useLocation from '../store/location';
import { loadLocaleAsync } from '../i18n/i18n-util.async';
import { Outlet, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/binary-code.png';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useFavicon } from 'primereact/hooks';

const OPTIONS = ['FR', 'EN'];

export default function Header() {
  const [lang, LocationActions] = useLocation();
  const { LL, locale, setLocale } = useI18nContext();
  const [selectedLang, setSelectedLang] = useState<string>(locale);

  const op = useRef<OverlayPanel>(null);
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
                    <Button label={LL.header.login()} onClick={() => navigation('/login')} severity="info" outlined />
                  </div>
                  <div>
                    <Button
                      label={LL.header.sign_up()}
                      onClick={() => navigation('/signup')}
                      severity="warning"
                      outlined
                    />
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
                  <Button className='w-full' label={LL.header.login()} onClick={() => navigation('/login')} severity="info" outlined />
                </div>
                <div>
                  <Button
                    label={LL.header.sign_up()}
                    onClick={() => navigation('/signup')}
                    className='w-full'
                    severity="warning"
                    outlined
                  />
                </div>
                <div>
                  <SelectButton className='w-full' value={selectedLang} onChange={handleLangChange} options={OPTIONS} />
                </div>
              </div>
            </OverlayPanel>
          </div>
        </div>
      </section>

      
    </>
  );
}
