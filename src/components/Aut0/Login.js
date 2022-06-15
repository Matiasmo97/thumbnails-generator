import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Stack } from "@mui/material";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={() => loginWithRedirect()} variant="contained">
        Login
      </Button>
    </Stack>
  );
};
