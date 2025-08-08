'use client';
import { useState, useEffect, useRef } from 'react';

const jamOptions = {
  '08:30': { shift: 'I', jamAkhir: '10:30' },
  '10:30': { shift: 'II', jamAkhir: '13:30' },
  '13:30': { shift: 'III', jamAkhir: '16:30' },
  '16:30': { shift: 'IV', jamAkhir: '19:30' },
  '19:30': { shift: 'V', jamAkhir: '22:30' },
};

export default function PraktikumFormEdit({ initialData, onSuccess, onCancel }) {
  const [form, setForm] = useState({
    Mata_Kuliah: '',
    Shift: '',
    Jam_Mulai: '',
    Jam_Akhir: '',
    Hari: '',
    Jurusan: '',
    Assisten: '',
    Catatan: '',
  });

  const modalRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      const shiftInfo = jamOptions[initialData.Jam_Mulai] || {};
      setForm({
        ...initialData,
        Shift: shiftInfo.shift || initialData.Shift || '',
        Jam_Akhir: shiftInfo.jamAkhir || initialData.Jam_Akhir || '',
      });
    }
  }, [initialData]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCancel();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onCancel]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Jam_Mulai') {
      const shiftData = jamOptions[value] || {};
      setForm((f) => ({
        ...f,
        Jam_Mulai: value,
        Shift: shiftData.shift || '',
        Jam_Akhir: shiftData.jamAkhir || '',
      }));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`/api/praktikum/${form.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (onSuccess) onSuccess();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded shadow-md w-[90%] md:w-[600px]"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="Mata_Kuliah"
            value={form.Mata_Kuliah}
            onChange={handleChange}
            placeholder="Mata Kuliah"
            className="w-full border p-2 rounded"
          />

          <select
            name="Jam_Mulai"
            value={form.Jam_Mulai}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Jam Mulai</option>
            {Object.keys(jamOptions).map((jam) => (
              <option key={jam} value={jam}>
                {jam}
              </option>
            ))}
          </select>

          <select
            name="Hari"
            value={form.Hari}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">Pilih Hari</option>
            <option value="Senin">Senin</option>
            <option value="Selasa">Selasa</option>
            <option value="Rabu">Rabu</option>
            <option value="Kamis">Kamis</option>
            <option value="Jumat">Jumat</option>
          </select>

          <input
            name="Jurusan"
            value={form.Jurusan}
            onChange={handleChange}
            placeholder="Jurusan"
            className="w-full border p-2 rounded"
          />

          <input
            name="Assisten"
            value={form.Assisten}
            onChange={handleChange}
            placeholder="Assisten"
            className="w-full border p-2 rounded"
          />

          <textarea
            name="Catatan"
            value={form.Catatan}
            onChange={handleChange}
            placeholder="Catatan"
            className="w-full border p-2 rounded"
          />

          {/* Hidden inputs for Shift and Jam_Akhir */}
          <input type="hidden" name="Shift" value={form.Shift} />
          <input type="hidden" name="Jam_Akhir" value={form.Jam_Akhir} />

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
