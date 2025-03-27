
export type AnyCallbackFunc = (...args: any[]) => any;

export const debounce = <F extends AnyCallbackFunc>(
  fn: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args: Parameters<F>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

export const getStoredCities = () => {
  const cities = localStorage.getItem("savedCities");
  return cities ? JSON.parse(cities) : [];
};