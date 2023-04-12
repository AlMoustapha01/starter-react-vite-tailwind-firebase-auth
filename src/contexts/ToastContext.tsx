import React, { useContext, useRef } from 'react';
import { Toast, ToastMessage } from 'primereact/toast';

interface IToastProviderProps {
  children: JSX.Element;
}

interface IToastContext {
  showToast:(message: ToastMessage | ToastMessage[]) => void
}
const ToastContext = React.createContext<IToastContext>({
  showToast: () => {},
});

export function useToast(): IToastContext {
  return useContext(ToastContext);
}

export enum EToastTypes {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export function ToastProvider({ children }: IToastProviderProps): JSX.Element {
  const toast_ref = useRef<Toast>(null);
  const showToast = (message: ToastMessage | ToastMessage[]) => {
    toast_ref.current?.show(message);
  };

  

 

  const value = {
    showToast,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast ref={toast_ref} />
      {children}
    </ToastContext.Provider>
  );
}
