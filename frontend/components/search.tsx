/* eslint-disable @next/next/no-img-element */

export default function Search({ query }: { query: string }) {
  return (
    <div className="flex flex-row gap-1 items-center">
      <a
        href={`https://reddit.com/search?q=${encodeURIComponent(
          `UCR ${query}`
        )}`}
        target="_blank"
      >
        <img src="/reddit.png" className="w-8 h-8" alt="reddit" />
      </a>
      <a
        href={`https://ratemyprofessors.com/search/professors/1076?q=${encodeURIComponent(
          query
        )}`}
        target="_blank"
        className="underline"
      >
        RMP
      </a>
    </div>
  );
}
