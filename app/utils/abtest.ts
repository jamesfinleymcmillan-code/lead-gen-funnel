/**
 * A/B Testing Utility
 *
 * Handles variant assignment, persistence, and tracking
 */

export type Variant = 'variant_a' | 'variant_b';

/**
 * Get or assign the user's A/B test variant
 * Stores in localStorage for consistency across sessions
 */
export const getVariant = (): Variant => {
  if (typeof window === 'undefined') return 'variant_a';

  // Check if user already has a variant assigned
  const stored = localStorage.getItem('ab_test_variant');
  if (stored === 'variant_a' || stored === 'variant_b') {
    return stored;
  }

  // Assign new variant (50/50 split)
  const newVariant: Variant = Math.random() < 0.5 ? 'variant_a' : 'variant_b';
  localStorage.setItem('ab_test_variant', newVariant);

  return newVariant;
};

/**
 * Reset variant (for testing purposes)
 */
export const resetVariant = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('ab_test_variant');
  }
};

/**
 * Check if user is in a specific variant
 */
export const isVariant = (variant: Variant): boolean => {
  return getVariant() === variant;
};
