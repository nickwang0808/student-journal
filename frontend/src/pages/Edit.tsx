import { Box, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllJournalsQuery,
  usePatchJournalMutation,
} from "../data/queries";
import { PostArg } from "../data/types";

const Edit = () => {
  const { id } = useParams<{ id: string }>();

  const [formData, setFormData] = useState<PostArg>({
    title: "",
    content: "",
    quote: { content: "" },
  });

  // this is be cached by rtk query, in prod we should implement a getById but I have a full time job so short on time.
  const { data, isLoading, error } = useGetAllJournalsQuery();

  useEffect(() => {
    const found = data?.find((elem) => String(elem.id) === id);

    if (found) {
      setFormData(found);
    }
  }, [data, id]);

  const [patchJournal] = usePatchJournalMutation();

  const navigate = useNavigate();

  const handlePatchJournal = async () => {
    await patchJournal({
      id: Number(id!),
      title: formData.title,
      content: formData.content,
    });
    navigate(-1);
  };

  if (isLoading) {
    // display loading
  }
  if (error) {
  } // display error
  return (
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
  );
};

export default Edit;
