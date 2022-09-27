import { Container } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="md">
      <Outlet />
    </Container>
  );
};

export default RootLayout;
