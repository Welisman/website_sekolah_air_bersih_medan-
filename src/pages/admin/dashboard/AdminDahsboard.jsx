import Data from "../trafic/traficData";
import AdminVisiMisiTujuan from "./admin_visi_misi_tujuan/AdminVisiMisiTujuan";
import PerkembanganSiswa from "./charts/PerkembanganSiswa";

const AdminDashboard = () => {
    return(
        <div>
            <h1>This is Dashbooard admin</h1>
            <Data/>
            <AdminVisiMisiTujuan/>
        </div>
    )
}

export default AdminDashboard;