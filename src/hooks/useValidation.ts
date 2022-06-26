import { useEffect, useState } from 'react';

export const useValidation = (value: any, validations: any) => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [minLengthError, setMinLengthError] = useState<boolean>(false);
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [isNameTypeError, setNameTypeError] = useState<boolean>(false);
  const [isEmailTypeError, setEmailTypeError] = useState<boolean>(false);
  const [isTelTypeError, setTelTypeError] = useState<boolean>(false);
  const [inputValid, setInputValidError] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;

        case 'minLength':
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case 'isName':
          const resName = /^([a-zA-Z]{3,})+\s{1}([a-zA-Z]{3,})+$/i;
          resName.test(String(value).toLocaleLowerCase())
            ? setNameTypeError(false)
            : setNameTypeError(true);
          break;
        case 'isEmailType':
          const resEmail = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/i;
          resEmail.test(String(value).toLocaleLowerCase())
            ? setEmailTypeError(false)
            : setEmailTypeError(true);
          break;
        case 'isTelType':
          const resTel = /^\d{3}\d{3}\d{2}\d{2}$/i;
          resTel.test(String(value).toLocaleLowerCase())
            ? setTelTypeError(false)
            : setTelTypeError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      isEmpty ||
      maxLengthError ||
      minLengthError ||
      isNameTypeError ||
      isEmailTypeError ||
      isTelTypeError
    ) {
      setInputValidError(false);
    } else {
      setInputValidError(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, isNameTypeError, isEmailTypeError, isTelTypeError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isNameTypeError,
    isEmailTypeError,
    isTelTypeError,
    inputValid,
  };
};
