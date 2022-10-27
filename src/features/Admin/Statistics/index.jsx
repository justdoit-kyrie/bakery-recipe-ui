import { Box, CircularProgress, Flex, Grid, GridItem, Text } from '@chakra-ui/react';
import React from 'react';
import LineChart from './components/LineChart';

const MOCK_DATA = {
  paddingX: '3rem',
  statistics: [
    {
      label: 'Today posts',
      percentage: 75,
      value: 20.4,
      helperText: 'We have percentage of this month',
      color: 'primeColor.darkPurple',
    },
    {
      label: 'Month posts',
      percentage: 50,
      value: 40.4,
      helperText: 'We have percentage of this year',
      color: 'red.400',
    },
    {
      label: 'Reports',
      percentage: 20,
      value: 20.4,
      helperText: 'We have percentage of this month',
      color: 'green.400',
    },
    {
      label: 'Today comments',
      percentage: 69,
      value: 20.4,
      helperText: 'We have percentage of this month',
      color: 'yellow.400',
    },
  ],
};

const AdStatisticPage = () => {
  const { statistics, paddingX } = MOCK_DATA;

  const renderStatistics = () =>
    statistics.map((item, idx) => (
      <Flex
        key={idx}
        align="center"
        justify="space-between"
        w="25%"
        border="1px solid rgba(22,24,35,0.12)"
        borderRadius="8px"
        p={`1.5rem ${paddingX}`}
      >
        <Box>
          <Text fontWeight={600} fontSize="1.8rem">
            {item.label}
          </Text>
          <Text fontWeight={700} fontSize="2.8rem" textTransform="uppercase">
            {`${item.value}k`}
          </Text>
          <Text fontSize="1.2rem" color="textColor.300">
            {item.helperText}
          </Text>
        </Box>

        <Box position="relative">
          <CircularProgress
            value={item.percentage}
            color={item.color}
            size="80px"
            thickness="6px"
          />
          <Text
            fontWeight={700}
            fontSize="1.6rem"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            letterSpacing="1px"
          >
            {`${item.percentage}%`}
          </Text>
        </Box>
      </Flex>
    ));

  return (
    <Box w="100%" h="100%">
      <Box p={paddingX} h="calc(100% - 91px)">
        <Flex gap="2rem">{renderStatistics()}</Flex>

        <Grid
          mt="2rem"
          gap="2rem"
          templateColumns="repeat(4, 1fr)"
          templateAreas={`"h1 h1 h1 h2"`}
          templateRows="30rem"
        >
          <GridItem area="h1">
            <Box
              border="1px solid rgba(22,24,35,0.12)"
              h="100%"
              p={`1.5rem ${paddingX}`}
              borderRadius="8px"
            >
              <Text className="text" fontSize="1.8rem">
                Total Comments
              </Text>
            </Box>

            <LineChart />
          </GridItem>
          <GridItem>
            <Text>1</Text>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdStatisticPage;
