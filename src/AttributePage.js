import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import './styles/Products.css';

const AttributePage = () => {
    const { attributeId } = useParams();
    const [products, setProducts] = useState([]);
    const [attributeName, setAttributeName] = useState('');
    const [orderbyClause, setOrderbyClause] = useState('popularity');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/attribute/${attributeId}`, {
                    params: { orderbyClause, sortOrder }
                });
                setProducts(response.data);
                setAttributeName(response.data[0]?.attribute_name || '');
                console.log('Ürünler:', response.data); // Ürün verisini kontrol edin
                setLoading(false);
            } catch (error) {
                console.error('Ürünler alınamadı:', error);
                setError('Ürünler alınamadı. Lütfen daha sonra tekrar deneyin.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, [attributeName, attributeId, orderbyClause, sortOrder]);

    const handleSortChange = (e) => {
        const [orderby, order] = e.target.value.split(',');
        setOrderbyClause(orderby);
        setSortOrder(order);
    };

    return (
        <Layout>
            <h1>{attributeName} Ürünleri</h1>
            <div>
                <label htmlFor="sort">Sırala:</label>
                <select id="sort" onChange={handleSortChange}>
                    <option value="popularity,DESC">Popüler Ürünler</option>
                    <option value="name,ASC">İsme Göre (A-Z)</option>
                    <option value="name,DESC">İsme Göre (Z-A)</option>
                    <option value="price,ASC">Fiyata Göre (Artan)</option>
                    <option value="price,DESC">Fiyata Göre (Azalan)</option>
                    
                </select>
            </div>
                {loading && <p>Yükleniyor...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <div className="product-list">
                    {products.map((product) => (
                        <div className="product-card" key={product.product_id}>
                            <img src={`${product.img_url}`}
                                alt={product.product_name}
                                style={{ width: '200px', height: '200px', objectFit: 'cover' }} />
                            <h2>{product.product_name}</h2>
                            <p>Fiyat: {product.price} TL</p>
                            {/* <p>Satıcı: {product.seller_name}</p> */}
                            {/* <p>Popülerlik: {product.popularity_value}</p> */}
                            <p>Ortalama Puan: {product.average_rating || 'Henüz değerlendirme yok'}</p>
                        </div>
                    ))}
                </div>
        </Layout>
    );
};

export default AttributePage;