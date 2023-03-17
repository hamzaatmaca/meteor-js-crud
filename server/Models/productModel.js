import { Meteor } from "meteor/meteor";
import { ProductsCollection } from "../../imports/api/products";

export const inputProducts = () => {
  return Meteor.methods({
    "products.insert": ({ name, brand, price, description }) => {
      return ProductsCollection.insert({
        name,
        brand,
        price,
        description,
      });
    },
    "products.deleteOne": ({ _id }) => {
      return ProductsCollection.remove({
        _id,
      });
    },
    "products.updateOne": ({ _id, name, brand, price, description }) => {
      return ProductsCollection.update(
        { _id: _id },
        {
          name: name,
          brand: brand,
          price: price,
          description: description,
        }
      );
    },
  });
};

export const outputProducts = () => {
  return Meteor.publish("products", function () {
    return ProductsCollection.find();
  });
};
