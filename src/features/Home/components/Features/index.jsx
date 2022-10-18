import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HOME_FEATURES, NO_IMAGE_URL, ROUTES_PATH } from '~/constants';

const Features = ({
  title,
  desc,
  route,
  data,
  isCentered,
  type = HOME_FEATURES.reviewing,
  ...passProps
}) => {
  const navigate = useNavigate();
  return (
    <Box className="container" paddingX="50px" {...passProps}>
      <Flex
        direction="column"
        color="green.500"
        justify={isCentered ? 'center' : 'flex-start'}
        align={isCentered ? 'center' : 'flex-start'}
      >
        <Text as="h3" fontWeight="700" fontSize="40px" lineHeight="55px">
          {title}
        </Text>
        <Text
          as="p"
          fontWeight="400"
          fontSize="20px"
          lineHeight="23px"
          mt="10px"
          maxW="60%"
          textAlign={isCentered ? 'center' : 'start'}
        >
          {desc}
        </Text>
      </Flex>

      <Box mt="20px">
        <Link to={route}>
          <Text
            as="p"
            textAlign="end"
            fontWeight="400"
            fontSize="20px"
            color="green.500"
            mb="30px"
            lineHeight="1"
            _hover={{
              textDecoration: 'underline',
            }}
          >
            Xem thêm
          </Text>
        </Link>

        <Flex gap="20px">
          {data.map((item, idx) => (
            <Flex direction="column" key={idx} flex="1">
              <Image
                src={item.banner || NO_IMAGE_URL}
                borderRadius="31px"
                h="29rem"
                cursor="pointer"
                onClick={
                  type === HOME_FEATURES.reviewing
                    ? () => navigate(ROUTES_PATH.user.reviewingDetail.replace(':id', item.id))
                    : () => {}
                }
              />
              <Text
                fontWeight="600"
                fontSize="18px"
                p="15px 0"
                cursor="pointer"
                _hover={{ textDecoration: 'underline' }}
                onClick={
                  type === HOME_FEATURES.reviewing
                    ? () => navigate(ROUTES_PATH.user.reviewingDetail.replace(':id', item.id))
                    : () => {}
                }
              >
                {item.title}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Features;
