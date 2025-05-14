import { useState, useEffect } from "react";
import axios from "axios";
// import "../../../../style/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";

const AdminTujuan = () => {
    const [tujuanList, setTujuanList] = useState([]);
    const [newTujuan, setNewTujuan] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTujuan, setEditedTujuan] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/api/tujuan")
            .then(response => setTujuanList(response.data))
            .catch(error => console.error("❌ Gagal mengambil data tujuan:", error));
    }, []);

    const handleAdd = () => {
        if (!newTujuan.trim()) return;

        axios.post("http://localhost:3001/api/tujuan", { tujuan: newTujuan })
            .then(() => {
                setTujuanList([...tujuanList, newTujuan]);
                setNewTujuan("");
            })
            .catch(error => console.error("❌ Gagal menambahkan tujuan:", error));
    };

    const handleUpdate = async (index, oldTujuan) => {
        if (!editedTujuan.trim()) return;

        try {
            await axios.put("http://localhost:3001/api/tujuan", {
                oldTujuan,
                newTujuan: editedTujuan
            });

            // Update state setelah berhasil
            const updatedTujuan = [...tujuanList];
            updatedTujuan[index] = editedTujuan;
            setTujuanList(updatedTujuan);
            setEditingIndex(null);
        } catch (error) {
            console.error("❌ Gagal mengupdate tujuan:", error.response ? error.response.data : error);
        }
    };

    const handleDelete = (tujuan) => {
        axios.delete("http://localhost:3001/api/tujuan", { data: { tujuan } })
            .then(() => setTujuanList(tujuanList.filter(item => item !== tujuan)))
            .catch(error => console.error("❌ Gagal menghapus tujuan:", error));
    };

    return (
        <div className="card">
            <h2 className="card-title text-center">Kelola Tujuan</h2>
            <ul>
                {tujuanList.map((tujuan, index) => (
                    <li key={index}>
                        {editingIndex === index ? (
                            <>
                                <input
                                    type="text"
                                    value={editedTujuan}
                                    onChange={(e) => setEditedTujuan(e.target.value)}
                                />
                                <button onClick={() => handleUpdate(index, tujuan)}>Simpan</button>
                                <button onClick={() => setEditingIndex(null)}>Batal</button>
                            </>
                        ) : (
                            <>
                                {tujuan}
                                <button onClick={() => { setEditingIndex(index); setEditedTujuan(tujuan); }}>Edit</button>
                                <button onClick={() => handleDelete(tujuan)}>Hapus</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            <input type="text" value={newTujuan} onChange={(e) => setNewTujuan(e.target.value)} />
            <button onClick={handleAdd}>Tambah Tujuan</button>
        </div>
    );
};

export default AdminTujuan;
