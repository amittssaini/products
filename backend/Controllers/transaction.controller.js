const Transaction= require('../Services/transaction.service')
const transactionInstance = new Transaction();
//initialize the data from the other api 

const axios =require('axios')
const savingTransaction=async(req,res)=>{
try {
    console.log('in saving transaction')
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json')
    const transactions=response.data
    const result = await transactionInstance.savingTransaction(transactions)
    res.send(result)
} catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).send('Error initializing database'); 
}
}

const getTransactions=async(req,res)=>{
try {
    const { page = 1, perPage = 10, search = '' } = req.query;
    console.log(page,perPage,search)
      const result = await transactionInstance.getTransaction({page,perPage,search})  
      res.json(result)

} catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send('Error fetching transactions');
}
}


const getStatistics = async (req, res) => {
    try {
        const { month } = req.query;
        console.log(`month::${month}`)
        if (!month ) {
            return res.status(400).send('Month is required');
        }

        const result = await transactionInstance.getStatistics(month);
        res.json(result);
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).send('Error fetching statistics');
    }
};



const getPriceRangeStats = async (req, res) => {
    const { month } = req.query;

    // Ensure the month is a valid number
    const monthNumber = parseInt(month, 10);
    if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        return res.status(400).json({ message: 'Invalid month. Please provide a month between 1 and 12.' });
    }

    try {
        const stats = await transactionInstance.getPriceRangeStats(monthNumber);
        res.json(stats);
    } catch (error) {
        console.error('Error fetching price range statistics:', error);
        res.status(500).send('Error fetching price range statistics');
    }
};


const getCategoryDistribution=async(req,res)=>{
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: "Month is required" });
    }

    try {
        const categoryDistribution = await transactionInstance.getCategoryDistribution(parseInt(month));
        res.json({ data: categoryDistribution });
    } catch (error) {
        console.error("Error in pie chart endpoint:", error);
        res.status(500).json({ error: "Failed to fetch pie chart data" });
    }
}


const getCombinedStats= async (req, res) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: "Month is required" });
    }

    try {
        // Call each of the service methods
        const statistics = await transactionInstance.getStatistics(parseInt(month));
        const barChartData = await transactionInstance.getPriceRangeStats(parseInt(month));
        const pieChartData = await transactionInstance.getCategoryDistribution(parseInt(month));

        // Combine the results into a single JSON response
        const combinedResponse = {
            statistics,
            barChartData,
            pieChartData
        };

        // Send the combined response
        res.json(combinedResponse);
    } catch (error) {
        console.error("Error in combined stats endpoint:", error);
        res.status(500).json({ error: "Failed to fetch combined stats" });
    }
};


module.exports={savingTransaction,getTransactions,getStatistics,getPriceRangeStats,getCategoryDistribution,getCombinedStats};