exports.handler = async () => {
  const domain = "placekitten.com";
  const images = [];

  const randomSize = (min=400, max=600) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  for (let step=0; step < 10; step++) {
    images.push(`https://${domain}/${randomSize()}/${randomSize()}`);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(images),
  };
};