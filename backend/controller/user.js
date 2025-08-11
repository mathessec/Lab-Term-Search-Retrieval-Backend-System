import usersModel from "../model/user.js";
import loincModel from "../model/loinc.model.js";
import auth from "../utils/auth.js";

// Create User
const createUser = async (req, res) => {
  try {
    let user = await usersModel.findOne({ email: req.body.email });
    if (!user) {
      req.body.password = await auth.hashData(req.body.password);
      const newUser = await usersModel.create(req.body);

      res.status(201).send({
        message: "User Created Successfully",
        userId: newUser.id,
      });
    } else {
      res
        .status(400)
        .send({ message: `User with ${req.body.email} already exists!` });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

// Login
const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await usersModel.findOne({ email: email });
    if (user) {
      if (await auth.compareHash(user.password, password)) {
        const token = auth.createToken({
          email: user.email,
          name: user.name,
          id: user.id,
        });

        res.status(200).send({
          message: "Login Successful",
          token,
          id: user.id,
        });
      } else {
        res.status(400).send({ message: "Incorrect Password" });
      }
    } else {
      res
        .status(400)
        .send({ message: `User with email ${req.body.email} does not exist` });
    }
  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ message: error.message || "Internal Server Error" });
  }
};

// Search LOINC Terms
const searchLoinc = async (req, res) => {
  try {
    const { query, limit = 10, page = 1 } = req.query;

    if (!query || query.trim().length < 2) {
      return res.status(400).send({ 
        message: "Query parameter is required and must be at least 2 characters long" 
      });
    }

    const searchQuery = query.trim();
    const limitNum = Math.min(parseInt(limit) || 10, 50); // Max 50 results
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const skip = (pageNum - 1) * limitNum;

    // Build search criteria
    const searchCriteria = {
      $or: [
        // Exact LOINC code match (highest priority)
        { LOINC_NUM: { $regex: searchQuery, $options: 'i' } },
        
        // Text search across indexed fields
        { $text: { $search: searchQuery } },
        
        // Partial matches for specific fields
        { COMPONENT: { $regex: searchQuery, $options: 'i' } },
        { LONG_COMMON_NAME: { $regex: searchQuery, $options: 'i' } },
        { SHORTNAME: { $regex: searchQuery, $options: 'i' } },
        { RELATEDNAMES2: { $regex: searchQuery, $options: 'i' } }
      ]
    };

    // Execute search with pagination
    const [results, totalCount] = await Promise.all([
      loincModel
        .find(searchCriteria)
        .select('LOINC_NUM COMPONENT LONG_COMMON_NAME SHORTNAME PROPERTY SCALE_TYP METHOD_TYP EXAMPLE_UNITS')
        .sort({ score: { $meta: 'textScore' } })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      
      loincModel.countDocuments(searchCriteria)
    ]);

    // Calculate relevance score and sort results
    const scoredResults = results.map(result => {
      let relevanceScore = 0;
      const queryLower = searchQuery.toLowerCase();
      
      // Exact LOINC code match gets highest score
      if (result.LOINC_NUM && result.LOINC_NUM.toLowerCase().includes(queryLower)) {
        relevanceScore += 100;
      }
      
      // Component name matches
      if (result.COMPONENT && result.COMPONENT.toLowerCase().includes(queryLower)) {
        relevanceScore += 50;
      }
      
      // Long common name matches
      if (result.LONG_COMMON_NAME && result.LONG_COMMON_NAME.toLowerCase().includes(queryLower)) {
        relevanceScore += 30;
      }
      
      // Short name matches
      if (result.SHORTNAME && result.SHORTNAME.toLowerCase().includes(queryLower)) {
        relevanceScore += 20;
      }

      return {
        ...result,
        relevanceScore
      };
    });

    // Sort by relevance score (descending)
    const sortedResults = scoredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Remove relevanceScore from final response
    const finalResults = sortedResults.map(({ relevanceScore, ...rest }) => rest);

    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNext = pageNum < totalPages;
    const hasPrev = pageNum > 1;

    res.status(200).send({
      message: "Search completed successfully",
      query: searchQuery,
      results: finalResults,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalResults: totalCount,
        resultsPerPage: limitNum,
        hasNext,
        hasPrev
      },
      meta: {
        searchTime: new Date().toISOString(),
        resultCount: finalResults.length
      }
    });

  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ 
      message: error.message || "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get specific LOINC term by code
const getLoincByCode = async (req, res) => {
  try {
    const { code } = req.params;
    
    if (!code) {
      return res.status(400).send({ message: "LOINC code parameter is required" });
    }

    const loincTerm = await loincModel.findOne({ LOINC_NUM: code }).lean();

    if (!loincTerm) {
      return res.status(404).send({ message: `LOINC code ${code} not found` });
    }

    res.status(200).send({
      message: "LOINC term retrieved successfully",
      result: loincTerm
    });

  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ 
      message: error.message || "Internal Server Error" 
    });
  }
};

// Get LOINC statistics
const getLoincStats = async (req, res) => {
  try {
    const [
      totalCount,
      componentStats,
      scaleStats,
      propertyStats
    ] = await Promise.all([
      loincModel.countDocuments(),
      loincModel.aggregate([
        { $group: { _id: "$COMPONENT", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ]),
      loincModel.aggregate([
        { $group: { _id: "$SCALE_TYP", count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),
      loincModel.aggregate([
        { $group: { _id: "$PROPERTY", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 10 }
      ])
    ]);

    res.status(200).send({
      message: "LOINC statistics retrieved successfully",
      stats: {
        totalTerms: totalCount,
        topComponents: componentStats,
        scaleTypes: scaleStats,
        topProperties: propertyStats
      }
    });

  } catch (error) {
    console.log(`Error in ${req.originalUrl}`, error.message);
    res.status(500).send({ 
      message: error.message || "Internal Server Error" 
    });
  }
};

export default {
  createUser,
  login,
  searchLoinc,
  getLoincByCode,
  getLoincStats
};
