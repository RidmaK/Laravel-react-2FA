import { forwardRef, TextareaHTMLAttributes } from 'react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    value?: string;
    placeholder?: string;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
    const { label, value, placeholder, ...rest } = props;

    return (
        <div className="input-container">
            {label && <label>{label}</label>}
            <textarea ref={ref} placeholder={placeholder} {...rest} rows="10" value={value}></textarea>
        </div>
    );
});

export default TextArea;
export type { TextAreaProps };
