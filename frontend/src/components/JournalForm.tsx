import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { FC } from "react";

interface JournalFromProps {
  titleValue: string;
  handleTitleInputChange: (value: string) => void;
  contentValue: string;
  handleContentInputChange: (value: string) => void;
  quoteValue: string;
  handleSave: () => void;
}

const JournalForm: FC<JournalFromProps> = ({
  titleValue,
  handleTitleInputChange,
  contentValue,
  handleContentInputChange,
  quoteValue,
  handleSave,
}) => {
  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container direction="column" gap={2}>
          <Grid item>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={titleValue}
              onChange={({ target }) => handleTitleInputChange(target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Content"
              variant="outlined"
              multiline
              fullWidth
              minRows={10}
              value={contentValue}
              onChange={({ target }) => handleContentInputChange(target.value)}
            />
          </Grid>
          <Grid item>
            <Typography>{quoteValue}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Button onClick={handleSave}>Save</Button>
    </>
  );
};

export default JournalForm;
