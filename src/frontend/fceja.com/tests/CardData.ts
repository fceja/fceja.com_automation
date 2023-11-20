interface CardDataItem {
  imagePath: string;
  title: string;
  description: string;
  urlLink: string;
}

export const CardCarouselCardData: ReadonlyArray<CardDataItem> = Object.freeze([
  {
    imagePath: "assets/bingo.png",
    title: "fceja.com",
    description: "View the code repository for this webpage.",
    urlLink:
      "http://dev.client.google-maps.s3-website-us-west-1.amazonaws.com/",
  },
]);
