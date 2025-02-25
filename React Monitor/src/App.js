import React from "react";
import TableStatus from "./components/table-status"; // Import the TableStatus component
import './App.css';

function App() {
    return (
        <div style={{
            textAlign: "center",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            /*height: "100vh"*/
        }}>
            <h1>🏓 Tennis Table Status</h1>
            <TableStatus />

            {/* Table Image */}
            <img
                src="/table-tennis-green.png"
                alt="Tennis Table"
                className="tennis-table"
            />

            <a href="https://revolut.me/borislvwiq" target="_blank">
                <img src="../buy-me-a-beer.png" alt="Buy Me A Beer" className="buy-me-a-beer" /></a>
            {/* Status Component */}
        </div>
    );
}

export default App;
