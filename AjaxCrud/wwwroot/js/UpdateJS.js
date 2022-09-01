var currentUrl = window.location.href; // bütün urlyi alma
var splitURL = currentUrl.split("/"); // url yi parçalara ayırıp dizi haline getiriyor 
var idURL = splitURL[splitURL.length - 1]; // dizi -1 boyutunda veri taşıdığı için 1 eksiğini yani son elemanını idye eşitliyorum page urlsinde sonda id
var kisimodel = {};
var count = 0;
var OkulTurleri = [];

var FormunOkulBilgileriUp = {};
var OkulListUp = [];


$(function () {// page e gitmeden veriler veri tabanından getirmek için oluşturulmuş bir fonksiyon view page de onchange de bu fonskiyona gönderiliyor.
    GetUlkeUpdate();
    GetSehirByUlkeUpdate();
    /*KayıtOkulu();*/
    DropdownOkulListGetir();
    updateGetData(idURL);
});

//function KayıtOkulu() {
//    $.ajax({
//        type: "GET",
//        url: "/Form/KayıtOkulGetir",
//        dataType: "json",
//        data: null,
//        success: function (result) {
//            console.log(result);
//            OkulTurleri = result;
//        }
//    });
//}
function DropdownOkulListGetir() {
    $.ajax(
        {
            type: "GET",
            url: "/Form/OkulList",
            dataType: "json",
            async: false,
            data: null,
            success: function (result) {
                OkulTurleri = result;
            }

        });
}

function AlanAcUp() {

    $("#UpdateTekrarliAlan").append(`
                 <div id="OlusanAlan${count}">
                <input type="text" id="okul${count}" placeholder="School" />
                <select id="okulturu${count}" >
                </select>
            <button type="button" onclick="AlanSilUp(${count})">Sil</button>
        </div>
        <br/>
    `)/*ilk önce html sonra js oluşur*/
    var str = "";
    for (var i = 0; i < OkulTurleri.length; i++) {
        str += `<option class="optclass" value="${OkulTurleri[i].id}">${OkulTurleri[i].okulTur}</option>`
    }
    $("#okulturu" + count).html(str);
    count++;
}
function AlanSilUp(id) {
    $("#OlusanAlan" + id).remove();
}



// update upload file
function updateUploadFile() {
    var input = document.getElementById("updateUpFile");
    var files = input.files;

    // Create  a FormData object
    var formData = new FormData();
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]); //tüm dosyalar arasında dolaş ve ekle
    }
    $.ajax({
        url: "/Form/UploadFile",
        type: "POST",
        async: false,
        processData: false,
        contentType: false,
        data: formData,
        success: function (result) {
            console.log(result);
            alert("Dosya Güncellendi!");
            var mediaurl = "/" + result.imageUrl;
            $("#beupImg").attr("src", mediaurl); // verilen id img taginde src yoluna imgrly yi göm anlamında,
            $("#beupImg").attr("medyaid", result.imgId);// idyi çekmek için fotoğrafın idsini img tagınde bir attr oluşturup ona atadım ve ekleme js te bu attr ü çekip kullanıyoruz.

        },
        error: function (err) {
            alert(err.statusText);
        }
    });
}

function updateGetData(id) { // update button 
    $.ajax({
        type: "GET",
        url: "/Form/GetFormById/" + id,
        async: false,
        success: function (data) {
            console.log(data);
            kisimodel = data
            //window.location.href = `/Form/UpdatePage/${data.id}`;
            //setTimeout(5000);
            window.open(`/Form/UpdatePage/${data.form.id}`);
            var mediaurl = "/" + data.image.imageUrl; // url / eksik geliyo eklemesini yapıyoruz

            $('#FullNameUpdate').val(data.form.fullName); // js de id isimleri küçük yazılır
            $('#AdressUpdate').val(data.form.adress);
            $('#MailUpdate').val(data.form.mail);
            $("#TelephoneUpdate").val(data.form.telephone);
            $("#beupImg").attr("src", mediaurl); // verilen id img taginde src yoluna imgrly yi göm anlamında,
            $("#beupImg").attr("medyaid", data.image.imgId);

            $("#UpdateUlk").val(data.form.ulke).change();
            $("#UpdateSeh").val(data.form.sehir);

            /*  setTimeout(2000);*/


            for (var i = 0; i < data.okulList.length; i++) { // once datanin lengthi kadar yer açılıyor önce html de yer açılır sonra üstüne yazarsın
                // yer açma fonksiyonuna 
                AlanAcUp();
                $("#okul" + i).val(data.okulList[i].okulAd);
                $("#okulturu" + i).val(data.okulList[i].okulTurId).change();
                // $(".optclass").val(data.okulList[i].okulTur);
                console.log(data.okulList[i].okulAd);
            }

        }
    });
}

