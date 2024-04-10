"use client"
import React, { ReactNode } from "react";
import client from "./apollo-client";
import { ApolloProvider } from "@apollo/client";
import { Container } from "@mui/material";

interface ProviderProps {
  children: ReactNode;
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <Container>{children}</Container>
    </ApolloProvider>
  );
};

export default Provider;
