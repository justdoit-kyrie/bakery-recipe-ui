/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import { Search } from '~/components';
import { API_CODE, API_PATH } from '~/constants';
import FormCategoryModal from './components/FormCategory';
import { Wrapper } from './styles';

const AdCategoriesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [pagination, setPagination] = useState();
  const [initialValue, setInitialValue] = useState();

  const fetchData = async () => {
    try {
      const { code, data, ...pagination } = await axiosInstance.get(API_PATH.categories.getList, {
        params: {},
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

  const handleDelete = async (id) => {
    try {
      const { code, message } = await axiosInstance.delete(`${API_PATH.categories.getList}/${id}`);

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

  const nameBodyTemplate = (rowData) => {
    return (
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
        {rowData.categoryName}
      </Text>
    );
  };

  const actionBodyTemplate = (rowData) => (
    <Flex gap="1rem">
      <Button
        variant="outline-default"
        borderColor="yellow.500"
        color="yellow.500"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
          setInitialValue({ ...rowData });
        }}
      >
        Edit
      </Button>
      <Button
        variant="outline-default"
        borderColor="red.500"
        color="red.500"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(rowData.categoryId);
        }}
      >
        Delete
      </Button>
    </Flex>
  );

  return (
    <Flex direction="column" h="100%" w="100%">
      {isOpen && (
        <FormCategoryModal
          isOpen={isOpen}
          data={initialValue}
          onClose={onClose}
          callback={fetchData}
        />
      )}
      <Flex justify="flex-end">
        <Button
          leftIcon={<IoMdAdd color="#fff" />}
          onClick={() => {
            setInitialValue();
            onOpen();
          }}
        >
          Add Category
        </Button>
      </Flex>

      <Flex p="2rem" justify="space-between" align="center" borderRadius="6px" bg="#fff" mt="2rem">
        <Text fontSize="2rem" fontWeight={700}>
          Categories List
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
                header="No"
                sortable
                style={{
                  flex: '0.2',
                }}
              ></Column>
              <Column
                field="name"
                header="Name"
                body={nameBodyTemplate}
                sortable
                style={{
                  flex: '0.5',
                }}
              ></Column>
              <Column
                align="right"
                header="Action"
                body={actionBodyTemplate}
                style={{
                  flex: '0.3',
                  justifyContent: 'flex-end',
                }}
              ></Column>
            </DataTable>
          </Wrapper>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdCategoriesPage;
