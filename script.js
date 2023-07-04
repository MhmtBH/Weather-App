let url="";

function urlChange(){
    mainlatitude = parseInt(document.getElementById("Latidude").value);
    mainlongitude = parseInt(document.getElementById("Longitude").value);

    url = "https://api.open-meteo.com/v1/forecast?latitude="+mainlatitude+"&longitude="+mainlongitude+"&current_weather=true&timezone=GMT&forecast_days=1";



    fetch(url)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            temperature = data.current_weather.temperature;   
            console.log(temperature);
            document.getElementById("temperature").innerHTML = temperature + " °C";

            weatherCode = data.current_weather.weathercode;
            console.log(weathercode)
            document.getElementById("weathercode").innerHTML = weatherCode;

            windSpeed = data.current_weather.windspeed;
            console.log(windSpeed);
            document.getElementById("windspeed").innerHTML = windSpeed + " km/h";


            // weatherCode to Img

            function changeImage(){
                if(weatherCode == 0) {
                    document.getElementById("weatherImg").src="Assets/images/0.png";

                    document.getElementById("weathercode").innerHTML = "Clear Sky";
                }
                else if (weatherCode == 1 || weatherCode == 2){
                    document.getElementById("weatherImg").src="Assets/images/1-2.png";

                    document.getElementById("weathercode").innerHTML = "Partly Cloudy";
                }
                else if (weatherCode == 3){
                    document.getElementById("weatherImg").src="Assets/images/3.png";

                    document.getElementById("weathercode").innerHTML = "Overcast";
                }
                else if (weatherCode == 45 || weatherCode == 48){
                    document.getElementById("weatherImg").src="Assets/images/45-48.png";

                    document.getElementById("weathercode").innerHTML = "Fog";
                }
                else if (weatherCode == 51 || weatherCode == 61 || weatherCode == 80 || weatherCode == 81 || weatherCode == 82){
                    document.getElementById("weatherImg").src="Assets/images/51-61-80-81-82.png";

                    document.getElementById("weathercode").innerHTML = "Rain";
                }
                else if (weatherCode == 56 || weatherCode == 66){
                    document.getElementById("weatherImg").src="Assets/images/56-66.png";

                    document.getElementById("weathercode").innerHTML = "Freezing Rain";
                }
                else if (weatherCode == 71 || weatherCode == 73 || weatherCode == 75 || weatherCode == 77 || weatherCode == 85 || weatherCode == 86){
                    document.getElementById("weatherImg").src="Assets/images/71-73-75-77-85-86.png";

                    document.getElementById("weathercode").innerHTML = "Snow";
                }
                else if (weatherCode == 95 || weatherCode == 96 || weatherCode == 99){
                    document.getElementById("weatherImg").src="Assets/images/95-96-99.png";

                    document.getElementById("weathercode").innerHTML = "Thunderstorm";
                }
                
            }
            changeImage();
        })
}

     










    
    
