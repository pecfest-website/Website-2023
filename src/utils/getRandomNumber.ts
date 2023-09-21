export function getNumberWithDecimalPlaces(num: number, decimalPlaces: number) {
    const power = 10 ** decimalPlaces;
    return Math.floor(num * power) / power;
  }
  
  type GetRandomNumberOptions = {
    /**
     * The number of digits to appear after the decimal point.
     * https://ell.stackexchange.com/q/141863
     */
    decimalPlaces?: number;
  };
  
  // min included, max excluded
  export function getRandomFloat(min: number, max: number, options: GetRandomNumberOptions = {}) {
    const { decimalPlaces } = options;
  
    const num = Math.random() * (max - min) + min;
  
    if (decimalPlaces === undefined) {
      return num;
    }
  
    return getNumberWithDecimalPlaces(num, decimalPlaces);
  }
  
  // min/max included
  export function getRandomInt(min: number, max: number) {
    // https://stackoverflow.com/a/7228322
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }