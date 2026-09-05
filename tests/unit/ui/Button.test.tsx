import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from '../../../packages/ui/src/components/Button';

describe('Button Accessibility Unit Tests', () => {
  it('renders with accessible role and label', () => {
    render(<Button aria-label="Learn Santhali">Click Me</Button>);
    const btn = screen.getByRole('button', { name: /Learn Santhali/i });
    expect(btn).toBeDefined();
  });

  it('renders disabled state with proper attribute', () => {
    render(<Button disabled>Disabled Action</Button>);
    const btn = screen.getByRole('button');
    expect(btn).toHaveProperty('disabled', true);
  });
});
