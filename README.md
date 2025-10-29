# Tài Chính Gia Đình — Static Site

This repository contains a small static website. The course file is at `courses/budgeting.html` and the root `index.html` redirects there.

Quick deploy options (pick one):

1) Netlify Drop (fastest, no git required)

   - Zip the site folder (the project root) or drag the folder to Netlify Drop: https://app.netlify.com/drop
   - Netlify will give you a public URL instantly. You can then set a custom domain if desired.

2) GitHub Pages (recommended if you use GitHub)

   - Create a new GitHub repository (empty) on https://github.com/new
   - Run the following locally in this project folder (macOS / zsh):

```bash
# initialize git, commit, and push
git init
git add .
git commit -m "Initial site commit"
# create repository on GitHub then add remote (replace URL below)
git remote add origin git@github.com:<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

   - Then in the repository settings -> Pages, choose `main` branch (root) and save. After a minute the site will be live at `https://<your-username>.github.io/<your-repo>/`.

3) Netlify / Vercel with Git (CI)

   - Connect your GitHub repo from the Netlify or Vercel dashboard and configure the build to deploy from the `main` branch. No build command is required for plain static HTML.

Verification

- After deployment, open the published URL and verify that the redirect from `/` goes to `/courses/budgeting.html` and that static assets (CSS/JS) load correctly.

Notes

- If you prefer I can prepare the git repo here and attempt a push — but I will need the remote repo URL (and you must be comfortable using your SSH/key or HTTP credentials locally). Otherwise, follow the above steps locally and tell me when you'd like me to help with DNS or custom domain + HTTPS.

