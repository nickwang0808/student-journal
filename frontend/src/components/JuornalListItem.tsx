import { FC } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import { Grid, ListItem, ListItemButton, Typography } from "@mui/material";
import { Journal } from "../data/types";

interface JuornalListItemProps {
  handleClickItem: () => void;
  handleClickDelete: () => void;
  journal: Journal;
}

const JuornalListItem: FC<JuornalListItemProps> = ({
  handleClickDelete,
  handleClickItem,
  journal,
}) => {
  return (
    <ListItem>
      <Grid
        container
        direction="column"
        sx={{ cursor: "pointer" }}
        onClick={(e) => {
          e.stopPropagation();
          handleClickItem();
        }}
      >
        <Grid item>
          <Typography variant="h6">{journal.title}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" sx={{ textDecoration: "underline" }}>
            <i>"{journal.quote.content}"</i>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="#999999">
            {new Date(journal.createdAt).toString()}
          </Typography>
        </Grid>
      </Grid>
      <ListItemButton
        onClick={(e) => {
          e.stopPropagation();
          handleClickDelete();
        }}
      >
        <DeleteIcon />
      </ListItemButton>
    </ListItem>
  );
};

export default JuornalListItem;
