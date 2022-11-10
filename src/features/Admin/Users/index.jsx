/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { deleteObject, ref } from 'firebase/storage';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import firebase from '~/app/firebase';
import { Search } from '~/components';
import { API_CODE, API_PATH, UPLOAD_STATUS_ENUM } from '~/constants';
import FormIngredientsModal from './components/FormIngredients';
import { Wrapper } from './styles';

const AdUsersPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState();
  const [initialValue, setInitialValue] = useState();

  const fetchData = async () => {
    try {
      const { code, data, pagination } = await axiosInstance.get(API_PATH.users.getList, {
        params: {
          _by: 'id',
        },
      });

      if (+code === API_CODE.success) {
        setList(data);
        setPagination(pagination);
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const footerTemplate = () => (
    <Paginator
      first={first}
      rows={rows}
      totalRecords={pagination?.totalRecords}
      onPageChange={(e) => {
        setFirst(e.first);
        setRows(e.rows);
        setPage(e.page + 1);
      }}
      rowsPerPageOptions={[10, 20, 50]}
    />
  );

  const profileBodyTemplate = (rowData) => {
    return (
      <Text
        as="h4"
        pr="1rem"
        className="text"
        fontWeight={500}
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {`${rowData.firstName} ${rowData.lastName}`}
      </Text>
    );
  };

  const DOBBodyTemplate = (rowData) => {
    return (
      <Text
        as="h4"
        pr="1rem"
        className="text"
        fontWeight={500}
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {moment(rowData.dob).format('MM-DD-YYYY')}
      </Text>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Text
        as="h4"
        pr="1rem"
        className="text"
        fontWeight={500}
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {UPLOAD_STATUS_ENUM[rowData.status]}
      </Text>
    );
  };

  const defaultBodyTemplate = (rowData, field) => {
    const { field: name } = field;

    return (
      <Text
        as="h4"
        pr="1rem"
        className="text"
        fontWeight={500}
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {name === 'no' ? field.rowIndex + 1 : rowData[name]}
      </Text>
    );
  };

  return (
    <Flex direction="column" h="100%" w="100%">
      {isOpen && (
        <FormIngredientsModal
          isOpen={isOpen}
          data={initialValue}
          onClose={onClose}
          callback={fetchData}
        />
      )}

      <Flex p="2rem" justify="space-between" align="center" borderRadius="6px" bg="#fff" mt="2rem">
        <Text fontSize="2rem" fontWeight={700}>
          Users List
        </Text>
      </Flex>

      <Box flex="1" position="relative">
        <Box position="absolute" inset="0" w="100%" h="100%" overflowY="overlay">
          <Wrapper>
            <DataTable
              className="hide-scroll"
              value={list}
              responsiveLayout="scroll"
              scrollable
              scrollHeight="flex"
              footer={footerTemplate}
              selectionMode="single"
            >
              <Column field="no" header="No" body={defaultBodyTemplate} sortable></Column>
              <Column
                field="firstName"
                header="Profile"
                body={profileBodyTemplate}
                sortable
              ></Column>
              <Column field="email" header="Email" body={defaultBodyTemplate} sortable></Column>
              <Column field="dob" header="Birth Day" body={DOBBodyTemplate} sortable></Column>
              <Column field="role" header="Role" body={defaultBodyTemplate} sortable></Column>
              <Column field="status" header="Status" body={statusBodyTemplate} sortable></Column>
            </DataTable>
          </Wrapper>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdUsersPage;
