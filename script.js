function kararOlustur() {

    // Kullanıcının yazdığı seçenekleri al
    let secenek1 = document.getElementById("secenek1").value.trim();
    let secenek2 = document.getElementById("secenek2").value.trim();

    // Seçeneklerin boş olup olmadığını kontrol et
    if (secenek1 === "" || secenek2 === "") {
        alert("Lütfen iki seçeneği de doldurun.");
        return;
    }

    // Seçenekleri bir listede topla
    let secenekler = [secenek1, secenek2];

    // Rastgele bir seçenek belirle
    let rastgeleSayi = Math.floor(Math.random() * secenekler.length);

    // Seçilen sonucu bul
    let sonuc = secenekler[rastgeleSayi];

    // Sonucu ekranda göster
    document.getElementById("sonuc").textContent =
        "Seçilen alternatif: " + sonuc;
}