function btnUpdateSave() {
    //post......model post edilecek
    $("[id^=OlusanAlan]").each(function (key, value) {
        FormunOkulBilgileriUp["OkulAd"] = $(value).find("[id^='okul']").val(); // ^  işareti o isimle başlayanları alır eğer ismi verilen adla aynı olan varsa hata verir
        FormunOkulBilgileriUp["OkulTurId"] = $(value).find("[id^='okulturu']").val();
        OkulListUp.push(FormunOkulBilgileriUp); // yukarda tanımladığımız diziye verileri pushladık
        FormunOkulBilgileriUp = {}; // dizinin içini boşaltmadığında her seferinde en son eklediğin tekrarlı alanı yazzdırır.
    });

    var KayitModelUp = {};
    var UpFormVM = {};

    KayitModelUp.Id = idURL;
    KayitModelUp["FullName"] = $("#FullNameUpdate").val();
    KayitModelUp["Adress"] = $("#AdressUpdate").val();
    KayitModelUp["Mail"] = $("#MailUpdate").val();
    KayitModelUp["Telephone"] = $("#TelephoneUpdate").val();
    KayitModelUp["MedyaId"] = $("#beupImg").attr("medyaid");
    KayitModelUp["Ulke"] = $("#UpdateUlk").val();
    KayitModelUp["Sehir"] = $("#UpdateSeh").val();
    UpFormVM["Form"] = KayitModelUp; // View Modeldeki  DbForm Form objesine eşitleniyor
    UpFormVM["OkulList"] = OkulListUp;

    $.ajax({
        type: "POST",
        url: "/Form/UpdateForm",
        data: { model: UpFormVM },
        async: false,
        success: function (result) {
            console.log(result);
            alert("Form Güncellendi!")
            idURL = null;
            //  window.open(`/Form/AddForms`);

        }
    });
};
// ülke listesini vermeden ekrana id ve adını yazdurnaya çalıştım veri tabanında ülkeleri getirip sonra update tarafınnda güncellemen gerekiyor.
function GetUlkeUpdate() {
    $.ajax({
        type: 'GET',
        url: "/Form/GetUlkeList",
        data: null,
        async: false,
        success: function (data) {
            console.log(data);
            var ulkeList = data;
            var str = '<option value="0">Ulke Seç</option>'

            for (var i = 0; i < ulkeList.length; i++) {

                str += `<option value="${ulkeList[i].id}">${ulkeList[i].tanım}</option>`

            }
            $("#UpdateUlk").append(str);
        },
        error: function (e) {
            alert(e);
        }
    });
    return false;
};

function GetSehirByUlkeUpdate() {

    $.ajax({
        type: 'GET',
        url: "/Form/GetSehirList/" + $("#UpdateUlk").val(),
        data: null,
        async: false,
        success: function (sehirdatam) {
            console.log(sehirdatam);

            var sehirList = sehirdatam;
            var str = '<option value="0">Sehir Seç</option>'

            for (var i = 0; i < sehirList.length; i++) {
                str += `<option value="${sehirList[i].id}">${sehirList[i].tanım}</option>`

                $("#UpdateSeh").html(str); // içeride yazıldı çünkü her seferinde ülke seçildiğinde şehirler yeniden gelmeli

            }
            //$("#UpdateSeh").val(kisimodel.Form.sehir).change();
        },
        error: function (e) {
            alert(e);
        }
    });
    return false;
}
