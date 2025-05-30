import React from "react";
import { CircularProgress, Box } from "@mui/material";

const Loader: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "background.paper",
      }}
    >
      <CircularProgress size={60} />
    </Box>
  );
};

export default Loader;
