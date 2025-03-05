import { useState } from "react";
import SectionTitle from "../SectionTitle";
import Timer from "../Timer";
import ProductCard from "../ProductCard";

export default function FlashSale({ products, currentPage, setCurrentPage, totalPages }) {
  return (
    <section className="mt-6">
      <div className="mb-6">
        <section>
          <div className="flex justify-center items-center">
            <Timer initialTime={{ hours: 24, minutes: 0, seconds: 0 }} />
          </div>
          <SectionTitle title="Flash Sales" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-400 rounded text-white hover:bg-gray-500 shadow-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-400 rounded text-white hover:bg-gray-500 shadow-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </section>
  );
}
