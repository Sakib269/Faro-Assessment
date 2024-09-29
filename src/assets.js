import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const AssetList = () => {
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [capFilter, setCapFilter] = useState('all');
    const [industryFilter, setIndustryFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const apiKey = 'crs7jkhr01qvrlsu28e0crs7jkhr01qvrlsu28eg'; 

    const stocks = [
        { symbol: 'AAPL', cap: 'high', industry: 'tech' },
        { symbol: 'JPM', cap: 'high', industry: 'finance' },
        { symbol: 'AMZN', cap: 'high', industry: 'consumer' },
        { symbol: 'JNJ', cap: 'high', industry: 'healthcare' },
        { symbol: 'XOM', cap: 'high', industry: 'energy' },
        { symbol: 'ZM', cap: 'mid', industry: 'tech' },
        { symbol: 'FITB', cap: 'mid', industry: 'finance' },
        { symbol: 'DKS', cap: 'mid', industry: 'consumer' },
        { symbol: 'PEL', cap: 'mid', industry: 'healthcare' },
        { symbol: 'MUR', cap: 'mid', industry: 'energy' },
        { symbol: 'CMBM', cap: 'low', industry: 'tech' },
        { symbol: 'FFWM', cap: 'low', industry: 'finance' },
        { symbol: 'BKE', cap: 'low', industry: 'consumer' },
        { symbol: 'AMPH', cap: 'low', industry: 'healthcare' },
        { symbol: 'NBR', cap: 'low', industry: 'energy' },
    ];

    useEffect(() => {
        const fetchRealTimeData = async () => {
            try {
                const fetchedAssets = await Promise.all(
                    stocks.map(async (stock) => {
                        const response = await axios.get(
                            `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${apiKey}`
                        );

                        const stockData = response.data;
                        return {
                            symbol: stock.symbol,
                            cap: stock.cap,
                            industry: stock.industry,
                            open: stockData.o,
                            high: stockData.h,
                            low: stockData.l,
                            current: stockData.c,
                            previousClose: stockData.pc,
                        };
                    })
                );

                setAssets(fetchedAssets);
                setFilteredAssets(fetchedAssets);
                setLoading(false);
            } catch (err) {
                setError('Error fetching data');
                setLoading(false);
            }
        };

        fetchRealTimeData();
    }, []);
    useEffect(() => {
        let filtered = assets;

        if (capFilter !== 'all') {
            filtered = filtered.filter(asset => asset.cap === capFilter);
        }

        if (industryFilter !== 'all') {
            filtered = filtered.filter(asset => asset.industry === industryFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(
                asset =>
                    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }



        
        if (sortConfig.key) {
            filtered.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }

        setFilteredAssets(filtered);
    }, [capFilter, industryFilter, searchQuery, assets, sortConfig]);

    useEffect(() => {
        return () => {
            localStorage.removeItem('isLoggedIn');
        };
    }, []);



    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-700 p-4">
            <h2 className="text-3xl font-bold text-white mb-8">Real-Time Stock Data</h2>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-5xl">
                <div className="flex justify-between mb-6 space-x-4">
                    <select
                        className="border border-gray-300 rounded-md p-2 w-full"
                        onChange={(e) => setCapFilter(e.target.value)}
                    >
                        <option value="all">All Market Caps</option>
                        <option value="high">High Cap</option>
                        <option value="mid">Mid Cap</option>
                        <option value="low">Low Cap</option>
                    </select>
                    <select
                        className="border border-gray-300 rounded-md p-2 w-full"
                        onChange={(e) => setIndustryFilter(e.target.value)}
                    >
                        <option value="all">All Industries</option>
                        <option value="tech">Tech</option>
                        <option value="finance">Finance</option>
                        <option value="consumer">Consumer</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="energy">Energy</option>
                    </select>
                    <input
                        type="text"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        placeholder="Search by Name"
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-spacing-2">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th
                                    className="px-4 py-3 text-center cursor-pointer"
                                    onClick={() => requestSort('symbol')}
                                >
                                    Name
                                </th>
                                <th
                                    className="px-4 py-3 text-center cursor-pointer"
                                    onClick={() => requestSort('open')}
                                >
                                    Open
                                </th>
                                <th
                                    className="px-4 py-3 text-center cursor-pointer"
                                    onClick={() => requestSort('high')}
                                >
                                    High
                                </th>
                                <th
                                    className="px-4 py-3 text-center cursor-pointer"
                                    onClick={() => requestSort('low')}
                                >
                                    Low
                                </th>
                                <th
                                    className="px-4 py-3 text-center cursor-pointer"
                                    onClick={() => requestSort('current')}
                                >
                                    Current Price
                                </th>
                                <th
                                    className="px-4 py-3 text-center cursor-pointer"
                                    onClick={() => requestSort('previousClose')}
                                >
                                    Previous Close
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAssets.map((asset, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-blue-100`}
                                >
                                    <td className="border px-4 py-3 text-center">{asset.symbol}</td>
                                    <td className="border px-4 py-3 text-center">{asset.open}</td>
                                    <td className="border px-4 py-3 text-center">{asset.high}</td>
                                    <td className="border px-4 py-3 text-center">{asset.low}</td>
                                    <td className="border px-4 py-3 text-center">{asset.current}</td>
                                    <td className="border px-4 py-3 text-center">{asset.previousClose}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AssetList;
