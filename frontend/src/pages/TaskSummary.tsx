import type { TaskRecord } from "../types/index.ts";

const TaskSummary = ({ tasks }: { tasks: TaskRecord[] }) => {
  let completed_tasks = tasks.reduce((acc, t) => {
    if (t.completed) return acc + 1;
    return acc;
  }, 0);

  let total_tasks = tasks.length;
  let incomplete_tasks = total_tasks - completed_tasks;

  return (
    <div className="page-container">
      <img className="background-img" src="/cloud_bg.png"></img>

      <div className="card-container-stats">
        <p className="stats-label">Completed Tasks</p>
        <p className="stats-value">{completed_tasks}</p>
        <p className="stats-label">Incomplete Tasks</p>
        <p className="stats-value">{incomplete_tasks}</p>
      </div>
      <img className="background-img" src="/cloud_bg.png"></img>

    </div>)
}

export default TaskSummary;