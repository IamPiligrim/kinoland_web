type PageMetaProps = {
  title: string
  description?: string
}

/** React 19 поднимает title и meta в <head> сам — отдельная библиотека не нужна. */
export function PageMeta({ title, description }: PageMetaProps) {
  return (
    <>
      <title>{`${title} — Киноленд, Калининград`}</title>
      {description ? <meta name="description" content={description} /> : null}
    </>
  )
}
