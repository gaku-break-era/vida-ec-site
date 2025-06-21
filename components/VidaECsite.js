import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Menu, Search, User, Plus, Minus } from 'lucide-react';

const VidaECsite = () => {
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // 商品データ
  const products = [
    {
      id: 1,
      name: "Ceramic Vase Collection",
      price: 12800,
      originalPrice: 15200,
      category: "花器",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 24,
      description: "手作りの温かみを感じるセラミック花器。どんな空間にも自然に馴染むミニマルなデザイン。",
      tags: ["人気", "セール"],
      sales: 156
    },
    {
      id: 2,
      name: "Wooden Frame Mirror",
      price: 18900,
      category: "ミラー",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 18,
      description: "天然木を使用したシンプルなフレームミラー。空間に奥行きと明るさをもたらします。",
      tags: ["新商品"],
      sales: 89
    },
    {
      id: 3,
      name: "Brass Candle Holder Set",
      price: 8400,
      category: "照明",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 32,
      description: "真鍮製のキャンドルホルダーセット。温かい光が空間に上質な雰囲気を演出します。",
      tags: ["人気"],
      sales: 203
    },
    {
      id: 4,
      name: "Linen Table Runner",
      price: 5200,
      category: "テキスタイル",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 15,
      description: "上質なリネン素材のテーブルランナー。ナチュラルな質感が食卓を豊かに彩ります。",
      tags: [],
      sales: 67
    },
    {
      id: 5,
      name: "Steel Plant Stand",
      price: 9800,
      category: "スタンド",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4cab7?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 21,
      description: "スタイリッシュなスチール製プラントスタンド。植物を美しく見せるミニマルデザイン。",
      tags: ["人気"],
      sales: 134
    },
    {
      id: 6,
      name: "Ceramic Bowl Set",
      price: 6900,
      category: "器",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 28,
      description: "職人が一つずつ手作りしたセラミックボウルセット。日常使いに最適なサイズ感。",
      tags: [],
      sales: 92
    }
  ];

  // 売上ランキング
  const topSelling = [...products].sort((a, b) => b.sales - a.sales).slice(0, 3);

  // レコメンド商品
  const getRecommendations = (currentProduct) => {
    return products
      .filter(p => p.id !== currentProduct?.id && p.category === currentProduct?.category)
      .slice(0, 3);
  };

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const ProductCard = ({ product, showTags = true }) => (
    <div className="group cursor-pointer" onClick={() => { setSelectedProduct(product); setCurrentView('product'); }}>
      <div className="relative overflow-hidden bg-gray-50 rounded-lg aspect-square mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {showTags && product.tags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-2">
            {product.tags.map(tag => (
              <span key={tag} className={`px-2 py-1 text-xs font-medium rounded ${
                tag === 'セール' ? 'bg-red-500 text-white' : 
                tag === '新商品' ? 'bg-blue-500 text-white' :
                'bg-gray-800 text-white'
              }`}>
                {tag}
              </span>
            ))}
          </div>
        )}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 group-hover:text-gray-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{product.rating}</span>
            <span>({product.reviews})</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg text-gray-900">
            ¥{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ¥{product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const HomePage = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gray-100 rounded-2xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop" 
          alt="Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-light mb-4">暮らしに寄り添うデザイン</h1>
            <p className="text-xl mb-8 opacity-90">上質な素材と洗練されたフォルムが織りなす、新しいライフスタイル</p>
            <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              コレクションを見る
            </button>
          </div>
        </div>
      </section>

      {/* 売上ランキング */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light text-gray-900">売上ランキング</h2>
          <span className="text-sm text-gray-500">今月の人気商品</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topSelling.map((product, index) => (
            <div key={product.id} className="relative">
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {index + 1}
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 新商品 */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light text-gray-900">新商品</h2>
          <button className="text-sm text-gray-600 hover:text-gray-900 underline">すべて見る</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.tags.includes('新商品')).concat(products.slice(0, 3)).slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ブランドストーリー */}
      <section className="bg-gray-50 rounded-2xl p-12 text-center">
        <h2 className="text-3xl font-light mb-6 text-gray-900">VIDAについて</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          VIDAは「暮らしに寄り添うデザイン」をコンセプトに、<br />
          上質な素材と洗練されたフォルムで日常に特別な価値をもたらします。<br />
          一つひとつの商品に込められた思いが、あなたの空間を豊かに彩ります。
        </p>
      </section>
    </div>
  );

  const ProductDetail = ({ product }) => {
    const recommendations = getRecommendations(product);
    const crossSellItems = products.filter(p => 
      p.id !== product.id && 
      (p.category === product.category || Math.random() > 0.5)
    ).slice(0, 3);

    return (
      <div className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 商品画像 */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* 商品情報 */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                {product.tags.map(tag => (
                  <span key={tag} className={`text-xs px-2 py-1 rounded ${
                    tag === 'セール' ? 'bg-red-500 text-white' : 
                    tag === '新商品' ? 'bg-blue-500 text-white' :
                    'bg-gray-800 text-white'
                  }`}>
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl font-light text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews}件のレビュー)</span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-light text-gray-900">
                  ¥{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ¥{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* 数量選択・カート追加 */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">数量:</span>
                <div className="flex items-center border rounded-lg">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-50"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  カートに追加
                </button>
                <button 
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-3 border rounded-lg transition-colors ${
                    favorites.includes(product.id) 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* おすすめ商品（レコメンド） */}
        {recommendations.length > 0 && (
          <section>
            <h3 className="text-xl font-light mb-6 text-gray-900">この商品を見た人はこちらも見ています</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommendations.map(product => (
                <ProductCard key={product.id} product={product} showTags={false} />
              ))}
            </div>
          </section>
        )}

        {/* セット購入でお得（クロスセル） */}
        <section className="bg-blue-50 rounded-xl p-8">
          <h3 className="text-xl font-light mb-4 text-gray-900">セットで購入すると5%オフ</h3>
          <p className="text-gray-600 mb-6">関連商品と一緒に購入すると、合計金額から5%割引いたします。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crossSellItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg p-4">
                <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded mb-3" />
                <h4 className="font-medium mb-2">{item.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">¥{item.price.toLocaleString()}</span>
                  <button 
                    onClick={() => addToCart(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    追加
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentView('home')}
                className="text-2xl font-light text-gray-900 cursor-pointer"
              >
                VIDA
              </button>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">すべての商品</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">花器</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">照明</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">ミラー</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">テキスタイル</a>
            </nav>

            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
              <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
              <Menu className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900 md:hidden" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'home' && <HomePage />}
        {currentView === 'product' && selectedProduct && <ProductDetail product={selectedProduct} />}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">VIDA</h3>
              <p className="text-gray-600 text-sm">
                暮らしに寄り添うデザインで、<br />
                日常に特別な価値をお届けします。
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">商品カテゴリー</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">花器</a></li>
                <li><a href="#" className="hover:text-gray-900">照明</a></li>
                <li><a href="#" className="hover:text-gray-900">ミラー</a></li>
                <li><a href="#" className="hover:text-gray-900">テキスタイル</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">サポート</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">配送について</a></li>
                <li><a href="#" className="hover:text-gray-900">返品・交換</a></li>
                <li><a href="#" className="hover:text-gray-900">お手入れ方法</a></li>
                <li><a href="#" className="hover:text-gray-900">お問い合わせ</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">ニュースレター</h4>
              <p className="text-sm text-gray-600">新商品やお得な情報をお届けします</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="メールアドレス"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
                <button className="bg-gray-900 text-white px-4 py-2 rounded-r-lg text-sm hover:bg-gray-800 transition-colors">
                  登録
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2025 VIDA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VidaECsite;
