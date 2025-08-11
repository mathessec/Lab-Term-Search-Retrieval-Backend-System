// // import { useEffect, useState } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import client from '../api/client.js';

// // export default function TermDetail() {
// //   const { code } = useParams();
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     const run = async () => {
// //       setLoading(true);
// //       setError('');
// //       try {
// //         const { data } = await client.get(`https://lab-term-search-retrieval-backend-system.onrender.com/user/loinc/${encodeURIComponent(code)}`);
// //         setData(data?.result || null);
// //       } catch (err) {
// //         const msg = err?.response?.data?.message || 'Failed to load term';
// //         setError(msg);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     run();
// //   }, [code]);

// //   if (loading) return <div className="p-4">Loading...</div>;
// //   if (error) return <div className="p-4 text-red-700">{error}</div>;
// //   if (!data) return <div className="p-4">Not found</div>;

// //   const fields = [
// //     'LOINC_NUM','COMPONENT','LONG_COMMON_NAME','SHORTNAME','PROPERTY','SCALE_TYP','METHOD_TYP','EXAMPLE_UNITS','RELATEDNAMES2'
// //   ];

// //   return (
// //     <div className="mx-auto max-w-3xl p-4">
// //       <Link to="/search" className="text-emerald-700 underline">← Back to search</Link>
// //       <h1 className="mt-3 mb-4 text-2xl font-semibold">{data.LOINC_NUM}</h1>
// //       <div className="overflow-hidden rounded border">
// //         <table className="w-full text-sm">
// //           <tbody>
// //             {fields.map((f) => (
// //               <tr key={f} className="odd:bg-slate-50">
// //                 <td className="w-48 border px-3 py-2 font-medium">{f}</td>
// //                 <td className="border px-3 py-2">{data[f] ?? '-'}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // }


// // import { useEffect, useState } from "react";
// // import { useParams, useNavigate, Link } from "react-router-dom";
// // import client from "../api/client.js";

// // export default function TermSearchAndDetail() {
// //   const { code: routeCode } = useParams();
// //   const navigate = useNavigate();

// //   const [searchCode, setSearchCode] = useState(routeCode || "");
// //   const [data, setData] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   // Fetch function
// //   const fetchTerm = async (codeToFetch) => {
// //     if (!codeToFetch) {
// //       setError("Please enter a LOINC code");
// //       setData(null);
// //       return;
// //     }
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const res = await client.get(
// //         `https://lab-term-search-retrieval-backend-system.onrender.com/user/loinc/${encodeURIComponent(codeToFetch)}`
// //       );
// //       setData(res.data?.result || null);
// //     } catch (err) {
// //       setData(null);
// //       setError(err?.response?.data?.message || "Failed to load term");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Run when route param changes
// //   useEffect(() => {
// //     if (routeCode) {
// //       setSearchCode(routeCode);
// //       fetchTerm(routeCode);
// //     }
// //   }, [routeCode]);

// //   // Handle form submit
// //   const handleSearch = (e) => {
// //     e.preventDefault();
// //     navigate(`/term/${encodeURIComponent(searchCode)}`);
// //   };

// //   const fields = [
// //     "LOINC_NUM", "COMPONENT", "LONG_COMMON_NAME", "SHORTNAME",
// //     "PROPERTY", "SCALE_TYP", "METHOD_TYP", "EXAMPLE_UNITS", "RELATEDNAMES2"
// //   ];

// //   return (
// //     <div className="mx-auto max-w-3xl p-4">
// //       <Link to="/search" className="text-emerald-700 underline">← Back to search</Link>

// //       {/* Search Form */}
// //       <form onSubmit={handleSearch} className="flex gap-2 mt-4 mb-6">
// //         <input
// //           type="text"
// //           value={searchCode}
// //           onChange={(e) => setSearchCode(e.target.value)}
// //           placeholder="Enter LOINC code (e.g. 12345-6)"
// //           className="border rounded px-3 py-2 flex-grow"
// //         />
// //         <button
// //           type="submit"
// //           className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700"
// //         >
// //           Search
// //         </button>
// //       </form>

// //       {/* Loading */}
// //       {loading && <div className="p-4">Loading...</div>}

// //       {/* Error */}
// //       {error && !loading && <div className="p-4 text-red-700">{error}</div>}

// //       {/* Not found */}
// //       {!loading && !error && !data && routeCode && (
// //         <div className="p-4">Not found</div>
// //       )}

// //       {/* Data Table */}
// //       {data && !loading && (
// //         <>
// //           <h1 className="mt-3 mb-4 text-2xl font-semibold">{data.LOINC_NUM}</h1>
// //           <div className="overflow-hidden rounded border">
// //             <table className="w-full text-sm">
// //               <tbody>
// //                 {fields.map((f) => (
// //                   <tr key={f} className="odd:bg-slate-50">
// //                     <td className="w-48 border px-3 py-2 font-medium">{f}</td>
// //                     <td className="border px-3 py-2">{data[f] ?? "-"}</td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         </>
// //       )}
// //     </div>
// //   );
// // }


// import { useEffect, useState } from 'react';
// import { Search, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

// // Mock client for demonstration - replace with your actual client
// const client = {
//   get: async (url) => {
//     // Simulate API delay
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     // Mock data for demonstration
//     const mockData = {
//       "LOINC_NUM": "33747-0",
//       "COMPONENT": "Hemoglobin",
//       "LONG_COMMON_NAME": "Hemoglobin [Mass/volume] in Blood",
//       "SHORTNAME": "Hgb Bld-mCnc",
//       "PROPERTY": "MCnc",
//       "SCALE_TYP": "Qn",
//       "METHOD_TYP": "",
//       "EXAMPLE_UNITS": "g/dL",
//       "RELATEDNAMES2": "HGB;Hb;Hemoglobin"
//     };
    
//     return { data: { result: mockData, message: "LOINC term retrieved successfully" } };
//   }
// };

// export default function LoincSearchPage() {
//   const [searchCode, setSearchCode] = useState('');
//   const [currentCode, setCurrentCode] = useState('');
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [searchHistory, setSearchHistory] = useState([]);

//   const handleSearch = async (code = searchCode) => {
//     if (!code.trim()) {
//       setError('Please enter a LOINC code');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setCurrentCode(code);

//     try {
//       const { data: response } = await client.get(
//         `https://lab-term-search-retrieval-backend-system.onrender.com/user/loinc/${encodeURIComponent(code)}`
//       );
//       setData(response?.result || null);
      
//       // Add to search history (avoid duplicates)
//       setSearchHistory(prev => {
//         const filtered = prev.filter(item => item.code !== code);
//         return [{ code, timestamp: new Date() }, ...filtered].slice(0, 5);
//       });
      
//     } catch (err) {
//       const msg = err?.response?.data?.message || 'Failed to load term';
//       setError(msg);
//       setData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const clearResults = () => {
//     setData(null);
//     setCurrentCode('');
//     setError('');
//     setSearchCode('');
//   };

//   const fields = [
//     { key: 'LOINC_NUM', label: 'LOINC Number' },
//     { key: 'COMPONENT', label: 'Component' },
//     { key: 'LONG_COMMON_NAME', label: 'Long Common Name' },
//     { key: 'SHORTNAME', label: 'Short Name' },
//     { key: 'PROPERTY', label: 'Property' },
//     { key: 'SCALE_TYP', label: 'Scale Type' },
//     { key: 'METHOD_TYP', label: 'Method Type' },
//     { key: 'EXAMPLE_UNITS', label: 'Example Units' },
//     { key: 'RELATEDNAMES2', label: 'Related Names' }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
//       <div className="mx-auto max-w-4xl p-6">
//         {/* Header */}
//         <div className="mb-8 text-center">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             LOINC Term Search
//           </h1>
//           <p className="text-gray-600">
//             Search for Logical Observation Identifiers Names and Codes
//           </p>
//         </div>

//         {/* Search Section */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
//           <div className="flex gap-3 mb-4">
//             <div className="flex-1 relative">
//               <input
//                 type="text"
//                 value={searchCode}
//                 onChange={(e) => setSearchCode(e.target.value)}
//                 onKeyPress={handleKeyPress}
//                 placeholder="Enter LOINC code (e.g., 33747-0)"
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                 disabled={loading}
//               />
//               <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
//             </div>
//             <button
//               onClick={() => handleSearch()}
//               disabled={loading || !searchCode.trim()}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   Searching...
//                 </>
//               ) : (
//                 <>
//                   <Search className="h-4 w-4" />
//                   Search
//                 </>
//               )}
//             </button>
//           </div>

//           {/* Search History */}
//           {searchHistory.length > 0 && !loading && (
//             <div className="border-t pt-4">
//               <p className="text-sm text-gray-600 mb-2">Recent searches:</p>
//               <div className="flex flex-wrap gap-2">
//                 {searchHistory.map((item, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSearch(item.code)}
//                     className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
//                   >
//                     {item.code}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="bg-white rounded-lg shadow-lg p-8 text-center">
//             <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
//             <p className="text-gray-600">Searching for LOINC code...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//             <div className="flex items-center gap-3">
//               <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
//               <div>
//                 <p className="text-red-800 font-medium">Search Error</p>
//                 <p className="text-red-600 text-sm">{error}</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Results Section */}
//         {data && !loading && (
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//             {/* Header with clear button */}
//             <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 flex justify-between items-center">
//               <div>
//                 <h2 className="text-xl font-bold text-white">LOINC Details</h2>
//                 <p className="text-blue-100 text-sm">Code: {currentCode}</p>
//               </div>
//               <button
//                 onClick={clearResults}
//                 className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-sm"
//               >
//                 Clear Results
//               </button>
//             </div>

//             {/* Data Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <tbody>
//                   {fields.map((field, index) => {
//                     const value = data[field.key];
//                     const hasValue = value && value.toString().trim() !== '';
                    
//                     return (
//                       <tr key={field.key} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
//                         <td className="px-6 py-4 font-medium text-gray-900 border-r border-gray-200 w-1/3">
//                           {field.label}
//                         </td>
//                         <td className="px-6 py-4 text-gray-700">
//                           {hasValue ? (
//                             <span className="break-words">
//                               {field.key === 'RELATEDNAMES2' && value.includes(';') ? (
//                                 <div className="flex flex-wrap gap-1">
//                                   {value.split(';').map((name, idx) => (
//                                     <span
//                                       key={idx}
//                                       className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
//                                     >
//                                       {name.trim()}
//                                     </span>
//                                   ))}
//                                 </div>
//                               ) : (
//                                 value
//                               )}
//                             </span>
//                           ) : (
//                             <span className="text-gray-400 italic">Not available</span>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>

//             {/* Footer */}
//             <div className="bg-gray-50 px-6 py-4 border-t">
//               <div className="flex items-center justify-between text-sm text-gray-600">
//                 <span>Last updated: {new Date().toLocaleString()}</span>
//                 <a
//                   href={`https://loinc.org/search/?t=1&s=${encodeURIComponent(currentCode)}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
//                 >
//                   View on LOINC.org
//                   <ExternalLink className="h-3 w-3" />
//                 </a>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Help Section */}
//         {!data && !loading && !error && (
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-3">How to use</h3>
//             <div className="space-y-2 text-gray-600 text-sm">
//               <p>• Enter a LOINC code (e.g., 33747-0) in the search box above</p>
//               <p>• Press Enter or click the Search button to retrieve details</p>
//               <p>• Use recent searches for quick access to previously searched codes</p>
//               <p>• LOINC codes are standardized identifiers for medical laboratory observations</p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }