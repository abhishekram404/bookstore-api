const errorHandler = require("../../utils/errorHandler");
const Order = require("../../models/Order");

exports.confirmOrder = async (req, res) => {
  try {
    const {
      fullName,
      email,     
      phone,    
      city,
      area,
      bookName,
      price,
    } = req.body;

 
    const order = await Order.create({
      fullName,
      email,  
      phone,
      city, 
      area, 
      bookName,
      price,      
    });

    return res.status(200).json(order);
  } catch (error) {
    errorHandler({ error, res });
  }
};
