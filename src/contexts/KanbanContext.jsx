import { createContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as api from '../services/kanbanService';

export const KanbanContext = createContext();

export const KanbanProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [participationRequests, setParticipationRequests] = useState([]);

  useEffect(() => {
    api.getCategories()
      .then(res => {
        const mapped = res.data.map(c => ({
          id: c.id,
          title: c.nome,
          description: c.descricao,
          color: c.cor,
          order: c.ordem,
          columns: { todo: [], doing: [], done: [] }
        }));
        setCategories(mapped);
      })
      .catch(() => {
        console.warn('⚠ Back-end indisponível. Usando dados locais simulados.');
        setCategories([
          {
            id: uuidv4(),
            title: 'Exemplo',
            columns: {
              todo: [],
              doing: [],
              done: []
            }
          }
        ]);
      });

    const currentUserId = 'mockUserId';
    api.getParticipationRequests(currentUserId)
      .then(res => setParticipationRequests(res.data))
      .catch(() => setParticipationRequests([]));
  }, []);

  const addCategory = async (title) => {
    const fallback = {
      id: uuidv4(),
      title,
      columns: { todo: [], doing: [], done: [] }
    };
    setCategories(prev => [...prev, fallback]);
    try {
      const response = await api.createCategory({
        title,
        description: '',
        color: '#000000',
        order: 0,
        usuarioId: 'mockUser',
        timeId: 'mockTime'
      });
      const newCategory = {
        id: response.data.id,
        title: response.data.nome,
        columns: { todo: [], doing: [], done: [] }
      };
      setCategories(prev =>
        prev.map(cat => cat.id === fallback.id ? newCategory : cat)
      );
    } catch (err) {
      console.warn('Erro ao criar categoria:', err);
    }
  };

  const deleteCategory = async (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    try {
      await api.deleteCategory(id);
    } catch {
      console.warn('⚠ Falha ao deletar no back. Deletando local.');
    }
  };

  const insertTask = (categoryId, status, task) => {
    setCategories(prev =>
      prev.map(cat =>
        cat.id === categoryId
          ? {
              ...cat,
              columns: {
                ...cat.columns,
                [status]: [...cat.columns[status], task]
              }
            }
          : cat
      )
    );
  };

  const addTask = async (categoryId, taskData) => {
    const task = {
      id: uuidv4(),
      ...taskData,
      progress: 0,
      participants: taskData.participants || [],
      dueDate: taskData.dueDate || null,
      createdAt: new Date()
    };

    insertTask(categoryId, task.status, task);

    try {
      const res = await api.createTask({
        title: task.title,
        description: task.description,
        categoryId,
        responsavelId: 'mockUser',
        dueDate: task.dueDate,
        priority: 'normal',
        status: task.status
      });

      if (res.data.id && res.data.id !== task.id) {
        setCategories(prev => prev.map(cat => {
          if (cat.id !== categoryId) return cat;
          const updatedColumns = { ...cat.columns };
          updatedColumns[task.status] = updatedColumns[task.status].map(t => t.id === task.id ? res.data : t);
          return { ...cat, columns: updatedColumns };
        }));
      }
    } catch (err) {
      console.warn('Erro ao criar tarefa:', err);
    }
  };

  const updateTask = async (categoryId, updatedTask) => {
    try {
      await api.updateTask(updatedTask.id, updatedTask);
    } catch {
      console.warn('⚠ Atualizando localmente');
    }

    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;

        const updatedColumns = Object.fromEntries(
          Object.entries(cat.columns).map(([status, tasks]) => {
            const isOldStatus = tasks.find(t => t.id === updatedTask.id);
            if (isOldStatus) {
              return [status, tasks.filter(t => t.id !== updatedTask.id)];
            }
            return [status, tasks];
          })
        );

        updatedColumns[updatedTask.status] = [
          ...(updatedColumns[updatedTask.status] || []),
          updatedTask
        ];

        return { ...cat, columns: updatedColumns };
      })
    );
  };

  const deleteTask = async (categoryId, taskId) => {
    setCategories(prev =>
      prev.map(cat => {
        if (cat.id !== categoryId) return cat;
        const updatedColumns = Object.fromEntries(
          Object.entries(cat.columns).map(([status, tasks]) => [
            status, tasks.filter(t => t.id !== taskId)
          ])
        );
        return { ...cat, columns: updatedColumns };
      })
    );
    try {
      await api.deleteTask(taskId);
    } catch {
      console.warn('⚠ Removendo localmente');
    }
  };

  const moveTask = async (categoryId, taskId, sourceCol, destCol) => {
    const task = categories
      .find(cat => cat.id === categoryId)?.columns[sourceCol]
      ?.find(t => t.id === taskId);
    if (!task) return;

    const now = new Date();
    const updatedTask = { ...task, status: destCol, statusChangedAt: now };

    if (destCol === 'done') {
      updatedTask.completedAt = now;
      updatedTask.late = task.dueDate && now > new Date(task.dueDate);
    }

    await updateTask(categoryId, updatedTask);

    try {
      await api.moveTask(taskId, destCol, {
        statusChangedAt: now,
        ...(destCol === 'done' && {
          completedAt: now,
          late: updatedTask.late
        })
      });
    } catch {
      console.warn('⚠ Movendo localmente');
    }
  };

  const assignUser = async (categoryId, taskId) => {
    const currentUser = 'Gabriel';

    const category = categories.find(c => c.id === categoryId);
    if (!category) return;

    const task = Object.values(category.columns).flat().find(t => t.id === taskId);
    if (!task) return;

    const alreadyIn = task.participants?.includes(currentUser);
    const updatedTask = {
      ...task,
      participants: alreadyIn ? task.participants : [...(task.participants || []), currentUser]
    };

    try {
      await api.assignUser(taskId, currentUser);
    } catch {
      console.warn('⚠ Atribuição local');
    }

    await updateTask(categoryId, updatedTask);
  };

  const receiveParticipationRequest = async (requester, taskId) => {
    try {
      await api.sendParticipationRequest(taskId, requester);
    } catch (error) {
      console.warn('Erro ao enviar pedido de participação:', error);
    }
  };

  const acceptParticipation = async (requestId, taskId, requester) => {
    try {
      await api.acceptParticipationRequest(requestId);
      setParticipationRequests(prev => prev.filter(r => r.taskId !== taskId || r.requester !== requester));
    } catch (error) {
      console.warn('Erro ao aceitar pedido de participação:', error);
    }
  };

  const rejectParticipation = async (requestId, taskId, requester) => {
    try {
      await api.rejectParticipationRequest(requestId);
      setParticipationRequests(prev => prev.filter(r => r.taskId !== taskId || r.requester !== requester));
    } catch (error) {
      console.warn('Erro ao recusar pedido de participação:', error);
    }
  };

  return (
    <KanbanContext.Provider
      value={{
        categories,
        addCategory,
        deleteCategory,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        assignUser,
        participationRequests,
        receiveParticipationRequest,
        acceptParticipation,
        rejectParticipation
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};
export default KanbanProvider;
