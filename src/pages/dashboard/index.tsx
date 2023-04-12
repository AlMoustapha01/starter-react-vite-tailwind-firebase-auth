import 'primereact/resources/themes/tailwind-light/theme.css';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from 'primereact/button';
import Good from '../../assets/images/checked.png';
import Bad from '../../assets/images/cancel.png';
import { Helmet } from 'react-helmet-async';


export default function Dashbord() {
  const { currentUser } = useAuth();
  const existed_provider = currentUser?.providerData.some((value)=> value.providerId.includes('facebook') || value.providerId.includes('github'));
  
  return (
    <>
      <Helmet>
        <title>Home page</title>
      </Helmet>
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center md:text-left">Starter react</h2>
        <div className="flex flex-col md:flex-row justify-center">
          <p className="text-6xl font-bold py-10 text-center">Bienvenue {currentUser?.displayName}</p>
          <p className='text-center'>
            {currentUser?.emailVerified || existed_provider ? (
              <Button tooltip='Email verifié' size="large" rounded text aria-label="Filter">
                <img src={Good} className="w-20" alt="" />
              </Button>
            ) : (
              <Button tooltip='Email non verifié. Veillez consulter votre boite mail'  size="large" rounded text aria-label="Filter">
                <img className="w-20" src={Bad} alt="" />
              </Button>
            )}
          </p>
        </div>
      </div>
    </>
  );
}
