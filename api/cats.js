const fetch = require("node-fetch");

exports.handler = async () => {
  const domain = "placekitten.com";
  const images = [];

  const randomSize = (min=400, max=600) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const response = await fetch("https://catfact.ninja/facts?limit=10");
  const json = await response.json();
  const facts = json.data;

  for (let step=0; step < 10; step++) {
    images.push({
      image: `https://${domain}/${randomSize()}/${randomSize()}`,
      fact: facts[step].fact,
    });
  }

  return {
    statusCode: 200,
    body: JSON.stringify(images),
  };
};