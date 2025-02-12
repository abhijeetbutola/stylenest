// Utility function to determine if a color is light or dark based on rgb() format
export const isColorLight = (rgbColor: string) => {
  const rgbValues = rgbColor.match(/\d+/g); // Extract the RGB values
  if (!rgbValues) return false; // Fallback in case color string is invalid

  const r = parseInt(rgbValues[0], 10);
  const g = parseInt(rgbValues[1], 10);
  const b = parseInt(rgbValues[2], 10);

  // Calculate brightness using luminance formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 150; // Consider a threshold for light colors
};
