// ProjectCard.tsx
import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Grid } from "@mui/material";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  status: string;
  description: string;
}

interface ProjectCardProps {
  project: Project;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const ProjectLetter = project.name.charAt(0);

  return (
    <Grid xs={12} sm={12} md={6} key={project.id}>
      <Card>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {ProjectLetter}
            </Avatar>
          }
          action={
            <Link href={`/projects/${project.id}`}>
              <IconButton aria-label="more">
                <ArrowOutwardIcon />
              </IconButton>
            </Link>
          }
          title={project.name}
          subheader={project.status}
        />
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Description
            </Typography>
            {/* <Typography variant="body2" color="text.secondary"> */}
            {project.description}
            {/* </Typography> */}
          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  );
};

export default ProjectCard;
