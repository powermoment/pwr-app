// FYI: Hoho, function with smellcode, yea?
// Nope, its just for custom sizing
// Like value 1 = 1, but for 2 = 1.5
export const getDatumRadiusByValue = (value?: number) => {
  switch (value) {
    case 0:
      return 3;
    case 1:
      return 3.5;
    case 2:
      return 4;
    case 3:
      return 5.5;
    case 4:
      return 6;
    case 5:
      return 6.5;
    case 6:
      return 7;
    default:
      return 3;
  }
};
