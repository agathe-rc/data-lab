import * as React from "react";
import { useState } from "react";

import { Modal, Box, TextField, Typography, Button } from "@mui/material";

import { createProject } from "../api";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid #000",
    boxShadow: 24,
    p: 4,
};

export function DataModal({ cohort, isOpen, setOpenModal }) {
    return (
        <React.Fragment>
            <Modal open={isOpen} onClose={() => setOpenModal(false)}>
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Nombre de patients : {cohort.patients}
                    </Typography>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Âge moyen : {cohort.average_age} ans
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export function ProjectModal({ isOpen, setOpenModal }) {
    const [form, setForm] = useState({
        name: "",
        cohort: {
            patients: 0,
            average_age: 0,
        },
        partners: [],
    });

    const handleSubmit = async (e) => {
        await createProject(form);
        window.location.reload();
    };
    return (
        <React.Fragment>
            <Modal open={isOpen} onClose={() => setOpenModal(false)}>
                <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="text"
                            label="Nom du projet"
                            variant="outlined"
                            onChange={(e) => {
                                setForm((form) => ({
                                    ...form,
                                    name: e.target.value,
                                }));
                            }}
                        />
                        <br />
                        <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="number"
                            label="Nombre de patients"
                            variant="outlined"
                            onChange={(e) => {
                                setForm((form) => ({
                                    ...form,
                                    cohort: {
                                        ...form.cohort,
                                        patients: parseInt(e.target.value),
                                    },
                                }));
                            }}
                        />
                        <br />
                        <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="number"
                            label="Âge moyen"
                            variant="outlined"
                            onChange={(e) => {
                                setForm((form) => ({
                                    ...form,
                                    cohort: {
                                        ...form.cohort,
                                        average_age: parseInt(e.target.value),
                                    },
                                }));
                            }}
                        />
                        <br />
                        <TextField
                            style={{ width: "200px", margin: "5px" }}
                            type="integer"
                            label="Établissements partenaires (séparés par des virgules)"
                            variant="outlined"
                            onChange={(e) => {
                                setForm((form) => ({
                                    ...form,
                                    partners: e.target.value
                                        .split(",")
                                        .map((str) => ({ name: str })),
                                }));
                            }}
                        />
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ width: "80px", margin: "5px" }}
                        >
                            Créer
                        </Button>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>
    );
}
