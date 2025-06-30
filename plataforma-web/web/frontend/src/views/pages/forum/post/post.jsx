import React, { use, useEffect, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

import ForumHeader from "../../../components/forum/headerforum";

const ForumPosts = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const forum = location.state?.forum;

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!forum) {
      setError("Fórum indisponível no momento. Por favor, tente mais tarde novamente!");
    }
  }, [forum]);


  if (loading) return <div className="mt-4"><div className="text-center py-5">
    <Spinner animation="border" variant="primary" />
  </div></div>;

  if (error) return <div className="mt-4 alert alert-danger">{error}</div>;

  return (
    <div>
      <ForumHeader
        forum={forum}
      />
    </div>
  );
};

export default ForumPosts;