import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useI18nContext } from '../../i18n/i18n-react';
import FingerPrint from '../../assets/images/fingerprint.png';
import { useAuth } from '../../contexts/AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const { LL } = useI18nContext();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(LL.sign_in.email_match_error())
        .required(LL.sign_in.required({ field: LL.sign_in.email() })),
    }),

    onSubmit: (values, { setSubmitting }) => {
      console.log('Form data', values);
      resetPassword(values.email);
      //navigation('/dashbord');
      setSubmitting(false);
    },
  });
  return (
    <>
      <section className="py-36">
        <div className="container px-4 mx-auto">
          <div className="relative max-w-lg mx-auto pt-16 pb-16 px-6 md:px-10 lg:px-16 bg-cyan-900 rounded-xl">
            <a className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2" href="#">
              <img className="block w-24" src={FingerPrint} alt="" />
            </a>
            <div className="relative max-w-md mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-2xl text-gray-100 font-semibold mb-2">Reset your password</h2>
                <p className="text-gray-300 font-medium">And go verify your email box</p>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-white font-semibold">
                    Email
                  </label>
                  <InputText type="email" placeholder="email" id="email" className={`w-full text-white bg-transparent ${formik.touched.email && formik.errors.email ?'p-invalid':''}`} {...formik.getFieldProps('email')} />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>

                <div className="flex justify-center text-center">
                  <Button type='submit' className="block w-full py-4 my-4 leading-6 text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200">
                    Reset password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
