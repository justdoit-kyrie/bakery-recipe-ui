import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { default as axios } from '~/app/api';
import { API_CODE, API_PATH, POST_MAX_LENGTH, ROUTES_PATH } from '~/constants';
import CategoryPosts from './components/CategoryPosts';
import PostItem from './components/PostItem';

const MOCK_DATA = {
  margin: '3rem',
  popular_size: 5,
};

const Home = () => {
  const { margin, popular_size } = MOCK_DATA;

  const [newestPosts, setNewestPosts] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);

  const [firstPost, setFirstPost] = useState();

  const _order = useRef(-1);
  const popularTotalRecords = useRef();

  const fetchData = async () => {
    try {
      const [
        { code: newestCode, data: newestData },
        { code: popularCode, data: popularData, totalRecords },
      ] = await Promise.all([
        axios.get(API_PATH.posts.getList, {
          params: {
            _by: 'createdDate',
            _order: _order.current,
            pageSize: 7,
          },
        }),
        axios.get(API_PATH.posts.getList, {
          params: {
            _by: 'like',
            _order: _order.current,
            pageSize: 12,
          },
        }),
      ]);

      if (+newestCode === API_CODE.success) {
        newestData[newestData.length - 1].isContentAbsolute = true;
        newestData[newestData.length - 2].isContentAbsolute = true;
        setFirstPost(newestData[0]);
        setNewestPosts(newestData.slice(1));
      }

      if (+popularCode === API_CODE.success) {
        popularData[popularData.length - 1].isContentAbsolute = true;
        setPopularPosts(popularData);
        popularTotalRecords.current = totalRecords;
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderPopularPost = ({ image, categoryName, title, id }, key) => (
    <Flex
      key={key}
      as={motion.div}
      direction="column"
      gap="2rem"
      flex="1"
      whileHover={{ scale: 1.05, transition: { type: 'spring' } }}
      sx={{
        '&:hover img': {
          transition: 'all 1.5s linear 0.25s',
          transform: 'scale(1.2)',
        },
      }}
    >
      <Box position="relative">
        <Link to={ROUTES_PATH.user.postDetail.replace(':id', id)}>
          <Box
            className="post-image"
            clipPath="polygon(30px 0,100% 0,calc(100% - 30px) 100%,0 100%)"
            cursor="pointer"
          >
            <Image maxH="28rem" w="100%" src={image} alt="popular-post" />
          </Box>
        </Link>
        <Text
          p="4px 8px"
          textTransform="uppercase"
          fontWeight="600"
          bg="red.400"
          display="inline-block"
          position="absolute"
          left="50%"
          bottom={0}
          transform="translateX(-50%) translateY(50%)"
        >
          {categoryName}
        </Text>
      </Box>

      <Text p="2rem" pr="2.5rem" fontSize="1.8rem" textAlign="center" ml="-30px">
        {title}
      </Text>
    </Flex>
  );

  return (
    <Box h="100%" pt="9rem" pb="5rem">
      {/* newsest */}
      <Flex id="newest" direction="column" gap={margin} mb={margin} className="container">
        <PostItem isContentAbsolute minH="70rem" isAnimation={false} {...firstPost} />

        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(4, 19rem)"
          // eslint-disable-next-line quotes
          templateAreas={`"h1 h5" "h2 h5" "h3 h6" "h4 h6"`}
          gap={margin}
        >
          {newestPosts.map((item, idx) => {
            delete item.categoryID;
            return (
              <GridItem key={idx} area={`h${idx + 1}`}>
                <PostItem {...item} />
              </GridItem>
            );
          })}
        </Grid>
      </Flex>

      {/* popular */}
      <Box bg="textColor.400" className="lg-container" color="white" position="relative">
        <Text
          textTransform="uppercase"
          p="4px 1rem"
          fontSize="2.6rem"
          fontWeight={700}
          bg="red.400"
          display="inline-block"
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
        >
          popular posts
        </Text>
        <Flex
          px="1.5rem"
          pt="8rem"
          sx={{
            '& > :first-of-type .post-image': {
              clipPath: 'polygon(0px 0,100% 0,calc(100% - 30px) 100%,0 100% )',
            },
            '& > :last-child .post-image': {
              clipPath: 'polygon(30px 0,100% 0,calc(100% - 0px) 100%,0 100% )',
            },
          }}
        >
          {popularPosts.slice(0, popular_size).map((item, key) => renderPopularPost(item, key))}
        </Flex>
      </Box>

      <Grid
        mt={margin}
        className="container"
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(4, 19rem)"
        // eslint-disable-next-line quotes
        templateAreas={`"h1 h5" "h2 h5" "h3 h6" "h4 h6"`}
        gap={margin}
      >
        {popularPosts.slice(popular_size).map((item, idx) => {
          delete item.categoryID;
          return (
            <GridItem key={idx} area={`h${idx + 1}`}>
              <PostItem {...item} />
            </GridItem>
          );
        })}
      </Grid>

      {popularTotalRecords.current > POST_MAX_LENGTH && (
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
          <Link to={ROUTES_PATH.user.collections.replace(':category', 'popular')}>
            <Text fontSize="2rem" fontWeight="700">
              View more
            </Text>
          </Link>
        </Box>
      )}

      {/* category */}
      <CategoryPosts margin={margin} />
    </Box>
  );
};

export default Home;
