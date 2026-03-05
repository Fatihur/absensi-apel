'use client';

import React from 'react';
import Image from 'next/image';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isWeekend, getDay } from 'date-fns';
import { id } from 'date-fns/locale';
import { STAFF_LIST, HEAD_OF_OFFICE } from '@/lib/staff-data';

interface AttendanceSheetProps {
  month: number;
  year: number;
}

const DAY_NAMES: Record<number, string> = {
  1: 'SEN',
  2: 'SEL',
  3: 'RAB',
  4: 'KAM',
  5: 'JUM',
};

export default function AttendanceSheet({ month, year }: AttendanceSheetProps) {
  const selectedDate = new Date(year, month);
  const start = startOfMonth(selectedDate);
  const end = endOfMonth(selectedDate);
  
  const allDays = eachDayOfInterval({ start, end });
  const workingDays = allDays.filter(day => !isWeekend(day));

  const monthName = format(selectedDate, 'MMMM', { locale: id }).toUpperCase();

  return (
    <div className="bg-white p-8 shadow-lg print:shadow-none print:p-0 w-[310mm] mx-auto min-h-[195mm] font-sans text-[10px] text-black">
      <table className="w-full border-none">
        {/* Repeated Header using thead */}
        <thead className="table-header-group">
          <tr>
            <td>
              {/* Header Content */}
              <div className="flex items-center justify-center mb-6 relative border-b-2 border-black pb-4 mx-2">
                <div className="absolute left-0 top-0">
                  <Image
                    src="/logo.png"
                    alt="Logo Kemenkumham"
                    width={70}
                    height={70}
                    className="object-contain"
                    priority
                    onError={(e) => {
                      // Fallback to Wikimedia if local logo fails
                      const target = e.target as HTMLImageElement;
                      target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Coat_of_arms_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.svg/1024px-Coat_of_arms_of_the_Ministry_of_Law_and_Human_Rights_of_the_Republic_of_Indonesia.svg.png";
                    }}
                  />
                </div>
                <div className="text-center px-16">
                  <h1 className="text-[12px] font-bold leading-tight">KEMENTERIAN IMIGRASI DAN PEMASYARAKATAN REPUBLIK INDONESIA</h1>
                  <h2 className="text-[12px] font-bold leading-tight">DIREKTORAT JENDERAL PEMASYARAKATAN</h2>
                  <h2 className="text-[12px] font-bold leading-tight">KANTOR WILAYAH NUSA TENGGARA BARAT</h2>
                  <h2 className="text-[14px] font-bold leading-tight">BALAI PEMASYARAKATAN KELAS II SUMBAWA BESAR</h2>
                  <p className="text-[9px]">Jalan Raya Jurusan Bima Km-07, Sumbawa Besar-NTB 84316 Telepon (0371)-2629132</p>
                  <p className="text-[9px]">Laman: https://bapassumbawa.com Surel: bapassumbawa@gmail.com</p>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-4">
                <h3 className="text-[12px] font-bold underline">ABSENSI APEL STAF BULAN {monthName}</h3>
                <h3 className="text-[12px] font-bold">BALAI PEMASYARAKATAN KELAS II SUMBAWA BESAR</h3>
              </div>
            </td>
          </tr>
        </thead>

        {/* Main Content */}
        <tbody>
          <tr>
            <td>
              <div className="print:overflow-visible px-2">
                <table className="w-full border-collapse border border-black table-fixed">
                  <thead>
                    <tr>
                      <th className="border border-black px-1 py-1 w-[30px] bg-blue-100" rowSpan={2}>NO</th>
                      <th className="border border-black px-2 py-1 w-[180px] bg-blue-100" rowSpan={2}>NAMA</th>
                      {workingDays.map((day, idx) => (
                        <th key={idx} className="border border-black text-center text-[8px] bg-blue-100 h-6">
                          {DAY_NAMES[getDay(day)]}
                        </th>
                      ))}
                    </tr>
                    <tr>
                      {workingDays.map((day, idx) => (
                        <th key={idx} className="border border-black text-center text-[8px] bg-blue-100 h-6">
                          {format(day, 'dd')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {STAFF_LIST.map((name, idx) => (
                      <tr key={idx} className="h-6">
                        <td className="border border-black text-center font-bold text-[9px]">{idx + 1}</td>
                        <td className="border border-black px-2 font-bold uppercase text-[9px] truncate">{name}</td>
                        {workingDays.map((_, dayIdx) => (
                          <td key={dayIdx} className="border border-black"></td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Signature and Notes - Only at the end */}
              <div className="mt-6 flex justify-between items-start px-6">
                <div className="border border-black p-2 w-56 text-[9px]">
                  <p className="font-bold mb-1">Ket:</p>
                  <div className="grid grid-cols-[30px_1fr] gap-x-1">
                    <span>S</span><span>= Sakit</span>
                    <span>I</span><span>= Ijin</span>
                    <span>TK</span><span>= Tanpa Keterangan</span>
                    <span>DL</span><span>= Dinas Luar</span>
                    <span>C</span><span>= Cuti</span>
                  </div>
                </div>
                
                <div className="text-center w-64 text-[10px]">
                  <p className="mb-14">Kepala,</p>
                  <p className="font-bold underline uppercase">{HEAD_OF_OFFICE.name}</p>
                  <p>NIP. {HEAD_OF_OFFICE.nip}</p>
                </div>
              </div>
            </td>
          </tr>
        </tbody>

        {/* Empty Footer to handle page spacing if needed */}
        <tfoot className="table-footer-group">
          <tr>
            <td>
              <div className="h-4"></div>
            </td>
          </tr>
        </tfoot>
      </table>

      <style jsx global>{`
        @media print {
          @page {
            size: 330mm 215mm;
            margin: 10mm;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
            margin: 0;
            padding: 0;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
