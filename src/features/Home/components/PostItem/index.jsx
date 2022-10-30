import { Box, Image } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { NO_IMAGE_URL, ROUTES_PATH } from '~/constants';
import PostContent from '../PostContent';

const PostItem = ({
  isContentAbsolute = false,
  minH = '19rem',
  maxH = '70rem',
  itemWidth = '100%',
  image,
  isAnimation = true,
  direction = 'row',
  ...props
}) => {
  const { id } = props;
  return (
    <Box position="relative" minH={minH} maxH={maxH} h="100%" w={itemWidth}>
      <Box
        as={motion.div}
        sx={
          isAnimation
            ? {
                transition: 'all 0.35s ease',
                '.image': {
                  transition: 'all 1.5s linear',
                },

                '&:hover': {
                  width: 'calc(100% + 20px)',
                  height: 'calc(100% + 20px)',
                  top: '-10px',
                  left: '-10px',
                },

                '&:hover .image': {
                  transform: 'scale(1.2)',
                  transitionDelay: '0.35s',
                },
              }
            : {}
        }
        position="absolute"
        inset="0"
        w="100%"
        h="100%"
        display="flex"
        alignItems="center"
        flexDirection={direction}
        bg="#fff"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      >
        <Link
          to={ROUTES_PATH.user.postDetail.replace(':id', id)}
          style={{
            width: '100%',
            height: '100%',
            flex: isContentAbsolute || direction === 'column' ? 1 : '0.4',
            overflow: 'hidden',
          }}
        >
          {isContentAbsolute ? (
            <Box position="absolute" inset="0" w="100%" h="100%" overflow="hidden">
              <Image
                src={image}
                alt="post-item"
                h="100%"
                w="100%"
                className="image"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = NO_IMAGE_URL;
                }}
              />
            </Box>
          ) : (
            <Box h="100%" borderRight="4px solid black" className="image">
              <Image
                src={image}
                alt="post-item"
                w="100%"
                h="100%"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = NO_IMAGE_URL;
                }}
              />
            </Box>
          )}
        </Link>

        <PostContent isContentAbsolute={isContentAbsolute} {...props} />
      </Box>
    </Box>
  );
};

export default PostItem;
