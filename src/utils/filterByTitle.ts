const filterByTitle = (item: { title: string }, searchValue: string) =>
  item.title.toLowerCase().includes(searchValue.toLowerCase());

export { filterByTitle };
