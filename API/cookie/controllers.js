let cookies = require("../../cookies");
const slugify = require("slugify");

exports.cookieFetch = (req, res) => {
  // JSON = JavaScript Object Notation
  res.json(cookies);
};

exports.deleteCookie = (req, res) => {
  const { cookieId } = req.params;
  // check if cookie exists
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  // if cookie exists:
  if (foundCookie) {
    cookies = cookies.filter((cookie) => cookie.id !== +cookieId);
    res.status(204).end(); // NO CONTENT
  } else {
    //  give back response 404 Cookie Not Found
    res.status(404).json({ message: "Cookie Not Found." });
  }
};

exports.createCookie = (req, res) => {
  // generate ID
  const id = cookies.length + 1;
  // generate slug (using slugify)
  const slug = slugify(req.body.name, { lower: true });
  // put them all together with req.body in a new cookie object (newCookie)
  const newCookie = {
    id,
    slug,
    ...req.body,
  };
  // .push() newCookie onto cookies
  cookies.push(newCookie);
  // response: 201 CREATED
  res.status(201).json(newCookie);
};

exports.updateCookie = (req, res) => {
  const { cookieId } = req.params;
  // check if cookie exists
  const foundCookie = cookies.find((cookie) => cookie.id === +cookieId);
  // if cookie exists:
  if (foundCookie) {
    // update cookie
    for (const key in req.body) foundCookie[key] = req.body[key];
    foundCookie.slug = slugify(foundCookie.name, { lower: true });
    res.status(204).end();
  } else {
    //  give back response 404 Cookie Not Found
    res.status(404).json({ message: "Cookie Not Found." });
  }
};
