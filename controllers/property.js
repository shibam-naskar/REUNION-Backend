const propertyModel = require('../models/property')

exports.addProperety = async (req, res) => {
  const user = req.user;
  const data = req.body;

  try {
    data['owner'] = user.id;
    const result = await propertyModel.create(data);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.updateProperty = async (req, res) => {
  const user = req.user;
  const id = req.params.id;
  const updates = req.body;

  try {
    const propertyToUpdate = await propertyModel.findOne({ _id: id, owner: user.id });

    if (!propertyToUpdate) {
      return res.status(404).json({ success: false, message: 'Property not found or unauthorized' });
    }

    Object.assign(propertyToUpdate, updates);

    const updatedProperty = await propertyToUpdate.save();

    return res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.deleteProperty = async (req, res) => {
  const user = req.user;
  const id = req.params.id;

  try {
    const propertyToDelete = await propertyModel.findOne({ _id: id, owner: user.id });

    if (!propertyToDelete) {
      return res.status(404).json({ success: false, message: 'Property not found or unauthorized' });
    }
    await propertyToDelete.deleteOne();

    return res.status(200).json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.listPropertiesByOwner = async (req, res) => {
  const user = req.user;

  try {
    const propertiesByOwner = await propertyModel.find({ owner: user.id });
    return res.status(200).json({ success: true, data: propertiesByOwner });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

exports.getFilteredProperties = async (req, res) => {
    try {
      const { city, availableFrom, fare, type } = req.query;
  
      
      const filter = {};
      if (city) filter.city = city;
      if (availableFrom) filter.availableFrom = { $lte: new Date(availableFrom) };
      if (fare) filter.fare = { $lte: fare };
      if (type) filter.type = type;

      console.log(new Date(availableFrom))
  
      
      const filteredProperties = await propertyModel.find(filter);
  
      return res.status(200).json({ success: true, data: filteredProperties });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };