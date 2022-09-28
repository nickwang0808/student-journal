import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JournalForm from "../components/JournalForm";
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
      handleSave={handlePostJournal}
    />
  );
};

export default Create;
