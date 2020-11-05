module.exports = async function (context, req, product) {
  const title = req.body.title;
  const price = req.body.price;
  const type = req.body.type;

  context.bindings.outputDocument = product[0];
  context.bindings.outputDocument.title = title;
  context.bindings.outputDocument.price = price;
  context.bindings.outputDocument.type = type;

  context.res = {
    body: { result: 'success' },
  };
};
