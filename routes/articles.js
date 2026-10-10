const router = require('express').Router();
const requireAuth = require('../middleware/requireAuth');
const {
  createArticle,
  getArticles,
  getArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');

// Protect ALL routes below this line
router.use(requireAuth);

router.post('/', createArticle);
router.get('/', getArticles);
router.get('/:id', getArticle);
router.put('/:id', updateArticle);
router.delete('/:id', deleteArticle);

module.exports = router;