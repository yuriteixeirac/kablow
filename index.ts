import type { Product, ProductList, Category } from './types';

async function fetchProducts(category: Category) {
	let response = await fetch(`https://servicespub.prod.api.aws.grupokabum.com.br/catalog/v2/products-by-category/${category}?page_number=1&page_size=100&facet_filters=&sort=most_searched&is_prime=false&payload_data=products_category_filters&include=gift`);

	if (!response.ok) {
		throw new Error();
	}
	
	let json: ProductList = await response.json();
	const totalPagesCount: number = json.meta.total_pages_count;
	
	let currentPage = 1;
	while (currentPage <= totalPagesCount) {
		json.data.forEach((product: Product) => {
			console.log(product.attributes.title);
		});

		currentPage++;

		response = await fetch(`https://servicespub.prod.api.aws.grupokabum.com.br/catalog/v2/products-by-category/${category}?page_number=${currentPage}&page_size=100&facet_filters=&sort=most_searched&is_prime=false&payload_data=products_category_filters&include=gift`);
		json = await response.json();
	} 
}

const categories: Category[] = ["hardware", "perifericos", "gamer", "computadores"];

categories.forEach(
	async (element: Category) => {
		await fetchProducts(element);
	}
);
