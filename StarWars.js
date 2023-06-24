// autotest for method https://swapi.py4e.com/api/people/10

pm.test('Код ответа 200', function() {
    pm.response.to.have.status(200);
});

const responseJson = pm.response.json();

pm.test("Ответ имеет все три обязательных свойства", () => {
    // Проверка сразу трех свойств:
    // 1. Значение поля name было "Obi-Wan Kenobi"
    // 2. Значение поля height было строкой
    // 3. Значение поля mass состояло строго из двух символов
    pm.expect(responseJson.name).to.eql('Obi-Wan Kenobi');
    pm.expect(responseJson.height).to.be.a('string');
    pm.expect(responseJson.mass).to.have.lengthOf(2);
});

pm.test("Массив films не пустой", () => {
    // Проверка, что массив фильмов не пустой
    pm.expect(responseJson.films).not.to.be.empty;
});



// autotest for method https://swapi.py4e.com/api/planets/7

pm.test("Код ответа 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Время ответа меньше 200мс", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

pm.test("Проверяем правильность схемы JSON в ответе", () => {
    
    var scheme = {
        // описываем тип
        "type": "object",
        // указываем обязательные свойства
        "required": ["name"],
        // описываем свойства
        "properties": {
            "name": {"type": "string"},
            "rotation_period": {"type": "string"},
            "orbital_period": {"type": "string"},
            "diameter": {"type": "string"},
            "climate": {"type": "string"},
            "gravity": {"type": "string"},
            "terrain": {"type": "string"},
            "surface_water": {"type": "string"},
            "population": {"type": "string"},
            "created": {"type": "string"},
            "edited": {"type": "string"},
            "url": {"type": "string"},
            // описываем массивы
            "residents": {
                "type": "array",
                // тип элементов
                "items": {"type": "string"}
            },
            "films": {
                "type": "array",
                "items": {"type": "string"}
            }
        }
    };

    // валидируем JSON из ответа с помощью правил из scheme
    var isValidScheme = tv4.validate(pm.response.json(), scheme, true, true);
    pm.expect(isValidScheme).to.be.true;
});



// autotest for method https://swapi.py4e.com/api/starships/5

pm.test("Код ответа 200", function() {
    pm.response.to.have.status(200);
});

pm.test("Время ответа меньше 200мс", function () {
    pm.expect(pm.response.responseTime).to.be.below(200);
});

pm.test("Код статуса имеет тип string", function () {
    pm.response.to.have.status("OK");
});
