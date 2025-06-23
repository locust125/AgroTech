import { useState, useEffect } from "react";
import type { ProductL } from "../utils/types";
import { toast } from "react-toastify";

type Props = {
  onSubmit: (product: ProductL) => void;
  initialData?: ProductL | null;
};

export default function ProductForm({ onSubmit, initialData }: Props) {
  const [formData, setFormData] = useState<ProductL>({
    id: Date.now(),
    title: "",
    price: 0,
    rating: 0,
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "rating" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit(formData);
      toast.success(
        initialData ? "Producto actualizado con éxito" : "Producto agregado"
      );
    } catch (error) {
      toast.error("Ocurrió un error al guardar el producto");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        {initialData ? "Editar Producto" : "Nuevo Producto"}
      </h2>

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Título del producto
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Ej: Fertilizante orgánico"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Descripción
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Ej: Ideal para cultivos ecológicos..."
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Precio (MXN)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Ej: 120"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label
          htmlFor="rating"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Calificación (0 a 5)
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Ej: 4.5"
          step="0.1"
          min="0"
          max="5"
          required
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {initialData ? "Actualizar" : "Agregar"}
      </button>
    </form>
  );
}
