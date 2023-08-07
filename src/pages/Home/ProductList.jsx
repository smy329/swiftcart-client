import { StarIcon } from '@heroicons/react/20/solid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const oldproducts = [
  {
    id: 1,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    title: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    title: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    title: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    title: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 5,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    title: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
  {
    id: 6,
    name: 'Basic Tee',
    href: '#',
    thumbnail: 'https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg',
    title: "Front of men's Basic Tee in black.",
    price: '$35',
    color: 'Black',
  },
];

const ProductList = ({ isLoading, products, isError, error }) => {
  //in state.products, products is the reducer name
  //const { products, isError, error } = useSelector((state) => state.products);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProducts());
  // }, [dispatch]);

  // new Set() will take only the unique values
  const categories = new Set(products.map((p) => p.category));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {isLoading && <Spinner />}
          {products?.map((product) => (
            <Link key={product.id} to={`/product-details/${product.id}`}>
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-60">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.title}
                      </div>
                    </h3>
                    <div className="mt-1 text-sm text-gray-500 flex items-center">
                      <StarIcon className="h-5 w-5" /> &nbsp; {product.rating}
                    </div>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      ${Math.round(product.price - product.price * (product.discountPercentage / 100))}
                    </p>
                    <p className="text-sm line-through font-medium text-gray-500">${product.price}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
