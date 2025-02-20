import { useState, useEffect } from "react";
import { database, ref, onValue, remove } from "../firebase";
import { set, get } from "firebase/database";

function TableStatus() {
    const [status, setStatus] = useState("Loading...");
    const [hitCount, setHitCount] = useState(0);

    useEffect(() => {
        const eventsRef = ref(database, "ball_events");
        const eventsTimeStampRef = ref(database, "ball_events_timestamp");

        onValue(eventsRef, (snapshot) => {
            //let oldEvents = [];

            if (snapshot.exists()) {

                // Get the current timestamp
                const timestamp = Date.now(); // Milliseconds since epoch

                // Define the key as "timestamp_{timestamp}"
                const key = `event_${timestamp}`;

                // Write data to Firebase
                set(ref(database, `ball_events_timestamp/${key}/record`), {
                    event: "ball detected",
                    timestamp: timestamp
                });

                remove(ref(database, "ball_events"))
                    .then(() => console.log("Database reset successful"))
                    .catch((error) => console.error("Error resetting database:", error));
            }

            //oldEvents.forEach((eventRef) => remove(eventRef));
        });

        onValue(eventsTimeStampRef, (snapshot) => {
            const now = Date.now();
            const twoMinutesAgo = now - 120000; // 2 minutes in milliseconds

            let isPlaying = false;
            let oldEvents = [];
            let timestamps = [];

            if (snapshot.exists()) {
                snapshot.forEach((child) => {
                    const record = child.val().record;

                    if (record.timestamp >= twoMinutesAgo) {
                        isPlaying = true;
                    } else {
                        oldEvents.push(child.ref); // Collect old events for deletion
                    }

                    timestamps.push(record.timestamp);
                });
            }

            processBallEvents(timestamps);

            //setStatus(isPlaying ? "🎾 Playing!" : "✅ Free");

            // Delete old events
            oldEvents.forEach((eventsTimeStampRef) => remove(eventsTimeStampRef));
        });

        //setInterval(() => {

        //    const now = Date.now();
        //    const twoMinutesAgo = now - 120000; // 2 minutes in milliseconds

        //    let oldEvents = [];
        //    let timestamps = [];

        //    get(eventsTimeStampRef).then((snapshot) => {
        //        if (snapshot.exists()) {
        //            snapshot.forEach((child) => {
        //                const record = child.val().record;

        //                if (record.timestamp < twoMinutesAgo)
        //                    oldEvents.push(child.ref); // Collect old events for deletion

        //                timestamps.push(record.timestamp);
        //            });
        //        }
        //    });

        //    processBallEvents(timestamps);

        //    // Delete old events
        //    oldEvents.forEach((eventsTimeStampRef) => remove(eventsTimeStampRef));
        //}, 10000);

    }, []);

    const processBallEvents = (timestamps) => {
        //if (!timestamps.length) return;

        // 🔹 Sort timestamps
        timestamps.sort((a, b) => a - b);

        // 🔹 Group into 5-second intervals
        const groupedEvents = {};
        timestamps.forEach(ts => {
            const groupKey = Math.floor(ts / 1000); // Group by 5-second windows
            if (!groupedEvents[groupKey]) {
                groupedEvents[groupKey] = ts; // Keep only one event per window
            }
        });

        // 🔹 Get valid events
        const filteredEvents = Object.values(groupedEvents);

        // 🔹 Check last 2 minutes
        const now = Date.now();
        const twoMinutesAgo = now - 120000;
        const recentHits = filteredEvents.filter(ts => ts >= twoMinutesAgo);

        // 🔹 Update state
        setHitCount(recentHits.length);

        if (recentHits.length > 10)
            setStatus("🎾 Playing!");
        else
            setStatus("✅ Free");
    };

    return (
        <div style={{ textAlign: "center", fontSize: "24px", marginTop: "20px" }}>
            <p>Valid hits in last 2 min: <strong>{hitCount}</strong></p>
            <h1>{status}</h1>
        </div>
    );
}

export default TableStatus;
