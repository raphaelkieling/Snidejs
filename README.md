# Snide

Make powerfull mocks with less lines.

> It's in development stage



## Simple

- Create a file called `whatever.js`
- `snide whatever.js`
- Be happy

Example code:

```js
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
```

## Parameters

|parameter|type|description|
|---------|----|-----------|
|route|`string`|Route like `/product`|
|data|`any`|Data response|
|wrapper|`function (data) => object`|Wrapper data to response. Like `{ status:200, data: "MY CONTENT" }`|
|handler|`function (req,res) => res.send("something")`||