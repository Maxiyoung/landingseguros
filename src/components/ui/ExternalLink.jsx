/**
 * Enlace externo centralizado que garantiza target="_blank" con rel="noopener noreferrer".
 */
export default function ExternalLink({ href, children, ...props }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}
