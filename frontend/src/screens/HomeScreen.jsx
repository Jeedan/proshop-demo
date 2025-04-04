import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get("/api/products");
			setProducts(data);
		};

		fetchProducts();
	}, []); // dependency array, when the array changes useEffect will run again

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => (
					<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomeScreen;
