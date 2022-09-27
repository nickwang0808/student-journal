export interface Journal {
  id: number;
  title: string;
  content: string | null;
  quoteId: number;
  quote: Quote;
  creationDate: Date;
  updatedOn: Date;
}

export interface Quote {
  id: number;
  content: string;
  journal: Journal;
}

export type PostArg = Pick<Journal, "title" | "content" | "quote">;
export type PatchArg = Pick<Journal, "title" | "content" | "id">;
