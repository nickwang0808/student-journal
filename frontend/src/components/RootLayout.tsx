import { AppBar, Box, Container, IconButton, Toolbar } from "@mui/material";
import { FC, PropsWithChildren, useContext } from "react";
import { Outlet, useMatch, useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { customThemeContext } from "../theme";

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  const { theme, setTheme } = useContext(customThemeContext);

  const navigate = useNavigate();

  const matchRootPath = useMatch("/");

  return (
    <Container maxWidth="md" sx={{ marginTop: 2 }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="transparent" sx={{ boxShadow: 0 }}>
          <Toolbar>
            {!matchRootPath && (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => navigate("../")}
              >
                <ArrowBackIcon />
              </IconButton>
            )}
            <Box sx={{ flexGrow: 1 }} />
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
            >
              {theme === "dark" ? <ModeNightIcon /> : <WbSunnyIcon />}
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>

      <Outlet />
    </Container>
  );
};

export default RootLayout;
