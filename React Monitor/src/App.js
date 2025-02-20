import React from "react";
import TableStatus from "./components/table-status"; // Import the TableStatus component

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
            <h1>🏓 Ping Pong Table Status</h1>
            <TableStatus />

            {/* Table Image */}
            <img 
                src="/table-tennis-green.png" 
                alt="Table Tennis Table"
                style={{ width: "50%", maxWidth: "600px", borderRadius: "10px" }}
            />

            <a href="https://revolut.me/borislvwiq" target="_blank">
                <img src="../buy-me-a-beer.png" alt="Buy Me A Beer" style={{ width: 180 + 'px', position: 'fixed', bottom: 20 + 'px', left: 50 + '%', transform: 'translate(-50%)' }} /></a>
            {/* Status Component */}
        </div>
    );
}

export default App;
