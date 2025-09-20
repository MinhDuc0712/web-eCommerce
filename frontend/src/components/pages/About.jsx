import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const About = () => (
  <div className="container mx-auto py-12 px-4">
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Intro */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Về Chúng Tôi
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Chào mừng bạn đến với <span className="font-semibold">DK Shop</span> –
          điểm đến tin cậy dành cho những người yêu thích cầu lông.
        </p>
      </div>

      {/* Card */}
      <Card className="shadow-md border border-border/50">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            DK Shop – Hành trình và sứ mệnh
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-700 leading-relaxed">
          <p>
            <span className="font-semibold text-primary">DK Shop</span> là cửa
            hàng trực tuyến uy tín, được đông đảo người chơi cầu lông tin tưởng.
            Chúng tôi luôn cam kết mang đến cho khách hàng những sản phẩm{" "}
            <span className="font-medium">chính hãng, chất lượng cao</span> cùng
            dịch vụ chuyên nghiệp.
          </p>

          <p>
            Tại đây, bạn sẽ dễ dàng tìm thấy{" "}
            <span className="font-semibold">
              vợt cầu lông, giày thể thao, balo, phụ kiện
            </span>{" "}
            từ các thương hiệu hàng đầu như Yonex, Lining, Victor...
          </p>

          <p>
            Đội ngũ nhân viên của chúng tôi không chỉ bán hàng, mà còn là{" "}
            <span className="italic">người bạn đồng hành</span>, sẵn sàng tư vấn
            và chia sẻ kinh nghiệm để bạn có thể lựa chọn sản phẩm phù hợp nhất.
          </p>

          <p>
            Ngoài ra, DK Shop còn thường xuyên mang đến{" "}
            <span className="font-semibold text-green-600">
              các chương trình khuyến mãi hấp dẫn
            </span>{" "}
            và ưu đãi đặc biệt dành cho khách hàng thân thiết.
          </p>

          <p>
            Với chúng tôi, <span className="font-semibold">DK Shop</span> không
            chỉ là nơi mua sắm, mà còn là một{" "}
            <span className="text-primary">cộng đồng</span> dành cho tất cả
            những ai yêu thích và đam mê cầu lông.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default About;
