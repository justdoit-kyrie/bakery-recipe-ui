import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { NO_IMAGE_URL, ROUTES_PATH } from '~/constants';
import { CategoryServices, PostServices } from '~/services';

const CollectionsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [lists, setLists] = useState([]);
  const [pagination, setPagination] = useState();

  const _pageSize = useRef(10);
  const _currentPage = useRef(1);

  const fetchData = async () => {
    if (category === 'popular') {
      PostServices.getList(
        (data, pagination) => {
          setLists(data);
          setPagination(pagination);
        },
        {
          pageSize: _pageSize.current,
          _order: -1,
          _by: 'createdDate',
        }
      );
      return;
    }
    const data = await CategoryServices.getList({ _order: -1 });
    PostServices.getListByCategory(
      (data, pagination) => {
        setLists(data);
        setPagination(pagination);
      },
      {
        pageSize: _pageSize.current,
        _order: -1,
        _by: 'createdDate',
        categoryID: data.find((item) => item.categoryName.toLowerCase() === category.toLowerCase())
          .categoryId,
      }
    );
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchMoreData = () => {
    try {
      if (category === 'popular') {
        PostServices.getList(
          (data, pagination) => {
            setLists((prev) => [...prev, ...data]);
            setPagination(pagination);
          },
          {
            pageNumber: _currentPage.current + 1,
            pageSize: _pageSize.current,
            _order: -1,
            _by: 'createdDate',
          }
        );
        return;
      }

      PostServices.getListByCategory(
        (data, pagination) => {
          setLists((prev) => [...prev, ...data]);
          setPagination(pagination);
        },
        {
          pageNumber: _currentPage.current + 1,
          pageSize: _pageSize.current,
          _order: -1,
          _by: 'createdDate',
          categoryID: categories.find(
            (item) => item.categoryName.toLowerCase() === category.toLowerCase()
          ).categoryId,
        }
      );
    } catch (error) {
      console.log({ error });
    }
  };

  const renderCategories = () =>
    categories.map((item, idx) => {
      const passProps =
        item.categoryName.toLowerCase() === category.toLowerCase()
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
          onClick={() =>
            navigate(ROUTES_PATH.user.collections.replace(':category', item.categoryName))
          }
        >
          {item.categoryName}
        </Text>
      );
    });

  const renderContent = () =>
    lists.map((item, key) => (
      <GridItem key={key}>
        <Flex direction="column" h="100%">
          <Image
            src={item.image}
            alt="post"
            w="100%"
            maxH="28rem"
            minH="28rem"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NO_IMAGE_URL;
            }}
          />
          <Flex direction="column" p="1rem" cursor="pointer" flex="1">
            <Text
              textTransform="uppercase"
              letterSpacing="2px"
              color="textColor.200"
              fontWeight="600"
              fontSize="1.2rem"
            >
              {category}
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
              onClick={() => navigate(ROUTES_PATH.user.postDetail.replace(':id', item.id))}
            >
              {item.title}
            </Text>

            <Text as="p" fontSize="1.2rem" color="textColor.200" mt="auto">
              {item.authorName}
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
          borderRadius="10px"
        >
          <Text
            fontSize="4rem"
            lineHeight="75px"
            fontWeight="700"
            textTransform="capitalize"
            letterSpacing="2px"
          >
            {category}
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

        {pagination?.hasNext && (
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
        )}
      </Box>
    </Flex>
  );
};

export default CollectionsPage;
