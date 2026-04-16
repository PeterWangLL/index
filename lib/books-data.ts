export type Book = {
  slug: string;
  title: string;
  author: string;
  summary?: string;
  content?: string;
  hasCover: boolean;
  cover?: string;
  isFavorite: boolean;
  genres: string[];
};

export const readingTimeStats = [
  { year: 2022, hours: 129, minutes: 6 },
  { year: 2023, hours: 322, minutes: 31 },
  { year: 2024, hours: 318, minutes: 41 },
  { year: 2025, hours: 357, minutes: 34 },
  { year: 2026, hours: 107, minutes: 0 },
];

export const generalStats = [
  { value: 100, label: "读完的书" },
  { value: 1274, label: "阅读天数" },
  { value: 1235, label: "总阅读时长（小时）" },
];

export const genreStats = [
  { label: "影视原著", count: 602 },
  { label: "社会小说", count: 189 },
  { label: "文学", count: 288 },
  { label: "科幻小说", count: 228 },
  { label: "玄幻小说", count: 137 },
  { label: "悬疑推理", count: 135 },
  { label: "历史", count: 132 },
  { label: "年代小说", count: 125 },
];

const availableCovers = new Set([
  "信",
  "三体",
  "绝叫",
  "偷书贼",
  "平面国",
  "悉达多",
  "白夜行",
  "白鹿原",
  "一地鸡毛",
  "人生复本",
  "人类灭绝",
  "动物农场",
  "小巷人家",
  "我与地坛",
  "挽救计划",
  "旅行之木",
  "沧浪之水",
  "火星救援",
  "生死疲劳",
  "百年孤独",
  "银河帝国",
  "大明王朝1566",
  "凡人修仙传",
  "安德的游戏",
  "平凡的世界",
  "美顺与长生",
  "解忧杂货铺",
  "一句顶一万句",
  "我不是潘金莲",
  "撒哈拉的故事",
  "明朝那些事儿",
  "一百个人的十年",
  "太白金星有点烦",
]);

function coverFor(title: string): Pick<Book, "hasCover" | "cover"> {
  if (availableCovers.has(title)) {
    return { hasCover: true, cover: `/images/books/${title}.jpg` };
  }
  return { hasCover: false };
}

