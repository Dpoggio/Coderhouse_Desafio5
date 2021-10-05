# API RESTful

Desafio 4 del curso Backend de Coderhouse

## Instalar dependencias

npm install

## Iniciar el servidor

node ./server.js

## Obtener un listado de productos

### Request

`GET /api/productos`

    curl -i http://localhost:8080/api/productos

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 278

    [{"title":"Escuadra","price":123.45,"thumbnail":"https://icon.foo.bar.escuadra.png","id":1},{"title":"Planeta","price":345.67,"thumbnail":"https://icon.foo.bar.planeta.png","id":3},{"title":"Computadora","price":789.56,"thumbnail":"https://icon.foo.bar.computadora.png","id":4}]

## Obtener un producto segun su ID

### Request

`GET /api/productos/{id}`

    curl -i http://localhost:8080/api/productos/1

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 90

    {"title":"Escuadra","price":123.45,"thumbnail":"https://icon.foo.bar.escuadra.png","id":1}


## Agregar un producto al contenedor

### Request

`POST /api/productos`

    curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"title":"Escuadra","price":123.45,"thumbnail":"https://icon.foo.bar.escuadra.png"}' \
    http://localhost:8080/api/productos

### Response

    HTTP/1.1 201 CREATED
    Content-Type: application/json; charset=utf-8
    Content-Length: 90

    {"title":"Escuadra","price":123.45,"thumbnail":"https://icon.foo.bar.escuadra.png","id":2}

## Reempplazar un producto segun su ID

### Request

`PUT /api/productos/{id}`

    curl --header "Content-Type: application/json" \
    --request PUT \
    --data '{"title":"Escuadra","price":123.45,"thumbnail":"https://icon.foo.bar.escuadra.png"}' \
    http://localhost:8080/api/productos/1

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 90

    {"title":"Escuadra","price":123.45,"thumbnail":"https://icon.foo.bar.escuadra.png","id":1}

## Eliminar un producto segun su ID

### Request

`DELETE /api/productos/{id}`

    curl --header "Content-Type: application/json" \
    --request DELETE \
    http://localhost:8080/api/productos/1

### Response

    HTTP/1.1 200 OK
    Content-Type: application/json; charset=utf-8
    Content-Length: 2

    {}
