import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBugs } from "../api/bugApi";
import DefaultLayout from "../components/DefaultLayout";
import BugsTable from "../components/BugsTable";

const HomePage = () => {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBugs(token);
    }
  }, [token]);

  const fetchBugs = async (token) => {
    try {
      const response = await getBugs(token);
      setBugs(response);
    } catch (error) {
      console.log("Error while fetching bugs: ", error);
    }
  };

  return (
    <DefaultLayout>
      <BugsTable bugs={bugs} />
    </DefaultLayout>
  );
};

export default HomePage;
