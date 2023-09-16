export default function parseClasses(...classes: any[]): string {
  return classes
    .filter(v => typeof v === 'string')
    .map(v => v.trim())
    .filter(v => v)
    .join(' ')
}
