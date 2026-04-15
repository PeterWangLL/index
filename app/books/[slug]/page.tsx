import { notFound } from "next/navigation";
import { booksList, getBookBySlug } from "@/lib/books-data";

export function generateStaticParams() {
  return booksList.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  return {
    title: `${book?.title ?? "Book"} | Books — Peter Wang`,
  };
}

export default async function BookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getBookBySlug(slug);
  if (!book) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <a
        href="/#books"
        className="text-sm text-foreground/60 hover:text-[#B83B5E] transition-colors"
      >
        ← 返回 Books
      </a>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {book.title}
      </h1>
      <p className="mt-2 text-foreground/60">{book.author}</p>

      {book.content ? (
        <article className="prose prose-neutral dark:prose-invert mt-10 max-w-none">
          {book.content.split("\n\n").map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed text-foreground/80">
              {paragraph}
            </p>
          ))}
        </article>
      ) : (
        <div className="mt-10 rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-6 py-12 text-center">
          <p className="text-foreground/60">这本书还没有写读书笔记。</p>
          <p className="mt-2 text-sm text-foreground/40">
            先去读一遍，再回来补上感悟吧。
          </p>
        </div>
      )}
    </main>
  );
}
