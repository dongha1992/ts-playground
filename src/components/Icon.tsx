export default function Icon({ name, size, className }: { name: string; size: number; className?: string }) {
  return <img alt={name} src={`/images/${name}.png`} width={size} height={size} className={className} />;
}
