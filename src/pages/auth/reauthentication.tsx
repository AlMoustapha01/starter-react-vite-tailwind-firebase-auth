import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import FingerPrint from '../../assets/images/fingerprint.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useI18nContext } from '../../i18n/i18n-react';
import { useAuth } from '../../contexts/AuthContext';
import { FormEvent } from 'react';

export default function ReAuthentication() {
  const { reAuthenticate, updateEmail,currentUser } = useAuth();
  const [ params ] = useSearchParams();
  const operation = params.get('operation');
  const new_email = params.get('new_email')
  const navigation = useNavigate();
  const { LL } = useI18nContext();
  console.log(currentUser?.providerData);
  const formik = useFormik({
    initialValues: {
      password: '',
    },
    validationSchema: Yup.object({
      
      password: Yup.string().required(LL.sign_in.required({ field: LL.sign_in.email() })),
    }),

    onSubmit: (values, { setSubmitting }) => {
      console.log('Form data', values);
      console.log(operation);
      console.log(new_email);
      reAuthenticate(values.password).then(() => {
        console.log(operation);
        console.log(new_email);
        if (operation && operation == 'email') {
          if (new_email) {
            updateEmail(new_email).then(()=>{navigation(-1)});
          }
        }
        if (operation &&( operation == 'password' || operation=="delete_count")) {
            navigation(-1);
          }
      });
      //navigation(-1);
      setSubmitting(false);
    },
  });

  const preventDefaultSubmit = (e: FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault(); // prevent default form submission
    formik.handleSubmit(); // run form submission
  };

  return (
    <>
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="relative max-w-lg mx-auto pt-16 pb-16 px-6 md:px-10 lg:px-16 bg-cyan-900 rounded-xl">
            <a className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" href="#">
              <img className="block w-24" src={FingerPrint} alt="" />
            </a>
            <div className="relative max-w-md mx-auto">
             
              <form onSubmit={preventDefaultSubmit}>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-white font-semibold">
                    {LL.sign_in.password()}
                  </label>
                  <Password
                    id="password"
                    inputClassName="w-full bg-transparent text-white"
                    feedback={false}
                    toggleMask
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                </div>

                <Button
                  type="submit"
                  className="block w-full py-4 my-4 leading-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
                  disabled={formik.isSubmitting}
                >
                  {LL.profile.confirm()}
                </Button>

                <p className="font-medium text-center">
                  <Button
                    className="inline-block text-white hover:underline py-0"
                    link
                    onClick={() => navigation('/forgot-password')}
                  >
                    {LL.sign_in.forgot_password_message()}
                  </Button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
