const transactionModel = require('../Models/transaction.model');
class Transaction{
    savingTransaction=async(transactions)=>{
       try {
         const result =await transactionModel.insertMany(transactions)
         console.log(result); 
         return result;
       } catch (error) {
        console.error('Error saving transactions:', error);
        throw new Error('Failed to save transactions');
       }
    }
  
        getTransaction = async ({ page, perPage, search }) => {

            console.log('in getTransaction page')
            // Ensure valid input for page and perPage
            const pageNumber = Math.max(1, parseInt(page)); // Ensure page is at least 1
            const itemsPerPage = Math.max(1, parseInt(perPage)); // Ensure perPage is at least 1
            
            const skip = (pageNumber - 1) * itemsPerPage; // Calculate how many records to skip
            const limit = itemsPerPage;    // Set limit to records per page
            
            console.log(skip,limit,search);
            // Construct query based on search term
            const query = {};

    if (search) {
        // Check if the search term is a number
        const isNumber = !isNaN(search);
        if (isNumber) {
            // If it's a number, filter by price
            query.price = parseFloat(search); // Convert string to number
        } else {
            // If it's text, filter by title and description
            query.$or = [
                { title: { $regex: search, $options: 'i' } }, // Search in title
                { description: { $regex: search, $options: 'i' } }, // Search in description
            ];
        }
    }

    console.log('Query:', query); // Debugging line to see the constructed query

            
            try {
                // Fetch the records from the database
                const transactions = await transactionModel.find(query)
                    .skip(skip)
                    .limit(limit);
                
                // Get total count for pagination
                const totalCount = await transactionModel.countDocuments(query);
                
                // Return structured response
                return {
                    totalCount,
                    page: pageNumber,
                    perPage: itemsPerPage,
                    transactions: transactions.length ? transactions : [], // Always return an array
                };
            } catch (error) {
                console.error('Error fetching transactions:', error);
                throw new Error('Failed to get transactions');
            }  
        }
   

         testMatchStage = async (startDate, endDate) => {
            try {
                const result = await transactionModel.aggregate([
                    {
                        $match: {
                            date: { $gte: startDate, $lt: endDate },
                        },
                    },
                ]);
                console.log("Match Stage Result:", result);
               // return result;
            } catch (error) {
                console.error("Error in Match Stage:", error);
            }
        };

         checkDocumentsInDateRange = async (startDate, endDate) => {
            try {
                const documents = await transactionModel.find({
                    dateOfSale: { $gte: new Date(startDate), $lt: new Date(endDate) }
                });
        
                console.log("Documents found in date range:", documents);
                return documents;
            } catch (error) {
                console.error("Error fetching documents in date range:", error);
                throw new Error('Failed to fetch documents in date range');
            }
        };
        
       
        
        
        
        
        

        getStatistics = async (month) => {
          
            //  const result = await this.testFindDocuments(startDate,endDate)
         //const result=   await this.testMatchStage(startDate,endDate)

          // Example usage
        // const startDate = '2021-10-01'; // Replace with your desired start date
        // const endDate = '2021-10-31'; // Replace with your desired end date
        
    //  const result=  await this.checkDocumentsInDateRange(startDate, endDate);
    //      return result;

            // try {
            //     const totalSales = await transactionModel.aggregate([
            //         {
            //             $match: {
            //                 date: { $gte: startDate, $lt: endDate },
            //             },
            //         },
            //         {
            //             $group: {
            //                 _id: null,
            //                 totalAmount: { $sum: "$price" },
            //                 soldItems: { $sum: { $cond: ["$sold", 1, 0] } },
            //                 unsoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
            //             },
            //         },
            //     ]);
        
            //     return {
            //         totalSaleAmount: totalSales[0]?.totalAmount || 0,
            //         totalSoldItems: totalSales[0]?.soldItems || 0,
            //         totalUnsoldItems: totalSales[0]?.unsoldItems || 0,
            //     };
            // } catch (error) {
            //     console.error('Error calculating statistics:', error);
            //     throw new Error('Failed to calculate statistics');
            // }



            try {
                const statistics = await transactionModel.aggregate([
                    {
                        $match: {
                            $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            totalAmount: { $sum: "$price" },
                            soldItems: { $sum: { $cond: ["$sold", 1, 0] } },
                            unsoldItems: { $sum: { $cond: ["$sold", 0, 1] } },
                        },
                    },
                ]);
        
                return {
                    totalSaleAmount: statistics[0]?.totalAmount || 0,
                    totalSoldItems: statistics[0]?.soldItems || 0,
                    totalUnsoldItems: statistics[0]?.unsoldItems || 0,
                };
            } catch (error) {
                console.error("Error calculating statistics:", error);
                throw new Error("Failed to calculate statistics");
            }
        };





