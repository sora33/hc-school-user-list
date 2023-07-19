import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalProps,
} from '@chakra-ui/react';

// ConfirmationModal コンポーネント
export const ChildrenModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  props?: ModalProps;
  title?: string;
  size?: ModalProps['size'];
}> = ({ isOpen, onClose, title, children, props, size = { base: 'xs', sm: 'md', md: 'xl' } }) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    isCentered
    closeOnOverlayClick={true}
    {...props}
    size={size}
  >
    <ModalOverlay />
    <ModalContent px={2} py={4}>
      {title && <ModalHeader>{title}</ModalHeader>}
      <ModalCloseButton />
      <ModalBody>{children}</ModalBody>
    </ModalContent>
  </Modal>
);
