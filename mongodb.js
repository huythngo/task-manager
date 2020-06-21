const { MongoClient, ObjectID } = require("mongodb");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log("unable to connect to database");
  }
  const db = client.db(databaseName);

  //   db.collection("tasks").insertMany(
  //     [
  //       {
  //         description: "first task",
  //         completed: true,
  //       },
  //       {
  //         description: "second task",
  //         completed: false,
  //       },
  //     ],
  //     (err, result) => {
  //       if (err) {
  //         return console.log(err);
  //       }
  //       console.log(result.ops);
  //     }
  //   );
  //   db.collection("tasks").findOne(
  //     { _id: new ObjectID("5eeab9d328ad51508c4a1aa6") },
  //     (err, task) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(task);
  //       }
  //     }
  //   );
  //   db.collection("tasks")
  //     .find({})
  //     .toArray((err, tasks) => {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log(tasks);
  //       }
  //     });

  //   db.collection("tasks")
  //     .updateMany({ completed: false }, { $set: { completed: true } })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  db.collection("tasks")
    .deleteOne({ description: "first task" })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
