export interface Podcast {
  _id: string;
  title: string;
  description?: string;
  link?: string;
  language?: string;
  copyright?: string;
  source?: string;
  url?: string;
  image?: PodcastImage;
  episodes?: Episode[];
}

export interface PodcastImage {
  url: string;
  title?: string;
}

export interface Episode {
  title: string;
  link?: string;
  content?: string;
  contentSnippet?: string;
  guid: string;
  pubDate?: string;
  isoDate?: string;
}
