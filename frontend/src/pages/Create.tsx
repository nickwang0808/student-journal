import { Box, Grid, TextField, Typography } from "@mui/material";

const Create = () => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container direction="column" gap={2}>
        <Grid item>
          <TextField label="Title" variant="outlined" fullWidth />
        </Grid>
        <Grid item>
          <TextField
            label="Content"
            variant="outlined"
            multiline
            fullWidth
            minRows={10}
          />
        </Grid>
        <Grid item>
          <Typography>An inspiring quote</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Create;
