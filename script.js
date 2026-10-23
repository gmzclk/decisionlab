// DECISIONLAB 2.0
// Seçenek ekleme, silme ve rastgele karar oluşturma

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

    yeniInput.focus();
}


// Seçenek silme düğmesini oluştur
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
    };

    satir.appendChild(silButonu);
}


// Sayfa açıldığında ilk iki seçeneğe de silme düğmesi ekle
document.querySelectorAll(".secenek-satiri").forEach(function(satir) {
    silmeDugmesiEkle(satir);
});


// Rastgele karar oluştur
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
}
