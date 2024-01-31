fetch("https://www.el-tiempo.net/api/json/v2/provincias")
.then(response => response.json())
.then((dates)=>{

   

let communityNames = dates.provincias.map(element => element.COMUNIDAD_CIUDAD_AUTONOMA);

let nonRepeatedNames = communityNames.filter((value, index, array) => array.indexOf(value) === index);

nonRepeatedNames.sort();

let tableBody = document.querySelector(".community")




nonRepeatedNames.forEach((name) => {
    let communities = document.createElement("div");
  
    communities.innerHTML = name;

    tableBody.appendChild(communities);
   
    communities.addEventListener("click", function() {
      community(name);
    });


});


function community(communityName){

   document.querySelector(".community").style.display = "none";

   let showProvince=document.querySelector(".province")

   
   let  communityProvinces=dates.provincias.filter((value)=>{

     let provinceElement= document.createElement("div")

     let communityAutonomous=value.COMUNIDAD_CIUDAD_AUTONOMA
     let capitalProvince= value.CAPITAL_PROVINCIA

    

     if(communityAutonomous===communityName){

      provinceElement.innerHTML=capitalProvince
      showProvince.appendChild(provinceElement)

      provinceElement.addEventListener("click", function(){

         allProvidence(capitalProvince);
      })


      return capitalProvince
      
     }


   })

   return communityProvinces


   
}

function allProvidence(selectProvince){

   let showTempe=document.querySelector(".temperature")

   showTempe.innerHTML= "Las temperaturas de las principales ciudades de la provincia de " + selectProvince 

  
   
  



    let codes=dates.provincias.filter((valor)=>{

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
      
   
      document.querySelector(".province").style.display = "none";

      let showMainCities= document.querySelector(".mainCities")

      

      dates.ciudades.forEach((value)=>{
         

         let mainCities=document.createElement("div")

         let nameCity=value.name
         let temperatureMin=value.temperatures.min
         let temperatureMax=value.temperatures.max
         let stateHeaven= value.stateSky.description

          mainCities.innerHTML=`<br> ${nameCity}: <br> Temperatura minima: ${temperatureMin}º <br> Temperatura máxima: ${temperatureMax}º <br> Estado del cielo: ${stateHeaven}`

          showMainCities.appendChild(mainCities)

          

      })
   
   })

}

   })


























