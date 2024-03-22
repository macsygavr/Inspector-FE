export const getErrorDescription = (errorCode: number) => {
  switch (errorCode) {
    case 4:
      return "Отчёт на этот объект уже существует"

    case 6:
      return "Некорректная ссылка"
  
    default:
      return `Внутренняя ошибка (${errorCode}), попробуйте позже`
  }
}
