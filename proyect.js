fetch("https://www.el-tiempo.net/api/json/v2/provincias")
.then(response => response.json())
.then((dates)=>{

   

let communityNames = dates.provincias.map(element => element.COMUNIDAD_CIUDAD_AUTONOMA);

let nonrepeatedNames = communityNames.filter((value, index, array) => array.indexOf(value) === index);

nonrepeatedNames.sort();

let tableBody = document.getElementById("community")




nonrepeatedNames.forEach((name) => {
    let communities = document.createElement("div");
  
    communities.innerHTML = name;

    tableBody.appendChild(communities);
   
    communities.addEventListener("click", function() {
      funcionPrueba(name);
    });


});


function funcionPrueba(communityName){

   document.getElementById("community").style.display = "none";

   let showProvince=document.getElementById("province")

   
   let  communityProvinces=dates.provincias.filter((valor)=>{

     let provinceElement= document.createElement("div")

     let communityAutonoma=valor.COMUNIDAD_CIUDAD_AUTONOMA
     let provinceForal= valor.CAPITAL_PROVINCIA

    

     if(communityAutonoma===communityName){

      provinceElement.innerHTML=provinceForal
      showProvince.appendChild(provinceElement)

      provinceElement.addEventListener("click", function(){

         allProvidence(provinceForal);
      })


      return provinceForal
      
     }


   })

   return communityProvinces


   
}

function allProvidence(selectProvince){

   let showTempe=document.getElementById("temperatura")

   showTempe.innerHTML= "Las temperaturas de las principales ciudades de la provincia de " + selectProvince 

   console.log("se hizo click en la provincia: ", selectProvince)
   
  

console.log(showTempe)

    let codigos=dates.provincias.filter((valor)=>{

      let codeProvince=valor.CODPROV

      let clickProvince= valor.CAPITAL_PROVINCIA
      
      if(clickProvince===selectProvince){

         let temperatureElement=document.createElement("div")

         showTempe.appendChild(temperatureElement)

         showTempe.addEventListener("click",temperatures(codeProvince))

      }


  })

  
}


function temperatures(num){

   fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${num}`)
   .then(response => response.json())
   .then((dates)=>{
      
   
      document.getElementById("province").style.display = "none";

      let showMainCities= document.getElementById("ciudadesPrincipales")

      

      dates.ciudades.forEach((valor)=>{
         

         let mainCities=document.createElement("div")

         let nameCity=valor.name
         let temperatureMin=valor.temperatures.min
         let temperatureMax=valor.temperatures.max
         let stateHeaven= valor.stateSky.description

          mainCities.innerHTML=`<br> ${nameCity}: <br> Temperatura minima: ${temperatureMin}º <br> Temperatura máxima: ${temperatureMax}º <br> Estado del cielo: ${stateHeaven}`

          showMainCities.appendChild(mainCities)

          console.log(decode_utf8(nameCity))

      })
   
   })

}

   })


























