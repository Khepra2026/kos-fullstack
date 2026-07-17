import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  articleId?: string;
}

interface State {
  hasError: boolean;
  errorName?: string;
  errorMessage?: string;
}

/**
 * Error Boundary for article pages — catches render crashes and shows a graceful
 * fallback instead of a blank page. Now with granular section-level recovery.
 */
export class ArticleErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      errorName: error?.name ?? 'UnknownError',
      errorMessage: error?.message ?? 'Unknown error',
    };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error(
      '[ArticleErrorBoundary] Render crash on article',
      this.props.articleId,
      '\nError:', error?.name, error?.message,
      '\nStack:', info?.componentStack?.slice(0, 500)
    );
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-32 text-center">
          <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mb-6">
            <i className="ri-article-line text-4xl text-gray-400"></i>
          </div>
          <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
            Erreur de chargement
          </h1>
          <p className="text-gray-500 mb-2 max-w-md">
            Une erreur s&apos;est produite lors de l&apos;affichage de cet article.
          </p>
          {this.props.articleId && (
            <p className="text-xs text-gray-400 mb-2 font-mono">
              Article ID : {this.props.articleId}
            </p>
          )}
          {this.state.errorName && this.state.errorName !== 'UnknownError' && (
            <p className="text-xs text-gray-300 mb-8 font-mono">
              {this.state.errorName}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button
              onClick={() => {
                if (window.REACT_APP_NAVIGATE) {
                  window.REACT_APP_NAVIGATE('/blog');
                } else {
                  window.location.assign('/blog/');
                }
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-amber-700 transition-all cursor-pointer"
            >
              <i className="ri-arrow-left-line"></i>
              Retour au blog
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-full font-semibold hover:border-amber-400 hover:text-amber-700 transition-all cursor-pointer"
            >
              <i className="ri-refresh-line"></i>
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ArticleErrorBoundary;