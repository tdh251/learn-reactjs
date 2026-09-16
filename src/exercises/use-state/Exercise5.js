import { useState } from "react";

/**
   TÊN DỰ ÁN: TASK & BUG TRACKER (BẢNG QUẢN LÝ CÔNG VIỆC)
   1. Yêu cầu chức năng
   Bộ lọc & Thống kê (Header Bar):
   Ô tìm kiếm: Lọc realtime theo tiêu đề công việc (không phân biệt hoa thường).
   Lọc theo trạng thái: Dropdown hoặc các nút bấm gồm Tất cả, Chưa xong (Pending), Đã xong (Completed).
   Thống kê tiến độ (Derived State): Hiển thị rõ: Đã hoàn thành: X / Tổng số: Y việc (Z%).
   Thêm công việc mới (Quick Add Form):
   Form gồm: Ô nhập tiêu đề (title), ô chọn độ ưu tiên (priority: Thấp | Trung bình | Cao).
   Bấm nút "Thêm":
   Nếu tiêu đề để trống (hoặc toàn dấu cách): Không thêm (có thể viền đỏ ô input hoặc báo lỗi nhẹ).
   Thêm việc mới vào đầu danh sách, reset ô nhập liệu về rỗng.
   Danh sách công việc (Task List):
   Checkbox Hoàn thành: Tick chọn để đổi trạng thái isCompleted giữa true và false (nếu hoàn thành thì gạch ngang chữ).
   Chỉnh sửa tại chỗ (Inline Edit):
   Mỗi task có nút "Sửa". Bấm vào thì task đó chuyển thành ô <input> để sửa tiêu đề, kèm 2 nút "Lưu" và "Hủy".
   Khi đang sửa task A, nếu bấm "Hủy" thì khôi phục lại tiêu đề cũ.
   Xóa công việc: Có nút "Xóa" kèm theo xác nhận an toàn (nhớ bài học về window.confirm đặt đúng chỗ).
   Hành động hàng loạt (Bulk Actions):
   Nút "Đánh dấu tất cả là Hoàn tất".
   Nút "Dọn dẹp": Xóa toàn bộ các công việc đã hoàn thành (isCompleted: true). Nút này bị disabled nếu chưa có công việc nào hoàn thành.
*/

const INITIAL_TASKS = [
   {
      id: 1,
      title: "Thiết kế giao diện Dashboard",
      priority: "Cao",
      isCompleted: true,
   },
   {
      id: 2,
      title: "Tích hợp API Authentication",
      priority: "Cao",
      isCompleted: false,
   },
   {
      id: 3,
      title: "Viết tài liệu hướng dẫn (Docs)",
      priority: "Thấp",
      isCompleted: false,
   },
   {
      id: 4,
      title: "Fix bug tràn bộ nhớ modal",
      priority: "Trung bình",
      isCompleted: false,
   },
];

const INITIAL_TASK = {
   id: null,
   title: "",
   priority: "Thấp",
   isCompleted: false,
};

const LIST_STATUS = ["Tất cả", "Chưa xong", "Đã xong"];
const LIST_PRIORITY = ["Thấp", "Trung bình", "Cao"];

