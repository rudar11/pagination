import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / 10);

  const selectpageHandler = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= totalPages &&
      pageNumber !== page
    ) {
      setPage(pageNumber);
    }
  };

  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products
            .slice(page * 10 - 10, page * 10)
            .map((product) => {
              return (
                <span className="product__single" key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <span>{product.title}</span>
                </span>
              );
            })}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <span
            onClick={() => selectpageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disabled"}
          >
            ⬅️
          </span>

          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                key={i}
                className={
                  page === i + 1 ? "pagination__selected" : ""
                }
                onClick={() => selectpageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}

          <span
            onClick={() => selectpageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disabled"}
          >
            ➡️
          </span>
        </div>
      )}
    </div>
  );
};

export default App;