export interface Podcast {
  _id: string;
  title: string;

  //optional
  description?: string;
  link?: string;
  language?: string;
  copyright?: string;
  source?: string;
  url?: string;
  image?: PodcastImage;
  episodes?: Episode[];
  author?: string;
  email?: string;
  ownerName?: string;
  categories?: string[];
}

export interface PodcastImage {
  url: string;
  title?: string;
}

export interface Episode {
  title: string;
  guid: string;

  //Optional
  link?: string;
  content?: string;
  contentSnippet?: string;
  pubDate?: string;
  isoDate?: string;
  duration?: string;
  season?: number;
}
