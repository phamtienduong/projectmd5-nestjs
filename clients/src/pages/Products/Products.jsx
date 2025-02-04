import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react'
import './Product.css'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import publicAxios from '../../../../admin/src/config/publicAxios';
import { SlidersOutlined } from '@ant-design/icons';
import { Button, Checkbox, Modal, Radio, Select, Slider, Space } from 'antd';
import { Option } from 'antd/es/mentions';

export default function Products() {
  // dùng để chuyển trang
  const navigate = useNavigate()
  // lưu sản phẩm
  const [products, setProducts] = useState([]);
  // số trang
  const [productTotal, setProductTotal] = useState(0)
  // trang hiện tại
  const [currentPage, setCurrentPage] = useState(1)
  // số sp trong một trang
  const [pageSize, setPageSize] = useState(6)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    // hien thi modal
    setIsModalOpen(true);

  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // input range
  const [disabled, setDisabled] = useState(false);
  const [max, setMax] = useState(1000000);
  const [min, setMin] = useState(0);
  const [order, setOrder] = useState("")
  // const [flag,setFlag]= useState(false)
  const onChangeSlider = (value) => {
    const [minPrice, maxPrice] = value;
    setMin(minPrice);
    setMax(maxPrice);

    // if (maxPrice < 1500000) {
    // } else {
    //   setMin(minPrice);
    //   setMax(1500000);
    // }
    
  };
  console.log(min, max);



  // vẽ danh sách các trang
  const renderPage = () => {
    // mảng lưu kết quả giao diện dùng để vẽ
    const page = []
    // lặp qua số trang để vẽ
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

  // đánh dấu trang hiện tại
  const handleUpDownPage = (status) => {
    // status quyết định lên trang hay lùi trang
    switch (status) {
      // 0 là lùi
      case 0:
        if (currentPage == 1) {
          setCurrentPage(productTotal)
        } else {
          setCurrentPage(currentPage - 1)
        }
        break
      // 1 là tăng
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
    const start = (currentPage - 1) * pageSize
    let end = (start) + pageSize
    // lấy thông tin tất cả product
    const getProducts = async () => {
      const result = await publicAxios.get(`/api/v1/products/list?min=${min}&max=${max}&orderBy=${order}`)
      // console.log("max1", max);
      // console.log("result", result);
      const data = result.data.data
      if (end > data.length) {
        end = data.length
      }
      const newProduct = data.slice(start, end)

      setProductTotal(Math.ceil(data.length / pageSize))
      setProducts(newProduct)
    }
    getProducts()
  }, [currentPage, pageSize, min, max, order])
  // chọn sản phẩm để chuyển trang
  const handleClickProduct = (id) => {
    // lưu thông tin id sp lên local
    localStorage.setItem("idProductDetail", id)
    // chuyển trang
    navigate(`/productDetail/${id}`)
  }
  // console.log("max", max);
  // console.log("min", min);
  // console.log("order", order);

  // console.log("products",products);
  return (
    <div>
      <div className='' >
        <a>
          <img src="https://file.hstatic.net/200000549029/file/1920x500_7170ea382c674d1bb52fc2192f97ba80.jpg" alt="img" />
        </a>
      </div>
      <div className='ml-5 text-3xl '>
        <Button className='text-black' icon={<SlidersOutlined />} size="large" shape="round" type="primary" onClick={showModal}>
          Lọc Theo
        </Button>
        <Modal title="Lọc Theo" open={isModalOpen} onCancel={handleCancel} footer={<div>
          <Button danger onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleOk}>
            Ok
          </Button>
        </div>}>
          <p>Giá sản phẩm : </p>
          <Slider range
            min={0}
            max={1000000}
            step={50000}
            defaultValue={[0, 1000]} // Giá trị mặc định từ 0 đến 1000
            onChange={onChangeSlider} />
          <p>Sắp xếp theo:</p>
          <Radio.Group >
            <Space direction="vertical">
              <Radio value={"ASC"} onChange={() => setOrder("ASC")}>Giá tăng dần</Radio>
              <Radio value={"DESC"} onChange={() => setOrder("DESC")}>Giá giảm dần</Radio>
            </Space>
          </Radio.Group>
          {/* <Checkbox value={"ASC"} disabled={true}  onChange={()=>setMax("ASC")}>Giá tăng dần</Checkbox> 
        <br></br>
        <Checkbox value={"DESC"} disabled={true}  onChange={()=>setMin("DESC")}>Giá tăng dần</Checkbox> */}
        </Modal>
      </div>

      <div className=' flex col collection-body'>
        {products.map((item) => (
          <div className="product-item" key={item.product_id}>
            <div className="product-img" onClick={() => handleClickProduct(item.product_id)}>
              {item.discount == 0 ? <></> : <div className="img_sale_1">
                <span>SALE {(item.discount) * 100 + "%"}</span>
              </div>}
              {/* <div className="img_sale_1">
                <span>SALE {(item.discount)*100+"%"}</span>
              </div> */}
              <a ><img src={item.image} alt="img" /></a>
            </div>
            <div className="product-detail font-sans">
              <h3><a>{item.product_name}</a></h3>
            </div>
            <div className="box-pro-prices">
              <span className='line-through'>{Number(item.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
              <span className='text-red-500 ml-2' id="price_product" >{Number((item?.price) * (1 - item.discount)).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
            </div>
          </div>
        ))}
      </div>
      <div >
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
      </div>

      <Outlet />
    </div>
  )
}
