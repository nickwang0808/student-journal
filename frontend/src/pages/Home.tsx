import { Divider, Grid, List, ListItem, ListItemText } from "@mui/material";
import { FC } from "react";
import { data } from "../data";

const Home: FC = () => {
  return (
    <List sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper" }}>
      {data.map(({ title, quote, createdAt }) => {
        return (
          <>
            <ListItem>
              <Grid container direction="column">
                <Grid item>
                  <ListItemText primary={title} />
                </Grid>
                <Grid item>
                  <ListItemText primary={quote.content} />
                </Grid>
                <Grid item>
                  <ListItemText primary={createdAt.toLocaleString()} />
                </Grid>
              </Grid>
            </ListItem>
            <Divider variant="middle" component="li" />
          </>
        );
      })}
    </List>
  );
};

export default Home;
