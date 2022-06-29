// Palette from Ant.d
// https://ant.design/docs/spec/colors
export const getMoodColorByValue = (value?: number) => {
  switch (value) {
    case 0:
      return "#9254de";
    case 1:
      return "#f759ab";
    case 2:
      return "#ff4d4f";
    case 3:
      // PowerMoment primary color
      return "#E6C37D";
    case 4:
      return "#40a9ff";
    case 5:
      return "#36cfc9";
    case 6:
      return "#73d13d";
    default:
      // Like at 0 value
      return "#9254de";
  }
};
