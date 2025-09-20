import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Logo from "@/assets/image/logo.jpg";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  LogOut,
  Menu,
  Search,
  Settings,
  ShoppingCart,
  User,
  UserCircle,
  House,
  Info,
  Box,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [cartCount, setCartCount] = useState(9);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await fetch("/api/cart/count", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setCartCount(data.count || 0);
        }
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const toggleMobileMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const navLinks = [
    { 
      to: "/", 
      label: "Trang chủ", 
      icon: <House className="h-4 w-4" />,
      id: "home"
    },
    { 
      to: "/about", 
      label: "Giới thiệu", 
      icon: <Info className="h-4 w-4" />,
      id: "about"
    },
    {
      to: "/products",
      label: "Sản phẩm",
      icon: <Box className="h-4 w-4" />,
      id: "products",
      subMenu: [
        { to: "/product/vot", label: "Vợt cầu lông" },
        { to: "/product/ao", label: "Áo thun" },
        { to: "/product/quan", label: "Quần jean" },
        { to: "/product/giay", label: "Giày dép" },
        { to: "/product/phu-kien", label: "Phụ kiện" },
      ],
    },
    {
      to: "/cart",
      label: "Giỏ hàng",
      icon: <ShoppingCart className="h-4 w-4" />,
      id: "cart",
      badge: cartCount,
    },
  ];

  const DesktopNavLinks = () => (
    <div className="hidden lg:flex items-center space-x-1">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.to;
        
        if (link.subMenu) {
          return (
            <NavigationMenu key={link.id}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`
                          bg-transparent hover:bg-accent
                      flex items-center gap-2 h-10 px-4 py-2 text-sm font-medium rounded-md
                      transition-all duration-200 hover:text-accent-foreground
                      ${isActive ? "bg-accent text-accent-foreground" : ""}
                    `}
                  >
                    {link.icon}
                    {link.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <div className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            to={link.to}
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md hover:bg-accent transition-colors"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium">
                              {link.label}
                            </div>
                            <p className="text-sm leading-tight text-muted-foreground">
                              Khám phá tất cả sản phẩm chất lượng cao của chúng tôi
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </div>
                      <div className="grid gap-1">
                        {link.subMenu.map((item) => (
                          <NavigationMenuLink asChild key={item.to}>
                            <Link
                              to={item.to}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {item.label}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          );
        }

        return (
          <Link
            key={link.id}
            to={link.to}
            className={`
              flex items-center gap-2 h-10 px-4 py-2 text-sm font-medium rounded-md
              transition-all duration-200 hover:bg-accent hover:text-accent-foreground
              ${isActive ? "bg-accent text-accent-foreground" : ""}
            `}
          >
            {link.icon}
            <span>{link.label}</span>
            {link.badge && link.badge > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 rounded-full flex items-center justify-center text-xs"
              >
                {link.badge > 9 ? "9+" : link.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </div>
  );

  const MobileNavLinks = () => (
    <nav className="space-y-2">
      {navLinks.map((link) => {
        const isActive = location.pathname === link.to;
        
        if (link.subMenu) {
          return (
            <Collapsible 
              key={link.id}
              open={expandedMenus[link.id]}
              onOpenChange={() => toggleMobileMenu(link.id)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={`
                    w-full justify-between h-12 px-4
                    ${isActive ? "bg-accent text-accent-foreground" : ""}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {link.icon}
                    <span className="font-medium">{link.label}</span>
                  </div>
                  <ChevronRight 
                    className={`h-4 w-4 transition-transform duration-200 ${
                      expandedMenus[link.id] ? "rotate-90" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1 px-4 pb-2">
                <Link
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-left py-2 px-4 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Tất cả {link.label.toLowerCase()}
                </Link>
                {link.subMenu.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-left py-2 px-4 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          );
        }

        return (
          <Link
            key={link.id}
            to={link.to}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`
              flex items-center gap-3 w-full h-12 px-4 rounded-md
              font-medium transition-colors
              ${isActive 
                ? "bg-accent text-accent-foreground" 
                : "hover:bg-accent hover:text-accent-foreground"
              }
            `}
          >
            {link.icon}
            <span>{link.label}</span>
            {link.badge && link.badge > 0 && (
              <Badge
                variant="destructive"
                className="ml-auto h-5 w-5 rounded-full flex items-center justify-center text-xs"
              >
                {link.badge > 9 ? "9+" : link.badge}
              </Badge>
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <img src={Logo} alt="DK Shop" className="h-10 w-auto rounded-md" />
            <span className="text-xl font-bold text-primary hidden sm:block">DK Shop</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex-1 flex justify-center">
            <DesktopNavLinks />
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center space-x-2 max-w-xs p-2"
          >
            <div className="relative">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Tìm kiếm..."
                className="pl-8 w-48"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            {/* Cart for mobile */}
            <Link to="/cart" className="lg:hidden relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">Xin chào, {user.username}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Hồ sơ
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Cài đặt
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Đăng nhập
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Đăng ký</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0">
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-2">
                      <img src={Logo} alt="DK Shop" className="h-8 w-auto rounded-md" />
                      <span className="text-lg font-bold text-primary">DK Shop</span>
                    </div>
                  </div>

                  {/* Mobile Search */}
                  <div className="p-4 border-b">
                    <form onSubmit={handleSearch} className="flex space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          type="search"
                          placeholder="Tìm kiếm sản phẩm..."
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Button type="submit" size="sm">
                        <Search className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex-1 overflow-y-auto p-4">
                    <MobileNavLinks />
                  </div>

                  {/* Mobile Auth */}
                  {!user && (
                    <div className="p-4 border-t space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button variant="outline" className="w-full">
                          Đăng nhập
                        </Button>
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Button className="w-full">Đăng ký</Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;