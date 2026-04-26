import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50">
      <main className="text-center">
        <h1 className="text-4xl font-bold mb-4">Chấm điểm hành động cá nhân về bảo vệ môi trường không khí</h1>
        <p className="mb-8">Tham gia khảo sát để biết điểm số và nhận khuyến nghị cá nhân hóa.</p>
        <Link href="/survey" className="px-6 py-3 bg-blue-500 text-white rounded">
          Bắt đầu khảo sát
        </Link>
        <div className="mt-10 flex flex-col items-center gap-4 md:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center rounded-full bg-black text-white px-5 transition-colors hover:bg-black/[.8] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
