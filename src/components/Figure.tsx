/** Light/dark figure pair from /public/figures, swapped by color scheme. */
export default function Figure({ name, alt }: { name: string; alt: string }) {
  return (
    <figure className="fig">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet={`/figures/${name}-dark.svg`} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/figures/${name}-light.svg`} alt={alt} loading="lazy" />
      </picture>
    </figure>
  );
}
