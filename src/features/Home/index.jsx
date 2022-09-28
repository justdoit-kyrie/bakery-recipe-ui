import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '~/constants';
import CategoryPosts from './components/CategoryPosts';
import PostItem from './components/PostItem';

const MOCK_DATA = {
  margin: '3rem',
  newests: [
    {
      id: 0,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'PADDI MACDONNELL' },
    },
    {
      id: 1,
      type: 'asian',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1662859009178-62afb0cff049?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'DANIEL SEGUN' },
    },
    {
      id: 2,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'BEN MOSS' },
    },
    {
      id: 3,
      type: 'asian',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'CARRIE COUSINS' },
    },
    {
      id: 4,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'NANCY YOUNG' },
    },
    {
      id: 5,
      type: 'asian',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'BEN MOSS' },
      isContentAbsolute: true,
      left: 0,
      bottom: '3rem',
      width: '80%',
    },
    {
      id: 6,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'BEN MOSS' },
      isContentAbsolute: true,
      left: 0,
      bottom: '3rem',
      width: '80%',
    },
  ],
  popular: [
    {
      id: 0,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'PADDI MACDONNELL' },
    },
    {
      id: 1,
      type: 'asian',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1662859009178-62afb0cff049?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'DANIEL SEGUN' },
    },
    {
      id: 2,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'BEN MOSS' },
    },
    {
      id: 3,
      type: 'asian',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'CARRIE COUSINS' },
    },
    {
      id: 4,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'NANCY YOUNG' },
    },
  ],
};

const Home = () => {
  const { newests, popular, margin } = MOCK_DATA;

  const [posts, setPosts] = useState(newests);
  const [firstPost, setFirstPost] = useState();

  useEffect(() => {
    // call api
    setFirstPost(newests[0]);
    setPosts(newests.slice(1, newests.length));
  }, []);

  const renderPopularPost = ({ image, type, title, id }, key) => (
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
        <Link to={ROUTES_PATH.postDetail.replace(':id', id)}>
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
          {type}
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
          {posts.map((item, idx) => (
            <GridItem key={idx} area={`h${idx + 1}`}>
              <PostItem {...item} />
            </GridItem>
          ))}
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
          {popular.map((item, key) => renderPopularPost(item, key))}
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
        {posts.map((item, idx) => (
          <GridItem key={idx} area={`h${idx + 1}`}>
            <PostItem {...item} />
          </GridItem>
        ))}
      </Grid>

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
        <Link to={ROUTES_PATH.collections.replace(':category', 'popular')}>
          <Text fontSize="2rem" fontWeight="700">
            View more
          </Text>
        </Link>
      </Box>

      {/* category */}
      <CategoryPosts margin={margin} data={popular} />
    </Box>
  );
};

export default Home;
