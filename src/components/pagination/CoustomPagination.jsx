import React from 'react'

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  // Pagination range configuration
  const RANGE = 2 // Number of page buttons to show around current page
  const ELLIPSIS_THRESHOLD = 2 // When to show ellipsis

  // Generate page range around current page
  const generatePageRange = () => {
    // If total pages is less than or equal to total range, show all pages
    if (totalPages <= RANGE * 2 + 1) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const pages = []
    const startPage = Math.max(1, currentPage - RANGE)
    const endPage = Math.min(totalPages, currentPage + RANGE)

    // Always include first and last pages
    const showFirstPage = startPage > 1
    const showLastPage = endPage < totalPages

    // Generate page range
    if (showFirstPage) {
      pages.push(1)
      if (startPage > 2) pages.push(null) // Add ellipsis
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    if (showLastPage) {
      if (endPage < totalPages - 1) pages.push(null) // Add ellipsis
      pages.push(totalPages)
    }

    return pages
  }

  const pageRange = generatePageRange()

  return (
    <div className="flex items-center space-x-1">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg  disabled:opacity-50"
      >
        {'<'}
      </button>

      {/* Page Buttons */}
      {pageRange.map((page, index) =>
        page === null ? (
          <span key={`ellipsis-${index}`} className="text-slate-500 px-2">
            ...
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`min-w-9 rounded-full py-2 px-3.5 text-sm ml-2 ${
              page === currentPage
                ? 'bg-amber-900 text-white'
                : 'bg-white text-amber-900 border border-slate-300'
            }`}
          >
            {page}
          </button>
        ),
      )}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-full border border-slate-300 py-2 px-3 text-center text-sm transition-all shadow-sm hover:shadow-lg  disabled:opacity-50"
      >
        {'>'}
      </button>
    </div>
  )
}

export default CustomPagination
