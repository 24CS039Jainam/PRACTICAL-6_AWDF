import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  priority: "medium"
};

export default function TaskForm({ onCreate, busy }) {
  const [form, setForm] = useState(emptyForm);

  function change(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function submit(event) {
    event.preventDefault();
    if (!form.title.trim()) return;

    await onCreate({
      title: form.title,
      description: form.description,
      priority: form.priority
    });

    setForm(emptyForm);
  }

  return (
    <form className="task-form" onSubmit={submit}>
      <input
        name="title"
        value={form.title}
        onChange={change}
        placeholder="Task title"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={change}
        placeholder="Description"
        rows="3"
      />

      <select name="priority" value={form.priority} onChange={change}>
        <option value="low">Low priority</option>
        <option value="medium">Medium priority</option>
        <option value="high">High priority</option>
      </select>

      <button disabled={busy}>
        {busy ? "Saving..." : "Add Task"}
      </button>
    </form>
  );
}
