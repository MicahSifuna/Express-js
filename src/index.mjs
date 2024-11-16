import express from 'express';

const app = express();

// register the middleware to parse the json data.
app.use(express.json());

const PORT = process.env.PORT || 3000;

const mockUsers = [
      { id: 1, username: "micah", Name: "Micah" },
      { id: 2, username: "jim", Name: "Jim" },
      { id: 3, username: "vahid", Name: "Vahid" },
      { id: 4, username: "louis", Name: "Louis" },
      { id: 5, username: "jack", Name: "Jack" },
      { id: 6, username: "henry", Name: "Henry" },
      { id: 7, username: "tina", Name: "Tina" }
]

// get request handler

app.get('/', (req, res) => {
      res.send({ msg: "Hello" });
})

app.get('/api/users', (req, res) => {
      console.log(req.query)
      // destructure query object
      const { query: { filter, value } } = req;

      // // when filter and value are undefined
      // if (!filter && !value) return res.send(mockUsers)

      if(filter && value) return res.send(
            mockUsers.filter((user) => user[filter].includes(value))
      )
      return res.send(mockUsers);
})

// REGISTERING A POST REQUEST

app.post('/api/users', (req, res) => {
      console.log(req.body);
      return res.send(200)
})

app.get("/api/users/:id", (req, res) => {
      res.send(mockUsers)
      // convert id to a number
      const parsedId = parseInt(req.params.id);
      console.log(parsedId)

      if (isNaN(parsedId)) return res.status(400).send({ msg: "Bad request. Invalid ID" });

      const findUser = mockUsers.find((user) => user.id === parsedId);
      if (!findUser) return res.sendStatus(404);
      return res.send(findUser);
});

// using route params to get unique identifier

app.get("/api/users/:id", (req, res) => {
      console.log(req.params);
})

app.listen(PORT, () => {
      console.log(`listening on ${PORT}`);
});

