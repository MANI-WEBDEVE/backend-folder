//sab sa phle data base ka name batao us ka syntex kuch assa ha
// use("crudbd");
// console.log(db);
//ya syntex batabase ki collection ka liya kam karta ha
// db.createCollection("course");

//insertone ak document bana ka liya kam ata ha
// db.course.insertOne({
//   name: "inam",
//   course: "Metavers",
//   price: "900000",
// });
//insertMany ya ak nahi balka buhat sara document create karna ka kam ata ha is ka syntex kuch asa ha
// Inserting more documents into a MongoDB collection
//db.course.insertMany([
// {
//   name: "Alice",
//   course: "Virtual Reality",
//   price: 750000,
// },
// {
//   name: "Bob",
//   course: "Augmented Reality",
//   price: 820000,
// },
// {
//   name: "Eva",
//   course: "Blockchain in Metaverse",
//   price: 950000,
// },
// {
//   name: "Charlie",
//   course: "Artificial Intelligence in Metaverse",
//   price: 880000,
// },
// {
//   name: "David",
//   course: "Game Development",
//   price: 700000,
// },
//]);
//----------------
//jab hum koi document read karta ha tu ya function istamal karta ha "{to.Array()}"
// let a = db.course.find({ price: 750000 });
// console.log(a.toArray());
//---------
//jab huma koi ak document read karana hota ha tu ya wala istamal karta ha
// let b = db.course.findOne({ price: 700000 });
// console.log(b);
//------------
//yar ham logo ko jab doument update karna parta ha tu ha "{update}" ka istamal karta ha
// db.course.updateMany({ price: 750000 }, { $set: { price: 0 } });
// //-------
// db.course.updateMany({ price: "" }, { $set: { price: 0 } });
//--------------
//ek or function ha delete name sa zahir ha ka ya document delete ka liya kam karta ha

db.course.deleteMany({ price: 0 });
