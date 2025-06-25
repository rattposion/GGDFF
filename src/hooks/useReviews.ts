import { useEffect, useState } from 'react';
import api from '../services/api';

export function useReviews(type: 'received' | 'sent') {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/auth/users/me/reviews?type=${type}`)
      .then(res => setReviews(res.data))
      .finally(() => setLoading(false));
  }, [type]);

  return { reviews, loading };
} 