/*Создайте сервер с маршрутом, который содержит два параметра:
1.	Имя пользователя;
2.	Возраст пользователя.
Получив параметры, сервер создает объект со свойствами name и age. После создания, объект помещается в массив.
Для хранения данных используется формат JSON и файл users.json.
Пример содержимого файла users.json после двух запросов:*/

const express = require('express');
const fs = require('fs');

const app = express();

app.get('/:name/:age', (req, res) => {
    fs.readFile('./users.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        } else if (data === undefined) {
            let emptyArr = JSON.stringify([]);
            fs.writeFile('./users.json', emptyArr, 'utf8', (err) => {
                if (err) throw err;
                res.send('[]');
            });
        } else {
            let name = String(req.params.name) || 'Default Name';
            let age = Number(req.params.age) || 'Default Age';
            let reqData = { name: name, age: age };
            let storageData;
            fs.readFile('./users.json', 'utf8', (err, data) => {
                if (err) {
                    throw err;
                } else {
                    console.log('0->' + data);
                    storageData = JSON.parse(data);
                    console.log('1->' + typeof storageData);
                    storageData.push(reqData);
                    console.log('2->' + storageData);
                    later();
                };
            });
            let later = () => {
                if (storageData.length !== 0) {
                    let writeData = JSON.stringify(storageData, null, 3);
                    fs.writeFile('./users.json', writeData, 'utf8', (err) => {
                        if (err) throw err;
                    });
                    res.end();
                } else {
                    later();
                };
            };
        };
    });
});
app.listen(3000);

/*let storData;
fs.createReadStream('./users.json')
.on('data', (chunk) => {
        storData += chunk;
        //console.log(storData);
        //storData.push(reqData);
        //console.log(storData);
}).on('end', () =>{
    storData = JSON.parse(storData);
    console.log(storData);
    storData.push(reqData);
    let writeData = JSON.stringify(storData, null, 3);
    fs.writeFile('./users.json', writeData, 'utf8', (err) => {
        if(err) throw err;
    })
});

req.on('end', () =>{
    console.log(storData);
    storData.push(reqData);
    let writeData = JSON.stringify(storData, null, 3);
    fs.writeFile('./users.json', writeData, 'utf8', (err) => {
        if(err) throw err;
    });
});
res.send();
});*/