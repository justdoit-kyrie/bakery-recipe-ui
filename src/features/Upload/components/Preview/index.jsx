import {
  Box,
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
import moment from 'moment';
import React from 'react';
import { BsDot } from 'react-icons/bs';

const PreviewModal = ({ isOpen, onClose, content, title }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW="45%" h="85%" position="relative">
        <ModalCloseButton
          fontSize="1.2rem"
          top="1.5rem"
          right="1.5rem"
          w="30px"
          h="30px"
          bg="rgba(22, 24, 35, 0.03)"
          borderRadius="100rem"
          zIndex="10"
        />
        <ModalBody p="3rem 1rem 0 2rem" display="flex" flexDirection="column">
          {title && (
            <Text as="h1" fontSize="2.6rem" lineHeight="30px" fontWeight="600" maxW="80%">
              {title}
            </Text>
          )}
          <Flex m="1rem 0" color="textColor.300" align="center" gap="0.5rem">
            <Text>Lisa Stardust</Text>
            <BsDot />
            <Text>{moment().format('MMMM DD, YYYY')}</Text>
          </Flex>
          <Box position="relative" flex="1">
            <Box
              className="hide-scroll"
              position="absolute"
              inset="0"
              w="auto"
              h="auto"
              overflowY="scroll"
              dangerouslySetInnerHTML={{ __html: content }}
            ></Box>
          </Box>
        </ModalBody>

        <ModalFooter borderTop="1px solid rgba(22,24,35,0.12)">
          <Button mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PreviewModal;
