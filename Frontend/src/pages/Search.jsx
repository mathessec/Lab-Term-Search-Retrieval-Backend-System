import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client.js';

export default function Search() {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSearch = useMemo(() => q.trim().length >= 2, [q]);

  const fetchResults = async (pageNum = 1) => {
    if (!canSearch) return;
    setLoading(true);
    setError('');
    try {
      const { data } = await client.get('https://lab-term-search-retrieval-backend-system.onrender.com/user/search', {
        params: { query: q.trim(), limit: 10, page: pageNum },
      });
      setResults(data?.results || []);
      setTotalPages(data?.pagination?.totalPages || 1);
      setPage(data?.pagination?.currentPage || 1);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Search failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResults([]);
    setPage(1);
    setTotalPages(1);
  }, [q]);

  return (
    <div className="mx-auto max-w-6xl p-4">
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Search LOINC by code, component, long name, short name..."
          className="w-full rounded border px-3 py-2"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          onClick={() => fetchResults(1)}
          disabled={!canSearch || loading}
          className="rounded bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <p className="mb-4 rounded bg-red-100 px-3 py-2 text-red-700">{error}</p>}

      {results.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-slate-100">
              <tr>
                <th className="border px-3 py-2 text-left">LOINC</th>
                <th className="border px-3 py-2 text-left">Component</th>
                <th className="border px-3 py-2 text-left">Long Name</th>
                <th className="border px-3 py-2 text-left">Property</th>
                <th className="border px-3 py-2 text-left">Scale</th>
                <th className="border px-3 py-2 text-left">Method</th>
                <th className="border px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50">
                  <td className="border px-3 py-2 font-mono">{r.LOINC_NUM}</td>
                  <td className="border px-3 py-2">{r.COMPONENT}</td>
                  <td className="border px-3 py-2">{r.LONG_COMMON_NAME}</td>
                  <td className="border px-3 py-2">{r.PROPERTY}</td>
                  <td className="border px-3 py-2">{r.SCALE_TYP}</td>
                  <td className="border px-3 py-2">{r.METHOD_TYP}</td>
                  <td className="border px-3 py-2 text-center">
                    <Link className="text-emerald-700 underline" to={`/term/${encodeURIComponent(r.LOINC_NUM)}`}>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => fetchResults(page - 1)}
            disabled={page <= 1 || loading}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Prev
          </button>
          <div className="text-sm text-slate-600">Page {page} of {totalPages}</div>
          <button
            onClick={() => fetchResults(page + 1)}
            disabled={page >= totalPages || loading}
            className="rounded border px-3 py-1 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}


