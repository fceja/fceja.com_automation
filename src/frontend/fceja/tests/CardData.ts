interface CardDataItem {
  imagePath: string;
  title: string;
  description: string;
  urlLink: string;
}

export const CardCarouselCardData: ReadonlyArray<CardDataItem> = Object.freeze([
  {
    imagePath: "assets/bingo.png",
    title: "Bingo Card Game",
    description:
      "Imatation of card game, where game is won by selecting a predetermined pattern.",
    urlLink: "https://github.com/fceja/bingo_game",
  },
  {
    imagePath: "assets/orange.png",
    title: "Test - Orange",
    description: "Test - Orange Description.",
    urlLink: "http://localhost:3000",
  },
]);
