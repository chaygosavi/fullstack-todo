import React, { useState } from "react";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);

  const deleteData = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/todos/" + task._id, {
        method: "DELETE",
      });
      console.log(res);
      if (res.status === 204) {
        getData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteData}>
          DELETE
        </button>
      </div>
      {showModal ? (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          task={task}
          getData={getData}
        />
      ) : (
        <></>
      )}
    </li>
  );
};

export default ListItem;
