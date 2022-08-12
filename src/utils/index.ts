import axios from 'axios';

export const isMobileDevice = /android|iphone|kindle|ipad/i.test(navigator.userAgent);

export const filterByTitle = (item: { title: string }, searchValue: string) =>
  item.title.toLowerCase().includes(searchValue.toLowerCase());

export async function tryCatch(cb: Function, fin?: Function) {
  try {
    return await cb();
  } catch (e) {
    if (e instanceof TypeError) {
      console.warn(e.message);
    } else if (e instanceof RangeError) {
      console.warn(e.message);
    } else if (e instanceof EvalError) {
      console.warn(e.message);
    } else if (typeof e === 'string') {
      console.warn(e);
    } else if (axios.isAxiosError(e)) {
      console.warn(`${e.code}: ${e.message}`);
    } else {
      console.warn(e);
    }
    return e;
  } finally {
    if (fin) await fin();
  }
}
