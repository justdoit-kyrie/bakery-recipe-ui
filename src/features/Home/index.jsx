import { Box, Button, Circle, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ACTION1 from '~/assets/images/action-1.png';
import BANNER from '~/assets/images/home-banner.png';
import MANAGE2 from '~/assets/images/manage-2.jpg';
import { HOME_FEATURES, ROUTES_PATH } from '~/constants';
import { CategoryServices, NewsServices, ReviewServices } from '~/services';
import Features from './components/Features';

const MOCK_DATA = {
  _marginTop: '80px',
};

const Home = () => {
  const { _marginTop } = MOCK_DATA;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [reviewList, setReviewList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const _pageSize = useRef(4);

  const fetchData = async () => {
    Promise.all([
      ReviewServices.getList(
        (data) => {
          setReviewList(data);
        },
        {
          PageSize: _pageSize.current,
        }
      ),
      NewsServices.getList(
        (data) => {
          setNewsList(data);
        },
        {
          PageSize: _pageSize.current,
        }
      ),
      CategoryServices.getList((data) => {
        setCategories(data.map((item) => ({ ...item, src: MANAGE2 })));
      }),
    ]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      <Box className="container">
        <Image src={BANNER} />

        {/* content */}
        <Flex
          direction="column"
          position="absolute"
          zIndex="1"
          top="50%"
          left="50%"
          transform="translate(-50%,-50%)"
          color="white"
          justify="center"
          align="center"
          maxW="639px"
        >
          <Text
            as="h2"
            fontWeight={600}
            fontSize="40px"
            lineHeight="53px"
            textAlign="center"
            maxW="610px"
          >
            Lên Kế Hoạch Cho Chuyến Đi Sắp Tới
          </Text>
          <Text as="h1" fontWeight={600} fontSize="85px" lineHeight="106px">
            NGAY NÀO!!!
          </Text>
          <Text as="p" fontWeight="400" fontSize="20px" lineHeight="23px" mt="14px">
            Thiết lập một lộ trình hoàn hảo dành riêng cho bạn cùng với Tarebo
          </Text>
          <Button
            mt="26px"
            bg="green.500"
            borderRadius="100rem"
            onClick={() => navigate(ROUTES_PATH.user.planning)}
          >
            Kế hoạch
          </Button>
        </Flex>
      </Box>

      <Features
        title="Hôm nay có gì nào?"
        desc="Cùng Tarebo tìm hiểu những thông tin du lịch mới nhất!"
        data={newsList}
        route={ROUTES_PATH.user.collections.replace(':category', HOME_FEATURES.news)}
        mt={_marginTop}
        type={HOME_FEATURES.news}
      />

      <Features
        isCentered
        title="Cảm nhận cá nhân/Đánh giá"
        desc="Nơi bạn có thể tìm thấy nnhững bài viết, bình luận đánh giá về các địa điểm, địa danh, chất lượng dịch vụ v..v... của mọi người."
        data={reviewList}
        route={ROUTES_PATH.user.collections.replace(':category', HOME_FEATURES.reviewing)}
        mt={_marginTop}
      />

      {/* future plan */}
      <Flex className="container" maxW="50%" m={`${_marginTop} auto 0`} justify="space-between">
        {categories.map((item, idx) => (
          <Flex
            key={idx}
            justify="center"
            align="center"
            direction="column"
            gap="20px"
            maxW="181px"
          >
            <Circle
              bg="rgba(253, 228, 208, 1)"
              w="120px"
              h="120px"
              cursor="pointer"
              onClick={() =>
                navigate(ROUTES_PATH.user.collections.replace(':category', item.name.toLowerCase()))
              }
            >
              <Flex w="60%" h="60%" justify="center" align="center">
                <Image src={item.src} />
              </Flex>
            </Circle>
            <Text
              fontWeight="700"
              fontSize="32px"
              lineHeight="37px"
              textAlign="center"
              color="green.500"
              cursor="pointer"
              _hover={{ textDecoration: 'underline' }}
              onClick={() =>
                navigate(ROUTES_PATH.user.collections.replace(':category', item.name.toLowerCase()))
              }
            >
              {item.name}
            </Text>
          </Flex>
        ))}
      </Flex>

      <Flex className="container" mt={_marginTop} paddingX="50px">
        <Box position="relative" flex="1">
          <Image src={ACTION1} borderRadius="17px" w="100%" h="100%" />
          <Image
            src={ACTION1}
            w="289px"
            h="259px"
            borderRadius="17px"
            position="absolute"
            top="50%"
            right="0"
            transform="translateX(50%) translateY(-50%)"
          />
        </Box>
        <Flex justify="flex-end" flex="1" color="green.500" pl="100px">
          <Box maxW="468px">
            <Text fontWeight="700" fontSize="64px" lineHeight="74px">
              Bạn Cảm Thấy Thế Nào?
            </Text>
            <Text fontWeight="400" fontSize="20px" lineHeight="23px" my="30px">
              Hãy chia sẻ những trải nghiệm cũng như đánh giá của bạn về những nơi bạn đã đến trong
              chuyến đi tại đây nhé!
            </Text>
            <Button
              variant="outline-default"
              borderColor="#00C0A6"
              borderRadius="100px"
              onClick={() => navigate(ROUTES_PATH.user.upload)}
            >
              Đăng Bài
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
