export interface Journal {
  id: number;
  title: string;
  content: string | null;
  quoteId: number;
  quote: Quote;
  createdAt: Date;
}

export interface Quote {
  id: number;
  content: string;
  journal: Journal;
}

export interface PostArg extends Pick<Journal, "title" | "content"> {
  quote: { content: string };
}
export type PatchArg = Pick<Journal, "title" | "content" | "id">;
