// src/components/TransactionTable.js
import React from 'react';
import './TransactionTable.css';

const TransactionTable = ({ transactions, search, setSearch, page, setPage }) => {
    const handleSearchChange = (e) => setSearch(e.target.value);
    const handleNextPage = () => setPage(page + 1);
    const handlePrevPage = () => setPage(page > 1 ? page - 1 : 1);

    return (
        <div className="transaction-table-container">
            <h2>Transactions</h2>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={search}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button className="clear-btn" onClick={() => setSearch('')}>Clear Search</button>
            </div>
            <div className="table-wrapper">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Sold</th>
                            <th>Image</th>
                            <th>Date of Sale</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <tr key={transaction.id}>
                                <td>{transaction.title}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.price.toFixed(2)}</td>
                                <td>{transaction.sold ? 'Yes' : 'No'}</td>
                                <td>
                                    <img src={transaction.image} alt={transaction.title} className="transaction-image" />
                                </td>
                                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination-container">
                <button className="pagination-btn" onClick={handlePrevPage}>Previous</button>
                <button className="pagination-btn" onClick={handleNextPage}>Next</button>
            </div>
        </div>
    );
};

export default TransactionTable;
