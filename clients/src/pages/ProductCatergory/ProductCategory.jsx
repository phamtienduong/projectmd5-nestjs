import React, { useEffect, useState } from 'react'
import "./ProductCategory.css"
import axios from 'axios'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import publicAxios from '../../config/publicAxios';


// tương tự như trang prrudct nhưng sẽ lọc sản phẩm theo category trước khi in và
// dùng isLoad để load lại dữ liệu khi đang ở trang này
export default function ProductCategory({ isLoad }) {



    const navigate = useNavigate()  
    const categoryId = JSON.parse(localStorage.getItem("categoryId"))
    const [products, setProducts] = useState([]);
    const [productTotal, setProductTotal] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(6)
    console.log(categoryId);

    const renderPage = () => {
        const page = []
        for (let i = 0; i < productTotal; i++) {
            page.push(
                <a
                    key={i}
                    href="#"
                    aria-current="page"
                    className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
              ${(i + 1) == currentPage ? "bg-indigo-600" : "white"}
              ${(i + 1) == currentPage ? "text-white" : "text-black"}
              `}
                    onClick={() => setCurrentPage(i + 1)}
                >
                    {i + 1}
                </a>
            )
        }
        return page
    }

    const handleUpDownPage = (status) => {
        switch (status) {
            case 0:
                if (currentPage == 1) {
                    setCurrentPage(productTotal)
                } else {
                    setCurrentPage(currentPage - 1)
                }
                break
            case 1:
                if (currentPage == productTotal) {
                    setCurrentPage(1)
                } else {
                    setCurrentPage(currentPage + 1)
                }
                break
        }
    }

    useEffect(() => {
        const start = (currentPage-1)*pageSize
        let end = start + pageSize
        const getProducts = async () => {
            try {
                const res = await publicAxios.get(`/api/v1/products/category/${categoryId}`)
                console.log(res.data.data);
                const data = res.data.data
                if (end > data.length) {
                    end = data.length
                }
                const newProduct = data.slice(start, end)
                setProductTotal(Math.ceil(data.length / pageSize))
                setProducts(newProduct)
            } catch (error) {
                console.log(error);
            }
        }
        getProducts()
        
    }, [currentPage,isLoad,pageSize])

    const handleClickProduct = (id) => {
        localStorage.setItem("idProductDetail", id)
        navigate(`/productDetail/${id}`)
    }

    return (

        <div>
            <div className='collection-body'>
                {products.map((item) => (
                    <div className="product-item" key={item.product_id}>
                        <div className="product-img" onClick={() => handleClickProduct(item.product_id)}>
                        <div className="img_sale_1">
                                <span>SALE {(item.discount)*100 + "%"}</span>
                        </div>
                            <a ><img src={item.image} alt="img" /></a>
                        </div>
                        <div className="product-detail font-sans">
                            <h3><a>{item.product_name}</a></h3>
                        </div>
                        <div className="box-pro-prices">
                            <span className='line-through'>{Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                            <span className='text-red-500 ml-2' id="price_product" >{Number((item?.price)*(1-item.discount)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>   
                        </div>
                    </div>
                ))}

            </div>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-center">
                    <div>

                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                                onClick={() => handleUpDownPage(0)}
                                href="#"
                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {renderPage()}
                            <a
                                onClick={() => handleUpDownPage(1)}
                                href="#"
                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                    </div>
                </div>
            </div>




            <Outlet />
        </div>
    )
}
