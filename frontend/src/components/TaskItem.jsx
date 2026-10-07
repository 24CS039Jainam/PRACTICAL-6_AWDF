import { useState } from "react";

export default function TaskItem({ task, onUpdate, onDelete, busy }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);

  async function save() {
    await onUpdate(task._id, {
      title,
      completed
    });
    setEditing(false);
  }

  function remove() {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task._id);
    }
  }

  return (
    <article className={`task-card ${task.completed ? "done" : ""}`}>
      {editing ? (
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="edit-input"
        />
      ) : (
        <h3>{task.title}</h3>
      )}

      <p>{task.description || "No description provided."}</p>

      <div className="task-meta">
        <span className={`priority ${task.priority}`}>
          {task.priority}
        </span>
        <span>{task.completed ? "Completed" : "Pending"}</span>
      </div>

      {editing && (
        <label className="check-line">
          <input
            type="checkbox"
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
          Completed
        </label>
      )}

      <div className="actions">
        {editing ? (
          <>
            <button onClick={save} disabled={busy}>Save</button>
            <button onClick={() => setEditing(false)} className="secondary">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setEditing(true)} disabled={busy}>
              Edit
            </button>
            <button onClick={remove} disabled={busy} className="danger">
              Delete
            </button>
          </>
        )}
      </div>
    </article>
  );
}
