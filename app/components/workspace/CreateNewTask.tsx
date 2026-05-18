"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiX, FiChevronDown, FiPlus, FiCheck } from "react-icons/fi";
import Avatar from "@/app/components/ui/Avatar";
import DatePicker from "@/app/components/ui/DatePicker";
import { Priority } from "@/lib/mockData";

const AVAILABLE_USERS = [
  { id: "u1", name: "Tayo Babalola", avatar: "/mock-profiles/small.png" },
  { id: "u2", name: "Amanda Eze", avatar: "/mock-profiles/small3.png" },
  { id: "u3", name: "Maya Johnson", avatar: "/mock-profiles/small.png" },
  { id: "u4", name: "Alex Rivera", avatar: "/mock-profiles/small3.png" }
];

const PRIORITIES: Priority[] = ["High", "Medium", "Low"];

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
}

export default function CreateTaskModal({ isOpen, onClose, onSubmit }: CreateTaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [assignees, setAssignees] = useState<typeof AVAILABLE_USERS>([]);
  
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  
  const priorityRef = useRef<HTMLDivElement>(null);
  const assigneeRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (priorityRef.current && !priorityRef.current.contains(event.target as Node)) {
        setIsPriorityOpen(false);
      }
      if (assigneeRef.current && !assigneeRef.current.contains(event.target as Node)) {
        setIsAssigneeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleToggleAssignee = (user: typeof AVAILABLE_USERS[0]) => {
    setAssignees((prev) => {
      const isSelected = prev.some((a) => a.id === user.id);
      if (isSelected) {
        return prev.filter((a) => a.id !== user.id);
      }
      return [...prev, user];
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: `t-${Date.now()}`,
      title,
      description,
      priority,
      date: selectedDate ? selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "No Date",
      tag: "General",
      status: "todo", 
      assignees: assignees.map(a => a.avatar) 
    });
    
    // Reset form
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setAssignees([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#121A1F]/90 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Frame */}
      <div className="relative w-full max-w-[931px] max-h-[90vh] bg-white/10 border border-white/20 rounded-[50px] shadow-2xl flex flex-col z-10 px-[10px] py-[30px] backdrop-blur-md">
        
        {/* Close Button */}
              <button 
                onClick={onClose}
                className="absolute top-[30px] right-[30px] z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FiX size={24} />
              </button>
        
              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto custom-scrollbar px-[26px] py-[20px] pr-[30px] mt-5"> 
               
        <h2 className="font-sans font-bold text-[32px] text-white text-center mb-[80px]">
          Create New Task
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[60px] w-full max-w-[834px] mx-auto">
          
          <div className="flex flex-col gap-4">
            <label className="font-sans font-semibold text-[18px] text-white ml-2">
              Task Name
            </label>
            <input 
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task name"
              className="w-full h-[50px] bg-white/5 border border-white/20 rounded-full px-6 text-white font-sans font-medium text-[16px] outline-none placeholder:text-white/30 focus:border-primary-green focus:ring-1 focus:ring-primary-green transition-all"
            />
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-sans font-semibold text-[18px] text-white ml-2">
              Description (optional)
            </label>
            <div className="relative w-full">
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your project..."
                className="w-full h-[178px] bg-white/5 border border-white/20 rounded-[24px] p-6 text-white font-sans font-medium text-[16px] outline-none placeholder:text-white/30 focus:border-primary-green focus:ring-1 focus:ring-primary-green transition-all resize-none custom-scrollbar"
              />
              <span className="absolute bottom-4 right-6 font-sans font-medium text-[12px] text-white/40">
                
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 w-full">
            {/* Due Date */}
            <div className="flex flex-col gap-4 flex-1 w-full">
              <label className="font-sans font-semibold text-[18px] text-white ml-2">
                Due Date
              </label>
              <DatePicker 
                              selectedDate={selectedDate}
                              onSelect={(date) => setSelectedDate(date)} 
                              className="w-full h-[52px] bg-white/5 border border-white/20 rounded-[24px] px-6 text-white outline-none focus:border-primary-green focus:ring-1 focus:ring-primary-green transition-all cursor-pointer"
                            />
            </div>

            {/* Custom Priority Dropdown */}
            <div className="flex flex-col gap-4 flex-1 w-full relative" ref={priorityRef}>
              <label className="font-sans font-semibold text-[18px] text-white ml-2">
                Priority
              </label>
              <button
                type="button"
                onClick={() => setIsPriorityOpen(!isPriorityOpen)}
                className={`flex items-center justify-between w-full h-[52px] px-6 bg-white/5 border rounded-[24px] transition-all text-white font-sans font-medium text-[14px] ${
                  isPriorityOpen ? "border-primary-green ring-1 ring-primary-green" : "border-white/20"
                }`}
              >
                <span>{priority || "Select priority"}</span>
                <FiChevronDown className={`transition-transform duration-200 ${isPriorityOpen ? "rotate-180" : ""}`} size={20} />
              </button>

              {isPriorityOpen && (
                <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-[#1A2329] border border-white/20 rounded-[20px] p-2 z-50 shadow-2xl backdrop-blur-xl">
                  {PRIORITIES.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        setPriority(p);
                        setIsPriorityOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-colors font-sans font-medium text-[14px] ${
                        priority === p ? "bg-primary-green text-white" : "text-white hover:bg-white/10"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <label className="font-sans font-semibold text-[18px] text-white ml-2">
              Assignees
            </label>
            <div className="flex flex-row items-center gap-[16px] flex-wrap">
              {assignees.map((assignee) => (
                <div 
                  key={assignee.id}
                  className="flex items-center gap-[10px] h-[67px] bg-white/5 border border-primary-green rounded-full px-4 pr-6 shrink-0"
                >
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden border border-white/20 shrink-0">
                    <Avatar name={assignee.name} src={assignee.avatar} className="w-full h-full" />
                  </div>
                  <span className="font-sans font-bold text-[16px] text-white whitespace-nowrap">
                    {assignee.name}
                  </span>
                </div>
              ))}

              <div className="relative" ref={assigneeRef}>
                <button 
                  type="button"
                  onClick={() => setIsAssigneeOpen(!isAssigneeOpen)}
                  className="flex items-center justify-center w-[67px] h-[67px] rounded-full bg-white/5 border border-dashed border-white/30 hover:border-white/60 hover:bg-white/10 transition-all shrink-0 text-white"
                >
                  <FiPlus size={24} />
                </button>

                {isAssigneeOpen && (
                  <div className="absolute top-[80px] left-0 w-[240px] bg-[#1A2329] border border-white/20 rounded-2xl p-2 z-50 shadow-2xl backdrop-blur-xl flex flex-col gap-1">
                    {AVAILABLE_USERS.map((user) => {
                      const isSelected = assignees.some(a => a.id === user.id);
                      return (
                        <button
                          key={user.id}
                          type="button"
                          onClick={() => handleToggleAssignee(user)}
                          className={`w-full flex items-center justify-between p-2 rounded-xl transition-colors hover:bg-white/10 ${isSelected ? "bg-white/5" : ""}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 shrink-0">
                              <Avatar name={user.name} src={user.avatar} className="w-full h-full text-[10px]" />
                            </div>
                            <span className="font-sans font-medium text-[14px] text-white">
                              {user.name}
                            </span>
                          </div>
                          {isSelected && <FiCheck className="text-primary-green" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-[12px] mt-[40px]">
            <button 
              type="button"
              onClick={onClose}
              className="flex items-center justify-center w-[126px] h-[38px] rounded-full bg-white/10 hover:bg-white/20 transition-colors font-sans font-medium text-[14px] text-white"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex items-center justify-center w-[150px] h-[38px] rounded-full bg-primary-green border border-white/20 hover:brightness-110 transition-all font-sans font-bold text-[14px] text-white shadow-[0_4px_20px_rgba(115,191,68,0.4)]"
            >
              Create Task
            </button>
          </div>

        </form>
      </div>
      </div>
    </div>
  );
}