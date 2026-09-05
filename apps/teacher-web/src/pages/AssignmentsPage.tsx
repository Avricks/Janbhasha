import React from 'react';

export const AssignmentsPage: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F172A' }}>Assignments & Worksheets</h1>
          <p style={{ color: '#64748B' }}>Distribute homework quizzes and audio pronunciation exercises.</p>
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
          + Assign Homework
        </button>
      </div>

      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <p style={{ color: '#64748B' }}>No pending grading required. All student responses have been auto-graded.</p>
      </div>
    </div>
  );
};
