let wrapper = data => ({ status: 200, data });

module.exports = [
  {
    route: "/",
    wrapper,
    data: [
      {
        username: "Hello"
      }
    ]
  },
  ["/welcome", "get", { message: "hello" }],
  ["/welcome/:id", "get", (req, res) => {
    res.send(wrapper(`Hello World Welcome => ${req.params.id}`));
  }]
];
