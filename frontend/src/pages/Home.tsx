import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteJournalMutation,
  useGetAllJournalsQuery,
} from "../data/queries";

const Home: FC = () => {
  const { data, isLoading, error } = useGetAllJournalsQuery();

  const [deleteJournal] = useDeleteJournalMutation();

  const navigate = useNavigate();

  const handleDeleteJournal = async (id: number | string) => {
    await deleteJournal({
      id: Number(id!),
    });
    navigate(-1);
  };

  if (isLoading) {
    // display loading view
  }
  if (error) {
    // display error view
  }
  return (
    <List sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper" }}>
      {data?.map(({ title, quote, createdAt, id }) => {
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
                  <ListItemText primary={new Date(createdAt).toDateString()} />
                </Grid>
              </Grid>
              <ListItemButton onClick={() => handleDeleteJournal(id)}>
                X
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li" />
          </>
        );
      })}
    </List>
  );
};

export default Home;
