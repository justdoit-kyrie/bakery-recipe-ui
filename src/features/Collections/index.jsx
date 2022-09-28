/* eslint-disable no-unused-vars */
import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MOCK_DATA = {
  category: [
    { id: 0, name: 'Everything' },
    { id: 1, name: 'Pop Culture' },
    { id: 2, name: 'News' },
    { id: 3, name: 'Recognition' },
    { id: 4, name: 'Technique' },
    { id: 5, name: 'European' },
  ],
  list: [
    {
      id: 0,
      type: 'european',
      title:
        'Exciting New Tools for Designers, September 2022 Exciting New Tools for Exciting New Tools for Designers, September 2022 Exciting New Tools for',
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
      id: 4,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'NANCY YOUNG' },
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
      id: 4,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1663431512656-b1d9e811735b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'NANCY YOUNG' },
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
      id: 4,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1664176702106-4196b5cf06d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'NANCY YOUNG' },
    },
    {
      id: 4,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1664136262345-daa7e71f0c0b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'NANCY YOUNG' },
    },
    {
      id: 4,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1661956603025-8310b2e3036d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'NANCY YOUNG' },
    },
    {
      id: 4,
      type: 'european',
      title: 'Exciting New Tools for Designers, September 2022',
      image:
        'https://images.unsplash.com/photo-1664187390565-bcb72ded82e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
      author: { id: 123, name: 'NANCY YOUNG' },
    },
  ],
};

const CollectionsPage = () => {
  const { category } = useParams();

  const [currentCategory, setCurrentCategory] = useState(category);
  const [lists, setLists] = useState(MOCK_DATA.list);

  useEffect(() => {
    // call api get categories
  }, []);

  useEffect(() => {
    // call api get list
  }, [currentCategory]);

  const fetchMoreData = () => setLists((prev) => [...prev, ...prev]);

  const renderCategories = () =>
    MOCK_DATA.category.map((item, idx) => {
      const passProps =
        item.name.toLowerCase() === currentCategory
          ? {
              backgroundImage: 'linear-gradient(180deg, #fff06b, #fff06b)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '6px bottom',
              backgroundSize: '100% 10px',
              _hover: {
                transition: 'all 0.25s linear',
                backgroundImage: 'linear-gradient(180deg,#ffc200,#ffc200)',
              },
            }
          : {};
      return (
        <Text
          key={idx}
          className="text"
          fontSize="2rem"
          w="fit-content"
          textAlign="center"
          textTransform="capitalize"
          cursor="pointer"
          _hover={{
            backgroundImage: 'linear-gradient(180deg, #fff06b, #fff06b)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '6px bottom',
            backgroundSize: '100% 10px',
          }}
          {...passProps}
          onClick={() => setCurrentCategory(item.name.toLowerCase())}
        >
          {item.name}
        </Text>
      );
    });

  const renderContent = () =>
    lists.map((item, key) => (
      <GridItem key={key}>
        <Flex direction="column" h="100%">
          <Image src={item.image} alt="post" w="100%" maxH="28rem" minH="28rem"></Image>
          <Flex direction="column" p="1rem" cursor="pointer" flex="1">
            <Text
              textTransform="uppercase"
              letterSpacing="2px"
              color="textColor.200"
              fontWeight="600"
              fontSize="1.2rem"
            >
              {item.type}
            </Text>

            <Text
              as="h4"
              className="text"
              fontSize="1.8rem"
              m="0.5rem 0"
              display="-webkit-box"
              overflow="hidden"
              textOverflow="ellipsis"
              wordBreak="break-word"
              sx={{
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
              }}
              _hover={{
                textDecoration: 'underline',
              }}
            >
              {item.title}
            </Text>

            <Text as="p" fontSize="1.2rem" color="textColor.200" mt="auto">
              {item.author.name}
            </Text>
          </Flex>
        </Flex>
      </GridItem>
    ));

  return (
    <Flex direction="column" h="100%" pt="5rem">
      {/* banner */}
      <Box position="relative" minH="25rem" maxH="25rem" overflow="hidden" w="100%">
        <Image
          src="https://assets.rbl.ms/21319417/2000x.jpg"
          alt="banner"
          w="100%"
          h="100%"
          objectFit="cover"
        ></Image>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
          bg="#fff"
          opacity="0.8"
          p="0 2rem"
        >
          <Text
            fontSize="4rem"
            lineHeight="75px"
            fontWeight="700"
            textTransform="capitalize"
            letterSpacing="2px"
          >
            {currentCategory}
          </Text>
        </Box>
      </Box>

      <Box className="container" w="100%">
        {category !== 'popular' && (
          <Flex wrap="wrap" align="center" justify="space-between" gap="2rem" p="4rem 6rem">
            {renderCategories()}
          </Flex>
        )}

        <Grid
          templateColumns="repeat(auto-fit, minmax(28rem, 1fr))"
          gap="2rem"
          m={category !== 'popular' ? 0 : '4rem 0 2rem'}
        >
          {renderContent()}
        </Grid>

        <Box
          backgroundImage="linear-gradient(180deg, #fff06b,#fff06b)"
          backgroundPosition="4px 1.5rem"
          backgroundRepeat="no-repeat"
          backgroundSize="100% 20px"
          display="inline-block"
          position="relative"
          left="50%"
          transform="translateX(-50%)"
          p="0 1rem"
          mb="3rem"
          _hover={{
            transition: 'all 0.25s linear',
            backgroundImage: 'linear-gradient(180deg,#ffc200,#ffc200)',
            cursor: 'pointer',
          }}
          onClick={fetchMoreData}
        >
          <Text fontSize="2rem" fontWeight="700">
            View more
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default CollectionsPage;
