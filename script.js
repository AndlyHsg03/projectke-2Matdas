// Fungsi untuk menghitung kecepatan berdasarkan turunan
function calculateSpeed() {
    const math = window.math; // Memastikan Math.js sudah ter-load

    // Mengambil input dari pengguna
    const funcInput = document.getElementById('function').value; // Fungsi posisi
    const timeValue = parseFloat(document.getElementById('time').value); // Nilai t yang dimasukkan pengguna

    // Validasi input (apakah fungsi posisi dan nilai t valid)
    if (!funcInput || isNaN(timeValue)) {
        document.getElementById('result').innerHTML = 
            "<span style='color: red;'>Masukkan fungsi posisi dan nilai t yang valid!</span>";
        document.getElementById('explanation').innerHTML = ""; // Bersihkan penjelasan jika input invalid
        return;
    }

    try {
        // Parsing fungsi posisi menggunakan Math.js, mengganti variabel 't' dengan 'x' agar lebih konsisten
        const expr = math.parse(funcInput.replace(/t/g, 'x')); // Mengganti 't' menjadi 'x' dalam fungsi
        const derivative = math.derivative(expr, 'x'); // Menghitung turunan fungsi posisi

        // Evaluasi turunan pada nilai t yang diberikan
        const speed = derivative.evaluate({ x: timeValue }); // Kecepatan adalah turunan posisi pada waktu t

        // Menampilkan hasil perhitungan kecepatan
        document.getElementById('result').innerHTML = `
            <strong>Hasil:</strong> Kecepatan = <strong>${speed.toFixed(2)} m/s</strong>
        `;

        // Menyusun penjelasan tentang langkah-langkah perhitungan
        document.getElementById('explanation').innerHTML = `
            <div class="explanation-box">
                <p><strong>Penjelasan:</strong></p>
                <ol>
                    <li>Fungsi posisi yang diberikan adalah: \( x(t) = ${funcInput} \).</li>
                    <li>Turunan fungsi posisi adalah: \( v(t) = ${derivative.toString().replace(/x/g, 't')} \).</li>
                    <li>Evaluasi pada \( t = ${timeValue} \) menghasilkan \( v(${timeValue}) = ${speed.toFixed(2)} \, \text{m/s} \).</li>
                </ol>
            </div>
        `;

        // Menggunakan MathJax untuk merender persamaan matematika agar lebih rapi
        MathJax.typeset();
    } catch (error) {
        // Menangani error jika fungsi posisi tidak valid
        document.getElementById('result').innerHTML = 
            "<span style='color: red;'>Fungsi posisi tidak valid. Periksa kembali input Anda!</span>";
        document.getElementById('explanation').innerHTML = ""; // Bersihkan penjelasan jika ada error
    }
}
