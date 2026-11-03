# Website Pando Ecotech (bản demo)

Website tĩnh viết bằng Astro 7 cho Công ty Cổ phần Pando Ecotech, thay cho trang Google Sites hiện tại (https://www.pando-ecotech.com.vn/). Phong cách và hệ chuyển động lấy cảm hứng từ dự án `D:\Data\halyt\website`.

## Chạy thử

```bash
npm install
npm run dev      # http://localhost:4321
npm run check    # kiểm tra kiểu TypeScript/Astro
npm run build    # xuất trang tĩnh ra dist/
npm run preview  # xem bản build
```

Thư mục `dist/` có thể đưa thẳng lên Cloudflare Pages, Netlify, Vercel hoặc bất kỳ hosting tĩnh nào.

## Có gì trong site

- 2 ngôn ngữ: tiếng Việt ở gốc (`/`), tiếng Anh ở `/en/`. Nút VI/EN giữ nguyên trang đang xem.
- Sáng/tối: lần đầu theo hệ điều hành, nút trên header ghim lựa chọn (vòng tròn lan ra từ nút).
- 30 trang mỗi ngôn ngữ: trang chủ, danh mục sản phẩm (có bộ lọc), 18 trang chi tiết sản phẩm, câu chuyện, tin tức và 5 bài viết, đặt hàng, liên hệ, chính sách đổi hàng, 404.
- SEO: title/description riêng từng trang, canonical, hreflang, Open Graph (ảnh 1200x630 tự sinh), sitemap, robots.txt, JSON-LD (Organization, Store, Product, NewsArticle, BreadcrumbList, ItemList).
- Trang đặt hàng: chọn món và số lượng, tính tạm tính, phí ship theo khu vực, sao chép nội dung đơn, gửi qua Zalo hoặc mở Google Form; thẻ ngân hàng MB có nút sao chép số tài khoản.
- Chuyển động (mỗi phần một kiểu riêng): màn mở đầu rót đầy tách cà phê 0 → 100% kèm logo; hero có hàng nghìn hạt bã cà phê (WebGL, `scripts/particles.ts`) tụ thành logo, tán ra theo chuột, bay tung khi cuộn; ảnh hiện ra như vết cà phê loang; hai dải băng chữ uốn cong theo tốc độ cuộn; vòng 5 đồng xu chất liệu xoay 3D (mặt sau là sản phẩm); hình SVG biến dạng hạt → lót ly → chậu → mèo theo quy trình (GSAP MorphSVG); ảnh sản phẩm gợn sóng và lộ ảnh thứ hai khi rê chuột; số liệu lăn kiểu đồng hồ cơ; vòng trụ ảnh khách hàng xoay theo cuộn và đi theo chuột khi kéo; chuyển trang bằng lớp cà phê rót xuống (logo Pando thật trên nền kem) rồi rút đi; cuộn mượt có quán tính (Lenis); nền trang đổi màu theo chất liệu của từng phần. Người dùng bật "giảm chuyển động" sẽ thấy bản tĩnh.
- Bán hàng: nút "Xem nhanh" trên mọi thẻ sản phẩm, "Thêm vào đơn" ở xem nhanh và trang chi tiết (hạt cà phê bay xuống thanh đơn), thanh "Đơn hàng · tổng tiền" nổi ở mọi trang, bong bóng chat Zalo; giỏ hàng dùng chung với trang đặt hàng (`scripts/cart.ts`).

## Cấu trúc

| Thư mục | Nội dung |
| --- | --- |
| `src/data/` | Toàn bộ nội dung: `site.ts` (liên hệ, ngân hàng, phí ship), `products.ts`, `shop.ts` (giá theo form đặt hàng), `news.ts`, `story.ts` |
| `src/i18n/ui/` | Chữ giao diện `vi.ts` và `en.ts` (en phải cùng cấu trúc với vi) |
| `src/assets/photos/` | Ảnh đã chọn lọc, Astro tự tối ưu sang WebP nhiều kích thước |
| `src/components/` | Các khối giao diện (Hero, Process, Materials, ProductCard, ...) |
| `src/styles/tokens.css` | Mọi mã màu, dùng `light-dark()` cho hai giao diện |
| `src/scripts/` | `motion.ts` (chuyển động chung), `catalogue.ts` (bộ lọc), `order.ts` (giỏ đặt hàng) |

Thêm sản phẩm: thêm ảnh vào `src/assets/photos/`, thêm một mục vào `PRODUCTS` trong `src/data/products.ts` (đủ trường `vi` và `en`). Trang chi tiết, sitemap và schema tự sinh.

## Nguồn dữ liệu (cào ngày 03/11/2026)

- Website Google Sites: 22 trang (trang chủ, sản phẩm, thông tin, liên hệ, 9 bài sản phẩm, lịch sử, chất Pando, người dẫn đường, chính sách đổi trả, 4 tin tức) và 128 ảnh; đã chọn 111 ảnh dùng cho site.
- Google Form đặt hàng: cần đăng nhập Google nên không cào được; danh sách sản phẩm, giá, phí ship và tài khoản ngân hàng lấy từ nội dung khách gửi.
- Facebook (5.392 người theo dõi, link Zalo, ảnh bìa) và TikTok (9.328 người theo dõi, 129,7K lượt thích, 551 video, hotline). Danh sách video TikTok bị chặn với trình duyệt tự động.

## Còn chờ khách xác nhận

- Ảnh thật cho chậu nến cún, nến tròn và 4 loại móc khóa (đang dùng biểu tượng vẽ).
- Thành phần còn lại ngoài 60% bã cà phê và 30% bã mía (trang chủ đang ghi "Thành phần khác").
- Ngày đăng của các bài tin tức (bản gốc không có).
- Tên miền chính thức khi đưa lên (đang đặt `https://www.pando-ecotech.com.vn` trong `astro.config.mjs` và `src/i18n/config.ts`).
- Bản dịch tiếng Anh do Claude viết, nên được người bản xứ hoặc khách đọc lại.

## Hiệu suất

Đo bằng Chrome (cuộn và rê chuột liên tục 9 giây): trang chủ khoảng 58 khung hình/giây, khung chậm nhất khoảng 17 ms. Quy tắc giữ cho web nhanh:

- Không ghi biến CSS hay class lên `<html>` trong vòng lặp cuộn/chuột (trình duyệt sẽ tính lại style cả trang); ghi lên đúng phần tử nhỏ cần đổi, ưu tiên `transform`.
- Không dùng `mix-blend-mode` hay `backdrop-filter` cho lớp phủ toàn màn hình hoặc nằm trên vùng đang chuyển động.
- Hiệu ứng lặp vô hạn chỉ dùng `transform`/`opacity`; khối nào ra khỏi màn hình thì tạm dừng (`.is-idle`, `motion.ts`).
- GSAP chỉ tải khi cuộn gần phần quy trình; trang kế tiếp được tải sẵn khi rê chuột vào link (`prefetch` trong `astro.config.mjs`).
