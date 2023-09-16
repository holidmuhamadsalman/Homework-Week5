class Pendaftar {
      constructor() {
            this.Listpendaftar = [];
      }

      tambahPendaftar(nama, umur, uangsangu) {
            this.Listpendaftar.push({ nama, umur, uangsangu });
      }

      hitungRataRata() {
            let totalUmur = 0;
            let totalUangsangu = 0;

            this.Listpendaftar.forEach((pendaftar) => {
                  totalUmur += pendaftar.umur;
                  totalUangsangu += pendaftar.uangsangu;
            });

            const rataRataUmur = totalUmur / this.Listpendaftar.length;
            const rataRataUangsangu = totalUangsangu / this.Listpendaftar.length;

            return { rataRataUmur, rataRataUangsangu };
      }
}

const pendaftar = new Pendaftar();
async function tambahPendaftarAsync(nama, umur, uangsangu) {
      return new Promise((resolve, reject) => {
            setTimeout(() => {
                  pendaftar.tambahPendaftar(nama, umur, uangsangu);
                  resolve();
            }, 2000);
      });
}
document.getElementById("registrationForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      const nama = document.getElementById("nama").value;
      const umur = parseInt(document.getElementById("umur").value);
      const uangsangu = parseInt(document.getElementById("uangsangu").value);

      if (nama.length < 10 || umur < 25 || uangsangu < 100000 || uangsangu > 1000000) {
            alert("Data tidak valid. Mohon periksa kembali.");
            return;
      } else {
            await tambahPendaftarAsync(nama, umur, uangsangu);
            alert("Data berhasil ditambahkan");
      }

      this.reset();
});

function openTab(tabName) {
      const tabs = document.getElementsByClassName("tab-content");
      for (let i = 0; i < tabs.length; i++) {
            tabs[i].style.display = "none";
      }
      document.getElementById(tabName).style.display = "block";

      if (tabName === "ListPendaftar") {
            const pendaftarTable = document.getElementsByClassName("pendaftarTable");
            const pendaftarBody = document.getElementById("pendaftarBody");
            const resume = document.getElementById("resume");

            // Tampilkan data pendaftar dalam tabel
            pendaftarBody.innerHTML = "";
            pendaftar.Listpendaftar.forEach((pendaftar) => {
                  const row = pendaftarBody.insertRow();
                  row.insertCell(0).textContent = pendaftar.nama;
                  row.insertCell(1).textContent = pendaftar.umur;
                  row.insertCell(2).textContent = pendaftar.uangsangu;
            });

            // Hitung rata-rata umur dan uangsangu sangu
            const { rataRataUmur, rataRataUang } = pendaftar.hitungRataRata();
            resume.textContent = `Rata-rata pendaftar memiliki uangsangu sangu sebesar ${rataRataUang.toFixed(2)} dengan rata-rata umur ${rataRataUmur.toFixed(2)} tahun.`;
      }
}
openTab("Registrasi");
