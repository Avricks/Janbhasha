import React from 'react';

export const UsersPage: React.FC = () => {
  const users = [
    { id: '1', name: 'Ramesh Hembrom', role: 'Educator', district: 'Dumka', status: 'Active', joined: '2024-01-10' },
    { id: '2', name: 'Priya Murmu', role: 'Educator', district: 'Ranchi', status: 'Active', joined: '2024-01-15' },
    { id: '3', name: 'Sanjay Munda', role: 'Educator', district: 'Khunti', status: 'Active', joined: '2024-02-01' },
    { id: '4', name: 'Anil Ho', role: 'Content Creator', district: 'West Singhbhum', status: 'Pending Review', joined: '2024-02-12' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E1B4B', marginBottom: '8px' }}>
        User & Role Management
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '24px' }}>
        Manage platform accounts, educators, and content creator permissions.
      </p>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E5E7EB', color: '#6B7280' }}>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Role</th>
              <th style={{ padding: '12px' }}>District</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={{ borderBottom: '1px solid #E5E7EB' }}>
                <td style={{ padding: '12px', fontWeight: '600' }}>{u.name}</td>
                <td style={{ padding: '12px', color: '#4F46E5' }}>{u.role}</td>
                <td style={{ padding: '12px' }}>{u.district}</td>
                <td style={{ padding: '12px' }}>
                  <span
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      backgroundColor: u.status === 'Active' ? '#DCFCE7' : '#FEF9C3',
                      color: u.status === 'Active' ? '#15803D' : '#A16207',
                    }}
                  >
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '12px', color: '#6B7280' }}>{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
