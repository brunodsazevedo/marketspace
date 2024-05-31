import React from 'react'
import { SvgProps } from 'react-native-svg'

import BankIcon from '@/assets/bank.svg'
import MoneyIcon from '@/assets/money.svg'
import BarCodeIcon from '@/assets/barcode.svg'
import QrCodeIcon from '@/assets/qr-code.svg'
import CreditCardIcon from '@/assets/credit-card.svg'

const paymentMethods = {
  pix: QrCodeIcon,
  card: CreditCardIcon,
  boleto: BarCodeIcon,
  cash: MoneyIcon,
  deposit: BankIcon,
}

type PaymentMethodName = keyof typeof paymentMethods

export function getPaymentMethodIcon(paymentMethodName: string): React.FC<SvgProps> {
  if (paymentMethodName in paymentMethods) {
    return paymentMethods[paymentMethodName as PaymentMethodName];
  }

  return paymentMethods.cash;
}
