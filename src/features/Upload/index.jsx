import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { default as axios } from '~/app/api';
import { Loading } from '~/components';
import { API_CODE, API_PATH, FORM_TYPE, UPLOAD_STATUS, UPLOAD_STATUS_ENUM } from '~/constants';
import { selectUserInfo } from '../Authenticate/authSlice';
import FormUpload from './components/FormUpload';

const defaultValues = {
  title: '',
  type: undefined,
  content: '',
  image: '',
  ingredients: [],
};

const UploadPage = () => {
  const { id } = useParams();
  const userInfo = useSelector(selectUserInfo);

  const [initialValues, setInitialValues] = useState(defaultValues);
  const [isEdit, setIsEdit] = useState(false);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      // type not already loaded from api
      const { code, data } = await axios.get(API_PATH.posts.getDetail.replace(':id', id));
      if (+code === API_CODE.success) {
        setInitialValues({
          ...data,
          ingredients: data.postProducts.map((item) => ({ name: item, value: item.quantity })),
        });
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleUmountForm = async (data) => {
    const { title, content, image, type, ingredients } = data;
    try {
      const { code, message } = await axios.post(API_PATH.posts.upload, {
        title,
        content,
        image,
        status: UPLOAD_STATUS_ENUM.indexOf(UPLOAD_STATUS.draft),
        authorID: userInfo.id,
        categoryID: type.categoryId,
        postProduct: ingredients.map((item) => ({
          productID: item.name.productId,
          quantity: +item.value,
        })),
      });

      if (+code === API_CODE.success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  // quay video log bug
  const handleSubmit = async (data) => {
    const { title, content, image, type, ingredients } = data;
    try {
      setLoading(true);
      if (isEdit) {
        const { code, message } = await axios.put(API_PATH.posts.edit.replace(':id', id), {
          title,
          content,
          image,
          status: UPLOAD_STATUS_ENUM.indexOf(UPLOAD_STATUS.active),
          authorID: userInfo.id,
          categoryID: type.categoryId,
          postProduct: ingredients.map((item) => ({
            productID: item.name.productId || item.name.productID,
            quantity: +item.value,
          })),
        });
        if (+code === API_CODE.success) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      } else {
        const { code, message } = await axios.post(API_PATH.posts.upload, {
          title,
          content,
          image,
          status: UPLOAD_STATUS_ENUM.indexOf(UPLOAD_STATUS.active),
          authorID: userInfo.id,
          categoryID: type.categoryId,
          postProduct: ingredients.map((item) => ({
            productID: item.name.productId,
            quantity: +item.value,
          })),
        });
        if (+code === API_CODE.success) {
          toast.success(message);
        } else {
          toast.error(message);
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
      if (isEdit) fetchData();
    }
  };

  useEffect(() => {
    // call api
    if (id) {
      setIsEdit(true);
      fetchData();
    }
  }, [id]);

  return (
    <Center h="100%">
      {loading && <Loading label="Is uploading ..." />}
      <Flex
        direction="column"
        className="container"
        bg="white"
        w="95%"
        h="98%"
        borderRadius="8px"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
        p="2.4rem 5.6rem"
      >
        <Text as="h2" fontSize="2.4rem" lineHeight="1.5" fontWeight={600}>
          {id ? 'Edit' : 'Upload'} post
        </Text>

        <Text as="p" fontSize="1.8rem" lineHeight="1.5" color="textColor.200" mt="2px">
          {id ? 'Edit' : 'Upload'} a post of your account
        </Text>

        <Box flex="1" mt="2.4rem">
          {initialValues && !loading && (
            <FormUpload
              handleUmountForm={handleUmountForm}
              handleSubmit={handleSubmit}
              defaultValues={initialValues}
              formType={isEdit ? FORM_TYPE.edit : FORM_TYPE.add}
            />
          )}
        </Box>
      </Flex>
    </Center>
  );
};

export default UploadPage;
