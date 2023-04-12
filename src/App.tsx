import "primereact/resources/themes/tailwind-light/theme.css";
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";                                         
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import {useEffect,useState} from "react"

import { RecoilRoot } from 'recoil';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { ApiProvider } from './contexts/ApiContext';
import TypesafeI18n from "./i18n/i18n-react";
import { detectLocale } from './i18n/i18n-util';
import { navigatorDetector } from 'typesafe-i18n/detectors';
import { loadLocaleAsync } from './i18n/i18n-util.async';
import './App.css';
import Home from './pages/home';
import Login from './pages/auth/login';
import SingUp from './pages/auth/signup';
import ForgotPassword from './pages/auth/forgot-password';
import ResetPassword from './pages/auth/reset-password';
import AppContextProviders from './contexts/AppContextProvider';
import { ToastProvider } from './contexts/ToastContext';
import { AuthProvider } from './contexts/AuthContext';
import Landing from "./pages/home/landing";
import PrivateRoute from "./helpers/PrivateRoute";
import Dashbord from "./pages/dashboard";
import Profile from "./pages/dashboard/profile";
import ReAuthentication from "./pages/auth/reauthentication";
function App() {
  const router = createBrowserRouter([
    {
      path:'/',
      element:<Home/>,
      children:[
        {
          path:'/',
          element:<Landing />
        },
        {
          path:'/login',
          element:<Login/>
        },
        {
          path:'signup',
          element:<SingUp/>
        },
        {
          path:'/forgot-password',
          element:<ForgotPassword/>
        },
        
      ]
    },
    {
      path:"/dashbord",
      element:<PrivateRoute />,
      children:[
        {
          path:"",
          element:<Dashbord />
        },
        {
          path:"profile",
          element:<Profile />
        }
      ]

    },
    
    
    {
      path:'/reset-password',
      element:<ResetPassword/>
    },
    {
      path:'reauthenticate',
      element:<ReAuthentication/>
    }
  ])
  const providers = [ToastProvider, AuthProvider, ApiProvider]
  // Detect locale
   // (Use as advanaced locale detection strategy as you like. 
   // More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
   const locale = detectLocale(navigatorDetector);

   // Load locales
   // (Use a data fetching solution that you prefer)
   const [localesLoaded, setLocalesLoaded] = useState(false)
   useEffect(() => {
      loadLocaleAsync(locale).then(() => setLocalesLoaded(true))
   }, [locale])
   
   if(!localesLoaded) {
      return null
   }
  return (
    <AppContextProviders components={providers}>
      <RecoilRoot>
        <HelmetProvider>
          <ThemeProvider theme={theme}>
            <TypesafeI18n locale={locale || 'fr'}>
              <RouterProvider router={router} />
            </TypesafeI18n>
          </ThemeProvider>
        </HelmetProvider>
      </RecoilRoot>
    </AppContextProviders>
  );
}

export default App;
