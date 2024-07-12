import { forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { label, ...rest } = props;

  return (
    <div className="input-container">
      {label && <label>{label}</label>}
      <input ref={ref} {...rest} />
    </div>
  );
});

export default Input;
export type { InputProps };
