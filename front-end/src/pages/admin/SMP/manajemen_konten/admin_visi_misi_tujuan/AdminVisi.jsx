import { useState, useEffect } from "react";
import axios from "axios";
import "../../../../../style/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";

const AdminVisi = () => {
    const [visi, setVisi] = useState("");
    const [newVisi, setNewVisi] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    // ✅ Ambil data visi saat komponen dimuat
    useEffect(() => {
        fetchVisi();
    }, []);

    const fetchVisi = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/visi");
            setVisi(response.data.visi || "Belum ada visi");
        } catch (error) {
            console.error("❌ Gagal mengambil data visi:", error);
        }
    };

    // ✅ Update visi
    const handleUpdateVisi = async () => {
        if (!newVisi.trim()) {
            console.error("❌ Visi tidak boleh kosong");
            return;
        }

        try {
            await axios.put("http://localhost:3001/api/visi", { visi: newVisi });
            setVisi(newVisi);
            setIsEditing(false);
        } catch (error) {
            console.error("❌ Gagal memperbarui visi:", error);
        }
    };

    // ✅ Hapus visi
    const handleDeleteVisi = async () => {
        try {
            await axios.delete("http://localhost:3001/api/visi");
            setVisi("");
            console.log("✅ Visi berhasil dihapus");
        } catch (error) {
            console.error("❌ Gagal menghapus visi:", error);
        }
    };

    return (
        <div className="card">
            <h2 className="card-title text-center">Visi</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Visi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={newVisi}
                                    onChange={(e) => setNewVisi(e.target.value)}
                                />
                            ) : (
                                <span>{visi || "Belum ada visi"}</span>
                            )}
                        </td>
                        <td>
                            {isEditing ? (
                                <button onClick={handleUpdateVisi}>Simpan</button>
                            ) : (
                                <button onClick={() => { setIsEditing(true); setNewVisi(visi); }}>Edit</button>
                            )}
                            <button onClick={handleDeleteVisi} disabled={!visi}>Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdminVisi;
