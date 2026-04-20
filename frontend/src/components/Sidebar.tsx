import type { TaskRecord } from "../types/index.ts";

function Sidebar({ tasks, onAddTask, onDeleteTask, activeTask, setactiveTask }: { tasks: TaskRecord[], onAddTask: any, onDeleteTask: any, activeTask: any, setactiveTask: any }) {

  return (
    <div className="app-sidebar">

      <div className="app-sidebar-header">
        <h1>Tasks</h1>
        <button className="timer-button" onClick={onAddTask}>Add</button>
      </div>
      <div className="app-sidebar-notes">
        {tasks.map((task) => (
          <div key={task.taskId} className={`app-sidebar-note ${task.taskId === activeTask ? "active" : ""}`} onClick={() => setactiveTask(task.taskId)}>

            <div className="sidebar-note-title">

              <strong>{task.title}</strong>
              <button onClick={(e) => { e.stopPropagation(); onDeleteTask(task.taskId); }}>Delete</button>

            </div>


            <p>{task.description ? task.description.slice(0, 100) + "..." : ""}</p>
            <small className="note-meta">
            </small>

          </div>
        ))}

      </div>
    </div>)//<p>sidebar</p>
};

export default Sidebar;
