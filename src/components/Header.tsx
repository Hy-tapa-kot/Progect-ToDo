import React, { useEffect, useRef } from 'react';

interface HeaderProps {
  newTodo: string;
  onAddTodo: (event: React.FormEvent) => void;
  onNewTodoChange: (title: string) => void;
  onToggleAllTodos: () => void;
  allCompleted: boolean;
  isAddingTodo: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  newTodo,
  onAddTodo,
  onNewTodoChange,
  onToggleAllTodos,
  allCompleted,
  isAddingTodo,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [newTodo]);

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={onToggleAllTodos}
      />

      <form onSubmit={onAddTodo}>
        <input
          ref={inputRef}
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={e => onNewTodoChange(e.target.value)}
          disabled={isAddingTodo}
        />
      </form>
    </header>
  );
};
