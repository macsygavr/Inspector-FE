import { RequestStatusEnum } from "../../RequestRow";

export const getStatusName = (status: RequestStatusEnum) => {
  switch (status) {
    case RequestStatusEnum.MODERATION:
      return "В обработке";

    case RequestStatusEnum.INPROGRESS:
      return "Объект проверяется";

    case RequestStatusEnum.COMPLETED:
      return "Успешно завершено";

    case RequestStatusEnum.REJECTED:
      return "Отклонено";

    default:
      return null;
  }
};
