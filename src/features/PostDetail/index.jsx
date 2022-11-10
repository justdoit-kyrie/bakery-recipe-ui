/* eslint-disable no-unused-vars */
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Link,
  // Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import { Loading } from '~/components';
import { API_CODE, API_PATH, INGREDIENTS_UNIT_TYPE, NO_IMAGE_URL } from '~/constants';
import { CategoryServices } from '~/services';
import { selectUserInfo } from '../Authenticate/authSlice';
import Comment from './components/Comment';

const author = {
  firstName: 'Marco',
  lastName: 'Reus',
  email: 'reus@example.com',
  phone: '1234567890',
  gender: 'male',
  dob: '01-01-2001',
};

const PostDetail = () => {
  const { id } = useParams();
  const userInfo = useSelector(selectUserInfo);

  const [save, setSave] = useState();
  const [click, setClick] = useState(false);
  const [like, setLike] = useState();
  const [value, setValue] = useState(-1);
  const [report, setReport] = useState(false);
  const [postDetail, setPostDetail] = useState();
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [
        data,
        { code: postDetailCode, data: postDetailData },
        { code: interactiveCode, data: interactiveData },
      ] = await Promise.all([
        CategoryServices.getList({ _all: true }),
        axiosInstance.get(API_PATH.posts.getDetail.replace(':id', id)),
        axiosInstance.get(API_PATH.posts.interactive, {
          params: { userId: userInfo?.id, postID: id },
        }),
      ]);

      if (+postDetailCode === API_CODE.success) {
        postDetailData.createdDate = Moment().format('MMM Do YY');
        setPostDetail(postDetailData);
      }
      if (+interactiveCode === API_CODE.success) {
        setSave(interactiveData.isSave);
        setLike(interactiveData.isLike);
      }
      if (data) {
        setCategory(data);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    //call api save post
    (async () => {
      if (postDetail) {
        try {
          if (click) {
            if (save) {
              const { code, message } = await axiosInstance.post(API_PATH.posts.savePost, {
                PostId: id,
                UserId: userInfo.id,
              });
              if (+code === API_CODE.success) {
                toast.success(message);
              } else {
                toast.error(message);
              }
            } else {
              const { code, message } = await axiosInstance.delete(API_PATH.posts.savePost, {
                data: { UserId: userInfo.id, RepostId: id },
              });
              if (+code === API_CODE.success) {
                toast.success(message);
              } else {
                toast.error(message);
              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [save]);

  useEffect(() => {
    (async () => {
      if (value !== -1) {
        try {
          const { code, message } = await axiosInstance.post(API_PATH.posts.report, {
            PostId: id,
            RepostProblem: value,
            UserId: userInfo.id,
          });
          if (+code === API_CODE.success) {
            toast.success(message);
          } else {
            toast.error(message);
          }
        } catch (err) {
          console.log(err);
        }
      }
    })();
  }, [report]);

  const handleLike = async (like) => {
    try {
      setLoading(true);
      const { code, message } = await axiosInstance.post(API_PATH.posts.like, {
        PostId: id,
        IsLike: like,
        UserId: userInfo.id,
      });

      if (like) {
        setPostDetail((prev) => {
          const _prev = { ...prev };
          setLike(like);
          _prev.like += 1;

          return _prev;
        });
      } else {
        setPostDetail((prev) => {
          const _prev = { ...prev };
          setLike(like);
          _prev.like -= 1;

          return _prev;
        });
      }
      if (+code === API_CODE.success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box h="100%" pt="2rem" pb="5rem" position="relative">
      {loading && <Loading />}
      <Grid templateColumns="repeat(3, 1fr)" gap="3rem" className="container">
        <GridItem colSpan={2}>
          <Image
            maxH="30rem"
            w="100%"
            src={postDetail?.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NO_IMAGE_URL;
            }}
          />
          <Box
            padding="40px"
            borderRight="1px"
            borderLeft="1px"
            borderBottom="1px"
            borderColor="#eee"
          >
            <Box
              fontSize="18px"
              textTransform="uppercase"
              letterSpacing="0.5px"
              fontWeight="900"
              color="#f48840"
            >
              {postDetail?.categoryName}
            </Box>
            <Box
              fontSize="24px"
              textTransform="capitalize"
              letterSpacing="0.5px"
              fontWeight="900"
              color="#20232e"
              m="10px 0px 12px 0px"
            >
              {postDetail?.title}
            </Box>
            <HStack spacing="10px">
              <Text fontSize="14px" color="#AAAAAA">
                {postDetail?.authorName}
              </Text>
              <Text fontSize="14px" color="#AAAAAA">
                {' '}
                |{' '}
              </Text>
              <Text fontSize="14px" color="#AAAAAA" mr="8px">
                {postDetail?.createdDate}
              </Text>
            </HStack>
            <Box color="20232E" fontSize="20PX" fontWeight="650PX">
              INGREDIENTS:
            </Box>
            {postDetail?.postProducts?.map((product, idx) => {
              return (
                <Box key={idx} color="20232E" fontSize="14px" fontWeight="500" mb="10px">
                  {`- ${product.productName} ${product.quantity}${
                    INGREDIENTS_UNIT_TYPE[product.type]?.name
                  }`}
                </Box>
              );
            })}
            <Box
              fontSize="15px"
              color="#7A7A7A"
              m="25px 0px"
              p="25px 0px"
              dangerouslySetInnerHTML={{ __html: postDetail?.content }}
            />
            <Flex gap="50px" align="center">
              {postDetail && (
                <>
                  <Box fontSize="20" fontWeight="bold">
                    {postDetail?.like} Likes
                  </Box>
                  <Flex gap="40px" cursor="pointer">
                    {like ? (
                      <AiFillLike fontSize="4rem" onClick={() => handleLike(!like)} />
                    ) : (
                      <AiOutlineLike fontSize="4rem" onClick={() => handleLike(!like)} />
                    )}
                  </Flex>
                </>
              )}
              <Button
                onClick={() => {
                  setSave(!save);
                  setClick(true);
                }}
              >
                {save ? 'Unsave' : 'Save'}
              </Button>
              {/* <PopperMenu trigger="click" renderCustomContent={renderCustomContent}>
                <div>HELLO</div>
              </PopperMenu> */}
              <Popover>
                <PopoverTrigger>
                  <Button>Report</Button>
                </PopoverTrigger>

                <PopoverContent w="28rem">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <RadioGroup value={value} onChange={setValue}>
                      <Flex direction="column" gap="2rem">
                        <Flex fontWeight="800" direction="row" gap="2rem">
                          <Radio w="4.5rem" value="0">
                            <Text>Spam</Text>
                          </Radio>
                          <Radio w="8rem" value="1">
                            <Text>Not Suitable Language</Text>
                          </Radio>
                          <Radio w="8rem" value="2">
                            <Text>Not Suitable Type</Text>
                          </Radio>
                        </Flex>
                        <Button onClick={() => setReport(!report)}>Submit</Button>
                      </Flex>
                    </RadioGroup>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </Flex>
          </Box>
          <Comment postDetail={postDetail} fetchData={fetchData} />
        </GridItem>

        <GridItem colSpan={1}>
          <Box border="4px" p="10px" borderColor="#eee">
            <Box
              color="20232E"
              fontSize="24px"
              m="30px 0px 25px"
              p="0px 0px 15px"
              fontWeight="900"
              borderBottom="1px"
              borderColor="#eee"
            >
              CATEGORY
            </Box>
            {category?.map((cate, idx) => {
              return (
                <Box key={idx} color="20232E" fontSize="20px" fontWeight="650" mb="15px">
                  <Link>- {cate.categoryName}</Link>
                </Box>
              );
            })}
          </Box>
          <Box mt="20px" p="10px" align="center">
            <Box
              color="20232E"
              fontSize="24px"
              m="30px 0px 25px"
              p="0px 0px 15px"
              fontWeight="900"
              borderBottom="1px"
              borderColor="#eee"
            >
              AUTHOR
            </Box>
            <Avatar
              name={postDetail?.authorName}
              w="120px"
              h="120px"
              src={postDetail?.authorAvatar}
            />
            <Box color="20232E" fontSize="20px" fontWeight="650">
              {postDetail?.authorName}
            </Box>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default PostDetail;
