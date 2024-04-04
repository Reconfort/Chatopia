"use client";
import AddClientModal from "@/components/clients/addClientModal";
import Clients from "@/components/clients/clients";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <ApolloProvider client={client}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <AddClientModal />
          <Clients />
        </Box>
    </ApolloProvider>
  );
}
