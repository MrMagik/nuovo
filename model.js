const mongoose = require("mongoose");
mongoose
  .connect("mongodb://prova12:prova12@ds131721.mlab.com:31721/prova")
  // .connect("mongodb://localhost/playground")
  .then(() => console.log("connesso al database"))
  .catch(err => console.error("Could not connect to mongdodb...", err)); //connettiamo mongoose al nostro localhost mongodb server, quando applicheremo la nostra applicazione in production environment useremo un differente connection string o connection environment
//schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  id: Number,
});
//model
const Course = mongoose.model("Tests", courseSchema);

async function addDocuments(req, res) {
  let newObject = new Course({
    name: req.body.name,
    author: req.body.name,
    id: 1,
  });
  try {
    const result = await newObject.save(); //save è asincrona, perchè ci vorrà del tempo perchè si salvi l'oggetto nel database, perchè acceddiamo ad un file sistem. Quindi ritorna una promise
    console.log(result);
    res.status(200).send(result);
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}

async function getDocuments(res) {
  try {
    let documents = await Course.find();
    res.status(200).send(documents);
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}
async function getDocumentByName(req, res) {
  try {
    let document = await Course.findOne({ name: req.params.name });
    if (!document) return res.status(404).send("Not found");
    res.status(200).send(document);
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}

async function deleteDocumentByName(req, res) {
  try {

    let document = await getDocumentByName(req, res);

    if (!document) return res.status(404).send("Not found");

    await Course.deleteOne({name : req.params.name});
      
    res.status(200).send(document);
  
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }
}

async function updateDocumentByName(req, res) {
  try {

    let document = await Course.findOneAndUpdate({name : req.params.name}, {name : req.body.name}, {new : true});//new:true permette di ottenere il documento modificato

    if (!document) return res.status(404).send("Not found");
      
    res.status(200).send(document);
  
  } catch (e) {
    for (field in e.errors) {
      console.log(ex.errors[field].message);
      res.status(500).send(ex.errors[field].message);
    }
  }

}
module.exports.addDocuments = addDocuments;
module.exports.getDocuments = getDocuments;
module.exports.getDocumentByName = getDocumentByName;
module.exports.deleteDocumentByName = deleteDocumentByName;
module.exports.updateDocumentByName = updateDocumentByName;