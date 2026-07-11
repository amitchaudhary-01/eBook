import React, { useEffect, useState } from 'react';
import API from '../../services/axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/client/me'); 
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const result = await response.json();
        
        // Extract the array from result.data
        setUsers(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading clients...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>;

  return (
    <div style={{ padding: '20px', width: '100%' }}>
      <h2 style={{ marginBottom: '20px' }}>Manage Users</h2>
      
      {users.length === 0 ? (
        <p>No client records found in database.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr style={{ backgroundColor: '#f4f4f4', textAlign: 'left', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Email</th>
              <th style={{ padding: '12px' }}>ID</th>
            </tr>
          </thead>
          <tbody>
            {users.map((client) => (
              <tr key={client._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '12px' }}>{client.name || client.username || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{client.email}</td>
                <td style={{ padding: '12px' }}>{client._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminUsers;