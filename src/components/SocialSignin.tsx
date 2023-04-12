import { Button } from 'primereact/button';
import Google from '../assets/images/google.png';
import Github from '../assets/images/github.png';
import Facebook from '../assets/images/facebook.png';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SocialSignin() {
  const {googleSignin,facebookSignin,githubSignin} = useAuth();
  const navigation = useNavigate();
  const googleAuth = ()=>{
    googleSignin().then(()=>{
      navigation('/dashbord');
    });
  }
  const facebookAuth = ()=>{
    facebookSignin().then(()=>{
      navigation('/dashbord');
    });
  }
  const githubAuth = ()=>{
    githubSignin().then(()=>{
      navigation('/dashbord');
    });
  }
  return (
    <>
      <div className="flex justify-between">
        <Button className=" hover:bg-cyan-900 border-slate-700" text raised onClick={()=> googleAuth()}>
          <img alt="Google" src={Google} className="w-14"></img>
        </Button>
        <Button className="bg-slate-800 hover:bg-cyan-900 border-slate-700" text raised onClick={()=> facebookAuth()}>
          <img alt="Facebook" src={Facebook} className="w-14"></img>
        </Button>
        <Button className="bg-slate-800 hover:bg-cyan-900 border-slate-700" text raised onClick={()=> githubAuth()}>
          <img alt="Github" src={Github} className="w-14"></img>
        </Button>
      </div>
    </>
  );
}
