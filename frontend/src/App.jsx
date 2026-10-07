import { useCallback, useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask
} from "./services/api";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import Toast from "./components/Toast";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [error, setError] = useState("");

  const notify = useCallback((text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    window.setTimeout(() => setMessage(""), 2500);
  }, []);

  const loadTasks = useCallback(async () => {
    try {
      setError("");
      setLoading(true);
      const result = await fetchTasks();
      setTasks(result.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function add(task) {
    try {
      setBusy(true);
      const result = await createTask(task);
      setTasks(current => [result.task, ...current]);
      notify("Task created successfully");
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function edit(id, changes) {
    try {
      setBusy(true);
      const result = await updateTask(id, changes);
      setTasks(current =>
        current.map(task => task._id === id ? result.task : task)
      );
      notify("Task updated successfully");
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id) {
    try {
      setBusy(true);
      await deleteTask(id);
      setTasks(current => current.filter(task => task._id !== id));
      notify("Task deleted successfully");
    } catch (err) {
      notify(err.message, "error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">AWDF PRACTICAL 6</p>
          <h1>Task Manager</h1>
          <p className="student">Jainam Khetani · 24CS039</p>
        </div>
        <div className="connection">
          <span className="dot" />
          MongoDB connected through API
        </div>
      </section>

      <section className="workspace">
        <aside className="panel">
          <h2>New task</h2>
          <p className="hint">
            Add a task and it will be stored in MongoDB.
          </p>
          <TaskForm onCreate={add} busy={busy} />
        </aside>

        <section className="panel">
          <div className="list-heading">
            <div>
              <h2>Your tasks</h2>
              <p className="hint">
                {tasks.length} task{tasks.length === 1 ? "" : "s"} from the backend
              </p>
            </div>
            <button className="refresh" onClick={loadTasks} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {error && (
            <div className="error-box">
              {error}
              <button onClick={loadTasks}>Try again</button>
            </div>
          )}

          {loading ? (
            <div className="empty">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty">No tasks yet. Add your first one.</div>
          ) : (
            <div className="task-list">
              {tasks.map(task => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onUpdate={edit}
                  onDelete={remove}
                  busy={busy}
                />
              ))}
            </div>
          )}
        </section>
      </section>

      <footer>
        React → Express → Mongoose → MongoDB
      </footer>

      <Toast message={message} type={messageType} />
    </main>
  );
}
