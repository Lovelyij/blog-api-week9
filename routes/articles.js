const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const requireAuth = require('../middleware/requireAuth');

// Protect ALL routes below this line
router.use(requireAuth);

router.post('/', async (req, res) => {
    try {
        const article = new Article({ ...req.body, userId: req.userId });
        await article.save();
        res.status(201).json(article);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.get('/', async (req, res) => {
    try {
        const articles = await Article.find();
        res.json(articles);
    } catch (error) {
        res.status(500).json({error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ error: 'Article not found'});
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({error: 'Article not found'});
        }
        if (article.userId.toString() !== req.userId) {
            return res.status(403).json({error: 'Not authorized to edit this article'});
        }
        const updated = await Article.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        res.json(updated);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({error:'Article not found' });
        }
        if (article.userId.toString() !== req.userId) {
            return res.status(403).json({error: 'Not authorized to delete this article'});
        }
        await Article.findByIdAndDelete(req.params.id);
        res.json({message: 'Article deleted successfully' });
    } catch (error) {
        res.status(500).json({error: error.message });
    }
});

module.exports = router;