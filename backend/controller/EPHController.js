const EPHModel = require("../models/EPHSchema");

let EPHGet = async (req, res) => {
  try{
    let EPHData = await EPHModel.find();
    res.status(200).json(EPHData)
  }catch(err) {
    res.status(500).json(err);
  }
};

let EPHInsert = (req, res) => {
  const { projectDone, client } = req.body;
  let data = new EPHModel({
    projectDone: projectDone,
    client: client,
  });

  data.save().then(()=> {
    res.send({message: "saved", data})
  })
};


module.exports = {EPHGet, EPHInsert}