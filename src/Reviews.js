import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Reviews.css';

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/reviews/${productId}`);
                setReviews(response.data);
                setLoading(false);
            } catch (err) {
                setError('Yorumlar alınamadı. Lütfen tekrar deneyin.');
                setLoading(false);
            }
        };

        fetchReviews();
    }, [productId]);

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <div className="reviews">
            <h3>Yorumlar</h3>
            {reviews.length === 0 ? (
                <p>Henüz yorum yok.</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.review_id} className="review">
                        <p><strong>{review.user_name}</strong></p>
                        <p>{review.review_text}</p>
                        <p>Puan: {review.rating}</p>
                        <p>Tarih: {new Date(review.review_date).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Reviews;