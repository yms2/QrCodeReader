'use client';

import { useEffect, useState } from 'react';

export default function QrFromPro001() {
  const [product, setProduct] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/product/qrcode/PRD001');
        if (!res.ok) throw new Error('API 요청 실패');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('데이터를 불러오지 못했습니다.');
      }
    };

    fetchProduct();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>📦 품목 상세 (PRD001)</h1>

      {product ? (
        <div>
          <p><strong>품목코드:</strong> {product.productCode}</p>
          <p><strong>품목명:</strong> {product.productName}</p>
          <p><strong>단위:</strong> {product.productUnit}</p>

          <h3>🔲 QR 코드</h3>
          <img src={product.qrCode} alt="QR Code" width={200} />
        </div>
      ) : (
        <p>{error || '불러오는 중...'}</p>
      )}
    </main>
  );
}
