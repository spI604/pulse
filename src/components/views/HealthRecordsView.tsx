'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealth } from '@/context/HealthContext';
import { HealthRecord } from '@/types/health';
import {
  FolderHeart,
  Search,
  Filter,
  Plus,
  Activity,
  Pill,
  FileText,
  AlertTriangle,
  Stethoscope,
  X,
  Check,
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
    { id: 'all', label: 'All Records' },
    { id: 'symptom', label: 'Symptoms' },
    { id: 'vital', label: 'Vitals' },
    { id: 'medication', label: 'Medications' },
    { id: 'prescription', label: 'Prescriptions' },
    { id: 'allergy', label: 'Allergies' },
    { id: 'condition', label: 'Conditions' },
    { id: 'lab', label: 'Labs & Panels' },
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
      date: 'Today • Just now',
      provider: newProvider.trim() || 'Self-Reported Entry',
      value: newValue.trim() || 'Recorded',
      status: 'Active Record',
      details: newDetails.trim() || 'Added to personal health archive.',
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
        return <FileText className="w-4 h-4 text-[#74A57F]" />;
      default:
        return <Stethoscope className="w-4 h-4 text-[#2F7E79]" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2EAE8] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-[#EEF3F2] text-[#2F7E79] px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-[#E2EAE8]">
            <FolderHeart className="w-3.5 h-3.5" />
            <span>Unified Health History</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#1F2A2A]">
            Health Records Archive
          </h1>
          <p className="text-sm text-[#6C7A7A] mt-1">
            Centralized timeline of symptoms, vitals, medications, allergies, and diagnostic lab panels.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="touch-target inline-flex items-center gap-2 bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Record</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`touch-target px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#2F7E79] text-white shadow-xs'
                  : 'bg-white border border-[#E2EAE8] text-[#6C7A7A] hover:bg-[#F7F8F7] hover:text-[#1F2A2A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#6C7A7A] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search records by title, provider, clinical details, or tags..."
            className="w-full bg-white border border-[#E2EAE8] rounded-xl pl-10 pr-4 py-2.5 text-xs text-[#1F2A2A] placeholder-[#6C7A7A] focus:border-[#2F7E79] focus:outline-hidden shadow-xs"
          />
        </div>
      </div>

      {/* Records Timeline List */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="bg-white border border-[#E2EAE8] rounded-3xl p-10 text-center text-xs text-[#6C7A7A]">
            No matching records found for your filter criteria.
          </div>
        ) : (
          filteredRecords.map((record, idx) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.04 }}
              onClick={() => setSelectedRecord(record)}
              className="bg-white border border-[#E2EAE8] hover:border-[#8FB5AF] rounded-2xl p-5 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#EEF3F2] flex items-center justify-center shrink-0">
                  {getCategoryIcon(record.category)}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[#1F2A2A]">
                      {record.title}
                    </span>
                    {record.status && (
                      <span className="text-[10px] font-semibold bg-[#F7F8F7] text-[#5F8F8B] border border-[#E2EAE8] px-2 py-0.5 rounded-full">
                        {record.status}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6C7A7A] line-clamp-1 max-w-xl">
                    {record.details}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-[11px] text-[#6C7A7A] flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#8FB5AF]" />
                      {record.date}
                    </span>
                    {record.provider && (
                      <span className="text-[11px] text-[#5F8F8B]">
                        • {record.provider}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {record.value && (
                <div className="sm:text-right shrink-0">
                  <span className="text-xs font-bold text-[#1F2A2A] block">
                    {record.value}
                  </span>
                  <span className="text-[10px] text-[#5F8F8B]">Recorded Value</span>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Record Inspector Slide-over / Modal */}
      <AnimatePresence>
        {selectedRecord && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg bg-white border border-[#E2EAE8] rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#EEF3F2] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#EEF3F2] flex items-center justify-center">
                    {getCategoryIcon(selectedRecord.category)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#5F8F8B]">
                      {selectedRecord.category}
                    </span>
                    <h3 className="text-base font-semibold text-[#1F2A2A]">
                      {selectedRecord.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedRecord(null)}
                  className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#6C7A7A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-[#6C7A7A] block mb-1">Details &amp; Observations:</span>
                  <p className="text-[#1F2A2A] bg-[#F7F8F7] border border-[#E2EAE8] p-3.5 rounded-xl leading-relaxed">
                    {selectedRecord.details}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#F7F8F7] border border-[#E2EAE8] p-3 rounded-xl">
                    <span className="text-[#6C7A7A] block">Date Logged:</span>
                    <span className="font-semibold text-[#1F2A2A] mt-0.5 block">{selectedRecord.date}</span>
                  </div>
                  <div className="bg-[#F7F8F7] border border-[#E2EAE8] p-3 rounded-xl">
                    <span className="text-[#6C7A7A] block">Source / Provider:</span>
                    <span className="font-semibold text-[#1F2A2A] mt-0.5 block">{selectedRecord.provider || 'Self'}</span>
                  </div>
                </div>

                {selectedRecord.tags.length > 0 && (
                  <div>
                    <span className="text-[#6C7A7A] block mb-1">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {selectedRecord.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-[#EEF3F2] text-[#2F7E79] px-2 py-0.5 rounded-md text-[10px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-[#EEF3F2] flex justify-end">
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="touch-target px-5 py-2 rounded-xl bg-[#2F7E79] text-white text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Record Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-lg bg-white border border-[#E2EAE8] rounded-3xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#EEF3F2] pb-3">
                <h3 className="text-base font-semibold text-[#1F2A2A]">
                  Add Health Record
                </h3>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-[#6C7A7A]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[#1F2A2A] font-medium mb-1">
                    Record Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Annual Lipid Panel, Blood Pressure check"
                    className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-3.5 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1F2A2A] font-medium mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-3 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                    >
                      <option value="vital">Vital</option>
                      <option value="symptom">Symptom</option>
                      <option value="medication">Medication</option>
                      <option value="prescription">Prescription</option>
                      <option value="allergy">Allergy</option>
                      <option value="condition">Condition</option>
                      <option value="lab">Lab Panel</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1F2A2A] font-medium mb-1">
                      Value / Result
                    </label>
                    <input
                      type="text"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                      placeholder="e.g. 118/76 mmHg"
                      className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-3.5 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#1F2A2A] font-medium mb-1">
                    Provider or Device
                  </label>
                  <input
                    type="text"
                    value={newProvider}
                    onChange={(e) => setNewProvider(e.target.value)}
                    placeholder="e.g. Dr. Sarah Lin, Omron Cuff"
                    className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl px-3.5 py-2 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[#1F2A2A] font-medium mb-1">
                    Clinical Notes &amp; Details
                  </label>
                  <textarea
                    rows={3}
                    value={newDetails}
                    onChange={(e) => setNewDetails(e.target.value)}
                    placeholder="Details, dosage instructions, or clinician recommendations..."
                    className="w-full bg-[#F7F8F7] border border-[#E2EAE8] rounded-xl p-3 text-xs text-[#1F2A2A] focus:border-[#2F7E79] focus:bg-white focus:outline-hidden resize-none"
                  />
                </div>

                <div className="pt-3 border-t border-[#EEF3F2] flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="touch-target px-4 py-2 text-xs text-[#6C7A7A] hover:text-[#1F2A2A]"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="touch-target px-5 py-2 rounded-xl bg-[#2F7E79] hover:bg-[#266864] text-white text-xs font-semibold shadow-xs"
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
