'use client';

import React, { useState, useEffect } from 'react';
import AttendanceSheet from '@/components/AttendanceSheet';
import { Printer, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

const MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember"
];

export default function Home() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4 print:p-0 print:bg-white">
      {/* Controls - Hidden on Print */}
      <div className="max-w-4xl mx-auto mb-8 no-print">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-3 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">Generator Absensi</h1>
              <p className="text-sm text-slate-500">Atur bulan dan tahun untuk generate lembar absensi</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 rounded-lg p-1">
              <button 
                type="button"
                onClick={prevMonth}
                className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="px-4 font-medium text-slate-700 min-w-[140px] text-center">
                {MONTHS[month]} {year}
              </div>
              <button 
                type="button"
                onClick={nextMonth}
                className="p-2 hover:bg-white hover:shadow-sm rounded-md transition-all text-slate-600 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-md shadow-blue-200 active:scale-95 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Cetak PDF
            </button>
          </div>
        </motion.div>
      </div>

      {/* Attendance Sheet */}
      <div className="flex justify-center overflow-x-auto pb-12 print:pb-0">
        <motion.div
          key={`${month}-${year}`}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AttendanceSheet month={month} year={year} />
        </motion.div>
      </div>

      {/* Instructions for user */}
      <div className="max-w-4xl mx-auto mt-8 no-print text-center text-slate-400 text-sm space-y-2">
        <p>Gunakan tombol navigasi untuk mengubah periode. Klik &quot;Cetak PDF&quot; untuk mengunduh atau mencetak.</p>
        <p className="text-xs italic">Pastikan pengaturan cetak menggunakan orientasi Landscape (Lanskap) dan Ukuran Kertas F4 (Folio/215x330mm).</p>
        <p className="text-xs">
          Jika tombol cetak tidak merespon, silakan{' '}
          <a 
            href={mounted ? window.location.href : '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            buka aplikasi di tab baru
          </a>
          {' '}lalu coba cetak kembali.
        </p>
      </div>
    </main>
  );
}
