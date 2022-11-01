/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Circle,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import firebase from '~/app/firebase';
import { Loading } from '~/components';
import { API_CODE, API_PATH, NO_IMAGE_URL } from '~/constants';

import FormAddEdit from '../FormAddEdit';

const FormIngredientsModal = ({ data, onClose, isOpen, callback }) => {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const submitBtnRef = useRef(null);
  const fileInputRef = useRef();

  const [isValid, setIsValid] = useState(false);
  const [image, setImage] = useState(data?.productImage);
  const [imageLoading, setImageLoading] = useState(false);
  const [fileName, setFileName] = useState('');
  const [modalLoading, setModalLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      if (data?.productId) {
        const { code, message } = await axiosInstance.put(
          `${API_PATH.products.getList}/${data.productId}`,
          { ...data, productImage: image, productCategoryId: 1 }
        );
        if (+code === API_CODE.success) {
          toast.success(message);
          if (data?.productImage) handleDeleteFile(true, data?.productImage);
          typeof callback === 'function' && callback();
          onClose();
        }
      } else {
        const { code, message } = await axiosInstance.post(API_PATH.products.getList, {
          ...data,
          productImage: image,
        });
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

  const handleFile = async (e) => {
    handleDeleteFile(false);
    const fileUploaded = e.target.files[0];
    if (fileUploaded) {
      const fileName = `user1/${moment(new Date()).toDate().toISOString()}_${fileUploaded.name}`;
      const storageRef = ref(firebase.getStorage(), fileName);

      setFileName(fileName);
      setImageLoading(true);
      await uploadBytes(storageRef, fileUploaded);

      try {
        const imageUrl = await getDownloadURL(storageRef);
        setImage(imageUrl);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setImageLoading(false);
      }
    }
  };

  /**
   * handle delete file
   * case 1: close modal
   * case 2: delete previous image upload
   * @param {Boolean} setLoading if true -> case 1, false -> case 2
   */
  const handleDeleteFile = async (setLoading = true, prevImage) => {
    if (fileName || prevImage) {
      const storageRef = ref(firebase.getStorage(), prevImage || fileName);
      try {
        setLoading && setModalLoading(true);
        await deleteObject(storageRef);
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading && setModalLoading(false);
      }
    }
    setLoading && onClose();
  };

  return (
    <Modal
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}
      isOpen={isOpen}
      size="3xl"
      onClose={handleDeleteFile}
      isCentered
    >
      <ModalOverlay />
      <ModalContent minH="30%" minW="30%" borderRadius="8px">
        {modalLoading && <Loading label="Delete image processing ..." />}
        <ModalHeader
          fontSize="2.4rem"
          fontWeight={600}
          lineHeight="36px"
          borderBottom="0.5px solid rgba(22, 24, 35, 0.2)"
          p="2.4rem 2.4rem 1.2rem"
        >
          {data?.productId ? 'Edit Ingredient' : 'Add Ingredient'}
        </ModalHeader>

        {!imageLoading && (
          <ModalCloseButton fontSize="1.5rem" top="2rem" right="2rem" _hover={{}} _active={{}} />
        )}

        <ModalBody position="relative" pb="2rem">
          <Flex
            p="1.6rem 0"
            justify="center"
            align="center"
            position="relative"
            borderBottom="0.5px solid rgba(22, 24, 35, 0.12);"
          >
            <Text className="text" lineHeight="24px" position="absolute" left="0" top="1.6rem">
              Ingredient image
            </Text>
            <Box position="relative" boxSize="96px">
              {imageLoading && <Loading w="50" h="50" borderRadius="100rem" />}
              <Avatar
                w="100%"
                h="100%"
                src={image}
                cursor="pointer"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = NO_IMAGE_URL;
                }}
              />
              <Circle
                size="3.2rem"
                bg="rgb(255, 255, 255)"
                border="1px solid rgb(208, 208, 211);"
                position="absolute"
                right="0"
                bottom="0"
                cursor={imageLoading ? 'not-allowed' : 'pointer'}
                onClick={
                  imageLoading
                    ? () => {}
                    : () => fileInputRef.current && fileInputRef.current.click()
                }
              >
                <AiOutlineEdit fontSize="1.6rem" />
              </Circle>
              <Input type="file" display="none" ref={fileInputRef} onChange={handleFile} />
            </Box>
          </Flex>
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
          <Button
            onClick={handleDeleteFile}
            variant={'outline-default'}
            fontWeight={500}
            fontSize="1.4rem"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={isValid && !imageLoading ? 'outline-default' : 'disabled'}
            ml="1.6rem"
            fontWeight={600}
            fontSize="1.4rem"
            onClick={() => submitBtnRef.current && submitBtnRef.current.click()}
          >
            {data?.productId ? 'Save' : 'Add'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormIngredientsModal;
