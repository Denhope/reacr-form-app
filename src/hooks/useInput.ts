import { ChangeEvent, useState } from 'react';
import { useValidation } from './useValidation';

export const useInput = (initialValue: string, validations: {}) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);

  const onChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.currentTarget.value);
  };
  const onBlur = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setDirty(true);
  };
  return { value, onChange, onBlur, isDirty, ...valid };
};
