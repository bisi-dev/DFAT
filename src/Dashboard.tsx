import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import AccountDashboard from "./components/AccountDashboard.js";

function Dashboard() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <AccountDashboard />
      </Layout>
    </ChakraProvider>
  );
}

export default Dashboard;