function TaskForm({ onAddTask }) {
   const [task, setTask] = useState(INITIAL_TASK);

   const handleSubmit = (e) => {
      e.preventDefault();
      if (task.title.trim() === "") {
         alert("Title không được để trống");
         return;
      }
      onAddTask(task);
      setTask(INITIAL_TASK);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;
      setTask((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   return (
      <form onSubmit={handleSubmit}>
         <div>
            <label htmlFor="title">Tiêu đề</label>
            <input
               id="title"
               type="text"
               name="title"
               placeholder="Nhập gì đó..."
               value={task.title}
               onChange={handleChange}
            />
         </div>
         <div>
            <label htmlFor="priority">Priority</label>
            <select
               id="priority"
               name="priority"
               value={task.priority}
               onChange={handleChange}
            >
               {LIST_PRIORITY.map((priority) => (
                  <option key={priority} value={priority}>
                     {priority}
                  </option>
               ))}
            </select>
         </div>
         <button>Thêm công việc</button>
      </form>
   );
}

function TaskFilter({
   searchTerm,
   onSearchChange,
   statusFilter,
   onStatusChange,
}) {
   return (
      <div style={{ display: "flex", gap: "5px", marginTop: "15px" }}>
         <input
            type="search"
            placeholder="Tìm kiếm..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
         />
         <select value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
            {LIST_STATUS.map((status) => (
               <option key={status} value={status}>
                  {status}
               </option>
            ))}
         </select>
      </div>
   );
}

function TaskList({
   tasks,
   isAllCompleted,
   onToggeTask,
   onToggleAllTasks,
   onToggleCompleteAllTasks,
   onClearCompletedTasks,
   onUpdateTask,
   onDeleteTask,
   searchTerm,
   filterStatus,
}) {
   const [draftTask, setDraftTask] = useState({});

   const handleEditTask = (id) => {
      const currentTask = tasks.find((task) => task.id === id);
      if (currentTask) {
         setDraftTask(currentTask);
      }
   };

   const handleCancelEditTask = () => {
      setDraftTask({});
   };

   const handleSaveChangesTask = () => {
      if (draftTask.title === "") {
         alert("Title không được để trống");
         return;
      }
      onUpdateTask(draftTask);
      setDraftTask({});
   };

   const handleChangeTask = (e) => {
      const { name, value } = e.target;
      setDraftTask((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   return (
      <div>
         <h4>Danh sách công việc</h4>
         <table border={1} style={{ width: "100%" }}>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>
                     <input
                        type="checkbox"
                        name="isAllComplated"
                        value={isAllCompleted}
                        checked={isAllCompleted}
                        onChange={onToggleAllTasks}
                     />
                  </th>
                  <th>Tiêu dề</th>
                  <th>Độ ưu tiên</th>
                  <th>Hành động</th>
               </tr>
            </thead>
            <tbody>
               {tasks.map((task) => {
                  return (
                     <TaskItem
                        key={task.id}
                        task={task}
                        draftTask={draftTask}
                        onTogge={onToggeTask}
                        onEdit={handleEditTask}
                        onDelete={onDeleteTask}
                        onChange={handleChangeTask}
                        onSaveChanges={handleSaveChangesTask}
                        onCancel={handleCancelEditTask}
                     />
                  );
               })}
            </tbody>
            <tfoot>
               <tr>
                  <th></th>
                  <th>
                     <button onClick={onToggleCompleteAllTasks}>
                        Hoàn tất
                     </button>
                  </th>
                  <th></th>
                  <th></th>
                  <th>
                     <button onClick={onClearCompletedTasks}>Dọn dẹp</button>
                  </th>
               </tr>
            </tfoot>
         </table>
      </div>
   );
}

function TaskItem({
   task,
   draftTask,
   onTogge,
   onEdit,
   onDelete,
   onChange,
   onSaveChanges,
   onCancel,
}) {
   const isEditing = task.id === draftTask.id;

   return (
      <tr>
         <th>{task.id}</th>
         <th>
            <input
               type="checkbox"
               name="isComplated"
               value={task.isCompleted}
               checked={task.isCompleted}
               onChange={() => onTogge(task.id)}
            />
         </th>
         <th>
            {isEditing ? (
               <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Ví dụ: Hoàn thiện 3 bài tập"
                  value={draftTask.title}
                  onChange={onChange}
               />
            ) : (
               task.title
            )}
         </th>
         <th>
            {isEditing ? (
               <select
                  id="priority"
                  name="priority"
                  value={draftTask.priority}
                  onChange={onChange}
               >
                  {LIST_PRIORITY.map((priority) => (
                     <option key={priority} value={priority}>
                        {priority}
                     </option>
                  ))}
               </select>
            ) : (
               task.priority
            )}
         </th>
         <th>
            {isEditing ? (
               <>
                  <button type="button" onClick={onCancel}>
                     Hủy
                  </button>
                  <button type="button" onClick={onSaveChanges}>
                     Lưu
                  </button>
               </>
            ) : (
               <>
                  <button type="button" onClick={() => onDelete(task.id)}>
                     Xóa
                  </button>
                  <button type="button" onClick={() => onEdit(task.id)}>
                     Sửa
                  </button>
               </>
            )}
         </th>
      </tr>
   );
}

function TaskProgress({ totalTasks, tasksCompletedCount }) {
   const percentage =
      totalTasks === 0
         ? 0
         : Math.round((tasksCompletedCount / totalTasks) * 100);
   return (
      <div style={{ textAlign: "end", marginTop: "15px" }}>
         Đã hoàn thành <strong>{tasksCompletedCount}</strong> / Tổng số:{" "}
         <strong>{totalTasks}</strong> việc <strong>({percentage}%)</strong>
      </div>
   );
}

function App() {
   const [tasks, setTasks] = useState(INITIAL_TASKS);
   const [searchTerm, setSearchTerm] = useState("");
   const [statusFilter, setStatusFilter] = useState("Tất cả");

   const handleAddTask = (task) => {
      const nextId =
         tasks.reduce((acc, task) => (task.id > acc ? task.id : acc), 0) + 1;
      const newTask = { ...task, id: nextId };
      setTasks((prev) => [newTask, ...prev]);
   };

   const handleUpdateTask = (draftTask) => {
      setTasks((prev) =>
         prev.map((task) => (task.id === draftTask.id ? draftTask : task)),
      );
   };

   const handleDeleteTask = (id) => {
      if (window.confirm("Bạn muốn xóa nhiệm vụ này?")) {
         setTasks((prev) => prev.filter((task) => task.id !== id));
      }
   };

   const handleToggleTask = (id) => {
      setTasks((prev) =>
         prev.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task,
         ),
      );
   };

   const handleToggleAllTasks = () => {
      const nextStatus = !isAllCompleted;
      setTasks((prev) =>
         prev.map((task) => ({
            ...task,
            isCompleted: nextStatus,
         })),
      );
   };

   const handleCompleteAllTasks = () => {
      setTasks((prev) =>
         prev.map((task) => ({
            ...task,
            isCompleted: true,
         })),
      );
   };

   const handleClearCompletedTasks = () => {
      if (window.confirm("Xóa nhiệm vụ đã hoàn thành?")) {
         setTasks((prev) => prev.filter((task) => !task.isCompleted));
      }
   };

   const isAllCompleted =
      tasks.length > 0 && tasks.every((task) => task.isCompleted);

   const totalTasks = tasks.length;
   const tasksCompletedCount = tasks.reduce(
      (acc, task) => (task.isCompleted ? acc + 1 : acc),
      0,
   );

   const filteredTasks = tasks.filter((task) => {
      let filterStatusTmp;
      switch (statusFilter) {
         case "Đã xong":
            filterStatusTmp = true;
            break;
         case "Chưa xong":
            filterStatusTmp = false;
            break;
         default:
            filterStatusTmp = "Tất cả";
            break;
      }
      const matchesStatus =
         filterStatusTmp === "Tất cả" || task.isCompleted === filterStatusTmp;
      const matchesKeySearch = task.title
         .toLowerCase()
         .includes(searchTerm.trim().toLowerCase());
      return matchesStatus && matchesKeySearch;
   });

   return (
      <>
         <TaskForm onAddTask={handleAddTask} />
         <TaskFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
         />
         <TaskList
            tasks={filteredTasks}
            isAllCompleted={isAllCompleted}
            onToggeTask={handleToggleTask}
            onToggleAllTasks={handleToggleAllTasks}
            onToggleCompleteAllTasks={handleCompleteAllTasks}
            onClearCompletedTasks={handleClearCompletedTasks}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
         />
         <TaskProgress
            totalTasks={totalTasks}
            tasksCompletedCount={tasksCompletedCount}
         />
         {/* <hr style={{height: '1px', width: '100%'}}/> */}
      </>
   );
}
export default App;
