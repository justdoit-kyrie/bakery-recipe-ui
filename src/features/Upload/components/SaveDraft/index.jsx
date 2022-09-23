import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const SaveDraftModal = ({ isOpen, onClose, onConfirm, handleUmountForm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minW="31rem" borderRadius="8px">
        <ModalCloseButton
          fontSize="1.2rem"
          top="1rem"
          right="1rem"
          w="30px"
          h="30px"
          bg="rgba(22, 24, 35, 0.03)"
          borderRadius="100rem"
          zIndex="10"
        />
        <ModalBody>
          <Flex
            align="center"
            justify="center"
            direction="column"
            textAlign="center"
            p="3.2rem 3.2rem 2.4rem"
          >
            <Text as="h2" fontSize="2rem" lineHeight="24xp" fontWeight="600">
              Save this draft?
            </Text>
            <Text as="p" fontSize="1.5rem" fontWeight="400" lineHeight="18px" mt="8px">
              The image and all edits will be save as a draft.
            </Text>
          </Flex>
        </ModalBody>

        <ModalFooter p="0">
          <Flex direction="column" w="100%">
            <Button
              variant="outline"
              border="none"
              borderTop="1px solid rgba(22,24,35,0.12)"
              borderBottom="1px solid rgba(22,24,35,0.12)"
              w="100%"
              p="1.7rem"
              borderRadius="0 0 8px 8px"
              height="auto"
              _hover={{}}
              onClick={onConfirm}
            >
              No
            </Button>

            <Button
              variant="outline-primary"
              border="none"
              w="100%"
              p="1.7rem"
              height="auto"
              _hover={{}}
              onClick={() => {
                handleUmountForm();
                onConfirm();
              }}
            >
              Save
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaveDraftModal;
