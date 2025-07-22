// Compound 조립
import BaseModal from '@/shared/components/modal/base-modal';
import { Button } from '@/shared/components/modal/modal-button';
import { Footer } from '@/shared/components/modal/modal-footer';
import { Header } from '@/shared/components/modal/modal-header';

const Modal = Object.assign(BaseModal, {
  Header,
  Footer,
  Button,
});

export default Modal;
