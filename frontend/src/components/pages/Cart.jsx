import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const fetchCartItems = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      // if (!user.id) {
      //   navigate('/login');
      //   return;
      // }

      const response = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setCartItems(data.data || []);
      } else {
        setError(data.message || "Có lỗi khi tải giỏ hàng");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setError("Có lỗi khi tải giỏ hàng");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch("/api/cart/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          cartId,
          quantity: newQuantity,
        }),
      });

      if (response.ok) {
        setCartItems(
          cartItems.map((item) =>
            item.cart_id === cartId
              ? {
                  ...item,
                  quantity: newQuantity,
                  total: item.price * newQuantity,
                }
              : item
          )
        );
        toast.success("Cập nhật số lượng thành công");
      } else {
        toast.error("Có lỗi khi cập nhật số lượng");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Có lỗi khi cập nhật số lượng");
    }
  };

  const removeItem = async (cartId) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?")) {
      return;
    }

    try {
      const response = await fetch("/api/cart/remove", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ cartId }),
      });

      if (response.ok) {
        setCartItems(cartItems.filter((item) => item.cart_id !== cartId));
        toast.success("Xóa sản phẩm thành công");
      } else {
        toast.error("Có lỗi khi xóa sản phẩm");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Có lỗi khi xóa sản phẩm");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateGrandTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-600 to-zinc-700 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <ShoppingBag className="w-12 h-12 mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Giỏ Hàng Của Bạn</h1>
              <p className="text-blue-100">
                {cartItems.length} sản phẩm trong giỏ hàng
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cartItems.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Giỏ hàng của bạn đang trống
                </h3>
                <p className="text-gray-600 mb-6">
                  Hãy thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
                </p>
                <Link to="/products">
                  <Button className="bg-gray-500 hover:bg-gray-800">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Tiếp tục mua sắm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Chi Tiết Sản Phẩm</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                              Sản phẩm
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                              Giá
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                              Số lượng
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                              Tổng
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                              Thao tác
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {cartItems.map((item) => (
                            <tr key={item.cart_id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <img
                                    src={`/assets/image/${item.img}`}
                                    alt={item.name}
                                    className="w-16 h-16 object-cover rounded-lg mr-4"
                                  />
                                  <div>
                                    <h4 className="font-medium text-gray-900">
                                      {item.name}
                                    </h4>
                                    <Link
                                      to={`/product/${item.product_id}`}
                                      className="text-blue-600 hover:underline text-sm"
                                    >
                                      Xem chi tiết
                                    </Link>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-900 font-medium">
                                {formatPrice(item.price)}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center border rounded-lg w-32">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      updateQuantity(
                                        item.cart_id,
                                        item.quantity - 1
                                      )
                                    }
                                    disabled={item.quantity <= 1}
                                    className="px-2"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <Input
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => {
                                      const newQty = Math.max(
                                        1,
                                        parseInt(e.target.value) || 1
                                      );
                                      updateQuantity(item.cart_id, newQty);
                                    }}
                                    className="w-16 text-center border-0 focus:ring-0 px-1"
                                  />
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      updateQuantity(
                                        item.cart_id,
                                        item.quantity + 1
                                      )
                                    }
                                    className="px-2"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-900 font-bold">
                                {formatPrice(item.price * item.quantity)}
                              </td>
                              <td className="px-6 py-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.cart_id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <Link to="/products">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Tiếp tục mua sắm
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Tổng Đơn Hàng</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tạm tính:</span>
                        <span>{formatPrice(calculateGrandTotal())}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Phí vận chuyển:</span>
                        <span className="text-green-600">Miễn phí</span>
                      </div>
                      <hr />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Tổng cộng:</span>
                        <span className="text-red-600">
                          {formatPrice(calculateGrandTotal())}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Link to="/checkout" className="block">
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                          <CreditCard className="w-5 h-5 mr-2" />
                          Tiến Hành Thanh Toán
                        </Button>
                      </Link>

                      <div className="text-xs text-gray-500 text-center mt-2">
                        Bạn sẽ được chuyển đến trang thanh toán an toàn
                      </div>
                    </div>

                    {/* Promo Features */}
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <h4 className="font-semibold text-sm">
                        Ưu đãi đặc biệt:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        <li>• Miễn phí vận chuyển toàn quốc</li>
                        <li>• Bảo hành chính hãng</li>
                        <li>• Đổi trả trong 7 ngày</li>
                        <li>• Thanh toán khi nhận hàng</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Cart;
