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
  useColorMode,
} from '@chakra-ui/react';
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import firebase from '~/app/firebase';
import { Loading } from '~/components';
import { FacebookLogo } from '~/components/Icons';
import {
  AUTHENTICATE_FORM_TYPE,
  COLOR_MODE_TYPE,
  OTHERS_LOGIN,
  OTHERS_LOGIN_ERROR_CODE,
} from '~/constants';
import FormForgotPassword from './components/FormForgotPassword';
import FormGetInfo from './components/FormGetInfo';
import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';

const MOCK_DATA = {
  others_login: [
    { icon: FcGoogle, label: 'Continue with Google', provider: OTHERS_LOGIN.google },
    { icon: FacebookLogo, label: 'Continue with Facebook', provider: OTHERS_LOGIN.facebook },
  ],
};

const AuthenticateModal = ({ isShow, isOpen, onClose, onCancel }) => {
  const { others_login } = MOCK_DATA;
  const { colorMode } = useColorMode();

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

  const renderOthersLogin = () =>
    others_login.map((item, idx) => {
      const Icon = item.icon;
      return (
        <Box
          as={motion.div}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="others-item"
          key={idx}
          bg="transparent"
          minH="4.4rem"
          p="0 1.2rem"
          display="flex"
          alignItems="center"
          justifyContent="center"
          border={`1px solid ${
            colorMode === COLOR_MODE_TYPE.light
              ? 'rgba(22, 24, 35, 0.12)'
              : 'rgba(233, 234,216, 0.5)'
          }`}
          cursor="pointer"
          position="relative"
          fontSize="1.5rem"
          fontWeight="600"
          sx={{
            '& + &': {
              mt: '1.6rem',
            },
          }}
          onClick={() => handleOthersLogin(item.provider)}
        >
          <Text position="absolute" top="50%" transform="translateY(-50%)" left="1.2rem">
            <Icon fontSize="2rem" width="2rem" height="2rem" />
          </Text>
          <Text as="span" lineHeight="1">
            {item.label}
          </Text>
        </Box>
      );
    });

  const handleOthersLogin = (provider) => {
    let AuthProvider = GoogleAuthProvider;
    switch (provider) {
      case OTHERS_LOGIN.facebook:
        AuthProvider = FacebookAuthProvider;
        break;
    }
    setLoading(true);
    signInWithPopup(firebase.getAuth(), new AuthProvider())
      .then((result) => {
        const userInfo = result.user;
        // call API to handle register this userInfo and get token
        console.log({ userInfo });
      })
      .catch((error) => {
        // Handle Errors here.
        switch (error.code) {
          case OTHERS_LOGIN_ERROR_CODE.popup_close: {
            toast.error('Pop up close during processing !');
            break;
          }
        }
      })
      .finally(() => {
        setLoading(false);
        onClose();
      });
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

            {/* others Login */}
            {type !== AUTHENTICATE_FORM_TYPE.getInfo && (
              <>
                <Box
                  w="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  m="2rem 0"
                  position="relative"
                >
                  <Text
                    as="span"
                    textTransform="uppercase"
                    lineHeight="1"
                    bg={colorMode === COLOR_MODE_TYPE.light ? 'white' : 'gray.700'}
                    p="0 1rem"
                    fontWeight="600"
                  >
                    or
                  </Text>
                  <Text
                    as="span"
                    w="100%"
                    h="1px"
                    backgroundColor={
                      colorMode === COLOR_MODE_TYPE.light
                        ? 'rgba(22, 24, 35, 0.12)'
                        : 'darkTextColor.400'
                    }
                    position="absolute"
                    zIndex={-1}
                  ></Text>
                </Box>

                {renderOthersLogin()}
              </>
            )}
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

AuthenticateModal.defaultProps = {
  onClose: () => {},
};

export default AuthenticateModal;
