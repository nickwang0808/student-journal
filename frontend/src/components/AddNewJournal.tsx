import AddIcon from "@mui/icons-material/Add";
import { ListItem, ListItemButton } from "@mui/material";
import { FC } from "react";

interface AddNewJournalProps {
  handleClick: () => void;
}

const AddNewJournal: FC<AddNewJournalProps> = ({ handleClick }) => {
  return (
    <ListItem>
      <ListItemButton onClick={handleClick}>
        <AddIcon /> Add new journal
      </ListItemButton>
    </ListItem>
  );
};

export default AddNewJournal;
