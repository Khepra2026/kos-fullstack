interface EmailPreviewProps {
  htmlBody: string;
  subject: string;
}

export default function EmailPreview({ htmlBody, subject }: EmailPreviewProps) {
  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center gap-2">
        <i className="ri-mail-line w-4 h-4 flex items-center justify-center text-slate-500"></i>
        <span className="text-sm font-medium text-slate-700">{subject}</span>
      </div>
      <div className="bg-white p-6 max-h-[400px] overflow-y-auto">
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlBody }}
        />
      </div>
    </div>
  );
}



