import React, { useState } from 'react';
import { Upload, Package, DollarSign, Hash, Image, CreditCard, Home } from 'lucide-react';

const AddProduct = () => {
  const [showOnHome, setShowOnHome] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleAddProduct = (e) =>{
    e.preventDefault();
    const form = e.target;
    const productName = form.productName.value;
    const description = form.description.value;
    const category = form.category.value;
    const price = form.price.value;
    const quantity = form.quantity.value;
    const moq = form.moq.value;
    const productImage = form.productImage.files;
    const paymentOption = form.paymentOption.value;

    const formData = {
      productName,
      description,
      category,
      price, 
      quantity,
      moq,
      productImage,
      paymentOption,
      showOnHome
    }
    console.log(formData);

  }

  return (
    <div className="w-full p-2 sm:p-4 md:p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="max-w-4xl mx-auto">
        
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 ml-3">Add New Product</h2>

        {/* Form */}
        <form onSubmit={handleAddProduct} className="bg-white rounded-2xl shadow-lg border border-slate-200">
          <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 sm:space-y-6">
            
            {/* Product Name */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                Product Name / Title
              </label>
              <input
                type="text"
                name="productName"
                placeholder="Enter product name"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
              />
            </div>

            {/* Product Description */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                Product Description
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Write detailed product information..."
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none placeholder:text-slate-400"
              ></textarea>
            </div>

            {/* Category & Payment Options Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Category */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Category
                </label>
                <select
                  name="category"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="" disabled selected>Select category</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Pant">Pant</option>
                  <option value="Jacket">Jacket</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              {/* Payment Options */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  Payment Options
                </label>
                <select
                  name="paymentOption"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.75rem center',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  <option value="" disabled selected>Select payment option</option>
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Payfirst">Payfirst</option>
                </select>
              </div>
            </div>

            {/* Price, Quantity, MOQ Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Price */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                  Price (BDT)
                </label>
                <div className="relative">
                  <span className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-500 font-semibold text-sm sm:text-base">৳</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="0.00"
                    className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Available Quantity */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  Available Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  placeholder="0"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                />
              </div>

              {/* MOQ */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                  <Hash className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                  MOQ
                </label>
                <input
                  type="number"
                  name="moq"
                  placeholder="0"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                <Image className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-500" />
                Upload Product Images
              </label>
              <div className="relative">
                <input
                  type="file"
                  name="productImage"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="flex flex-col items-center justify-center w-full px-3 sm:px-4 py-6 sm:py-8 bg-linear-to-br from-purple-50 to-indigo-50 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-purple-500 hover:bg-purple-100 transition-all duration-200"
                >
                  <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 mb-2 sm:mb-3" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    {selectedFiles.length > 0
                      ? `${selectedFiles.length} file(s) selected`
                      : 'Click to upload or drag and drop'}
                  </span>
                  <span className="text-xs text-slate-500 mt-1">PNG, JPG, WEBP (MAX. 5MB)</span>
                </label>
              </div>
              {selectedFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="px-2 sm:px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs sm:text-sm font-medium">
                      {file.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Show on Home Page Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-linear-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-white rounded-lg shadow-sm">
                  <Home className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-700">Show on Home Page</p>
                  <p className="text-xs text-slate-500">Display this product on the homepage</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="showOnHome"
                  checked={showOnHome}
                  onChange={(e) => setShowOnHome(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 sm:w-14 sm:h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-1 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 sm:after:h-6 sm:after:w-6 after:transition-all peer-checked:bg-linear-to-r peer-checked:from-blue-500 peer-checked:to-indigo-600"></div>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 sm:py-4 text-sm sm:text-base bg-linear-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Product to Inventory
            </button>

          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;