import axios from "axios";

const BASE_URL = "http://localhost:5000/api/bugs";

export const createBug = async (bugData) => {
  try {
    const response = await axios.post(BASE_URL, bugData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling createBug API: ", error);
  }
};

export const getBugs = async () => {
  try {
    const response = await axios.get(BASE_URL);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling getBugs API: ", error);
  }
};

export const getBugById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling getBugById API: ", error);
  }
};

export const updateBug = async (id, updatedData) => {
  try {
    const response = await axios.patch(`${BASE_URL}/${id}`, updatedData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling updateBug API: ", error);
  }
};

export const deleteBug = async (id) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
    console.log("Bug deleted successfully!");
  } catch (error) {
    console.log("Error while calling deleteBug API: ", error);
  }
};

export const commentOnBug = async (id, comment) => {
  try {
    const response = await axios.post(`${BASE_URL}/${id}/comment`, {
      text: comment,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error while calling commentOnBug API: ", error);
  }
};
