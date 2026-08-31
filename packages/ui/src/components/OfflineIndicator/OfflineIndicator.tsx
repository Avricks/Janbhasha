/**
 * Janbhasha Offline Status Indicator Component
 * Provides clear feedback about network connectivity and sync status
 * 
 * Features:
 * - Non-intrusive design
 * - Clear status messages
 * - Sync progress indication
 * - Accessible alerts
 */

import React, { useEffect, useState } from 'react';
import './OfflineIndicator.css';

export interface OfflineIndicatorProps {
  // Status
  isOnline: boolean;
  lastSyncTime?: Date;
  syncInProgress?: boolean;
  syncProgress?: number; // 0-100
  
  // Customization
  position?: 'top' | 'bottom';
  theme?: 'light' | 'dark';
  autoHideDuration?: number; // ms, 0 = never auto-hide
}

/**
 * Offline Status Indicator Component
 * 
 * Usage:
 * const [isOnline, setIsOnline] = useState(navigator.onLine);
 * 
 * useEffect(() => {
 *   const handleOnline = () => setIsOnline(true);
 *   const handleOffline = () => setIsOnline(false);
 *   
 *   window.addEventListener('online', handleOnline);
 *   window.addEventListener('offline', handleOffline);
 *   
 *   return () => {
 *     window.removeEventListener('online', handleOnline);
 *     window.removeEventListener('offline', handleOffline);
 *   };
 * }, []);
 * 
 * <OfflineIndicator isOnline={isOnline} />
 */
const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  isOnline,
  lastSyncTime,
  syncInProgress = false,
  syncProgress = 0,
  position = 'top',
  theme = 'light',
  autoHideDuration = 3000,
}) => {
  const [visible, setVisible] = useState(!isOnline || syncInProgress);

  useEffect(() => {
    // Only show if offline or syncing
    if (!isOnline || syncInProgress) {
      setVisible(true);
      return;
    }

    // When online and not syncing, auto-hide after duration
    if (isOnline && !syncInProgress && autoHideDuration > 0) {
      const timer = setTimeout(() => setVisible(false), autoHideDuration);
      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isOnline, syncInProgress, autoHideDuration]);

  if (!visible && isOnline && !syncInProgress) {
    return null;
  }

  const getStatusMessage = (): { text: string; type: 'info' | 'success' | 'warning' } => {
    if (syncInProgress) {
      return {
        text: `Syncing... ${syncProgress}%`,
        type: 'info',
      };
    }

    if (!isOnline) {
      return {
        text: "You're offline - Changes saved locally and will sync when online",
        type: 'warning',
      };
    }

    if (lastSyncTime) {
      const timeAgo = getTimeAgo(lastSyncTime);
      return {
        text: `All changes synced (${timeAgo})`,
        type: 'success',
      };
    }

    return {
      text: 'Connected',
      type: 'success',
    };
  };

  const status = getStatusMessage();
  const className = [
    'offline-indicator',
    `offline-indicator--${position}`,
    `offline-indicator--${status.type}`,
    theme === 'dark' ? 'offline-indicator--dark' : '',
    visible ? 'offline-indicator--visible' : '',
    syncInProgress ? 'offline-indicator--syncing' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="offline-indicator__content">
        <span className="offline-indicator__icon" aria-hidden="true">
          {getStatusIcon(status.type, syncInProgress)}
        </span>
        
        <span className="offline-indicator__text">
          {status.text}
        </span>

        {syncInProgress && (
          <div className="offline-indicator__progress">
            <div
              className="offline-indicator__progress-bar"
              style={{ width: `${syncProgress}%` }}
              role="progressbar"
              aria-valuenow={syncProgress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Sync progress"
            />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Get appropriate icon based on status
 */
function getStatusIcon(type: string, syncing: boolean): string {
  if (syncing) {
    return '↻';
  }
  if (type === 'warning') {
    return '⚠';
  }
  if (type === 'success') {
    return '✓';
  }
  return 'ℹ';
}

/**
 * Format time as relative string
 */
function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) {
    return 'just now';
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default OfflineIndicator;
