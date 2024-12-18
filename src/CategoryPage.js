import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import axios from 'axios';
import './styles/CategoryPage.css'


const CategoryPage = () => {
    // Kategori adını alıyoruz
    const { category_name } = useParams(); // Kategori adını alıyoruz
    const [subcategories, setSubcategories] = useState([]);
    const [expandedSubcategory, setExpandedSubcategory] = useState(null); // Açık alt kategori
    const [attributes, setAttributes] = useState({}); // Her alt kategori için attribute'ları tutar
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubcategories = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/subcategories/${category_name}`);
                setSubcategories(response.data);
            } catch (error) {
                console.error('Alt kategoriler alınamadı:', error);
            }
        };
        fetchSubcategories();
    }, [category_name]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/category/${category_name}`, {
                });
                setProducts(response.data);
                console.log('Ürünler:', response.data); // Ürün verisini kontrol edin
                setLoading(false);
            } catch (error) {
                console.error('Ürünler alınamadı:', error);
                setError('Ürünler alınamadı. Lütfen daha sonra tekrar deneyin.');
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleSubcategoryClick = async (subcategoryId) => {
        if (expandedSubcategory === subcategoryId) {
            // Eğer tıklanan zaten açık olan alt kategori ise kapat
            setExpandedSubcategory(null);
            return;
        }

        // Yeni alt kategori tıklanmışsa, attribute'ları çek
        try {
            const response = await axios.get(`http://localhost:5000/api/attributes/${subcategoryId}`);
            setAttributes((prev) => ({ ...prev, [subcategoryId]: response.data }));
        } catch (error) {
            console.error('Attribute verileri alınamadı:', error);
        }

        setExpandedSubcategory(subcategoryId); // Yeni alt kategoriyi genişlet
    };

    const handleAttributeClick = async (attributeId) => {
        navigate(`/attribute/${attributeId}`);

    }

    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`); // Ürün detay sayfasına yönlendirme
    };



    const sidebarContent = (
        <>
            <h3>{category_name} Alt Kategorileri</h3>
            <ul>
                {subcategories.map((subcategory) => (
                    <li key={subcategory.subcategory_id}>
                        <div
                            onClick={() => handleSubcategoryClick(subcategory.subcategory_id)}
                            style={{ cursor: 'pointer' }}
                        >
                            {subcategory.subcategory_name}
                        </div>
                        {expandedSubcategory === subcategory.subcategory_id && (
                            <ul style={{ paddingLeft: '20px', color: '#555' }}>
                                {attributes[subcategory.subcategory_id]?.map((attr) => (
                                    <li key={attr.attribute_id}>
                                        <div
                                            onClick={() => handleAttributeClick(attr.attribute_id)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {attr.attribute_name}
                                        </div></li>
                                )) || <li>Yükleniyor...</li>}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <Layout
            sidebarContent={sidebarContent}
            isBackButtonVisible={true} // Geri Dön tuşu görünür
            backButtonPath="/" // Ana sayfaya yönlendirme
        >
            <h1>{category_name} Ürünleri</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div
                        className="product-card"
                        key={product.product_id}
                        onClick={() => handleProductClick(product.product_id)} // Tıklama işlevi
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src={`${product.img_url}`}
                            alt={product.product_name}
                            style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                        />
                        <h2>{product.product_name}</h2>
                        <p>Fiyat: {product.price} TL</p>
                        <p>Ortalama Puan: {product.average_rating || 'Henüz değerlendirme yok'}</p>
                    </div>
                ))}
            </div>
        </Layout>

    );
};

export default CategoryPage;
