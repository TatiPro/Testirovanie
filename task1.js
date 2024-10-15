//подключаем модуль для проверок
const assert = require('assert');
//подключаем библиотеку selenium-webdriver
const { Builder, Browser, By } = require('selenium-webdriver');

async function testTodoApp() {
    let driver = await new Builder().forBrowser('opera').build();

    try {
        // Шаг 1: Перейти по ссылке
        await driver.get('https://lambdatest.github.io/sample-todo-app/'); 

        // Проверка присутствие заголовка.
        let h2 = await driver.getTitle();
        if (h2 === 'LambdaTest Sample App') {
            console.log('Заголовок верен.');
        } else {
            console.log('Неверный заголовок.');
        }

        //Шаг 2: Проверка текста "5 of 5 remaining"
        let remainingTextElement = await driver.findElement(By.xpath("//span[@class='ng-binding']"));
        let remainingText = await remainingTextElement.getText();
        if (remainingText === '5 of 5 remaining') {
            console.log('Текст присутствует.');
        } else {
            console.log('Текст отсутствует или неверен.');
        }
        
        //Шаг 3: Проверить, что первый элемент списка не зачеркнут
        let firstItemCheckbox = await driver.findElement(By.name('li1'));
        let firstItemLabel = await driver.findElement(By.xpath("//li[1]/span"));

        let isCrossed = await firstItemLabel.getCssValue('text-decoration');
        if (!isCrossed.includes('line-through')) {
            console.log('Первый элемент не зачеркнут.');
        } else {
            console.log('Первый элемент зачеркнут.');
        }

        //Шаг 4: Поставить галочку у первого элемента
        await firstItemCheckbox.click();

        isCrossed = await firstItemLabel.getCssValue('text-decoration');
        if (isCrossed.includes('line-through')) {
            console.log('Зачеркнули первый элемент');
        } else {
            console.log('Первый элемент не получилось зачеркнуть.');
        }

        //Число оставшихся элементов должен уменьшиться на 1
        let updatedRemainingText = await remainingTextElement.getText();
        console.log(`Оставшихся элементов: ${updatedRemainingText}`);

        //Шаг 5: Повтор шагов 3,4 для остальных элементов списка
        for (let i = 2; i <= 5; i++) {
            let itemCheckbox = await driver.findElement(By.name(`li${i}`));
            let itemLabel = await driver.findElement(By.xpath(`//li[${i}]/span`));

            isCrossed = await itemLabel.getCssValue('text-decoration');
            if (!isCrossed.includes('line-through')) {
                console.log(`Элемент ${i} не зачеркнут.`);
            } else {
                console.log(`Элемент ${i} зачеркнут.`);
            }

            await itemCheckbox.click();

            isCrossed = await itemLabel.getCssValue('text-decoration');
            if (isCrossed.includes('line-through')) {
                console.log(`Элемент ${i} зачеркнут.`);
            } else {
                console.log(`Элемент ${i} не зачеркнут.`);
            }

            updatedRemainingText = await remainingTextElement.getText();
            console.log(`Оставшихся элементов: ${updatedRemainingText}`);
        }

        //Шаг 6: Добавление нового элемента списка
        let inputField = await driver.findElement(By.id('sampletodotext'));
        await inputField.sendKeys('Новый элемент');
        let addButton = await driver.findElement(By.id('addbutton'));
        await addButton.click();

        //Проверка добавления элемента
        let newItemLabel = await driver.findElement(By.xpath("//li[last()]/span"));
        let newItemText = await newItemLabel.getText();
        if (newItemText === 'Новый элемент') {
            console.log('Новый элемент добавлен и не зачеркнут.');
        } else {
            console.log('Новый элемент не добавлен.');
        }

        //Проверка числа элементов
        updatedRemainingText = await remainingTextElement.getText();
        console.log(`Оставшихся элементов после добавления: ${updatedRemainingText}`);

        //Шаг 7: Клик на новый элемент списка
        let newItemCheckbox = await driver.findElement(By.xpath("//li[last()]/input"));
        await newItemCheckbox.click();

        // Проверка, что новый элемент зачёркнут
        isCrossed = await newItemLabel.getCssValue('text-decoration');
        if (isCrossed.includes('line-through')) {
            console.log('Новый элемент зачеркнули.');
        } else {
            console.log('Новый элемент не зачеркнут.');
        }

        updatedRemainingText = await remainingTextElement.getText();
        console.log(`Оставшихся элементов после зачёркивания нового элемента: ${updatedRemainingText}`);

    } catch (error) {
        console.error('ОШИБКА', error);
    } finally {
        // Закрытие браузера
        await driver.quit();
    }
}

testTodoApp();









