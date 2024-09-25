@login
Feature: Ingreso

  Scenario Outline: Login en OrangeHRM con credenciales validas
    Given un usuario Administrador esta en la pagina de Login
    When el usuario ingresa el nombre de usuario "<username>" y la contraseña "<password>"
    Then el usuario visualiza la pagina principal

    Examples:
    | username | password |
    | Admin    | admin123 |