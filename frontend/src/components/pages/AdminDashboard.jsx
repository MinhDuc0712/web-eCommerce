import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  MoreVertical,
  DollarSign,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const stats = [
    {
      title: 'Tổng doanh thu',
      value: '₫89,420,000',
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Đơn hàng',
      value: '1,234',
      change: '+5.2%',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Sản phẩm',
      value: '856',
      change: '+2.1%',
      icon: Package,
      color: 'text-purple-600'
    },
    {
      title: 'Khách hàng',
      value: '2,543',
      change: '+8.7%',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const recentOrders = [
    { id: '#DH001', customer: 'Nguyễn Văn A', product: 'Vợt cầu lông Yonex', amount: '2,590,000', status: 'completed', date: '19/09/2024' },
    { id: '#DH002', customer: 'Trần Thị B', product: 'Giày cầu lông Victor', amount: '1,290,000', status: 'pending', date: '19/09/2024' },
    { id: '#DH003', customer: 'Lê Văn C', product: 'Áo cầu lông Yonex', amount: '450,000', status: 'processing', date: '18/09/2024' },
    { id: '#DH004', customer: 'Phạm Thị D', product: 'Túi vợt Victor', amount: '890,000', status: 'completed', date: '18/09/2024' },
    { id: '#DH005', customer: 'Hoàng Văn E', product: 'Quần cầu lông Lining', amount: '320,000', status: 'cancelled', date: '17/09/2024' }
  ];

  const products = [
    { id: 1, name: 'Vợt cầu lông Yonex Astrox 100ZZ', category: 'Vợt cầu lông', price: '2,590,000', stock: 25, rating: 4.8, status: 'active' },
    { id: 2, name: 'Giày cầu lông Victor SH-A922', category: 'Giày', price: '1,290,000', stock: 12, rating: 4.6, status: 'active' },
    { id: 3, name: 'Áo cầu lông Yonex 20599EX', category: 'Áo', price: '450,000', stock: 0, rating: 4.5, status: 'out_of_stock' },
    { id: 4, name: 'Túi vợt Victor BR6211', category: 'Phụ kiện', price: '890,000', stock: 8, rating: 4.7, status: 'active' },
    { id: 5, name: 'Quần cầu lông Lining AAPN073', category: 'Quần', price: '320,000', stock: 35, rating: 4.4, status: 'active' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'processing': return <AlertCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(parseInt(price.replace(/[₫,]/g, '')));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Quản lý cửa hàng DK Shop</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Xuất báo cáo
            </Button>
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4 space-y-2">
            <Button
              variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('dashboard')}
            >
              <TrendingUp className="h-4 w-4 mr-3" />
              Tổng quan
            </Button>
            <Button
              variant={activeTab === 'orders' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('orders')}
            >
              <ShoppingCart className="h-4 w-4 mr-3" />
              Đơn hàng
            </Button>
            <Button
              variant={activeTab === 'products' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('products')}
            >
              <Package className="h-4 w-4 mr-3" />
              Sản phẩm
            </Button>
            <Button
              variant={activeTab === 'customers' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('customers')}
            >
              <Users className="h-4 w-4 mr-3" />
              Khách hàng
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className={`text-sm ${stat.color}`}>{stat.change}</p>
                          </div>
                          <Icon className={`h-8 w-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Recent Orders */}
              <Card>
                <CardHeader>
                  <CardTitle>Đơn hàng gần đây</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium">Mã đơn</th>
                          <th className="text-left p-3 font-medium">Khách hàng</th>
                          <th className="text-left p-3 font-medium">Sản phẩm</th>
                          <th className="text-left p-3 font-medium">Số tiền</th>
                          <th className="text-left p-3 font-medium">Trạng thái</th>
                          <th className="text-left p-3 font-medium">Ngày</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-3 font-medium text-blue-600">{order.id}</td>
                            <td className="p-3">{order.customer}</td>
                            <td className="p-3">{order.product}</td>
                            <td className="p-3 font-medium">{formatPrice(order.amount)}</td>
                            <td className="p-3">
                              <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status === 'completed' ? 'Hoàn thành' :
                                 order.status === 'pending' ? 'Chờ xử lý' :
                                 order.status === 'processing' ? 'Đang xử lý' : 'Đã hủy'}
                              </Badge>
                            </td>
                            <td className="p-3 text-gray-600">{order.date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Quản lý sản phẩm</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm sản phẩm
                </Button>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="vot">Vợt cầu lông</SelectItem>
                    <SelectItem value="giay">Giày</SelectItem>
                    <SelectItem value="ao">Áo</SelectItem>
                    <SelectItem value="phu-kien">Phụ kiện</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Lọc
                </Button>
              </div>

              {/* Products Table */}
              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-4 font-medium">Sản phẩm</th>
                          <th className="text-left p-4 font-medium">Danh mục</th>
                          <th className="text-left p-4 font-medium">Giá</th>
                          <th className="text-left p-4 font-medium">Kho</th>
                          <th className="text-left p-4 font-medium">Đánh giá</th>
                          <th className="text-left p-4 font-medium">Trạng thái</th>
                          <th className="text-left p-4 font-medium">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center">
                                  <Package className="h-6 w-6 text-gray-400" />
                                </div>
                                <div>
                                  <p className="font-medium">{product.name}</p>
                                  <p className="text-sm text-gray-500">ID: {product.id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{product.category}</td>
                            <td className="p-4 font-medium">{formatPrice(product.price)}</td>
                            <td className="p-4">
                              <span className={product.stock === 0 ? 'text-red-600' : 'text-green-600'}>
                                {product.stock} sản phẩm
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>{product.rating}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge className={
                                product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }>
                                {product.status === 'active' ? 'Hoạt động' : 'Hết hàng'}
                              </Badge>
                            </td>
                            <td className="p-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    Xem chi tiết
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Chỉnh sửa
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Xóa
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Quản lý đơn hàng</h2>
                <div className="flex items-center space-x-2">
                  <Select>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả</SelectItem>
                      <SelectItem value="pending">Chờ xử lý</SelectItem>
                      <SelectItem value="processing">Đang xử lý</SelectItem>
                      <SelectItem value="completed">Hoàn thành</SelectItem>
                      <SelectItem value="cancelled">Đã hủy</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Lọc
                  </Button>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-4 font-medium">Mã đơn</th>
                          <th className="text-left p-4 font-medium">Khách hàng</th>
                          <th className="text-left p-4 font-medium">Sản phẩm</th>
                          <th className="text-left p-4 font-medium">Tổng tiền</th>
                          <th className="text-left p-4 font-medium">Trạng thái</th>
                          <th className="text-left p-4 font-medium">Ngày đặt</th>
                          <th className="text-left p-4 font-medium">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-4 font-medium text-blue-600">{order.id}</td>
                            <td className="p-4">{order.customer}</td>
                            <td className="p-4">{order.product}</td>
                            <td className="p-4 font-medium">{formatPrice(order.amount)}</td>
                            <td className="p-4">
                              <Badge className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status === 'completed' ? 'Hoàn thành' :
                                 order.status === 'pending' ? 'Chờ xử lý' :
                                 order.status === 'processing' ? 'Đang xử lý' : 'Đã hủy'}
                              </Badge>
                            </td>
                            <td className="p-4 text-gray-600">{order.date}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Quản lý khách hàng</h2>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm khách hàng
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Chức năng đang phát triển
                    </h3>
                    <p className="text-gray-600">
                      Tính năng quản lý khách hàng sẽ được cập nhật trong phiên bản tiếp theo.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;