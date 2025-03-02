# Proyecto final de backend

La idea es hacer una web tipo itineraria de viajes. Una especie de todo list con una API donde te recomiendan sitios segun la ciudad.

La API encontrada es OpenTripMap API : API  KEY = 5ae2e3f221c38a28845f05b6814cb1a4aa355463bfa4cc59634112d0

### Funciona asi la API: 
- Buscar una ciudad por nombre: Usa la ruta /geoname para obtener coordenadas de la ciudad.
Ejemplo: https://api.opentripmap.com/0.1/en/places/geoname?name=Paris&apikey=TU_API_KEY

- Buscar lugares cerca de la ciudad: Usa la ruta /radius para obtener lugares turísticos cerca de las coordenadas de la ciudad.
Ejemplo: https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=2.3522&lat=48.8566&apikey=TU_API_KEY
