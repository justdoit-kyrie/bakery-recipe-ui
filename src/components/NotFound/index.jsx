import { Button, Center, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { ROUTES_PATH } from '~/constants';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Center
      h="100%"
      bg="url(https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/site/static/webapp-static-site/532e06c8382fb6011df0.png) center center / cover no-repeat transparent"
    >
      <Flex direction="column" gap="3.5rem" justify="center" align="center">
        <Flex
          gap="0.5rem"
          fontSize="300px"
          fontWeight="500"
          lineHeight="244px"
          className="secondary-font"
        >
          <Text>4</Text>
          <Image
            w="24.4rem"
            h="24.4rem"
            src="https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/site/static/webapp-static-site/bbad6f99219877ac47f9.png"
            alt="not found"
            transform="translateY(15%)"
          />
          <Text lineHeight="244px">4</Text>
        </Flex>
        <Text as="p" fontSize="18px" lineHeight="25px" color="textColor.200">
          Couldn't find this page
        </Text>

        <Flex
          direction="column"
          gap="2.5rem"
          className="secondary-font"
          justify="center"
          align="center"
        >
          <Text fontWeight="700" fontSize="24px" lineHeight="28px">
            Check out more trending videos on TikTok
          </Text>

          <Button
            leftIcon={<BiArrowBack />}
            fontSize="18px"
            lineHeight="25px"
            fontWeight="600"
            size="lg"
            w="80%"
            onClick={() => navigate(ROUTES_PATH.common.home)}
          >
            Back now
          </Button>
        </Flex>
      </Flex>
    </Center>
  );
};

export default NotFoundPage;
