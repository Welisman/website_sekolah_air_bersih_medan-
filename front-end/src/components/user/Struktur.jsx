import React, { useEffect, useState } from "react";
import * as JSC from "jscharting";

const Struktur = () => {
    const struktur = [
        { id: "1", nama: "Ketua Yayasan GMAHK DSKU", parent_id: null },
        { id: "2", nama: "Direktur Pendidikan GMAHK DSKU", parent_id: "1" },
        { id: "3", nama: "Kepala SMP", parent_id: "2" },
        { id: "4", nama: "Bendahara", parent_id: "3" },
        { id: "5", nama: "Kepala Tata Usaha", parent_id: "3" },
        { id: "6", nama: "Komite Sekolah", parent_id: "3" },
        { id: "7", nama: "Wakasek Bid. Akademik", parent_id: "3" },
        { id: "8", nama: "Wakasek Bid. Sarpras", parent_id: "3" },
        { id: "9", nama: "Wakasek Bid. Kesiswaan", parent_id: "3" },
        { id: "10", nama: "Wakasek Bid. Humas", parent_id: "3" },
        { id: "11", nama: "Guru BP / BK", parent_id: "7" },
        { id: "12", nama: "Wali Kelas VII SMP", parent_id: "7" },
        { id: "13", nama: "Wali Kelas VIII SMP", parent_id: "7" },
        { id: "14", nama: "Wali Kelas IX SMP", parent_id: "7" },
        { id: "15", nama: "Koord. Lab. Komp", parent_id: "8" },
        { id: "16", nama: "Koord. Perpustakaan", parent_id: "8" },
        { id: "17", nama: "GURU", parent_id: "7" },
        { id: "18", nama: "Operator Sekolah", parent_id: "9" },
        { id: "19", nama: "Penjaga Sekolah", parent_id: "9" },
        { id: "20", nama: "Satpam Sekolah", parent_id: "9" },
        { id: "21", nama: "Siswa / Siswi", parent_id: "17" },
    ];

    useEffect(() => {
        JSC.Chart("strukturChart", {
            type: "organization down",
            defaultSeries: { size: 1.5 }, // Perbesar skala organisasi
            defaultPoint: {
                width: 200, // Perbesar kotak node
                height: 70, // Perbesar tinggi node
                label: {
                    style: { fontSize: "14px", fontWeight: "bold" } // Perbesar teks
                }
            },
            series: [{
                points: struktur.map(item => ({
                    id: item.id.toString(),
                    name: item.nama,
                    label: `<b>${item.nama}</b>`,
                    parent: item.parent_id ? item.parent_id.toString() : null
                }))
            }]
        });
    }, []);

    return (
        <div>
            <h2 className="text-center">Struktur Organisasi Sekolah</h2>
            <div id="strukturChart" style={{ width: "100%", height: "500px" }}></div>
        </div>
    );
};

export default Struktur;
