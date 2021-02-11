export const debounce = (fn, ms) => {
  let timeout;

  return function debounced(...args) {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => fn.apply(this, args), ms);
  };
};
