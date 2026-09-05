import React from 'react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E1B4B', marginBottom: '8px' }}>
        Linguistic & Sync Analytics
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '24px' }}>
        Deep insights into offline sync frequencies, network bandwidth utilization, and vocabulary retention curves.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Network Connectivity Distribution</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Offline First (No active connection)</span>
              <strong style={{ color: '#EA580C' }}>68%</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>2G / Edge Connectivity</span>
              <strong>21%</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>3G / 4G / Broadband</span>
              <strong style={{ color: '#16A34A' }}>11%</strong>
            </li>
          </ul>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Sync Conflict Metrics</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Sync Batches (30d)</span>
              <strong>142,500</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Auto-Resolved via LWW</span>
              <strong style={{ color: '#16A34A' }}>99.8%</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Flagged Conflicts</span>
              <strong style={{ color: '#0284C7' }}>0.2%</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
