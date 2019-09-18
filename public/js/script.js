//setTimeout(alert('coucou'),1000);
const nearStations = document.getElementById('near-stations');
const btnGeloc = document.getElementById('show-geoloc');

btnGeloc.addEventListener('click',function (event) {
    btnGeloc.disabled=true;
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(function (position) {
        fetch('http://localhost:8000/stations/near?lat='+position.coords.latitude+'&lng='+position.coords.longitude)
            .then (response => response.json())
            .then (stations => {

                nearStations.innerHTML=null;
                stations.map((station,index) => {
                    setTimeout(() => {
                        let li = document.createElement('li');
                        li.innerText = station.name;
                        nearStations.appendChild(li);
                        if (index ==stations.length-1)
                            btnGeloc.disabled=false;
                    },500 * index)

                });
            });
    });

} );
