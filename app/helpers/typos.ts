export const getMoodLabelByValue = (value: number) => {
  switch (value) {
    case 0:
      return "Ужасное";
    case 1:
      return "Плохое";
    case 2:
      return "Не очень";
    case 3:
      return "Нормальное";
    case 4:
      return "Хорошее";
    case 5:
      return "Отличное";
    case 6:
      return "Прекрасное";
    default:
      return "Не удалось определить";
  }
};
