import {ChangeEvent, useState, KeyboardEvent} from "react";

type Props = {
    index: number,
    getValue: (value: string, index: number) => void
}

export function Input({index, getValue}: Props) {
    const [value, setValue] = useState<string>('');

    function checkValue(event: ChangeEvent<HTMLInputElement>) {
        const currentValue = event.currentTarget.value.slice(-1);
        if (!/^\d$/.test(currentValue)) return; // Ensure only digits are processed
        setValue(currentValue);
        getValue(currentValue, index);

        const nextElement = event.currentTarget.nextSibling;
        if (nextElement instanceof HTMLInputElement) {
            nextElement.disabled = false;
            nextElement.focus();
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        // Allow only numeric keys, backspace, and delete
        if (!/^[\d\b]$/.test(event.key)) {
            event.preventDefault();
        }
    }

    function handleInput(event: ChangeEvent<HTMLInputElement>) {
        // Filter non-numeric characters
        const filteredValue = event.currentTarget.value.replace(/\D/g, '');
        event.currentTarget.value = filteredValue;
    }

    return (
        <input
            value={value}
            disabled={index > 0}
            onChange={checkValue}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            className="otp-inputs"
            type="text"
        />
    )
}
