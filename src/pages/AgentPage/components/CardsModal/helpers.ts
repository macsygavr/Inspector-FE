export const getCardsModalTitle = (value?: string) => {
  const lastNumber = value?.slice(-1);
  const lastTwoNumbers = value?.slice(-2);

  switch (lastTwoNumbers) {
    case "11":
    case "12":
    case "13":
    case "14":
      return `${value} объектов`;
  }

  switch (lastNumber) {
    case "0":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return `${value} объектов`;

    case "1":
      return `${value} объект`;

    case "2":
    case "3":
    case "4":
      return `${value} объекта`;

    default:
      return "";
  }
};
