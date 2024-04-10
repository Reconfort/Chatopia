"use client"
import React from 'react'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ClientCard from '@/components/projects/clientCard'

import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "@/queries/projectQueries";
import LinearLoader from "@/components/common/linearLoader";

import { useParams } from 'next/navigation'



const Page = () => {
    const { projectId } = useParams()

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id: projectId }
    });

    if (loading) return <LinearLoader />;
    if (error) return <p>Something went wrong !</p>;

    return (
        <>
            {!loading && !error && (
                <Paper sx={{ padding: '20px', backgroundColor: "#e7e7e7" }}>
                    <Button variant="contained" href="/" size='small'>
                        <ArrowBackIcon />
                    </Button>
                    <Box component="section" sx={{ padding: "10px", display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                        <Typography variant="h3" gutterBottom>
                            {data.project.name}
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Description:
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom>
                            {data.project.description}
                        </Typography>

                        <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                            <Typography variant="h5" gutterBottom>
                                Project Status:
                            </Typography>
                            <Typography variant="subtitle1" gutterBottom>
                                {data.project.status}
                            </Typography>
                        </Box>
                        <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                            <Typography variant="h5" gutterBottom>
                                Client Information
                            </Typography>
                            <Box component="section" sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                <ClientCard client={data.project.client} />
                            </Box>
                        </Box>

                    </Box>
                </Paper>
            )}
        </>
    )
}

export default Page