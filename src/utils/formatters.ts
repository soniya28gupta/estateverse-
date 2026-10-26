import { MortgageInputs, MortgageResults } from '../types/property';

/**
 * Formats a number to Indian Rupee currency standard
 * e.g., 18500000 -> ₹1.85 Cr, 9500000 -> ₹95 Lakh, 58000 -> ₹58,000
 */
export function formatINR(amount: number, compact: boolean = true): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';

  if (!compact) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  if (amount >= 10000000) {
    const cr = amount / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100000) {
    const lakh = amount / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, '')} Lakh`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Standard Reducing Balance EMI calculation
 */
export function calculateMortgage(inputs: MortgageInputs): MortgageResults {
  const propertyPrice = Math.max(0, inputs.propertyPrice || 0);
  const downPaymentPercent = Math.min(100, Math.max(0, inputs.downPaymentPercent || 20));
  const annualInterestRate = Math.max(0.1, inputs.annualInterestRate || 8.5);
  const tenureYears = Math.max(1, inputs.tenureYears || 20);
  const additionalExpensesPercent = Math.max(0, inputs.additionalExpensesPercent || 6); // Stamp duty, registration, etc.

  const downPaymentAmount = Math.round((propertyPrice * downPaymentPercent) / 100);
  const loanPrincipal = Math.max(0, propertyPrice - downPaymentAmount);

  const monthlyRate = annualInterestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  let monthlyEMI = 0;
  if (loanPrincipal > 0 && monthlyRate > 0) {
    const factor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyEMI = Math.round((loanPrincipal * monthlyRate * factor) / (factor - 1));
  }

  const totalRepayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalRepayment - loanPrincipal);
  const additionalExpensesAmount = Math.round((propertyPrice * additionalExpensesPercent) / 100);
  const initialCashRequirement = downPaymentAmount + additionalExpensesAmount;

  return {
    downPaymentAmount,
    loanPrincipal,
    monthlyEMI,
    totalInterest,
    totalRepayment,
    additionalExpensesAmount,
    initialCashRequirement
  };
}

/**
 * Storage helpers for guest persistence
 */
const FAVORITES_KEY = 'estateverse_favorites_v1';
const SAVED_SEARCHES_KEY = 'estateverse_saved_searches_v1';

export function getStoredFavorites(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : ['indore-villa-01'];
  } catch {
    return ['indore-villa-01'];
  }
}

export function saveStoredFavorites(ids: string[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch (err) {
    console.warn('Could not save favorites to localStorage', err);
  }
}

export function getStoredSearches(): Array<{ id: string; query: string; timestamp: string }> {
  try {
    const raw = localStorage.getItem(SAVED_SEARCHES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredSearch(query: string): void {
  try {
    const current = getStoredSearches();
    const updated = [
      { id: Date.now().toString(), query, timestamp: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) },
      ...current.filter(s => s.query !== query).slice(0, 9)
    ];
    localStorage.setItem(SAVED_SEARCHES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save search to localStorage', err);
  }
}
