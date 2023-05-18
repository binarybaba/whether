export const formatTemperature = (
  floatingPoint: number | undefined
): string => {
  if (floatingPoint === undefined) return "";
  const parsed = parseInt(String(floatingPoint));
  if (isNaN(parsed)) {
    return "";
  }
  return `${parsed}°`;
};
