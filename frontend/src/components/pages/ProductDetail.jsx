import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Gift,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import vot from "@/assets/image/vot-cau-long.jpg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const mockProduct = {
  products_id: 1,
  product_id: "SP001",
  name: "Vợt cầu lông Yonex Astrox 100ZZ",
  category_name: "Vợt cầu lông",
  price: 3590000,
  description:
    "Vợt cầu lông cao cấp, hỗ trợ tối đa cho người chơi chuyên nghiệp.",
};

const mockReviews = [
  {
    id: 1,
    user_name: "Nguyễn Văn A",
    rating: 5,
    comment: "Vợt đánh rất đã, smash cực mạnh!",
    created_at: "2025-09-01T10:00:00Z",
  },
  {
    id: 2,
    user_name: "Trần Thị B",
    rating: 4,
    comment: "Vợt nhẹ, dễ điều khiển. Đáng mua!",
    created_at: "2025-09-05T15:30:00Z",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviewForm, setReviewForm] = useState({
    userName: "",
    rating: "",
    comment: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    // Mock data thay vì fetch API
    setTimeout(() => {
      setProduct(mockProduct);
      setReviews(mockReviews);
      setLoading(false);
    }, 800); // giả lập delay 800ms
  }, [id]);

  // useEffect(() => {
  //   if (id) {
  //     fetchProductDetail();
  //     fetchReviews();
  //   }
  // }, [id]);

  // const fetchProductDetail = async () => {
  // try {
  //   const response = await fetch(`/api/products/${id}`);
  //   const data = await response.json();
  //   if (response.ok) {
  //     setProduct(data.data);
  //   } else {
  //     navigate("/404");
  //   }
  // } catch (error) {
  //   console.error("Error fetching product:", error);
  //   navigate("/404");
  // } finally {
  //   setLoading(false);
  // }
  // };

  // const fetchReviews = async () => {
  //   try {
  //     const response = await fetch(`/api/products/${id}/reviews`);
  //     const data = await response.json();
  //     if (response.ok) {
  //       setReviews(data.data || []);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) {
        navigate("/login");
        return;
      }

      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          productId: product.products_id,
          quantity,
        }),
      });

      if (response.ok) {
        toast.success("Đã thêm sản phẩm vào giỏ hàng!");
      } else {
        toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Có lỗi xảy ra khi thêm vào giỏ hàng");
    }
  };

  const handleBuyNow = () => {
    // Add to cart then redirect to checkout
    handleAddToCart().then(() => {
      navigate("/checkout");
    });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/products/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: reviewForm.userName,
          rating: parseInt(reviewForm.rating),
          comment: reviewForm.comment,
          productId: id,
        }),
      });

      if (response.ok) {
        toast.success("Đánh giá đã được gửi thành công!");
        setReviewForm({ userName: "", rating: "", comment: "" });
        setShowReviewForm(false);
        fetchReviews();
      } else {
        toast.error("Có lỗi xảy ra khi gửi đánh giá");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const renderStars = (rating, interactive = false, onRatingChange = null) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <button
          key={i}
          type={interactive ? "button" : undefined}
          className={`${i <= rating ? "text-yellow-400" : "text-gray-300"} ${
            interactive ? "hover:text-yellow-400 cursor-pointer" : ""
          }`}
          onClick={interactive ? () => onRatingChange?.(i) : undefined}
        >
          <Star className={`w-4 h-4 ${i <= rating ? "fill-current" : ""}`} />
        </button>
      );
    }
    return <div className="flex">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // if (!product) {
  //   useEffect(() => {
  //     toast.error("Không tìm thấy sản phẩm");
  //   }, []);
  //   return null;
  // }

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={vot}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <Badge variant="secondary">{product.category_name}</Badge>
                  <span className="text-sm text-gray-500">
                    Mã sản phẩm: {product.product_id}
                  </span>
                </div>
              </div>

              {/* Special Offers */}
              <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-orange-800 flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Ưu đãi đặc biệt
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <span className="mr-2">🔥</span>
                    <span>Tặng cước và căng cước vợt cầu lông miễn phí</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">🔥</span>
                    <span>Tặng bao nhung/bao đơn bảo vệ vợt cầu lông</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">🔥</span>
                    <span>Tặng quấn cán vợt cầu lông</span>
                  </div>
                  <div className="flex items-start">
                    <span className="mr-2">🔥</span>
                    <span>
                      Freeship khi chuyển khoản trước với đơn hàng trên 1 triệu
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Price */}
              <div className="border-t border-b py-4">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  {formatPrice(product.price)}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">Số lượng:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <Input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      className="w-20 text-center border-0 focus:ring-0"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    onClick={handleBuyNow}
                    variant="outline"
                    className="flex-1 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    size="lg"
                  >
                    Mua ngay
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Yêu thích
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Chia sẻ
                  </Button>
                </div>
              </div>

              {/* Service Info */}
              {/* <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">Giao hàng miễn phí</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm">Bảo hành chính hãng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RefreshCw className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Đổi trả dễ dàng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm">Chất lượng đảm bảo</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* Product Details Section */}
          <Card className="mb-8">
            <CardHeader className="border-b">
              <CardTitle>Chi tiết sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid grid-cols-3 max-w-md mb-4">
                  <TabsTrigger value="description">Mô tả</TabsTrigger>
                  <TabsTrigger value="specs">Thông số</TabsTrigger>
                  <TabsTrigger value="policy">Chính sách</TabsTrigger>
                </TabsList>

                {/* Tab: Mô tả */}
                <TabsContent value="description">
                  <p className="text-gray-700 leading-relaxed border-t pt-4">
                    {product.description ||
                      "Sản phẩm chất lượng cao, được nhập khẩu chính hãng từ các thương hiệu uy tín. Đảm bảo độ bền và hiệu suất tối ưu cho người chơi."}
                  </p>
                </TabsContent>

                {/* Tab: Thông số kỹ thuật */}
                <TabsContent value="specs">
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 border-t pt-4">
                    <li>Kích thước: {product.size || "Chuẩn quốc tế"}</li>
                    <li>Chất liệu: {product.material || "Nhựa ABS cao cấp"}</li>
                    <li>Màu sắc: {product.color || "Đen / Trắng"}</li>
                    <li>Bảo hành: {product.warranty || "12 tháng"}</li>
                  </ul>
                </TabsContent>

                {/* Tab: Chính sách */}
                <TabsContent value="policy">
                  <p className="text-gray-700 leading-relaxed border-t pt-4">
                    Sản phẩm được bảo hành {product.warranty || "12 tháng"}{" "}
                    chính hãng. Đổi trả trong vòng 7 ngày nếu có lỗi từ nhà sản
                    xuất. Giao hàng tận nơi trên toàn quốc.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Reviews Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between border-b">
              <CardTitle>Đánh giá sản phẩm</CardTitle>
              <Button onClick={() => setShowReviewForm(!showReviewForm)}>
                {showReviewForm ? "Ẩn form" : "Viết đánh giá"}
              </Button>
            </CardHeader>
            <CardContent>
              {/* Review Form */}
              {showReviewForm && (
                <Card className="mb-6 bg-gray-50">
                  <CardContent className="p-4">
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Tên của bạn
                        </label>
                        <Input
                          type="text"
                          value={reviewForm.userName}
                          onChange={(e) =>
                            setReviewForm({
                              ...reviewForm,
                              userName: e.target.value,
                            })
                          }
                          placeholder="Nhập tên của bạn"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Đánh giá
                        </label>
                        <Select
                          value={reviewForm.rating}
                          onValueChange={(value) =>
                            setReviewForm({ ...reviewForm, rating: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn số sao" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 sao</SelectItem>
                            <SelectItem value="2">2 sao</SelectItem>
                            <SelectItem value="3">3 sao</SelectItem>
                            <SelectItem value="4">4 sao</SelectItem>
                            <SelectItem value="5">5 sao</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Nhận xét
                        </label>
                        <Textarea
                          value={reviewForm.comment}
                          onChange={(e) =>
                            setReviewForm({
                              ...reviewForm,
                              comment: e.target.value,
                            })
                          }
                          placeholder="Nhập nhận xét của bạn"
                          rows={4}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full">
                        Gửi đánh giá
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b pb-6 last:border-b-0"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-semibold text-blue-600">
                          {review.user_name}
                        </h5>
                        <span className="text-sm text-gray-500">
                          {formatDate(review.created_at)}
                        </span>
                      </div>
                      <div className="mb-2">{renderStars(review.rating)}</div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Star className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Chưa có đánh giá nào
                    </h3>
                    <p className="text-gray-500">
                      Hãy là người đầu tiên đánh giá sản phẩm này
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
