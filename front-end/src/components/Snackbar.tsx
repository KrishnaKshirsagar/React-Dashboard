import React, { useEffect } from "react";
import { Alert, Snackbar as MuiSnackbar } from "@mui/material";

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: "success" | "error" | "info" | "warning";
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  open,
  message,
  severity,
  onClose,
}) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // Auto-hide after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={onClose}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
