import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetQuoteQuery, usePostJournalMutation } from "../data/queries";
import { PostArg } from "../data/types";

const Create = () => {
  const [formData, setFormData] = useState<PostArg>({
    title: "",
    content: "",
    quote: { content: "A quote will show up shortly..." },
  });

  const [postJournal] = usePostJournalMutation();

  const navigate = useNavigate();

  const handlePostJournal = async () => {
    // not stopping on emplty quote because saving notes is more important, need to implement other ways to over come this
    await postJournal(formData);
    navigate("../");
  };

  // error handling will be implemented in prod code base
  const { data } = useGetQuoteQuery();

  useEffect(() => {
    if (data) {
      setFormData((prev) => ({ ...prev, quote: { content: data[0].q } }));
    }
  }, [data]);

  return (
    <>
      <Box component="form" noValidate autoComplete="off">
        <Grid container direction="column" gap={2}>
          <Grid item>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={formData.title}
              onChange={({ target }) =>
                setFormData((prev) => ({ ...prev, title: target.value }))
              }
            />
          </Grid>
          <Grid item>
            <TextField
              label="Content"
              variant="outlined"
              multiline
              fullWidth
              minRows={10}
              value={formData.content}
              onChange={({ target }) =>
                setFormData((prev) => ({ ...prev, content: target.value }))
              }
            />
          </Grid>
          <Grid item>
            <Typography>{formData.quote.content}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Button onClick={handlePostJournal}>Save</Button>
    </>
  );
};

export default Create;