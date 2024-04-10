import { useQuery } from "@apollo/client";
import LinearLoader from "../common/linearLoader";
import { GET_PROJECTS } from "@/queries/projectQueries";
import ProjectCard from "./projectCard";
import { Box, Grid } from "@mui/material";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <LinearLoader />;
  if (error) return <p>Something went wrong !</p>;
  return (
    <div>
      {data.projects.length > 0 ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {data.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Grid>
        </Box>
      ) : (
        <p>No Projects</p>
      )}
    </div>
  );
};

export default Projects;
