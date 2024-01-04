export const handleOnlyAlphanumerical = (value: string) => {
  const regex = /^[a-zA-Z0-9 ]*$/;

  return regex.test(value);
};

export const handleOnlyText = (value: string) => {
  const regex = /^[a-zA-Z ]+$/;

  return regex.test(value);
};

export const numberParser = (value: number) => {
  const valueStr = value.toString();

  if (!valueStr) return 0;

  return !valueStr.includes(".") && valueStr.split(".")?.[1]?.length >= 2
    ? valueStr.replace(/\$\s?|(,*)/g, "")
    : parseFloat(valueStr.split(",").join("")).toFixed(2);
};

export const handlePhoneNumberValidation = (value: string) => {
  const phoneNumberRegex = /^\+[1-9]\d{1,14}$/;
  return phoneNumberRegex.test(value);
};

export const validateStringNumber = (value: string) => {
  const phoneNumberRegex = /^\+?\d{1,14}$/;
  return phoneNumberRegex.test(value);
};
