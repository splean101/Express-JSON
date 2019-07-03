/*Создайте сервер с маршрутом, который содержит два параметра:
1.	Имя пользователя;
2.	Возраст пользователя.
Получив параметры, сервер создает объект со свойствами name и age. После создания, объект помещается в массив.
Для хранения данных используется формат JSON и файл users.json.
Пример содержимого файла users.json после двух запросов:*/

const express = require('express');
const fs = require('fs');

const app = express();
let resArr = [];
app.get('/:name/:age', (req, res) =>{
    let name = String(req.params.name) || 'Default Name';
    let age = Number(req.params.age) || 'Default Age';
    resArr.push({
        name: name,
        age: age
    });
    let resArrJson = JSON.stringify(resArr, null, 3);
    //req.on('end', ()=> console.log(resArrJson));
    req.on('end', () =>{
        fs.writeFile('./users.json', resArrJson, 'utf8', (err) => {
            if(err) throw err;
        });
    });
    res.send(resArrJson);
})

app.listen(3000);