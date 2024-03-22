export const splitByThreeDigits = (value?: string) =>
  value? value.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : "-";

export const removeNonDigits = (value: string) => value.replace(/[^0-9]/g, "");
