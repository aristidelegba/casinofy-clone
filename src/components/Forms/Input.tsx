import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler } from "react";

interface IInputProps {
  min?: number
  max?: number
  type: "text" | "number" | string;
  value: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  [key: string]: unknown;
}

const Input: React.FC<IInputProps> = ({ type = "text", onChange = () => { }, value, min = 0, max = Infinity, ...props }) => {
  function onChangeInternal(e: ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value)
    if (type === 'number') {
      if (value < min || value > max) {
        e.preventDefault()
        return
      }
      onChange(e)

    } else {
      onChange(e)
    }

  }

  return <input className="p-2 border-2 border-black rounded-sm" type={type} onChange={onChangeInternal} value={value} />;
};

export default Input;
