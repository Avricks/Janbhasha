import React from 'react';

export const DashboardPage: React.FC = () => {
  const metrics = [
    { label: 'Total Enrolled Learners', value: '14,280' },
    { label: 'Verified Educators', value: '312' },
    { label: 'Offline Sync Requests (24h)', value: '8,940' },
    { label: 'Regional Lessons Published', value: '540' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E1B4B', marginBottom: '8px' }}>
        Statewide Pedagogy Administration
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '24px' }}>
        Janbhasha Vernacular Learning Ecosystem across Jharkhand districts.
      </p>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#4F46E5' }}>{m.value}</div>
            <div style={{ color: '#6B7280', fontSize: '13px', marginTop: '4px' }}>{m.label}</div>
          </div>
        ))}
      </div>

      {/* Language breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
        {[
          { lang: 'Santhali (Ol Chiki)', active: '8,420 learners', rate: '94% Retention' },
          { lang: 'Mundari (Warang Citi)', active: '3,210 learners', rate: '89% Retention' },
          { lang: 'Ho (Devanagari/Warang)', active: '2,650 learners', rate: '91% Retention' },
        ].map((item) => (
          <div
            key={item.lang}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #4F46E5',
            }}
          >
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{item.lang}</h3>
            <div style={{ color: '#4F46E5', fontWeight: '600' }}>{item.active}</div>
            <div style={{ color: '#16A34A', fontSize: '14px', marginTop: '4px' }}>{item.rate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
