// Compound 조립
import BaseModal from '@/shared/components/modal/components/base-modal';
import { Button } from '@/shared/components/modal/components/modal-button';
import { Header } from '@/shared/components/modal/components/modal-header';

const Modal = Object.assign(BaseModal, {
  Header,
  Button,
});

export default Modal;
