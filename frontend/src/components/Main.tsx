import type { UpdateTaskBody, TaskRecord } from "../types/index.ts";
// const API_URL = "http://localhost:3001";

type value_type = string | boolean;


function Main({ activeTask, onUpdateTask }: { activeTask: TaskRecord | null, onUpdateTask: any }) {

  const onEditField = async (key: string, value: value_type) => {

    if (!activeTask) return;

    const req = {} as UpdateTaskBody;
    if (key === "description") {
      req.description = value as string;
    }
    if (key === "title") {
      req.title = value as string;
    }
    if (key === "completed") {
      req.completed = value as boolean;
    }

    onUpdateTask(activeTask.taskId, req);

  };

  if (!activeTask)
    return (
      <div className="app-main">
        <h1 className="preview-title-white">No Task Selected</h1>
      </div>
    );

  return (
    <div className="app-main">
      <div className="app-main-note-edit">
        <input type="text"
          id="title"
          value={activeTask.title}
          onChange={(e) => onEditField("title", e.target.value)}
          autoFocus></input>
        <textarea id="body"
          placeholder="Write your description here..."
          value={activeTask.description}
          onChange={(e) => onEditField("description", e.target.value)}></textarea>
        <button className="timer-button" onClick={() => onEditField("completed", !activeTask.completed)}>
          {activeTask.completed ? "Mark Incomplete" : "Mark Complete"}
        </button>    </div>

      {/* <div className="app-main-note-preview">
      <h1 className="preview-title">{activeTask.title}</h1>
      <div className="markdown-preview">{activeTask.description}</div>
    </div> */}
    </div>)//<p>main</p>
}

export default Main;

//autofocus: already will start the user there