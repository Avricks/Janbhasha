import React, { useState } from 'react';

export const LessonsPage: React.FC = () => {
  const [lessons] = useState([
    { id: '1', title: 'Lesson 1: Ol Chiki Vowels', native: 'ᱞᱮᱥᱚᱱ ᱑: ᱨᱟᱦᱟ ᱟᱲᱟᱝ', students: 48, status: 'Published' },
    { id: '2', title: 'Lesson 2: Consonants (Part 1)', native: 'ᱞᱮᱥᱚᱱ ᱒: ᱠᱮᱪᱮᱫ ᱟᱲᱟᱝ', students: 44, status: 'Published' },
    { id: '3', title: 'Lesson 3: Daily Conversation', native: 'ᱞᱮᱥᱚᱱ ᱓: ᱫᱤᱱᱟᱹᱢ ᱨᱚᱲ', students: 39, status: 'Draft' },
  ]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>Lesson Management</h1>
          <p style={{ color: '#64748B' }}>Create and manage pedagogical content for tribal regional languages.</p>
        </div>
        <button
          style={{
            padding: '10px 18px',
            backgroundColor: '#0284C7',
            color: '#FFFFFF',
            borderRadius: '6px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          + Create New Lesson
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {lessons.map((les) => (
          <div
            key={les.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderTop: '4px solid #0284C7',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: les.status === 'Published' ? '#DCFCE7' : '#FEF9C3',
                color: les.status === 'Published' ? '#15803D' : '#A16207',
                marginBottom: '12px',
              }}
            >
              {les.status}
            </span>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0F172A', marginBottom: '4px' }}>{les.title}</h3>
            <p style={{ color: '#0284C7', fontSize: '15px', fontWeight: '500', marginBottom: '16px' }}>{les.native}</p>
            <div style={{ color: '#64748B', fontSize: '14px', borderTop: '1px solid #E2E8F0', paddingTop: '12px' }}>
              Enrolled: {les.students} Students
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
