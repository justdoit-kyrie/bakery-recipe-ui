import { Box, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';

const CustomButton = ({
  to,
  href,
  label,
  target,
  leftIcon: { icon: leftIcon, ...leftIconPassProps } = {},
  rightIcon: { icon: rightIcon, ...rightIconPassProps } = {},
  ...Props
}) => {
  const LeftIcon = leftIcon;
  const RightIcon = rightIcon;
  let Comp = Box;
  if (to) {
    Comp = Link;
  }
  if (href) {
    Comp = 'a';
  }
  const handleLimitPassProps = () => {
    if (to || href) {
      const keyProps = _.keys(Props).filter((v) => v.startsWith('on'));
      keyProps.map((v) => delete Props[v]);
    }
  };

  handleLimitPassProps();

  return (
    <Comp to={to} href={href} target={target} style={{ width: '100%' }}>
      <Text {...Props}>
        {LeftIcon && <LeftIcon {...leftIconPassProps} />}
        <Text as="span">{label}</Text>
        {rightIcon && <RightIcon {...rightIconPassProps} />}
      </Text>
    </Comp>
  );
};

export default CustomButton;
