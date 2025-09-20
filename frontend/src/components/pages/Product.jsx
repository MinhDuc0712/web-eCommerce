import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import img from '@/assets/image/vot-cau-long.jpg'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { ChevronDown, Eye, Filter, Grid, List, Star, Package } from "lucide-react";

// Mock data cho các danh mục sản phẩm
const categoryData = {
  'ao': {
    title: 'Áo thun',
    description: 'Áo thun nam nữ chất lượng cao, đa dạng mẫu mã',
    products: [
      {
        products_id: 1,
        product_id: "AT001",
        name_products: "Áo thun cotton premium basic",
        category_name: "Áo thun",
        price: 299000,
        original_price: 399000,
        description: "Áo thun cotton 100% mềm mại, thấm hút mồ hôi tốt",
        featured: true
      },
      {
        products_id: 3,
        product_id: "AT001",
        name_products: "Áo thun cotton premium basic",
        category_name: "Áo thun",
        price: 299000,
        original_price: 399000,
        description: "Áo thun cotton 100% mềm mại, thấm hút mồ hôi tốt",
        featured: true
      },
      {
        products_id: 4,
        product_id: "AT001",
        name_products: "Áo thun cotton premium basic",
        category_name: "Áo thun",
        price: 299000,
        original_price: 399000,
        description: "Áo thun cotton 100% mềm mại, thấm hút mồ hôi tốt",
        featured: true
      },
      {
        products_id: 5,
        product_id: "AT001",
        name_products: "Áo thun cotton premium basic",
        category_name: "Áo thun",
        price: 299000,
        original_price: 399000,
        description: "Áo thun cotton 100% mềm mại, thấm hút mồ hôi tốt",
        featured: true
      },
      {
        products_id: 6,
        product_id: "AT001",
        name_products: "Áo thun cotton premium basic",
        category_name: "Áo thun",
        price: 299000,
        original_price: 399000,
        description: "Áo thun cotton 100% mềm mại, thấm hút mồ hôi tốt",
        featured: true
      },
      {
        products_id: 7,
        product_id: "AT001",
        name_products: "Áo thun cotton premium basic",
        category_name: "Áo thun",
        price: 299000,
        original_price: 399000,
        description: "Áo thun cotton 100% mềm mại, thấm hút mồ hôi tốt",
        featured: true
      },
      {
        products_id: 2,
        product_id: "AT002", 
        name_products: "Áo thun polo nam cao cấp",
        category_name: "Áo thun",
        price: 459000,
        original_price: 599000,
        description: "Áo polo thiết kế sang trọng, phù hợp đi làm"
      }
    ]
  },
  'quan': {
    title: 'Quần jean',
    description: 'Quần jean nam nữ thời trang, form chuẩn',
    products: [
      {
        products_id: 3,
        product_id: "QJ001",
        name_products: "Quần jean slim fit nam",
        category_name: "Quần jean", 
        price: 650000,
        original_price: 850000,
        description: "Quần jean form slim vừa vặn, chất liệu denim cao cấp"
      },
      {
        products_id: 4,
        product_id: "QJ002",
        name_products: "Quần jean nữ ống rộng vintage",
        category_name: "Quần jean",
        price: 720000,
        original_price: null,
        description: "Quần jean vintage phong cách retro, tôn dáng"
      }
    ]
  },
  'giay': {
    title: 'Giày dép',
    description: 'Giày dép thời trang, sneaker, sandal chất lượng',
    products: [
      {
        products_id: 5,
        product_id: "GD001",
        name_products: "Sneaker thể thao nam Nike Air Max",
        category_name: "Giày dép",
        price: 2290000,
        original_price: 2690000,
        description: "Giày thể thao Nike Air Max với công nghệ đệm khí"
      },
      {
        products_id: 6,
        product_id: "GD002",
        name_products: "Sandal nữ thời trang Adidas",
        category_name: "Giày dép", 
        price: 890000,
        original_price: null,
        description: "Sandal êm chân, thiết kế hiện đại phù hợp mọi hoàn cảnh",
        featured: true
      }
    ]
  },
  'phu-kien': {
    title: 'Phụ kiện',
    description: 'Phụ kiện thời trang: túi xách, ví, mũ, thắt lưng',
    products: [
      {
        products_id: 7,
        product_id: "PK001", 
        name_products: "Túi xách nữ da thật cao cấp",
        category_name: "Phụ kiện",
        price: 1250000,
        original_price: 1650000,
        description: "Túi xách da thật, thiết kế sang trọng, nhiều ngăn tiện dụng"
      },
      {
        products_id: 8,
        product_id: "PK002",
        name_products: "Ví nam da bò thật 100%", 
        category_name: "Phụ kiện",
        price: 450000,
        original_price: 650000,
        description: "Ví nam da bò thật, compact nhỏ gọn, nhiều ngăn thẻ"
      }
    ]
  }
};

