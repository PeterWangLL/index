import { notFound } from "next/navigation";

const booksData: Record<string, { title: string; author: string; content: string }> = {
  "zhi-shen-shi-nei": {
    title: "置身事内",
    author: "兰小欢",
    content: `《置身事内》是一本关于中国政府与经济发展的入门读物。作者兰小欢以通俗的语言，拆解了土地财政、招商引资、债务风险等复杂议题。

读完这本书，我对「政府不只是市场的监管者，更是市场的参与者」这句话有了更深的理解。书中大量真实的案例和数据，让我第一次觉得宏观经济学离自己的生活并不遥远。

最喜欢的章节是关于地方债和房地产调控的部分，作者没有简单批判，而是尝试解释「为什么会走到这一步」，这种务实的态度非常难得。`,
  },
  "the-little-prince": {
    title: "小王子",
    author: "圣埃克苏佩里",
    content: `小时候读《小王子》，只觉得它是一个有点伤感的童话故事。长大后再翻开，才发现每一句话都是隐喻。

「真正重要的东西，用眼睛是看不见的。」这句话在不同的年纪里反复击中我。狐狸教会小王子的「驯服」，其实就是人与人之间建立联系的过程——需要耐心，需要时间，需要承担责任。

书很薄，但余味很长。`,
  },
  "the-courage-to-be-disliked": {
    title: "被讨厌的勇气",
    author: "岸见一郎",
    content: `这是一本以对话体写就的阿德勒心理学入门书。书中用一位哲人和青年的辩论，逐层拆解了「自卑」「人际关系」「幸福」等话题。

对我影响最大的概念是「课题分离」：区分什么是我的课题，什么是别人的课题，不干涉别人的课题，也不让别人干涉自己的课题。听起来很理想化，但实践之后确实减少了很多内耗。

另一个收获是：阿德勒否认心理创伤的存在，他认为决定我们现在的，不是过去的经历，而是我们赋予经历的意义。这是一种非常有力量的视角。`,
  },
  "hackers-and-painters": {
    title: "黑客与画家",
    author: "Paul Graham",
    content: `Paul Graham 是 Y Combinator 的创始人，也是程序员出身的作家。这本书收录了他关于编程、创业、设计和财富的一系列随笔。

最启发我的是他把「黑客」和「画家」类比的那一章：好的代码和好的画作一样，需要反复修改、不断迭代，而不是一次性规划完美。这种创作观让我对写代码这件事有了新的敬畏。

书中关于财富创造的观点也很有冲击力：财富不是零和博弈，而是通过创造价值来增长的。创业者做的，就是找到一种高效创造财富的方式。`,
  },
};

export function generateStaticParams() {
  return Object.keys(booksData).map((slug) => ({ slug }));
}

export default function BookPage({ params }: { params: { slug: string } }) {
  const book = booksData[params.slug];
  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <a href="/#books" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
        ← 返回 Books
      </a>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{book.title}</h1>
      <p className="mt-2 text-foreground/60">{book.author}</p>
      <article className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
        {book.content.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="mb-6 leading-relaxed text-foreground/80">
            {paragraph}
          </p>
        ))}
      </article>
    </main>
  );
}
