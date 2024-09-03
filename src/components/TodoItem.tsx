import React, { useEffect, useRef } from 'react';
import { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  editingTodoId: number | null;
  editingTodoTitle: string;
  isLoading: boolean;
  tempTodoId: number | null;
  onToggleTodo: (todo: Todo) => void;
  onDeleteTodo: (todoId: number) => void;
  onEditTodo: (todo: Todo) => void;
  onUpdateTodo: (event: React.FormEvent) => void;
  onEditingTodoTitleChange: (title: string) => void;
  onCancelEdit: () => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  editingTodoId,
  editingTodoTitle,
  isLoading,
  tempTodoId,
  onToggleTodo,
  onDeleteTodo,
  onEditTodo,
  onUpdateTodo,
  onEditingTodoTitleChange,
  onCancelEdit,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editingTodoId === todo.id && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingTodoId, todo.id]);

  const isTempTodo = tempTodoId === todo.id;

  return (
    <div
      key={todo.id}
      data-cy="Todo"
      className={`todo ${todo.completed ? 'completed' : ''}`}
    >
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggleTodo(todo)}
          disabled={isLoading || isTempTodo}
        />
        .
      </label>

      {editingTodoId === todo.id ? (
        <form className="todo__edit" onSubmit={onUpdateTodo}>
          <input
            type="text"
            value={editingTodoTitle}
            onChange={e => onEditingTodoTitleChange(e.target.value)}
            onBlur={onUpdateTodo}
            onKeyUp={e => {
              if (e.key === 'Escape') {
                onCancelEdit();
              }
            }}
            className="todo__title-field"
            ref={inputRef}
            disabled={isLoading}
          />
        </form>
      ) : (
        <>
          <span
            data-cy="TodoTitle"
            className={`todo__title ${isLoading || isTempTodo ? 'loading' : ''}`}
            onDoubleClick={() => onEditTodo(todo)}
          >
            {todo.title}
          </span>

          <button
            type="button"
            className="todo__remove"
            data-cy="TodoDelete"
            onClick={() => onDeleteTodo(todo.id)}
            disabled={isLoading || isTempTodo}
          >
            ×
          </button>
        </>
      )}

      {(isLoading || isTempTodo) && (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter"></div>
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};
