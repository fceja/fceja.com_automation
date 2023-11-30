export type CardDataType = readonly CardPropsType[];
export type CardImagePropsType = WebLinksType;
export type WebLinksPropsType = WebLinksType;

export type CardDataArrayProps = {
  cardsData: readonly CardPropsType[];
};

export type CardPropsType = {
  cardDetails: CardDetailsPropsType;
  index: number | null;
  webLinks: WebLinksType;
};

export type CardDetailsPropsType = {
  title: string;
  description: string;
  listSections: ListSectionType[];
};

type ListSectionType = {
  title: string;
  listItems: string[];
};

type WebLinksType = {
  gitHubLink: string;
  imageUrl: string | null;
  urlLink: string | null;
};
