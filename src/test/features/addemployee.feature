@create
Feature: Anadir empleado

  Scenario Outline: Crear nuevo empleado en OrangeHRM
    Given un usuario Administrador esta en la pagina de Login
    When el usuario ingresa el nombre de usuario "<username>" y la contraseña "<password>"
    And el usuario visualiza la pagina principal
    And el usuario ingresa a las seccion PIM
    And el usuario crea un nuevo empleado con foto "<photo>", nombre "<name>", segundo nombre "<middlename>" y apellido "<lastname>"
    And el usuario detalla los datos personales del nuevo empleado con licencia de conducir "<license>", fecha de expiracion de licencia "<expirydate>", nacionalidad "<nationality>", estado civil "<maritalstatus>", fecha de cumpleaños "<birthdate>" y genero "<gender>"
    Then el usuario valida la creacion del nuevo empleado

    Examples:
      | username | password | photo                       | name  | middlename | lastname   | license  | expirydate | nationality | maritalstatus | birthdate  | gender |
      | Admin    | admin123 | src/test/images/profile.jpg | Jude  | Victor     | Bellingham | 12345678 | 2030-23-07 | Peruvian    | Married       | 2003-29-06 | Male   |
