import { useEffect, useState } from "react";
import ProductForm from "../../components/ProductForm";
import type { ProductL } from "../../utils/types";

export default function ProductManager() {
  const [products, setProducts] = useState<ProductL[]>([]);
  const [editingProduct, setEditingProduct] = useState<ProductL | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const saveToLocalStorage = (data: ProductL[]) => {
    localStorage.setItem("products", JSON.stringify(data));
  };

  const handleSubmit = (product: ProductL) => {
    let updatedProducts;
    if (editingProduct) {
      // PUT (editar)
      updatedProducts = products.map((p) =>
        p.id === product.id ? product : p
      );
    } else {
      // POST (nuevo)
      updatedProducts = [...products, product];
    }

    setProducts(updatedProducts);
    saveToLocalStorage(updatedProducts);
    setEditingProduct(null);
    setIsModalOpen(false);
  };

  const handleEdit = (product: ProductL) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveToLocalStorage(updated);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-dark:text-white text-center">
        AgrotechAdmin
        </h1>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Lista de productos
        </h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear producto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {product.description}
              </p>

              {/* Calificación con estrellas */}
              <div className="flex items-center mb-3">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.round(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 22 20"
                      aria-hidden="true"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                  {product.rating.toFixed(1)}
                </span>
              </div>

              <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                ${product.price}
              </p>
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="flex-1 bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition-colors"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black dark:text-white text-xl"
            >
              ✕
            </button>
            <ProductForm onSubmit={handleSubmit} initialData={editingProduct} />
          </div>
        </div>
      )}
    </div>
  );
}