export const allBooks: Book[] = [
  // 30 本喜欢的书（从新到旧）
  { slug: "mei-shun-yu-chang-sheng", title: "美顺与长生", author: "毛建军", isFavorite: true, genres: ["文学"], ...coverFor("美顺与长生") },
  { slug: "wo-bu-shi-pan-jin-lian", title: "我不是潘金莲", author: "刘震云", isFavorite: true, genres: ["文学"], ...coverFor("我不是潘金莲") },
  { slug: "xiao-xiang-ren-jia", title: "小巷人家", author: "大米", isFavorite: true, genres: ["文学"], ...coverFor("小巷人家") },
  { slug: "da-ming-wang-chao-1566", title: "大明王朝1566", author: "刘和平", isFavorite: true, genres: ["历史", "文学"], ...coverFor("大明王朝1566") },
  { slug: "tai-bai-jin-xing-you-dian-fan", title: "太白金星有点烦", author: "马伯庸", isFavorite: true, genres: ["文学", "历史"], ...coverFor("太白金星有点烦") },
  { slug: "cang-lang-zhi-shui", title: "沧浪之水", author: "阎真", isFavorite: true, genres: ["文学"], ...coverFor("沧浪之水") },
  { slug: "huo-xing-jiu-yuan", title: "火星救援", author: "安迪·威尔", isFavorite: true, genres: ["科幻"], ...coverFor("火星救援") },
  { slug: "xin", title: "信", author: "东野圭吾", isFavorite: true, genres: ["悬疑"], ...coverFor("信") },
  { slug: "bai-lu-yuan", title: "白鹿原", author: "陈忠实", isFavorite: true, genres: ["文学"], ...coverFor("白鹿原") },
  { slug: "yi-bai-ge-ren-de-shi-nian", title: "一百个人的十年", author: "冯骥才", isFavorite: true, genres: ["历史", "文学"], ...coverFor("一百个人的十年") },
  { slug: "tou-shu-zei", title: "偷书贼", author: "马克斯·苏萨克", isFavorite: true, genres: ["文学", "历史"], ...coverFor("偷书贼") },
  { slug: "dong-wu-nong-chang", title: "动物农场", author: "乔治·奥威尔", isFavorite: true, genres: ["文学"], ...coverFor("动物农场") },
  { slug: "ping-fan-de-shi-jie", title: "平凡的世界", author: "路遥", isFavorite: true, genres: ["文学"], ...coverFor("平凡的世界") },
  { slug: "ping-mian-guo", title: "平面国", author: "埃德温·A·艾勃特", isFavorite: true, genres: ["科幻"], ...coverFor("平面国") },
  { slug: "bai-nian-gu-du", title: "百年孤独", author: "加西亚·马尔克斯", isFavorite: true, genres: ["文学"], ...coverFor("百年孤独") },
  { slug: "lv-xing-zhi-mu", title: "旅行之木", author: "星野道夫", isFavorite: true, genres: ["散文"], ...coverFor("旅行之木") },
  { slug: "xi-da-duo", title: "悉达多", author: "赫尔曼·黑塞", isFavorite: true, genres: ["文学", "社科"], ...coverFor("悉达多") },
  { slug: "san-ti", title: "三体", author: "刘慈欣", isFavorite: true, genres: ["科幻"], ...coverFor("三体") },
  { slug: "sheng-si-pi-lao", title: "生死疲劳", author: "莫言", isFavorite: true, genres: ["文学"], ...coverFor("生死疲劳") },
  { slug: "yin-he-di-guo", title: "银河帝国", author: "艾萨克·阿西莫夫", isFavorite: true, genres: ["科幻"], ...coverFor("银河帝国") },
  { slug: "ren-lei-mie-jue", title: "人类灭绝", author: "高野和明", isFavorite: true, genres: ["科幻", "悬疑"], ...coverFor("人类灭绝") },
  { slug: "ming-chao-na-xie-shi", title: "明朝那些事儿", author: "当年明月", isFavorite: true, genres: ["历史"], ...coverFor("明朝那些事儿") },
  { slug: "wan-jiu-ji-hua", title: "挽救计划", author: "安迪·威尔", isFavorite: true, genres: ["科幻"], ...coverFor("挽救计划") },
  { slug: "sa-ha-la-de-gu-shi", title: "撒哈拉的故事", author: "三毛", isFavorite: true, genres: ["散文"], ...coverFor("撒哈拉的故事") },
  { slug: "jue-jiao", title: "绝叫", author: "叶真中显", isFavorite: true, genres: ["悬疑"], ...coverFor("绝叫") },
  { slug: "yi-ju-ding-yi-wan-ju", title: "一句顶一万句", author: "刘震云", isFavorite: true, genres: ["文学"], ...coverFor("一句顶一万句") },
  { slug: "jie-you-za-huo-pu", title: "解忧杂货铺", author: "东野圭吾", isFavorite: true, genres: ["文学", "悬疑"], ...coverFor("解忧杂货铺") },
  { slug: "bai-ye-xing", title: "白夜行", author: "东野圭吾", isFavorite: true, genres: ["悬疑"], ...coverFor("白夜行") },
  { slug: "ren-sheng-fu-ben", title: "人生复本", author: "布莱克·克劳奇", isFavorite: true, genres: ["科幻", "悬疑"], ...coverFor("人生复本") },
  { slug: "an-de-de-you-xi", title: "安德的游戏", author: "奥森·斯科特·卡德", isFavorite: true, genres: ["科幻"], ...coverFor("安德的游戏") },

  // 新增：有图片但原本不在列表中的书
  { slug: "fan-ren-xiu-xian-zhuan", title: "凡人修仙传", author: "忘语", isFavorite: true, genres: ["文学"], ...coverFor("凡人修仙传") },
  { slug: "yi-di-ji-mao", title: "一地鸡毛", author: "刘震云", isFavorite: true, genres: ["文学"], ...coverFor("一地鸡毛") },
  { slug: "wo-yu-di-tan", title: "我与地坛", author: "史铁生", isFavorite: true, genres: ["散文"], ...coverFor("我与地坛") },
];

export const booksList = allBooks;

export function getBookBySlug(slug: string) {
  return booksList.find((b) => b.slug === slug);
}

export function getFavoriteBooks() {
  return booksList.filter((b) => b.isFavorite);
}

export function getBooksWithNotes() {
  return booksList.filter((b) => !!b.content);
}
