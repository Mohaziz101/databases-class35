const {
    MongoClient
} = require('mongodb');

const uri =
    'mongodb+srv://Mohaziz:Hyf2020class35@cluster0.grzde.mongodb.net/world?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect(async (err) => {
    if (err) throw err;

    const collection = client.db('world').collection('city');

    await collection.deleteOne({
        ID: 4080
    });

    client.close();
});