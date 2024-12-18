const form = document.querySelector(".form");
const SwitchUserStatus = document.querySelector(".SwitchUserStatus");
const registration = document.querySelector('.registration');
let userStatus = "register";

SwitchUserStatus.addEventListener('click', () => {
    if (userStatus === "register") {
        SwitchUserStatus.textContent = "Нет аккаунта? Зарегистрируйтесь!";
        form.action = "pages/login.php";
        
        form.innerHTML = 
        `<input type="text" class="input firstname" placeholder="Логин" name="login">
        <input type="password" class="input password" placeholder="Пароль" name="password">
        <button type="submit" class="submit">Войти</button>`;
        
        userStatus = "login";
    } else if (userStatus === "login") {
        SwitchUserStatus.textContent = "У вас уже есть аккаунт?";
        form.action = "pages/register.php";
        
        form.innerHTML = 
        `<input type="text" class="input firstname" placeholder="Логин" name="login">
        <input type="email" class="input email" placeholder="Email" name="email">
        <input type="password" class="input password" placeholder="Пароль" name="password">
        <input type="password" class="input password" placeholder="Повторите пароль" name="passwordRepeat">
        <button type="submit" class="submit">Зарегестрироваться</button>`;
        
        userStatus = "register";
    }
});
