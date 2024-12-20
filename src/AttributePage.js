import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import './styles/Products.css';

const AttributePage = () => {
    const { attribute_id } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [attributeName, setAttributeName] = useState('');
    const [subcategoryId, setSubcategoryId] = useState(null);
    const [subcategoryAttributes, setSubcategoryAttributes] = useState([]);
    const [orderbyClause, setOrderbyClause] = useState('popularity');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (subcategoryId) {
            const fetchCategoryName = async () => {
                try {
                    const response = await axios.get(`http://localhost:5000/api/subcategory/${subcategoryId}`);
                    const subcategoryData = response.data;
                    const categoryName = subcategoryData.category_name;
                    setCategoryName(categoryName);
                } catch (error) {
                    console.error('Category name could not be fetched:', error);
                }
            };

            fetchCategoryName();
        }
    }, [subcategoryId]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/attribute/${attribute_id}`, {
                    params: { orderbyClause, sortOrder },
                });
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error('Products could not be fetched:', error);
                setError('Products could not be fetched. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, [attribute_id, orderbyClause, sortOrder]);

    useEffect(() => {
        const fetchSubcategoryAttributes = async () => {
            if (subcategoryId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/attributes/${subcategoryId}`);
                    setSubcategoryAttributes(response.data);
                } catch (error) {
                    console.error('Subcategory attributes could not be fetched:', error);
                }
            }
        };

        fetchSubcategoryAttributes();
    }, [subcategoryId]);

    useEffect(() => {
        const fetchAttributeDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/attribute/${attribute_id}`);
                const attributeData = response.data;
                setAttributeName(attributeData.attribute_name);
                setSubcategoryId(attributeData.subcategory_id);
            } catch (error) {
                console.error('Attribute details could not be fetched:', error);
            }
        };
    
        fetchAttributeDetails();
    }, [attribute_id]);

    const handleSortChange = (e) => {
        const [orderby, order] = e.target.value.split(',');
        setOrderbyClause(orderby);
        setSortOrder(order);
    };

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    const handleAttributeClick = (attributeId) => {
        navigate(`/attribute/${attributeId}`);
    };

    // Create sidebar content
    const sidebarContent = (
        <>
            <h3>Attributes</h3>
            <ul>
                {subcategoryAttributes.map((attr) => (
                    <li key={attr.attribute_id}>
                        <div onClick={() => handleAttributeClick(attr.attribute_id)} style={{ cursor: 'pointer' }}>
                            {attr.attribute_name}
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <Layout
            sidebarContent={sidebarContent}
            backButtonPath={`/category/${categoryName}`}
        >
            <h1>{attributeName} Products</h1>
            <div>
                <label htmlFor="sort">Sort:</label>
                <select id="sort" onChange={handleSortChange}>
                    <option value="popularity,DESC">Popular Products</option>
                    <option value="name,ASC">Name (A-Z)</option>
                    <option value="name,DESC">Name (Z-A)</option>
                    <option value="price,ASC">Price (Low to High)</option>
                    <option value="price,DESC">Price (High to Low)</option>
                </select>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="product-list">
                {products.map((product) => (
                    <div
                        className="product-card"
                        key={product.product_id}
                        onClick={() => handleProductClick(product.product_id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={`${product.img_url}`}
                            alt={product.product_name}
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                        <h2>{product.product_name}</h2>
                        <p>Price: {product.price} TL</p>
                        <p>Average Rating: {product.average_rating || 'No reviews yet'}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default AttributePage;