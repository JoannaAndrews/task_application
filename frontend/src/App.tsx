import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router";
import Layout from "./components/Layout.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import StudyTimer from "./pages/StudyTimer.tsx";
import TaskSummary from "./pages/TaskSummary.tsx";
import axios from "axios";
import './App.css';
import type { AuthProfile, UpdateTaskBody, TaskRecord } from "./types/index.ts";


const API_URL = "https://my-server-571961934177.us-central1.run.app"; //"http://localhost:3001";

//to protect the routes
const ProtectedRoute = ({ user, children }: { user: AuthProfile | null, children: React.ReactNode }) => {
  if (!user) {
    return <Navigate to="/login" replace ></Navigate>
  }
  return <>{children}</>
}


const App = () => {
  const [user, setUser] = useState<AuthProfile | null>(null);
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();
  const [activeTask, setactiveTask] = useState<string | null>(null);
  const [tasks, setTasks] = useState<TaskRecord[]>([]);

  const onAddTask = async () => {
    const res = await axios.post(
      `${API_URL}/api/task/add`,
      { title: "New Task", description: "" },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const newTask: TaskRecord = res.data.data;
    setTasks(prev => [newTask, ...prev]);
    setactiveTask(newTask.taskId);
  };

  const onDeleteTask = async (idToDelete: string) => {
    await axios.delete(
      `${API_URL}/api/task/delete/${idToDelete}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTasks(prev => prev.filter(t => t.taskId !== idToDelete));
    if (activeTask === idToDelete) setactiveTask(null);
  };

  const onUpdateTask = async (idToUpdate: string, updatedTask: UpdateTaskBody) => {
    setTasks(prev => prev.map(t =>
      t.taskId === idToUpdate ? { ...t, ...updatedTask } : t
    ));

    await axios.put(
      `${API_URL}/api/task/update/${idToUpdate}`,
      updatedTask,
      { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` } }
    );

  }

  // fetch tasks when user logs in
  useEffect(() => {
    if (!user || !token) return;

    axios.get(`${API_URL}/api/task/get`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTasks(res.data.data))
      .catch(err => console.error('Failed to fetch tasks:', err));
  }, [user, token]);

  const handleLogin = (profile: AuthProfile, idToken: string) => {
    setUser(profile);
    setToken(idToken);

    const expiry = Date.now() + 55 * 60 * 1000; // 55 minutes (just under 1hr)
    localStorage.setItem("token", idToken);
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("tokenExpiry", String(expiry));
    navigate("/");
  };

  const handleSignup = (profile: AuthProfile, idToken: string) => {
    setUser(profile);
    setToken(idToken);

    const expiry = Date.now() + 55 * 60 * 1000; // 55 minutes (just under 1hr)
    localStorage.setItem("token", idToken);
    localStorage.setItem("user", JSON.stringify(profile));
    localStorage.setItem("tokenExpiry", String(expiry));
    navigate("/");
  }

  const handleLogout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("tokenExpiry");
    navigate("/login");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const storedExpiry = localStorage.getItem("tokenExpiry");

    const isExpired = !storedExpiry || Date.now() > Number(storedExpiry);

    if (storedToken && storedUser && !isExpired) {
      const parsedUser = JSON.parse(storedUser);

      setToken(storedToken);
      setUser(parsedUser);

      axios.get(`${API_URL}/api/task/get`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
        .then(res => setTasks(res.data.data))
        .catch(err => console.error("Failed to fetch tasks:", err));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("tokenExpiry");
    }
  }, []);


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} API_URL="https://my-server-571961934177.us-central1.run.app" ></Login>}></Route>
        <Route path="/signup" element={<SignUp onSignUp={handleSignup} API_URL="https://my-server-571961934177.us-central1.run.app" ></SignUp>}></Route>

        <Route element={
          <ProtectedRoute user={user}>
            <Layout onLogout={handleLogout}></Layout>
          </ProtectedRoute>
        }>
          <Route path="/" element={<Dashboard tasks={tasks} onAddTask={onAddTask} onDeleteTask={onDeleteTask} activeTask={activeTask} setActiveTask={setactiveTask} onUpdateTask={onUpdateTask}></Dashboard>}></Route>
          <Route path="/timer" element={<StudyTimer></StudyTimer>}></Route>
          <Route path="/summary" element={<TaskSummary tasks={tasks}></TaskSummary>}></Route>

        </Route>
      </Routes>
    </>

  )
}

export default App;