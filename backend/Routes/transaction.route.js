const router = require('express').Router();
const {getTransactions,getStatistics,getPriceRangeStats,getCategoryDistribution,getCombinedStats} = require('../Controllers/transaction.controller')
router.get('/',getTransactions)
router.get('/stats', getStatistics)
router.get('/price-range',getPriceRangeStats)
router.get('/category',getCategoryDistribution)
router.get('/combinedStats',getCombinedStats)

module.exports=router;