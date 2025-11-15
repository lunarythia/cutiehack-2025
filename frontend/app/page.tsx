import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-h-screen w-full flex justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-3xl">Welcome to scheduleplanner!</h1>
        <div>
        <p>Here, you can plan your schedule for these four years at <span className="text-blue-500 font-bold">UCR</span>, like R&rsquo;Web, but better!</p>
        <h2 className="text-2xl">Go to <a href="/plan">/plan</a>!</h2>
        </div>
      </main>
    </div>
  );
}
