export const getMoodLabelByValue = (value: number) => {
  switch (value) {
    case 0:
      return "Ужасно :(";
    case 1:
      return "Плохо";
    case 2:
      return "Ничего не делаю";
    case 3:
      return "Нормально";
    case 4:
      return "Хорошо";
    case 5:
      return "Весь в делах!";
    case 6:
      return "Прекрасно";
    default:
      return "Не удалось определить";
  }
};
