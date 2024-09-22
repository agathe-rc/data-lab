import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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

export default function DataModal({ cohort, isOpen, setOpenModal }) {
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
