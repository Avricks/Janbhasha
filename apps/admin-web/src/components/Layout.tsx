import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAdminAuthStore } from '../stores/authStore';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user, logout } = useAdminAuthStore();

  const navItems = [
    { label: 'Platform Analytics', path: '/' },
    { label: 'User Management', path: '/users' },
    { label: 'Content Moderation', path: '/content' },
    { label: 'Linguistic Reports', path: '/analytics' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#1E1B4B',
          color: '#FFFFFF',
          padding: '24px 16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#A5B4FC', marginBottom: '32px' }}>
            Janbhasha Admin
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    color: active ? '#FFFFFF' : '#C7D2FE',
                    backgroundColor: active ? '#4F46E5' : 'transparent',
                    fontWeight: active ? '600' : 'normal',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div style={{ borderTop: '1px solid #3730A3', paddingTop: '16px' }}>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{user?.name}</div>
          <div style={{ fontSize: '12px', color: '#A5B4FC', marginBottom: '12px' }}>{user?.role}</div>
          <button
            onClick={logout}
            style={{
              padding: '6px 12px',
              backgroundColor: '#3730A3',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, backgroundColor: '#F5F3FF', padding: '32px' }}>
        {children}
      </main>
    </div>
  );
};
