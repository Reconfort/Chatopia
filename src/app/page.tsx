"use client";
import AddClientModal from "@/components/clients/addClientModal";
import Clients from "@/components/clients/clients";
import { Box } from "@mui/material";
import Projects from "@/components/projects/project";

export default function Home() {
  return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          <AddClientModal />
          <Projects/>
          <Clients />
        </Box>
  );
}
