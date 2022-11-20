import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { Loading } from '~/components';
import { AUTHENTICATE_FORM_TYPE } from '~/constants';
import FormForgotPassword from './components/FormForgotPassword';
import FormGetInfo from './components/FormGetInfo';
import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';

const AuthenticateModal = ({ isShow, isOpen, onClose = () => {}, onCancel = () => {} }) => {
  const initialRef = useRef(null);
  const [historyForm, setHistoryForm] = useState([AUTHENTICATE_FORM_TYPE.login]);
  const [isLevel, setIsLevel] = useState(false);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(AUTHENTICATE_FORM_TYPE.login);

  useEffect(() => {
    if (isLevel) setType(historyForm[historyForm.length - 1]);
  }, [historyForm]);

  const renderForm = () => {
    switch (type) {
      case AUTHENTICATE_FORM_TYPE.login:
        return (
          <FormLogin
            initialRef={initialRef}
            setType={setType}
            handleCloseModal={onClose}
            setLoading={setLoading}
            setHistoryForm={setHistoryForm}
            setIsLevel={setIsLevel}
          />
        );
      case AUTHENTICATE_FORM_TYPE.register:
        return <FormRegister initialRef={initialRef} setType={setType} setLoading={setLoading} />;
      case AUTHENTICATE_FORM_TYPE.forgotPassword:
        return (
          <FormForgotPassword
            initialRef={initialRef}
            handleCloseModal={onClose}
            setLoading={setLoading}
          />
        );
      default:
        return <FormGetInfo initialRef={initialRef} handleCloseModal={onClose} />;
    }
  };

  const renderHeaderLabel = () => {
    switch (type) {
      case AUTHENTICATE_FORM_TYPE.login:
        return 'Log in';
      case AUTHENTICATE_FORM_TYPE.forgotPassword:
        return 'Reset password';

      default:
        return 'Sign up';
    }
  };

  const renderFooterLabel = () => {
    switch (type) {
      case AUTHENTICATE_FORM_TYPE.login:
      case AUTHENTICATE_FORM_TYPE.forgotPassword:
        return 'Sign up';
      default:
        return 'Log in';
    }
  };

  const handleBackForm = () => setHistoryForm((prev) => prev.slice(0, prev.length - 1));

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isShow ? isShow : isOpen}
      onClose={isShow ? onCancel : onClose}
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent pt="4.8rem" minH="69.3rem" borderRadius="8px">
        {loading && <Loading />}
        <ModalHeader fontSize="3.2rem" fontFamily="SofiaPro" fontWeight="700" textAlign="center">
          {renderHeaderLabel()}
        </ModalHeader>
        <ModalCloseButton
          fontSize="1.5rem"
          top="1.5rem"
          right="1.5rem"
          w="41px"
          h="41px"
          bg="rgba(22, 24, 35, 0.03)"
          borderRadius="100rem"
        />
        {historyForm.length > 1 && isLevel && (
          <Text
            position="absolute"
            top="1.6rem"
            left="1.6rem"
            onClick={handleBackForm}
            cursor="pointer"
          >
            <BsChevronLeft fontSize="2.4rem" />
          </Text>
        )}
        <ModalBody w="100%" flex="1" position="relative">
          <Box
            position="absolute"
            inset="0"
            p="0 40px 2rem"
            h="100%"
            overflowY="overlay"
            overflowX="hidden"
            sx={{
              '::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0, 0, 0, .06)',
              },
            }}
          >
            {renderForm()}
          </Box>
        </ModalBody>

        <ModalFooter
          flexShrink={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap="0.5rem"
          h="6.4rem"
          borderTop="1px solid rgba(22, 24, 35, 0.12)"
        >
          <Text as="span" fontSize="1.5rem" lineHeight="18px">
            You don't have an account?
          </Text>
          <Text
            as="span"
            fontSize="1.5rem"
            lineHeight="18px"
            fontWeight="600"
            color="red.400"
            textTransform="capitalize"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => {
              setType((prev) =>
                prev === AUTHENTICATE_FORM_TYPE.login ||
                prev === AUTHENTICATE_FORM_TYPE.forgotPassword
                  ? AUTHENTICATE_FORM_TYPE.register
                  : AUTHENTICATE_FORM_TYPE.login
              );
              setIsLevel(false);
              setHistoryForm((prev) => prev.slice(0, 1));
            }}
          >
            {renderFooterLabel()}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthenticateModal;
