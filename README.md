# Pando Ecotech

Website thương mại và giới thiệu thương hiệu của **Công ty Cổ phần Pando Ecotech** — doanh nghiệp Việt Nam sáng tạo sản phẩm từ phụ phẩm nông nghiệp như bã cà phê, bã trà và bã mía.

Dự án gồm website Astro đa ngôn ngữ, catalogue sản phẩm, tin tức và quy trình đặt hàng trực tiếp qua Zalo hoặc Google Form.

## Công nghệ

- [Astro](https://astro.build/) 7 — tạo trang tĩnh
- TypeScript
- GSAP và Lenis — chuyển động và cuộn mượt
- Astro Sitemap — tạo sitemap tự động
- CSS hiện đại hỗ trợ chế độ sáng/tối

## Cấu trúc thư mục

```text
pando-ecotech/
├── README.md
├── .gitignore
└── website/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── data/
    │   ├── i18n/
    │   ├── layouts/
    │   ├── lib/
    │   ├── pages/
    │   ├── scripts/
    │   └── styles/
    ├── astro.config.mjs
    └── package.json
```

## Yêu cầu môi trường

- Node.js 20.3 trở lên
- npm

## Cài đặt và chạy dự án

```bash
cd website
npm install
npm run dev
```

Website mặc định chạy tại `http://localhost:4321`.

## Các lệnh npm

```bash
npm run dev      # Chạy môi trường phát triển
npm run check    # Kiểm tra Astro và TypeScript
npm run build    # Xuất website tĩnh vào thư mục dist/
npm run preview  # Xem trước bản build
```

## Ngôn ngữ và routing

- Tiếng Việt là ngôn ngữ mặc định tại `/`
- Tiếng Anh tại `/en/`
- Các nội dung dịch được quản lý tại `website/src/i18n/ui/`
- Nội dung trang, sản phẩm và tin tức được lưu tại `website/src/data/`

## Nội dung chính

Website gồm:

- Trang chủ và giới thiệu thương hiệu
- Danh mục sản phẩm
- Trang chi tiết từng sản phẩm
- Câu chuyện phát triển
- Tin tức và sự kiện
- Trang đặt hàng
- Liên hệ
- Chính sách đổi trả
- Trang lỗi 404
- Chuyển đổi giao diện sáng/tối
- SEO, Open Graph, sitemap và JSON-LD

## Cập nhật dữ liệu

### Thông tin công ty

Thông tin liên hệ, mạng xã hội, địa chỉ và thanh toán nằm trong:

```text
website/src/data/site.ts
```

### Sản phẩm

Dữ liệu sản phẩm nằm trong:

```text
website/src/data/products.ts
website/src/data/shop.ts
```

Sau khi thêm ảnh mới vào `website/src/assets/photos/`, cập nhật dữ liệu sản phẩm tương ứng để trang chi tiết và sitemap được tạo tự động.

### Tin tức

Nội dung tin tức nằm trong:

```text
website/src/data/news.ts
```

### Bản dịch

Duy trì cấu trúc nhất quán giữa hai tệp dịch:

```text
website/src/i18n/ui/vi.ts
website/src/i18n/ui/en.ts
```

## Thông số mạng xã hội

Các số liệu Facebook và TikTok trong trang chủ được lưu trực tiếp trong `website/src/data/site.ts` và **không tự động cập nhật theo thời gian thực**.

Khi số liệu mạng xã hội thay đổi, cần cập nhật thủ công trong `NUMBERS` sau đó build lại website.

## Triển khai

`npm run build` sẽ tạo thư mục `website/dist/`. Nội dung của thư mục này có thể được triển khai lên:

- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages
- Hosting hỗ trợ website tĩnh

Tên miền và cấu hình SEO được đặt trong:

```text
website/astro.config.mjs
```

## Tác giả và thương hiệu

© Pando Ecotech. Dự án thuộc công ty và thương hiệu Pando Ecotech.