         getAllTransactions = async () => {
            try {
                const allTransactions = await transactionModel.find();
                console.log("All Transactions:", allTransactions);
                return allTransactions;
            } catch (error) {
                console.error("Error fetching all transactions:", error);
            }
        };
        
    
        

         getAllTransactionsByMonth = async (month) => {
           // this.getAllTransactions();
            console.log(month)
            try {
                const transactions = await transactionModel.find({
                    $expr: {
                        $eq: [{ $month: "$dateOfSale" }, month] // Match transactions with the specified month
                    }
                });
        
                console.log("Transactions for Month:", transactions);
                return transactions;
            } catch (error) {
                console.error("Error fetching transactions:", error);
                throw new Error('Error fetching transactions');
            }
        };
        
     
        





        async getPriceRangeStats(month) {

console.log(month);
const transactions = await transactionModel.find({
    $expr: {
        $eq: [{ $month: "$dateOfSale" }, month] // Match transactions with the specified month
    }
});
console.log(transactions);
    
                console.log(transactions)
                // Initialize counts for each price range
                const priceRanges = [
                    { range: '0-100', count: 0, min: 0, max: 100 },
                    { range: '101-200', count: 0, min: 101, max: 200 },
                    { range: '201-300', count: 0, min: 201, max: 300 },
                    { range: '301-400', count: 0, min: 301, max: 400 },
                    { range: '401-500', count: 0, min: 401, max: 500 },
                    { range: '501-600', count: 0, min: 501, max: 600 },
                    { range: '601-700', count: 0, min: 601, max: 700 },
                    { range: '701-800', count: 0, min: 701, max: 800 },
                    { range: '801-900', count: 0, min: 801, max: 900 },
                    { range: '901-above', count: 0, min: 901, max: Infinity },
                ];
    
                // Count items in each price range
                transactions.forEach(transaction => {
                    const price = transaction.price;
                    for (const range of priceRanges) {
                        if (price >= range.min && price <= range.max) {
                            range.count++;
                            break; // Exit loop once the range is found
                        }
                    }
                });
    
                return priceRanges; // Return the price range counts
            } catch (error) {
                console.error('Error fetching price range statistics:', error);
                throw new Error('Error fetching price range statistics');
            }





         getCategoryDistribution = async (month) => {
                try {
                    // Fetch transactions that match the specified month, regardless of year
                    const transactions = await transactionModel.aggregate([
                        {
                            $match: {
                                $expr: { $eq: [{ $month: "$dateOfSale" }, month] }
                            }
                        },
                        {
                            $group: {
                                _id: "$category",
                                itemCount: { $sum: 1 }
                            }
                        }
                    ]);
            
                    // Format data for the pie chart
                    const categoryDistribution = transactions.map((item) => ({
                        category: item._id,
                        count: item.itemCount
                    }));
            
                    return categoryDistribution;
                } catch (error) {
                    console.error("Error fetching category distribution:", error);
                    throw new Error("Failed to fetch category distribution");
                }
            };
            


        }
        
    


module.exports = Transaction;