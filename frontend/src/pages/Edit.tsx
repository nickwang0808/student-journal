import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import JournalForm from "../components/JournalForm";
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
    navigate("../");
  };

  if (isLoading) {
    // display loading
  }
  if (error) {
    // display error
  }
  return (
    <JournalForm
      titleValue={formData.title}
      contentValue={formData.content ?? ""}
      handleTitleInputChange={(value) =>
        setFormData((prev) => ({ ...prev, title: value }))
      }
      handleContentInputChange={(value) =>
        setFormData((prev) => ({ ...prev, content: value }))
      }
      quoteValue={formData.quote.content}
      handleSave={handlePatchJournal}
    />
  );
};

export default Edit;
