import type { Text, TextList } from '../i18n';

/**
 * The catalogue, rewritten from the product pages of pando-ecotech.com.vn
 * (sizes and colours from "Hệ sinh thái sản phẩm xanh"). Photos: src/assets/photos/.
 */
export type MaterialKey = 'coffee' | 'tea' | 'bagasse' | 'beet' | 'rose';
export type CategoryKey = 'coaster' | 'pot' | 'decor' | 'furniture';

export interface Material {
  key: MaterialKey;
  name: Text;
  note: Text;
  /** Swatch tone, a token name from tokens.css. */
  tone: string;
}

export const MATERIALS: Material[] = [
  {
    key: 'coffee',
    name: { vi: 'Bã cà phê', en: 'Coffee grounds' },
    note: { vi: 'Nâu trầm, thoảng hương cà phê', en: 'Deep brown, a faint coffee scent' },
    tone: '--mat-coffee',
  },
  {
    key: 'tea',
    name: { vi: 'Bã trà', en: 'Tea leaves' },
    note: { vi: 'Xanh rêu, vân lá tự nhiên', en: 'Moss green, natural leaf grain' },
    tone: '--mat-tea',
  },
  {
    key: 'bagasse',
    name: { vi: 'Bã mía', en: 'Sugarcane bagasse' },
    note: { vi: 'Trắng ngà, sợi mía nhẹ và bền', en: 'Ivory white, light and strong fibre' },
    tone: '--mat-bagasse',
  },
  {
    key: 'beet',
    name: { vi: 'Bã mía và củ dền', en: 'Bagasse and beetroot' },
    note: { vi: 'Hồng phấn nhuộm từ nước củ dền', en: 'Blush pink, dyed with beetroot juice' },
    tone: '--mat-beet',
  },
  {
    key: 'rose',
    name: { vi: 'Hoa hồng', en: 'Rose petals' },
    note: { vi: 'Phiên bản giới hạn từ cánh hoa', en: 'A limited run made with petals' },
    tone: '--mat-rose',
  },
];

export const CATEGORIES: { key: CategoryKey; name: Text }[] = [
  { key: 'coaster', name: { vi: 'Tấm lót ly', en: 'Coasters' } },
  { key: 'pot', name: { vi: 'Chậu cây', en: 'Planters' } },
  { key: 'decor', name: { vi: 'Tượng trang trí', en: 'Figurines' } },
  { key: 'furniture', name: { vi: 'Nội thất', en: 'Furniture' } },
];

export interface Benefit {
  title: Text;
  text: Text;
}

export interface Product {
  slug: string;
  category: CategoryKey;
  materials: MaterialKey[];
  name: Text;
  tagline: Text;
  intro: Text;
  benefits: Benefit[];
  uses: TextList;
  size?: string;
  colors?: Text;
  cover: string;
  gallery: string[];
  featured?: boolean;
  /** Item ids of the order form (src/data/shop.ts) this product can be ordered as. */
  shop?: string[];
}

const ECO: Benefit = {
  title: { vi: 'Thân thiện với môi trường', en: 'Kind to the planet' },
  text: {
    vi: 'Làm từ phụ phẩm nông nghiệp tái chế, giảm rác thải hữu cơ và thay thế một phần đồ nhựa.',
    en: 'Made from recycled farm by-products, cutting organic waste and replacing everyday plastic.',
  },
};
const WATERPROOF: Benefit = {
  title: { vi: 'Không thấm nước, không ẩm mốc', en: 'Waterproof, mould-free' },
  text: {
    vi: 'Công thức mới năm 2025 không nhựa, không đùn ép nhiệt, vẫn chống nước 100% và không ẩm mốc.',
    en: 'The 2025 formula has no plastic and no hot extrusion, yet stays 100% waterproof and mould-free.',
  },
};
const HANDMADE: Benefit = {
  title: { vi: 'Thủ công, mỗi chiếc một nét riêng', en: 'Handmade, each one its own' },
  text: {
    vi: 'Tạo hình và hoàn thiện bằng tay, nên kích thước và vân bề mặt có chênh lệch nhẹ, không chiếc nào giống hệt chiếc nào.',
    en: 'Shaped and finished by hand, so size and surface grain vary slightly: no two pieces are exactly alike.',
  },
};
const STORY: Benefit = {
  title: { vi: 'Mang một câu chuyện bền vững', en: 'Carries a story worth telling' },
  text: {
    vi: 'Mỗi sản phẩm kể về vòng đời của nông sản Việt, một điểm nhấn để quán và thương hiệu nói về kinh tế tuần hoàn.',
    en: 'Each piece tells the life cycle of Vietnamese produce, a talking point for cafés and brands on circular design.',
  },
};
const THREE_COLORS: Text = {
  vi: 'Trắng (bã mía), nâu (bã cà phê), hồng (bã mía và nước củ dền)',
  en: 'White (bagasse), brown (coffee grounds), pink (bagasse and beetroot juice)',
};

