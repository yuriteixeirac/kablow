export type Category = "hardware" | "perifericos" | "computadores" | "gamer";

export interface Product {
	attributes: { title: string };
}

export interface ProductList {
	meta: { total_pages_count: number };
	data: Product[];
}


