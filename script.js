$('#champs_ville').css("display", "none")
$('#champs_nb_jour').css("display", "none")
$(document).ready(function(){
    
    $("#btn").click(function(){
        $( "td" ).remove()
        $('#champs_ville').css("display", "none")
        $('#champs_nb_jour').css("display", "none")
        var city = $("#inpt").val();
        var adress1 = 'https://api.opencagedata.com/geocode/v1/json?key=8faebc1635f7476d9b708d30630edaa0&q='+city+'&pretty=1'
        
        if (city === "") {
            $('#champs_ville').css("display", "block")
            $('#champs_ville').css("color", "red")
        }
        else {
        $.get(adress1 , function(data) {
            donnée = data.results
            latitude = donnée[0].geometry["lat"]
            longitude = donnée[0].geometry["lng"]
            var adress2 ='https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&appid=8aefc7606552c9a111b0a5bcb0a74e8b'
            
            $.get(adress2 , function(data2) {
                var timestamp = data2.current["dt"]
                var date = new Date(timestamp * 1000);
                var n = date.getDay();
                    
                var selectJour = $('.form-select option:selected').val();
                if (selectJour === 'Select weather days') {
                    $('#champs_nb_jour').css("display", "block")
                    $('#champs_nb_jour').css("color", "red")
                }
                else {
                    for (let i = 0; i < selectJour; i++) {
                        var temperature = data2.daily[i]["temp"]["day"]
                        var tempCel = temperature - 273
                        var lastResultTemp = tempCel.toFixed(2)

                        var day = data2.daily[i]["dt"]
                        var tempsMeteo = data2.daily[i]["weather"][0]["main"]
                        var clouds = data2.daily[i]["clouds"]
                        var resultDay = new Date(day * 1000);
                        var y = resultDay.getDay();
                        
                        var weekday = new Array(7);
                        weekday[0] = "Dimanche";
                        weekday[1] = "Lundi";
                        weekday[2] = "Mardi";
                        weekday[3] = "Mercredi";
                        weekday[4] = "Jeudi";
                        weekday[5] = "Vendredi";
                        weekday[6] = "Samedi";
                
                        $("#journee").append("<td>"+weekday[y]+"</td>");
                        $("#degres").append("<td>"+lastResultTemp+"°celcius"+"</td>");
                        if (tempsMeteo === "Clear") { 
                            $("#logo").append("<td><img src='images/sun.svg'/></td>");
                        }
                        else if (tempsMeteo === "Snow") { 
                            $("#logo").append("<td><img src='images/snow.svg'/></td>");
                        }
                        else if (clouds > 50) {
                            $("#logo").append("<td><img src='images/clouds.svg'/></td>");
                        }
                        else if (clouds < 50) {
                            $("#logo").append("<td><img src='images/cloudy.svg'/></td>");
                        }
                        else {
                            $("#logo").append("<td><img src='images/rain.svg'/></td>"); 
                       }
                    }
                }
            })
        });
        }
    });
})