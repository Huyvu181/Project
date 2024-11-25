import { useFetchProducts } from '../../hook/useFetchProducts';
import { useNavigate } from 'react-router-dom';

export function Home() {
	const { products, loading, error } = useFetchProducts();
	const navigate = useNavigate();

	if (loading) return <div>Loading products...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div className="grid grid-cols-4 gap-6 p-6">
			{products.map((product) => (
				<div
					key={product.id}
					className="border rounded-lg p-4 shadow hover:shadow-lg transition"
				>
					<img
						src={product.image_url}
						alt={product.title}
						className="w-full h-40 object-cover rounded-lg mb-4 cursor-pointer"
						onClick={() => navigate(`/products/${product.id}`)}
					/>
					<h2 className="text-xl font-bold">{product.title}</h2>
					<p className="text-gray-600 text-sm">{product.description}</p>
					<p className="text-lg font-semibold text-blue-600 mt-2 cursor-pointer">{product.price} $</p>
				</div>
			))}
		</div>
	);
}
