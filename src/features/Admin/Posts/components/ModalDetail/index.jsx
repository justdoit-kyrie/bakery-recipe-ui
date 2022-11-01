/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import { API_CODE, API_PATH, REPORT_PROBLEM_ENUM } from '~/constants';

const ModalDetail = ({ data, onClose, isOpen, callback }) => {
  const [reportList, setReportList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { code, data: _data } = await axiosInstance.get(
          `${API_PATH.reports.getList}/${data.id}`
        );

        if (+code === API_CODE.success) {
          setReportList(_data);
        }
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { code, message } = await axiosInstance.delete(`${API_PATH.posts.getList}/${id}`);

      if (+code === API_CODE.success) {
        toast.success(message);
        onClose();
        callback();
      }
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <Modal isOpen={isOpen} size="3xl" onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent minH="80%" minW="60%" borderRadius="8px">
        <ModalCloseButton
          fontSize="1rem"
          top="2rem"
          right="2rem"
          zIndex="100"
          _hover={{}}
          _active={{}}
        />

        <ModalBody position="relative">
          <Box pt="5rem" pb="2rem" px="2.5rem" position="absolute" inset="0" overflowY="overlay">
            <Box>
              <Text fontWeight="600" fontSize="5rem" lineHeight="1" mb="0.5rem">
                {data?.title}
              </Text>
            </Box>

            <Flex gap="30px" justify="flex-start">
              <Box p="1rem 0.5rem 0" flex="0.7" w="100%" maxW="70%">
                <Text textTransform="capitalize" fontWeight={700} cursor="pointer" mb="1rem">
                  {data?.categoryName}
                </Text>

                <Box
                  sx={{ '& img': { w: '100%' } }}
                  dangerouslySetInnerHTML={{ __html: data?.content }}
                />
              </Box>

              <Flex flex="0.3" gap="3.2rem" direction="column">
                <Box
                  maxH="300px"
                  background="#fff"
                  boxShadow="0px 3px 4px 0px hsla(0,0%,0%,0.14), 0px 3px 3px -2px hsla(0,0%,0%,0.12), 0px 1px 8px 0px hsla(0,0%,0%,0.2);"
                  position="relative"
                >
                  <Box h="50%" borderRadius="4px">
                    <Image src="https://picsum.photos/200/300" w="100%" h="100%" />
                  </Box>

                  <Flex
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%,-35%)"
                    direction="column"
                    justify="center"
                    align="center"
                    gap="1rem"
                    w="80%"
                  >
                    <Avatar
                      src={data?.authorAvatar}
                      name={data?.authorName}
                      w="7.5rem"
                      h="7.5rem"
                      cursor="pointer"
                    />
                    <Text
                      fontWeight="700"
                      fontSize="24px"
                      lineHeight="26px"
                      textAlign="center"
                      cursor="pointer"
                    >
                      {data?.authorName}
                    </Text>
                  </Flex>
                </Box>

                <Box
                  p="2rem"
                  background="#fff"
                  boxShadow="0px 3px 4px 0px hsla(0,0%,0%,0.14), 0px 3px 3px -2px hsla(0,0%,0%,0.12), 0px 1px 8px 0px hsla(0,0%,0%,0.2);"
                >
                  <Text
                    fontWeight="700"
                    fontSize="24px"
                    lineHeight="28px"
                    letterSpacing="0.5px"
                    mb="1.5rem"
                  >
                    Reports
                  </Text>

                  <Flex direction="column" gap="1rem">
                    {reportList.map((item, idx) => (
                      <Flex key={idx} direction="column" gap="0.5rem">
                        <Text fontWeight="700" lineHeight="17px">
                          Problem: {REPORT_PROBLEM_ENUM[item.reportProblem].toLowerCase()}
                        </Text>
                        <Flex justify="space-between" align="center">
                          <Text fontWeight={600}>{item.fullName}</Text>
                          <Text color="textColor.200">{item.date}</Text>
                        </Flex>
                      </Flex>
                    ))}
                  </Flex>

                  {reportList.length > 5 && (
                    <Button
                      mt="3rem"
                      variant="outline-default"
                      borderRadius="100rem"
                      borderColor="red.500"
                      color="red.500"
                      onClick={() => handleDelete(data.id)}
                    >
                      Ban
                    </Button>
                  )}
                </Box>
              </Flex>
            </Flex>
          </Box>
        </ModalBody>

        <ModalFooter minH="8.6rem" borderTop="0.5px solid rgba(22, 24, 35, 0.12)">
          <Button onClick={onClose} variant={'outline-default'} fontWeight={500} fontSize="1.4rem">
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDetail;
