import "../../../../../style/admin/admin_visi_misi_tujuan/AdminVisiMisiTujuan.css";
import AdminMisi from "./AdminMisi";
import AdminVisi from "./AdminVisi";
import AdminTujuan from "./AdminTujuan";

const AdminVisiMisiTujuan = () => {
    return (
        <div>
            <h1 className="text-center mb-4">Visi, Misi dan Tujuan</h1>
            
            {/* Tambahkan div untuk menyusun elemen sejajar */}
            <div className="container-visi-misi">
                <AdminVisi />
                <AdminMisi />
                <AdminTujuan />
            </div>
        </div>
    );
}

export default AdminVisiMisiTujuan;
