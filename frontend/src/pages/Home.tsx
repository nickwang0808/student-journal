import { Divider, List } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteJournalMutation,
  useGetAllJournalsQuery,
} from "../data/queries";

import AddNewJournal from "../components/AddNewJournal";
import JuornalListItem from "../components/JuornalListItem";

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
      <AddNewJournal handleClick={() => navigate("create")} />
      <Divider variant="middle" component="li" />

      {data?.map((journal) => {
        return (
          <React.Fragment key={journal.id}>
            <JuornalListItem
              journal={journal}
              handleClickDelete={() => handleDeleteJournal(journal.id)}
              handleClickItem={() => navigate(`/edit/${journal.id}`)}
            />
            <Divider variant="middle" component="li" />
          </React.Fragment>
        );
      })}
    </List>
  );
};

export default Home;
