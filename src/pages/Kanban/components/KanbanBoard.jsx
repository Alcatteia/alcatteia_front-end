import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import KanbanColumn from './KanbanColumn';
import TaskModal from './TaskModal';
import AddTaskButton from './AddTaskButton';
import { KanbanContext } from '../../../contexts/KanbanContext';
import { STATUS_ORDER, STATUS_CONFIG } from '../../../constants/kanban';

export default function KanbanBoard({ category, onParticipate }) {
  const { updateTask, deleteTask, moveTask } = useContext(KanbanContext);
  const [selectedTask, setSelectedTask] = useState(null);

  const openModal = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleSave = (updatedTask) => {
    updateTask(category.id, updatedTask);
    closeModal();
  };

  const handleDelete = () => {
    if (selectedTask) {
      deleteTask(category.id, selectedTask.id);
    }
    closeModal();
  };

  const handleDeleteTask = (categoryId, taskId) => {
    deleteTask(categoryId, taskId);
  };

  const handleMove = (taskId, fromStatus, toStatus) => {
    moveTask(category.id, taskId, fromStatus, toStatus);
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[768px] sm:min-w-full flex gap-4 sm:gap-6 w-fit px-2 sm:px-4 lg:px-6 scrollbar-thin scrollbar-thumb-[#2D1B4F] scrollbar-track-transparent">
        {STATUS_ORDER.map((status) => {
          const tasks = category.columns[status] || [];
          const config = STATUS_CONFIG[status];

          return (
            <KanbanColumn
              key={status}
              title={config.label}
              color={config.color}
              borderColor={config.color}
              tasks={tasks}
              status={status}
              categoryId={category.id}
              onCardClick={openModal}
              onMoveTask={handleMove}
              onDeleteTask={handleDeleteTask}
              onParticipate={onParticipate}
            />
          );
        })}
      </div>

      {selectedTask && (
        <TaskModal
          task={selectedTask}
          isOpen={!!selectedTask}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

KanbanBoard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    columns: PropTypes.shape({
      todo: PropTypes.array,
      doing: PropTypes.array,
      done: PropTypes.array
    }).isRequired
  }).isRequired,
  onParticipate: PropTypes.func
};
