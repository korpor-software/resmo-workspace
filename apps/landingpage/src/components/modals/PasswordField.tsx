import { useState } from 'react';

interface PasswordFieldProps {
  label?: string;
  placeholder?: string;
}

export default function PasswordField({ label = 'Password', placeholder = '••••••••' }: PasswordFieldProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="field">
      <label>{label}</label>
      <div className="input-icon-wrap">
        <span className="ico">🔒</span>
        <input type={show ? 'text' : 'password'} placeholder={placeholder} />
        <span className="eye" onClick={() => setShow(prev => !prev)}>👁</span>
      </div>
    </div>
  );
}
