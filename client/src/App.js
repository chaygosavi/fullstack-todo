import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

const App = () => {
  const userEmail = "test@test.com";
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/todos/" + userEmail);
      const tasksData = await res.json();
      setTasks(tasksData.todos);
      console.log(tasksData.todos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => getData, []);

  const sortedTasks = tasks?.sort((a, b) => a.date - b.date);

  return (
    <div className="app">
      <ListHeader listName={"lsjnsdlfjnsdfjlnsdfjn"} getData={getData} />

      {sortedTasks?.map((task) => (
        <ListItem key={task.id} task={task} getData={getData} />
      ))}
    </div>
  );
};

export default App;