// Brands data for filter
const brandsData = [
  { id: "nike", name: "Nike" },
  { id: "adidas", name: "Adidas" },  
  { id: "puma", name: "Puma" },
  { id: "uniqlo", name: "Uniqlo" },
  { id: "zara", name: "Zara" },
  { id: "h&m", name: "H&M" }
];

const Products = () => {
  const { category } = useParams(); // Lấy category từ URL params
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState({
    price: [],
    brand: [],
    sort: "default",
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Lấy dữ liệu category hiện tại
  const currentCategory = category ? categoryData[category] : null;

  const getDiscountPercent = (original, current) => {
    if (!original || original <= current) return null;
    return Math.round(((original - current) / original) * 100);
  };

  const priceRanges = [
    { id: "price1", label: "Dưới 500.000đ", min: 0, max: 500000 },
    { id: "price2", label: "500.000đ - 1 triệu", min: 500000, max: 1000000 },
    { id: "price3", label: "1 triệu - 2 triệu", min: 1000000, max: 2000000 },
    { id: "price4", label: "2 triệu - 3 triệu", min: 2000000, max: 3000000 },
    { id: "price5", label: "Trên 3 triệu", min: 3000000, max: null },
  ];

  useEffect(() => {
    // Reset filters khi chuyển category
    setFilters({
      price: [],
      brand: [],
      sort: "default",
    });
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    
    // Fetch products cho category hiện tại
    fetchProductsByCategory();
  }, [category]);

  useEffect(() => {
    // Apply filters when filters change
    applyFilters();
  }, [filters]);

  const fetchProductsByCategory = () => {
    setLoading(true);
    
    setTimeout(() => {
      if (category && categoryData[category]) {
        const categoryProducts = categoryData[category].products;
        // Duplicate products để có nhiều sản phẩm hơn cho demo
        const duplicatedProducts = [];
        for (let i = 0; i < 3; i++) {
          categoryProducts.forEach((product, index) => {
            duplicatedProducts.push({
              ...product,
              products_id: product.products_id + (i * 100) + index,
              product_id: `${product.product_id}_${i}${index}`
            });
          });
        }
        
        setProducts(duplicatedProducts);
        setPagination(prev => ({
          ...prev,
          totalItems: duplicatedProducts.length,
          totalPages: Math.ceil(duplicatedProducts.length / 12)
        }));
      } else {
        // Nếu không có category hoặc category không hợp lệ, hiển thị tất cả sản phẩm
        const allProducts = [];
        Object.values(categoryData).forEach(cat => {
          cat.products.forEach(product => {
            allProducts.push(product);
          });
        });
        
        setProducts(allProducts);
        setPagination(prev => ({
          ...prev,
          totalItems: allProducts.length,
          totalPages: Math.ceil(allProducts.length / 12)
        }));
      }
      
      setLoading(false);
    }, 500);
  };

  const applyFilters = () => {
    if (!products.length) return;
    
    let filteredProducts = [...products];
    
    // Apply price filter
    if (filters.price.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return filters.price.some(priceId => {
          const range = priceRanges.find(r => r.id === priceId);
          if (!range) return false;
          
          if (range.max === null) {
            return product.price >= range.min;
          }
          return product.price >= range.min && product.price < range.max;
        });
      });
    }
    
    // Apply sort
    switch (filters.sort) {
      case "low-to-high":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        filteredProducts.sort((a, b) => b.products_id - a.products_id);
        break;
      case "oldest":
        filteredProducts.sort((a, b) => a.products_id - b.products_id);
        break;
      default:
        // Keep original order
        break;
    }
    
    // Update pagination
    setPagination(prev => ({
      ...prev,
      totalItems: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / 12),
      currentPage: 1
    }));
  };

  const handleFilterChange = (type, value, checked) => {
    const newFilters = { ...filters };

    if (checked) {
      newFilters[type] = [...newFilters[type], value];
    } else {
      newFilters[type] = newFilters[type].filter((item) => item !== value);
    }

    setFilters(newFilters);
    updateURL(newFilters, 1);
  };

  const handleSortChange = (sort) => {
    const newFilters = { ...filters, sort };
    setFilters(newFilters);
    updateURL(newFilters, pagination.currentPage);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
    updateURL(filters, page);
  };

  const clearFilters = () => {
    const newFilters = { price: [], brand: [], sort: "default" };
    setFilters(newFilters);
    updateURL(newFilters, 1);
  };

  const updateURL = (newFilters, page) => {
    const params = new URLSearchParams();

    if (page > 1) params.set("page", page.toString());
    if (newFilters.price.length)
      params.set("price", newFilters.price.join(","));
    if (newFilters.brand.length)
      params.set("brand", newFilters.brand.join(","));
    if (newFilters.sort !== "default") params.set("sort", newFilters.sort);

    setSearchParams(params);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Tính toán products hiển thị theo pagination
  const startIndex = (pagination.currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  const displayProducts = products.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-gray-700 hover:text-gray-900 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                  <Link 
                    to="/products" 
                    className="ml-1 text-gray-700 hover:text-gray-900 md:ml-2 transition-colors"
                  >
                    Sản phẩm
                  </Link>
                </div>
              </li>
              {currentCategory && (
                <li>
                  <div className="flex items-center">
                    <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
                    <span className="ml-1 text-gray-500 md:ml-2 font-medium">
                      {currentCategory.title}
                    </span>
                  </div>
                </li>
              )}
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-1/4">
              <div className="space-y-6">
                {/* Price Filter */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Filter className="w-4 h-4 mr-2" />
                      Chọn Mức Giá
                    </h3>
                    <div className="space-y-3">
                      {priceRanges.map((range) => (
                        <div
                          key={range.id}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox
                            id={range.id}
                            checked={filters.price.includes(range.id)}
                            onCheckedChange={(checked) =>
                              handleFilterChange('price', range.id, checked)
                            }
                          />
                          <label
                            htmlFor={range.id}
                            className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
                          >
                            {range.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Brand Filter */}
                <Card>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4 flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Thương Hiệu
                    </h3>
                    <div className="space-y-3 max-h-48 overflow-y-auto">
                      {brandsData.map((brand) => (
                        <div
                          key={brand.id}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox
                            id={`brand-${brand.id}`}
                            checked={filters.brand.includes(brand.id)}
                            onCheckedChange={(checked) =>
                              handleFilterChange('brand', brand.id, checked)
                            }
                          />
                          <label
                            htmlFor={`brand-${brand.id}`}
                            className="text-sm cursor-pointer hover:text-blue-600 transition-colors"
                          >
                            {brand.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-300 transition-colors"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Header Controls */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {currentCategory ? currentCategory.title : 'Tất cả sản phẩm'}
                  </h1>
                  {currentCategory && (
                    <p className="text-gray-600 mb-2">
                      {currentCategory.description}
                    </p>
                  )}
                  <p className="text-gray-500">
                    {pagination.totalItems} sản phẩm
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex border rounded-lg p-1 bg-gray-50">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="p-2"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="p-2"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Sort Dropdown */}
                  <Select value={filters.sort} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Sắp xếp theo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Mặc định</SelectItem>
                      <SelectItem value="low-to-high">
                        Giá thấp đến cao
                      </SelectItem>
                      <SelectItem value="high-to-low">
                        Giá cao đến thấp
                      </SelectItem>
                      <SelectItem value="newest">Mới nhất</SelectItem>
                      <SelectItem value="oldest">Cũ nhất</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Products Grid */}
              {loading ? (
                <div
                  className={`grid gap-6 ${viewMode === "grid"
                      ? "grid-cols-2 md:grid-cols-3"
                      : "grid-cols-1"
                    }`}
                >
                  {[...Array(12)].map((_, i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-4">
                        <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : displayProducts.length > 0 ? (
                <div
                  className={`grid gap-6 ${viewMode === "grid"
                      ? "grid-cols-2 md:grid-cols-3"
                      : "grid-cols-1"
                    }`}
                >
                  {displayProducts.map((product) => (
                    <Card
                      key={product.products_id}
                      className="group hover:shadow-xl transition-all duration-300 p-0 border-0 shadow-md hover:shadow-blue-100"
                    >
                      <CardContent
                        className={`p-0 ${viewMode === "list" ? "flex" : ""}`}
                      >
                        <Link to="/product/"
                          className={`relative overflow-hidden ${viewMode === "list"
                              ? "w-48 flex-shrink-0"
                              : "rounded-t-lg"
                            }`}
                        >
                          <img
                            src={img}
                            alt={product.name_products}
                            className="object-cover group-hover:scale-105 transition-transform duration-300 w-full aspect-square"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>

                          {/* Discount Badge */}
                          {getDiscountPercent(product.original_price, product.price) && (
                            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white font-semibold">
                              -{getDiscountPercent(product.original_price, product.price)}%
                            </Badge>
                          )}
                          
                          {/* Quick View Button */}
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Button
                              size="sm"
                              variant="secondary"
                              className="rounded-full w-8 h-8 p-0 hover:bg-white hover:text-blue-600"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {/* Featured Badge */}
                          {product.featured && (
                            <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold">
                              <Star className="w-3 h-3 mr-1 fill-current" />
                              Hot
                            </Badge>
                          )}
                        </Link>
                        
                        <div className="p-4 flex-1">
                          <h3
                            className={`font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors ${viewMode === "list" ? "text-lg" : "line-clamp-2 text-sm"
                              }`}
                          >
                            {product.name_products}
                          </h3>
                          
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold text-blue-600 text-lg">
                              {formatPrice(product.price)}
                            </span>
                            {product.original_price && product.original_price > product.price && (
                              <span className="text-gray-500 line-through text-sm">
                                {formatPrice(product.original_price)}
                              </span>
                            )}
                          </div>

                          {viewMode === "list" && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="p-12">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Package className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Không có sản phẩm nào
                    </h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      {currentCategory 
                        ? `Hiện tại chưa có sản phẩm nào trong danh mục ${currentCategory.title.toLowerCase()}`
                        : "Không tìm thấy sản phẩm phù hợp với bộ lọc của bạn"
                      }
                    </p>
                    <div className="space-y-3">
                      <Button onClick={clearFilters} variant="outline" className="mr-3">
                        Xóa bộ lọc
                      </Button>
                      <Link to="/products">
                        <Button>
                          Xem tất cả sản phẩm
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )}

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() =>
                            handlePageChange(pagination.currentPage - 1)
                          }
                          className={
                            pagination.currentPage <= 1
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer hover:bg-blue-50"
                          }
                        />
                      </PaginationItem>

                      {[...Array(pagination.totalPages)].map((_, i) => {
                        const page = i + 1;
                        if (
                          page === 1 ||
                          page === pagination.totalPages ||
                          (page >= pagination.currentPage - 2 &&
                            page <= pagination.currentPage + 2)
                        ) {
                          return (
                            <PaginationItem key={page}>
                              <PaginationLink
                                onClick={() => handlePageChange(page)}
                                isActive={page === pagination.currentPage}
                                className="cursor-pointer hover:bg-blue-50"
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={() =>
                            handlePageChange(pagination.currentPage + 1)
                          }
                          className={
                            pagination.currentPage >= pagination.totalPages
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer hover:bg-blue-50"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Products;