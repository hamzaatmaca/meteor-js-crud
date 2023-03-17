//IMPORT ALL MODELS
import { inputProducts, outputProducts } from "./Models/productModel";

//RUN ALL MODELS

/**
 * @param {products}
 * Products Crud Operations
 */

Meteor.startup(() => {
  inputProducts();
  outputProducts();
});
