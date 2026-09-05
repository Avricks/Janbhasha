import React from 'react';

export const DashboardPage: React.FC = () => {
  const stats = [
    { label: 'Active Students', value: '48' },
    { label: 'Classes Handled', value: '2' },
    { label: 'Avg Attendance', value: '92%' },
    { label: 'Lessons Completed', value: '340' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>
        Educator Dashboard
      </h1>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>
        Monitoring Santhali (Ol Chiki) pedagogy for Dumka Class 5 & 6.
      </p>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {stats.map((s) => (
          <div
            key={s.label}
            style={{
              backgroundColor: '#FFFFFF',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#0284C7' }}>{s.value}</div>
            <div style={{ color: '#64748B', fontSize: '14px', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Class Activity */}
      <div style={{ backgroundColor: '#FFFFFF', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>Recent Student Submissions</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B' }}>
              <th style={{ padding: '12px' }}>Student</th>
              <th style={{ padding: '12px' }}>Lesson</th>
              <th style={{ padding: '12px' }}>Score</th>
              <th style={{ padding: '12px' }}>Submitted</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'Sita Soren', lesson: 'Ol Chiki Basics: Vowels', score: '95%', time: '20 mins ago' },
              { name: 'Birsa Marandi', lesson: 'Santhali Counting 1-10', score: '88%', time: '1 hour ago' },
              { name: 'Anjali Hembrom', lesson: 'Greetings & Expressions', score: '100%', time: '3 hours ago' },
            ].map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px', fontWeight: '500' }}>{row.name}</td>
                <td style={{ padding: '12px', color: '#0284C7' }}>{row.lesson}</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#16A34A' }}>{row.score}</td>
                <td style={{ padding: '12px', color: '#64748B' }}>{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
