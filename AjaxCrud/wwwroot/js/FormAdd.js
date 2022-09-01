var FormunOkulBilgileri = {};
var OkulList = [];

var count = 0;
$(function () {
    window.scrollTo(0, 0); // page update olduğunda ortada başlıyordu başta başlasın diye bu yazıldı .
});


function AlanAc() {
    count++;
    //if ( == false) {
    //    alert("En Az bir tane Okul Bilgisi Girilmeli!");
    //} else {
    $.ajax(
        {
            type: "GET",
            url: "/Form/OkulList",
            dataType: "json",
            data: null,
            success: function (result) {
                $("#TekrarliAlan").append(`
                 <div id="OlusanAlan${count}" class="mb-2">
                <input type="text" id="okul${count}" placeholder="School" />
                <select id="okulturu${count}" >
                </select>
            <button type="button" onclick="AlanSil(${count})">Sil</button>
        </div>
    `)/*ilk önce html sonra js oluşur*/
                var str = "";
                for (var i = 0; i < result.length; i++) {
                    str += `<option class="optclass" value="${result[i].id}">${result[i].okulTur}</option>`
                }
                $("#okulturu" + count).html(str);

                
            }
        });
};


function AlanSil(id) {
    $("#OlusanAlan" + id).remove();

    // $(`#TekrarliAlan option:eq(${index})`).remove();
};

function AddPageOpen() {
    window.open(`/Form/AddPage`);
}

function btnAdd() {
    //alert("Form Eklendi!");
    var a = $("[id^=OlusanAlan]");

    $("[id^=OlusanAlan]").each(function (key, value) {
        FormunOkulBilgileri["OkulAd"] = $(value).find("[id^='okul']").val(); // ^  işareti o isimle başlayanları alır eğer ismi verilen adla aynı olan varsa hata verir
        FormunOkulBilgileri["OkulTurId"] = $(value).find("[id^='okulturu']").val();
        OkulList.push(FormunOkulBilgileri); // yukarda tanımladığımız diziye verileri pushladık
        FormunOkulBilgileri = {}; // dizinin içini boşaltmadığında her seferinde en son eklediğin tekrarlı alanı yazzdırır.
    });


    var KayitModel = {};
    var FormVM = {};
    KayitModel["FullName"] = $("#FullName").val();
    KayitModel["Adress"] = $("#Adress").val();
    KayitModel["Mail"] = $("#Mail").val();
    KayitModel["Telephone"] = $("#Telephone").val();
    KayitModel["MedyaId"] = $("#imdidbas").attr("medyaid");
    KayitModel["Ulke"] = $("#GetUlke").val();
    KayitModel["Sehir"] = $("#GetSehir").val();
    FormVM["Form"] = KayitModel; // View Modeldeki  DbForm Form objesine eşitleniyor
    FormVM["OkulList"] = OkulList; //  View Modeldeki OkulListesine Ekleniyor
    //var FormVM = {
    //    FullName: 
    //    Adress:
    //    Mail:
    //    Telephone: 
    //    MedyaId: 
    //    Ulke: 
    //    Sehir: 
    //    OkulList: OkulList, // pushlanan verileri  view modelde tanımlanan Okul liste kaydettik aynı isimdeler
    //}
    console.log(FormVM);
    //var model = FormVM;
    /*AlanAc();*/

    if (($("#FullName").val() == "") || ($("#Mail").val() == "") || (a.length == 0)) {
        if ($("#FullName").val() == "") {
            alert("İsim Boş Bırakılamaz!")
        }
        else if ($("#Mail").val() == "") {
            alert("Mail Boş Bırakılamaz!")
        } else if (a.length == 0) {
            alert("En Az 1 Öğrenim Geçmişi Girmelisiniz!")
        }

    } else {
        $.ajax(
            {
                type: "POST", //HTTP POST Method  
                url: "/Form/AddForms",
                dataType: "json",
                data: { model: FormVM },
                success: function (result) {

                    if (result.length !=0) {

                        alert("Kayıt başarıyla kaydedildi.");
                    }
                    /*   window.open(`/Form/AddForms`);*/
                    //$("#FullName").val("");
                    //$("#Adress").val("");
                    //$("#Mail").val("");
                    //$("#Telephone").val("");
                    //window.location.href(`/Form/AddForms`);
                    // document.getElementById("Form").reset();
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    alert(xhr.status);
                    alert(thrownError);
                }
            })
    };
}