module.exports = async function (context, req) {
  const title = req.body.title;
  const price = req.body.price;
  const type = req.body.type;

  if (title && price && type != null) {
    context.bindings.outputDocument = req.body;
    context.res = {
      body: { result: 'success' },
    };
  } else {
    context.res = {
      status: 400,
      body: { result: 'error' },
    };
  }
};
