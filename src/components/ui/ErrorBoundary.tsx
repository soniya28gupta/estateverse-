import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  name?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(`[ErrorBoundary caught in ${this.props.name || 'Component'}]:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <div className="p-6 rounded-2xl bg-midnight-900 border border-stone-800 text-center text-stone-300">
          <p className="text-sm font-semibold text-gold-300 mb-1">Preview Component Fallback</p>
          <p className="text-xs text-stone-400">Content displayed in standard high-performance mode.</p>
        </div>
      );
    }

    return this.props.children;
  }
}
