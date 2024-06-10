import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
function EditNews() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const params = useParams();

  const navigate = useNavigate();
  const save = async () => {
    setLoading(true);
    try {
      const payload = {
        title,
        description,
        content,
        postedBy: {
          userid: user._id,
          email: user.email,
        },
        newsid: params.newsid,
      };
      await axios.post(
        "http://localhost:5000/api/newsitems/editnewsitem",
        payload
      );
      setLoading(false);
      toast("News edited successfully", "success");
      navigate("/home");
    } catch (error) {
      console.log(error);
      toast("Something went wrong", "error");
      setLoading(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/newsitems/getnewsitembyid", {
        newsid: params.newsid,
      });
      setTitle(result.data.title);
      setDescription(result.data.description);
      setContent(result.data.content);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      {loading && <Spinner />}
      <h1 className="text-2xl font-semibold mt-5 ml-5">Editnews</h1>
      <div className="px-5 pt-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="border-2 h-10 w-full border-gray-300 px-5"
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 w-full border-gray-300 px-5 "
          rows="4"
          placeholder="Description"
        ></textarea>
      </div>
      <div className="border-2 border-gray-300 mx-5 rounded px-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="draft-editor"
          rows="4"
          placeholder="Description"
        ></textarea>
      </div>

      <div className="flex justify-end space-x-5 pr-5 mt-5">
        <button
          className="px-5 py-1 bg-red-700 text-sm text-white"
          onClick={() => navigate("/home")}
        >
          BACK
        </button>
        <button
          className="px-5 py-1 bg-green-500 text-sm text-white"
          onClick={save}
        >
          SAVE
        </button>
      </div>
    </Layout>
  );
}

export default EditNews;
