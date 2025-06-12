
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center p-4">
          <div className="error-boundary rounded-lg p-8 max-w-md w-full text-center">
            <div className="error-icon text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-4 text-red-400">Системная ошибка</h1>
            <p className="text-red-300 mb-6">
              Произошла критическая ошибка в приложении. Попробуйте перезагрузить страницу.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="cyber-button px-6 py-3 text-red-400 border border-red-400/50 rounded hover:bg-red-400/10 transition-colors"
            >
              Перезагрузить
            </button>
            {this.state.error && (
              <details className="mt-4 text-left text-xs text-red-400/70">
                <summary className="cursor-pointer">Детали ошибки</summary>
                <pre className="mt-2 p-2 bg-black/30 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
