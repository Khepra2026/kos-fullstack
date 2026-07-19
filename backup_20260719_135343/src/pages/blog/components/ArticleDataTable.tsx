interface ArticleDataTableProps {
  headers: string[];
  rows: string[][];
  caption?: string;
}

export function ArticleDataTable({ headers, rows, caption }: ArticleDataTableProps) {
  const estimatedMinHeight = 48 + rows.length * 52;

  return (
    <div
      className="my-8 rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm"
      style={{ minHeight: estimatedMinHeight, contain: 'layout paint' }}
    >
      {caption && (
        <div className="px-5 py-3 bg-gradient-to-r from-brand-50 to-white border-b border-gray-100">
          <p className="text-sm font-semibold text-brand-800 flex items-center gap-2">
            <i className="ri-table-2 text-brand-500"></i>
            {caption}
          </p>
        </div>
      )}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm table-institutional" style={{ minWidth: Math.max(headers.length * 160, 400) }}>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((h, i) => (
                <th
                  key={i}
                  className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {rows.map((row, ri) => (
              <tr key={ri} className="hover:bg-gray-50/50 transition-colors">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`px-4 py-3 text-gray-700 align-top break-words ${
                      ci === 0 ? 'font-medium text-gray-900' : ''
                    }`}
                    style={{ maxWidth: 320, wordBreak: 'break-word', overflowWrap: 'anywhere' }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



