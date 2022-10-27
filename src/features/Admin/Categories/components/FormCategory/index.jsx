import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import { API_CODE, API_PATH } from '~/constants';

import FormAddEdit from '../FormAddEdit';

const FormCategoryModal = ({ data, onClose, isOpen, callback }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const submitBtnRef = useRef(null);
  const [isValid, setIsValid] = useState(false);

  console.log({ data });

  const onSubmit = async (data) => {
    try {
      if (data?.categoryId) {
        const { code, message } = await axiosInstance.put(
          `${API_PATH.categories.getList}/${data.categoryId}`,
          data
        );

        if (+code === API_CODE.success) {
          toast.success(message);
          typeof callback === 'function' && callback();
          onClose();
        }
      } else {
        const { code, message } = await axiosInstance.post(API_PATH.categories.getList, data);

        if (+code === API_CODE.success) {
          toast.success(message);
          typeof callback === 'function' && callback();
          onClose();
        }
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      size="3xl"
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent minH="30%" minW="30%" borderRadius="8px">
        <ModalHeader
          fontSize="2.4rem"
          fontWeight={600}
          lineHeight="36px"
          borderBottom="0.5px solid rgba(22, 24, 35, 0.2)"
          p="2.4rem 2.4rem 1.2rem"
        >
          {data?.categoryId ? 'Edit category' : 'Add category'}
        </ModalHeader>

        <ModalCloseButton fontSize="1.5rem" top="2rem" right="2rem" _hover={{}} _active={{}} />

        <ModalBody position="relative">
          <Flex
            justify="flex-start"
            align="flex-start"
            h="100%"
            position="relative"
            top="50%"
            left="0"
          >
            {/* others field */}
            <FormAddEdit
              submitBtnRef={submitBtnRef}
              initialRef={initialRef}
              initialValue={data}
              onSubmit={onSubmit}
              setIsValid={setIsValid}
            />
          </Flex>
        </ModalBody>

        <ModalFooter minH="8.6rem" borderTop="0.5px solid rgba(22, 24, 35, 0.12)">
          <Button onClick={onClose} variant={'outline-default'} fontWeight={500} fontSize="1.4rem">
            Cancel
          </Button>
          <Button
            type="submit"
            variant={isValid ? 'outline-default' : 'disabled'}
            ml="1.6rem"
            fontWeight={600}
            fontSize="1.4rem"
            onClick={() => submitBtnRef.current && submitBtnRef.current.click()}
          >
            {data?.categoryId ? 'Save' : 'Add'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormCategoryModal;
