// app/product/[productCode]/page.tsx
interface Product {
  productCode: string;
  productName: string;
  spec?: string;
  unit?: string;
}

export default async function ProductPage({ params }: { params: { productCode: string } }) {
  const res = await fetch(`http://localhost:5000/api/product/${params.productCode}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return <div>❌ 품목을 찾을 수 없습니다.</div>;
  }

  const product: Product = await res.json();

  return (
    <div>
      <h2>📋 품목 상세</h2>
      <p><strong>코드:</strong> {product.productCode}</p>
      <p><strong>이름:</strong> {product.productName}</p>
      <p><strong>규격:</strong> {product.spec}</p>
      <p><strong>단위:</strong> {product.unit}</p>
    </div>
  );
}
