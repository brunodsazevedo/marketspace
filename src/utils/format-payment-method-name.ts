const paymentMethods = {
  pix: 'Pix',
  card: 'Cartão de Crédito',
  boleto: 'Boleto',
  cash: 'Dinheiro',
  deposit: 'Depósito Bancário',
}

type PaymentMethodName = keyof typeof paymentMethods

export function formatPaymentMethodName(paymentMethod: string) {
  if(paymentMethod in paymentMethods) {
    return paymentMethods[paymentMethod as PaymentMethodName]
  }

  return paymentMethods.cash
}
