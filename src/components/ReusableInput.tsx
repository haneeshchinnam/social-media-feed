import React, { FC, useEffect, useState } from 'react';

interface ReusableInputProps {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  validate?: (value: string) => string;
  val?: string;
}

const ReusableInput: FC<ReusableInputProps> = ({
  type,
  label,
  name,
  placeholder = '',
  validate,
  val,
}) => {
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if(val) {
      setValue(val)
    }
  }, [val])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    if (validate) {
      const errorMessage = validate(inputValue);
      setError(errorMessage);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block font-semibold text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`w-full p-2 mt-1 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default ReusableInput;
