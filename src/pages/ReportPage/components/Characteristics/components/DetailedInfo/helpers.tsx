export const getFinishingDescription = (renovationId?: number) => {
  switch (renovationId) {
    case 1:
      return "Евроремонт";

    case 2:
      return "Чистовая";

    case 3:
      return "Дизайнерская";

    case 4:
      return "Требуется ремонт";

    default:
      return "-";
  }
};

export const getTypeOfLayoutDescription = (typeId?: number) => {
  switch (typeId) {
    case 1:
      return "Изолированная";

    case 2:
      return "Смежная";

    case 3:
      return "Смежно-изолированная";

    case 4:
      return "Свободная";

    default:
      return "-";
  }
};

export const getWindowViewDescription = (viewId?: number) => {
  switch (viewId) {
    case 1:
      return "На улицу";

    case 2:
      return "Во двор";

    case 3:
      return "Во двор и на улицу";

    default:
      return "-";
  }
};

export const getHouseTypeDescription = (typeId?: number) => {
  switch (typeId) {
    case 1:
      return "Блочный";

    case 2:
      return "Деревянный";

    case 3:
      return "Кирпичный";

    case 4:
      return "Монолитно-кирпичный";

    case 5:
      return "Монолитный";

    case 6:
      return "Панельный";

    default:
      return "-";
  }
};

export const getObjectTypeDescription = (typeId?: number) => {
  switch (typeId) {
    case 1:
      return "Квартира";

    case 2:
      return "Апартаменты";

    default:
      return "-";
  }
};
