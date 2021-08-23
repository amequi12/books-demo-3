export default {
  loading: 'Загрузка',
  back: 'Вернуться',
  delete: 'Удалить',
  edit: 'Редактировать',
  save: 'Сохранить',
  login: 'Войти',
  error: 'Ошибка',
  errors: {
    description: "Значение",
    inclusion: "{{description}} не включено в список",
    exclusion: "{{description}} зарезервировано",
    invalid: "{{description}} неверного формата",
    confirmation: "{{description}} не совпадает с {{on}}",
    accepted: "{{description}} должно быть отмечено",
    empty: "{{description}} не может быть пустым",
    blank: "{{description}} должно быть заполнено",
    present: "{{description}} должно быть заполнено",
    collection: "{{description}} must be a collection",
    singular: "{{description}} can't be a collection",
    tooLong: "{{description}} слишком длинное (максимум - {{max}} символов)",
    tooShort: "{{description}} слишком короткий (минимум - {{min}} символов)",
    before: "{{description}} должно быть перед {{before}}",
    after: "{{description}} должно быть после {{after}}",
    wrongDateFormat: "{{description}} должно быть в формате {{format}}",
    wrongLength: "{{description}} неверной длинны (должно быть {{is}} символов)",
    notANumber: "{{description}} должно быть числом",
    notAnInteger: "{{description}} должно быть целым числом",
    greaterThan: "{{description}} должно быть больше, чем {{gt}}",
    greaterThanOrEqualTo: "{{description}} должно быть больше или равно {{gte}}",
    equalTo: "{{description}} должно быть равным {{is}}",
    lessThan: "{{description}} должно быть меньше, чем {{lt}}",
    lessThanOrEqualTo: "{{description}} должно быть меньше или равно {{lte}}",
    otherThan: "{{description}} должно отличаться от {{value}}",
    odd: "{{description}} должно быть нечётным",
    even: "{{description}} должно быть чётным",
    positive: "{{description}} должно быть положительным",
    date: "{{description}} должно быть действительной датой",
    onOrAfter: '{{description}} must be on or after {{onOrAfter}}',
    onOrBefore: '{{description}} must be on or before {{onOrBefore}}',
    email: "{{description}} должно иметь корректный формат e-mail адреса",
    phone: "{{description}} должно быть действительным номером телефона",
    url: "{{description}} должно быть действительной ссылкой",
    passwordDescription: 'Пароль и подтверждение пароля',
    passwordDontMatch: 'не совпадают',
    wrongRating: 'Значение должно быть от 1 до 5'
  },
  application: {
    books: 'Книги',
    speakers: 'Спикеры',
    reports: 'Доклады',
    events: 'Встречи клуба',
    register: 'Регистрация',
    login: 'Вход в аккаунт',
    logout: 'Выйти из аккаунта',
    greetings: 'Привет'
  },
  book: {
    action: 'Добавить Новую Книгу',
    title: 'Книги',
    attrs: {
      bookName: 'Название книги',
      author: 'Автор',
      pagesNumber: 'Количество страниц',
      cover: 'Обложка',
      tags: 'Теги'
    },
    reports: 'Доклады об этой книге',
    searchByTag: 'Поиск По Тегу',
    create: 'Новая Книга',
    edit: 'Редактирование Книги',
    search: 'Поиск По Книгам'
  },
  speaker: {
    action: 'Добавить Нового Спикера',
    title: 'Спикеры',
    attrs: {
      firstName: 'Имя',
      middleName: 'Отчество',
      lastName: 'Фамилия'
    },
    detail: 'Спикер',
    create: 'Новый Спикер',
    edit: 'Редактирование Спикера',
    reports: 'Доклады этого спикера',
    search: 'Поиск По Спикерам'
  },
  report: {
    title: 'Доклады',
    attrs: {
      reportDate: 'Дата Доклада',
      rating: 'Рейтинг',
      presentationUrl: 'Ссылка на презентацию',
      videoUrl: 'Ссылка на видео',
      review: 'Обзор',
      book: 'Книга',
      speaker: 'Спикер',
      event: 'Встреча'
    },
    detail: 'Доклад',
    create: 'Новый Доклад',
    edit: 'Редактирование Доклада',
    search: 'Поиск По Докладам'
  },
  event: {
    action: 'Добавить Новую Встречу',
    title: 'Встречи Клуба',
    attrs: {
      eventDate: 'Дата Встречи'
    },
    reports: 'Доклады на этой встрече',
    reportsAdd: 'Добавить Доклад',
    detail: 'Встреча',
    create: 'Новая Встреча',
    edit: 'Редактирование Встречи',
    search: 'Поиск По Встречам'
  },
  email: 'Электронная Почта',
  password: 'Пароль',
  register: {
    username: 'Имя Пользователя',
    passwordConfirmation: 'Подтверждение Пароля',
  }
};
