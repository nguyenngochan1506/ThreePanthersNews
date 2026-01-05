// File: crawler.js
import Parser from 'rss-parser';
const parser = new Parser();

// Link RSS Han lấy từ ảnh báo Người Lao Động
const RSS_URL = 'https://nld.com.vn/rss/thoi-su.rss';

async function getNews() {
  try {
    console.log('⏳ Đang kết nối đến báo Người Lao Động...');

    // 1. Fetch dữ liệu từ RSS
    let feed = await parser.parseURL(RSS_URL);

    console.log(`✅ Đã lấy được: ${feed.title}`);
    console.log('--------------------------------------');

    // 2. Duyệt qua từng bài báo
    feed.items.forEach((item) => {
      // Dữ liệu báo trả về nằm ở đây
      const article = {
        title: item.title, // Tiêu đề
        link: item.link, // Link gốc
        pubDate: item.pubDate, // Ngày đăng
        description: item.contentSnippet, // Tóm tắt
        image: getImageUrl(item.content), // Hàm tự viết để bóc tách ảnh (nếu cần)
      };

      // --- CHỖ NÀY ĐỂ CODE LƯU VÀO DATABASE CỦA HAN ---
      // Ví dụ: db.collection('news').insertOne(article)...

      console.log(`📌 Bài: ${article.title}`);
      console.log(`🔗 Link: ${article.link}`);
      console.log('-');
    });
  } catch (error) {
    console.log('❌ Lỗi rồi:', error);
  }
}

// Hàm phụ để lấy ảnh từ nội dung (RSS thường để ảnh trong thẻ content)
function getImageUrl(content) {
  const match = content.match(/src="([^"]*)"/);
  return match ? match[1] : null; // Trả về link ảnh hoặc null nếu ko có
}

// Chạy hàm
getNews();
