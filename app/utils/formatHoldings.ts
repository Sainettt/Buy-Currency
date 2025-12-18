export const formatHoldings = (num: number) => {
    const str = num.toString();
    if (str.length > 7) {
      return str.slice(0, 7).replace(/[.,]$/, '');
    }
    return str;
  };
