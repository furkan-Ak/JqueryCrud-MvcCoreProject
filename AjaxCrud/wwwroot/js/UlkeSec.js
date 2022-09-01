$(document).ready(function () {
    GetUlke();
});
var ulkeList = {};
function GetUlke() {
    $("#GetSehir").empty();
    $.ajax({
        type: 'GET',
        url: "/Form/GetUlkeList",
        data: null,
        success: function (data) {
            console.log(data);
            ulkeList = data;
            var str = '<option value="0">Ulke Seç</option>'

            for (var i = 0; i < ulkeList.length; i++) {

                str += `<option value="${ulkeList[i].id}">${ulkeList[i].tanım}</option>`

            }
            $("#GetUlke").append(str);

        },
        error: function (e) {
            alert(e);
        }
    });
    return false;
};