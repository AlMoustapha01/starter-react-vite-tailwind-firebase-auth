import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import FingerPrint from '../../assets/images/fingerprint.png';
import { useNavigate } from 'react-router-dom';
import SocialSignin from '../../components/SocialSignin';
import { useI18nContext } from '../../i18n/i18n-react';
import { useAuth } from '../../contexts/AuthContext';
import { capitalizeWords } from '../../utils/auth';
import { useToast, EToastTypes } from '../../contexts/ToastContext';
import { Helmet } from 'react-helmet-async';

export default function SignUp() {
  const { signup } = useAuth();
  const { LL } = useI18nContext();
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(LL.sign_up.required({ field: LL.sign_up.name() })),
      email: Yup.string()
        .email(LL.sign_up.email_match_error())
        .required(LL.sign_up.required({ field: LL.sign_up.email() })),
      password: Yup.string()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/i, () => {
          return (
            <ul className="list-disc">
              <li>{LL.sign_up.password_match_minuscule()}</li>
              <li>{LL.sign_up.password_match_majuscule()}</li>
              <li>{LL.sign_up.password_match_number()}</li>
              <li>{LL.sign_up.password_match_length()}</li>
            </ul>
          );
        })
        .required(LL.sign_up.required({ field: LL.sign_up.password() })),
      confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), undefined], LL.sign_up.confirm_password_match())
        .required(LL.sign_up.required({ field: LL.sign_up.confirm_password() })),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form data', values);
      signup(values.email, values.password, capitalizeWords(values.name));

      setSubmitting(false);
    },
  });
  return (
    <>
      <Helmet>
        <title>Signup page</title>
      </Helmet>
      <section className="py-16">
        <div className="container px-4 mx-auto">
          <div className="relative max-w-lg mx-auto pt-16 pb-16 px-6 md:px-10 lg:px-16 bg-cyan-900 rounded-xl">
            <a className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" href="#">
              <img className="block w-24" src={FingerPrint} alt="" />
            </a>
            <div className="relative max-w-md mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl text-gray-100 font-semibold mb-2">{LL.sign_up.title()}</h2>
                <p className="text-gray-300 font-medium">{LL.sign_up.sub_title()}</p>
              </div>
              <SocialSignin />
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-white font-semibold">
                    {LL.sign_up.name()}
                  </label>
                  <InputText
                    type="text"
                    placeholder="name"
                    id="name"
                    className={`w-full text-white bg-transparent ${
                      formik.touched.name && formik.errors.name ? 'p-invalid' : ''
                    }`}
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-white font-semibold">
                    {LL.sign_up.email()}
                  </label>
                  <InputText
                    type="email"
                    placeholder="email"
                    id="email"
                    className={`w-full text-white bg-transparent ${
                      formik.touched.email && formik.errors.email ? 'p-invalid' : ''
                    }`}
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="password" className="text-white font-semibold">
                    {LL.sign_up.password()}
                  </label>
                  <Password
                    id="password"
                    inputClassName={`w-full text-white bg-transparent ${
                      formik.touched.password && formik.errors.password ? 'p-invalid' : ''
                    }`}
                    promptLabel="Entrer votre mot de passe"
                    weakLabel="Faible"
                    mediumLabel="Moyen"
                    strongLabel="Bon"
                    toggleMask
                    {...formik.getFieldProps('password')}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="confirm_password" className="text-white font-semibold">
                    {LL.sign_up.confirm_password()}
                  </label>
                  <Password
                    id="confirm_password"
                    inputClassName={`w-full text-white bg-transparent ${
                      formik.touched.confirm_password && formik.errors.confirm_password ? 'p-invalid' : ''
                    }`}
                    feedback={false}
                    {...formik.getFieldProps('confirm_password')}
                  />
                  {formik.touched.confirm_password && formik.errors.confirm_password ? (
                    <div className="text-red-500">{formik.errors.confirm_password}</div>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  className="block w-full py-4 my-4 leading-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
                >
                  {LL.sign_up.send()}
                </Button>
                <p className="font-medium text-center">
                  <span className="text-gray-300">{LL.sign_up.signin_message()}</span>
                  <Button
                    link
                    className="inline-block text-blue-500 hover:underline py-0"
                    onClick={() => navigation('/login')}
                  >
                    {LL.sign_up.signin_text()}
                  </Button>
                </p>
                <p className="font-medium text-center">
                  <Button
                    className="inline-block text-white hover:underline py-0"
                    link
                    onClick={() => navigation('/forgot-password')}
                  >
                    {LL.sign_up.forgot_password_message()}
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
