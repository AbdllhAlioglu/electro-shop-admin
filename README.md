# Electro-Shop Admin Paneli

Bu proje, [Next.js](https://nextjs.org) kullanılarak geliştirilmiş bir e-ticaret yönetim panelidir.

## Proje Hakkında

Electro-Shop Admin Paneli, elektronik ürün satışı yapan bir e-ticaret sitesinin yönetim arayüzüdür. Bu panel sayesinde:

- Ürün ekleme, düzenleme ve silme
- Stok takibi
- Sipariş yönetimi
- Müşteri bilgilerini görüntüleme
- Satış ve gelir raporları
- Döviz kuru dönüşümleri ve fiyatlandırma

gibi işlemleri kolayca gerçekleştirebilirsiniz.

## Başlangıç

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Projeyi klonlayın
2. Gerekli bağımlılıkları yükleyin:

```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. Geliştirme sunucusunu başlatın:

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev
```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresini açarak uygulamayı görüntüleyebilirsiniz.

## Özellikler

### Döviz Kuru Dönüşümü

Sistem, farklı para birimleri arasında otomatik dönüşüm yapabilmektedir. Bu özellik sayesinde:

- Ürün fiyatlarını farklı para birimlerinde görüntüleme
- Satış raporlarını istediğiniz para biriminde alma
- Güncel döviz kurlarıyla otomatik hesaplama

işlemlerini gerçekleştirebilirsiniz.

### Kullanıcı Yönetimi

- Rol tabanlı yetkilendirme sistemi
- Güvenli oturum yönetimi
- Kullanıcı aktivite logları

### Ürün Yönetimi

- Kategorilere göre ürün organizasyonu
- Toplu ürün işlemleri
- Ürün varyasyonları ve özellikleri yönetimi

## Teknik Detaylar

Bu proje aşağıdaki teknolojileri kullanmaktadır:

- **Next.js**: React tabanlı web framework
- **Tailwind CSS**: Stil ve tasarım için
- **API Entegrasyonları**: Döviz kuru ve diğer servisler için
- **Veritabanı**: Ürün ve kullanıcı verilerinin saklanması için

## Destek ve İletişim

Herhangi bir sorun veya öneriniz için lütfen issue açın veya proje yöneticisiyle iletişime geçin.

## Lisans

Bu proje [MIT lisansı](LICENSE) altında lisanslanmıştır.
