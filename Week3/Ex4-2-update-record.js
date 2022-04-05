const {
    MongoClient
} = require('mongodb');

const uri =
    'mongodb+srv://Mohaziz:Hyf2020class35@cluster0.grzde.mongodb.net/world?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

client.connect((err) => {
    if (err) throw err;

    const collection = client.db('world').collection('city');

    collection.updateOne({
            ID: 4080
        }, {
            $set: {
                Population: 1700000
            }
        },
        (err) => {
            if (err) throw err;
            console.log('1 document updated');
            client.close();
        },
    );
});