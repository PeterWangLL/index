export type GameItem = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  borderColor: string;
  gradient: string;
  wide: boolean;
  aspectClass: string;
};

export const gameItems: GameItem[] = [
  {
    id: "hearthstone",
    title: "炉石传说",
    subtitle: "酒馆战棋",
    image: "/images/games/炉石传说-酒馆战棋.jpg",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(145deg, #F59E0B, #1a150f)",
    wide: true,
    aspectClass: "aspect-[5/4]",
  },
  {
    id: "civ6-portrait",
    title: "文明6",
    image: "/images/games/文明6竖屏.jpg",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(145deg, #06B6D4, #0f1a1a)",
    wide: false,
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "slay-the-spire",
    title: "杀戮尖塔",
    image: "/images/games/杀戮尖塔.jpg",
    borderColor: "#B83B5E",
    gradient: "linear-gradient(145deg, #B83B5E, #1a0f1a)",
    wide: false,
    aspectClass: "aspect-[16/9]",
  },
  {
    id: "hades-3",
    title: "哈迪斯",
    image: "/images/games/哈迪斯3.jpg",
    borderColor: "#EF4444",
    gradient: "linear-gradient(145deg, #EF4444, #1a0f0f)",
    wide: false,
    aspectClass: "aspect-[16/9]",
  },
  {
    id: "brawl-stars-2",
    title: "荒野乱斗",
    image: "/images/games/荒野乱斗2.jpg",
    borderColor: "#F9ED69",
    gradient: "linear-gradient(145deg, #F9ED69, #1a1910)",
    wide: true,
    aspectClass: "aspect-[16/9]",
  },
  {
    id: "clash-royale-2",
    title: "皇室战争",
    image: "/images/games/皇室战争2.jpg",
    borderColor: "#F08A5D",
    gradient: "linear-gradient(145deg, #F08A5D, #1a1210)",
    wide: false,
    aspectClass: "aspect-[3/4]",
  },
];
