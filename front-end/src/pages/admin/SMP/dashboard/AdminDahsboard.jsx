import Data from "../trafic/traficData";
// import VisiMisiTujuanNav from "./admin_visi_misi_tujuan/VisiMisiTujuanNav";
import PerkembanganSiswa from "../charts/PerkembanganSiswa";

const AdminDashboard = () => {
    return(
        <div>
            <h1>This is Dashbooard admin</h1>
            <Data/>
            {/* <VisiMisiTujuanNav/> */}
        </div>
    )
}

export default AdminDashboard;