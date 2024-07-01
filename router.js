const express = require('express')
const router = express.Router()
const { executeScript } = require('./services/scriptExecutor');

const codeRouter = require('./routers/code.router')

router.use('/', codeRouter)
router.post('/execute', async (req, res) => {
    const { language, script } = req.body;

    if (!language) {
        return res.status(400).json({ message: "'language' is required" });
    }

    if (!script) {
        return res.status(400).json({ message: "'script' is required" });
    }

    try {
        const result = await executeScript(language, script);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

module.exports = router
