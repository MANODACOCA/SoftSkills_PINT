export function formatarData(data) {
  if (!data) return '-';
  const d = new Date(data);
  return d.toLocaleDateString('pt-PT');
}