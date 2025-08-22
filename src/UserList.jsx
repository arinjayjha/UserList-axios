import React, { useEffect, useState } from "react";
import axios from "axios";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.get("https://jsonplaceholder.typicode.com/users");

            setUsers(res.data);
        } catch (err) {
            setError("Failed to fetch users. Check API URL.");
        } finally {
            setLoading(false);
        }
    };

    // Run once on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="user-card">
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && !error && (
                <>
                    <ul className="user-list">
                        {users.map((u) => (
                            <li key={u.id} className="user-item">
                                <strong>{u.name}</strong> <br />
                                <span>{u.email}</span>
                            </li>
                        ))}
                    </ul>

                    <button onClick={fetchUsers}>Refresh</button>
                </>
            )}
        </div>
    );
}