If you want, I can also create a ZIP of the project for easy drag-and-drop deploy. Tell me which option you want next.
# 💰 Tài Chính Gia Đình - Vietnamese Finance Education Website

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-green)](https://[USERNAME].github.io/TestBusiness)
[![Vietnamese](https://img.shields.io/badge/Language-Vietnamese-red)](https://github.com/[USERNAME]/TestBusiness)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

## 🎯 Giới Thiệu

Website giáo dục tài chính toàn diện dành riêng cho các cặp đôi Việt Nam 28-35 tuổi, tập trung vào xây dựng tài sản một cách an toàn và hiệu quả.

### 🌟 Tính Năng Chính

- **📚 Khóa Học Tài Chính**: 6 module học từ cơ bản đến nâng cao
- **🧮 Công Cụ Tính Toán**: Máy tính lãi kép, ngân sách, vay mua nhà
- **📱 Thiết Kế Responsive**: Tối ưu cho mọi thiết bị
- **🇻🇳 Nội Dung Việt Hóa**: Phù hợp với thị trường Việt Nam
- **💡 Tương Tác Cao**: Quiz, bài tập thực hành, theo dõi tiến độ

## 🎓 Nội Dung Khóa Học

### 1. 📊 Ngân Sách Gia Đình
- Quy tắc 50/30/20
- Theo dõi chi tiêu
- Kỹ thuật tiết kiệm
- Quản lý nợ

### 2. 💰 Đầu Tư An Toàn
- Các kênh đầu tư phù hợp
- Quản lý rủi ro
- Xây dựng danh mục
- Chiến lược dài hạn

### 3. 🏠 Mua Nhà Thông Minh
- Kế hoạch mua nhà
- Vay ngân hàng
- Đánh giá bất động sản
- Đầu tư BĐS

### 4. 🛡️ Bảo Hiểm & Bảo Vệ
- Bảo hiểm nhân thọ
- Bảo hiểm y tế
- Quỹ khẩn cấp
- Quản lý rủi ro

### 5. 👶 Tài Chính Con Cái
- Chi phí nuôi dạy con
- Quỹ giáo dục
- Bảo hiểm cho trẻ
- Giáo dục tài chính sớm

### 6. 🌅 Nghỉ Hưu Sớm
- Chiến lược FIRE
- Thu nhập thụ động
- Kế hoạch nghỉ hưu
- Tự do tài chính

## 🛠️ Công Cụ Tài Chính

### 🧮 Máy Tính Ngân Sách
- Phân bổ thu nhập theo quy tắc 50/30/20
- Theo dõi chi tiêu chi tiết
- Báo cáo tài chính cá nhân

### 📈 Máy Tính Lãi Kép
- Tính toán đầu tư dài hạn
- Biểu đồ tăng trưởng tương tác
- Xuất báo cáo Excel
- Kịch bản đầu tư khác nhau

### 🏠 Máy Tính Vay Mua Nhà
- Tính toán khoản vay
- Lãi suất và thời hạn
- Khả năng chi trả
- So sánh các gói vay

### 🎯 Mục Tiêu Tiết Kiệm
- Lập kế hoạch tiết kiệm
- Theo dõi tiến độ
- Tính toán thời gian đạt mục tiêu

## 🚀 Demo Trực Tuyến

Truy cập website tại: **https://[USERNAME].github.io/TestBusiness**

## 💻 Công Nghệ Sử Dụng

- **HTML5**: Semantic markup, SEO-optimized
- **CSS3**: Modern styling, Flexbox/Grid, animations
- **JavaScript**: ES6+, Chart.js, localStorage
- **Responsive Design**: Mobile-first approach
- **GitHub Pages**: Static hosting
- **Vietnamese Fonts**: Google Fonts support

## 📱 Tương Thích

- ✅ Chrome, Firefox, Safari, Edge
- ✅ iOS Safari, Chrome Mobile
- ✅ Responsive design (320px - 1920px+)
- ✅ Progressive Enhancement
- ✅ Accessibility (WCAG 2.1)

## 🛠️ Cài Đặt Local

```bash
# Clone repository
git clone https://github.com/[USERNAME]/TestBusiness.git

# Navigate to directory
cd TestBusiness

# Open in browser
open index.html
# hoặc sử dụng Live Server trong VS Code
```

## 📁 Cấu Trúc Thư Mục

```
TestBusiness/
├── index.html              # Trang chủ
├── courses/                 # Thư mục khóa học
│   └── budgeting.html      # Khóa học ngân sách
├── tools/                   # Công cụ tài chính
│   └── compound-calculator.html
├── styles/                  # CSS files
│   ├── main.css            # Styles chính
│   ├── course.css          # Styles khóa học
│   └── calculator.css      # Styles công cụ
├── scripts/                 # JavaScript files
│   ├── main.js             # JS chính
│   ├── course.js           # JS khóa học
│   └── compound-calculator.js
└── README.md
```

## 🎯 Đối Tượng Mục Tiêu

- **Độ tuổi**: 28-35 tuổi
- **Tình trạng**: Các cặp đôi, gia đình trẻ
- **Mục tiêu**: Xây dựng tài sản an toàn, hiệu quả
- **Ngôn ngữ**: Tiếng Việt
- **Thị trường**: Việt Nam

## 📊 Tính Năng Nổi Bật

### 🎓 Học Tập Tương Tác
- Quiz kiểm tra hiểu biết
- Bài tập thực hành
- Theo dõi tiến độ học
- Lưu trữ dữ liệu local

### 🧮 Công Cụ Thông Minh
- Tính toán real-time
- Biểu đồ trực quan
- Xuất báo cáo
- Lưu kịch bản

### 📱 Trải Nghiệm Mobile
- Touch-friendly interface
- Fast loading
- Offline-ready
- App-like experience

## 🔄 Cập Nhật & Bảo Trì

Website được cập nhật thường xuyên với:
- ✅ Nội dung mới
- ✅ Công cụ bổ sung
- ✅ Cải thiện UX/UI
- ✅ Bug fixes

## 🤝 Đóng Góp

Chúng tôi hoan nghênh mọi đóng góp để cải thiện website:

1. Fork repository
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📄 Giấy Phép

Dự án được phân phối dưới giấy phép MIT. Xem `LICENSE` để biết thêm thông tin.

## 📞 Liên Hệ

- **Email**: hello@taichinhgiadinh.vn
- **Website**: https://[USERNAME].github.io/TestBusiness
- **Issues**: [GitHub Issues](https://github.com/[USERNAME]/TestBusiness/issues)

## 🙏 Lời Cảm Ơn

- [Chart.js](https://www.chartjs.org/) - Thư viện biểu đồ
- [Google Fonts](https://fonts.google.com/) - Vietnamese font support
- [GitHub Pages](https://pages.github.com/) - Free hosting

---

**💰 Tài Chính Gia Đình** - *Xây dựng tương lai tài chính vững chắc cho gia đình bạn*