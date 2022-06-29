// FYI: Hoho, function with smellcode, yea?
// Nope, its just for custom sizing
// Like value 1 = 1, but for 2 = 1.5
export const getDatumRadiusByValue = (value?: number) => {
  switch (value) {
    case 0:
      return 5;
    case 1:
      return 6;
    case 2:
      return 7;
    case 3:
      return 8;
    case 4:
      return 9;
    case 5:
      return 10;
    case 6:
      return 11;
    default:
      return 5;
  }
};
