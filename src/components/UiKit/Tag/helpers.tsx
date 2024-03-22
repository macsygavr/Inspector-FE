export const getTagCountText = (count?: number) => {
  switch (count) {
    case 1:
      return "проблема"

    case 2:
    case 3:
    case 4:
      return "проблемы"

    case 5:
    case 6:
    case 7:
      return "проблем"
  
    default:
      return "";
  }
}
