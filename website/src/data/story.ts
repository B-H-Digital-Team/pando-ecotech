import type { Text, TextList } from '../i18n';

/** "Lịch sử Pando", "Chất Pando" and "Người dẫn đường" pages of pando-ecotech.com.vn, condensed. */
export interface Milestone {
  years: string;
  title: Text;
  text: Text;
  photo: string;
}

export const TIMELINE: Milestone[] = [
  {
    years: '2015 - 2019',
    title: { vi: 'Khởi nguồn ý tưởng xanh', en: 'A green idea takes root' },
    text: {
      vi: 'Anh Phạm Mạnh Đình ấp ủ ý tưởng tái chế rác thải nhựa thành vật liệu xây dựng từ khi còn là học sinh THPT, rồi tiếp tục nuôi dưỡng nó ở Trường Đại học Sư phạm Kỹ thuật TP. Hồ Chí Minh.',
      en: 'Phạm Mạnh Đình began working on turning plastic waste into building material while still in high school, and kept developing it at the Ho Chi Minh City University of Technology and Education.',
    },
    photo: 'history-students',
  },
  {
    years: '2020 - 2021',
    title: { vi: 'Thành lập startup Pando', en: 'Pando is founded' },
    text: {
      vi: 'Công ty Cổ phần Pando ra đời tại TP. Hồ Chí Minh, đưa gạch, ngói từ nhựa tái chế kết hợp cát ra thị trường, và giành danh hiệu "Sinh viên khởi nghiệp xuất sắc nhất" tại Startup Wheel.',
      en: 'Pando JSC opens in Ho Chi Minh City, bringing bricks and roof tiles of recycled plastic and sand to market, and wins "Best Student Entrepreneur" at Startup Wheel.',
    },
    photo: 'history-startup-wheel',
  },
  {
    years: '2021 - 2022',
    title: { vi: 'Mở rộng nghiên cứu và sản phẩm', en: 'More research, more products' },
    text: {
      vi: 'Pando phát triển bao bì và vật liệu tái chế mới, tham gia các chương trình đổi mới sáng tạo, ra mắt tấm lót ly từ nhựa tái sinh và bã cà phê. Năm 2021, nhận thấy nhựa chưa thật sự thân thiện, Pando tạm dừng sản xuất để dồn sức nghiên cứu.',
      en: 'Pando develops packaging and new recycled materials and launches a coaster of recycled plastic and coffee grounds. In 2021, unconvinced plastic was green enough, it pauses production to focus on research.',
    },
    photo: 'history-timeline',
  },
  {
    years: '2022 - 2024',
    title: { vi: 'Hợp tác quy mô công nghiệp', en: 'Industrial-scale partnerships' },
    text: {
      vi: 'Cùng Viện Nghiên cứu Hải sản Phía Nam, Sở KH&CN Bến Tre và Công ty Đại Hùng Anh, Pando tái chế bạt nhựa nuôi tôm kết hợp cát thành gạch lát vỉa hè, tặng sân vườn cho Trường Mẫu giáo Tam Phước.',
      en: 'With the Southern Seafood Research Institute, the Ben Tre Department of Science and Technology and Dai Hung Anh Co., Pando turns shrimp-farm tarpaulins and sand into paving bricks, donated to Tam Phuoc Kindergarten’s garden.',
    },
    photo: 'history-sidewalk',
  },
  {
    years: '2025',
    title: { vi: 'Pando Ecotech ra đời', en: 'Pando Ecotech is born' },
    text: {
      vi: 'Sau bốn năm nghiên cứu, Pando ra mắt công thức mới: 60% bã cà phê, 30% bã mía, không nhựa, không đùn ép nhiệt. Từ bã cà phê, bã mía, bã trà, rơm, trấu, công ty làm ra lót ly, bàn ghế, tấm ốp tường.',
      en: 'After four years of research, Pando launches a new formula: 60% coffee grounds, 30% bagasse, no plastic and no hot extrusion. From coffee, cane, tea, straw and rice husk come coasters, furniture and wall tiles.',
    },
    photo: 'coaster-palette',
  },
];

/** "Chất Pando": the three pairs that describe every product. */
export const SPIRIT: { a: Text; b: Text }[] = [
  { a: { vi: 'Tự nhiên', en: 'Natural' }, b: { vi: 'nhưng hiện đại', en: 'yet modern' } },
  { a: { vi: 'Mộc mạc', en: 'Earthy' }, b: { vi: 'nhưng sáng tạo', en: 'yet inventive' } },
  { a: { vi: 'Đơn giản', en: 'Simple' }, b: { vi: 'nhưng bền vững', en: 'yet lasting' } },
];

/** "Người dẫn đường": what a guide does. */
export const GUIDES: TextList = {
  vi: [
    'Nhìn thấy giá trị trong những thứ tưởng chừng bị bỏ đi',
    'Tin rằng phụ phẩm nông nghiệp là tài nguyên quý',
    'Dẫn dắt đội ngũ hướng tới giải pháp xanh cho cộng đồng',
    'Kiên trì theo đuổi mục tiêu phát triển bền vững',
  ],
  en: [
    'See value in what others throw away',
    'Believe farm by-products are a precious resource',
    'Lead the team towards green solutions for the community',
    'Keep going after sustainable growth, year after year',
  ],
};

/** "Đóng góp của chúng ta" on the home page. */
export const IMPACT: { title: Text; text: Text; photo: string }[] = [
  {
    title: { vi: 'Giảm đồ dùng nhựa', en: 'Less plastic' },
    text: {
      vi: 'Thay một phần sản phẩm nhựa bằng vật liệu tái chế, góp phần giảm ô nhiễm nhựa trong sinh hoạt hằng ngày.',
      en: 'Replacing everyday plastic items with recycled materials, cutting plastic pollution at home.',
    },
    photo: 'coffee-grounds',
  },
  {
    title: { vi: 'Bảo tồn rừng nguyên sinh', en: 'Protecting old forests' },
    text: {
      vi: 'Khi chọn sản phẩm tái chế thay vì gỗ hay nhựa, nhu cầu khai thác gỗ tự nhiên giảm, hạn chế nạn phá rừng.',
      en: 'Choosing recycled goods over timber or plastic lowers demand for logging and slows deforestation.',
    },
    photo: 'forest-lake',
  },
  {
    title: { vi: 'Giảm rác thải nông nghiệp', en: 'Less farm waste' },
    text: {
      vi: 'Bã cà phê, bã trà, bã mía, rơm, trấu vốn bị bỏ đi hoặc đốt bỏ nay thành tài nguyên, giảm áp lực mở rộng diện tích trồng mới.',
      en: 'Coffee grounds, tea leaves, bagasse, straw and husk once dumped or burned become a resource instead.',
    },
    photo: 'straw-bales',
  },
];
