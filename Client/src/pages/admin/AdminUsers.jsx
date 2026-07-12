import React, { useEffect, useState } from 'react';
import API from '../../services/axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        // Request the correct backend endpoint
        const response = await API.get('/client/getclients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 

        // GetClient controller returns { success: true, message: "...", data: [ ...clients ] }
        setUsers(response.data.data || []);

      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch clients');
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
      {/* Added color: '#fff' here just in case your header text is also inheriting something weird */}
      <h2 style={{ marginBottom: '20px', color: '#fff' }}>Manage Users</h2>
      
      {users.length === 0 ? (
        <p style={{ color: '#fff' }}>No client records found in database.</p>
      ) : (
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          backgroundColor: '#fff', 
          color: '#333', /* 🟢 FIX: Forces the table text to be dark grey */
          borderRadius: '8px', 
          overflow: 'hidden' 
        }}>
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
                <td style={{ padding: '12px' }}>{client.fullname || 'N/A'}</td>
                <td style={{ padding: '12px' }}>{client.email}</td>
                <td style={{ padding: '12px' }}>{client._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminUsers;