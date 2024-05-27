export function unMasker(data: string) {
  const unMasked = data.replace(/\D/g, '')

  return unMasked
}

export function phoneMasker(data: string) {
  const cleaned = data.replace(/\D/g, '')

  const formatted = cleaned.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')

  return formatted
}
