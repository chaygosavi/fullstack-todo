import React, { useState } from "react";

const Modal = ({ mode, setShowModal, task, getData }) => {
  const editMode = mode === "edit" ? true : false;
  const [data, setData] = useState({
    user_email: editMode ? task.user_email : "test@test.com",
    title: editMode ? task.title : "",
    progress: editMode ? task.progress : 50,
  });

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    console.log(data);
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataa = await res.json();
      console.log("data", dataa);
      console.log("res.status ", res.status);
      if (res.status === 201) {
        console.log("qweqweqwe");
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editData = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/api/todos/" + task._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: data.title, progress: data.progress }),
      });
      const dataa = await res.json();
      console.log("data", dataa);
      console.log("res.status ", res.status);
      if (res.status === 200) {
        console.log("qweqweqwe");
        setShowModal(false);
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>Let's {mode} your task</h3>
          <button onClick={() => setShowModal(false)}>X</button>
        </div>

        <form>
          <input
            required
            maxLength={30}
            type="text"
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            type="range"
            id="range"
            required
            min={0}
            max="100"
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            disabled={data.title.length < 1}
            type="submit"
            className={mode}
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
