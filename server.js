const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const dbConfig = require("./app/config/db.config");

const app = express();
const http = require('http').createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
  }
});

const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};

/* io.attach(http, corsOptions); */
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "tickitual-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);

const db = require("./app/models");
const Role = db.role;

db.mongoose
  .connect(`mongodb+srv://ransika5080:zGobApVUgAug1tNF@cluster0.7xa1nf3.mongodb.net/tickitualDb?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connected to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to tickitual application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/event.routes")(app);

let clients = 0;

io.on('connection', (socket) => {/* 
    clients++;
    io.sockets.emit('clients', clients);
    console.log(`A user connected. Total clients: ${clients}`); */

    socket.on('home-view', () => {
      clients++;
      io.sockets.emit('clients', clients);
      console.log(`A user connected. Total clients: ${clients}`);
    });

    socket.on('disconnect', () => {
        clients--;
        io.sockets.emit('clients', clients);
        console.log(`A user disconnected. Total clients: ${clients}`);
    });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
http.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "eventHolder"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'eventHolder' to roles collection");
      });
    }
  });
}
