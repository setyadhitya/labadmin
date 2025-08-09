'use client'
import { useEffect, useState } from 'react'
import PraktikumForm from '../form/PraktikumForm'
import PraktikumFormEdit from '../form/PraktikumFormEdit'

export default function PraktikumPage() {
    const [list, setList] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const [editingData, setEditingData] = useState(null)

    const loadData = async () => {
        const res = await fetch('api/praktikum')
        const data = await res.json()
        setList(data)
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleEdit = (item) => {
        setEditingData({
            id: item.ID,
            Mata_Kuliah: item.Mata_Kuliah,
            Shift: item.Shift,
            Jam_Mulai: item.Jam_Mulai,
            Jam_Ahir: item.Jam_Ahir,
            Hari: item.Hari,
            Jurusan: item.Jurusan,
            Assisten: item.Assisten,
            Catatan: item.Catatan
        })
        setShowEditForm(true)
    }

  const handleDelete = async (id) => {
  if (!confirm('Hapus data ini?')) return;
  
  try {
    const res = await fetch(`api/praktikum/${id}`, { method: 'DELETE' });
    const data = await res.json();
    console.log('Respon dari server:', data);
    loadData(); // reload data setelah delete
  } catch (err) {
    console.error('Gagal menghapus data:', err);
  }
};


    return (
  <div className="p-4 max-w-screen-lg mx-auto">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Data Praktikum</h1>

    <div className="flex justify-end mb-4">
      <button
        onClick={() => setShowForm(true)}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded shadow"
      >
        + Tambah Praktikum
      </button>
    </div>

    {/* Modal Tambah */}
    {showForm && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div
          className="bg-white p-6 rounded-xl shadow-xl w-[90%] md:w-[600px]"
          onClick={(e) => e.stopPropagation()}
        >
          {editingData ? (
            <PraktikumFormEdit
              initialData={editingData}
              onSuccess={() => {
                setShowForm(false);
                setEditingData(null);
                loadData();
              }}
              onCancel={() => {
                setShowForm(false);
                setEditingData(null);
              }}
            />
          ) : (
            <PraktikumForm
              onSuccess={() => {
                setShowForm(false);
                loadData();
              }}
              onClose={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
    )}

    {/* Modal Edit */}
    {showEditForm && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] md:w-[600px]">
          <PraktikumFormEdit
            initialData={editingData}
            onSuccess={() => {
              setShowEditForm(false);
              setEditingData(null);
              loadData();
            }}
            onCancel={() => {
              setShowEditForm(false);
              setEditingData(null);
            }}
          />
        </div>
      </div>
    )}

    <div className="overflow-x-auto rounded shadow">
      <table className="w-full text-sm text-left text-gray-700 border border-gray-300">
        <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
          <tr>
            <th className="px-4 py-2 border">Mata Kuliah</th>
            <th className="px-4 py-2 border">Shift</th>
            <th className="px-4 py-2 border">Jam</th>
            <th className="px-4 py-2 border">Hari</th>
            <th className="px-4 py-2 border">Jurusan</th>
            <th className="px-4 py-2 border">Assisten</th>
            <th className="px-4 py-2 border">Catatan</th>
            <th className="px-4 py-2 border text-center">Opsi</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item.ID} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2 border">{item.Mata_Kuliah}</td>
              <td className="px-4 py-2 border">{item.Shift}</td>
              <td className="px-4 py-2 border">
                {item.Jam_Mulai}–{item.Jam_Ahir}
              </td>
              <td className="px-4 py-2 border">{item.Hari}</td>
              <td className="px-4 py-2 border">{item.Jurusan}</td>
              <td className="px-4 py-2 border">{item.Assisten}</td>
              <td className="px-4 py-2 border">{item.Catatan}</td>
              <td className="px-4 py-2 border text-center whitespace-nowrap">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.ID)}
                  className="text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

}
