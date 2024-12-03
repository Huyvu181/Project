import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from '../PDtail.module.css'


type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	image_url: string;
};

export function ProductDetail() {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const response = await fetch(`http://localhost:3000/api/products/${id}`);
				// console.log("Product ID:", id);
				if (!response.ok) throw new Error('Failed to fetch product');
				const data = await response.json();
				setProduct(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) return <div>Loading product...</div>;
	if (error) return <div>Error: {error}</div>;
	if (!product) return <div>Product not found</div>;

	return (
		<div className="container mx-auto px-4 flex justify-evenly">
			<div id='leftCol' className='border rounded-lg p-4 shadow hover:shadow-lg transition '>
				<h1 className="text-2xl font-bold">{product.title}</h1>
				<img src={product.image_url} alt={product.title} className="my-4" />
			</div>

			<div id='centerCol' className={styles.centerCol}>
				<p>{product.description}</p>
			</div>

			<div id=' ringhtCol' className="TradePrice_tradePriceWrap__Sdms_">
				<div className="text-xl font-semibold mt-4 text-center">
					${product.price}
				</div>

				<div className='relative flex flex-col gap-1 rounded-[0.375rem] border bg-white px-3 py-2 border-red-red-7 cursor-pointer'>
					Add to cart
				</div>

			</div>
		</div>
	);
}
