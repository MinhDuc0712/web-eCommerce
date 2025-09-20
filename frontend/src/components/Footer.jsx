import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="/assets/image/logo.jpg" 
                alt="DK Shop" 
                className="h-10 w-auto rounded-md"
              />
              <span className="text-xl font-bold text-primary">DK Shop</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Chuyên cung cấp vợt cầu lông chính hãng từ các thương hiệu uy tín trên thế giới. 
              Cam kết chất lượng và dịch vụ tốt nhất cho khách hàng.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Liên kết nhanh</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Trang chủ
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Giới thiệu
              </Link>
              <Link to="/products" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Sản phẩm
              </Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Liên hệ
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Hỗ trợ khách hàng</h3>
            <div className="space-y-2">
              <Link to="/shipping" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Chính sách vận chuyển
              </Link>
              <Link to="/return" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Chính sách đổi trả
              </Link>
              <Link to="/warranty" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Chính sách bảo hành
              </Link>
              <Link to="/payment" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Hướng dẫn thanh toán
              </Link>
              <Link to="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Câu hỏi thường gặp
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  180 Cao Lỗ, Phường 4, Quận 8, TPHCM
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  0123 456 789
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  info@dkshop.com
                </p>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Đăng ký nhận tin</h4>
              <div className="flex space-x-2">
                <Input 
                  type="email" 
                  placeholder="Email của bạn" 
                  className="text-sm"
                />
                <Button size="sm">
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CÔNG TY TNHH DK SPORTS. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Địa chỉ: 180 Cao Lỗ, Phường 4, Quận 8, TPHCM
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Chính sách bảo mật
              </Link>
              <span className="text-muted-foreground">|</span>
              <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Điều khoản sử dụng
              </Link>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={scrollToTop}
              className="h-8 w-8 p-0"
              title="Lên đầu trang"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t py-4">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-sm text-muted-foreground">Chấp nhận thanh toán</p>
            <div className="flex items-center space-x-4 opacity-60">
              <img src="/assets/payment/visa.png" alt="Visa" className="h-6" />
              <img src="/assets/payment/mastercard.png" alt="Mastercard" className="h-6" />
              <img src="/assets/payment/momo.png" alt="MoMo" className="h-6" />
              <img src="/assets/payment/zalopay.png" alt="ZaloPay" className="h-6" />
              <img src="/assets/payment/vnpay.png" alt="VNPay" className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;