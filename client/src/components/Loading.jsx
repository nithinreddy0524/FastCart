import React from 'react'

const Loading = ({ small }) => {
  // small: if true render a compact spinner; else render full template
  if (small) {
    return (
      <div role="status" aria-live="polite" aria-busy="true" className="inline-flex items-center">
        <svg className="w-5 h-5 text-emerald-600 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-100" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-white shadow-md p-6 flex flex-col items-center gap-4 w-full max-w-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <svg className="w-10 h-10 text-emerald-600 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
              <path className="opacity-100" d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"></path>
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-emerald-800">Loading FastCart</h3>
            <p className="text-sm text-emerald-600">Please wait while we prepare things for you…</p>
          </div>
        </div>

        <div className="w-full space-y-2">
          <div className="h-3 bg-emerald-100 rounded-full animate-pulse" style={{width: '90%'}}></div>
          <div className="h-3 bg-emerald-100 rounded-full animate-pulse" style={{width: '70%'}}></div>
          <div className="h-3 bg-emerald-100 rounded-full animate-pulse" style={{width: '50%'}}></div>
        </div>

        <div className="text-xs text-emerald-500">This usually takes a few seconds.</div>
      </div>
    </div>
  )
}

export default Loading
