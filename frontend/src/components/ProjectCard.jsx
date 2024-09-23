import * as React from "react";
import { Grid2 as Grid, Card, CardActions, CardContent, Button, Typography } from "@mui/material";
import { deleteProject } from "../api";
import ConfirmationDialog from "./SimpleDialog";
import { DataModal } from "./Modal";


export default function ProjectCard({ project }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleDelete = async () => {
        await deleteProject(project.id);
        window.location.reload();
    };

    return (
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            size={{ xs: 6, md: 4 }}
        >
            <Card
                variant="outlined"
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <CardContent>
                    <Typography variant="h5" component="div">
                        {project.name}
                    </Typography>
                    {project.partners.map((partner, i) => (
                        <Typography key={i} variant="body2" color="text.secondary">
                            {partner.name}
                        </Typography>
                    ))}
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => setOpenModal(true)}
                        size="small"
                        variant="outlined"
                    >
                        En savoir plus
                    </Button>
                    <DataModal
                        cohort={project.cohort}
                        isOpen={openModal}
                        setOpenModal={setOpenModal}
                    />

                    <Button
                        onClick={() => setOpenDialog(true)}
                        size="small"
                        color="error"
                    >
                        Supprimer
                    </Button>
                    <ConfirmationDialog
                        isOpen={openDialog}
                        setOpenDialog={setOpenDialog}
                        handleDeleteProject={handleDelete}
                    />
                </CardActions>
            </Card>
        </Grid>
    );
}
