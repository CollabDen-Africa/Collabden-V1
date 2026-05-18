"use client";

import React, { useState } from "react";
import { FiX, FiClock, FiAlertCircle } from "react-icons/fi";
import Avatar from "@/app/components/ui/Avatar";
import { MOCK_UPDATES } from "@/lib/mockData";


interface UpdatesPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatesPanel({ isOpen, onClose }: UpdatesPanelProps) {
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  if (!isOpen) return null;

  const filteredUpdates = activeTab === "unread" ? MOCK_UPDATES.filter(u => u.isUnread) : MOCK_UPDATES;

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className="fixed inset-0 bg-black/60 z-[90] lg:hidden backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Panel */}
      <aside className="fixed inset-y-0 right-0 z-[100] w-[85vw] sm:w-[322px] bg-[#162026] border-l border-white/10 p-[26px_17px] shadow-2xl animate-in slide-in-from-right-8 duration-300 flex flex-col shrink-0
                        lg:relative lg:inset-auto lg:z-auto lg:w-[322px] lg:h-[879px] lg:bg-white/10 lg:border-none lg:rounded-[30px] lg:shadow-none">
        
        {/* Mobile Header with Close Button */}
        <div className="flex lg:hidden justify-between items-center mb-4 px-2 shrink-0">
          <h2 className="font-sans font-semibold text-[18px] text-white">Updates</h2>
          <button onClick={onClose} className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
            <FiX size={20} className="text-white" />
          </button>
        </div>

        {/* Desktop Header */}
        <h2 className="hidden lg:block font-sans font-semibold text-[18px] leading-[21px] text-white mb-6 shrink-0 ml-1">
          Updates
        </h2>

        {/* Tabs */}
        <div className="flex items-center mb-6 border-b border-white/10">
          <button 
            onClick={() => setActiveTab("all")}
            className={`flex-1 pb-2 text-[13px] font-medium transition-all ${activeTab === "all" ? "text-white border-b-2 border-primary-green" : "text-white/50 border-b-2 border-transparent"}`}
          >
            All Updates
          </button>
          <button 
            onClick={() => setActiveTab("unread")}
            className={`flex-1 pb-2 text-[13px] font-medium transition-all ${activeTab === "unread" ? "text-white border-b-2 border-primary-green" : "text-white/50 border-b-2 border-transparent"}`}
          >
            Unread (2)
          </button>
        </div>
        
        {/* Updates List */}
        <div className="flex flex-col w-full overflow-y-auto custom-scrollbar pr-1 pb-6 lg:pb-2">
          <div className="flex flex-col gap-3 w-full">
            
            {filteredUpdates.map((update) => (
              <div key={update.id} className="w-full bg-[#D7D7D7]/10 rounded-[20px] p-3 sm:p-4 flex flex-col gap-3 relative">
                
                {/* Unread Dot Indicator */}
                {update.isUnread && (
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-primary-green" />
                )}

                <div className="flex items-start gap-3 w-full pr-4">
                  {/* Avatar / Icon */}
                  <div className="shrink-0 relative">
                    {update.avatarUrl ? (
                      <div className="w-[30px] h-[30px] rounded-full border border-primary-green overflow-hidden relative">
                        <Avatar name={update.user!} src={update.avatarUrl} className="w-full h-full text-[10px]" />
                      </div>
                    ) : (
                      <div className={`w-[30px] h-[30px] rounded-full border border-current flex items-center justify-center ${update.systemColor} ${update.systemBg}`}>
                         {update.type === 'system-warning' ? <FiClock size={14} /> : <FiAlertCircle size={14} />}
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <p className="font-sans font-bold text-[12px] leading-[14px] text-white">
                    {update.text}
                  </p>
                </div>

                {/* Actions & Timestamp Row */}
                <div className="flex items-center justify-between w-full mt-1">
                  
                  {/* Action Buttons based on Type */}
                  <div className="flex items-center gap-2">
                    {(update.type === "view" || update.type === "system-warning" || update.type === "system-alert") && (
                      <button className="bg-white/20 border border-white/10 rounded-full px-3 py-1 font-medium text-[10px] text-white hover:bg-white/30 transition-colors">
                        {update.type.includes('system') ? 'View Task' : 'View'}
                      </button>
                    )}

                    {update.type === "request" && (
                      <>
                        <button className="bg-primary-green border border-white/10 rounded-full px-3 py-1 font-medium text-[10px] text-white hover:bg-primary-green/80 transition-colors">Accept</button>
                        <button className="bg-white/10 rounded-full px-3 py-1 font-medium text-[10px] text-white hover:bg-white/20 transition-colors">Decline</button>
                      </>
                    )}

                    {update.type === "message" && (
                      <>
                        <button className="bg-primary-green border border-white/10 rounded-full px-3 py-1 font-medium text-[10px] text-white hover:bg-primary-green/80 transition-colors">Reply</button>
                        <button className="bg-white/10 rounded-full px-3 py-1 font-medium text-[10px] text-white hover:bg-white/20 transition-colors">Dismiss</button>
                      </>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="font-sans font-medium text-[10px] text-white/50 shrink-0 ml-2">
                    {update.time}
                  </span>
                </div>

              </div>
            ))}

            {filteredUpdates.length === 0 && (
              <p className="text-center text-white/50 text-[12px] mt-10">No updates found.</p>
            )}

          </div>
        </div>

      </aside>
    </>
  );
}