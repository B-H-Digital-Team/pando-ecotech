import type { Text, TextList } from '../i18n';

/** "Tin tức và sự kiện" of pando-ecotech.com.vn, condensed (the originals carry no dates). */
export type Block =
  | { type: 'p'; text: Text }
  | { type: 'h'; text: Text }
  | { type: 'list'; items: TextList }
  | { type: 'photos'; photos: string[] };

export interface Article {
  slug: string;
  kind: Text;
  place: Text;
  title: Text;
  excerpt: Text;
  cover: string;
  body: Block[];
}

const PARTNERSHIP: Text = { vi: 'Hợp tác', en: 'Partnership' };

export const NEWS: Article[] = [
  {
    slug: 'pando-ca-phin-dubai',
    kind: { vi: 'Xuất khẩu', en: 'Export' },
    place: { vi: 'Dubai, UAE', en: 'Dubai, UAE' },
    title: {
      vi: 'Pando cùng Cà Phin đưa sản phẩm từ bã cà phê Việt đến các quán tại Dubai',
      en: 'Pando and Cà Phin take Vietnamese coffee-ground products to cafés in Dubai',
    },
    excerpt: {
      vi: 'Tấm lót ly và tấm ốp quầy bar từ bã cà phê Việt Nam đã xuất hiện trong không gian quán Cà Phin tại Dubai.',
      en: 'Coasters and bar cladding made of Vietnamese coffee grounds now dress the Cà Phin cafés in Dubai.',
    },
    cover: 'caphin-team',
    body: [
      { type: 'h', text: { vi: 'Từ bã cà phê Việt đến thị trường quốc tế', en: 'From Vietnamese grounds to the world' } },
      {
        type: 'p',
        text: {
          vi: 'Cà phê Việt Nam nổi tiếng với sản lượng xuất khẩu lớn và hương vị đặc trưng, nhưng bã cà phê sau pha chế lại thường bị bỏ đi. Pando Ecotech đã hợp tác cùng Cà Phin để đưa các sản phẩm tái chế từ bã cà phê Việt Nam đến các quán cà phê tại Dubai, một bước tiến giúp lan tỏa kinh tế tuần hoàn từ Việt Nam ra thế giới.',
          en: 'Vietnamese coffee is known for its volume and flavour, yet spent grounds are usually thrown away. Pando Ecotech partnered with Cà Phin to bring products recycled from Vietnamese coffee grounds to cafés in Dubai, carrying the circular economy from Vietnam to the world.',
        },
      },
      { type: 'photos', photos: ['caphin-bar', 'caphin-counter', 'caphin-store'] },
      { type: 'h', text: { vi: 'Cà Phin, cầu nối đưa cà phê Việt ra thế giới', en: 'Cà Phin, a bridge for Vietnamese coffee' } },
      {
        type: 'p',
        text: {
          vi: 'Cà Phin mang sứ mệnh giới thiệu văn hóa cà phê Việt đến thị trường quốc tế, không chỉ qua hạt cà phê mà qua cả câu chuyện văn hóa và giá trị bền vững. Nhờ hợp tác này, khách tại Dubai được trải nghiệm thiết kế tự nhiên từ phụ phẩm cà phê Việt và câu chuyện kinh tế tuần hoàn trong ngành cà phê.',
          en: 'Cà Phin introduces Vietnamese coffee culture abroad, not only through beans but through its story and values. Thanks to this partnership, guests in Dubai meet natural design made from Vietnamese coffee by-products and the circular story behind it.',
        },
      },
      { type: 'photos', photos: ['caphin-coffee', 'caphin-counter-2', 'dubai-skyline'] },
      { type: 'h', text: { vi: 'Ý nghĩa của sự hợp tác', en: 'Why it matters' } },
      {
        type: 'list',
        items: {
          vi: [
            'Tận dụng bã cà phê để tạo ra sản phẩm có giá trị',
            'Giảm rác thải hữu cơ từ ngành cà phê',
            'Quảng bá sự sáng tạo của doanh nghiệp Việt',
            'Xây dựng hình ảnh cà phê Việt bền vững trên thị trường quốc tế',
          ],
          en: [
            'Turning coffee grounds into products of value',
            'Reducing organic waste from the coffee trade',
            'Showcasing Vietnamese creativity',
            'Building a sustainable image for Vietnamese coffee abroad',
          ],
        },
      },
    ],
  },
  {
    slug: 'expo-coffee-2025',
    kind: { vi: 'Sự kiện', en: 'Event' },
    place: { vi: 'Triển lãm quốc tế EXPO COFFEE 2025', en: 'EXPO COFFEE 2025 international fair' },
    title: {
      vi: 'Pando Ecotech tham dự triển lãm quốc tế EXPO COFFEE 2025',
      en: 'Pando Ecotech at the EXPO COFFEE 2025 international fair',
    },
    excerpt: {
      vi: 'Gian hàng Pando thu hút chủ quán, doanh nghiệp ngành cà phê và người yêu sản phẩm xanh với lót ly, đồ trang trí từ bã cà phê.',
      en: 'The Pando booth drew café owners, coffee companies and green-product lovers with coasters and décor made from coffee grounds.',
    },
    cover: 'expo-team',
    body: [
      {
        type: 'p',
        text: {
          vi: 'EXPO COFFEE 2025 quy tụ nhiều doanh nghiệp, thương hiệu và chuyên gia trong sản xuất, chế biến và sáng tạo sản phẩm từ cà phê. Pando Ecotech tham gia để giới thiệu các sản phẩm tái chế từ bã cà phê và lan tỏa mô hình kinh tế tuần hoàn.',
          en: 'EXPO COFFEE 2025 gathers companies, brands and experts across coffee production, processing and product design. Pando Ecotech joined to present products recycled from coffee grounds and to share the circular-economy model.',
        },
      },
      { type: 'photos', photos: ['expo-booth', 'expo-visitors', 'expo-visitors-3'] },
      { type: 'h', text: { vi: 'Gian hàng Pando', en: 'At the Pando booth' } },
      {
        type: 'p',
        text: {
          vi: 'Gian hàng trưng bày tấm lót ly từ bã cà phê, đồ trang trí tái chế và sản phẩm thủ công phong cách xanh. Khách tham quan được trải nghiệm sản phẩm và tìm hiểu quy trình biến bã cà phê thành vật liệu sinh học.',
          en: 'The booth showed coffee-ground coasters, recycled décor and green handcrafts. Visitors handled the products and learned how spent grounds become a bio-material.',
        },
      },
      { type: 'photos', photos: ['expo-group', 'expo-group-2', 'expo-visitors-2'] },
      { type: 'h', text: { vi: 'Lan tỏa thông điệp sống xanh', en: 'Spreading a greener habit' } },
      {
        type: 'list',
        items: {
          vi: [
            'Nâng cao nhận thức về tái chế phụ phẩm cà phê',
            'Khuyến khích sản xuất và tiêu dùng bền vững',
            'Kết nối với các đối tác trong ngành cà phê',
            'Mở ra cơ hội hợp tác phát triển sản phẩm xanh',
          ],
          en: [
            'Raising awareness of coffee by-product recycling',
            'Encouraging sustainable production and consumption',
            'Connecting with partners across the coffee trade',
            'Opening doors to co-develop green products',
          ],
        },
      },
    ],
  },
  {
    slug: 'pando-the-yen',
    kind: PARTNERSHIP,
    place: { vi: 'The Yên, TP. Hồ Chí Minh', en: 'The Yên, Ho Chi Minh City' },
    title: {
      vi: 'Pando hợp tác cùng The Yên mang tấm lót ly từ nông sản Việt đến gần hơn với cộng đồng',
      en: 'Pando and The Yên bring coasters made from Vietnamese produce closer to people',
    },
    excerpt: {
      vi: 'The Yên, thương hiệu cà phê và lifestyle Việt, dùng tấm lót ly từ bã trà, bã mía và bã cà phê của Pando.',
      en: 'The Yên, a Vietnamese coffee and lifestyle brand, now serves on Pando coasters of tea, bagasse and coffee grounds.',
    },
    cover: 'theyen-drinks',
    body: [
      {
        type: 'p',
        text: {
          vi: 'Những vật liệu tưởng chừng bỏ đi như bã cà phê, bã trà hay bã mía có thể trở thành nguyên liệu quý cho sản phẩm thân thiện môi trường. Pando Ecotech chính thức hợp tác cùng The Yên để đưa dòng tấm lót ly từ nông sản tái chế đến gần hơn với cộng đồng.',
          en: 'Materials that seem worthless, like coffee grounds, tea leaves or bagasse, can become precious inputs for eco-friendly goods. Pando Ecotech partnered with The Yên to bring its recycled-produce coasters closer to the public.',
        },
      },
      { type: 'photos', photos: ['theyen-coasters', 'theyen-stack', 'theyen-opening'] },
      { type: 'h', text: { vi: 'The Yên, không gian của lối sống bền vững', en: 'The Yên, a home for slower living' } },
      {
        type: 'p',
        text: {
          vi: 'The Yên hướng tới sự cân bằng, tối giản và gần gũi thiên nhiên, kết nối những giá trị tích cực như lối sống xanh và tiêu dùng có trách nhiệm. Qua hợp tác, The Yên trở thành cầu nối đưa tấm lót ly từ nông sản Việt đến khách hàng yêu thiên nhiên.',
          en: 'The Yên stands for balance, simplicity and closeness to nature, and champions green living and responsible consumption. Through the partnership it brings coasters made from Vietnamese produce to nature-loving guests.',
        },
      },
      { type: 'photos', photos: ['cafe-friends-2', 'drinks-garden', 'theyen-stack-2'] },
    ],
  },
  {
    slug: 'pando-moc-mien-coffee',
    kind: PARTNERSHIP,
    place: { vi: 'Mộc Miên Coffee', en: 'Mộc Miên Coffee' },
    title: {
      vi: 'Pando hợp tác cùng Mộc Miên Coffee mang sản phẩm từ bã cà phê đến gần hơn với cộng đồng',
      en: 'Pando and Mộc Miên Coffee bring coffee-ground products closer to the community',
    },
    excerpt: {
      vi: 'Bã cà phê tại Mộc Miên được thu gom và tái chế thành lót ly khắc logo quán, khép kín vòng đời của mỗi ly cà phê.',
      en: 'Grounds from Mộc Miên are collected and recycled into coasters engraved with the café’s logo, closing the loop on every cup.',
    },
    cover: 'coaster-coffee-tray-2',
    body: [
      {
        type: 'p',
        text: {
          vi: 'Sau mỗi ly cà phê, một lượng lớn bã thường bị bỏ đi. Với mong muốn biến phụ phẩm thành giá trị, Pando Ecotech hợp tác cùng Mộc Miên Coffee, quán cà phê gần gũi thiên nhiên, để đưa sản phẩm tái chế từ bã cà phê đến gần hơn với khách hàng.',
          en: 'Every cup leaves grounds behind. To turn that by-product into value, Pando Ecotech partnered with Mộc Miên Coffee, a café rooted in nature, to put recycled coffee-ground products in guests’ hands.',
        },
      },
      { type: 'photos', photos: ['coaster-coffee-tray', 'flatlay-mocmien', 'hero-coasters'] },
      { type: 'h', text: { vi: 'Hành trình khép kín', en: 'A closed loop' } },
      {
        type: 'p',
        text: {
          vi: 'Bã cà phê từ quán được thu gom và tái chế thành tấm lót ly, đồ trang trí handmade và quà tặng xanh. Khách đến quán có thể trực tiếp trải nghiệm và tìm hiểu quá trình tái chế, hiểu rõ hơn giá trị của kinh tế tuần hoàn.',
          en: 'Grounds from the café are collected and recycled into coasters, handmade décor and green gifts. Guests can see and touch the result and learn how the loop works.',
        },
      },
      {
        type: 'list',
        items: {
          vi: [
            'Giảm lượng rác thải từ ngành cà phê',
            'Thúc đẩy tái chế phụ phẩm nông nghiệp',
            'Nâng cao nhận thức về tiêu dùng xanh',
            'Kết nối cộng đồng yêu cà phê với giải pháp bền vững',
          ],
          en: [
            'Less waste from the coffee trade',
            'More recycling of farm by-products',
            'Greater awareness of green consumption',
            'Coffee lovers connected with sustainable solutions',
          ],
        },
      },
    ],
  },
  {
    slug: 'he-sinh-thai-san-pham-xanh',
    kind: { vi: 'Câu chuyện', en: 'Story' },
    place: { vi: 'Pando Ecotech', en: 'Pando Ecotech' },
    title: {
      vi: 'Hệ sinh thái sản phẩm xanh từ phụ phẩm nông nghiệp Việt Nam',
      en: 'An ecosystem of green products from Vietnamese farm by-products',
    },
    excerpt: {
      vi: 'Từ lót ly, chậu cây đến mèo thần tài, toàn bộ danh mục của Pando đều chống nước 100%, không ẩm mốc và làm thủ công.',
      en: 'From coasters and planters to lucky cats, the whole Pando range is 100% waterproof, mould-free and handmade.',
    },
    cover: 'family-labelled',
    body: [
      {
        type: 'p',
        text: {
          vi: 'Trước áp lực từ rác thải và tài nguyên cạn kiệt, tái chế và vật liệu sinh học đang trở thành lựa chọn tất yếu. Pando Ecotech tiên phong biến bã cà phê, bã trà, bã mía thành sản phẩm giá trị cao, phục vụ cả cá nhân lẫn doanh nghiệp.',
          en: 'With waste piling up and resources running thin, recycling and bio-materials are becoming a necessity. Pando Ecotech turns coffee grounds, tea leaves and bagasse into high-value products for people and businesses alike.',
        },
      },
      { type: 'photos', photos: ['pot-square', 'cat-shortleg-trio', 'pot-octagon-plants-2'] },
      { type: 'h', text: { vi: 'Ưu điểm của sản phẩm Pando', en: 'What every Pando piece shares' } },
      {
        type: 'list',
        items: {
          vi: [
            'Thân thiện môi trường: 100% từ phụ phẩm nông nghiệp tái chế',
            'Góp phần phát triển kinh tế tuần hoàn',
            'Thiết kế tự nhiên, mộc mạc mà hiện đại',
            'Ứng dụng đa dạng: gia dụng, trang trí, quà tặng, nội thất',
          ],
          en: [
            'Eco-friendly: made from recycled farm by-products',
            'Part of a circular economy',
            'Natural, earthy yet modern design',
            'Many uses: homeware, décor, gifts, furniture',
          ],
        },
      },
      {
        type: 'p',
        text: {
          vi: 'Sản phẩm của Pando có mặt ở quán cà phê, nhà hàng, văn phòng, cửa hàng quà tặng và các doanh nghiệp theo định hướng ESG, giúp thương hiệu kể câu chuyện tái chế và trách nhiệm môi trường.',
          en: 'Pando products live in cafés, restaurants, offices, gift shops and ESG-minded companies, helping brands tell a story of recycling and responsibility.',
        },
      },
      { type: 'photos', photos: ['drinks-tray', 'family-desk', 'cats-family'] },
    ],
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return NEWS.find((article) => article.slug === slug);
}
