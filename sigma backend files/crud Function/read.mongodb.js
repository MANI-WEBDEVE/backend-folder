use("dataBase");
db.createCollection("webler");
db.webler.insertMany([
  {
    name: "haris",
    NIC: 1212,
    price: 90,
  },
  {
    name: "Mani",
    NIC: 90909,
    price: 90,
  },
  {
    name: "sammer",
    NIC: 80808,
    price: 90,
  },
]);
//deleteMethod in database
// db.webler.updateMany({ Price: 90 }, { $set: { price: 1000 } });
//-------
//delete fun
db.webler.deleteMany({ price: 90 });
