import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { default as axios } from '~/app/api';
import { API_CODE, API_PATH, POST_MAX_LENGTH, ROUTES_PATH } from '~/constants';
import PostItem from '../PostItem';

const CategoryPosts = ({ margin }) => {
  const [posts, setPosts] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [categories, setCategories] = useState([]);
  const [type, setType] = useState();

  const _totalRecords = useRef();

  const fetchData = async () => {
    try {
      const { code, data } = await axios.get(API_PATH.categories.getList, {
        params: { pageSize: 10, _order: -1 },
      });
      if (+code === API_CODE.success) {
        setCategories(data);
        data.length !== 0 && setType(data[0]);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    // call api get posts
    if (type && type.categoryId) {
      (async () => {
        try {
          const { code, data, totalRecords } = await axios.get(API_PATH.posts.getByCategory, {
            params: { _by: 'createdDate', _order: -1, pageSize: 10, categoryID: type.categoryId },
          });
          if (+code === API_CODE.success) {
            setPosts(data);
            _totalRecords.current = totalRecords;
          }
        } catch (error) {
          console.log({ error });
        }
      })();
    }
  }, [type]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box mt={margin}>
      <Text
        fontSize="3.2rem"
        lineHeight="2.5"
        fontWeight="600"
        className="container secondary-font"
        textAlign="center"
        mb={margin}
      >
        Be inspired, get smarter, and feel better every week!
      </Text>

      <Box>
        <Flex justify="space-between" mb="1.5rem" className="container">
          <Text color="red.400" textTransform="uppercase" className="text" fontSize="2rem">
            {type?.categoryName}
          </Text>
          <Flex align="center" cursor="pointer" onClick={() => setIsClicked(!isClicked)}>
            <Text className="text" textTransform="capitalize" color="red.400">
              sort by
            </Text>
            <Text transition="all 0.25s ease" transform={isClicked && 'rotate(180deg)'}>
              <HiChevronDown fontSize="2rem" color="rgb(254, 44, 85)" />
            </Text>
          </Flex>
        </Flex>

        <Center
          className="lg-container"
          bg="textColor.400"
          transition="all 0.75s ease"
          h={isClicked ? '15rem' : 0}
          mb={isClicked ? margin : 0}
          overflow="hidden"
          color="darkTextColor.400"
        >
          <Flex justify="space-between" align="center" gap="2rem" w="60%" wrap="wrap" p="2rem">
            {categories.map((item, idx) => (
              <Text
                key={idx}
                className="text"
                fontSize="2rem"
                w="calc(20% - 2rem)"
                textAlign="center"
                textTransform="capitalize"
                _hover={{ color: 'red.400', cursor: 'pointer' }}
                onClick={() => setType(item)}
              >
                {item.categoryName}
              </Text>
            ))}
          </Flex>
        </Center>
      </Box>

      <Flex className="container" gap={margin} wrap="wrap" justify="flex-start" align="flex-start">
        {posts.map((item, idx) => {
          if (idx === 0) return <PostItem key={idx} minH="30rem" {...item} />;
          return (
            <PostItem
              key={idx}
              direction="column"
              itemWidth={`calc(calc(100% / 3) - ${margin})`}
              minH="40rem"
              {...item}
            />
          );
        })}
      </Flex>

      {_totalRecords.current > POST_MAX_LENGTH && (
        <Box
          mt={margin}
          backgroundImage="linear-gradient(180deg, rgb(255, 76, 58),rgb(255, 76, 58))"
          backgroundPosition="4px 1.5rem"
          backgroundRepeat="no-repeat"
          backgroundSize="100% 20px"
          display="inline-block"
          position="relative"
          left="50%"
          transform="translateX(-50%)"
          p="0 1rem"
          _hover={{
            transition: 'all 0.25s linear',
            backgroundImage: 'linear-gradient(180deg,#ffc200,#ffc200)',
            cursor: 'pointer',
          }}
        >
          <Link
            to={ROUTES_PATH.user.collections.replace(':category', type?.categoryName)}
            state={{ categoryID: type?.categoryId }}
          >
            <Text fontSize="2rem" fontWeight="700">
              View more
            </Text>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default CategoryPosts;
