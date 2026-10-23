// DECISIONLAB 2.0
// Dinamik seçenek ekleme ve rastgele karar oluşturma

// Yeni seçenek ekleme fonksiyonu
function secenekEkle() {

    // Seçeneklerin bulunduğu alanı bul
    const alan = document.getElementById("secenekler");

    // Mevcut seçeneklerin sayısını öğren
    const sayi = alan.querySelectorAll(".secenek").length;

    // Yeni bir satır oluştur
    const yeniSatir = document.createElement("div");

    yeniSatir.className = "secenek-satiri";

    // Yeni giriş kutusunu oluştur
    const yeniInput = document.createElement("input");

    yeniInput.type = "text";
    yeniInput.className = "secenek";
    yeniInput.placeholder = (sayi + 1) + ". seçenek";

    // Giriş kutusunu satıra ekle
    yeniSatir.appendChild(yeniInput);

    // Satırı seçenekler alanına ekle
    alan.appendChild(yeniSatir);

    // Yeni kutuya odaklan
    yeniInput.focus();
}


// Rastgele karar oluşturma fonksiyonu
function kararOlustur() {

    // Kullanıcının yazdığı karar konusunu al
    const konu = document.getElementById("konu").value.trim();

    // Bütün seçenek kutularını bul
    const kutular = document.querySelectorAll(".secenek");

    // Dolu seçenekleri saklayacağımız liste
    const secenekler = [];

    // Kutuları tek tek kontrol et
    kutular.forEach(function(kutu) {

        const deger = kutu.value.trim();

        if (deger !== "") {
            secenekler.push(deger);
        }

    });

    // En az iki seçenek girilmiş olmalı
    if (secenekler.length < 2) {
        alert("Lütfen en az iki seçenek girin.");
        return;
    }

    // Rastgele seçim yap
    const rastgeleSayi = Math.floor(
        Math.random() * secenekler.length
    );

    const secilen = secenekler[rastgeleSayi];

    // Sonuç alanını bul
    const sonucAlani = document.getElementById("sonuc");

    // Sonucu ekrana yaz
    if (konu !== "") {
        sonucAlani.textContent =
            konu + " | Seçilen alternatif: " + secilen;
    } else {
        sonucAlani.textContent =
            "Seçilen alternatif: " + secilen;
    }

}
