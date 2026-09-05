import React from 'react';

export const StudentsPage: React.FC = () => {
  const students = [
    { id: '1', name: 'Sita Soren', grade: 'Class 5A', streak: '12 days', lessonsCompleted: 15, avgScore: '94%' },
    { id: '2', name: 'Birsa Marandi', grade: 'Class 5A', streak: '8 days', lessonsCompleted: 12, avgScore: '89%' },
    { id: '3', name: 'Anjali Hembrom', grade: 'Class 6B', streak: '15 days', lessonsCompleted: 18, avgScore: '96%' },
    { id: '4', name: 'Karan Murmu', grade: 'Class 6B', streak: '4 days', lessonsCompleted: 9, avgScore: '81%' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A', marginBottom: '8px' }}>
        Student Roster & Progress
      </h1>
      <p style={{ color: '#64748B', marginBottom: '24px' }}>
        Track attendance, streak motivation, and pedagogical mastery.
      </p>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', color: '#64748B' }}>
              <th style={{ padding: '12px' }}>Student Name</th>
              <th style={{ padding: '12px' }}>Class / Section</th>
              <th style={{ padding: '12px' }}>Streak</th>
              <th style={{ padding: '12px' }}>Lessons Done</th>
              <th style={{ padding: '12px' }}>Average Mastery</th>
            </tr>
          </thead>
          <tbody>
            {students.map((st) => (
              <tr key={st.id} style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '12px', fontWeight: '600' }}>{st.name}</td>
                <td style={{ padding: '12px', color: '#64748B' }}>{st.grade}</td>
                <td style={{ padding: '12px', color: '#EA580C', fontWeight: 'bold' }}>🔥 {st.streak}</td>
                <td style={{ padding: '12px' }}>{st.lessonsCompleted}</td>
                <td style={{ padding: '12px', fontWeight: 'bold', color: '#16A34A' }}>{st.avgScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
