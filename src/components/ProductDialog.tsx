import type { Product } from "../utils/types";

type Props = {
  product: Product;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl p-6 relative shadow-lg flex gap-6">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl"
        >
          ✕
        </button>
        <div className="w-1/2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-80 object-cover rounded-md"
          />
        </div>

        {/* Detalles a la derecha */}
        <div className="w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
              {product.description}
            </p>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Cantidad: {product.stock}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
            Descuento: -%{product.discountPercentage}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "text-yellow-300"
                        : "text-gray-200 dark:text-gray-600"
                    }`}
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                ))}
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                {product.rating}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
