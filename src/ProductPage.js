import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/Products.css';
import Reviews from './Reviews';


const ProductPage = ({ isLoggedIn, setIsLoggedIn }) => {
    const { productId } = useParams(); // URL'den productId'yi alıyoruz
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
                setProduct(response.data);
                setLoading(false);
            } catch (err) {
                setError('Ürün bilgisi alınamadı. Lütfen tekrar deneyin.');
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="product-page">
            <button className="backbutton" onClick={() => navigate(-1)}>
                &#11164; Geri
            </button>
            {product.map((product) => (
                    <div>
                        <img
                            src={`${product.img_url}`}
                            alt={product.product_name}
                            style={{ width: '200px', height: '200px', objectFit: 'cover'}}
                        />
                        <h2>{product.product_name}</h2>
                        <p>Fiyat: {product.lowest_price} TL</p>
                        <p>Ortalama Puan: {product.average_rating || 'Henüz değerlendirme yok'}</p>
                    </div>
                ))} 
                <Reviews productId={productId} />
        </div>
    );
};

export default ProductPage;