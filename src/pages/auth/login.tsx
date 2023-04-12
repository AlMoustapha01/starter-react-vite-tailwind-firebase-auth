import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import FingerPrint from '../../assets/images/fingerprint.png';
import SocialSignin from '../../components/SocialSignin';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useI18nContext } from '../../i18n/i18n-react';
import { useAuth } from '../../contexts/AuthContext';
import { FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const { login } = useAuth();
  const navigation = useNavigate();
  const {LL} = useI18nContext()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email(LL.sign_in.email_match_error()).required(LL.sign_in.required({field:LL.sign_in.email()})),
      password: Yup.string().required(LL.sign_in.required({field:LL.sign_in.email()})),
    }),
    
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form data', values);
      login(values.email,values.password);
      //navigation('/dashbord');
      setSubmitting(false);
    },
  });

  const preventDefaultSubmit = (e:FormEvent<HTMLFormElement> | undefined) => {
    e?.preventDefault(); // prevent default form submission
    formik.handleSubmit(); // run form submission
  };

  return (
    <>
      <Helmet>
        <title>Login page</title>
      </Helmet>
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="relative max-w-lg mx-auto pt-16 pb-16 px-6 md:px-10 lg:px-16 bg-cyan-900 rounded-xl">
            <a className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" href="#">
              <img className="block w-24" src={FingerPrint} alt="" />
            </a>
            <div className="relative max-w-md mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl text-gray-100 font-semibold mb-2">{LL.sign_in.title()}</h2>
                <p className="text-gray-300 font-medium">{LL.sign_in.sub_title()}</p>
              </div>
              <SocialSignin />
              <form onSubmit={preventDefaultSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-white font-semibold">
                  {LL.sign_in.email()}
                  </label>
                  <InputText
                    type="email"
                    placeholder="email"
                    id="email"
                    className={`w-full text-white bg-transparent ${formik.touched.email && formik.errors.email ?'p-invalid':''}`}
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
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
                  {LL.sign_in.send()}
                </Button>

                <p className="font-medium text-center">
                  <span className="text-gray-300">{LL.sign_in.signup_message()}</span>
                  <Button
                    className="inline-block text-blue-500 hover:underline py-0"
                    link
                    onClick={() => navigation('/signup')}
                  >
                   {LL.sign_in.signup_text()}
                  </Button>
                </p>
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
