export default function Icon({ name, size, className }: { name: string; size: number; className?: string }) {
  const src = name === 'logo' ? `/images/${name}.png` : `https://static.toss.im/icons/svg/${name}.svg`;
  return <img alt={name} src={src} width={size} height={size} className={className} />;
}
