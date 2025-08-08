'use client'
import { useState } from 'react'

const jamOptions = {
  '08:30': { shift: 'I', jamAkhir: '10:30' },
  '10:30': { shift: 'II', jamAkhir: '13:30' },
  '13:30': { shift: 'III', jamAkhir: '16:30' },
  '16:30': { shift: 'IV', jamAkhir: '19:30' },
  '19:30': { shift: 'V', jamAkhir: '22:30' },
}

const defaultForm = {
  Mata_Kuliah: '',
  Jam_Mulai: '',
  Shift: '',
  Jam_Ahir: '',
  Hari: '',
  Jurusan: '',
  Assisten: '',
  Catatan: '',
}

export default function PraktikumForm({ onClose, onSuccess }) {
  const [form, setForm] = useState(defaultForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'Jam_Mulai') {
      const { shift, jamAkhir } = jamOptions[value] || {}
      setForm(f => ({
        ...f,
        Jam_Mulai: value,
        Shift: shift || '',
        Jam_Ahir: jamAkhir || '',
      }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/praktikum', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setForm(defaultForm)
      onSuccess()
    } else {
      const errorText = await res.text()
      console.error("ERROR:", errorText)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <input
          type="text"
          name="Mata_Kuliah"
          placeholder="Mata Kuliah"
          value={form.Mata_Kuliah}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select name="Jam_Mulai" value={form.Jam_Mulai} onChange={handleChange} className="border p-2 rounded">
          <option value="">Jam Mulai</option>
          {Object.keys(jamOptions).map(jam => (
            <option key={jam} value={jam}>{jam}</option>
          ))}
        </select>

        <select name="Hari" value={form.Hari} onChange={handleChange} className="border p-2 rounded">
          <option value="">Hari</option>
          {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'].map(h => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>

        <select name="Jurusan" value={form.Jurusan} onChange={handleChange} className="border p-2 rounded">
          <option value="">Jurusan</option>
          {['Informatika', 'Resiskom', 'Statistika', 'Lainnya'].map(j => (
            <option key={j} value={j}>{j}</option>
          ))}
        </select>

        {form.Jurusan === 'Lainnya' && (
          <input
            type="text"
            name="Jurusan"
            placeholder="Isi Jurusan"
            value={form.Jurusan}
            onChange={handleChange}
            className="border p-2 rounded"
          />
        )}

        <input
          type="text"
          name="Assisten"
          placeholder="Assisten"
          value={form.Assisten}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <textarea
        name="Catatan"
        placeholder="Catatan (opsional)"
        value={form.Catatan}
        onChange={handleChange}
        className="w-full border p-2 rounded"
      />
      <input type="hidden" name="Shift" value={form.Shift} />
      <input type="hidden" name="Jam_Ahir" value={form.Jam_Ahir} />

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">Batal</button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Simpan</button>
      </div>
    </form>
  )
}
