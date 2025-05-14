import { useState, useEffect } from "react";
import axios from "axios";
import "../../../../../style/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";

const AdminMisi = () => {
    const [misiList, setMisiList] = useState([]);
    const [newMisi, setNewMisi] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3001/api/misi")
            .then(response => setMisiList(response.data))
            .catch(error => console.error("Gagal mengambil data misi:", error));
    }, []);

    const handleAdd = () => {
        if (!newMisi.trim()) {
            alert("Misi tidak boleh kosong!");
            return;
        }
    
        axios.post("http://localhost:3001/api/misi", { misi: newMisi })
            .then(() => {
                setMisiList([...misiList, newMisi]);
                setNewMisi("");
            })
            .catch(error => console.error("Gagal menambahkan misi:", error));
    };
    

    const handleUpdate = (index, oldMisi) => {
        axios.put("http://localhost:3001/api/misi", { oldMisi, newMisi })
            .then(() => {
                const updatedMisi = [...misiList];
                updatedMisi[index] = newMisi;
                setMisiList(updatedMisi);
                setEditingIndex(null);
                setNewMisi("");
            })
            .catch(error => console.error("Gagal mengupdate misi:", error));
    };

    const handleDelete = (misi) => {
        axios.delete("http://localhost:3001/api/misi", { data: { misi } })
            .then(() => setMisiList(misiList.filter(item => item !== misi)))
            .catch(error => console.error("Gagal menghapus misi:", error));
    };

    return (
        <div className="card">
            <h2 className="card-title text-center">Misi</h2>
            <ul>
                {misiList.map((misi, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <input type="text" value={newMisi} onChange={(e) => setNewMisi(e.target.value)} />
                        ) : (
                            <span>{misi}</span>
                        )}
                        {editingIndex === index ? (
                            <button onClick={() => handleUpdate(index, misi)}>Simpan</button>
                        ) : (
                            <button onClick={() => { setEditingIndex(index); setNewMisi(misi); }}>Edit</button>
                        )}
                        <button onClick={() => handleDelete(misi)}>Hapus</button>
                    </li>
                ))}
            </ul>
            <input type="text" value={newMisi} onChange={(e) => setNewMisi(e.target.value)} />
            <button onClick={handleAdd}>Tambah Misi</button>
        </div>
    );
};

export default AdminMisi;   
