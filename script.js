$(document).ready(function(){
    $.ajaxSetup({ async: false, cache: false });

    function search() {
        var provinsi = $.trim($('#provinsi').val()).toUpperCase();
        var kabkot = $.trim($('#kabkot').val()).toUpperCase();
        var kecamatan = $.trim($('#kecamatan').val()).toUpperCase();
        var kelurahan = $.trim($('#kelurahan').val()).toUpperCase();
        var kodepos = $.trim($('#kodepos').val());
        var searchCount = 0;

        $('#search_result').remove();
        $('#container').append('<div id="search_result"></div>');
        var searchDiv = $('#search_result');
        $(searchDiv).append('<h2>HASIL PENCARIAN</h2>');
        $(searchDiv).append('<p>Hasil pencarian kode pos dengan menggunakan kata kunci diatas <span id="search_desc"></span></p>');
        $(searchDiv).append('<div id="search_card_container"></div>');
        var searchCardContainer = $('#search_card_container');

        $.getJSON("kodepos.json", function(result) {
            $.each(result, function(key, val) {
                if(val.province.search(provinsi) !== -1 &&
                val.city.search(kabkot) !== -1 &&
                val.sub_district.search(kecamatan) !== -1 &&
                val.urban.search(kelurahan) !== -1 &&
                val.postal_code.search(kodepos) !== -1) {
                    var searchCardDiv = $('<div class="search_card"></div');
                    $(searchCardContainer).append(searchCardDiv);
                    $(searchCardDiv).append('<p><b>Provinsi:</b> ' + val.province + '</p>');
                    $(searchCardDiv).append('<p><b>Kabupaten/Kota:</b> ' + val.city + '</p>');
                    $(searchCardDiv).append('<p><b>Kecamatan:</b> ' + val.sub_district + '</p>');
                    $(searchCardDiv).append('<p><b>Kelurahan:</b> ' + val.urban + '</p>');
                    $(searchCardDiv).append('<p><b>Kode Pos:</b> ' + val.postal_code + '</p>');
                    searchCount++;
                }
            });
        });
        
        if(searchCount != 0) {
            $('#search_desc').html('telah ditemukan sebanyak ' + searchCount + ' buah.');
        }
        else {
            $('#search_desc').html('tidak ditemukan.');
        }
    }

    $('#Search_button').click(function() {
        search();
    });
});
