// app/product/[productCode]/page.tsx


interface Props {
  params: { productCode: string };
}

export default async function ProductPage({ params }: Props) {
  const productCode = (await params).productCode;

  // 백엔드에서 제품 정보와 QR 코드 가져오기
  let productData = null;
  let qrCodeData = null;
  
  try {
    // 제품 정보 가져오기 (백엔드에 해당 API가 있다면)
    const productRes = await fetch(`http://localhost:5000/api/product/${productCode}`, {
      cache: 'no-store',
    });
    
    if (productRes.ok) {
      productData = await productRes.json();
    }
  } catch (error) {
    console.log('제품 정보를 가져올 수 없습니다.');
  }

  try {
    // QR 코드 가져오기
    const qrRes = await fetch(`http://localhost:5000/api/product/qrcode/${productCode}`, {
      cache: 'no-store',
    });
    
    if (qrRes.ok) {
      qrCodeData = await qrRes.json();
    }
  } catch (error) {
    console.log('QR 코드를 가져올 수 없습니다.');
  }

  // 백엔드 데이터가 있으면 사용, 없으면 더미 데이터 사용
  const data = productData || {
    productCode: productCode,
    productName: `${productCode} 품목명`,
    productUnit: '개',
    qrCode: qrCodeData?.qrCode || `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify({
      productCode: productCode,
      productName: `${productCode} 품목명`,
      productUnit: '개',
      timestamp: new Date().toISOString()
    }))}`
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>📦 품목 상세 ({productCode})</h1>
      <p><strong>품목명:</strong> {data.productName}</p>
      <p><strong>단위:</strong> {data.productUnit}</p>
      <p><strong>유형:</strong> {data.productType}</p>
    </main>
  );
} 