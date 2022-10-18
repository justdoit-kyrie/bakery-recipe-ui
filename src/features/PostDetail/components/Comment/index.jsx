/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import Moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Textarea,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '~/features/Authenticate/authSlice';
import axiosInstance from '~/app/api';
import { API_CODE, API_PATH } from '~/constants';
import { toast } from 'react-toastify';

const Comment = ({ postDetail, fetchData }) => {
  const userInfo = useSelector(selectUserInfo);

  const [content, setContent] = useState('');
  const [reply, setReply] = useState();
  const [name, setName] = useState();

  let handleSubmit = async () => {
    try {
      const { code, message, data } = await axiosInstance.post(API_PATH.comment.post, {
        Content: content,
        PostId: postDetail.id,
        ReplyId: reply,
        UserId: userInfo.id,
      });
      if (+code === API_CODE.success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      fetchData();
      setReply(null);
      setName(null);
      setContent('');
    } catch (err) {
      console.log(err);
    }
  };

  var count = 0;
  postDetail?.comments?.map((item) => {
    count++;
    count += item.replyTo.length;
  });
  return (
    <Box>
      <Box padding="40px" border="1px" borderColor="#eee">
        <Box color="20232E" fontSize="18px" m="30px 0px 25px" p="0px 0px 15px" fontWeight="900">
          {count} COMMENTS
        </Box>

        {postDetail?.comments?.map((item, idx) => {
          return (
            <Box key={idx}>
              <Flex diretion="row" align="center" justify="flex-start" gap="2rem" mb="2rem">
                <Avatar h="100px" w="100px" src={item.avatar} />
                <Box>
                  <Flex gap="5" align="center" justify="center">
                    <Box fontSize="19" fontWeight="800">
                      {item.userName}
                    </Box>
                    <Box fontSize="14" color="#AAAAAA">
                      {item.createdDate = Moment().format("MMM Do YY")}
                    </Box>
                    <Button
                      onClick={() => {
                        setReply(item.commentId);
                        setName(item.userName);
                      }}
                      fontSize="16"
                    >
                      reply
                    </Button>
                  </Flex>
                  <Box fontSize="15" color="#7A7A7A" mt="1rem">
                    {item.content}
                  </Box>
                </Box>
              </Flex>

              {item.replyTo?.map((item2, idx2) => {
                return (
                  <Flex
                    pl="80px"
                    diretion="row"
                    align="center"
                    justify="flex-left"
                    gap="2rem"
                    mb="2rem" key={idx2}
                  >
                    <Avatar h="100px" w="100px" src={item2.avatar} />

                    <Box colSpan={5} rowSpan={1} ml="17px">
                      <Flex gap="5" align="center" justify="center">
                        <Box fontSize="19" fontWeight="800">
                          {item2.userName}
                        </Box>
                        <Box fontSize="14" color="#AAAAAA" mt="5px">
                          {item2.createdDate = Moment().format("MMM Do YY")}
                        </Box>
                      </Flex>
                      <Box fontSize="15" color="#7A7A7A" mt="1rem">
                        {item2.content}
                      </Box>
                    </Box>
                  </Flex>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <FormControl isRequired mt="30px">
        <FormLabel
          color="20232E"
          fontSize="18px"
          m="30px 0px 0px"
          p="0px 0px 15px"
          fontWeight="900"
        >
          YOUR COMMENT
        </FormLabel>
        {reply && (
          <Flex diretion="row" gap="1rem" align="center">
            <Box fontSize="17px" fontWeight="900">
              Reply to {name}{' '}
            </Box>
            <Button
              fontWeight="800"
              onClick={() => {
                setReply(null);
                setName(null);
              }}
            >
              X
            </Button>
          </Flex>
        )}
        <Textarea

          value={content}
          h="150px"
          overflow="auto"
          ressize="vertical"
          fontSize="13px"
          mb="30px"
          placeholder="Leave your comment here..."
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          onClick={() => {
            handleSubmit();
          }}
        >
          Submit
        </Button>
      </FormControl>
    </Box>
  );
};

export default Comment;
``;
