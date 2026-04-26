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
        
        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <div className="clay-card text-center">
            <div className="text-3xl font-bold text-[#3B82F6]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>10+</div>
            <div className="text-sm text-[#64748B]">Câu hỏi</div>
          </div>
          <div className="clay-card text-center">
            <div className="text-3xl font-bold text-[#16A34A]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>100</div>
            <div className="text-sm text-[#64748B]">Điểm tối đa</div>
          </div>
          <div className="clay-card text-center">
            <div className="text-3xl font-bold text-[#D97706]" style={{ fontFamily: 'var(--font-be-vietnam-pro)' }}>AI</div>
            <div className="text-sm text-[#64748B]">Khuyến nghị</div>
          </div>
        </div>
      </main>
    </div>
  );
}
