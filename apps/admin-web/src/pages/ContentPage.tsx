import React from 'react';

export const ContentPage: React.FC = () => {
  const pendingReviews = [
    { title: 'Santhali Folk Tales: Lesson 4', author: 'Priya Murmu', language: 'Santhali', script: 'Ol Chiki' },
    { title: 'Mundari Agriculture Vocabulary', author: 'Sanjay Munda', language: 'Mundari', script: 'Warang Citi' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E1B4B', marginBottom: '8px' }}>
        Content & Linguistic Moderation
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '24px' }}>
        Review submitted tribal language materials for cultural appropriateness and orthographic correctness.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {pendingReviews.map((item, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#1E1B4B', marginBottom: '4px' }}>{item.title}</h3>
              <p style={{ color: '#6B7280', fontSize: '14px' }}>
                Author: {item.author} • Language: {item.language} ({item.script})
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#16A34A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Approve & Publish
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                Request Revision
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
