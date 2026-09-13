'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '@/context/HealthContext';
import { HealthRecord } from '@/types/health';
import {
  FolderHeart,
  Search,
  Plus,
  Activity,
  Pill,
  FileText,
  AlertTriangle,
  Stethoscope,
  X,
  Calendar,
} from 'lucide-react';

export const HealthRecordsView: React.FC = () => {
  const { healthRecords, addHealthRecord } = useHealth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);

  // New record modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<HealthRecord['category']>('vital');
  const [newDetails, setNewDetails] = useState<string>('');
  const [newProvider, setNewProvider] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'symptom', label: 'Symptoms' },
    { id: 'vital', label: 'Vitals' },
    { id: 'medication', label: 'Medications' },
    { id: 'allergy', label: 'Allergies' },
    { id: 'lab', label: 'Labs' },
  ];

  const filteredRecords = healthRecords.filter((rec) => {
    const matchesCategory = selectedCategory === 'all' || rec.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addHealthRecord({
      title: newTitle.trim(),
      category: newCategory,
      date: 'Today',
      provider: newProvider.trim() || 'Self-Reported',
      value: newValue.trim() || 'Recorded',
      status: 'Active Record',
      details: newDetails.trim() || 'Added to health archive.',
      tags: [newCategory, 'User Logged'],
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDetails('');
    setNewProvider('');
    setNewValue('');
  };

  const getCategoryIcon = (cat: HealthRecord['category']) => {
    switch (cat) {
      case 'vital':
        return <Activity className="w-4 h-4 text-[#2F7E79]" />;
      case 'medication':
        return <Pill className="w-4 h-4 text-[#5F8F8B]" />;
      case 'allergy':
        return <AlertTriangle className="w-4 h-4 text-[#D97A7A]" />;
      case 'symptom':
        return <Activity className="w-4 h-4 text-[#D8B26E]" />;
      case 'lab':
        return <FileText className="w-4 h-4 text-[#679E73]" />;
      default:
        return <Stethoscope className="w-4 h-4 text-[#2F7E79]" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-2 sm:px-4 space-y-5 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#EAEFEF] pb-4">
        <div>
          <h1 className="text-xl font-bold text-[#162020]">
            Health Records
          </h1>
          <span className="text-xs text-[#708080]">
            Unified physiological timeline
          </span>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="touch-target inline-flex items-center gap-1.5 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`touch-target px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#2F7E79] text-white'
                    : 'bg-white border border-[#EAEFEF] text-[#708080] hover:text-[#162020]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="w-3.5 h-3.5 text-[#8FA0A0] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..."
              className="w-full bg-white border border-[#EAEFEF] rounded-full pl-8 pr-3 py-1.5 text-xs text-[#162020] placeholder-[#8FA0A0] focus:border-[#2F7E79] focus:outline-hidden"
            />
          </div>
        </div>
      </div>

      {/* Records Timeline List */}
      <div className="space-y-2">
        {filteredRecords.length === 0 ? (
          <div className="bg-white border border-[#EAEFEF] rounded-2xl p-8 text-center text-xs text-[#708080]">
            No matching records found.
          </div>
        ) : (
          filteredRecords.map((record, idx) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: idx * 0.02 }}
              onClick={() => setSelectedRecord(record)}
              className="bg-white border border-[#EAEFEF] hover:border-[#2F7E79]/30 rounded-2xl p-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-xs cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EEF5F4] flex items-center justify-center shrink-0">
                  {getCategoryIcon(record.category)}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold text-[#162020]">
                      {record.title}
                    </span>
                    {record.status && (
                      <span className="text-[10px] font-semibold bg-[#F8FAF9] text-[#708080] px-2 py-0.2 rounded-full">
                        {record.status}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-[#708080] line-clamp-1">
                    {record.details}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto text-right shrink-0">
                {record.value && (
                  <span className="text-xs font-bold text-[#162020]">
                    {record.value}
                  </span>
                )}
                <span className="text-[11px] text-[#8FA0A0]">
                  {record.date}
                </span>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Record Inspector Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-md bg-white border border-[#EAEFEF] rounded-3xl p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#F0F4F3] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF5F4] flex items-center justify-center">
                    {getCategoryIcon(selectedRecord.category)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#2F7E79]">
                      {selectedRecord.category}
                    </span>
                    <h3 className="text-sm font-bold text-[#162020]">
                      {selectedRecord.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-[#708080]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[11px] text-[#708080] block mb-1">Details:</span>
                  <p className="text-[#162020] bg-[#F8FAF9] p-3 rounded-xl leading-relaxed">
                    {selectedRecord.details}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-[#F8FAF9] p-2.5 rounded-xl">
                    <span className="text-[11px] text-[#708080] block">Date:</span>
                    <span className="font-semibold text-[#162020]">{selectedRecord.date}</span>
                  </div>
                  <div className="bg-[#F8FAF9] p-2.5 rounded-xl">
                    <span className="text-[11px] text-[#708080] block">Source:</span>
                    <span className="font-semibold text-[#162020]">{selectedRecord.provider || 'Self'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#F0F4F3] flex justify-end">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="touch-target px-4 py-1.5 rounded-xl bg-[#2F7E79] text-white text-xs font-semibold"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Record Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-md bg-white border border-[#EAEFEF] rounded-3xl p-6 shadow-xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#F0F4F3] pb-3">
                <h3 className="text-sm font-bold text-[#162020]">
                  Add Health Record
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-7 h-7 rounded-full hover:bg-black/5 flex items-center justify-center text-[#708080]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#162020] font-medium mb-1">
                    Record Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Lipid Panel, Blood Pressure check"
                    className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[#162020] font-medium mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                    >
                      <option value="vital">Vital</option>
                      <option value="symptom">Symptom</option>
                      <option value="medication">Medication</option>
                      <option value="allergy">Allergy</option>
                      <option value="lab">Lab Panel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#162020] font-medium mb-1">
                      Value / Result
                    </label>
                    <input
                      type="text"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="e.g. 118/76 mmHg"
                      className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl px-3 py-2 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#162020] font-medium mb-1">
                    Details
                  </label>
                  <textarea
                    rows={2}
                    value={newDetails}
                    onChange={(e) => setNewDetails(e.target.value)}
                    placeholder="Clinical notes or instructions..."
                    className="w-full bg-[#F8FAF9] border border-[#EAEFEF] rounded-xl p-2.5 text-xs text-[#162020] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden resize-none"
                  />
                </div>

                <div className="pt-2 border-t border-[#F0F4F3] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="touch-target px-3 py-1.5 text-xs text-[#708080] hover:text-[#162020]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="touch-target px-4 py-1.5 rounded-xl bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-bold shadow-xs"
                  >
                    Save Record
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
