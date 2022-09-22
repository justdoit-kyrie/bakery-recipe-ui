import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Logo } from '../Icons';

const Footer = () => {
  return (
    <Box>
      {/* Top */}
      <Flex justify="space-between" align="center" p="5.6rem 0 4.8rem" className="container">
        <Flex direction="column" maxW="36.8rem" gap="2rem">
          <Logo width="11.8rem" height="5rem" />
          <Text as="p" fontSize="22px" lineHeight="32px" fontWeight="500">
            The online wholesale marketplace connecting independent retailers and brands around the
            world.
          </Text>
        </Flex>

        <Flex
          minW="39rem"
          justify="space-between"
          align="flex-start"
          sx={{
            '& > *': {
              width: 'calc(calc(100% / 3) - 0.5rem)',
            },
          }}
        >
          <Flex
            direction="column"
            gap="0.5rem"
            justify="flex-start"
            align="flex-start"
            sx={{
              '& > *:not(:first-of-type)': {
                cursor: 'pointer',
              },
            }}
          >
            <Text as="h2" className="text" mb="1rem">
              Company
            </Text>
            <Text as="p">About Us</Text>
            <Text as="p">Newsroom</Text>
            <Text as="p">Careers</Text>
            <Text as="p">Partnerships</Text>
          </Flex>

          <Flex
            direction="column"
            gap="0.5rem"
            justify="flex-start"
            align="flex-start"
            sx={{
              '& > *:not(:first-of-type)': {
                cursor: 'pointer',
              },
            }}
          >
            <Text as="h2" className="text" mb="1rem">
              Support
            </Text>
            <Text as="p">Help Center</Text>
            <Text as="p">Faire Markets</Text>
            <Text as="p">Sell on Faire</Text>
          </Flex>

          <Flex
            direction="column"
            gap="0.5rem"
            justify="flex-start"
            align="flex-start"
            sx={{
              '& > *:not(:first-of-type)': {
                cursor: 'pointer',
              },
            }}
          >
            <Text as="h2" className="text" mb="1rem">
              Connect
            </Text>
            <Text as="p">Blog</Text>
            <Text as="p">Instagram</Text>
            <Text as="p">Facebook</Text>
            <Text as="p">Twitter</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* bottom */}
      <Box borderTop="1px solid rgb(0 0 0 / 12%)" p="2.4rem 0 3.2rem">
        <Flex
          className="lg-container"
          gap="1.6rem"
          align="center"
          sx={{
            '& > *': {
              lineHeight: 1.2,
              color: 'textColor.300',
              cursor: 'pointer',
            },
            '& > *:not(:first-of-type)': {
              pl: '1.6rem',
              borderLeft: '1px solid black',
            },
          }}
        >
          <Text>©2022 Levain Bakery, Inc.</Text>
          <Text>Terms of Service</Text>
          <Text>Privacy Policy</Text>
          <Text>Cookie Policy</Text>
          <Text>IP Policy</Text>
          <Text>Sitemap</Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;
