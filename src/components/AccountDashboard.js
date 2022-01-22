import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, CopyIcon, } from "@chakra-ui/icons";
import { useEthers } from "@usedapp/core";
import Identicon from "./Identicon";
import { useAxios } from "use-axios-client";
import axios from "axios";
import { VictoryBar, VictoryChart, VictoryTheme, VictoryContainer } from 'victory';
import { useTable } from 'react-table';

export default function AccountDashboard() {
  const { account, deactivate, chainId } = useEthers();
  const navigate = useNavigate();

  const YourApiKeyToken = process.env.REACT_APP_API_KEY;

  let alias = '';

  if (chainId === 1) {
    alias = '';
  } else if (chainId === 3) {
    alias = '-ropsten';
  } else if (chainId === 4) {
    alias = '-rinkeby';
  }

  // const { data, error, loading } = useAxios({
  //   url: "https://api" + alias + ".etherscan.io/api" +
  //     "?module=account" +
  //     "&action=txlist" +
  //     "&address=" + account +
  //     "&startblock=0" +
  //     "&endblock=99999999" +
  //     "&page=1" +
  //     "&offset=10" +
  //     "&sort=asc" +
  //     "&apikey=" + YourApiKeyToken
  // });
  // if (loading || !data) return <p>Loading...</p>;
  // if (error) return <p>Error!</p>;
  // console.log(chainId)

  // const [data, setData] = useState('');

  // useEffect(() => {
  //   (async () => {
  //     const result = await axios("https://api" + alias + ".etherscan.io/api" +
  //       "?module=account" +
  //       "&action=txlist" +
  //       "&address=" + account +
  //       "&startblock=0" +
  //       "&endblock=99999999" +
  //       "&page=1" +
  //       "&offset=10" +
  //       "&sort=asc" +
  //       "&apikey=" + YourApiKeyToken);
  //     setData(result.data);
  //   })();
  // }, []);

  let dataP = []
  let data = []

  function ipLookUp() {
    axios.get("https://api" + alias + ".etherscan.io/api" +
      "?module=account" +
      "&action=txlist" +
      "&address=" + account +
      "&startblock=0" +
      "&endblock=99999999" +
      "&page=1" +
      "&offset=10" +
      "&sort=asc" +
      "&apikey=" + YourApiKeyToken)
      .then(
        function success(response) {
          console.log(response.data.result);
          const datax = response.data.result;
          dataP = datax.map((x) => x)
        },

        function fail(data, status) {
          console.log('Request failed.  Returned status of', status);
        }
      );
  }

  // const [state, setState] = useState(() => {
  //   const initialState = someExpensiveComputation(props);
  //   return initialState;
  // });


  ipLookUp()
  console.log(dataP)
  // const table = React.useMemo(() => data)
  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: 'User Info',
  //       columns: [
  //         {
  //           Header: 'Name',
  //           accessor: 'from',
  //         },
  //         {
  //           Header: 'Address',
  //           accessor: 'to',
  //         },
  //       ],
  //     },
  //     {
  //       Header: 'Order Info',
  //       columns: [
  //         {
  //           Header: 'Date',
  //           accessor: 'timeStamp',
  //         },
  //         {
  //           Header: 'Order #',
  //           accessor: 'value',
  //         },
  //       ],
  //     },
  //   ],
  //   []
  // )
  // const {
  //   getTableProps,
  //   getTableBodyProps,
  //   headerGroups,
  //   rows,
  //   prepareRow,
  // } = useTable({ columns, table })

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }
    // new Date(timestamp).toLocaleDateString("en-US")
    return new Intl.DateTimeFormat('en-GB', options).format(timestamp * 1000)
  }

  const formatValue = (result) => {
    let transfer = 0
    if (result.to == data.result[0].to) {
      transfer = result.value * 10 ** -18
    } else {
      transfer = -(result.value) * 10 ** -18
    }
    return transfer
  }

  function routeChange() {
    navigate('/')
  }

  return (
    <div>
      {/* <VictoryChart theme={VictoryTheme.material} domainPadding={30}>
        <VictoryBar data={data.result}
          x={(d) => formatDate(d.timeStamp)} y={(d) => formatValue(d)}
        // x={(d) => formatDate(d.timeStamp)} 
        // y={(d) => account == 1 ? (d.value) * 10 ** -18 : -(d.value) * 10 ** -18 }
        />
      </VictoryChart> */}
      <Button
        variant="outline"
        size="sm"
        borderColor="blue.800"
        borderRadius="3xl"
        color="blue.500"
        fontSize="13px"
        fontWeight="normal"
        px={2}
        height="26px"
        _hover={{
          background: "none",
          borderColor: "blue.300",
          textDecoration: "underline",
        }}
        onClick={routeChange}
      >
        Change
      </Button>
      {/* <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </div >

    // <Modal isCentered size="md">
    //   <ModalOverlay />
    //   <ModalContent
    //     background="gray.900"
    //     border="1px"
    //     borderStyle="solid"
    //     borderColor="gray.700"
    //     borderRadius="3xl"
    //   >
    //     <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
    //       Dashboard
    //     </ModalHeader>
    //     <ModalCloseButton
    //       color="white"
    //       fontSize="sm"
    //       _hover={{
    //         color: "whiteAlpha.700",
    //       }}
    //     />
    //     <ModalBody pt={0} px={4}>
    //       <Box
    //         borderRadius="3xl"
    //         border="1px"
    //         borderStyle="solid"
    //         borderColor="gray.600"
    //         px={5}
    //         pt={4}
    //         pb={2}
    //         mb={3}
    //       >
    //         <Flex justifyContent="space-between" alignItems="center" mb={3}>
    //           <Text color="gray.400" fontSize="sm">
    //             Connected with MetaMask
    //           </Text>
    //           <Button
    //             variant="outline"
    //             size="sm"
    //             borderColor="blue.800"
    //             borderRadius="3xl"
    //             color="blue.500"
    //             fontSize="13px"
    //             fontWeight="normal"
    //             px={2}
    //             height="26px"
    //             _hover={{
    //               background: "none",
    //               borderColor: "blue.300",
    //               textDecoration: "underline",
    //             }}
    //             onClick={handleDeactivateAccount}
    //           >
    //             Change
    //           </Button>
    //         </Flex>
    //         <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
    //           <Identicon />
    //           <Text
    //             color="white"
    //             fontSize="xl"
    //             fontWeight="semibold"
    //             ml="2"
    //             lineHeight="1.1"
    //           >
    //             {account &&
    //               `${account.slice(0, 6)
    //               }...${account.slice(
    //                 account.length - 4,
    //                 account.length
    //               )
    //               } `}
    //           </Text>
    //         </Flex>
    //         <Flex alignContent="center" m={3}>
    //           <Button
    //             onClick={() => { navigator.clipboard.writeText(`${account} `) }}
    //             variant="link"
    //             color="gray.400"
    //             fontWeight="normal"
    //             fontSize="sm"
    //             _hover={{
    //               textDecoration: "none",
    //               color: "whiteAlpha.800",
    //             }}
    //           >
    //             <CopyIcon mr={1} />
    //             Copy Address
    //           </Button>
    //           <Link
    //             fontSize="sm"
    //             display="flex"
    //             alignItems="center"
    //             href={href}
    //             isExternal
    //             color="gray.400"
    //             ml={6}
    //             _hover={{
    //               color: "whiteAlpha.800",
    //               textDecoration: "underline",
    //             }}
    //           >
    //             <ExternalLinkIcon mr={1} />
    //             View on Explorer
    //           </Link>
    //         </Flex>
    //       </Box>
    //     </ModalBody>
    //     <VictoryChart theme={VictoryTheme.material} domainPadding={30}>
    //       <VictoryBar data={data.result}
    //         x={(d) => formatDate(d.timeStamp)} y={(d) => formatValue(d)}
    //       // x={(d) => formatDate(d.timeStamp)} y={(d) => account == 1
    //       //   ? (d.value) * 10 ** -18
    //       //   : -(d.value) * 10 ** -18
    //       // }
    //       />
    //     </VictoryChart>


    //     <ModalFooter
    //       justifyContent="end"
    //       background="gray.700"
    //       borderBottomLeftRadius="3xl"
    //       borderBottomRightRadius="3xl"
    //       p={6}
    //     >
    //       <Text
    //         color="white"
    //         textAlign="left"
    //         fontWeight="medium"
    //         fontSize="md"
    //       >
    //         {/* ${data.result.ethusd}
    //         {formatDate(data.result.ethusd_timestamp)} */}
    //         {/* {data.result[0].blockNumber} */}
    //         {network}
    //       </Text>
    //     </ModalFooter>
    //   </ModalContent>
    // </Modal>
  );
}
