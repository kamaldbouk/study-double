import React from "react";
import { useParams } from "react-router-dom";

const PublicProfile = () => {
  const { id } = useParams();

  return (
    <div>
      Profile of user with ID: {id}
    </div>
  );
};

export default PublicProfile;
