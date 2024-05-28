import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet'

import { Backdrop } from './backdrop'
import { RefObject } from 'react'

export {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetTextInput,
  BottomSheetView,
  BottomSheetScrollView,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet'

type Props = BottomSheetModalProps & {
  modalBottomRef?: RefObject<BottomSheetModal>
}

export type ModalBottomProps = Props

export function ModalBottom({ modalBottomRef, children, ...rest }: Props) {
  return (
    <BottomSheetModal
      ref={modalBottomRef}
      backdropComponent={Backdrop}
      {...rest}
    >
      {children}
    </BottomSheetModal>
  )
}
