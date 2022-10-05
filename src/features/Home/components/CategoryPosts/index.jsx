import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '~/constants';
import PostItem from '../PostItem';

const MOCK_DATA = {
  category: [
    { id: 0, name: 'Everything' },
    { id: 1, name: 'Pop Culture' },
    { id: 2, name: 'News' },
    { id: 3, name: 'Recognition' },
    { id: 4, name: 'Technique' },
  ],
};

const CategoryPosts = ({ margin, data }) => {
  const { category } = MOCK_DATA;

  const [posts, setPosts] = useState(data);
  const [isClicked, setIsClicked] = useState(false);
  const [type, setType] = useState('EUROPEAN');

  useEffect(() => {
    // call api get posts
    console.log({ setPosts });
  }, [type]);

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
            {type}
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
            {category.map((item, idx) => (
              <Text
                key={idx}
                className="text"
                fontSize="2rem"
                w="calc(20% - 2rem)"
                textAlign="center"
                textTransform="capitalize"
                _hover={{ color: 'red.400', cursor: 'pointer' }}
                onClick={() => setType(item.name)}
              >
                {item.name}
              </Text>
            ))}
          </Flex>
        </Center>
      </Box>

      <Flex className="container" gap={margin} wrap="wrap" justify="space-between">
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
        <Link to={ROUTES_PATH.collections.replace(':category', type.toLowerCase())}>
          <Text fontSize="2rem" fontWeight="700">
            View more
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default CategoryPosts;
