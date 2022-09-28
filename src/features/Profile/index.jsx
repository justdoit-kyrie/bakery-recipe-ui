import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Square,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { ContextMenu as PrimeContextMenu } from 'primereact/contextmenu';
import React, { useEffect, useRef, useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { PrimeIcons } from 'primereact/api';

import { NewPostIcon } from '~/components/Icons';
import { MY_POST_DISPLAY, MY_POST_TYPE, ROUTES_PATH } from '~/constants';
import EditProfileModal from './components/EditProfileModal';
import LayoutButton from './components/LayoutButton';
import Sort from './components/Sort';
import { Wrapper } from './styles';
import './Profile.scss';
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';

const MOCK_DATA = {
  profile: {
    username: 'duc.nguyendm',
    email: 'duc.nguyendm@gmail.com',
    firstName: '',
    lastName: '',
    avatar: undefined,
    gender: undefined,
    address: '',
    phone: '',
  },
  min_width: 230,
  list: [
    {
      id: 0,
      title:
        'Argon Dashboard Chakra - Free Version (Community) Argon Dashboard Chakra - Free Version (Community)',
      created_date: moment().subtract(1, 'days').toDate(),
      image:
        'https://images.unsplash.com/photo-1664136709608-32f4a7b56ba8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 1,
      title: 'Online Learning Landing Page (Community)',
      created_date: moment().subtract(4, 'months').toDate(),
      image:
        'https://images.unsplash.com/photo-1664171122063-4685b3511c6b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 2,
      title: 'Infra',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1664155942208-a4792a4be4a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 3,
      title: 'FoodDelivery',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1664155942208-a4792a4be4a9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 4,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1664141052237-7d83731b4ae6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxM3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 5,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1661956600654-edac218fea67?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxMXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 6,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1664165131680-1b334b932295?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 7,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1664154325041-426de2329ddf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 8,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1564419434663-c49967363849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 9,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1564419434663-c49967363849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 10,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1564419434663-c49967363849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 11,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1564419434663-c49967363849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 12,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1564419434663-c49967363849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 13,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1564419434663-c49967363849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      id: 14,
      title: 'Heling _ Interior Website',
      created_date: '',
      image:
        'https://images.unsplash.com/photo-1564419434663-c49967363849?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    },
  ],
};

const Profile = () => {
  const { list, min_width, profile } = MOCK_DATA;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const recentRef = useRef();
  const draftRef = useRef();
  const cm = useRef(null);

  const [selectedPost, setSelectedPost] = useState(null);
  const [type, setType] = useState(MY_POST_TYPE.recent);
  const [progressLeft, setProgressLeft] = useState(0);
  const [displayType, setDisplayType] = useState(MY_POST_DISPLAY.grid);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);

  const menuModel = [
    {
      label: 'Edit',
      icon: PrimeIcons.PENCIL,
      command: () => navigate(`${ROUTES_PATH.upload}/@${selectedPost.id}`),
    },
    {
      label: 'Delete',
      icon: PrimeIcons.TIMES,
      command: () => handleDeletePost(selectedPost),
    },
  ];

  useEffect(() => {
    // call api get profile
  }, []);

  useEffect(() => {
    if (recentRef.current) {
      switch (type) {
        case MY_POST_TYPE.recent:
          setProgressLeft(0);
          break;
        case MY_POST_TYPE.draft:
          setProgressLeft(recentRef.current.offsetWidth);
          break;
      }
    }
  }, [type]);

  useEffect(() => {
    // call api pagination
  }, [rows, page]);

  const handleDeletePost = (post) => console.log({ post });

  const renderContextMenu = ({ id, data }) => {
    return (
      <ContextMenu id={id}>
        <MenuItem data={data} onClick={(e, data) => navigate(`${ROUTES_PATH.upload}/@${data.id}`)}>
          <Flex
            align="center"
            p="1rem"
            cursor="pointer"
            gap="0.5rem"
            _hover={{ bg: 'primeColor.lightPurple', color: 'primeColor.darkPurple' }}
          >
            <AiOutlineEdit />
            <Text lineHeight="1" fontWeight={600}>
              Edit
            </Text>
          </Flex>
        </MenuItem>
        <MenuItem data={data} onClick={(e, data) => handleDeletePost(data)}>
          <Flex
            align="center"
            p="1rem"
            cursor="pointer"
            gap="0.5rem"
            _hover={{ bg: 'primeColor.lightPurple', color: 'primeColor.darkPurple' }}
          >
            <AiOutlineClose />
            <Text lineHeight="1" fontWeight={600}>
              Delete
            </Text>
          </Flex>
        </MenuItem>
      </ContextMenu>
    );
  };

  const renderGridItems = () =>
    list.map((item, idx) => (
      <GridItem key={idx}>
        <Wrapper>
          <ContextMenuTrigger id={`grid-item-${idx}`}>
            <Flex
              direction="column"
              borderRadius="8px"
              maxH="26rem"
              overflow="hidden"
              border="1px solid rgba(22, 24, 35, 0.12)"
            >
              <Box
                flex="0.8"
                w="100%"
                h="100%"
                cursor="pointer"
                onClick={() =>
                  navigate(
                    type === MY_POST_TYPE.recent
                      ? `${ROUTES_PATH.postDetail.replace(':id', item.id)}`
                      : `${ROUTES_PATH.upload}/@${item.id}`
                  )
                }
              >
                <Image src={item.image} alt="my-posts" w="100%" h="100%" maxH="20rem" />
              </Box>

              {/* content */}
              <Flex align="center" flex="0.2" p="1rem" gap="1rem" w="100%">
                <Box>
                  <NewPostIcon />
                </Box>
                <Box w="100%">
                  <Text
                    as="h4"
                    className="text"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    overflow="hidden"
                    maxW="calc(100% - 4.2rem)"
                    cursor="pointer"
                    _hover={{
                      textDecoration: 'underline',
                    }}
                    onClick={() => navigate(`${ROUTES_PATH.postDetail.replace(':id', item.id)}`)}
                  >
                    {item.title}
                  </Text>
                  <Text as="p" color="textColor.200">
                    {`Edited ${moment(item.created_date).fromNow()}`}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </ContextMenuTrigger>

          {renderContextMenu({ id: `grid-item-${idx}`, data: item })}
        </Wrapper>
      </GridItem>
    ));

  const nameBodyTemplate = (rowData) => {
    return (
      <Flex
        gap="1rem"
        align="center"
        w="100%"
        cursor="pointer"
        onClick={() =>
          navigate(
            type === MY_POST_TYPE.recent
              ? `${ROUTES_PATH.postDetail.replace(':id', rowData.id)}`
              : `${ROUTES_PATH.upload}/@${rowData.id}`
          )
        }
      >
        <Square boxSize="3.2rem">
          <Image src={rowData.image} alt="my-posts" w="100%" h="100%" maxH="20rem" />
        </Square>
        <Text
          as="h4"
          pr="1rem"
          className="text"
          fontWeight={500}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
          _hover={{
            textDecoration: 'underline',
          }}
        >
          {rowData.title}
        </Text>
      </Flex>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return (
      <Text as="p" fontSize="1.3rem" color="textColor.200">
        {`Edited ${moment(rowData.created_date).fromNow()}`}
      </Text>
    );
  };

  const actionHeaderTemplate = () => (
    <Flex gap="1rem">
      <LayoutButton displayType={displayType} setDisplayType={setDisplayType} />
    </Flex>
  );

  const renderListItems = () => (
    <Wrapper>
      <PrimeContextMenu
        className="profile-context-menu"
        model={menuModel}
        ref={cm}
        onHide={() => setSelectedPost(null)}
      />
      <DataTable
        className="hide-scroll"
        value={list}
        responsiveLayout="scroll"
        scrollable
        scrollHeight="flex"
        paginator
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        paginatorDropdownAppendTo="self"
        first={first}
        rows={rows}
        onPage={(e) => {
          setFirst(e.first);
          setRows(e.rows);
          setPage(e.page);
        }}
        rowsPerPageOptions={[10, 20, 50]}
        contextMenuSelection={selectedPost}
        onContextMenuSelectionChange={(e) => setSelectedPost(e.value)}
        selectionMode="single"
        selection={selectedPost}
        onSelectionChange={(e) => setSelectedPost(e.value)}
        onContextMenu={(e) => cm.current.show(e.originalEvent)}
      >
        <Column
          field="title"
          header="Name"
          body={nameBodyTemplate}
          sortable
          style={{
            flex: '0.7',
          }}
        ></Column>
        <Column
          field="created_date"
          header="Last viewed"
          body={dateBodyTemplate}
          sortable
          style={{
            flex: '0.2',
          }}
        ></Column>
        <Column
          align="right"
          header={actionHeaderTemplate}
          style={{
            flex: '0.1',
            justifyContent: 'flex-end',
          }}
        ></Column>
      </DataTable>
    </Wrapper>
  );

  return (
    <Flex direction="column" h="100%" className="container" p="3.2rem 0 1rem">
      {isOpen && <EditProfileModal onClose={onClose} data={profile} />}

      <Flex align="center" gap="2rem">
        <Avatar
          boxSize="11.6rem"
          src={profile.avatar}
          name={`${profile.firstName} ${profile.lastName}`}
        />
        <Flex direction="column">
          <Text as="h1" fontSize="3.2rem" lineHeight="38px" fontWeight={700}>
            {profile.username}
          </Text>
          <Text as="h4" fontSize="1.8rem" lineHeight="25px" fontWeight={600}>
            {profile.email}
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

      <Flex justify="space-between" align="baseline" mb="1rem">
        <Flex
          mt="2rem"
          borderBottom="1px solid rgba(22, 24, 35, 0.12)"
          w="fit-content"
          position="relative"
        >
          <Flex
            ref={recentRef}
            minH="44px"
            minW={`${min_width}px`}
            justify="center"
            align="center"
            cursor="pointer"
            onClick={() => setType(MY_POST_TYPE.recent)}
            onMouseEnter={type === MY_POST_TYPE.draft ? () => setProgressLeft(0) : () => {}}
            onMouseLeave={
              type === MY_POST_TYPE.draft
                ? () => setProgressLeft(recentRef.current.offsetWidth || min_width)
                : () => {}
            }
          >
            <Text
              fontSize="1.8rem"
              lineHeight="25px"
              fontWeight="600"
              className="secondary-font"
              color={type === MY_POST_TYPE.recent ? 'textColo.400' : 'textColor.200'}
            >
              Recent
            </Text>
          </Flex>

          <Flex
            ref={draftRef}
            minH="44px"
            minW={`${min_width}px`}
            justify="center"
            align="center"
            cursor="pointer"
            onClick={() => setType(MY_POST_TYPE.draft)}
            onMouseEnter={
              type === MY_POST_TYPE.recent
                ? () => setProgressLeft(draftRef.current.offsetWidth || min_width)
                : () => {}
            }
            onMouseLeave={type === MY_POST_TYPE.recent ? () => setProgressLeft(0) : () => {}}
          >
            <Text
              fontSize="1.8rem"
              lineHeight="25px"
              fontWeight="600"
              className="secondary-font"
              color={type === MY_POST_TYPE.draft ? 'textColor.400' : 'textColor.200'}
            >
              Draft
            </Text>
          </Flex>

          <Text
            as="span"
            position="absolute"
            bottom="0"
            left={progressLeft}
            transition="all 0.2s linear"
            bg="textColor.400"
            w={
              type === MY_POST_TYPE.recent
                ? `${recentRef?.current?.offsetWidth || min_width}px`
                : `${draftRef?.current?.offsetWidth || min_width}px`
            }
            h="2px"
            borderRadius="100rem"
          ></Text>
        </Flex>

        {displayType === MY_POST_DISPLAY.grid && (
          <Sort displayType={displayType} setDisplayType={setDisplayType} />
        )}
      </Flex>

      {/* content */}
      <Box flex="1" h="100%" position="relative">
        <Flex
          direction="column"
          position="absolute"
          inset="0"
          overflowY="auto"
          className="hide-scroll"
        >
          {displayType === MY_POST_DISPLAY.grid ? (
            <Grid templateColumns="repeat(auto-fit, minmax(30rem, 1fr))" w="100%" gap="2rem">
              {renderGridItems()}
            </Grid>
          ) : (
            renderListItems()
          )}
        </Flex>
      </Box>
    </Flex>
  );
};

export default Profile;
