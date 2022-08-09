export const isMobileDevice = /android|iphone|kindle|ipad/i.test(navigator.userAgent);
export const filterByTitle = (item: { title: string }, searchValue: string) =>
  item.title.toLowerCase().includes(searchValue.toLowerCase());
