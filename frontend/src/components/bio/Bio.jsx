import BioTemplate from "./template/BioTemplate";
import { useFetch } from "../../query/useFetch";

const Bio = () => {
  const { data, isLoading } = useFetch({
    query: "/api/eph-get",
    key: "bioData",
  });
  const bio = data?.[0];

  return (
    <>
      <BioTemplate
        data={bio?.duration}
        title="Experience"
        className="border-r-3"
        isLoading={isLoading}
      />
      <BioTemplate
        data={bio?.projectDone}
        title="Project Done"
        className="border-r-3"
        isLoading={isLoading}
      />
      <BioTemplate
        data={bio?.client}
        title="Happy Clients"
        isLoading={isLoading}
      />
    </>
  );
};

export default Bio;
