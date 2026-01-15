const Product = require('../models/Product');
const demoData = require('../demoData');

const isDemoMode = process.env.DEMO_MODE !== 'false';

exports.createProduct = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      price, 
      category, 
      images, 
      stock,
      mrp,
      brand,
      exchangeOrReturnEligibility,
      published
    } = req.body;

    if (isDemoMode) {
      const product = {
        _id: String(demoData.products.length + 1000),
        title,
        description,
        price,
        mrp: mrp || price,
        brand: brand || 'Not specified',
        category,
        images: images || [],
        seller: req.user.id,
        stock,
        exchangeOrReturnEligibility: exchangeOrReturnEligibility || false,
        published: published !== undefined ? published : true,
        rating: 0,
        reviews: [],
        isActive: true,
        createdAt: new Date(),
      };

      demoData.products.push(product);

      return res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product,
      });
    }

    const product = await Product.create({
      title,
      description,
      price,
      mrp: mrp || price,
      brand: brand || 'Not specified',
      category,
      images: images || [],
      stock,
      exchangeOrReturnEligibility: exchangeOrReturnEligibility || false,
      published: published !== undefined ? published : true,
      seller: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    if (isDemoMode) {
      let filteredProducts = [...demoData.products].filter(p => p.isActive);

      if (category) {
        filteredProducts = filteredProducts.filter(p => p.category === category);
      }

      if (search) {
        filteredProducts = filteredProducts.filter(
          p =>
            p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description.toLowerCase().includes(search.toLowerCase())
        );
      }

      const skip = (page - 1) * limit;
      const products = filteredProducts.slice(skip, skip + limit);

      // Add seller info
      const productsWithSeller = products.map(p => ({
        ...p,
        seller: demoData.users.find(u => u._id === p.seller),
      }));

      return res.json({
        message: 'Products retrieved successfully',
        products: productsWithSeller,
        pagination: {
          total: filteredProducts.length,
          page: parseInt(page),
          limit: parseInt(limit),
          pages: Math.ceil(filteredProducts.length / limit),
        },
      });
    }

    let query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .populate('seller', 'firstName lastName profileImage')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      message: 'Products retrieved successfully',
      products,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    if (isDemoMode) {
      const product = demoData.products.find(p => p._id === req.params.id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.json({
        message: 'Product retrieved successfully',
        product: {
          ...product,
          seller: demoData.users.find(u => u._id === product.seller),
        },
      });
    }

    const product = await Product.findById(req.params.id).populate(
      'seller',
      'firstName lastName email profileImage'
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({
      message: 'Product retrieved successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    if (isDemoMode) {
      const product = demoData.products.find(p => p._id === req.params.id);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      // In demo mode, allow updates without authorization check for testing
      Object.assign(product, req.body);
      product.updatedAt = new Date();

      return res.json({
        success: true,
        message: 'Product updated successfully',
        product,
      });
    }

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    if (isDemoMode) {
      const product = demoData.products.find(p => p._id === req.params.id);

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }

      // In demo mode, allow deletion without authorization check for testing
      const index = demoData.products.indexOf(product);
      demoData.products.splice(index, 1);

      return res.json({ success: true, message: 'Product deleted successfully' });
    }

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.seller.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

exports.getMyProducts = async (req, res, next) => {
  try {
    if (isDemoMode) {
      const products = demoData.products.filter(p => p.seller === req.user.id);

      return res.json({
        message: 'Your products retrieved successfully',
        products,
      });
    }

    const products = await Product.find({ seller: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({
      message: 'Your products retrieved successfully',
      products,
    });
  } catch (error) {
    next(error);
  }
};