export const PRODUCTS: Product[] = [
  {
    slug: 'tam-lot-ly-ba-ca-phe',
    category: 'coaster',
    materials: ['coffee', 'bagasse'],
    featured: true,
    name: { vi: 'Tấm lót ly bã cà phê', en: 'Coffee-ground coaster' },
    tagline: {
      vi: 'Giữ mặt bàn sạch, giữ cả hương cà phê.',
      en: 'Keeps the table clean, and the coffee scent close.',
    },
    intro: {
      vi: 'Bã cà phê sau pha chế được thu gom, xử lý, làm khô rồi ép định hình bằng công nghệ vật liệu sinh học. Kết quả là chiếc lót ly cứng cáp, chống thấm, mang màu nâu tự nhiên và vân hạt riêng của cà phê, một thay thế mộc mạc cho lót ly nhựa hay cao su.',
      en: 'Spent coffee grounds are collected, cleaned, dried and pressed with bio-material technology into a firm, water-resistant coaster with the natural brown and speckled grain of coffee: an honest alternative to plastic or rubber coasters.',
    },
    benefits: [
      ECO,
      WATERPROOF,
      {
        title: { vi: 'Hương cà phê tự nhiên', en: 'A natural coffee aroma' },
        text: {
          vi: 'Nhiều chiếc vẫn giữ lại mùi cà phê nhẹ, tạo cảm giác dễ chịu cho bàn uống.',
          en: 'Many pieces keep a soft coffee scent that makes any table feel warmer.',
        },
      },
      {
        title: { vi: 'Bền, khó cong vênh, dễ lau', en: 'Durable, flat, easy to wipe' },
        text: {
          vi: 'Độ cứng tốt nhờ ép vật liệu sinh học, chịu nhiệt từ ly nóng và lau sạch dễ dàng sau khi dùng.',
          en: 'Bio-pressed for stiffness, it handles hot cups and wipes clean after use.',
        },
      },
      STORY,
    ],
    uses: {
      vi: ['Quán cà phê và quầy bar', 'Nhà hàng, khách sạn', 'Bàn làm việc, bàn tiếp khách', 'Quà tặng doanh nghiệp in khắc logo'],
      en: ['Cafés and bars', 'Restaurants and hotels', 'Desks and meeting tables', 'Corporate gifts engraved with a logo'],
    },
    size: '8 x 8 x 1 cm',
    colors: {
      vi: 'Màu nguyên bản hoặc xám titan, có viền hoặc không viền',
      en: 'Natural or titanium grey, with or without a rim',
    },
    cover: 'coaster-coffee-tray',
    gallery: ['coaster-coffee-card', 'hero-coasters', 'flatlay-mocmien', 'coaster-coffee-tray-2', 'caphin-bar', 'drinks-tray'],
    shop: ['coaster-natural-rim', 'coaster-titan-rim', 'coaster-natural', 'coaster-titan'],
  },
  {
    slug: 'tam-lot-ly-ba-tra',
    category: 'coaster',
    materials: ['tea', 'bagasse'],
    featured: true,
    name: { vi: 'Tấm lót ly bã trà', en: 'Tea-leaf coaster' },
    tagline: {
      vi: 'Sắc xanh rêu của những lá trà đã pha.',
      en: 'The moss green of steeped tea leaves.',
    },
    intro: {
      vi: 'Bã trà sau khi dùng được thu gom, làm khô và ép cùng vật liệu sinh học thành tấm lót ly có kết cấu chắc, chịu nhiệt tốt. Sắc xanh và vân lá tự nhiên khiến mỗi chiếc mang vẻ mộc mạc, gần gũi, hợp với bàn trà gia đình lẫn quầy quán.',
      en: 'Used tea leaves are gathered, dried and pressed with a bio-binder into a sturdy, heat-tolerant coaster. Its green tone and natural leaf grain feel calm and close to nature, at home on a family tea table or a café counter.',
    },
    benefits: [
      ECO,
      {
        title: { vi: 'Chống nước, chịu nhiệt', en: 'Water and heat resistant' },
        text: {
          vi: 'Hấp thụ hơi nước từ ly lạnh và chịu được ly nóng, bảo vệ mặt bàn khỏi vết nước và hư hại do nhiệt.',
          en: 'Absorbs condensation from cold glasses and takes hot cups, protecting the table from rings and heat marks.',
        },
      },
      {
        title: { vi: 'Vẻ đẹp tự nhiên', en: 'Natural beauty' },
        text: {
          vi: 'Hợp phong cách tối giản, rustic, vintage và trang trí xanh.',
          en: 'Suits minimalist, rustic, vintage and eco-friendly interiors.',
        },
      },
      STORY,
    ],
    uses: {
      vi: ['Bàn trà gia đình', 'Quán cà phê, quán trà', 'Nhà hàng, khách sạn', 'Quà tặng xanh cho doanh nghiệp'],
      en: ['Family tea tables', 'Cafés and tea houses', 'Restaurants and hotels', 'Green corporate gifts'],
    },
    size: '8 x 8 x 1 cm',
    cover: 'coaster-tea-hex',
    gallery: ['coaster-tea-card', 'coaster-tea-pile', 'coaster-palette', 'coaster-collection'],
  },
  {
    slug: 'tam-lot-ly-ba-mia',
    category: 'coaster',
    materials: ['bagasse'],
    featured: true,
    name: { vi: 'Tấm lót ly bã mía', en: 'Bagasse coaster' },
    tagline: {
      vi: 'Nhẹ như sợi mía, bền cho mỗi ngày.',
      en: 'Light as cane fibre, made for every day.',
    },
    intro: {
      vi: 'Bã mía, phần xơ còn lại sau khi ép nước, thường bị đốt bỏ. Pando làm sạch và ép định hình chúng thành tấm lót ly sáng màu, nhẹ mà chắc, có thể khắc hình thương hiệu cho quán.',
      en: 'Bagasse, the fibre left after pressing sugarcane, is usually burned. Pando cleans and moulds it into a pale, light yet sturdy coaster that can be engraved with a café’s own mark.',
    },
    benefits: [
      ECO,
      {
        title: { vi: 'Chịu nhiệt và chống nước', en: 'Heat and water resistant' },
        text: {
          vi: 'Chịu nhiệt từ ly nóng, hút hơi nước từ ly lạnh, giữ mặt bàn khô ráo.',
          en: 'Takes the heat of hot cups and the sweat of cold ones, keeping tables dry.',
        },
      },
      {
        title: { vi: 'Nhẹ nhưng bền', en: 'Light but durable' },
        text: {
          vi: 'Cấu trúc sợi tự nhiên của mía cho trọng lượng nhẹ mà vẫn đủ độ cứng.',
          en: 'The natural cane fibre keeps it light while giving it the stiffness it needs.',
        },
      },
      {
        title: { vi: 'Khắc logo theo yêu cầu', en: 'Custom engraving' },
        text: {
          vi: 'Có thể khắc hình minh họa hoặc logo thương hiệu lên từng chiếc, thành vật phẩm nhận diện cho quán.',
          en: 'Each piece can be engraved with an illustration or a brand logo, turning it into a branded item for the café.',
        },
      },
    ],
    uses: {
      vi: ['Quán cà phê, quán trà', 'Nhà hàng, khách sạn', 'Văn phòng làm việc', 'Quà tặng doanh nghiệp'],
      en: ['Cafés and tea houses', 'Restaurants and hotels', 'Offices', 'Corporate gifts'],
    },
    size: '8 x 8 x 1 cm',
    colors: THREE_COLORS,
    cover: 'coaster-bagasse-hex',
    gallery: ['coaster-bagasse-card', 'coaster-bagasse-set', 'coaster-bagasse-grid', 'coaster-bagasse-expo', 'theyen-coasters'],
  },
  {
    slug: 'tam-lot-ly-hoa-hong',
    category: 'coaster',
    materials: ['rose', 'bagasse'],
    name: { vi: 'Tấm lót ly hoa hồng', en: 'Rose-petal coaster' },
    tagline: {
      vi: 'Một chút lãng mạn trên bàn uống.',
      en: 'A touch of romance on the table.',
    },
    intro: {
      vi: 'Phiên bản đặc biệt ép cùng cánh hoa hồng tái chế, cho sắc hồng phấn và vân hoa nhẹ. Thiết kế đơn giản, tiện dụng, giúp bàn sạch sẽ và gọn gàng hơn.',
      en: 'A special edition pressed with recycled rose petals for a blush tone and soft floral grain. Simple and practical, it keeps the table neat.',
    },
    benefits: [ECO, HANDMADE, STORY],
    uses: {
      vi: ['Quà tặng', 'Tiệm hoa, tiệm bánh', 'Bàn trang điểm, bàn trà'],
      en: ['Gifts', 'Florists and bakeries', 'Dressing and tea tables'],
    },
    size: '8 x 8 x 1 cm',
    cover: 'coaster-rose-card',
    gallery: ['coaster-palette', 'coaster-trio'],
  },
  {
    slug: 'chau-cay-bat-giac-ba-ca-phe',
    category: 'pot',
    materials: ['coffee'],
    featured: true,
    name: { vi: 'Chậu cây bát giác bã cà phê', en: 'Octagonal coffee-ground planter' },
    tagline: {
      vi: 'Tám cạnh, một vòng đời cà phê.',
      en: 'Eight sides, one coffee life cycle.',
    },
    intro: {
      vi: 'Chậu được ép từ bã cà phê đã xử lý và làm khô, cho độ cứng và độ bền cao. Dáng bát giác hiện đại giúp sắp xếp gọn khi đặt nhiều chậu cạnh nhau, còn chất liệu giữ ẩm và thoáng khí giúp rễ cây khỏe, hạn chế úng nước.',
      en: 'Pressed from cleaned, dried coffee grounds for strength and durability. The modern octagon packs neatly when grouped, and the material holds moisture while letting roots breathe, so plants avoid waterlogging.',
    },
    benefits: [
      ECO,
      {
        title: { vi: 'Thiết kế bát giác độc đáo', en: 'A distinctive octagon' },
        text: {
          vi: 'Khác biệt so với chậu tròn truyền thống, nổi bật trên bàn làm việc, ban công hay quầy quán.',
          en: 'Stands apart from round pots on desks, balconies and café counters.',
        },
      },
      {
        title: { vi: 'Tốt cho cây', en: 'Good for plants' },
        text: {
          vi: 'Giữ ẩm và thoáng khí, giúp rễ phát triển và hạn chế úng.',
          en: 'Holds moisture and breathes, helping roots grow without waterlogging.',
        },
      },
      WATERPROOF,
    ],
    uses: {
      vi: ['Bàn làm việc', 'Ban công, sân vườn', 'Cây cảnh mini, sen đá', 'Quà tặng xanh cho đối tác'],
      en: ['Desks', 'Balconies and gardens', 'Mini plants and succulents', 'Green gifts for partners'],
    },
    size: '14.5 x 14.5 x 7 cm',
    colors: THREE_COLORS,
    cover: 'pot-octagon-plant',
    gallery: ['pot-octagon-coffee-card', 'pot-octagon-trio', 'pot-octagon-coffee', 'pot-octagon-coffee-2', 'pot-octagon-beans'],
  },
  {
    slug: 'chau-cay-bat-giac-ba-tra',
    category: 'pot',
    materials: ['tea', 'bagasse'],
    name: { vi: 'Chậu cây bát giác bã trà và bã mía', en: 'Tea and bagasse octagonal planter' },
    tagline: {
      vi: 'Trồng cây xanh trong một chiếc chậu có thể phân hủy.',
      en: 'Grow green in a pot that returns to the earth.',
    },
    intro: {
      vi: 'Hỗn hợp bã trà tái chế và bã mía được xử lý rồi ép định hình, tạo nên chiếc chậu bền chắc mà vẫn có khả năng phân hủy sinh học, không gây ô nhiễm đất hay nguồn nước như chậu nhựa.',
      en: 'A blend of recycled tea leaves and bagasse, pressed into a sturdy planter that is still biodegradable, never polluting soil or water the way plastic pots do.',
    },
    benefits: [
      ECO,
      {
        title: { vi: 'Phân hủy sinh học', en: 'Biodegradable' },
        text: {
          vi: 'Có thể phân hủy tự nhiên sau một thời gian sử dụng.',
          en: 'Breaks down naturally at the end of its life.',
        },
      },
      {
        title: { vi: 'Nhẹ mà bền', en: 'Light yet strong' },
        text: {
          vi: 'Ép sinh học cho độ cứng cao, nhẹ, dễ vận chuyển và bố trí.',
          en: 'Bio-pressing makes it stiff yet light, easy to move and arrange.',
        },
      },
      {
        title: { vi: 'Thoáng khí cho rễ', en: 'Breathable for roots' },
        text: {
          vi: 'Vật liệu tự nhiên thoáng khí, rễ khỏe và hạn chế úng nước.',
          en: 'Natural, breathable walls keep roots healthy and drained.',
        },
      },
    ],
    uses: {
      vi: ['Cây cảnh mini', 'Rau gia đình', 'Quán cà phê sinh thái, resort', 'Sự kiện, không gian xanh'],
      en: ['Mini plants', 'Home herbs', 'Eco cafés and resorts', 'Events and green spaces'],
    },
    size: '14.5 x 14.5 x 7 cm',
    colors: THREE_COLORS,
    cover: 'pot-octagon-plants',
    gallery: ['pot-tea-card', 'pot-octagon-plants-2', 'pots-shelf'],
  },
  {
    slug: 'chau-cay-vuong',
    category: 'pot',
    materials: ['coffee', 'bagasse', 'beet'],
    name: { vi: 'Chậu cây vuông mini', en: 'Mini square planter' },
    tagline: {
      vi: 'Nhỏ xinh cho một chậu sen đá trên bàn.',
      en: 'Just right for one succulent on your desk.',
    },
    intro: {
      vi: 'Chậu vuông nhỏ gọn làm thủ công, có ba màu theo nguyên liệu: trắng từ bã mía, nâu từ bã cà phê, hồng từ bã mía nhuộm nước củ dền. Không thấm nước, không ẩm mốc.',
      en: 'A small handmade square pot in three material colours: white bagasse, brown coffee grounds and pink bagasse dyed with beetroot. Waterproof and mould-free.',
    },
    benefits: [WATERPROOF, HANDMADE, ECO],
    uses: {
      vi: ['Sen đá, xương rồng', 'Bàn học, bàn làm việc', 'Quà tặng nhỏ'],
      en: ['Succulents and cacti', 'Study and work desks', 'Small gifts'],
    },
    size: '7 x 7 x 6 cm',
    colors: THREE_COLORS,
    cover: 'pot-square',
    gallery: ['family-desk', 'pots-shelf'],
  },
  {
    slug: 'chau-cay-con-meo',
    category: 'pot',
    materials: ['beet', 'bagasse'],
    name: { vi: 'Chậu cây con mèo', en: 'Cat planter' },
    tagline: {
      vi: 'Một chú mèo hồng ôm chậu cây xanh.',
      en: 'A pink cat holding a little green plant.',
    },
    intro: {
      vi: 'Chậu tạo hình con mèo từ bã mía nhuộm màu nước củ dền, làm thủ công từng chiếc. Không thấm nước, không ẩm mốc, đáng yêu trên kệ sách hay góc học tập.',
      en: 'A cat-shaped pot of bagasse tinted with beetroot juice, made one by one by hand. Waterproof, mould-free and adorable on a shelf or study corner.',
    },
    benefits: [WATERPROOF, HANDMADE, ECO],
    uses: {
      vi: ['Góc học tập', 'Kệ sách', 'Quà tặng'],
      en: ['Study corners', 'Bookshelves', 'Gifts'],
    },
    size: '12 x 12 x 5 cm',
    colors: { vi: 'Hồng (bã mía và nước củ dền)', en: 'Pink (bagasse and beetroot juice)' },
    cover: 'pot-cat',
    gallery: ['cats-family', 'family-desk'],
  },
  {
    slug: 'meo-than-tai',
    category: 'decor',
    materials: ['coffee', 'bagasse', 'beet'],
    featured: true,
    name: { vi: 'Mèo thần tài handmade', en: 'Handmade lucky cat' },
    tagline: {
      vi: 'Vẫy gọi tài lộc, từ bã cà phê.',
      en: 'Beckoning good fortune, from coffee grounds.',
    },
    intro: {
      vi: 'Mèo thần tài (Maneki Neko) là biểu tượng tài lộc của văn hóa Á Đông. Pando chế tác từng chú bằng tay từ bã cà phê xử lý sạch, kết hợp vật liệu sinh học, mang màu nâu tự nhiên và đôi khi còn thoảng hương cà phê.',
      en: 'The lucky cat (Maneki Neko) is the East Asian symbol of prosperity. Pando hand-crafts each one from cleaned coffee grounds and a bio-binder, in the natural brown of coffee and sometimes with its scent.',
    },
    benefits: [
      HANDMADE,
      {
        title: { vi: 'Ý nghĩa phong thủy may mắn', en: 'A charm for luck' },
        text: {
          vi: 'Hợp đặt ở bàn làm việc, quầy thu ngân, kệ phòng khách, văn phòng và cửa hàng.',
          en: 'At home on desks, cash counters, living-room shelves, offices and shops.',
        },
      },
      {
        title: { vi: 'Màu tự nhiên, hương cà phê nhẹ', en: 'Natural colour, a hint of coffee' },
        text: {
          vi: 'Sắc nâu mộc mạc của cà phê, một số chú còn giữ hương cà phê dịu.',
          en: 'The earthy brown of coffee; some still carry a soft coffee aroma.',
        },
      },
      ECO,
    ],
    uses: {
      vi: ['Quà khai trương', 'Quà tặng doanh nghiệp, thương hiệu', 'Trang trí quán, cửa hàng', 'Quà lưu niệm xanh'],
      en: ['Grand-opening gifts', 'Corporate and brand gifts', 'Shop and café décor', 'Green souvenirs'],
    },
    size: '9 x 9 x 7 cm',
    colors: THREE_COLORS,
    cover: 'cat-lucky',
    gallery: ['cat-lucky-close', 'cat-lucky-group', 'cats-family'],
  },
  {
    slug: 'meo-nung-niu-ba-ca-phe',
    category: 'decor',
    materials: ['coffee'],
    name: { vi: 'Mèo nũng nịu bã cà phê', en: 'Cuddly cat in coffee grounds' },
    tagline: {
      vi: 'Biểu cảm nũng nịu, màu nâu cà phê ấm áp.',
      en: 'A sulky little face in warm coffee brown.',
    },
    intro: {
      vi: 'Chú mèo nhỏ với biểu cảm nũng nịu, chế tác thủ công từ bã cà phê tái chế. Mỗi chú có nét riêng, mang màu nâu trầm tự nhiên của cà phê, hợp phong cách eco, tối giản hay rustic.',
      en: 'A small cat with a pouty face, hand-made from recycled coffee grounds. Each has its own character in the deep natural brown of coffee, for eco, minimalist or rustic spaces.',
    },
    benefits: [HANDMADE, ECO, STORY],
    uses: {
      vi: ['Bàn làm việc, kệ sách', 'Decor quán cà phê', 'Quà cho người yêu cà phê'],
      en: ['Desks and shelves', 'Café décor', 'Gifts for coffee lovers'],
    },
    cover: 'cat-cuddly-coffee',
    gallery: ['cat-lucky-group', 'cat-shortleg-trio'],
  },
  {
    slug: 'meo-nung-niu-ba-mia',
    category: 'decor',
    materials: ['bagasse'],
    name: { vi: 'Mèo nũng nịu bã mía', en: 'Cuddly cat in bagasse' },
    tagline: {
      vi: 'Trắng ngà, mềm mại như một cục bông.',
      en: 'Ivory white and soft as a cotton puff.',
    },
    intro: {
      vi: 'Phiên bản bã mía của chú mèo nũng nịu, sắc trắng ngà và bề mặt sợi mía đặc trưng. Làm thủ công, nhỏ gọn, dễ đặt ở bất kỳ góc nào.',
      en: 'The bagasse edition of the cuddly cat, ivory white with the tell-tale cane-fibre surface. Hand-made and small enough for any corner.',
    },
    benefits: [HANDMADE, ECO, STORY],
    uses: {
      vi: ['Góc học tập', 'Kệ trang trí', 'Quà tặng bạn bè'],
      en: ['Study corners', 'Display shelves', 'Gifts for friends'],
    },
    cover: 'cat-cuddly-bagasse',
    gallery: ['bagasse-reborn', 'cat-shortleg-trio-2'],
  },
  {
    slug: 'cap-meo-nung-niu',
    category: 'decor',
    materials: ['coffee', 'bagasse'],
    featured: true,
    name: { vi: 'Cặp mèo nũng nịu', en: 'Cuddly cat pair' },
    tagline: {
      vi: 'Một nâu, một trắng, luôn có đôi.',
      en: 'One brown, one white, always a pair.',
    },
    intro: {
      vi: 'Bộ đôi mèo từ phụ phẩm bã cà phê và bã mía, biểu tượng tài lộc và hạnh phúc cho không gian sống. Món quà nhỏ mang thông điệp sống xanh cho người thương.',
      en: 'A pair of cats made from coffee grounds and bagasse, a symbol of luck and happiness at home. A small gift carrying a green message for someone dear.',
    },
    benefits: [HANDMADE, ECO, STORY],
    uses: {
      vi: ['Quà cặp đôi', 'Trang trí phòng khách', 'Quà tặng ngày lễ'],
      en: ['Gifts for couples', 'Living-room décor', 'Holiday gifts'],
    },
    cover: 'cat-pair-card',
    gallery: ['cat-pair', 'cats-family'],
  },
  {
    slug: 'meo-chan-lun',
    category: 'decor',
    materials: ['bagasse', 'coffee', 'beet'],
    name: { vi: 'Mèo chân lùn', en: 'Short-legged cat' },
    tagline: {
      vi: 'Ba màu, ba tính cách, một chất liệu tái sinh.',
      en: 'Three colours, three moods, one reborn material.',
    },
    intro: {
      vi: 'Chú mèo chân lùn làm thủ công từ bã mía, có ba màu trắng, nâu và hồng. Sản phẩm thủ công độc đáo, biểu tượng tài lộc và hạnh phúc cho không gian sống.',
      en: 'A hand-made short-legged cat in bagasse, in white, brown and pink. A one-of-a-kind craft and a token of luck and happiness at home.',
    },
    benefits: [HANDMADE, ECO, STORY],
    uses: {
      vi: ['Bàn làm việc', 'Kệ sách', 'Quà tặng'],
      en: ['Desks', 'Bookshelves', 'Gifts'],
    },
    size: '9.5 x 5.5 x 7 cm',
    colors: THREE_COLORS,
    cover: 'cat-shortleg-trio',
    gallery: ['cat-shortleg-card', 'cat-shortleg-trio-2', 'bagasse-reborn'],
  },
  {
    slug: 'ghe-ba-ca-phe',
    category: 'furniture',
    materials: ['coffee', 'bagasse'],
    featured: true,
    name: { vi: 'Ghế bã cà phê và vỏ mía', en: 'Coffee-ground and cane stool' },
    tagline: {
      vi: 'Nội thất xanh cho quán kể chuyện cà phê.',
      en: 'Green furniture for cafés that tell the coffee story.',
    },
    intro: {
      vi: 'Mặt ghế tròn ép từ bã cà phê và vỏ mía, đặt trên khung thép không gỉ cao cấp với chân ghế chắc chắn. Màu nâu đặc trưng của cà phê tạo vẻ mộc mạc, tinh tế cho quán, văn phòng xanh và khu trưng bày.',
      en: 'A round seat pressed from coffee grounds and sugarcane husk on a premium stainless-steel frame with sturdy legs. The coffee-brown top brings a refined, earthy feel to cafés, green offices and showrooms.',
    },
    benefits: [
      {
        title: { vi: 'Chịu lực tốt', en: 'Built to carry weight' },
        text: {
          vi: 'Công nghệ ép vật liệu sinh học cho độ cứng và khả năng chịu lực phù hợp làm nội thất.',
          en: 'Bio-material pressing gives the stiffness and load capacity furniture needs.',
        },
      },
      {
        title: { vi: 'Giảm dấu chân carbon', en: 'A smaller carbon footprint' },
        text: {
          vi: 'Dùng phụ phẩm thay nguyên liệu mới, giảm nhu cầu khai thác gỗ và phát thải khi sản xuất.',
          en: 'By-products replace virgin material, easing demand for timber and emissions in production.',
        },
      },
      {
        title: { vi: 'Hợp nhiều phong cách', en: 'Fits many styles' },
        text: {
          vi: 'Tối giản, eco, rustic hay industrial đều hài hòa.',
          en: 'Minimalist, eco, rustic or industrial, it blends in.',
        },
      },
      STORY,
    ],
    uses: {
      vi: ['Quán cà phê, nhà hàng', 'Không gian làm việc sáng tạo', 'Văn phòng xanh', 'Khu trưng bày, triển lãm'],
      en: ['Cafés and restaurants', 'Creative workspaces', 'Green offices', 'Showrooms and exhibitions'],
    },
    cover: 'furniture-set',
    gallery: ['chair-coffee-card', 'furniture-set-2', 'table-coffee-card'],
  },
  {
    slug: 'ghe-ba-mia',
    category: 'furniture',
    materials: ['bagasse'],
    name: { vi: 'Ghế làm từ vỏ mía', en: 'Sugarcane-husk stool' },
    tagline: {
      vi: 'Mặt ghế sáng màu, nhẹ nhàng cho quán.',
      en: 'A pale, airy seat for any café.',
    },
    intro: {
      vi: 'Mặt ghế tròn từ vỏ mía tiện thay đổi góc ngồi, khung thép không gỉ cao cấp, chân ghế chắc tạo cảm giác tin cậy khi ngồi. Mang nét xanh cho không gian quán.',
      en: 'A round bagasse seat that lets you shift easily, on a premium stainless-steel frame with legs that feel solid underneath. Brings a fresh green note to any café.',
    },
    benefits: [ECO, STORY],
    uses: {
      vi: ['Quán cà phê', 'Quầy bar', 'Không gian chờ'],
      en: ['Cafés', 'Bar counters', 'Waiting areas'],
    },
    cover: 'chair-bagasse-card',
    gallery: ['furniture-set', 'table-bagasse-card'],
  },
  {
    slug: 'ban-ba-ca-phe',
    category: 'furniture',
    materials: ['coffee', 'bagasse'],
    name: { vi: 'Bàn bã cà phê và vỏ mía', en: 'Coffee-ground and cane side table' },
    tagline: {
      vi: 'Mặt bàn nâu cà phê trên khung thép thanh mảnh.',
      en: 'A coffee-brown top on a slender steel frame.',
    },
    intro: {
      vi: 'Mặt bàn tròn ép từ bã cà phê và vỏ mía, khung thép không gỉ cao cấp, chân bàn chắc chắn. Đi cùng ghế cùng chất liệu thành bộ nội thất kể trọn câu chuyện cà phê.',
      en: 'A round top pressed from coffee grounds and cane husk on a premium stainless-steel frame. Pair it with the matching stools for furniture that tells the whole coffee story.',
    },
    benefits: [ECO, STORY],
    uses: {
      vi: ['Quán cà phê', 'Ban công, sân vườn', 'Góc đọc sách'],
      en: ['Cafés', 'Balconies and gardens', 'Reading nooks'],
    },
    cover: 'furniture-set-2',
    gallery: ['table-coffee-card', 'furniture-set'],
  },
  {
    slug: 'ban-ba-mia',
    category: 'furniture',
    materials: ['bagasse'],
    name: { vi: 'Bàn làm từ vỏ mía', en: 'Sugarcane-husk side table' },
    tagline: {
      vi: 'Sáng màu, nhẹ nhàng, chắc chân.',
      en: 'Light in colour, steady on its feet.',
    },
    intro: {
      vi: 'Mặt bàn tròn từ vỏ mía, khung thép không gỉ cao cấp và chân bàn chắc chắn. Sản phẩm độc đáo từ nguyên liệu tái chế, mang nét xanh cho không gian sống.',
      en: 'A round bagasse top on a premium stainless-steel frame with steady legs. A distinctive recycled piece that brings green into living spaces.',
    },
    benefits: [ECO, STORY],
    uses: {
      vi: ['Phòng khách', 'Quán cà phê', 'Không gian chờ'],
      en: ['Living rooms', 'Cafés', 'Waiting areas'],
    },
    cover: 'table-bagasse-card',
    gallery: ['furniture-set'],
  },
  {
    slug: 'tam-op-tuong',
    category: 'furniture',
    materials: ['coffee'],
    name: { vi: 'Tấm ốp tường bã cà phê', en: 'Coffee-ground wall tile' },
    tagline: {
      vi: 'Một bức tường làm từ những ly cà phê đã uống.',
      en: 'A wall made of coffees already enjoyed.',
    },
    intro: {
      vi: 'Tấm ốp 12.5 cm ép từ bã cà phê, dùng ốp quầy bar và tường quán. Quán Cà Phin tại Dubai đã dùng tấm ốp và lót ly Pando cho quầy của mình.',
      en: 'A 12.5 cm tile pressed from coffee grounds for bar fronts and café walls. Cà Phin in Dubai clad its counter with Pando tiles and coasters.',
    },
    benefits: [
      ECO,
      {
        title: { vi: 'Đã có mặt tại Dubai', en: 'Already in Dubai' },
        text: {
          vi: 'Ốp quầy bar của Cà Phin, đưa bã cà phê Việt ra thị trường quốc tế.',
          en: 'Clads the bar at Cà Phin, taking Vietnamese coffee grounds abroad.',
        },
      },
      STORY,
    ],
    uses: {
      vi: ['Ốp quầy bar', 'Tường điểm nhấn của quán', 'Showroom, gian hàng triển lãm'],
      en: ['Bar fronts', 'Feature walls in cafés', 'Showrooms and booths'],
    },
    size: '12.5 x 12.5 cm',
    cover: 'wall-tiles-grid',
    gallery: ['wall-tile-card', 'caphin-bar', 'caphin-counter', 'caphin-counter-2'],
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}
