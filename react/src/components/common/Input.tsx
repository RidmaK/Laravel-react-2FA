import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, value, ...rest } = props;

  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input ref={ref} {...rest} value={value} />
    </div>
  );
});

export default Input;
export type { InputProps };
