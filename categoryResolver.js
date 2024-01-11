const { MongoClient } = require('mongodb');
var ObjectId = require('mongodb').ObjectId;
var dbb = require('../../config/collection');
var url = require('../../config/connection');


module.exports = {
    categorys: async () => {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            const db = client.db();
            const categorys = await db.collection(dbb.CATEGORY)
                .find({  })
                .sort({ _id: -1 })
                .toArray();
            client.close();
            if (categorys.length === 0) {
                throw new Error("No Record Found");
            }
        } catch (err) {
            throw err.message || "Some Error Occurred";
        }
    },
    
    createCategory: async ({ categoryInput }) => {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            const db = client.db();

            const result = await db.collection(dbb.CATEGORY).insertOne({
                ...categoryInput,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });

            client.close();
            if (result.insertedId) {
                return {
                    _id: result.insertedId,
                    ...categoryInput,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString()
                };
            }
            else {
                throw new Error("Category not created");
            }
        } catch (err) {
            throw err.message || "Some Error Occurred";
        }
    },

    deleteCategory: async ({ categoryId }) => {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            const db = client.db();

            const deletedCategory = await db.collection(dbb.CATEGORY).findOneAndDelete({ _id: ObjectId(categoryId) });

            client.close();

            if (deletedCategory.value) {
                return {
                    _id: deletedCategory.value._id,
                    ...deletedCategory.value,
                    deleted: true
                };
            } else {
                throw new Error("Category not found");
            }
        } catch (err) {
            throw err.message || "Some Error Occurred";
        }
    },

    updateCategory: async ({ category: { categoryId, updatedCategory } }) => {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            const db = client.db();

            const filter = { _id: ObjectId(categoryId) };
            const update = {
                $set: {
                    ...updatedCategory,
                    updatedAt: new Date().toISOString()
                }
            };
            const result = await db.collection(dbb.CATEGORY).findOneAndUpdate(filter, update, { returnDocument: 'after' });
            client.close();

            if (result.value) {
                return result.value;
            } else {
                throw new Error("Category not found");
            }
        } catch (err) {
            throw err.message || "Some Error Occurred";
        }
    },
    categoryById: async (args) => {
        try {
            const client = await MongoClient.connect(url, { useUnifiedTopology: true });
            const db = client.db();

            const category = await db.collection(dbb.CATEGORY).findOne({ _id: ObjectId(args) });

            client.close();

            if (!category) {
                throw new Error("Department not found");
            }

            return category;
        } catch (err) {
            throw err.message || "Some Error Occurred";
        }
    },

}

