import {
  Box,
  Button,
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
import React, { useRef, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import Firebase from '~/app/firebase';
import { Loading } from '~/components';
import { FacebookLogo } from '~/components/Icons';
import {
  AUTHENTICATE_FORM_TYPE,
  COLOR_MODE_TYPE,
  OTHERS_LOGIN,
  OTHERS_LOGIN_ERROR_CODE,
} from '~/constants';
import FormGetInfo from './components/FormGetInfo';
import FormLogin from './components/FormLogin';
import FormRegister from './components/FormRegister';

const MOCK_DATA = {
  others_login: [
    { icon: FcGoogle, label: 'Continue with Google', provider: OTHERS_LOGIN.google },
    { icon: FacebookLogo, label: 'Continue with Facebook', provider: OTHERS_LOGIN.facebook },
  ],
};

const AuthenticateModal = ({ isOpen, onClose }) => {
  const { others_login } = MOCK_DATA;
  const { colorMode } = useColorMode();

  const initialRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(AUTHENTICATE_FORM_TYPE.login);

  const renderForm = () => {
    switch (type) {
      case AUTHENTICATE_FORM_TYPE.login:
        return <FormLogin initialRef={initialRef} />;
      case AUTHENTICATE_FORM_TYPE.register:
        return <FormRegister initialRef={initialRef} setType={setType} />;
      default:
        return <FormGetInfo initialRef={initialRef} />;
    }
  };

  const handleOthersLogin = (provider) => {
    const firebase = new Firebase();
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
      });
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

  return (
    <Modal
      closeOnOverlayClick={false}
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent pt="4.8rem" minH="69.3rem">
        {loading && <Loading />}
        <ModalHeader fontSize="3.2rem" fontFamily="SofiaPro" fontWeight="700" textAlign="center">
          {type === AUTHENTICATE_FORM_TYPE.login ? 'Log in' : 'Sign up'}
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
        <ModalBody pb="2rem" w="90%" m="0 auto" flex="1" overflowY="overlay">
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

          {type === AUTHENTICATE_FORM_TYPE.getInfo && (
            <Button size="lg" variant="default" mt="1rem" onClick={onClose}>
              Skip
            </Button>
          )}
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
            onClick={() =>
              setType((prev) =>
                prev === AUTHENTICATE_FORM_TYPE.login
                  ? AUTHENTICATE_FORM_TYPE.register
                  : AUTHENTICATE_FORM_TYPE.login
              )
            }
          >
            {type === AUTHENTICATE_FORM_TYPE.login ? 'Register' : 'Log in'}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthenticateModal;
