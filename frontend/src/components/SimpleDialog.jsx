import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmationDialog({
    isOpen,
    setOpenDialog,
    handleDeleteProject,
}) {
    return (
        <React.Fragment>
            <Dialog open={isOpen}>
                <DialogTitle id="alert-dialog-title">
                    {"Êtes-vous certain·e de vouloir supprimer ce projet ?"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleDeleteProject}>Oui</Button>
                    <Button onClick={() => setOpenDialog(false)} autoFocus>
                        Non
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
