
// Skriver ut felmeddelanden
export const onError = 
  (err: any): void => {
  console.error(err.message);
}

// Kollar om en text innehåller ett angivet sökord
export const foundPhrase = (
  phrase: string, 
  search: string): boolean => {
  const text = phrase
    .toLowerCase();
  const keyword = search.
    toLowerCase();
  return text
    .includes(keyword);
}
