import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CreditCard, Eye, RefreshCw, Shield, Star, Truck } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import vot from "@/assets/image/vot-cau-long.jpg";
import { ShoppingCart } from "lucide-react";
import { Heart } from "lucide-react";

const mockProduct = {
  products_id: 1,
  product_id: "SP001",
  name_products: "Vợt cầu lông Yonex Astrox 100ZZ",
  category_name: "Vợt cầu lông",
  price: 2590000,           // giá đã giảm
  original_price: 3590000,  // giá gốc
  description: "Vợt cầu lông cao cấp, hỗ trợ tối đa cho người chơi chuyên nghiệp.",
};

const Home = () => {
  const [products, setProducts] = useState({
    newProducts: [],
    bestSellers: [],
    featuredProducts: [],
  });
  const [loading, setLoading] = useState(true);
  const getDiscountPercent = (original, current) => {
    if (!original || original <= current) return null;
    return Math.round(((original - current) / original) * 100);
  };

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setProducts({
        newProducts: Array(8)
          .fill(mockProduct)
          .map((p, i) => ({ ...p, products_id: i + 1 })),
        bestSellers: Array(8)
          .fill(mockProduct)
          .map((p, i) => ({ ...p, products_id: i + 9 })),
        featuredProducts: Array(8)
          .fill(mockProduct)
          .map((p, i) => ({ ...p, products_id: i + 17 })),
      });
      setLoading(false);
    }, 1000);
  }, []);
  //   useEffect(() => {
  //     fetchProducts();
  //   }, []);

  //   const fetchProducts = async () => {
  //     try {
  //       const [newRes, bestRes, featuredRes] = await Promise.all([
  //         fetch('/api/products/new?limit=8'),
  //         fetch('/api/products/bestsellers?limit=8'),
  //         fetch('/api/products/featured?limit=8')
  //       ]);

  //       const [newProducts, bestSellers, featuredProducts] = await Promise.all([
  //         newRes.json(),
  //         bestRes.json(),
  //         featuredRes.json()
  //       ]);

  //       setProducts({
  //         newProducts: newProducts.data || [],
  //         bestSellers: bestSellers.data || [],
  //         featuredProducts: featuredProducts.data || []
  //       });
  //     } catch (error) {
  //       console.error('Error fetching products:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const PromoSection = () => (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center group">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Vận chuyển <span className="text-blue-600">TOÀN QUỐC</span>
            </h3>
            <p className="text-sm text-gray-600">Thanh toán khi nhận hàng</p>
          </div>

          <div className="text-center group">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <span className="text-green-600">Bảo đảm chất lượng</span>
            </h3>
            <p className="text-sm text-gray-600">Sản phẩm bảo đảm chất lượng</p>
          </div>

          <div className="text-center group">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Tiến hành <span className="text-purple-600">THANH TOÁN</span>
            </h3>
            <p className="text-sm text-gray-600">
              Với nhiều <span className="text-purple-600">PHƯƠNG THỨC</span>
            </p>
          </div>

          <div className="text-center group">
            <div className="bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <RefreshCw className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">
              <span className="text-orange-600">Đổi sản phẩm mới</span>
            </h3>
            <p className="text-sm text-gray-600">nếu sản phẩm lỗi</p>
          </div>
        </div>
      </div>
    </div>
  );

  const HeroSlider = () => (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg shadow-2xl mb-8">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="h-full flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">DK SPORTS</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Chuyên cung cấp vợt cầu lông chính hãng
            </p>
            <Link to="/products">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
              >
                Khám phá ngay
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductSection = ({ title, products, loading }) => (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
        {title}
      </h2>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 shadow-md py-2 hover:shadow-xl transition-all duration-300 bg-white"
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img
                    src={vot}
                    alt={product.name_products}
                    className="w-full aspect-square object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  {/* Badge Giảm giá */}
                  {getDiscountPercent(product.original_price, product.price) && (
                    <Badge className="absolute top-2 left-2 bg-green-500 hover:bg-green-600">
                      -{getDiscountPercent(product.original_price, product.price)}%
                    </Badge>
                  )}
                  {/* Action button */}
                  <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full w-9 h-9 shadow bg-white hover:bg-gray-100"
                    >
                      <Eye className="h-4 w-4 text-gray-700" />
                    </Button>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-full w-9 h-9 shadow bg-white hover:bg-gray-100"
                    >
                      <Heart className="h-4 w-4 text-pink-500" />
                    </Button>
                  </div>
                  {/* Hot Badge */}
                  {product.featured && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white font-semibold px-3 py-1 rounded-full shadow">
                      <Star className="w-3 h-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-2 space-y-3">
                  <h3 className="font-semibold text-gray-900 text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name_products}
                  </h3>

                  {/* Rating + Reviews */}
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < (product.rating || 4)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-1">(120)</span>
                  </div>

                  {/* Price */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <p className="font-bold text-red-600 text-base sm:text-lg">
                      {formatPrice(product.price)}
                    </p>
                    {product.original_price > product.price && (
                      <span className="text-gray-500 line-through ml-0 sm:ml-2 text-xs sm:text-sm">
                        {formatPrice(product.original_price)}
                      </span>
                    )}
                  </div>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <HeroSlider />
          <PromoSection />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductSection
            title="Sản phẩm mới"
            products={products.newProducts}
            loading={loading}
          />

          <ProductSection
            title="Sản phẩm bán chạy"
            products={products.bestSellers}
            loading={loading}
          />

          <ProductSection
            title="Sản phẩm nổi bật"
            products={products.featuredProducts}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
