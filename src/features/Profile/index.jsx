import { Avatar, Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import EditProfileModal from './components/EditProfileModal';

const MOCK_DATA = {
  username: 'duc.nguyendm',
  email: 'duc.nguyendm@gmail.com',
  firstName: '',
  lastName: '',
  avatar: undefined,
  gender: undefined,
  address: '',
  phone: '',
};

const Profile = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // call api get profile
  }, []);

  return (
    <Box h="100%">
      {isOpen && <EditProfileModal onClose={onClose} data={MOCK_DATA} />}

      <Flex align="center" gap="2rem">
        <Avatar
          boxSize="11.6rem"
          src={MOCK_DATA.avatar}
          name={`${MOCK_DATA.firstName} ${MOCK_DATA.lastName}`}
        />
        <Flex direction="column">
          <Text as="h1" fontSize="3.2rem" lineHeight="38px" fontWeight={700}>
            {MOCK_DATA.username}
          </Text>
          <Text as="h4" fontSize="1.8rem" lineHeight="25px" fontWeight={600}>
            {MOCK_DATA.email}
          </Text>
          <Box>
            <Button leftIcon={<FaRegEdit />} variant="outline-default" mt="1.6rem" onClick={onOpen}>
              Edit profile
            </Button>
          </Box>
        </Flex>
      </Flex>

      <Flex mt="2.2rem" gap="2rem">
        <Text>
          <Text
            as="span"
            className="secondary-font"
            fontSize="1.8rem"
            lineHeight="25px"
            fontWeight={600}
          >
            0
          </Text>
          <Text as="span" ml="6px" color="textColor.300" className="text" fontWeight="400">
            Following
          </Text>
        </Text>
        <Text>
          <Text
            as="span"
            className="secondary-font"
            fontSize="1.8rem"
            lineHeight="25px"
            fontWeight={600}
          >
            0
          </Text>
          <Text as="span" ml="6px" color="textColor.300" className="text" fontWeight="400">
            Follower
          </Text>
        </Text>
      </Flex>
    </Box>
  );
};

export default Profile;
