import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <main className="text-center max-w-2xl">
        <div className="clay-card mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#1C398E]" style={{ fontFamily: 'var(--font-poppins)' }}>
            Chấm điểm hành động cá nhân về bảo vệ môi trường không khí
          </h1>
          <p className="text-lg text-[#64748B] mb-6">
            Tham gia khảo sát để biết điểm số và nhận khuyến nghị cá nhân hóa.
          </p>
        </div>
        
        <Link 
          href="/survey" 
          className="clay-button inline-block text-lg"
        >
          Bắt đầu khảo sát
        </Link>
      </main>
    </div>
  );
}
