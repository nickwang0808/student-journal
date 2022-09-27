import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteJournalMutation,
  useGetAllJournalsQuery,
} from "../data/queries";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Home: FC = () => {
  const { data, isLoading, error } = useGetAllJournalsQuery();

  const [deleteJournal] = useDeleteJournalMutation();

  const navigate = useNavigate();

  const handleDeleteJournal = async (id: number | string) => {
    await deleteJournal({
      id: Number(id!),
    });
    navigate("../");
  };

  if (isLoading) {
    // display loading view
  }
  if (error) {
    // display error view
  }
  return (
    <List sx={{ width: "100%", maxWidth: 900, bgcolor: "background.paper" }}>
      <ListItem>
        <ListItemButton onClick={() => navigate("create")}>
          <AddIcon /> Add new journal
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" component="li" />

      {data?.map(({ title, quote, createdAt, id }) => {
        return (
          <React.Fragment key={id}>
            <ListItem>
              <Grid
                container
                direction="column"
                sx={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit/${id}`);
                }}
              >
                <Grid item>
                  <ListItemText primary={title} />
                </Grid>
                <Grid item>
                  <ListItemText primary={<i>"{quote.content}"</i>} />
                </Grid>
                <Grid item>
                  <ListItemText primary={new Date(createdAt).toString()} />
                </Grid>
              </Grid>
              <ListItemButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteJournal(id);
                }}
              >
                <DeleteIcon />
              </ListItemButton>
            </ListItem>
            <Divider variant="middle" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Home;
