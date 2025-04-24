'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { BackgroundGradient } from './ui/background-gradient';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { Trash2, Plus, Check, BookOpen, ListTodo, Sparkles } from 'lucide-react';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('pomoduo-todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (e) {
        console.error('Error parsing saved todos:', e);
      }
    }
  }, []);
  
  // Save todos to localStorage when updated
  useEffect(() => {
    localStorage.setItem('pomoduo-todos', JSON.stringify(todos));
  }, [todos]);
  
  const addTodo = () => {
    if (inputValue.trim() === '') return;
    
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false
    };
    
    setTodos(prev => [...prev, newTodo]);
    setInputValue('');
  };
  
  const toggleTodo = (id: string) => {
    setTodos(prev => 
      prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  
  const removeTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };
  
  return (
    <BackgroundGradient containerClassName="w-full max-w-md">
      <div className="p-4 sm:p-6">
        <motion.div 
          className="flex items-center mb-4 sm:mb-6 justify-center gap-1 sm:gap-2" 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ListTodo className="text-primary animate-bounce-slow" size={18} />
          <h2 className="text-xl sm:text-2xl font-semibold text-center font-fun">Today's Tasks</h2>
          <Sparkles className="text-accent-light animate-pulse-slow" size={16} />
        </motion.div>
        
        <div className="flex mb-4 sm:mb-6 gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
            className="flex-1 px-3 sm:px-4 py-2 text-sm rounded-md focus:outline-none border border-accent-light/20 dark:border-accent-dark/20 bg-background-light dark:bg-background-dark font-fun"
          />
          <Button 
            onClick={addTodo}
            size="icon"
            className="animate-pulse-slow h-8 w-8 sm:h-9 sm:w-9"
          >
            <Plus size={16} />
          </Button>
        </div>
        
        <motion.ul 
          className="space-y-2 sm:space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {todos.length === 0 ? (
            <motion.div
              className="flex flex-col items-center py-6 sm:py-10 text-xs sm:text-sm italic font-fun"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <BookOpen size={28} className="mb-3 text-accent-light animate-float" />
              <p>No tasks yet. Add one to get started!</p>
            </motion.div>
          ) : (
            todos.map((todo, index) => (
              <motion.li 
                key={todo.id} 
                className={cn(
                  "flex items-center p-2 sm:p-3 border rounded-xl group transition-all",
                  todo.completed 
                    ? "border-green-300/30 bg-green-50/10" 
                    : "border-accent-light/30 dark:border-accent-dark/30 hover:border-accent-light/60 dark:hover:border-accent-dark/60"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
                drag="x"
                dragConstraints={{ left: -5, right: 5 }}
                dragElastic={0.1}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 rounded-full border-accent-light/50 dark:border-accent-dark/50 min-w-0 min-h-0 p-0"
                  onClick={() => toggleTodo(todo.id)}
                >
                  {todo.completed && <Check size={10} className="text-green-500" />}
                </Button>
                <span className={cn(
                  "flex-1 transition-all font-fun text-sm sm:text-base",
                  todo.completed ? "line-through text-gray-500 dark:text-gray-400" : ""
                )}>
                  {todo.text}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6 sm:h-7 sm:w-7 opacity-0 group-hover:opacity-100 transition-opacity border-none min-w-0 min-h-0 p-0"
                  onClick={() => removeTodo(todo.id)}
                  aria-label="Delete task"
                >
                  <Trash2 size={12} className="text-red-500" />
                </Button>
              </motion.li>
            ))
          )}
        </motion.ul>
      </div>
    </BackgroundGradient>
  );
} 