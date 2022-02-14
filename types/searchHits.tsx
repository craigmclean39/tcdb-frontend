interface Hit {
  id: string;
  type: string;
}

export default interface SearchHits {
  hits: Hit[];
}
