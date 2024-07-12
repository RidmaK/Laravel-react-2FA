import { ButtonHTMLAttributes, FC } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  btn: string;
}

const Button: FC<ButtonProps> = ({ label, btn, className, ...rest }) => {
  return (
    <button
      {...rest}
      className={`btn ${btn} ${className || ''}`}
    >
      {label}
    </button>
  );
};

export default Button;
