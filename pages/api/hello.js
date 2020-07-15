// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.end(JSON.stringify({ name: 'John Doe' }));
}
