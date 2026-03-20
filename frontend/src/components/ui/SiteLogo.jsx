/**
 * SiteLogo — Reusable logo component for the LumenID application.
 *
 * Uses an <img> tag pointing at the SVG in /public so it can be
 * sized freely via width / height props while preserving aspect ratio.
 */
export function SiteLogo({
  width = 56,
  height = 56,
  className = "",
  alt = "LumenID Logo",
  ...rest
}) {
  return (
    <img
      src="/Logo.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      draggable={false}
      {...rest}
    />
  );
}
