export const config = {
  port: 8082,
  template: true,
  allow: {
    origin: "*",
    credentials: "true",
    methods: "GET,PUT,POST,DELETE,OPTIONS,PATCH",
    headers: "*",
  },
  log: {
    level: "debug",
    map: {
      time: "@timestamp",
      msg: "message",
    },
    db: true,
  },
  middleware: {
    log: true,
    skips: "health,log,middleware",
    request: "request",
    response: "response",
    status: "status",
    size: "size",
  },
  db: {
    user: "postgres",
    host: "localhost",
    password: "Nothingtosay123!",
    database: "nothingtosay",
    port: 5432,
  },
};

export const env = {
  sit: {
    port: 8082,
    db: {
      database: "masterdata_sit",
    },
  },
  prod: {
    middleware: {
      log: false,
    },
  },
};
