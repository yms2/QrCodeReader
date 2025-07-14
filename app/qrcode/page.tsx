'use client';

import { useEffect, useState } from 'react';

export default function QrFromPro001() {
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQr = async () => {
      try {
        const res = await fetch('http://192.168.0.10:3000/product/PRD001');
        const data = await res.json();
        console.log('API 응답:', data); // 콘솔에서 확인
        setQrImage(data.qrCode); // ← ✅ 올바른 키로 수정
      } catch (err) {
        setError('QR 코드 가져오기 실패');
      }
    };

    fetchQr();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>📦 QR 코드 보기 (PRD001)</h1>

      {qrImage ? (
        <img src={qrImage} alt="QR Code" width={200} />
      ) : (
        <p>{error || 'QR 코드를 불러오는 중...'}</p>
      )}
    </main>
  );
}
