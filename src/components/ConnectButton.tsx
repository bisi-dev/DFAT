import { useState } from 'react'
import { Button, Box, Text } from "@chakra-ui/react";
import { useEthers, useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import Identicon from "./Identicon";

type Props = {
  handleOpenModal: any;
};

declare const window: any;

export default function ConnectButton({ handleOpenModal }: Props) {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);
  const [buttonText, setButtonText] = useState("Connect to a Wallet");

  const connectWallet = async () => {
    if (window.ethereum) {
      //check if Metamask is installed
      try {
        activateBrowserWallet();
        setButtonText("🦊 Connected to Metamask")
        return {
          connectedStatus: true,
          status: "🦊 Connected to Metamask",
        };

      } catch (error) {
        setButtonText("🦊 Connect to Metamask using the button on the top right.")
        return {
          connectedStatus: false,
          status: "🦊 Connect to Metamask using the button on the top right."
        }
      }

    } else {
      setButtonText("🦊 You must install Metamask into your browser: https://metamask.io/download.html")
      return {
        connectedStatus: false,
        status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
      }
    }
  };

  function handleConnectWallet() {
    connectWallet();
    (async () => {
      console.log(await (await connectWallet()).status)
    })()
  }

  return account ? (
    <Box
      display="flex"
      alignItems="center"
      background="gray.700"
      borderRadius="xl"
      py="0"
    >
      <Box px="3">
        <Text color="white" fontSize="md">
          {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH
        </Text>
      </Box>
      <Button
        onClick={handleOpenModal}
        bg="gray.800"
        border="1px solid transparent"
        _hover={{
          border: "1px",
          borderStyle: "solid",
          borderColor: "blue.400",
          backgroundColor: "gray.700",
        }}
        borderRadius="xl"
        m="1px"
        px={3}
        height="38px"
      >
        <Text color="white" fontSize="md" fontWeight="medium" mr="2">
          {account &&
            `${account.slice(0, 6)}...${account.slice(
              account.length - 4,
              account.length
            )}`}
        </Text>
        <Identicon />
      </Button>
    </Box>
  ) : (
    <div>
      <Button
        onClick={handleConnectWallet}
        bg="blue.800"
        color="blue.300"
        fontSize="lg"
        fontWeight="medium"
        borderRadius="xl"
        border="1px solid transparent"
        _hover={{
          borderColor: "blue.700",
          color: "blue.400",
        }}
        _active={{
          backgroundColor: "blue.800",
          borderColor: "blue.700",
        }}
      >
        Connect to a Wallet
      </Button>
      <br></br>
      <br></br>
      <Text mt={-2} color="gray.400" fontSize="sm">
        {buttonText}
      </Text>
    </div>
  );
}
