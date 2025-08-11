import { useEffect, useState } from 'react';
import client from '../api/client.js';

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await client.get('https://lab-term-search-retrieval-backend-system.onrender.com/user/loinc-stats');
        setStats(data?.stats || null);
      } catch (err) {
        const msg = err?.response?.data?.message || 'Failed to load stats';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-700">{error}</div>;
  if (!stats) return <div className="p-4">No stats available</div>;

  return (
    <div className="mx-auto max-w-5xl p-4">
      <h1 className="mb-6 text-2xl font-semibold">LOINC Statistics</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded border p-4">
          <div className="text-sm text-slate-500">Total Terms</div>
          <div className="text-2xl font-semibold">{stats.totalTerms}</div>
        </div>
        <div className="rounded border p-4 md:col-span-1">
          <div className="text-sm font-medium">Top Components</div>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {stats.topComponents?.map((c) => (
              <li key={c._id}>
                <span className="font-medium">{c._id || '-'}</span> — {c.count}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded border p-4 md:col-span-1">
          <div className="text-sm font-medium">Scale Types</div>
          <ul className="mt-2 list-disc pl-5 text-sm">
            {stats.scaleTypes?.map((s) => (
              <li key={s._id}>
                <span className="font-medium">{s._id || '-'}</span> — {s.count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


