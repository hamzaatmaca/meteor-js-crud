import React from "react";
import { ProductsCollection } from "../../api/products";
import { useSubscribe } from "meteor/react-meteor-data";
import { useTracker } from "meteor/react-meteor-data";
import { zeroValue } from "../Helpers/zeroValue";

const Home = React.memo(() => {
  const products = useTracker(() => ProductsCollection.find({}).fetch());
  const isLoading = useSubscribe("products");

  const nameRef = React.useRef();
  const brandRef = React.useRef();
  const priceRef = React.useRef();
  const descRef = React.useRef();

  const handleAddProduct = async () => {
    let obj = {
      name: nameRef.current.value,
      brand: brandRef.current.value,
      price: priceRef.current.value,
      description: descRef.current.value,
    };

    await Meteor.call("products.insert", obj, (err, res) => {
      if (err) console.log(err);
      console.log(res);
    });

    zeroValue(nameRef, brandRef, priceRef, descRef);
  };

  const handleDelete = async (product, key) => {
    await Meteor.call(
      "products.deleteOne",
      { _id: product._id },
      (err, res) => {
        if (err) console.log(err);
        console.log(res);
      }
    );
  };

  const handleEdit = async (product, key) => {
    await Meteor.call(
      "products.updateOne",
      {
        _id: product._id,
        name: "hamza",
        brand: "atmaca",
        price: "1990",
        description: "test",
      },
      (err, res) => {
        if (err) console.log(err);
        console.log(res);
      }
    );
  };

  const handleClear = () => {
    zeroValue(nameRef, brandRef, priceRef, descRef);
  };

  return (
    <div>
      <div className="row mt-5">
        <div className="col-sm-6">
          <h2>Product Add</h2>
          <div className="row mt-4">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                <b>Product Name</b>
              </label>
              <input
                ref={nameRef}
                type="text"
                className="form-control"
                placeholder="Please Enter Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                <b>Product Brand</b>
              </label>
              <input
                ref={brandRef}
                type="text"
                className="form-control"
                placeholder="Please Enter Brand"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                <b>Product Price</b>
              </label>
              <input
                ref={priceRef}
                type="number"
                min={0}
                className="form-control"
                placeholder="Please Enter Price"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                <b>Product Description</b>
              </label>
              <textarea
                ref={descRef}
                className="form-control"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <div className="row">
                <div className="col-sm-6 text-center">
                  <button
                    onClick={handleAddProduct}
                    className="btn btn-success "
                  >
                    Add Product
                  </button>
                </div>
                <div className="col-sm-6 text-center">
                  <button onClick={handleClear} className="btn btn-warning">
                    Clear All Inputs
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-sm-12 homeStyleTableContainer">
          <h2 className="mt-5 mb-4">List Product</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product Brands</th>
                <th scope="col">Product Price</th>
                <th scope="col">Product Description</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.isArray(products) &&
                products.map((val, key) => {
                  return (
                    <tr key={key}>
                      <th scope="row">{val._id}</th>
                      <td>{val.name}</td>
                      <td>{val.brands}</td>
                      <td>{val.price}</td>
                      <td>{val.description}</td>
                      <td>
                        <button
                          onClick={() => {
                            handleEdit(val, key);
                          }}
                          className="btn btn-primary"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pen-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                          </svg>
                        </button>
                        &nbsp;
                        <button
                          onClick={() => {
                            handleDelete(val, key);
                          }}
                          className="btn btn-danger"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash3"
                            viewBox="0 0 16 16"
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

export default Home;
