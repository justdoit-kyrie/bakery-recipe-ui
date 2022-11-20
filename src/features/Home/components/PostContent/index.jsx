import { Avatar, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES_PATH } from '~/constants';

const PostContent = ({
  isContentAbsolute,
  id,
  categoryName,
  title,
  authorID,
  authorAvatar,
  authorName,
  time = 6,
  ...props
}) => {
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
    delete passProps?.categoryID;
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
        {categoryName}
      </Text>
      <Link to={ROUTES_PATH.user.postDetail.replace(':id', id)}>
        <Text
          as="h2"
          fontSize={isContentAbsolute ? '3.2rem' : '2.4rem'}
          lineHeight="1.2"
          fontWeight="700"
          cursor="pointer"
          noOfLines={2}
          _hover={{ textDecoration: 'underline' }}
          textTransform="uppercase"
        >
          {title}
        </Text>
      </Link>

      <Flex gap="1rem" align="center" textTransform="uppercase" fontSize="1.2rem" mt="1rem">
        <Link to={`/profile/@${authorID}`}>
          <Avatar src={authorAvatar} name={authorName} boxSize="3.2rem" />
        </Link>

        <Flex as="span">
          by
          {authorID && authorName && (
            <Link to={ROUTES_PATH.user.profile.replace(':id', authorID)}>
              <Text
                color="#2077d3"
                ml="4px"
                cursor="pointer"
                _hover={{
                  textDecoration: 'underline',
                }}
              >
                {authorName}
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

export default PostContent;
