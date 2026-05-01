import { Component, type ErrorInfo, type ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, info.componentStack)
  }

  render() {
    if (!this.state.hasError) return this.props.children

    return (
      <div className="flex min-h-screen items-center justify-center bg-page p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-heading font-semibold text-dark">
            Something went wrong
          </h1>
          <p className="mt-2 text-sm text-muted">
            An unexpected error occurred. Please refresh the page to try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-dark px-6 text-sm font-medium text-white transition-colors hover:bg-dark/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }
}
