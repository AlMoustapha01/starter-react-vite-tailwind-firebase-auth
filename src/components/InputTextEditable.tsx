import { Button } from 'primereact/button';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { useState } from 'react';
import {FieldInputProps} from "formik"
interface IInputTextProps {
  label: string;
  inputTextProps?: InputTextProps;
  onSubmit: ()=> void
}
export default function InputTextEditable({ label, inputTextProps,onSubmit }: IInputTextProps) {
  const [disabled, setDisabled] = useState(true);
  
  return (
    <>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold">
          {label}
        </label>
        <div className="flex gap-2">
          <InputText {...inputTextProps} readOnly={disabled} />
          {disabled ? (
            <Button icon="pi pi-pencil" onClick={() => setDisabled(false)} />
          ) : (
            <div className='flex gap-2'>
              <Button icon="pi pi-check" onClick={()=>{onSubmit();setDisabled(true)}} />
              <Button icon="pi pi-times" severity='danger' onClick={() => setDisabled(true)} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
