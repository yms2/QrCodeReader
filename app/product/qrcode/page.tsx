'use client';

import { useEffect, useState } from 'react';

interface Product {
  productCode: string;
  productName: string;
  productUnit: string;
  description: string;
}

interface QRCodeData {
  productCode: string;
  qrCode: string; // base64 image URL
}

export default function QRCodePage() {
  const [qrCodes, setQrCodes] = useState<{ [key: string]: QRCodeData }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string>('');

  // 샘플 품목 데이터
  const sampleProducts: Product[] = [
    {
      productCode: 'PRD001',
      productName: '노트북',
      productUnit: '대',
      description: '고성능 노트북 컴퓨터'
    },
    {
      productCode: 'PRD002', 
      productName: '마우스',
      productUnit: '개',
      description: '무선 마우스'
    },
    {
      productCode: 'PRD003',
      productName: '키보드',
      productUnit: '개', 
      description: '기계식 키보드'
    }
  ];

  const fetchQRCode = async (productCode: string) => {
    setLoading(prev => ({ ...prev, [productCode]: true }));
    try {
      const res = await fetch(`http://localhost:5000/api/product/qrcode/${productCode}`);
      if (!res.ok) throw new Error('QR 코드 생성 실패');
      const data: QRCodeData = await res.json();
      setQrCodes(prev => ({ ...prev, [productCode]: data }));
    } catch (err) {
      console.error(`QR 코드 생성 실패 (${productCode}):`, err);
      setError(`QR 코드 생성에 실패했습니다: ${productCode}`);
    } finally {
      setLoading(prev => ({ ...prev, [productCode]: false }));
    }
  };

  useEffect(() => {
    // 모든 품목의 QR 코드를 가져오기
    sampleProducts.forEach(product => {
      fetchQRCode(product.productCode);
    });
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1>📱 QR 코드 생성기</h1>
      <p>백엔드에서 생성된 QR 코드를 확인하세요!</p>
      
      {error && (
        <div style={{ 
          backgroundColor: '#f8d7da', 
          color: '#721c24', 
          padding: '10px', 
          borderRadius: '5px', 
          marginBottom: '20px' 
        }}>
          {error}
        </div>
      )}
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
        {sampleProducts.map((product) => (
          <div key={product.productCode} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <h3>📦 {product.productName}</h3>
            <p><strong>품목코드:</strong> {product.productCode}</p>
            <p><strong>단위:</strong> {product.productUnit}</p>
            <p><strong>설명:</strong> {product.description}</p>
            
            <div style={{ marginTop: '15px', textAlign: 'center' }}>
              {loading[product.productCode] ? (
                <div style={{ padding: '20px' }}>🔄 QR 코드 생성 중...</div>
              ) : qrCodes[product.productCode] ? (
                <img 
                  src={qrCodes[product.productCode].qrCode}
                  alt={`QR Code for ${product.productName}`}
                  width={200}
                  style={{ border: '1px solid #ddd' }}
                />
              ) : (
                <div style={{ padding: '20px', color: '#666' }}>
                  ❌ QR 코드를 불러올 수 없습니다
                </div>
              )}
            </div>
            
            <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
              QR 코드를 스캔하면 <strong>/product/{product.productCode}</strong> 페이지로 이동합니다
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
