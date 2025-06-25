import { useEffect, useState } from 'react';
import api from '../services/api';

export function useQuestions(type: 'received' | 'sent') {
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/auth/users/me/questions?type=${type}`)
      .then(res => setQuestions(res.data))
      .finally(() => setLoading(false));
  }, [type]);

  return { questions, loading };
} 