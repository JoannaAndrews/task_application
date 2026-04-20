import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import type { TaskRecord } from "../types/index.ts";


const Dashboard = ({ tasks, onAddTask, onDeleteTask, activeTask, setActiveTask, onUpdateTask }: { tasks: TaskRecord[], onAddTask: any, onDeleteTask: any, activeTask: any, setActiveTask: any, onUpdateTask: any }) => {

  const activeTaskRecord = tasks.find(t => t.taskId === activeTask) ?? null;

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar tasks={tasks} onAddTask={onAddTask}
        onDeleteTask={onDeleteTask}
        activeTask={activeTask} setactiveTask={setActiveTask}
      ></Sidebar>
      <Main activeTask={activeTaskRecord} onUpdateTask={onUpdateTask}>
      </Main>
    </div>)
}

export default Dashboard;