import { Box, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import LOGO from '~/assets/images/footer-logo.png';
import { ROUTES_PATH } from '~/constants';

const MOCK_DATA = {
  _categories: [
    { to: ROUTES_PATH.common.home, label: 'Trang chủ' },
    { to: ROUTES_PATH.user.planning, label: 'Kế hoạch' },
    { to: ROUTES_PATH.user.reviewing, label: 'Review/ Booking' },
    { to: ROUTES_PATH.common.home, label: 'Đánh giá' },
  ],
  _contact: [
    { href: 'tel:+84905904964', label: '090 590 4964' },
    { href: 'mailto:tareboapp@gmail.com', label: 'tareboapp@gmail.com' },
  ],
};

const Footer = () => {
  const { _categories, _contact } = MOCK_DATA;
  return (
    <Box py="70px" bg="green.500" mt="70px">
      <Flex className="container" justify="space-between" align="flex-start">
        <Image src={LOGO} />

        <Grid templateColumns="repeat(2, 1fr)" gap="30px">
          <GridItem>
            <Flex direction="column" color="#fff">
              <Text as="h3" fontWeight="600" fontSize="28px" lineHeight="34px" mb="16px">
                Danh mục
              </Text>
              <Flex direction="column" gap="15px">
                {_categories.map((item, idx) => (
                  <Link key={idx} to={item.to}>
                    <Text
                      fontWeight="500"
                      fontSize="18px"
                      lineHeight="18px"
                      letterSpacing="0.105em"
                      _hover={{ textDecoration: 'underline' }}
                    >
                      {item.label}
                    </Text>
                  </Link>
                ))}
              </Flex>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex direction="column" color="#fff">
              <Text as="h3" fontWeight="600" fontSize="28px" lineHeight="34px" mb="16px">
                Liên hệ
              </Text>
              <Flex direction="column" gap="15px">
                {_contact.map((item, idx) => (
                  <a key={idx} href={item.href}>
                    <Text
                      fontWeight="500"
                      fontSize="18px"
                      lineHeight="18px"
                      letterSpacing="0.105em"
                      _hover={{ textDecoration: 'underline' }}
                    >
                      {item.label}
                    </Text>
                  </a>
                ))}
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Flex>
    </Box>
  );
};

export default Footer;
