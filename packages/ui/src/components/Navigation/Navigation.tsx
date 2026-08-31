import React, { forwardRef, useCallback, useMemo, useRef, useEffect } from 'react';
import './Navigation.css';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: number | string;
  ariaLabel?: string;
  onClick?: () => void;
  children?: NavigationItem[];
  disabled?: boolean;
  ariaCurrentPage?: boolean;
}

export interface NavigationProps {
  items: NavigationItem[];
  activeItemId?: string;
  variant?: 'horizontal' | 'vertical';
  onItemClick?: (itemId: string) => void;
  ariaLabel?: string;
  role?: 'navigation' | 'menubar';
  theme?: 'light' | 'dark';
  breakpoint?: number; // px width when mobile menu appears
  className?: string;
}

export const Navigation = forwardRef<HTMLNavElement, NavigationProps>(
  (
    {
      items,
      activeItemId,
      variant = 'horizontal',
      onItemClick,
      ariaLabel = 'Main navigation',
      role = 'navigation',
      theme = 'light',
      breakpoint = 768,
      className = '',
    },
    ref,
  ) => {
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);
    const [isWideScreen, setIsWideScreen] = React.useState(
      typeof window !== 'undefined' ? window.innerWidth > breakpoint : true,
    );
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

    // Handle window resize
    useEffect(() => {
      const handleResize = () => {
        const wide = window.innerWidth > breakpoint;
        setIsWideScreen(wide);
        if (wide) {
          setIsMobileOpen(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    // Close mobile menu on escape
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isMobileOpen) {
          setIsMobileOpen(false);
          menuButtonRef.current?.focus();
        }
      };

      if (isMobileOpen) {
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
      }
    }, [isMobileOpen]);

    // Close mobile menu on click outside
    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          isMobileOpen &&
          mobileMenuRef.current &&
          !mobileMenuRef.current.contains(e.target as Node) &&
          !menuButtonRef.current?.contains(e.target as Node)
        ) {
          setIsMobileOpen(false);
        }
      };

      if (isMobileOpen) {
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
      }
    }, [isMobileOpen]);

    const handleItemClick = useCallback(
      (itemId: string, callback?: () => void) => {
        onItemClick?.(itemId);
        callback?.();
        if (!isWideScreen) {
          setIsMobileOpen(false);
        }
      },
      [onItemClick, isWideScreen],
    );

    const renderNavItem = (item: NavigationItem, depth: number = 0) => {
      const isActive = activeItemId === item.id;
      const hasChildren = item.children && item.children.length > 0;

      return (
        <li
          key={item.id}
          className={`nav-item nav-depth-${depth} ${isActive ? 'active' : ''} ${
            item.disabled ? 'disabled' : ''
          }`}
          role={role === 'menubar' && depth > 0 ? 'none' : undefined}
        >
          {item.href ? (
            <a
              href={item.href}
              className="nav-link"
              aria-current={isActive ? 'page' : undefined}
              aria-label={item.ariaLabel}
              onClick={(e) => {
                if (item.onClick) {
                  e.preventDefault();
                  handleItemClick(item.id, item.onClick);
                } else {
                  handleItemClick(item.id);
                }
              }}
              role={role === 'menubar' && depth === 0 ? 'menuitem' : undefined}
              aria-disabled={item.disabled}
              tabIndex={item.disabled ? -1 : 0}
            >
              {item.icon && <span className="nav-icon">{item.icon}</span>}
              <span className="nav-label">{item.label}</span>
              {item.badge && (
                <span
                  className="nav-badge"
                  aria-label={`${item.label}: ${item.badge} unread`}
                >
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span className="nav-chevron" aria-hidden="true">
                  ▼
                </span>
              )}
            </a>
          ) : (
            <button
              type="button"
              className="nav-link"
              aria-label={item.ariaLabel || item.label}
              onClick={() => handleItemClick(item.id, item.onClick)}
              disabled={item.disabled}
              aria-current={isActive ? 'page' : undefined}
              role={role === 'menubar' && depth === 0 ? 'menuitem' : undefined}
              aria-expanded={hasChildren ? undefined : false}
              aria-haspopup={hasChildren ? 'menu' : undefined}
            >
              {item.icon && <span className="nav-icon">{item.icon}</span>}
              <span className="nav-label">{item.label}</span>
              {item.badge && (
                <span
                  className="nav-badge"
                  aria-label={`${item.label}: ${item.badge} unread`}
                >
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <span className="nav-chevron" aria-hidden="true">
                  ▼
                </span>
              )}
            </button>
          )}

          {hasChildren && depth < 2 && (
            <ul className="nav-submenu" role={role === 'menubar' ? 'menu' : undefined}>
              {item.children?.map((child) => renderNavItem(child, depth + 1))}
            </ul>
          )}
        </li>
      );
    };

    const showMobileMenu = !isWideScreen;
    const mobileMenuItems = showMobileMenu ? items : [];
    const desktopMenuItems = !showMobileMenu ? items : items.slice(0, 3); // Show first 3 items on desktop

    return (
      <nav
        ref={ref}
        className={`navigation navigation-${variant} navigation-${theme} ${className}`}
        aria-label={ariaLabel}
        role={role}
      >
        {/* Mobile Menu Button */}
        {showMobileMenu && (
          <button
            ref={menuButtonRef}
            className="nav-mobile-button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileOpen}
            aria-controls="mobile-menu"
          >
            <span className="nav-hamburger">
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
              <span className="nav-hamburger-line" />
            </span>
          </button>
        )}

        {/* Desktop Menu */}
        {!showMobileMenu && (
          <ul className="nav-list" role={role === 'menubar' ? 'menubar' : undefined}>
            {desktopMenuItems.map((item) => renderNavItem(item, 0))}
          </ul>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div
            ref={mobileMenuRef}
            className={`nav-mobile-menu ${isMobileOpen ? 'open' : ''}`}
            id="mobile-menu"
          >
            <ul className="nav-list" role={role === 'menubar' ? 'menubar' : undefined}>
              {mobileMenuItems.map((item) => renderNavItem(item, 0))}
            </ul>
          </div>
        )}
      </nav>
    );
  },
);

Navigation.displayName = 'Navigation';

export default Navigation;
