const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll(
    {
      attributes: [
        "id", "category_name"
      ],
    include: [
      // Remember: a product can only belong to one single category
   
        // model: Tag,
        // attributes: [
        //   "id", "tag_name"
        // ],
        {
          model: Product,
          attributes: [ 
            "id", "product_name", "price", "stock", "category_id"
          ]
        }
     ]
    })
    .then(dbCat => {
      if(!dbCatData) {
        res.status(404).json({message: 'Unfortunately, no categories were found'});
        return;
      }
      res.json(dbCat);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne(
    {
      where: {
        id: req.params.id
      },
      attributes: [
        "id", "category_name"
      ],
      include: [
        {
          model: Product,
          attributes: [
            "id", "product_name", "price", "stock", "category_id"
          ]
        }
      ]
    })
    .then(dbCat => {
      if(!dbCatData) {
        res.status(404).json({message: 'Unfortunately, no categories were found with the provided id'});
        return;
      }
      res.json(dbCat);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(
    {
      category_name: req.body.category_name
    })
    .then(dbCat => res.json(dbCat))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update( 
    {
      body: req.body.body,
    },
    {
      where: {
        id: req.params.id
    }
  })
   .then(dbCat => res.json(dbCat))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy(
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbCat => {
      if (!dbCat) {
        res.status(404).json({ message: 'No Category was found with this id' });
        return;
      }
      res.json(dbCat);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
