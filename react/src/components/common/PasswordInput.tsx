import { forwardRef } from 'react';
import Input, { InputProps } from './Input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface PasswordInputProps extends InputProps {
  showPassword: boolean;
  onTogglePasswordVisibility: () => void;
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showPassword, onTogglePasswordVisibility, ...rest }, ref) => {
    return (
      <div className="password-input-container">
        <Input ref={ref} {...rest} type={showPassword ? 'text' : 'password'} />
        <button
          type="button"
          className="password-toggle-btn"
          onClick={onTogglePasswordVisibility}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
    );
  }
);

export default PasswordInput;
