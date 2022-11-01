import { Box, Button, Flex, Image, Square, Text } from '@chakra-ui/react';
import moment from 'moment';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import { Search } from '~/components';
import { API_CODE, API_PATH, NO_IMAGE_URL } from '~/constants';
import { Wrapper } from './styles';

const AdReportsPage = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState();

  const fetchData = async () => {
    try {
      const { code, data, ...pagination } = await axiosInstance.get(API_PATH.reports.getList, {
        params: {
          PageNumber: page,
          PageSize: rows,
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
  }, [page]);

  const handleDelete = async (id) => {
    try {
      const { code, message } = await axiosInstance.delete(`${API_PATH.posts.getList}/${id}`);

      if (+code === API_CODE.success) {
        toast.success(message);
        fetchData();
      }
    } catch (error) {
      console.log({ error });
    }
  };

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

  const titleBodyTemplate = (rowData) => {
    return (
      <Flex gap="1rem" align="center">
        <Square size="4rem">
          <Image
            w="100%"
            h="100%"
            src={rowData.image}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = NO_IMAGE_URL;
            }}
          />
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
      <Text
        as="h4"
        pr="1rem"
        className="text"
        fontWeight={500}
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
      >
        {moment(rowData.date).format('LLL')}
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

  const actionBodyTemplate = (rowData) => {
    const isValid = rowData.count > 5;
    return (
      <Box cursor={isValid ? 'cursor' : 'not-allowed'}>
        <Button
          variant={isValid ? 'outline-default' : 'disabled'}
          borderColor="red.500"
          color={isValid && 'red.500'}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(rowData.postID);
          }}
        >
          Ban post
        </Button>
      </Box>
    );
  };

  return (
    <Flex direction="column" h="100%" w="100%">
      <Flex p="2rem" justify="space-between" align="center" borderRadius="6px" bg="#fff" mt="2rem">
        <Text fontSize="2rem" fontWeight={700}>
          Reports List
        </Text>
        <Search />
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
              <Column
                field="no"
                header="No"
                body={defaultBodyTemplate}
                style={{ maxWidth: '5rem' }}
              ></Column>
              <Column sortField="title" header="Post" body={titleBodyTemplate} sortable></Column>
              <Column field="count" header="Count" body={defaultBodyTemplate} sortable></Column>
              <Column field="date" header="Created Date" body={dateBodyTemplate} sortable></Column>
              <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
          </Wrapper>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdReportsPage;
