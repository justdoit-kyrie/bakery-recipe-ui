import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import QuillToolbar, { formats, modules } from './config';
import { Wrapper } from './style';

const EditorField = ({ name, control, errors, showError = true }) => {
  const isError = !!errors[name];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Flex
          direction="column"
          h="100%"
          sx={{
            '.ql-container': {
              borderTop: 'none',
            },
            '.ql-toolbar, .ql-container': {
              borderColor: isError ? 'rgb(255, 76, 58)' : 'rgba(22, 24, 35, 0.12)',
            },
          }}
        >
          <QuillToolbar />
          <Wrapper>
            <ReactQuill
              {...field}
              theme="snow"
              placeholder="Write something awesome..."
              modules={modules}
              formats={formats}
            />
          </Wrapper>

          {isError && showError && (
            <Text mt="6px" fontSize="1.2rem" lineHeight="15px" color="rgb(255, 76, 58)">
              {errors[name].message}
            </Text>
          )}
        </Flex>
      )}
    />
  );
};

export default EditorField;
