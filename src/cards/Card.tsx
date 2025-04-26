import { useParams } from "react-router";

export const Card = function Card() {
  const { id } = useParams();
  return (
    <>
      <p>id: {id}</p>
    </>
  );
};
