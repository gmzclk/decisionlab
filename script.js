/* ==========================================
   DECISIONLAB 2.0
   KARAR LABORATUVARI

   Özellikler:
   - Dinamik seçenek ekleme
   - Seçenek silme
   - Rastgele karar oluşturma
   - Karar konusunu gösterme
   - Eski sonuçları otomatik temizleme
========================================== */


/* ==========================================
   1. SONUCU TEMİZLE
========================================== */

function sonucuTemizle() {

    const sonucAlani = document.getElementById("sonuc");

    sonucAlani.textContent = "";

}


/* ==========================================
   2. YENİ SEÇENEK EKLE
========================================== */

function secenekEkle() {

    // Seçeneklerin bulunduğu alanı bul
    const alan = document.getElementById("secenekler");

    // Yeni satır oluştur
    const yeniSatir = document.createElement("div");

    yeniSatir.className = "secenek-satiri";

    // Yeni giriş kutusu oluştur
    const yeniInput = document.createElement("input");

    yeniInput.type = "text";

    yeniInput.className = "secenek";

    yeniInput.placeholder = "Yeni seçenek";

    // Giriş kutusunu satıra ekle
    yeniSatir.appendChild(yeniInput);

    // Satırı sayfaya ekle
    alan.appendChild(yeniSatir);

    // Silme düğmesi ekle
    silmeDugmesiEkle(yeniSatir);

    // Eski sonucu temizle
    sonucuTemizle();

    // Yeni kutuya odaklan
    yeniInput.focus();

}


/* ==========================================
   3. SEÇENEK SİLME DÜĞMESİ
========================================== */

function silmeDugmesiEkle(satir) {

    // Yeni düğme oluştur
    const silButonu = document.createElement("button");

    silButonu.type = "button";

    silButonu.textContent = "×";

    silButonu.title = "Seçeneği sil";

    silButonu.setAttribute(
        "aria-label",
        "Seçeneği sil"
    );

    // Düğmenin görünümü
    silButonu.style.marginLeft = "10px";

    silButonu.style.minWidth = "45px";

    silButonu.style.padding = "12px";

    silButonu.style.background = "#e85d75";

    // Silme işlemi
    silButonu.onclick = function() {

        // Mevcut seçenek sayısını öğren
        const toplam = document.querySelectorAll(
            ".secenek"
        ).length;

        // En az iki kutu kalmalı
        if (toplam <= 2) {

            alert(
                "En az iki seçenek kutusu bulunmalıdır."
            );

            return;
        }

        // Seçeneği sil
        satir.remove();

        // Eski sonucu temizle
        sonucuTemizle();

    };

    // Düğmeyi satıra ekle
    satir.appendChild(silButonu);

}


/* ==========================================
   4. İLK SEÇENEKLERE SİLME DÜĞMESİ EKLE
========================================== */

document.querySelectorAll(
    ".secenek-satiri"
).forEach(function(satir) {

    silmeDugmesiEkle(satir);

});


/* ==========================================
   5. RASTGELE KARAR OLUŞTUR
========================================== */

function kararOlustur() {

    // Karar konusunu al
    const konu = document.getElementById(
        "konu"
    ).value.trim();

    // Bütün seçenek kutularını bul
    const kutular = document.querySelectorAll(
        ".secenek"
    );

    // Seçenekleri saklayacağımız liste
    const secenekler = [];

    // Kutuları sırayla kontrol et
    kutular.forEach(function(kutu) {

        const deger = kutu.value.trim();

        // Boş olmayan seçenekleri listeye ekle
        if (deger !== "") {

            secenekler.push(deger);

        }

    });

    // En az iki dolu seçenek olmalı
    if (secenekler.length < 2) {

        alert(
            "Lütfen en az iki seçenek girin."
        );

        sonucuTemizle();

        return;
    }

    // Rastgele sayı üret
    const rastgeleSayi = Math.floor(
        Math.random() * secenekler.length
    );

    // Rastgele seçeneği belirle
    const secilen = secenekler[rastgeleSayi];

    // Sonuç alanını bul
    const sonucAlani = document.getElementById(
        "sonuc"
    );

    // Karar konusu varsa birlikte göster
    if (konu !== "") {

        sonucAlani.textContent =
            konu + " | Seçilen alternatif: " + secilen;

    } else {

        sonucAlani.textContent =
            "Seçilen alternatif: " + secilen;

    }

}


/* ==========================================
   6. DEĞİŞİKLİKLERİ TAKİP ET
========================================== */

document.addEventListener(
    "input",
    function(event) {

        // Kullanıcı seçenekleri değiştirirse
        if (
            event.target.classList.contains("secenek") ||
            event.target.id === "konu"
        ) {

            // Önceki sonucu temizle
            sonucuTemizle();

        }

    }
);
