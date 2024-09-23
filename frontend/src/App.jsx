import "./App.css";

import { useEffect, useState } from "react";
import * as React from "react";

import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Grid2 as Grid,
    Button,
} from "@mui/material";
import { BiotechRounded as BiotechRoundedIcon } from "@mui/icons-material";

import ProjectCard from "./components/ProjectCard";
import { ProjectModal } from "./components/Modal";
import { getProjects } from "./api";

function App() {
    const [projects, setProjects] = useState([]);
    const [isCreationModalOpen, setOpenCreationModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProjects();
            setProjects(data);
        };
        fetchData();
    }, []);

    return (
        <div className="App">
            <header>
                <Box>
                    <AppBar position="static">
                        <Toolbar>
                            <BiotechRoundedIcon sx={{ m: 1 }} />
                            <Typography variant="h6" component="div">
                                Lifen - Case Study DataLab
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </Box>
            </header>

            <React.Fragment>
                <Grid
                    container
                    display="flex"
                    alignItems="center"
                    sx={{ margin: "20px" }}
                >
                    <Button
                        onClick={() => {
                            setOpenCreationModal(true);
                        }}
                        size="large"
                        color="primary"
                        variant="contained"
                    >
                        Créer un nouveau projet
                    </Button>
                    <ProjectModal
                        isOpen={isCreationModalOpen}
                        setOpenModal={setOpenCreationModal}
                    />
                </Grid>
                <Grid
                    container
                    sx={{ margin: "20px" }}
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </Grid>
            </React.Fragment>
        </div>
    );
}

export default App;
