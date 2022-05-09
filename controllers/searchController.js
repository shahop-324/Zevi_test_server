const catchAsync = require("../utils/catchAsync");
const Flicker = require("flickr-sdk");
const { createClient } = require("pexels");

const client = createClient(
  process.env.PexelsAPIKey
);

const flickr = Flicker(process.env.FlickerAPIKey);

exports.sendSearchResult = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: req.parsedData,
  });
});

exports.fetchImages = catchAsync(async (req, res, next) => {
  // Find images based on term

  let images = [];

  const query = req.body.term || "dog";

  client.photos.search({ query, per_page: 150 }).then((photos) => {
    photos.photos.forEach((element) => {
      console.log(element.src);
      images.push({ url: element.src.medium, alt: element.alt });
    });
    console.log(photos);
  });

  // Parse and organise data

  setTimeout(() => {
    console.log(images);
    req.parsedData = images;
    next();
  }, 1000);

  // send response
});
