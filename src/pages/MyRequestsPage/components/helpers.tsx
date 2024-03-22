import { RequestStatusEnum } from "./MyRequests/components/RequestRow/RequestRow";

export const transformStatusToEnum = (statusNum: number) => {
  switch (statusNum) {
    case 0:
      return RequestStatusEnum.MODERATION;

    case 1:
      return RequestStatusEnum.INPROGRESS;

    case 2:
      return RequestStatusEnum.COMPLETED;

    default:
      return RequestStatusEnum.REJECTED;
  }
};
