export const capitalizeWords = (str: string): string => {
    return str.replace(/\b\w/g, (match) => {
      return match.toUpperCase();
    });
}

