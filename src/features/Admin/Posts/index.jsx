/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Image, Square, Text, useDisclosure } from '@chakra-ui/react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axiosInstance from '~/app/api';
import { Loading, Search } from '~/components';
import { API_CODE, API_PATH, NO_IMAGE_URL } from '~/constants';
import ModalDetail from './components/ModalDetail';
import { Wrapper } from './styles';

const AdPostsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([]);
  const [reportList, setReportList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [{ code, data, ...pagination }, { code: reportCode, data: reportData }] =
        await Promise.all([
          axiosInstance.get(API_PATH.posts.getList, {
            params: {
              PageSize: rows,
              PageNumber: page === 0 ? 1 : page,
            },
          }),
          axiosInstance.get(API_PATH.reports.getList, {
            params: { _all: true },
          }),
        ]);

      console.log({ data });

      if (+code === API_CODE.success && +reportCode === API_CODE.success) {
        setList(data);
        setReportList(reportData);
        setPagination(pagination);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
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
      rowsPerPageOptions={[10, 15, 20]}
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
    const isValid = reportList.find((v) => v.postID === rowData.id)?.count > 5;
    return (
      <Box cursor={isValid ? 'cursor' : 'not-allowed'}>
        <Button
          variant={isValid ? 'outline-default' : 'disabled'}
          borderColor="red.500"
          color={isValid && 'red.500'}
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(rowData.id);
          }}
        >
          Ban
        </Button>
      </Box>
    );
  };

  return (
    <Flex direction="column" h="100%" w="100%">
      {isOpen && (
        <ModalDetail
          isOpen={isOpen}
          data={selectedProduct}
          onClose={onClose}
          callback={fetchData}
        />
      )}

      {loading && <Loading />}

      <Flex p="2rem" justify="space-between" align="center" borderRadius="6px" bg="#fff" mt="2rem">
        <Text fontSize="2rem" fontWeight={700}>
          Posts List
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
              onSelectionChange={(e) => {
                onOpen();
                setSelectedProduct(e.value);
              }}
            >
              <Column
                field="no"
                header="No"
                body={defaultBodyTemplate}
                style={{ minWidth: '5rem', maxWidth: '5rem' }}
              ></Column>
              <Column
                sortField="title"
                header="Name"
                body={titleBodyTemplate}
                sortable
                style={{ minWidth: '65rem' }}
              ></Column>
              <Column
                field="authorName"
                header="Author"
                body={defaultBodyTemplate}
                sortable
                style={{ minWidth: '35rem' }}
              ></Column>
              <Column
                field="categoryName"
                header="Category"
                body={defaultBodyTemplate}
                sortable
              ></Column>
              <Column header="Action" body={actionBodyTemplate}></Column>
            </DataTable>
          </Wrapper>
        </Box>
      </Box>
    </Flex>
  );
};

export default AdPostsPage;
