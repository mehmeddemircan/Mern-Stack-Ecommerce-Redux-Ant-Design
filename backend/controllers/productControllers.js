const Product = require("../models/Product");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const crypto = require("crypto");
const slugify = require("slugify");
const User = require("../models/User");

exports.create = catchAsyncErrors(async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.title);
    console.log(req.body);

    // const _newProduct = await Product.find({slug: req.body.slug})

    // if (_newProduct) {
    //     res.status(400).json({
    //         success: false,
    //         error : 'This product already created'
    //     })
    // }

    const product = await new Product(req.body).save();

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

exports.listAll = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({})
    .limit(parseInt(req.params.count))
    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.status(200).json({
    products,
  });
});
// without pagination
exports.listSlider = catchAsyncErrors(async (req, res, next) => {
  // createdAt updatedAt, desc/asc, 3

  const { sort, order, limit } = req.body;

  const products = await Product.find({})
    .populate("category")
    .populate("subs")
    .sort([[sort, order]])
    .limit(limit)
    .exec();

  const bestsellers = await Product.find({})
    .populate("category")
    .populate("subs")
    .sort([[sort, order]])
    .limit(limit)
    .exec();

  res.status(200).json({
    products,
    bestsellers,
  });
});

// with pagination
exports.list = catchAsyncErrors(async (req, res, next) => {
  console.table(req.body);
  // createdAt updatedAt, desc/asc, 3

  const { sort, order, page } = req.body;

  const currentPage = page || 1;
  const perPage = 10; // for each page 3 product will  be shown

  const products = await Product.find({})
    .skip((currentPage - 1) * perPage)
    .populate("category")
    .populate("subs")
    .sort([[sort, order]])
    .limit(perPage)
    .exec();

  res.status(200).json({
    products,
  });
});

exports.read = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();

  res.status(200).json({
    product,
  });
});

exports.remove = catchAsyncErrors(async (req, res, next) => {
  const deleted = await Product.findOneAndRemove({
    slug: req.params.slug,
  }).exec();

  res.status(200).json({
    success: true,
    deleted,
  });
});
exports.productsCount = catchAsyncErrors(async (req, res, next) => {
  const total = await Product.find({}).estimatedDocumentCount().exec();

  res.status(200).json({
    total,
  });
});

exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, pictures } = req.body;
  console.log(req.body);
  const product = await Product.findById(req.params.productId);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

  

    if (alreadyReviewed) {
      res.status(400).json({
        error: "Product already reviewed",
      });
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        pictures,
        user: req.user._id,
        userProfile : req.user.pictures.length > 0 ?  req.user.pictures[0].url  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAM1BMVEXk5ueutLfn6eqrsbTp6+zg4uOwtrnJzc/j5earsbW0uby4vcDQ09XGyszU19jd3+G/xMamCvwDAAAFLklEQVR4nO2d2bLbIAxAbYE3sDH//7WFbPfexG4MiCAcnWmnrzkjIRaD2jQMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMwzAMw5wQkHJczewxZh2lhNK/CBOQo1n0JIT74/H/qMV0Z7GU3aCcVPuEE1XDCtVLAhgtpme7H0s1N1U7QjO0L8F7llzGeh1hEG/8Lo7TUmmuSrOfns9xnGXpXxsONPpA/B6OqqstjC6Ax/0ujkNdYQQbKNi2k64qiiEZ+ohi35X+2YcZw/WujmslYewiAliVYrxgJYrdwUmwXsU+RdApUi83oNIE27YvrfB/ZPg8+BJETXnqh9CVzBbTQHgojgiCvtqU9thFJg/CKz3VIMKMEkIXxIWqIpIg2SkjYj+xC816mrJae2aiWGykxRNsW0UwiJghJDljYI5CD8GRiCtIsJxizYUPQ2pzItZy5pcisTRdk/a9m4amtNNfBuQkdVhSaYqfpNTSFGfb9GRIakrE2Pm+GFLaCQPqiu0OpWP+HMPQQcgQMiQprWXNmsVwIjQjYi/ZrhAqNTCgr2gu0Jnz85RSSjso0HkMFZ0YZjKkc26a/jlmh9JiDyDxi9oeorTYAzZkwwoMz19pzj9bnH/GP/+qbchjSGflneWYhtTuKdMOmNKZcJ5TjInQKcYXnESd/jQxy0ENpULTNGOGgxpap/oyw9pbUAqhfx2Dbkhovvfgz4iUzoM9+GlK6/Mh4q29hyC1mwro30hpVVLPF9wYQr71RazOeM5/cw81iBRD+A03aM9/C/obbrKjbYSpCmIVG3qT/Q8oeUo3Rz0IL7vI1tEbCB9pSiu8I/aV8x3Kg/BGWrWp4ZVs0nZfmAoEG4h/61yHYIJiFSl6Q0Vk6tTW1N8kYp8hdOkfHYYMXd2Qft+8CYwqYDSKvqIh+MCF8Wgca2u/cwdgeW3TtuVn6+1oBs3yLo5C2JpK6CvQzGpfUkz9UG/87gCsi5o2LIXolxN0FbwAsjOLEr+YJmXn7iR6N0BCt5p5cMxm7eAsfS+/CACQf4CTpKjzgkvr2cVarVTf96372yut7XLJ1sa7lv6VcfgYrWaxqr3Wlo1S6pvStr22sxOtTNPLzdY3nj20bPP+ejFdJYkLsjGLdtPBEbe/mr2bQKiXWJDroA+vtzc0p9aahuwqHMDYrQEXHEw9jwQl3drMpts9JBU1SdktPe5FBRdJQ6bwXBpa57ib2A8kukQDzMjh++Uo7Fo6Wd02Pkf4fknqoo4HtvAIjsqUcjx6DIPgWCaOML9rKI/oqD9/lgNrn+eF+p7j8tnzHBiR7+kdUGw/+V1Kzkc75mMy6U+FMaxjPibiM1U1uGM+puInHpmALZCgP4pt7i840MV8+0R1zPsRB6UTcqpizncYwZ89syDydfyWCwXB1l8/zRNGWbTG/GHKUm9AkxHMc/EGSk3z2+ArEhPEV5TUBLEvUGFcjEUH80J/jveTGOAJEljJbILWGQT3zRYiwuKsUXN1EEJAzBhRJFll7mBUG7KD8EqPkKekBREaL8hMDZLQSG6AQjtHPYmvTQnX0TtpC1SYCe2YdkkyLP3jj5BSbKiuR585eQhTgoje6yIb0Yb0C+mV6EYvebqw5SDy2WmubogZiF2AVxPC2FpDf8H2Q9QWo6IkjUxTWVEI3WY/wrCeSuqJ+eRWzXR/JXwgVjUMozbCOfoEZiSiKVGepqv5CJ8RyR4D7xBeamqa7z3BJ/z17JxuBPdv93d/a2Ki878MMAzDMAzDMAzDMAzDMF/KP09VUmxBAiI3AAAAAElFTkSuQmCC"
     
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

    

      await product.save();

      res.status(201).json({
        review,
      });
    }
  } else {
    res.status(404).json({
      error: "Product not found",
    });
  }
});

// Get Product Reviews   =>   /api/v1/reviews
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const reviews = await Product.findById(req.params.productId)
    .select("reviews")



  res.status(200).json({
    reviews,
 

    // success: true,
    // reviews: product.reviews
  });
});

// related
exports.listRelated = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(10)
    .populate("category")

    .populate("subs")
    .populate("postedBy")
    .exec();

  res.status(200).json({
    related,
  });
});

// Delete Product Review   =>   /api/v1/reviews
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  console.log(product);

  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    success: true,
    deleted,
  });
});

// search / filtering
const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name")
    .exec();

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    let products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    let products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();

    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleStars = async (req, res, stars) => {
  try {
  } catch (error) {}
};

const handleSub = async (req, res, sub) => {
  try {
    const products = await Product.find({ subs: sub })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleShipping = async (req, res, shipping) => {
  try {
    const products = await Product.find({ shipping })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleBrand = async (req, res, brand) => {
  try {
    const products = await Product.find({ brand })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

const handleColor = async (req, res, color) => {
  try {
    const products = await Product.find({ color })
      .populate("category", "_id name")
      .populate("subs", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

exports.searchFilters = catchAsyncErrors(async (req, res, next) => {
  const {
    query,
    price,
    category,
    stars,
    sub,
    shipping,
    brand,
    color,
  } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }
  // price [20 , 200]
  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }
  if (stars) {
    await handleStars(req, res, stars);
  }
  if (sub) {
    await handleSub(req, res, sub);
  }
  if (shipping) {
    await handleShipping(req, res, shipping);
  }

  if (brand) {
    await handleBrand(req, res, brand);
  }
  if (color) {
    await handleColor(req, res, color);
  }
});
