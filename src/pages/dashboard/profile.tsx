import { useAuth } from '../../contexts/AuthContext';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Fieldset } from 'primereact/fieldset';
import * as Yup from 'yup';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

import ProfileImage from '../../assets/images/bussiness-man.png';
import Icon from '../../assets/images/binary-code.png';

import { useFormik } from 'formik';
import { useI18nContext } from '../../i18n/i18n-react';
import { Password } from 'primereact/password';
import InputTextEditable from '../../components/InputTextEditable';
import { Helmet, HelmetData } from 'react-helmet-async';

export default function Profile() {
  const { currentUser, updateName, updateEmail, updatePhone, updateUserPassword, deleteCount } = useAuth();
  const { LL } = useI18nContext();

  const legendTemplate = (
    <div className="flex items-center">
      <span className="pi pi-user mr-2"></span>
      <span className="font-bold text-lg">Informations</span>
    </div>
  );
  const passwordTemplate = (
    <div className="flex items-center">
      <span className="pi pi-key mr-2"></span>
      <span className="font-bold text-lg">Changer le mot de passe</span>
    </div>
  );

  const formik = useFormik({
    initialValues: {
      name: currentUser?.displayName || '',
      email: currentUser?.email || '',
      phone_number: currentUser?.phoneNumber || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(LL.profile.required({ field: LL.profile.name() })),
      email: Yup.string()
        .email(LL.sign_in.email_match_error())
        .required(LL.profile.required({ field: LL.profile.name() })),
      phone_number: Yup.string().required(LL.profile.required({ field: LL.profile.phone() })),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log('Form data', values);
      setSubmitting(false);
    },
  });

  const formPassword = useFormik({
    initialValues: {
      password: '',
      confirm_password: '',
    },
    validationSchema: Yup.object({
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
      updateUserPassword(values.confirm_password);
      setSubmitting(false);
      formPassword.resetForm();
    },
  });
  const accept = async () => {
    await deleteCount();
  };
  const confirm = (event: any) => {
    confirmPopup({
      target: event.currentTarget,
      message: 'Voulez-vous vraiment continuer cette opération?',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept,
    });
  };

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <title>Profile page</title>
      </Helmet>
      <div className="grid container mx-auto content-center max-w-6xl">
        <h1 className="text-3xl text-center font-bold my-7">{LL.profile.title()}</h1>
        <div>
          <div className="flex items-center justify-between px-7 py-5">
            <div className="flex gap-4 justify-center items-center w-auto">
              <Avatar
                className="p-overlay-badge cursor-pointer"
                shape="circle"
                image={currentUser?.photoURL || ProfileImage}
                size="xlarge"
              ></Avatar>
              <p className="font-semibold">{currentUser?.displayName}</p>
            </div>
            <div className="w-auto">
              {/* <Button label={LL.profile.modify()} onClick={() => setDisabled(false)} /> */}
            </div>
          </div>
        </div>
        <div className="card">
          <Fieldset legend={legendTemplate}>
            <form>
              <div className="flex flex-col gap-2">
                <InputTextEditable
                  label={LL.profile.name()}
                  inputTextProps={{
                    type: 'text',
                    placeholder: 'name',
                    id: 'name',
                    className: 'w-full',
                    ...formik.getFieldProps('name'),
                  }}
                  onSubmit={() => updateName(formik.values.name)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <InputTextEditable
                  label={LL.profile.email()}
                  inputTextProps={{
                    type: 'email',
                    placeholder: 'email',
                    id: 'email',
                    className: 'w-full',
                    ...formik.getFieldProps('email'),
                  }}
                  onSubmit={() => updateEmail(formik.values.email)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <InputTextEditable
                  label={LL.profile.phone()}
                  inputTextProps={{
                    type: 'text',
                    placeholder: 'phone',
                    id: 'phone',
                    className: 'w-full',
                    ...formik.getFieldProps('phone_number'),
                  }}
                  onSubmit={() => updatePhone(formik.values.phone_number)}
                />
                <div id="recaptcha-container" className="recaptcha-container"></div>
              </div>
            </form>
          </Fieldset>
        </div>
        <div className="card">
          <Fieldset legend={passwordTemplate}>
            <form onSubmit={formPassword.handleSubmit}>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className=" font-semibold">
                  {LL.sign_up.password()}
                </label>
                <Password
                  inputClassName={`w-full ${
                    formPassword.touched.password && formPassword.errors.password ? 'p-invalid' : ''
                  }`}
                  promptLabel="Entrer votre mot de passe"
                  weakLabel="Faible"
                  mediumLabel="Moyen"
                  strongLabel="Bon"
                  id="password"
                  placeholder="•••••••••••"
                  toggleMask
                  {...formPassword.getFieldProps('password')}
                />
                {formPassword.touched.password && formPassword.errors.password ? (
                  <div className="text-red-500">{formPassword.errors.password}</div>
                ) : null}
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="confirm_password" className=" font-semibold">
                  {LL.sign_up.confirm_password()}
                </label>
                <Password
                  id="confirm_password"
                  inputClassName={`w-full ${
                    formPassword.touched.confirm_password && formPassword.errors.confirm_password ? 'p-invalid' : ''
                  }`}
                  feedback={false}
                  {...formPassword.getFieldProps('confirm_password')}
                  placeholder="•••••••••••"
                  toggleMask
                />
                {formPassword.touched.confirm_password && formPassword.errors.confirm_password ? (
                  <div className="text-red-500">{formPassword.errors.confirm_password}</div>
                ) : null}
              </div>

              <Button
                type="submit"
                className="block w-full py-4 my-4 leading-6  font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200"
              >
                {LL.profile.send()}
              </Button>
            </form>
          </Fieldset>
        </div>
        <div className="card w-full flex justify-center items-center">
          <ConfirmPopup />
          <Button onClick={confirm} label="Supprimer mon compte" severity="danger" />
        </div>
      </div>
    </>
  );
}
