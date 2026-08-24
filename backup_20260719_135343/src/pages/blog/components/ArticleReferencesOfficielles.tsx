interface Reference {
  title: string;
  institution: string;
  year: string;
  url: string;
}

interface ReferencesOfficiellesData {
  heading: string;
  references: Reference[];
}

interface ArticleReferencesOfficiellesProps {
  data: ReferencesOfficiellesData;
}

export function ArticleReferencesOfficielles({ data }: ArticleReferencesOfficiellesProps) {
  return (
    <section className="mb-14 scroll-mt-28" id="references-officielles">
      <h2
        id="references-officielles-heading"
        className="text-2xl md:text-3xl font-bold text-foreground-950 leading-tight mt-14 mb-6 scroll-mt-28 flex items-start gap-3"
        style={{ fontFamily: 'var(--font-heading), serif' }}
      >
        <span className="inline-flex items-center justify-center flex-shrink-0 w-9 h-9 rounded-xl text-sm font-bold mt-0.5 bg-accent-100 text-accent-700 border border-accent-200">
          V
        </span>
        {data.heading}
      </h2>

      <div className="space-y-3">
        {data.references.map((ref, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-4 rounded-xl border border-secondary-200 bg-secondary-100"
          >
            <i className="ri-file-text-line text-sm flex-shrink-0 mt-0.5 text-accent-500"></i>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground-950 text-xs leading-snug mb-0.5">
                {ref.title}
              </p>
              <p className="text-xs text-foreground-500">
                {ref.institution} — {ref.year}
              </p>
              <a
                href={ref.url}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-xs hover:underline text-accent-600"
              >
                {ref.url}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



