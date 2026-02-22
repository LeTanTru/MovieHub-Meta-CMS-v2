export const getLastWord = (text: string): string => {
  const words = text.trim().split(/\s+/);
  return words[words.length - 1] || '';
};
