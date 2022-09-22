import { Avatar, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '~/constants';

const PostContent = ({ isContentAbsolute, id, type, title, author, time, ...props }) => {
  let passProps = {};
  if (isContentAbsolute) {
    passProps = {
      position: 'absolute',
      bottom: '15%',
      left: '8%',
      backgroundColor: 'rgba(0,0,0, 0.4)',
      color: '#fff',
      w: '60%',
      ...props,
    };
  }

  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      flex="0.65"
      p="2rem"
      pr="3rem"
      {...passProps}
    >
      <Text
        display="inline-flex"
        align="center"
        justifyContent="center"
        width="fit-content"
        textTransform="uppercase"
        fontWeight={isContentAbsolute ? 600 : 700}
        fontSize="1.3rem"
        mb="1rem"
        letterSpacing="0.2rem"
        color={isContentAbsolute ? '#fff' : 'red.400'}
        bg={isContentAbsolute ? 'red.400' : 'transparent'}
        padding={isContentAbsolute ? '0 0.5rem' : 0}
        cursor="pointer"
        _hover={{ textDecoration: 'underline' }}
      >
        {type}
      </Text>
      <Link to={ROUTES_PATH.postDetail.replace(':id', id)}>
        <Text
          as="h2"
          fontSize={isContentAbsolute ? '3.2rem' : '2.4rem'}
          lineHeight="1.2"
          fontWeight="700"
          cursor="pointer"
          _hover={{ textDecoration: 'underline' }}
        >
          {title}
        </Text>
      </Link>

      <Flex gap="1rem" align="center" textTransform="uppercase" fontSize="1.2rem" mt="1rem">
        <Link to="/profile/@123">
          <Avatar
            src="https://images.unsplash.com/photo-1663431512960-eb3b4e71636d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            name="undefine"
            boxSize="3.2rem"
          />
        </Link>

        <Flex as="span">
          by
          {author && (
            <Link to={ROUTES_PATH.profile.replace(':id', author.id)}>
              <Text
                color="#2077d3"
                ml="4px"
                cursor="pointer"
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                {author.name}
              </Text>
            </Link>
          )}
        </Flex>
        <Text
          position="relative"
          paddingLeft="8px"
          color={isContentAbsolute ? 'darkTextColor.400' : 'rgba(22, 24, 35, 47%)'}
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              right: '100%',
              top: '50%',
              transform: 'translateY(-50%)',
              w: '2px',
              h: '100%',
              backgroundColor: isContentAbsolute ? 'darkTextColor.400' : 'textColor.300',
              borderRadius: '100rem',
            },
          }}
        >
          {time} DAYS AGO
        </Text>
      </Flex>
    </Flex>
  );
};

PostContent.defaultProps = {
  type: 'news',
  title: 'Exciting New Tools for Designers, September 2022',
  time: 6,
};

export default PostContent;
