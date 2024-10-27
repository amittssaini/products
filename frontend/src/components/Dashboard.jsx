
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import MonthDropdown from './Month'
// import TransactionTable from './TransactionTable'
// import Statistics from './statistics'
// import BarChartComponent from './BarChart'
// import PieChartComponent from './PieChart'
// const ENDPOINT = 'http://localhost:8082'

// const Dashboard = () => {
//     const [month, setMonth] = useState(3); // March by default
//     const [search, setSearch] = useState('');
//     const [transactions, setTransactions] = useState([]);
//     const [statistics, setStatistics] = useState({});
//     const [barChartData, setBarChartData] = useState([]);
//     const [pieChartData, setPieChartData] = useState([]);
//     const [page, setPage] = useState(1);

//     useEffect(() => {
//         fetchDashboardData();
//     }, [month, search, page]);

//     const fetchDashboardData = async () => {
//         try {
//             // Fetch combined data
//             const response = await axios.get('http://localhost:8082/transaction/combinedStats', {
//                 params: { month, search, page }
//             });
//           const transactionResp = await axios.get(`http://localhost:8082/transaction/`)
//             console.log('hello world')
//             console.log(response.data)
//             console.log('transaction data ', transactionResp.data.transactions)
            
//             setTransactions(transactionResp.data.transactions);
//             //console.log(transactions)
//             setStatistics(response.data.statistics);
//             setBarChartData(response.data.barChartData);
//             setPieChartData(response.data.pieChartData);
//         } catch (error) {
//             console.error("Error fetching dashboard data:", error);
//         }
//     };

//     const fetchTransactionTable=async()=>{
//         try {
//             const response = await axios.get('http://localhost:8082/transaction', {
//                 params: { page, perPage, search }
//             });
//             setTransactions(response.data.transactions);
//         } catch (error) {
//             console.error("Error fetching transaction data:", error);
//         }
//     }

//     return (
//         <div>
//             <h1>Transaction Dashboard</h1>
//             <MonthDropdown selectedMonth={month} onChange={(newMonth) => setMonth(newMonth)} />
//             <TransactionTable transactions={transactions} search={search} setSearch={setSearch} page={page} setPage={setPage} />
//             <Statistics statistics={statistics} />
//             <BarChartComponent data={barChartData} />
//             <PieChartComponent data={pieChartData} />
//         </div>
//     );
// };

// export default Dashboard;



// src/components/Dashboard.js


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MonthDropdown from './Month'
import TransactionTable from './TransactionTable'
import Statistics from './statistics'
import BarChartComponent from './BarChart'
import PieChartComponent from './PieChart'
import './Dashboard.css'

const Dashboard = () => {
    const [month, setMonth] = useState(5); // May by default
    const [search, setSearch] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [statistics, setStatistics] = useState({});
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10); // Items per page

    // Fetch statistics data when the selected month changes
    useEffect(() => {
        fetchStatisticsData();
    }, [month]);

    // Fetch transactions data when month, search, page, or perPage changes
    useEffect(() => {
        fetchTransactionData();
    }, [month, search, page, perPage]);

    // Fetch statistics, bar chart, and pie chart data
    const fetchStatisticsData = async () => {
        try {
            const response = await axios.get('https://products-1-i8s8.onrender.com/transaction/combinedStats', {
                params: { month }
            });
            setStatistics(response.data.statistics);
            setBarChartData(response.data.barChartData);
            setPieChartData(response.data.pieChartData);
        } catch (error) {
            console.error("Error fetching statistics data:", error);
        }
    };

    // Fetch paginated transaction data
    const fetchTransactionData = async () => {
        try {
            const response = await axios.get('https://products-1-i8s8.onrender.com/transaction', {
                params: { page, perPage, search, month }
            });
            setTransactions(response.data.transactions);
        } catch (error) {
            console.error("Error fetching transaction data:", error);
        }
    };

    return (
        <div className="dashboard-container">
            <h1>Transaction Dashboard</h1>
            <TransactionTable
                transactions={transactions}
                search={search}
                setSearch={setSearch}
                page={page}
                setPage={setPage}
            />
            <div className="month-dropdown-container">
                <label htmlFor="month-dropdown">Select Month:</label>
                <MonthDropdown selectedMonth={month} onChange={(newMonth) => setMonth(newMonth)} />
            </div>
            <Statistics statistics={statistics} />
            <BarChartComponent data={barChartData} />
            <PieChartComponent data={pieChartData} />
        </div>
    );
};

export default Dashboard;
