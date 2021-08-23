export default {
  loading: 'Loading',
  back: 'Back',
  delete: 'Delete',
  edit: 'Edit',
  save: 'Save',
  login: 'Log In',
  error: 'Error',
  errors: {
    description: "This field",
    inclusion: "{{description}} is not included in the list",
    exclusion: "{{description}} is reserved",
    invalid: "{{description}} is invalid",
    confirmation: "{{description}} doesn't match {{on}}",
    accepted: "{{description}} must be accepted",
    empty: "{{description}} can't be empty",
    blank: "{{description}} can't be blank",
    present: "{{description}} must be blank",
    collection: "{{description}} must be a collection",
    singular: "{{description}} can't be a collection",
    tooLong: "{{description}} is too long (maximum is {{max}} characters)",
    tooShort: "{{description}} is too short (minimum is {{min}} characters)",
    before: "{{description}} must be before {{before}}",
    after: "{{description}} must be after {{after}}",
    wrongDateFormat: "{{description}} must be in the format of {{format}}",
    wrongLength: "{{description}} is the wrong length (should be {{is}} characters)",
    notANumber: "{{description}} must be a number",
    notAnInteger: "{{description}} must be an integer",
    greaterThan: "{{description}} must be greater than {{gt}}",
    greaterThanOrEqualTo: "{{description}} must be greater than or equal to {{gte}}",
    equalTo: "{{description}} must be equal to {{is}}",
    lessThan: "{{description}} must be less than {{lt}}",
    lessThanOrEqualTo: "{{description}} must be less than or equal to {{lte}}",
    otherThan: "{{description}} must be other than {{value}}",
    odd: "{{description}} must be odd",
    even: "{{description}} must be even",
    positive: "{{description}} must be positive",
    date: "{{description}} must be a valid date",
    onOrAfter: '{{description}} must be on or after {{onOrAfter}}',
    onOrBefore: '{{description}} must be on or before {{onOrBefore}}',
    email: "{{description}} must be a valid email address",
    phone: "{{description}} must be a valid phone number",
    url: "{{description}} must be a valid url",
    passwordDescription: 'Password and password confirmation',
    passwordDontMatch: 'do not match',
    wrongRating: '{{description}} must be greater than or equal to 1 and less than or equal to 5'
  },
  application: {
    books: 'Books',
    speakers: 'Speakers',
    reports: 'Reports',
    events: 'Events',
    register: 'Register',
    login: 'Login',
    logout: 'Log Out',
    greetings: 'Hello'
  },
  book: {
    action: 'Add New Book',
    title: 'Books',
    attrs: {
      bookName: 'Book Title',
      author: 'Author',
      pagesNumber: 'Number Of Pages',
      cover: 'Cover',
      tags: 'Tags'
    },
    reports: 'Reports on this book',
    searchByTag: 'Search By Tag',
    create: 'New Book',
    edit: 'Book Edit',
    search: 'Search'
  },
  speaker: {
    action: 'Add New Speaker',
    title: 'Speakers',
    attrs: {
      firstName: 'First Name',
      middleName: 'Middle Name',
      lastName: 'Last Name'
    },
    detail: 'Speaker',
    create: 'New Speaker',
    edit: 'Speaker Edit',
    reports: 'Reports by this speaker',
    search: 'Search'
  },
  report: {
    title: 'Reports',
    attrs: {
      reportDate: 'Report Date',
      rating: 'Rating',
      presentationUrl: 'Presentation URL',
      videoUrl: 'Video URL',
      review: 'Review',
      book: 'Book',
      speaker: 'Speaker',
      event: 'Event'
    },
    detail: 'Report',
    create: 'New Report',
    edit: 'Report Edit',
    search: 'Search'
  },
  event: {
    action: 'Add New Event',
    title: 'Events',
    attrs: {
      eventDate: 'Event Date'
    },
    reports: 'Reports from this event',
    reportsAdd: 'Add New Report',
    detail: 'Event',
    create: 'New Event',
    edit: 'Event Edit',
    search: 'Search'
  },
  email: 'Email',
  password: 'Password',
  register: {
    username: 'Username',
    passwordConfirmation: 'Confirm Password',
  }
};