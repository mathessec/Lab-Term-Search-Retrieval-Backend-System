import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client.js';

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load stats on component mount
  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data } = await client.get('https://lab-term-search-retrieval-backend-system.onrender.com/user/loinc-stats');
      setStats(data?.stats);
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return;

    setLoading(true);
    setError('');
    try {
      const { data } = await client.get('/user/search', {
        params: { query: searchQuery.trim(), limit: 10, page: 1 },
      });
      setResults(data?.results || []);
      
      // Add to recent searches
      const newSearch = {
        query: searchQuery.trim(),
        timestamp: new Date().toISOString(),
        resultCount: data?.results?.length || 0
      };
      setRecentSearches(prev => [newSearch, ...prev.slice(0, 4)]);
    } catch (err) {
      const msg = err?.response?.data?.message || 'Search failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const quickSearch = (term) => {
    setSearchQuery(term);
    // Trigger search after setting the query
    setTimeout(() => {
      const event = new Event('submit', { bubbles: true });
      document.getElementById('search-form').dispatchEvent(event);
    }, 100);
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      {/* Hero Section with Search */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">LOINC Term Search</h1>
        <p className="mb-6 text-lg text-slate-600">
          Search for medical laboratory terms, codes, and components
        </p>
        
        {/* Main Search Form */}
        <form onSubmit={handleSearch} id="search-form" className="mx-auto max-w-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by LOINC code, component name, or term..."
              className="flex-1 rounded-lg border border-slate-300 px-4 py-3 text-lg focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={!searchQuery.trim() || searchQuery.trim().length < 2 || loading}
              className="rounded-lg bg-emerald-600 px-6 py-3 text-lg font-medium text-white hover:bg-emerald-500 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {/* Quick Search Suggestions */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {['glucose', 'hemoglobin', 'cholesterol', 'sodium', 'potassium', 'calcium'].map((term) => (
            <button
              key={term}
              onClick={() => quickSearch(term)}
              className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-700">
          <p className="font-medium">Search Error:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">Search Results</h2>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">LOINC Code</th>
                  <th className="px-4 py-3 text-left font-medium">Component</th>
                  <th className="px-4 py-3 text-left font-medium">Long Name</th>
                  <th className="px-4 py-3 text-left font-medium">Property</th>
                  <th className="px-4 py-3 text-left font-medium">Scale</th>
                  <th className="px-4 py-3 text-center font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={result._id || index} className="border-t border-slate-200 hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-emerald-600">{result.LOINC_NUM}</td>
                    <td className="px-4 py-3 font-medium">{result.COMPONENT}</td>
                    <td className="px-4 py-3">{result.LONG_COMMON_NAME}</td>
                    <td className="px-4 py-3 text-slate-600">{result.PROPERTY}</td>
                    <td className="px-4 py-3 text-slate-600">{result.SCALE_TYP}</td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        to={`/term/${encodeURIComponent(result.LOINC_NUM)}`}
                        className="rounded bg-emerald-600 px-3 py-1 text-sm text-white hover:bg-emerald-500"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Statistics */}
        {stats && (
          <div className="rounded-lg border border-slate-200 p-6">
            <h3 className="mb-4 text-xl font-semibold">Database Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Terms:</span>
                <span className="font-semibold">{stats.totalTerms?.toLocaleString()}</span>
              </div>
              {stats.topComponents?.slice(0, 5).map((comp) => (
                <div key={comp._id} className="flex justify-between text-sm">
                  <span className="text-slate-600">{comp._id || 'Unknown'}:</span>
                  <span>{comp.count}</span>
                </div>
              ))}
            </div>
            <Link
              to="/stats"
              className="mt-4 inline-block text-sm text-emerald-600 hover:text-emerald-500"
            >
              View Full Statistics →
            </Link>
          </div>
        )}

        {/* Recent Searches */}
        <div className="rounded-lg border border-slate-200 p-6">
          <h3 className="mb-4 text-xl font-semibold">Recent Searches</h3>
          {recentSearches.length > 0 ? (
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div key={index} className="flex items-center justify-between rounded bg-slate-50 p-2">
                  <span className="font-medium">{search.query}</span>
                  <span className="text-sm text-slate-500">{search.resultCount} results</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No recent searches</p>
          )}
        </div>
      </div>
    </div>
  );
}