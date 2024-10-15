import { By } from 'selenium-webdriver';

class TodoPage {
    constructor(driver) {
        this.driver = driver;
        this.url = 'https://lambdatest.github.io/sample-todo-app/';
    }

    // Открытие страницы
    async open() {
        await this.driver.get(this.url);
    }

    // Проверка заголовка
    async getTitle() {
        return await this.driver.getTitle();
    }

    // Получение текста оставшихся элементов
    async getRemainingText() {
        const element = await this.driver.findElement(By.xpath("//span[@class='ng-binding']"));
        return await element.getText();
    }

    // Зачёркнутость элемента списка
    async isItemCrossedOut(index) {
        const itemLabel = await this.driver.findElement(By.xpath(`//li[${index}]/span`));
        const textDecoration = await itemLabel.getCssValue('text-decoration');
        return textDecoration.includes('line-through');
    }

    // Клик по чекбоксу 
    async clickItemCheckbox(index) {
        const checkbox = await this.driver.findElement(By.name(`li${index}`));
        await checkbox.click();
    }

    // Новый элемент списка
    async addNewItem(text) {
        const inputField = await this.driver.findElement(By.id('sampletodotext'));
        await inputField.sendKeys(text);
        const addButton = await this.driver.findElement(By.id('addbutton'));
        await addButton.click();
    }

    // Текст последнего элемента
    async getLastItemText() {
        const items = await this.driver.findElements(By.xpath('//li'));
        const lastItem = items[items.length - 1];
        const itemText = await lastItem.findElement(By.css('span')).getText();
        return itemText;
    }

    // Клик для последнего элемента
    async clickLastItemCheckbox() {
        const items = await this.driver.findElements(By.xpath('//li'));
        const lastItem = items[items.length - 1];
        const checkbox = await lastItem.findElement(By.css('input'));
        await checkbox.click();
    }

    // ЗАчеркнутость последнего элемента
    async isLastItemCrossedOut() {
        const items = await this.driver.findElements(By.xpath('//li'));
        const lastItem = items[items.length - 1];
        const itemLabel = await lastItem.findElement(By.css('span'));
        const textDecoration = await itemLabel.getCssValue('text-decoration');
        return textDecoration.includes('line-through');
    }
}

export default TodoPage;