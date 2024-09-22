import "./App.css";

import { useEffect, useState } from "react";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { getProjects } from "./api";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BiotechRoundedIcon from "@mui/icons-material/BiotechRounded";
import Grid from "@mui/material/Grid2";

import ProjectCard from "./components/ProjectCard";

function App() {
    const [projects, setProjects] = useState([]);

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
                <CssBaseline />
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
