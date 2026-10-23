/* ==========================================
   DECISIONLAB 2.1
   KARAR LABORATUVARI

   Özellikler:
   - Seçenek ekleme
   - Seçenek silme
   - Rastgele karar oluşturma
   - Eski sonuçları temizleme
   - Karar geçmişini kaydetme
   - Karar geçmişini silme
========================================== */


// 1. SONUCU TEMİZLE

function sonucuTemizle() {
    document.getElementById("sonuc").textContent = "";
}


// 2. YENİ SEÇENEK EKLE

function secenekEkle() {

    const alan = document.getElementById("secenekler");

    const yeniSatir = document.createElement("div");
    yeniSatir.className = "secenek-satiri";

    const yeniInput = document.createElement("input");
    yeniInput.type = "text";
    yeniInput.className = "secenek";
    yeniInput.placeholder = "Yeni seçenek";

    yeniSatir.appendChild(yeniInput);
    alan.appendChild(yeniSatir);

    silmeDugmesiEkle(yeniSatir);

    sonucuTemizle();
    yeniInput.focus();
}


// 3. SEÇENEK SİLME DÜĞMESİ

function silmeDugmesiEkle(satir) {

    const silButonu = document.createElement("button");

    silButonu.type = "button";
    silButonu.textContent = "×";
    silButonu.title = "Seçeneği sil";
    silButonu.setAttribute("aria-label", "Seçeneği sil");

    silButonu.style.marginLeft = "10px";
    silButonu.style.minWidth = "45px";
    silButonu.style.padding = "12px";
    silButonu.style.background = "#e85d75";

    silButonu.onclick = function() {

        const toplam = document.querySelectorAll(".secenek").length;

        if (toplam <= 2) {
            alert("En az iki seçenek kutusu bulunmalıdır.");
            return;
        }

        satir.remove();
        sonucuTemizle();
    };

    satir.appendChild(silButonu);
}


// 4. İLK SEÇENEKLERE SİLME DÜĞMESİ EKLE

document.querySelectorAll(".secenek-satiri").forEach(function(satir) {
    silmeDugmesiEkle(satir);
});


// 5. RASTGELE KARAR OLUŞTUR

function kararOlustur() {

    const konu = document.getElementById("konu").value.trim();

    const kutular = document.querySelectorAll(".secenek");

    const secenekler = [];

    kutular.forEach(function(kutu) {

        const deger = kutu.value.trim();

        if (deger !== "") {
            secenekler.push(deger);
        }
    });

    if (secenekler.length < 2) {
        alert("Lütfen en az iki seçenek girin.");
        sonucuTemizle();
        return;
    }

    const rastgeleSayi = Math.floor(
        Math.random() * secenekler.length
    );

    const secilen = secenekler[rastgeleSayi];

    const sonucAlani = document.getElementById("sonuc");

    if (konu !== "") {
        sonucAlani.textContent =
            konu + " | Seçilen alternatif: " + secilen;
    } else {
        sonucAlani.textContent =
            "Seçilen alternatif: " + secilen;
    }

    // Kararı geçmişe kaydet
    karariKaydet(konu, secilen);
}


// 6. KARARI TARAYICIYA KAYDET

function karariKaydet(konu, secilen) {

    const gecmis = JSON.parse(
        localStorage.getItem("decisionlab_gecmis") || "[]"
    );

    const yeniKarar = {
        konu: konu || "Başlıksız karar",
        sonuc: secilen,
        tarih: new Date().toLocaleString("tr-TR")
    };

    gecmis.unshift(yeniKarar);

    localStorage.setItem(
        "decisionlab_gecmis",
        JSON.stringify(gecmis)
    );

    gecmisiGoster();
}


// 7. KARAR GEÇMİŞİNİ GÖSTER

function gecmisiGoster() {

    const gecmis = JSON.parse(
        localStorage.getItem("decisionlab_gecmis") || "[]"
    );

    const alan = document.getElementById("kararGecmisi");

    if (!alan) {
        return;
    }

    alan.innerHTML = "";

    if (gecmis.length === 0) {
        alan.textContent = "Henüz kaydedilmiş karar yok.";
        return;
    }

    gecmis.forEach(function(karar) {

        const kart = document.createElement("div");
        kart.className = "gecmis-kart";

        const baslik = document.createElement("h4");
        baslik.textContent = karar.konu;

        const sonuc = document.createElement("p");
        sonuc.textContent = "Seçilen: " + karar.sonuc;

        const tarih = document.createElement("small");
        tarih.textContent = karar.tarih;

        kart.appendChild(baslik);
        kart.appendChild(sonuc);
        kart.appendChild(tarih);

        alan.appendChild(kart);
    });
}


// 8. KARAR GEÇMİŞİNİ SİL

function gecmisiSil() {

    const onay = confirm(
        "Kaydedilmiş bütün kararları silmek istiyor musunuz?"
    );

    if (!onay) {
        return;
    }

    localStorage.removeItem("decisionlab_gecmis");

    gecmisiGoster();
}


// 9. KULLANICI GİRİŞLERİNİ TAKİP ET

document.addEventListener("input", function(event) {

    if (
        event.target.classList.contains("secenek") ||
        event.target.id === "konu"
    ) {
        sonucuTemizle();
    }
});


// 10. SAYFA AÇILDIĞINDA GEÇMİŞİ YÜKLE

gecmisiGoster();
