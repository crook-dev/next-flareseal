'use client';
import { useState } from 'react';
import Image from 'next/image';
import { FormattedProduct, FormattedVariant } from '@/types/shopify';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '@/context/cart-context';
import RelatedProducts from '@/components/products/related-products'; // Add this import

interface ProductDetailProps {
  product: FormattedProduct;
  collectionProducts?: FormattedProduct[]; // Add these props
  collectionTitle?: string;
}

export default function ProductDetail({ 
  product, 
  collectionProducts = [], 
  collectionTitle 
}: ProductDetailProps) {
  const { addItem, isInCart, getCartItem } = useCart();

  const [selectedVariant, setSelectedVariant] = useState<FormattedVariant>(product.variants[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); 

  const handleVariantChange = (variant: FormattedVariant) => {
    setSelectedVariant(variant);
    // If variant has its own image, switch to it
    if (variant.image) {
      const imageIndex = product.images.findIndex(img => img.id === variant.image?.id);
      if (imageIndex !== -1) {
        setSelectedImageIndex(imageIndex);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant.availableForSale) return;
    
    setIsAddingToCart(true);
    
    try {
      // Prepare cart item
      const cartItem = {
        variantId: selectedVariant.id,
        productId: product.id,
        productTitle: product.title,
        productHandle: product.handle,
        variantTitle: selectedVariant.title,
        price: selectedVariant.price,
        compareAtPrice: selectedVariant.compareAtPrice || undefined,
        currencyCode: selectedVariant.currencyCode,
        quantity,
        image: product.images[0] ? {
          url: product.images[0].url,
          altText: product.images[0].altText,
        } : undefined,
        availableForSale: selectedVariant.availableForSale,
      };
  
      // Add to cart
      addItem(cartItem);
      
      // Show success feedback
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setIsAddingToCart(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedVariant.currencyCode,
    }).format(price);
  };

  const isOutOfStock = !selectedVariant.availableForSale;
  const hasDiscount = selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price;
  const itemInCart = isInCart(selectedVariant.id);
  const cartItem = getCartItem(selectedVariant.id);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2 animate-slide-in-right">
          <Check size={20} />
          <span>Added to cart!</span>
        </div>
      )}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse">
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
                <div className="grid grid-cols-4 gap-6">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-25 ${
                        index === selectedImageIndex
                          ? 'ring-2 ring-indigo-500'
                          : 'ring-1 ring-gray-300'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <span className="sr-only">Image {index + 1}</span>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <Image
                          src={image.url}
                          alt={image.altText}
                          width={96}
                          height={96}
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Image */}
            <div className="w-full aspect-square max-w-[400px] mx-auto">
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-gray-100">
                {product.images[selectedImageIndex] ? (
                  <Image
                  src={product.images[selectedImageIndex].url}
                  alt={product.images[selectedImageIndex].altText}
                  width={400}
                  height={400}
                  quality={90}
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="w-full h-full object-center object-cover"
                  priority
                />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
                
                {/* Image Navigation for Mobile */}
                {product.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 sm:hidden">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2 h-2 rounded-full ${
                          index === selectedImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setSelectedImageIndex(index)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            {/* Title and Price */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold tracking-tight text-primary">
                {product.title}
              </h1>
              
              <div className="mt-3">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(selectedVariant.price)}
                  </span>
                  {hasDiscount && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        {formatPrice(selectedVariant.compareAtPrice!)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Save {formatPrice(selectedVariant.compareAtPrice! - selectedVariant.price)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Options</h3>
                <div className="grid grid-cols-2 gap-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant)}
                      className={`relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        selectedVariant.id === variant.id
                          ? 'border-indigo-600 ring-2 ring-indigo-500 bg-indigo-50'
                          : 'border-gray-300'
                      } ${
                        !variant.availableForSale
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={!variant.availableForSale}
                    >
                      <span>{variant.title}</span>
                      {!variant.availableForSale && (
                        <span className="absolute inset-0 rounded-md border-2 border-gray-200">
                          <svg
                            className="absolute inset-0 w-full h-full text-gray-200"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                          >
                            <line x1="0" y1="100" x2="100" y2="0" vectorEffect="non-scaling-stroke" />
                          </svg>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Add to Cart */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <label htmlFor="quantity" className="text-sm font-medium text-gray-900">
                  Quantity
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="max-w-full rounded-md border border-gray-300 py-1.5 px-3 text-base leading-5 font-medium text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock || isAddingToCart}
                  className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    isOutOfStock
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  } ${isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isAddingToCart ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>

                {/* Cart Status */}
                {itemInCart && (
                  <div className="text-center p-2 bg-green-50 border border-green-200 rounded-md">
                    <span className="text-sm text-green-700">
                      ✓ In cart ({cartItem?.quantity} {cartItem?.quantity === 1 ? 'item' : 'items'})
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium text-primary mb-4">Product Details</h3>
              
              {product.description && (
                <div className="prose prose-sm max-w-none text-gray-500 mb-6">
                  <p>{product.description}</p>
                </div>
              )}

              {/* Product Specs */}
              <div className="grid grid-cols-1 gap-4">
                {product.vendor && (
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-primary">Brand</span>
                    <span className="text-gray-500">{product.vendor}</span>
                  </div>
                )}
                {product.productType && (
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="font-medium text-primary">Type</span>
                    <span className="text-gray-500">{product.productType}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-primary">SKU</span>
                  <span className="text-gray-500">{selectedVariant.id.split('/').pop()}</span>
                </div>
                {selectedVariant.quantityAvailable !== undefined && (
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-primary">Stock</span>
                    <span className="text-gray-500">
                      {selectedVariant.quantityAvailable > 0 
                        ? `${selectedVariant.quantityAvailable} available` 
                        : 'Out of stock'
                      }
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section - ADD THIS */}
      {collectionProducts.length > 0 && (
        <RelatedProducts 
          currentProductId={product.id}
          collectionProducts={collectionProducts}
          collectionTitle={collectionTitle}
          maxProducts={4}
        />
      )}
    </>
  );
}