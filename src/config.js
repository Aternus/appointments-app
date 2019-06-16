const constants = {
  apiPath: "https://appointmentsapp-9c8d.restdb.io/rest",
  get appointmentsApiPath() {
    return `${this.apiPath}/appointments`;
  },
  apiKey: "5d060d0d27bc5b75bfeb7ceb",
  dateFormat: "YYYY-MM-DD HH:mm",
  apiFields: {
    name: "name",
    host: "host",
    notes: "notes",
    date: "date"
  }
};

const enums = {
  sortOrder: {
    ASC: 0,
    DESC: 1
  },
  sortBy: {
    name: 0,
    host: 1,
    date: 2
  }
};

export { constants, enums };
