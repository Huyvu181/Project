import { useEffect, useState } from 'react';

type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	image_url: string;
};

export function useFetchProducts() {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await fetch('http://localhost:3000/api/products');
				if (!response.ok) throw new Error('Connection failed');

				const data = await response.json();
				setProducts(data);
			} catch (err: any) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	return { products, loading, error };
}
