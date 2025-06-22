import PropTypes from 'prop-types';
import { useDrop } from 'react-dnd';
import { ITEM_TYPES, STATUS_CONFIG } from '../../../constants/kanban';
import { FiCheckCircle } from 'react-icons/fi';

import TaskCard from './TaskCard';
import AddTaskButton from './AddTaskButton';

export default function KanbanColumn({
  status,
  tasks,
  categoryId,
  onCardClick,
  onMoveTask,
  onDeleteTask,
  onParticipate
}) {
  const [{ isOver }, dropRef] = useDrop({
    accept: ITEM_TYPES.TASK,
    drop: (item) => {
      // Verifica se a tarefa está sendo movida para outra coluna
      if (item.status !== status) {
        onMoveTask(item.id, item.status, status, item.categoryId);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  const config = STATUS_CONFIG[status];

  return (
    <div
      ref={dropRef}
      className={`bg-[#1C122A] rounded-xl p-4 sm:p-5 flex flex-col flex-shrink-0 w-[260px] sm:w-[300px] border-2 transition-all duration-200 ${
        isOver ? 'brightness-110 scale-[1.01]' : ''
      }`}
      style={{ borderColor: config.borderHex }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="flex items-center gap-2 text-lg font-semibold" style={{ color: config.color }}>
          {status === 'done' && <FiCheckCircle className="text-green-400" />}
          {config.label}
        </h3>

        <span
          className="text-sm px-2 py-1 rounded-full bg-opacity-20"
          style={{
            color: config.color,
            backgroundColor: `${config.borderHex}33`
          }}
        >
          {tasks.length}
        </span>
      </div>

      <div className="space-y-4 flex-1 min-h-[100px]">
        {tasks.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-6">Sem tarefas</div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              categoryId={categoryId}
              currentStatus={status}
              onClick={() => onCardClick(task)}
              onDelete={(catId, taskId) => onDeleteTask(catId, taskId)}
              onParticipate={(taskId) => onParticipate(categoryId, taskId)}
            />
          ))
        )}
      </div>

      <AddTaskButton status={status} category={categoryId} />
    </div>
  );
}

KanbanColumn.propTypes = {
  status: PropTypes.oneOf(['todo', 'doing', 'done']).isRequired,
  tasks: PropTypes.array.isRequired,
  categoryId: PropTypes.string.isRequired,
  onCardClick: PropTypes.func.isRequired,
  onMoveTask: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onParticipate: PropTypes.func.isRequired
};


