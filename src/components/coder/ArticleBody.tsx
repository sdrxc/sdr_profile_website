import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

// Shared reader-friendly typography for article bodies. We style elements
// explicitly (rather than relying on @tailwindcss/typography) to keep the
// dependency footprint small and the look on-brand with the glass UI.
const article =
  "max-w-none text-[17px] leading-[1.8] text-white/75 " +
  "[&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-10 [&_h1]:mb-4 " +
  "[&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-3 " +
  "[&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-2 " +
  "[&_p]:my-4 " +
  "[&_a]:text-neon-cyan [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-white " +
  "[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1.5 [&_li]:pl-1 " +
  "[&_strong]:font-semibold [&_strong]:text-white " +
  "[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-neon-violet [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-white/60 " +
  "[&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-neon-cyan " +
  "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-black/40 [&_pre]:p-5 " +
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-white/85 " +
  "[&_hr]:my-10 [&_hr]:border-white/10 " +
  "[&_img]:my-6 [&_img]:rounded-2xl [&_img]:border [&_img]:border-white/10 " +
  "[&_table]:my-6 [&_table]:w-full [&_th]:border-b [&_th]:border-white/15 [&_th]:p-2 [&_th]:text-left [&_td]:border-b [&_td]:border-white/5 [&_td]:p-2";

const mdComponents: Components = {
  a: ({ node, ...props }) => <a target="_blank" rel="noreferrer" {...props} />,
};

export function ArticleBody({ kind, body }: { kind: "md" | "html"; body: string }) {
  if (kind === "html") {
    return <div className={article} dangerouslySetInnerHTML={{ __html: body }} />;
  }
  return (
    <div className={article}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
        {body}
      </ReactMarkdown>
    </div>
  );
}
