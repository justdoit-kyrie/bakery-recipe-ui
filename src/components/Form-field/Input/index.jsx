import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  useColorMode,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { COLOR_MODE_TYPE } from '~/constants';

/**
 * component InputField
 * @param {ref} initialRef auto focus input
 * @param {string} label label display, if not pass can get name for display
 * @param {boolean} showLabel label display or not
 * @param {string} placeholder
 * @param {boolean} showError error message display or not
 * @param {string (css code)} errorBorderColor combine with prop showError, handle delete color red of border when inputField error
 * @param {object} leftIcon in this object have field required icon, remaining is style of icon (width, heigh, ...)[chakra UI rule props components]
 * @param {object} rightIcon in this object have field required icon, remaining is style of icon (width, heigh, ...)[chakra UI rule props components]
 * @param {function} onBlur custom blur instead of default onBlur of react-hook-form lib
 * @param {any} passProps remaining style of input (width, heigh, ...)[chakra UI rule props components]
 * @returns
 */

const InputField = ({
  initialRef,
  name,
  label = name,
  showLabel = true,
  control,
  placeholder,
  errors,
  showError = true,
  errorBorderColor,
  formHelperText,
  setIsFocus = () => {},
  leftIcon: { icon: leftIcon, w: leftIconW, h: leftIconH, ...leftIconPassProps } = {},
  rightIcon: { icon: rightIcon, w: rightIconW, h: rightIconH, ...rightIconPassProps } = {},
  onBlur: onBlurCustom = () => {},
  ...passProps
}) => {
  const { colorMode } = useColorMode();

  const isError = !!errors[name];
  const RightIcon = rightIcon;
  const LeftIcon = leftIcon;

  useEffect(() => {
    if (isError) {
      setIsFocus(true);
    } else {
      setIsFocus(false);
    }
  }, [isError]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const { onBlur } = field;
        return (
          <FormControl mt={showLabel ? 4 : 0} isInvalid={isError}>
            {showLabel && (
              <FormLabel fontSize="1.5rem" fontWeight={600} textTransform="capitalize">
                {label}
              </FormLabel>
            )}

            <InputGroup>
              {LeftIcon && (
                <InputLeftAddon
                  height="4.4rem"
                  cursor="pointer"
                  // eslint-disable-next-line react/no-children-prop
                  children={
                    <LeftIcon width={leftIconW} height={leftIconH} {...leftIconPassProps} />
                  }
                />
              )}

              <Input
                {...field}
                {...passProps}
                ref={initialRef}
                fontSize="1.6rem"
                color={colorMode === COLOR_MODE_TYPE.light ? 'textColor.400' : 'darkTextColor.400'}
                h="4.4rem"
                backgroundColor="rgba(22, 24, 35, 0.06)"
                border="1px solid rgba(22, 24, 35, 0.12)"
                lineHeight="100%"
                placeholder={placeholder}
                focusBorderColor="none"
                errorBorderColor={
                  !showError && errorBorderColor ? errorBorderColor : 'rgb(255, 76, 58)'
                }
                _hover={{}}
                sx={{
                  caretColor: 'rgba(254, 44, 85, 1.0)',
                  '&[aria-invalid=true],&[data-invalid]': {
                    boxShadow: 'none',
                  },
                  '&[data-focus-visible], &:focus-visible': {
                    boxShadow: 'none',
                  },
                  '&[type=password]::-ms-reveal,&[type=password]::-ms-clear': {
                    display: 'none',
                  },
                }}
                onBlur={() => {
                  if (!isError) onBlurCustom();
                  onBlur();
                }}
              />
              {RightIcon && (
                <InputRightElement
                  width="4.5rem"
                  h="100%"
                  sx={{
                    '& > *': {
                      cursor: 'pointer',
                    },
                  }}
                >
                  <RightIcon width={rightIconW} h={rightIconH} {...rightIconPassProps} />
                </InputRightElement>
              )}
            </InputGroup>

            {formHelperText && !isError && (
              <FormHelperText
                fontSize="12px"
                lineHeight="15px"
                margin="8px 0px 0"
                color="rgba(22, 24, 35, 0.5)"
              >
                {formHelperText}
              </FormHelperText>
            )}

            {isError && showError && (
              <FormErrorMessage fontSize="1.2rem" lineHeight="15px" color="rgb(255, 76, 58)">
                {errors[name].message}
              </FormErrorMessage>
            )}
          </FormControl>
        );
      }}
    />
  );
};

export default InputField;
