import {
  ForwardedRef,
  MouseEventHandler,
  PropsWithChildren,
  forwardRef,
  useEffect,
  useRef,
} from 'react';
import styles from './modal.module.css';
import { mergeRefs } from '../../utils/merge-refs';

type ModalProps = PropsWithChildren<{
  onClose: () => void;
  isOpen: boolean;
}>;

export const Modal = forwardRef(
  (
    { children, onClose, isOpen }: ModalProps,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const dialogClickHandler: MouseEventHandler<HTMLDialogElement> = (e) => {
      e.stopPropagation();
      if (e.target instanceof HTMLDialogElement) {
        dialogRef.current?.close();
        onClose();
      }
    };

    useEffect(() => {
      if (isOpen) {
        dialogRef.current?.showModal();
      } else {
        dialogRef.current?.close();
        onClose();
      }
    }, [isOpen, onClose]);

    return (
      <dialog
        className={styles.modal}
        onClick={dialogClickHandler}
        ref={mergeRefs([dialogRef, ref])}
      >
        <div>{children}</div>
      </dialog>
    );
  },
);
